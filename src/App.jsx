import BoardIntro from "./components/boardIntro/index.jsx";
import HowItWorks from "./components/howItWorks/index.jsx";
import SiteHeader from "./components/siteHeader/index.jsx";
import { skillListings } from "./data/skillListings.js";
import styles from "./App.module.css";

const App = () => (
    <div className={styles.appShell} id="top">
        <SiteHeader />
        <main className={styles.pageContent}>
            <BoardIntro
                skillCount={skillListings.length}
                memberCount={skillListings.length}
            />
            <section className={styles.placeholder} id="exchange-board">
                <p className={styles.label}>The community board</p>
                <h2>Find your next skill swap.</h2>
            </section>
            <HowItWorks />
        </main>
    </div>
);

export default App;
