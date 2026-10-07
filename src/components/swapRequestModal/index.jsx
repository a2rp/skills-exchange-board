import { useEffect, useRef, useState } from "react";
import { FiArrowRight, FiMapPin, FiRepeat, FiX } from "react-icons/fi";
import styles from "./styles.module.css";

const SwapRequestModal = ({ listing, currentMember, onClose, onSend }) => {
    const [offer, setOffer] = useState(currentMember.canTeach);
    const [message, setMessage] = useState("");
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
                "button:not([disabled]), input:not([disabled]), textarea:not([disabled]), a[href]",
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

    if (!listing) {
        return null;
    }

    const submitRequest = (event) => {
        event.preventDefault();
        onSend(listing, { offer: offer.trim(), message: message.trim() });
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
                aria-labelledby="request-title"
                aria-describedby="request-description"
            >
                <header className={styles.header}>
                    <div>
                        <p className={styles.label}>Start a skill swap</p>
                        <h2 id="request-title">Ask {listing.name} to trade</h2>
                    </div>
                    <button
                        className={styles.closeButton}
                        type="button"
                        aria-label="Close request dialog"
                        onClick={onClose}
                    >
                        <FiX aria-hidden="true" />
                    </button>
                </header>

                <div className={styles.swapSummary}>
                    <div className={styles.member}>
                        <img
                            src={
                                import.meta.env.BASE_URL +
                                "images/" +
                                listing.photo
                            }
                            alt=""
                        />
                        <div>
                            <strong>{listing.skill}</strong>
                            <span>{listing.name}</span>
                        </div>
                    </div>
                    <FiRepeat aria-hidden="true" />
                    <div className={styles.memberNeed}>
                        <span>They would learn</span>
                        <strong>{listing.lookingFor}</strong>
                    </div>
                </div>

                <p className={styles.description} id="request-description">
                    Tell {listing.name.split(" ")[0]} what you can share in
                    return.
                </p>

                <form className={styles.form} onSubmit={submitRequest}>
                    <label className={styles.field}>
                        <span>Your skill to offer</span>
                        <input
                            maxLength="60"
                            required
                            value={offer}
                            onChange={(event) => setOffer(event.target.value)}
                        />
                    </label>
                    <label className={styles.field}>
                        <span>Message</span>
                        <textarea
                            maxLength="240"
                            placeholder="Add a short note about when or how you could meet."
                            rows="3"
                            value={message}
                            onChange={(event) => setMessage(event.target.value)}
                        />
                    </label>
                    <div className={styles.location}>
                        <FiMapPin aria-hidden="true" />
                        <span>{listing.neighborhood}</span>
                        <span>{listing.format}</span>
                    </div>
                    <div className={styles.actions}>
                        <button
                            className={styles.cancelButton}
                            ref={cancelRef}
                            type="button"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button className={styles.sendButton} type="submit">
                            Send request
                            <FiArrowRight aria-hidden="true" />
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default SwapRequestModal;
