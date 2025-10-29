import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db, auth } from "../../firebase/config";
import css from "./TeachersPage.module.css";
import { AlertModal } from "../../components/AlertModal/AlertModal";

import TeacherModal from "../../components/TeacherModal/TeacherModal";
import TrialLessonModal from "../../components/TrialLessonModal/TrialLessonModal";
import { Modal } from "../../components/Modal/Modal";

const languages = [
  "English",
  "Spanish",
  "French",
  "German",
  "Mandarin Chinese",
  "Italian",
  "Vietnamese",
  "Korean",
];

const levels = [
  "A1 Beginner",
  "A2 Elementary",
  "B1 Intermediate",
  "B2 Upper-Intermediate",
  "C1 Advanced",
  "C2 Proficient",
];

const prices = ["10", "20", "30", "40"];

const CustomSelect = ({ value, onChange, options, isPrice }) => {
  const [open, setOpen] = useState(false);
  const placeholder = options[0];

  const handleSelect = (option) => {
    onChange(option);
    setOpen(false);
  };

  return (
    <div className={css.customSelectWrapper}>
      <div className={css.customSelectDisplay} onClick={() => setOpen(!open)}>
        {isPrice ? (
          <>
            {value || placeholder}
            <span className={css.dollarSign}>$</span>
          </>
        ) : (
          value || placeholder
        )}
        <img src="/chevron-down.svg" alt="chevron" className={css.chevron} />
      </div>
      {open && (
        <ul className={css.customSelectOptions}>
          {options.map((opt) => (
            <li
              key={opt}
              onClick={() => handleSelect(opt)}
              className={opt === value ? css.activeOption : ""}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const TeachersPage = () => {
  const [allTeachers, setAllTeachers] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [itemsToShow, setItemsToShow] = useState(3);

  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");

  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedTeacherForTrial, setSelectedTeacherForTrial] = useState(null);
  const [expandedCards, setExpandedCards] = useState([]);

  const [showAuthModal, setShowAuthModal] = useState(false);

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const teachersRef = ref(db, "/");
    const unsubscribe = onValue(teachersRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const teachersArray = Object.values(data);
        setAllTeachers(teachersArray);
        setFilteredTeachers(teachersArray);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    let filtered = [...allTeachers];
    if (selectedLanguage)
      filtered = filtered.filter((t) => t.languages.includes(selectedLanguage));
    if (selectedLevel)
      filtered = filtered.filter((t) => t.levels.includes(selectedLevel));
    if (selectedPrice) {
      const maxPrice = parseInt(selectedPrice);
      filtered = filtered.filter((t) => t.price_per_hour <= maxPrice);
    }
    setFilteredTeachers(filtered);
    setItemsToShow(3);
  }, [selectedLanguage, selectedLevel, selectedPrice, allTeachers]);

  const isFavorite = (teacher) => {
    const user = auth.currentUser;
    if (!user) return false;
    return favorites.some(
      (fav) => fav.name === teacher.name && fav.surname === teacher.surname
    );
  };

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

  const handleLoadMore = () => setItemsToShow((prev) => prev + 3);

  const toggleExpand = (index) => {
    setExpandedCards((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const visibleTeachers = filteredTeachers.slice(0, itemsToShow);

  return (
    <section className={css.teachersSection}>
      {/* Filters */}
      <div className={css.filters}>
        <div className={css.filterBlock}>
          <p className={css.teachersPage_p}>Languages</p>
          <CustomSelect
            value={selectedLanguage}
            onChange={setSelectedLanguage}
            options={languages}
            width="221px"
          />
        </div>

        <div className={css.filterBlock}>
          <p className={css.teachersPage_p}>Level of knowledge</p>
          <CustomSelect
            value={selectedLevel}
            onChange={setSelectedLevel}
            options={levels}
            width="198px"
          />
        </div>

        <div className={css.filterBlock}>
          <p className={css.teachersPage_p}>Price</p>
          <CustomSelect
            value={selectedPrice}
            onChange={setSelectedPrice}
            options={prices}
            isPrice={true}
            width="124px"
          />
        </div>
      </div>

      {/* Teacher Cards */}
      <ul className={css.teacherList}>
        {visibleTeachers.map((teacher, index) => (
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
                        onClick={() => toggleFavorite(teacher)}
                        className={css.heartBtn}
                      >
                        <img
                          src={
                            auth.currentUser && isFavorite(teacher)
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
                  <strong className={css.sectionTitle}>Lesson info:</strong>
                  {teacher.lesson_info}
                </p>
                <p className={css.lessonText}>
                  <strong className={css.sectionTitle}>Conditions:</strong>
                  {teacher.conditions}
                </p>

                <div className={css.cardActions}>
                  <span
                    onClick={() => {
                      if (auth.currentUser) {
                        toggleExpand(index);
                      } else {
                        setShowAuthModal(true);
                      }
                    }}
                    className={css.readMoreLink}
                  >
                    {expandedCards.includes(index)
                      ? "Hide details"
                      : "Read more"}
                  </span>
                </div>

                {expandedCards.includes(index) ? (
                  <div className={css.cardExtra}>
                    <p>{teacher.experience}</p>

                    {teacher.reviews && teacher.reviews.length > 0 ? (
                      <ul>
                        {teacher.reviews.map((rev, i) => (
                          <li key={i} className={css.reviewItem}>
                            <div className={css.reviewTop}>
                              {/* Ліва колонка: аватар */}
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

                              {/* Права колонка: блок з ім'ям + рейтинг та коментар */}
                              <div className={css.reviewRightBlock}>
                                {/* Ім’я + рейтинг */}
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
                                    {parseFloat(rev.reviewer_rating).toFixed(1)}
                                  </span>
                                </div>
                              </div>
                            </div>
                            {/* Коментар */}
                            <div className={css.reviewCommentWrapper}>
                              <p className={css.reviewComment}>{rev.comment}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No reviews yet.</p>
                    )}

                    <ul className={css.levelList}>
                      {teacher.levels.map((level, i) => (
                        <li
                          key={i}
                          className={`${css.levelItem} ${
                            level === selectedLevel ? css.activeLevel : ""
                          }`}
                        >
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
                ) : (
                  <ul className={css.levelList}>
                    {teacher.levels.map((level, i) => (
                      <li
                        key={i}
                        className={`${css.levelItem} ${
                          level === selectedLevel ? css.activeLevel : ""
                        }`}
                      >
                        {level}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>

      {itemsToShow < filteredTeachers.length && (
        <button onClick={handleLoadMore} className={css.loadMoreBtn}>
          Load more
        </button>
      )}

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
        <AlertModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          message="This feature is available only for authorized users."
        />
      )}
    </section>
  );
};

export default TeachersPage;
