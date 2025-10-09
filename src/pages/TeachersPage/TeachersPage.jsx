import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db, auth } from "../../firebase/config";
import css from "./TeachersPage.module.css";

import TeacherModal from "../../components/TeacherModal/TeacherModal";
import TrialLessonModal from "../../components/TrialLessonModal/TrialLessonModal";
import { Modal } from "../../components/Modal/Modal";

const TeachersPage = () => {
  const [allTeachers, setAllTeachers] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [itemsToShow, setItemsToShow] = useState(4);

  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");

  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedTeacherForTrial, setSelectedTeacherForTrial] = useState(null);
  const [expandedCards, setExpandedCards] = useState([]);

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const [showAuthModal, setShowAuthModal] = useState(false);

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
    setItemsToShow(4);
  }, [selectedLanguage, selectedLevel, selectedPrice, allTeachers]);

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

  const handleLoadMore = () => setItemsToShow((prev) => prev + 4);

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
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
          >
            <option value="">All Languages</option>
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="German">German</option>
            <option value="Mandarin Chinese">Mandarin Chinese</option>
            <option value="Italian">Italian</option>
            <option value="Vietnamese">Vietnamese</option>
            <option value="Korean">Korean</option>
          </select>
        </div>

        <div className={css.filterBlock}>
          <p className={css.teachersPage_p}>Level of knowledge</p>
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
          >
            <option value="">All Levels</option>
            <option value="A1 Beginner">A1 Beginner</option>
            <option value="A2 Elementary">A2 Elementary</option>
            <option value="B1 Intermediate">B1 Intermediate</option>
            <option value="B2 Upper-Intermediate">B2 Upper-Intermediate</option>
            <option value="C1 Advanced">C1 Advanced</option>
            <option value="C2 Proficient">C2 Proficient</option>
          </select>
        </div>

        <div className={css.filterBlock}>
          <p className={css.teachersPage_p}>Price</p>
          <select
            value={selectedPrice}
            onChange={(e) => setSelectedPrice(e.target.value)}
          >
            <option value="">All Prices</option>
            <option value="25">до $25</option>
            <option value="30">до $30</option>
            <option value="35">до $35</option>
          </select>
        </div>
      </div>

      {/* Teacher Cards */}
      <ul className={css.teacherList}>
        {visibleTeachers.map((teacher, index) => (
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

                {/* Блок ціни, рейтингу та кнопки вподобати */}
                <div className={css.cardTopRight}>
                  <p>
                    <strong>Lessons online</strong> ${teacher.price_per_hour}
                  </p>
                  <p>
                    <strong>Lessons done:</strong> ${teacher.price_per_hour}
                  </p>
                  <p>
                    ⭐<strong>Rating:</strong>
                    {teacher.rating}
                  </p>
                  <p>
                    <strong>Price/ 1 hour:</strong> ${teacher.price_per_hour}
                  </p>
                  <button
                    onClick={() => toggleFavorite(teacher)}
                    className={`${css.heartBtn} ${
                      isFavorite(teacher) ? css.favorited : ""
                    }`}
                  >
                    {isFavorite(teacher) ? "💖" : "🤍"}
                  </button>
                </div>

                <p>
                  <strong>Speaks:</strong> {teacher.languages.join(", ")}
                </p>
                <h4>Conditions:</h4>
                <p>{teacher.lesson_info}</p>

                <div className={css.cardActions}>
                  <span
                    onClick={() => toggleExpand(index)}
                    className={css.readMoreLink}
                  >
                    {expandedCards.includes(index)
                      ? "Hide details"
                      : "Read more"}
                  </span>

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
                </div>
              </div>
            </div>

            {expandedCards.includes(index) && (
              <div className={css.cardExtra}>
                <p>{teacher.experience}</p>

                {teacher.reviews && teacher.reviews.length > 0 ? (
                  <ul>
                    {teacher.reviews.map((rev, i) => (
                      <li key={i} className={css.reviewItem}>
                        {rev.reviewer_avatar && (
                          <img
                            src={rev.reviewer_avatar}
                            alt={rev.reviewer_name}
                            className={css.reviewAvatar}
                          />
                        )}
                        <div>
                          <strong>{rev.reviewer_name}</strong> (
                          {rev.reviewer_rating}⭐):
                          <p>{rev.comment}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No reviews yet.</p>
                )}

                <button
                  className={css.book_btn}
                  onClick={() => setSelectedTeacherForTrial(teacher)}
                >
                  Book trial lesson
                </button>
              </div>
            )}
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
        <Modal onClose={() => setShowAuthModal(false)}>
          <p>This feature is available only for authorized users.</p>
        </Modal>
      )}
    </section>
  );
};

export default TeachersPage;
