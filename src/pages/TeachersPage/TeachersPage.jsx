// src/pages/TeachersPage.jsx
// import { useEffect, useState } from "react";
// import { ref, onValue } from "firebase/database";
// import { db } from "../../firebase/config";

// import css from "./TeachersPage.module.css";

// // Модальні вікна (створи свої компоненти окремо)
// import TeacherModal from "../../components/TeacherModal/TeacherModal";
// import TrialLessonModal from "../../components/TrialLessonModal/TrialLessonModal";
// import { Modal } from "../../components/Modal/Modal";

// const TeachersPage = () => {
//   const [allTeachers, setAllTeachers] = useState([]);
//   const [filteredTeachers, setFilteredTeachers] = useState([]);
//   const [itemsToShow, setItemsToShow] = useState(4);

//   const [selectedLanguage, setSelectedLanguage] = useState("");
//   const [selectedLevel, setSelectedLevel] = useState("");
//   const [selectedPrice, setSelectedPrice] = useState("");

//   const [selectedTeacher, setSelectedTeacher] = useState(null);
//   const [selectedTeacherForTrial, setSelectedTeacherForTrial] = useState(null);

//   const [favorites, setFavorites] = useState(() => {
//     const saved = localStorage.getItem("favorites");
//     return saved ? JSON.parse(saved) : [];
//   });

//   // ---- Фетч із Realtime Database ----
//   useEffect(() => {
//     const teachersRef = ref(db, "/");

//     const unsubscribe = onValue(teachersRef, (snapshot) => {
//       if (snapshot.exists()) {
//         const data = snapshot.val();
//         const teachersArray = Object.values(data);
//         setAllTeachers(teachersArray);
//         setFilteredTeachers(teachersArray);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   // ---- Фільтри ----
//   useEffect(() => {
//     let filtered = [...allTeachers];

//     if (selectedLanguage) {
//       filtered = filtered.filter((t) => t.languages.includes(selectedLanguage));
//     }

//     if (selectedLevel) {
//       filtered = filtered.filter((t) => t.levels.includes(selectedLevel));
//     }

//     if (selectedPrice) {
//       const maxPrice = parseInt(selectedPrice);
//       filtered = filtered.filter((t) => t.price_per_hour <= maxPrice);
//     }

//     setFilteredTeachers(filtered);
//     setItemsToShow(4);
//   }, [selectedLanguage, selectedLevel, selectedPrice, allTeachers]);

//   // ---- Фаворити ----
//   const isFavorite = (teacher) =>
//     favorites.some(
//       (fav) => fav.name === teacher.name && fav.surname === teacher.surname
//     );

//   const toggleFavorite = (teacher) => {
//     let updated;
//     if (isFavorite(teacher)) {
//       updated = favorites.filter(
//         (fav) => !(fav.name === teacher.name && fav.surname === teacher.surname)
//       );
//     } else {
//       updated = [...favorites, teacher];
//     }
//     setFavorites(updated);
//     localStorage.setItem("favorites", JSON.stringify(updated));
//   };

//   // ---- Кнопка Load more ----
//   const handleLoadMore = () => setItemsToShow((prev) => prev + 4);

//   const visibleTeachers = filteredTeachers.slice(0, itemsToShow);

//   return (
//     <section className={css.teachersSection}>
//       <h1>Teachers</h1>

//       {/* Фільтри */}
//       <div className={css.filters}>
//         <select
//           value={selectedLanguage}
//           onChange={(e) => setSelectedLanguage(e.target.value)}
//         >
//           <option value="">All Languages</option>
//           <option value="English">English</option>
//           <option value="Spanish">Spanish</option>
//           <option value="French">French</option>
//           <option value="German">German</option>
//           <option value="Mandarin Chinese">Mandarin Chinese</option>
//           <option value="Italian">Italian</option>
//           <option value="Vietnamese">Vietnamese</option>
//           <option value="Korean">Korean</option>
//         </select>

