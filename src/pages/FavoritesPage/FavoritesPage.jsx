import { useEffect, useState } from "react";
import styles from "./FavoritesPage.module.css";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  const removeFromFavorites = (teacher) => {
    const updated = favorites.filter(
      (fav) => fav.name !== teacher.name || fav.surname !== teacher.surname
    );
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <section className={styles.favoritesSection}>
      <h1>Your Favorite Teachers</h1>

      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <ul className={styles.teacherList}>
          {favorites.map((teacher, index) => (
            <li key={index} className={styles.teacherCard}>
              <img
                src={teacher.avatar_url}
                alt={`${teacher.name} ${teacher.surname}`}
              />
              <h2>
                {teacher.name} {teacher.surname}
              </h2>
              <p>Languages: {teacher.languages.join(", ")}</p>
              <p>Levels: {teacher.levels.join(", ")}</p>
              <p>Price: ${teacher.price_per_hour}</p>
              <p>Rating: {teacher.rating}⭐</p>
              <button onClick={() => removeFromFavorites(teacher)}>
                💔 Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default FavoritesPage;
