import { useState, useEffect } from "react";
import { auth } from "../../firebase/config";
import css from "./FavoritesPage.module.css"; // аналогічні стилі до TeachersPage
import TrialLessonModal from "../../components/TrialLessonModal/TrialLessonModal";
import { AlertModal } from "../../components/AlertModal/AlertModal";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [selectedTeacherForTrial, setSelectedTeacherForTrial] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [expandedCards, setExpandedCards] = useState([]);

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

  const toggleExpand = (index) => {
    setExpandedCards((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const isFavorite = (teacher) =>
    favorites.some(
      (fav) => fav.name === teacher.name && fav.surname === teacher.surname
    );

  if (showAuthModal) {
    return (
      <AlertModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        message="This page is available only for authorized users."
      />
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
                  <div className={css.avatarWithOuter}>
                    <img
                      src={teacher.avatar_url}
                      alt={`${teacher.name} ${teacher.surname}`}
                      className={css.teacherAvatar}
                    />
                    <div className={css.statusDotWrapper}>
                      <img src="/online.svg" alt="online" />
                    </div>
                    <div className={css.avatarOuter}></div>
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
                        </p>
                        <span className={css.divider}>|</span>
                        <p>
                          <img
                            src="/star-rate.svg"
                            alt="star-rate"
                            className={css.book_open}
                          />
                          <strong>Rating:</strong> {teacher.rating}
                        </p>
                        <span className={css.divider}>|</span>
                        <p>
                          <strong>Price / 1 hour:</strong>{" "}
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

                  <p className={css.lessonText}>
                    <strong className={css.sectionTitle}>Conditions:</strong>{" "}
                    {teacher.conditions}
                  </p>

                  <div className={css.cardActions}>
                    <span
                      onClick={() => toggleExpand(index)}
                      className={css.readMoreLink}
                    >
                      {expandedCards.includes(index)
                        ? "Hide details"
                        : "Read more"}
                    </span>
                  </div>

                  {expandedCards.includes(index) && (
                    <div className={css.cardExtra}>
                      <p>{teacher.experience}</p>

                      {teacher.reviews && teacher.reviews.length > 0 ? (
                        <ul>
                          {teacher.reviews.map((rev, i) => (
                            <li key={i} className={css.reviewItem}>
                              <div className={css.reviewTop}>
                                <div className={css.reviewAvatarWrapper}>
                                  {rev.reviewer_avatar ? (
                                    <img
                                      src={rev.reviewer_avatar}
                                      alt={rev.reviewer_name}
                                      className={css.reviewAvatar}
                                    />
                                  ) : (
                                    <div className={css.reviewAvatarFallback}>
                                      {rev.reviewer_name?.[0].toUpperCase()}
                                    </div>
                                  )}
                                </div>

                                <div className={css.reviewRightBlock}>
                                  <div className={css.reviewHeader}>
                                    <strong className={css.reviewName}>
                                      {rev.reviewer_name}
                                    </strong>
                                    <span className={css.reviewerRating}>
                                      <img
                                        src="/star-rate.svg"
                                        alt="rating"
                                        className={css.starIcon}
                                      />
                                      {parseFloat(rev.reviewer_rating).toFixed(
                                        1
                                      )}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className={css.reviewCommentWrapper}>
                                <p className={css.reviewComment}>
                                  {rev.comment}
                                </p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>No reviews yet.</p>
                      )}

                      <ul className={css.levelList}>
                        {teacher.levels.map((level, i) => (
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
                  )}
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