//         <select
//           value={selectedLevel}
//           onChange={(e) => setSelectedLevel(e.target.value)}
//         >
//           <option value="">All Levels</option>
//           <option value="A1 Beginner">A1 Beginner</option>
//           <option value="A2 Elementary">A2 Elementary</option>
//           <option value="B1 Intermediate">B1 Intermediate</option>
//           <option value="B2 Upper-Intermediate">B2 Upper-Intermediate</option>
//           <option value="C1 Advanced">C1 Advanced</option>
//           <option value="C2 Proficient">C2 Proficient</option>
//         </select>

//         <select
//           value={selectedPrice}
//           onChange={(e) => setSelectedPrice(e.target.value)}
//         >
//           <option value="">All Prices</option>
//           <option value="25">до $25</option>
//           <option value="30">до $30</option>
//           <option value="35">до $35</option>
//         </select>
//       </div>

//       {/* Список викладачів */}
//       <ul className={css.teacherList}>
//         {visibleTeachers.map((teacher, index) => (
//           <li key={index} className={css.teacherCard}>
//             <img
//               src={teacher.avatar_url}
//               alt={`${teacher.name} ${teacher.surname}`}
//             />
//             <h2>
//               {teacher.name} {teacher.surname}
//             </h2>
//             <p>Languages: {teacher.languages.join(", ")}</p>
//             <p>Levels: {teacher.levels.join(", ")}</p>
//             <p>Price: ${teacher.price_per_hour}</p>
//             <p>Rating: {teacher.rating}⭐</p>
//             <button onClick={() => setSelectedTeacherForTrial(teacher)}>
//               Book trial lesson
//             </button>
//             <button onClick={() => setSelectedTeacher(teacher)}>
//               Read more
//             </button>
//             <button
//               onClick={() => toggleFavorite(teacher)}
//               className={css.heartBtn}
//             >
//               {isFavorite(teacher) ? "💖" : "🤍"}
//             </button>
//           </li>
//         ))}
//       </ul>

//       {/* Load more */}
//       {itemsToShow < filteredTeachers.length && (
//         <button onClick={handleLoadMore} className={css.loadMoreBtn}>
//           Load more
//         </button>
//       )}

//       {/* Модальні вікна */}
//       {selectedTeacher && (
//         <TeacherModal
//           teacher={selectedTeacher}
//           onClose={() => setSelectedTeacher(null)}
//         />
//       )}

//       {selectedTeacherForTrial && (
//         <TrialLessonModal
//           teacher={selectedTeacherForTrial}
//           onClose={() => setSelectedTeacherForTrial(null)}
//         />
//       )}
//     </section>
//   );
// };

// export default TeachersPage;
// src/pages/TeachersPage/TeachersPage.jsx
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

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const [showAuthModal, setShowAuthModal] = useState(false);

  // --- Fetch teachers from Firebase ---
  useEffect(() => {
    const teachersRef = ref(db, "/"); // Якщо у тебе дані в корені
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

  // --- Filters ---
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

  // --- Favorites toggle ---
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
  const visibleTeachers = filteredTeachers.slice(0, itemsToShow);

  return (
    <section className={css.teachersSection}>
      <h1>Teachers</h1>

      {/* Filters */}
      <div className={css.filters}>
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

      {/* Teacher Cards */}
      <ul className={css.teacherList}>
        {visibleTeachers.map((teacher, index) => (
          <li
            key={index}
            className={`${css.teacherCard} ${css.fadeIn}`} // для плавного завантаження
          >
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
            <button onClick={() => setSelectedTeacher(teacher)}>Read more</button>
            <button
              onClick={() => toggleFavorite(teacher)}
              className={`${css.heartBtn} ${isFavorite(teacher) ? css.favorited : ""}`}
            >
              {isFavorite(teacher) ? "💖" : "🤍"}
            </button>
          </li>
        ))}
      </ul>

      {itemsToShow < filteredTeachers.length && (
        <button onClick={handleLoadMore} className={css.loadMoreBtn}>
          Load more
        </button>
      )}

      {/* Modals */}
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
