import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./TrialLessonModal.module.css";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  comment: yup.string().required("Comment is required"),
});

const TrialLessonModal = ({ teacher, onClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("Booking data:", data);
    alert("Trial lesson booked successfully!");
    reset();
    onClose();
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!teacher) return null;

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <button type="button" className={styles.closeBtn} onClick={onClose}>
          <img src="/x.svg" alt="close" />
        </button>

        <h2>
          Book trial lesson with {teacher.name} {teacher.surname}
        </h2>
        <p>
          Our experienced tutor will assess your current language level, discuss
          your learning goals, and tailor the lesson to your specific needs.
        </p>

        <div className={styles.teacherInfo}>
          {teacher.avatar_url && (
            <img
              src={teacher.avatar_url}
              alt={`${teacher.name} ${teacher.surname}`}
              className={styles.teacherAvatar}
            />
          )}
          <div className={styles.cardInfo}>
            <p>Your teacher</p>
            <h3>
              {teacher.name} {teacher.surname}
            </h3>
          </div>
        </div>

        <div className={styles.reasonSection}>
          <p>What is your main reason for learning English?</p>
          <label>
            <input type="checkbox" {...register("reason")} value="Work" />
            Career and business
          </label>
          <label>
            <input type="checkbox" {...register("reason")} value="Study" />
            Lesson for kids
          </label>
          <label>
            <input type="checkbox" {...register("reason")} value="Travel" />
            Living abroad
          </label>
          <label>
            <input type="checkbox" {...register("reason")} value="Personal" />
            Exams and coursework
          </label>
          <label>
            <input type="checkbox" {...register("reason")} value="Other" />
            Culture, travel or hobby
          </label>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <input placeholder="Full Name" {...register("name")} />
          <p>{errors.name?.message}</p>

          <input placeholder="Email" {...register("email")} />
          <p>{errors.email?.message}</p>

          <input placeholder="Phone number" {...register("phone")} />
          <p>{errors.phone?.message}</p>

          <button className={styles.book_btn} type="submit">
            Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default TrialLessonModal;
