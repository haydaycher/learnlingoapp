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

  // Закриття по Esc
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
        <button className={styles.close} onClick={onClose}>
          ×
        </button>
        <h2>
          Book trial lesson with {teacher.name} {teacher.surname}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <input placeholder="Your Name" {...register("name")} />
          <p>{errors.name?.message}</p>

          <input placeholder="Your Email" {...register("email")} />
          <p>{errors.email?.message}</p>

          <textarea
            placeholder="Comment or request..."
            {...register("comment")}
          />
          <p>{errors.comment?.message}</p>

          <button type="submit">Send Request</button>
        </form>
      </div>
    </div>
  );
};

export default TrialLessonModal;
