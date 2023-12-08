import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc, getDoc, collection, addDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjh3yu1ih1rvIDqdDcDZw9UUFMXfh9CWM",
  authDomain: "the-headlines-news-app.firebaseapp.com",
  projectId: "the-headlines-news-app",
  storageBucket: "the-headlines-news-app.appspot.com",
  messagingSenderId: "725817113324",
  appId: "1:725817113324:web:8101e0c7c1d7b9b9cf83c9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

//  const articlesCollection = collection(db, "articles");
export const setUserFavorites = async (userId, favorites) => {
  const userRef = doc(db, "articles", userId);

  try {
    // Ensure favorites is not undefined or null
    if (favorites !== undefined && favorites !== null) {
      await setDoc(userRef, { favorites });
      console.log("Favorites updated successfully!");
    } else {
      console.error("Invalid favorites data. Cannot update favorites.");
    }
  } catch (error) {
    console.error("Error updating favorites:", error.message);
  }
};

// gettting the doc
export const getUserFavorites = async (title) => {
  const userDoc = await getDoc(doc(db, "articles", title));
  return userDoc.exists() ? userDoc.data().favorites : [];
};
// Adding a new article
export const addArticle = async (title, description, urlToImage, url) => {
  const articlesCollection = collection(db, "articles");

  try {
    const newArticleRef = await addDoc(articlesCollection, {
      title,
      url, 
      description,
      urlToImage,
      createdAt: new Date(),
    });

    console.log("New article added with ID:", newArticleRef.id);
  } catch (error) {
    console.error("Error adding article:", error.message);
  }
};

export { auth, db };
