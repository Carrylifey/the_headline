import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import News from "./News";
import { getNewsFromCache, updateNewsCache } from "./CacheService";

const App = () => {
  const [articles, setArticles] = useState([]);
  const [isGridView, setIsGridView] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const cachedNews = getNewsFromCache();
        setArticles(cachedNews);
        const response = await axios.get(
          "https://newsapi.org/v2/top-headlines?country=us&apiKey=dcb612d747b446e1a9067158dfabe479"
        );
        updateNewsCache(response.data.articles);
        setArticles(response.data.articles);
        console.log(response);
        setArticles(response.data.articles);
      } catch (error) {
        console.error("Error fetching news:", error.message);
      }
    };

    fetchNews();
  }, []);

  const toggleView = () => {
    setIsGridView((isGridView) => !isGridView);
  };
  const openDetailModal = (article) => {
    setSelectedArticle(article);
  };

  const closeDetailModal = () => {
    setSelectedArticle(null);
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen relative">
        {isGridView ? (
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {articles.map((article, index) => (
              <div
                style={{ width: "50%" }}
                key={index}
                onClick={() => openDetailModal(article)}
              >
                <NewsDetails article={article} key={index} />
              </div>
            ))}
          </div>
        ) : (
          <ul>
            {articles.map((article, index) => (
              <li key={index} onClick={() => openDetailModal(article)}>
                <NewsDetails article={article} key={index} />
              </li>
            ))}
          </ul>
        )}
        <button
          onClick={toggleView}
          className="fixed top-56 right-8 bg-pink-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded transition"
        >
          {isGridView ? "Switch to List View" : "Switch to Grid View"}
        </button>
        {selectedArticle && (
          <News article={selectedArticle} onClose={closeDetailModal} />
        )}
      </div>
    </div>
  );
};

function NewsDetails({ article, onClick }) {
  return (
    <div
      key={article.id}
      className="mb-4 p-6 bg-white rounded shadow-md cursor-pointer"
      onClick={onClick}
    >
      <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
      <p className="text-gray-700">{article.description}</p>
    </div>
  );
}

export default App;
