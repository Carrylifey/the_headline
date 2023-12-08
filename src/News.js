// NewsDetailsModal.js
import React from "react";
import { useState, useEffect } from "react";
import { auth, setUserFavorites, getUserFavorites } from "./Firebase";


const News = ({ article, onClose }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [modalVisible, setModalVisible] = useState(true);

 

  useEffect(() => {
    // Check if the current article is in the user's favorites
    const checkFavoriteStatus = async () => {
      const userId = auth.currentUser?.uid;
      if (userId) {
        const favorites = await getUserFavorites(userId);
        console.log("User favorites retrieved:", favorites);
        setIsFavorite(favorites.includes(article.id));
      }
    };

    checkFavoriteStatus();
  }, [article.id]);

  const handleToggleFavorite = async () => {
    const userId = auth.currentUser?.uid;

    if (userId) {
      const favorites = await getUserFavorites(userId);
      if (favorites !== undefined) {
        const updatedFavorites = isFavorite
          ? favorites.filter((favId) => favId !== article.id)
          : [...favorites, article.id];

        await setUserFavorites(userId, updatedFavorites);
        setIsFavorite(!isFavorite);
      } else {
        console.error("user in undefied");
      }
    }
  };
 
  const closeModal = () => {
    setModalVisible(false);
    onClose();
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 transition-opacity ease-in-out duration-300 ${
        modalVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={closeModal}
    >
      <div
        className={`bg-white p-8 max-w-2xl max-h-full overflow-y-auto transform scale-0 transition-transform ease-in-out duration-300 ${
          modalVisible ? "scale-100" : "scale-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeModal}
          className="bg-red-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full absolute top-1 right-1"
        >
          X
        </button>
        <h2 className="text-2xl font-bold mb-4">{article.title}</h2>
        <p className="text-gray-700 mb-4">{article.description}</p>
        <img
          src={article.urlToImage}
          alt={article.title}
          className="max-w-full h-auto mb-4"
        />
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline block mb-4 border-3 border-box p-2 rounded-md text-center"
        >
          Read Full Article
        </a>
        <div className="text-center">
          <button
            onClick={handleToggleFavorite}
            className={`bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-full mb-2 ${
              isFavorite
                ? "border-2 border-red-500"
                : "border-2 border-yellow-500"
            }`}
          >
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default News;
