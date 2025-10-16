import { useState, useEffect } from "react";
import { auth } from "../../firebase/config";
import css from "../TeachersPage/TeachersPage.module.css";
import TeacherModal from "../../components/TeacherModal/TeacherModal";
import TrialLessonModal from "../../components/TrialLessonModal/TrialLessonModal";
import { Modal } from "../../components/Modal/Modal";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [selectedTeacherForTrial, setSelectedTeacherForTrial] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    const saved = localStorage.getItem("favorites");
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  const removeFavorite = (teacher) => {
    const updated = favorites.filter(
      (fav) => !(fav.name === teacher.name && fav.surname === teacher.surname)
    );
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  if (showAuthModal) {
    return (
      <Modal onClose={() => setShowAuthModal(false)}>
        <p>This page is available only for authorized users.</p>
      </Modal>
    );
  }

  return (
    <section className={css.teachersSection}>
      <h2 className={css.pageTitle}>Your Favorite Teachers</h2>

      {favorites.length === 0 ? (
        <p className={css.noFavorites}>You have no favorite teachers yet.</p>
      ) : (
        <ul className={css.teacherList}>
          {favorites.map((teacher, index) => (
            <li key={index} className={css.teacherCard}>
              <div className={css.cardTop}>
                <img
                  src={teacher.avatar_url}
                  alt={`${teacher.name} ${teacher.surname}`}
                />
                <div className={css.cardInfo}>
                  <h2>
                    {teacher.name} {teacher.surname}
                  </h2>

                  <div className={css.cardTopRight}>
                    <p>
                      <strong>Price/ 1 hour:</strong> ${teacher.price_per_hour}
                    </p>
                    <p>
                      <strong>Rating:</strong> ⭐{teacher.rating}
                    </p>
                    <button
                      onClick={() => removeFavorite(teacher)}
                      className={`${css.heartBtn} ${css.favorited}`}
                    >
                      💔 Remove
                    </button>
                  </div>

                  <p>
                    <strong>Speaks:</strong> {teacher.languages.join(", ")}
                  </p>
                  <p>{teacher.lesson_info}</p>

                  <button
                    className={css.book_btn}
                    onClick={() => setSelectedTeacherForTrial(teacher)}
                  >
                    Book trial lesson
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {selectedTeacherForTrial && (
        <TrialLessonModal
          teacher={selectedTeacherForTrial}
          onClose={() => setSelectedTeacherForTrial(null)}
        />
      )}
    </section>
  );
};

export default FavoritesPage;
