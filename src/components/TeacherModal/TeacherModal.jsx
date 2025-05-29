import styles from "./TeacherModal.module.css";

const TeacherModal = ({ teacher, onClose }) => {
  if (!teacher) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <button onClick={onClose} className={styles.close}>
          ×
        </button>
        <h2>
          {teacher.name} {teacher.surname}
        </h2>
        <img src={teacher.avatar_url} alt={teacher.name} />
        <p>
          <strong>Languages:</strong> {teacher.languages.join(", ")}
        </p>
        <p>
          <strong>Levels:</strong> {teacher.levels.join(", ")}
        </p>
        <p>
          <strong>Experience:</strong> {teacher.experience}
        </p>
        <p>
          <strong>Conditions:</strong> {teacher.conditions.join(", ")}
        </p>
        <p>
          <strong>Lesson info:</strong> {teacher.lesson_info}
        </p>
        <p>
          <strong>Rating:</strong> {teacher.rating}
        </p>
      </div>
    </div>
  );
};

export default TeacherModal;
