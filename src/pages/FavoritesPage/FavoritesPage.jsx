import { useEffect, useState } from "react";
import { auth } from "../../firebase/config";
import css from "./FavoritesPage.module.css";

import TeacherModal from "../../components/TeacherModal/TeacherModal";
import TrialLessonModal from "../../components/TrialLessonModal/TrialLessonModal";
import {Modal} from "../../components/Modal/Modal";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedTeacherForTrial, setSelectedTeacherForTrial] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Завантажуємо favorites з localStorage
  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  // --- Видалення з обраних ---
  const removeFromFavorites = (teacher) => {
    const updated = favorites.filter(
      (fav) => !(fav.name === teacher.name && fav.surname === teacher.surname)
    );
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  // --- Toggle favorite ---
  const isFavorite = (teacher) =>
    favorites.some(
      (fav) => fav.name === teacher.name && fav.surname === teacher.surname
    );

  const toggleFavorite = (teacher) => {
    const user = auth.currentUser;
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    let updated;
    if (isFavorite(teacher)) {
      updated = favorites.filter(
        (fav) => !(fav.name === teacher.name && fav.surname === teacher.surname)
      );
    } else {
      updated = [...favorites, teacher];
    }
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <section className={css.teachersSection}>
      <h1>Your Favorite Teachers</h1>

      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <ul className={css.teacherList}>
          {favorites.map((teacher, index) => (
            <li key={index} className={css.teacherCard}>
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

              <button onClick={() => setSelectedTeacherForTrial(teacher)}>
                Book trial lesson
              </button>

              <button onClick={() => setSelectedTeacher(teacher)}>
                Read more
              </button>

              <button
                onClick={() => toggleFavorite(teacher)}
                className={css.heartBtn}
                style={{ color: isFavorite(teacher) ? "#f4c550" : "#000" }}
              >
                ❤️
              </button>

              <button onClick={() => removeFromFavorites(teacher)}>
                💔 Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Модальні вікна */}
      {selectedTeacher && (
        <TeacherModal
          teacher={selectedTeacher}
          onClose={() => setSelectedTeacher(null)}
        />
      )}
      {selectedTeacherForTrial && (
        <TrialLessonModal
          teacher={selectedTeacherForTrial}
          onClose={() => setSelectedTeacherForTrial(null)}
        />
      )}

      {showAuthModal && (
        <Modal onClose={() => setShowAuthModal(false)}>
          <p>This feature is available only for authorized users.</p>
        </Modal>
      )}
    </section>
  );
};

export default FavoritesPage;
