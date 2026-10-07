import BoardIntro from "./components/boardIntro/index.jsx";
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
            <section className={styles.placeholder} id="how-it-works">
                <p className={styles.label}>How it works</p>
                <h2>Offer one skill. Learn another.</h2>
            </section>
        </main>
    </div>
);

export default App;
