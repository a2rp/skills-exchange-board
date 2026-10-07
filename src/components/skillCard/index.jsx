import { FiArrowUpRight, FiBookmark, FiCheck, FiMapPin, FiRepeat } from "react-icons/fi";
import styles from "./styles.module.css";

const SkillCard = ({
    listing,
    isMatch,
    isSaved,
    requestSent,
    onRequest,
    onToggleSaved,
}) => (
    <article className={isMatch ? styles.matchCard : styles.card}>
        <div className={styles.photo}>
            <img
                src={import.meta.env.BASE_URL + "images/" + listing.photo}
                alt=""
                loading="lazy"
            />
            <span className={styles.category}>{listing.category}</span>
            {isMatch ? (
                <span className={styles.matchLabel}>
                    <FiRepeat aria-hidden="true" />
                    Good swap fit
                </span>
            ) : null}
            <button
                className={isSaved ? styles.savedButton : styles.saveButton}
                type="button"
                aria-label={isSaved ? "Remove from saved skills" : "Save skill"}
                aria-pressed={isSaved}
                onClick={() => onToggleSaved(listing.id)}
            >
                <FiBookmark aria-hidden="true" />
            </button>
        </div>

        <div className={styles.content}>
            <div className={styles.member}>
                <span className={styles.initials} aria-hidden="true">
                    {listing.name
                        .split(" ")
                        .map((part) => part[0])
                        .join("")}
                </span>
                <div>
                    <strong>{listing.name}</strong>
                    <span>{listing.neighborhood}</span>
                </div>
                <span className={styles.format}>{listing.format}</span>
            </div>

            <h3>{listing.skill}</h3>
            <p className={styles.about}>{listing.about}</p>

            <div className={styles.exchangeDetails}>
                <div className={styles.offer}>
                    <span>Can show you</span>
                    <strong>{listing.skill}</strong>
                </div>
                <FiRepeat className={styles.exchangeIcon} aria-hidden="true" />
                <div className={styles.want}>
                    <span>Would learn</span>
                    <strong>{listing.lookingFor}</strong>
                </div>
            </div>

            <div className={styles.cardFooter}>
                <span className={styles.location}>
                    <FiMapPin aria-hidden="true" />
                    {listing.neighborhood}
                </span>
                <span className={styles.availability}>{listing.availability}</span>
            </div>

            <button
                className={requestSent ? styles.sentButton : styles.requestButton}
                type="button"
                disabled={requestSent}
                onClick={() => onRequest(listing)}
            >
                {requestSent ? (
                    <>
                        Request sent
                        <FiCheck aria-hidden="true" />
                    </>
                ) : (
                    <>
                        Request a swap
                        <FiArrowUpRight aria-hidden="true" />
                    </>
                )}
            </button>
        </div>
    </article>
);

export default SkillCard;
