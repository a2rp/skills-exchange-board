import { FiCheck, FiMessageCircle, FiSearch } from "react-icons/fi";
import styles from "./styles.module.css";

const steps = [
    {
        number: "01",
        title: "Share what you know",
        description: "Add one useful skill and say what you would like to learn in return.",
        Icon: FiCheck,
    },
    {
        number: "02",
        title: "Find a good fit",
        description: "Browse neighbors by skill, meeting style, or a direct swap match.",
        Icon: FiSearch,
    },
    {
        number: "03",
        title: "Make a simple plan",
        description: "Send a note, agree on a time, and trade a little know-how.",
        Icon: FiMessageCircle,
    },
];

const HowItWorks = () => (
    <section className={styles.howItWorks} id="how-it-works" aria-labelledby="steps-title">
        <div className={styles.heading}>
            <p className={styles.label}>A simple way to start</p>
            <h2 id="steps-title">Good swaps have three steps.</h2>
        </div>
        <div className={styles.steps}>
            {steps.map(({ number, title, description, Icon }) => (
                <article className={styles.step} key={number}>
                    <div className={styles.stepTop}>
                        <span>{number}</span>
                        <Icon aria-hidden="true" />
                    </div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                </article>
            ))}
        </div>
    </section>
);

export default HowItWorks;
