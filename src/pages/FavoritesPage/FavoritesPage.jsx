import { useEffect, useState } from "react";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });


  useEffect(() => {
    const data = localStorage.getItem("favorites");
    if (data) setFavorites(JSON.parse(data));
  }, []);

  return (
    <section>
      <h1>Your Favorite Teachers</h1>
      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <ul>
          {favorites.map((teacher, i) => (
            <li key={i}>
              <h2>
                {teacher.name} {teacher.surname}
              </h2>
              <p>{teacher.languages.join(", ")}</p>
              <p>Price: ${teacher.price_per_hour}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default FavoritesPage;
