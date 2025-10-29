import { useState, useEffect } from "react";
import { auth } from "../../firebase/config";
import css from "../FavoritesPage/FavoritesPage.module.css";
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
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  const removeFavorite = (teacher) => {
    const updated = favorites.filter(
      (fav) => !(fav.name === teacher.name && fav.surname === teacher.surname)
    );
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const isFavorite = (teacher) =>
    favorites.some(
      (fav) => fav.name === teacher.name && fav.surname === teacher.surname
    );

  if (showAuthModal) {
    return (
      <Modal onClose={() => setShowAuthModal(false)}>
        <p>This page is available only for authorized users.</p>
      </Modal>
    );
  }

  return (
    <section className={css.teachersSection}>
      {favorites.length === 0 ? (
        <p className={css.noFavorites}>You have no favorite teachers yet.</p>
      ) : (
        <ul className={css.teacherList}>
          {favorites.map((teacher, index) => (
            <li key={index} className={css.teacherCard}>
              <div className={css.cardTop}>
                <div className={css.avatarWrapper}>
                  <div className={css.statusDotWrapper}>
                    {/* <img src="/online.svg" alt="online" width={20} /> */}
                  </div>
                  <div className={css.avatarOuter}>
                    <img
                      src={teacher.avatar_url}
                      alt={`${teacher.name} ${teacher.surname}`}
                      className={css.teacherAvatar}
                    />
                  </div>
                </div>

                <div className={css.cardInfo}>
                  <div className={css.cardHeader}>
                    <div className={css.nameBlock}>
                      <p className={css.languages_p}>
                        {teacher.languages.join(", ")}
                      </p>
                      <h2 className={css.teacherName}>
                        {teacher.name} {teacher.surname}
                      </h2>
                    </div>

                    <div className={css.cardTopRight}>
                      <div className={css.cardStats}>
                        <p>
                          <img
                            src="/book-open.svg"
                            alt="book-open"
                            className={css.book_open}
                          />
                          <strong>Lessons online</strong>
                        </p>
                        <span className={css.divider}>|</span>
                        <p>
                          <strong>Lessons done:</strong> {teacher.lessons_done}
                          <span className={css.divider}>|</span>
                          <img
                            src="/star-rate.svg"
                            alt="star-rate"
                            className={css.book_open}
                          />
                          <strong>Rating:</strong> {teacher.rating}
                        </p>
                        <span className={css.divider}>|</span>
                        <p>
                          <strong>Price/1 hour:</strong>{" "}
                          <span className={css.priceValue}>
                            {teacher.price_per_hour}$
                          </span>
                        </p>
                      </div>
                      <div className={css.cardFav}>
                        <button
                          onClick={() => removeFavorite(teacher)}
                          className={css.heartBtn}
                        >
                          <img
                            src={
                              isFavorite(teacher)
                                ? "/heart-hover.svg"
                                : "/heart.svg"
                            }
                            alt="favorite"
                            width={26}
                            height={26}
                          />
                        </button>
                      </div>
                    </div>
                  </div>

                  <p className={css.lessonText}>
                    <strong className={css.sectionTitle}>Speaks:</strong>{" "}
                    <span className={css.speaksList}>
                      {teacher.languages.join(", ")}
                    </span>
                  </p>

                  <p className={css.lessonText}>
                    <strong className={css.sectionTitle}>Lesson info:</strong>{" "}
                    {teacher.lesson_info}
                  </p>

                  {teacher.conditions && (
                    <p className={css.lessonText}>
                      <strong className={css.sectionTitle}>Conditions:</strong>{" "}
                      {teacher.conditions}
                    </p>
                  )}

                  <ul className={css.levelList}>
                    {teacher.levels?.map((level, i) => (
                      <li key={i} className={css.levelItem}>
                        {level}
                      </li>
                    ))}
                  </ul>

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
