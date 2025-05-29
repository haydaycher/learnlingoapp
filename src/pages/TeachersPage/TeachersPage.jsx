import { useEffect, useState } from "react";

import styles from "./TeachersPage.module.css";

const TeachersPage = () => {
  const [allTeachers, setAllTeachers] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [itemsToShow, setItemsToShow] = useState(4);

  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedTeacherForTrial, setSelectedTeacherForTrial] = useState(null);

  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetch("/teachers.json");
        const data = await response.json();
        setAllTeachers(data);
        setFilteredTeachers(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchTeachers();
  }, []);

  useEffect(() => {
    let filtered = [...allTeachers];

    if (selectedLanguage) {
      filtered = filtered.filter((teacher) =>
        teacher.languages.includes(selectedLanguage)
      );
    }

    if (selectedLevel) {
      filtered = filtered.filter((teacher) =>
        teacher.levels.includes(selectedLevel)
      );
    }

    if (selectedPrice) {
      const maxPrice = parseInt(selectedPrice);
      filtered = filtered.filter(
        (teacher) => teacher.price_per_hour <= maxPrice
      );
    }

    setFilteredTeachers(filtered);
    setItemsToShow(4);
  }, [selectedLanguage, selectedLevel, selectedPrice, allTeachers]);

  const handleLoadMore = () => {
    setItemsToShow((prev) => prev + 4);
  };

  const visibleTeachers = filteredTeachers.slice(0, itemsToShow);

  return (
    <section className={styles.teachersSection}>
      <h1>Teachers</h1>

      <div className={styles.filters}>
        {/* Фільтри */}
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

      <ul className={styles.teacherList}>
        {visibleTeachers.map((teacher, index) => (
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
            <button onClick={() => setSelectedTeacherForTrial(teacher)}>
              Book trial lesson
            </button>

            <button onClick={() => setSelectedTeacher(teacher)}>
              Read more
            </button>
            <button
              onClick={() => toggleFavorite(teacher)}
              className={styles.heartBtn}
            >
              {isFavorite(teacher) ? "💖" : "🤍"}
            </button>
          </li>
        ))}
      </ul>

      {itemsToShow < filteredTeachers.length && (
        <button onClick={handleLoadMore} className={styles.loadMoreBtn}>
          Load more
        </button>
      )}

      {/* Модальне вікно */}
      {selectedTeacher &&
        ((
          <TeacherModal
            teacher={selectedTeacher}
            onClose={() => setSelectedTeacher(null)}
          />
        ),
        (
          <TrialLessonModal
            teacher={selectedTeacherForTrial}
            onClose={() => setSelectedTeacherForTrial(null)}
          />
        ))}
    </section>
  );
};

export default TeachersPage;
