import { FiArrowRight, FiBookmark, FiPlus, FiRepeat } from "react-icons/fi";
import styles from "./styles.module.css";

const MyExchangePanel = ({
    currentMember,
    savedCount,
    requestCount,
    onShowSaved,
    onShareSkill,
}) => (
    <aside
        className={styles.panel}
        id="your-card"
        aria-labelledby="my-exchange-title"
    >
        <div className={styles.panelHeader}>
            <span className={styles.icon} aria-hidden="true">
                <FiRepeat />
            </span>
            <span className={styles.openLabel}>Open to swaps</span>
        </div>

        <p className={styles.label}>Your exchange</p>
        <h2 id="my-exchange-title">Bring a skill. Leave with one.</h2>
        <p className={styles.description}>
            Your sample card helps the board find neighbors who fit.
        </p>

        <div className={styles.skillList}>
            <div className={styles.canShare}>
                <span>Can share</span>
                <strong>{currentMember.canTeach}</strong>
            </div>
            <div className={styles.wantToLearn}>
                <span>Want to learn</span>
                <strong>{currentMember.wantToLearn}</strong>
            </div>
        </div>

        <div className={styles.counts}>
            <div>
                <strong>{requestCount}</strong>
                <span>requests sent</span>
            </div>
            <div>
                <strong>{savedCount}</strong>
                <span>skills saved</span>
            </div>
        </div>

        <div className={styles.actions}>
            <button
                className={styles.savedButton}
                type="button"
                onClick={onShowSaved}
            >
                <FiBookmark aria-hidden="true" />
                Saved skills
                <span>{savedCount}</span>
                <FiArrowRight aria-hidden="true" />
            </button>
            <button
                className={styles.shareButton}
                type="button"
                onClick={onShareSkill}
            >
                <FiPlus aria-hidden="true" />
                Add your skill
            </button>
        </div>
    </aside>
);

export default MyExchangePanel;
