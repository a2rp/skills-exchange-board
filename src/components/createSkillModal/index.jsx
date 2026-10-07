import { useEffect, useRef, useState } from "react";
import { FiPlus, FiX } from "react-icons/fi";
import styles from "./styles.module.css";

const photoOptions = [
    { value: "mentor-portrait.jpg", label: "A neighbor" },
    { value: "salsa-swap.jpg", label: "Dance practice" },
    { value: "street-photo-walk.jpg", label: "Street photo walk" },
    { value: "reading-circle.jpg", label: "Reading practice" },
    { value: "kayak-lesson.jpg", label: "Kayak lesson" },
    { value: "dog-walk.jpg", label: "Dog walking" },
    { value: "waterfall-hike.jpg", label: "Nature journaling" },
];

const CreateSkillModal = ({ onClose, onCreate }) => {
    const [form, setForm] = useState({
        name: "",
        neighborhood: "Northbank",
        skill: "",
        lookingFor: "",
        category: "Creative",
        format: "In person",
        availability: "Weekends",
        photo: "mentor-portrait.jpg",
        about: "",
    });
    const dialogRef = useRef(null);
    const cancelRef = useRef(null);

    useEffect(() => {
        const previousFocus = document.activeElement;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        cancelRef.current?.focus();

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                onClose();
                return;
            }

            if (event.key !== "Tab" || !dialogRef.current) {
                return;
            }

            const focusable = dialogRef.current.querySelectorAll(
                "button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])",
            );
            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last?.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first?.focus();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener("keydown", handleKeyDown);
            previousFocus?.focus?.();
        };
    }, [onClose]);

    const updateField = (event) => {
        const { name, value } = event.target;
        setForm((current) => ({ ...current, [name]: value }));
    };

    const submitForm = (event) => {
        event.preventDefault();
        onCreate({
            ...form,
            id: Date.now().toString(),
            name: form.name.trim(),
            neighborhood: form.neighborhood.trim(),
            skill: form.skill.trim(),
            lookingFor: form.lookingFor.trim(),
            about: form.about.trim(),
        });
    };

    return (
        <div
            className={styles.backdrop}
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    onClose();
                }
            }}
        >
            <section
                className={styles.dialog}
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="create-skill-title"
                aria-describedby="create-skill-description"
            >
                <header className={styles.header}>
                    <div>
                        <p className={styles.label}>Add to the board</p>
                        <h2 id="create-skill-title">Share a skill</h2>
                        <p
                            className={styles.description}
                            id="create-skill-description"
                        >
                            Tell the neighborhood what you can teach and what
                            you hope to learn.
                        </p>
                    </div>
                    <button
                        className={styles.closeButton}
                        type="button"
                        aria-label="Close skill form"
                        onClick={onClose}
                    >
                        <FiX aria-hidden="true" />
                    </button>
                </header>

                <form className={styles.form} onSubmit={submitForm}>
                    <div className={styles.fields}>
                        <label className={styles.field}>
                            <span>Your name</span>
                            <input
                                autoComplete="name"
                                maxLength="48"
                                name="name"
                                placeholder="Name neighbors will see"
                                required
                                value={form.name}
                                onChange={updateField}
                            />
                        </label>
                        <label className={styles.field}>
                            <span>Neighborhood</span>
                            <input
                                maxLength="48"
                                name="neighborhood"
                                required
                                value={form.neighborhood}
                                onChange={updateField}
                            />
                        </label>
                        <label className={styles.field}>
                            <span>Skill you can teach</span>
                            <input
                                maxLength="56"
                                name="skill"
                                placeholder="For example, pottery basics"
                                required
                                value={form.skill}
                                onChange={updateField}
                            />
                        </label>
                        <label className={styles.field}>
                            <span>Skill you want to learn</span>
                            <input
                                maxLength="56"
                                name="lookingFor"
                                placeholder="For example, resume feedback"
                                required
                                value={form.lookingFor}
                                onChange={updateField}
                            />
                        </label>
                        <label className={styles.field}>
                            <span>Category</span>
                            <select
                                name="category"
                                value={form.category}
                                onChange={updateField}
                            >
                                <option>Creative</option>
                                <option>Home &amp; food</option>
                                <option>Language</option>
                                <option>Movement</option>
                                <option>Outdoors</option>
                                <option>Reading</option>
                                <option>Technology</option>
                            </select>
                        </label>
                        <label className={styles.field}>
                            <span>Meeting style</span>
                            <select
                                name="format"
                                value={form.format}
                                onChange={updateField}
                            >
                                <option>In person</option>
                                <option>Online</option>
                                <option>Online or in person</option>
                            </select>
                        </label>
                        <label className={styles.field}>
                            <span>Best time</span>
                            <input
                                maxLength="48"
                                name="availability"
                                value={form.availability}
                                onChange={updateField}
                            />
                        </label>
                        <label className={styles.field}>
                            <span>Photo</span>
                            <select
                                name="photo"
                                value={form.photo}
                                onChange={updateField}
                            >
                                {photoOptions.map((photo) => (
                                    <option
                                        key={photo.value}
                                        value={photo.value}
                                    >
                                        {photo.label}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <label className={styles.field}>
                        <span>A short introduction</span>
                        <textarea
                            maxLength="180"
                            name="about"
                            placeholder="What can a neighbor expect to learn?"
                            rows="3"
                            value={form.about}
                            onChange={updateField}
                        />
                    </label>
                    <div className={styles.actions}>
                        <button
                            className={styles.cancelButton}
                            ref={cancelRef}
                            type="button"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button className={styles.submitButton} type="submit">
                            <FiPlus aria-hidden="true" />
                            Add my skill
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default CreateSkillModal;
