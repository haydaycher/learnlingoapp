import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db, auth } from "../../firebase/config";
import css from "./TeachersPage.module.css";

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

const CustomSelect = ({ value, onChange, options, isPrice, width }) => {
  const [open, setOpen] = useState(false);
  const placeholder = options[0]; // перше в списку як плейсхолдер

  const handleSelect = (option) => {
    onChange(option);
    setOpen(false);
  };

  return (
    <div className={css.customSelectWrapper} style={{ width }}>
      <div
        className={css.customSelectDisplay}
        onClick={() => setOpen(!open)}
        style={{ width }}
      >
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
              <div
                className={css.avatarWrapper}
                style={{ position: "relative", width: 96, height: 96 }}
              >
                <div className={css.avatarOuter}>
                  <img
                    src={teacher.avatar_url}
                    alt={`${teacher.name} ${teacher.surname}`}
                    className={css.teacherAvatar}
                  />
                </div>

                <div
                  className={css.statusDotWrapper}
                  style={{
                    position: "absolute",

                    width: 12,
                    height: 12,
                  }}
                >
                  <img
                    src="/online.svg"
                    alt="online"
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
              </div>

              <div className={css.cardInfo}>
                <h2>
                  {teacher.name} {teacher.surname}
                </h2>

                {/* Top right block */}
                <div className={css.cardTopRight}>
                  <p>
                    <strong>Lessons online:</strong>
                  </p>
                  <p>
                    <strong>Lessons done:</strong> ${teacher.price_per_hour}
                  </p>
                  <p>
                    ⭐<strong>Rating:</strong> {teacher.rating}
                  </p>
                  <p>
                    <strong>Price/1 hour:</strong> ${teacher.price_per_hour}
                  </p>
                  <button
                    onClick={() => toggleFavorite(teacher)}
                    className={css.heartBtn}
                  >
                    <img
                      src={
                        isFavorite(teacher) ? "/heart-hover.svg" : "/heart.svg"
                      }
                      alt="favorite"
                      width={26}
                      height={26}
                    />
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
                          <div className={css.avatarWrapper}>
                            <img
                              src={teacher.avatar_url}
                              alt={`${teacher.name} ${teacher.surname}`}
                              className={css.teacherAvatar}
                              width={96}
                              height={96}
                            />
                            <div className={css.statusDotWrapper}>
                              <img
                                src="/online.svg"
                                alt="online"
                                width={12}
                                height={12}
                              />
                            </div>
                          </div>
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
