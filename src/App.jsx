import SiteHeader from "./components/siteHeader/index.jsx";
import styles from "./App.module.css";

const App = () => (
    <div className={styles.appShell} id="top">
        <SiteHeader />
        <main className={styles.pageContent}>
            <p className={styles.label}>A neighborhood learning board</p>
            <h1>Skills Exchange Board</h1>
            <p>Share what you know. Find something new to learn.</p>
        </main>
    </div>
);

export default App;
