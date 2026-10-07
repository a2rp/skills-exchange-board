import { FiArrowDown, FiRepeat, FiUsers } from "react-icons/fi";
import styles from "./styles.module.css";

const BoardIntro = ({ skillCount, memberCount }) => (
    <section className={styles.intro} aria-labelledby="intro-title">
        <div className={styles.copy}>
            <p className={styles.label}>Northbank skill exchange</p>
            <h1 id="intro-title">
                Trade a skill.
                <br />
                <span>Take one home.</span>
            </h1>
            <p className={styles.description}>
                Share something you know, meet a neighbor, and learn a useful
                skill in return. No money needed. Just a little time and
                curiosity.
            </p>
            <div className={styles.actions}>
                <a className={styles.primaryLink} href="#exchange-board">
                    Find a skill to swap
                    <FiArrowDown aria-hidden="true" />
                </a>
                <a className={styles.secondaryLink} href="#how-it-works">
                    How swaps work
                    <FiRepeat aria-hidden="true" />
                </a>
            </div>
            <div className={styles.communityCount}>
                <span className={styles.countIcon} aria-hidden="true">
                    <FiUsers />
                </span>
                <p>
                    <strong>{memberCount} neighbors</strong> have shared a skill
                    <br />
                    <span>{skillCount} ways to start learning this week</span>
                </p>
            </div>
        </div>

        <div
            className={styles.photoGrid}
            aria-label="Skills shared by neighbors"
        >
            <figure className={styles.mainPhoto}>
                <img
                    src={import.meta.env.BASE_URL + "images/salsa-swap.jpg"}
                    alt="Two people practicing a dance together"
                />
                <figcaption>
                    <span>Move together</span>
                    <strong>Try a first dance class</strong>
                </figcaption>
            </figure>
            <figure className={styles.smallPhoto}>
                <img
                    src={import.meta.env.BASE_URL + "images/reading-circle.jpg"}
                    alt="A young reader sitting with an open book"
                />
                <figcaption>Read a new chapter</figcaption>
            </figure>
            <figure className={styles.smallPhoto}>
                <img
                    src={import.meta.env.BASE_URL + "images/kayak-lesson.jpg"}
                    alt="A person paddling a kayak across a lake"
                />
                <figcaption>Learn on the water</figcaption>
            </figure>
            <div className={styles.swapNote}>
                <FiRepeat aria-hidden="true" />
                <span>A lesson goes both ways</span>
            </div>
        </div>
    </section>
);

export default BoardIntro;
