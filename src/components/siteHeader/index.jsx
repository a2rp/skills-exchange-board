import { useEffect, useRef, useState } from "react";
import { FaBars, FaGithub, FaXmark } from "react-icons/fa6";
import styles from "./styles.module.css";

const navigationLinks = [
    { href: "#exchange-board", label: "Explore skills" },
    { href: "#your-card", label: "My exchange" },
    { href: "#how-it-works", label: "How it works" },
];

const SiteHeader = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const headerRef = useRef(null);

    useEffect(() => {
        if (!menuOpen) {
            return undefined;
        }

        const closeOnOutsideClick = (event) => {
            if (!headerRef.current?.contains(event.target)) {
                setMenuOpen(false);
            }
        };
        const closeOnEscape = (event) => {
            if (event.key === "Escape") {
                setMenuOpen(false);
            }
        };

        document.addEventListener("pointerdown", closeOnOutsideClick);
        document.addEventListener("keydown", closeOnEscape);

        return () => {
            document.removeEventListener("pointerdown", closeOnOutsideClick);
            document.removeEventListener("keydown", closeOnEscape);
        };
    }, [menuOpen]);

    const closeMenu = () => setMenuOpen(false);

    return (
        <header className={styles.siteHeader} ref={headerRef}>
            <div className={styles.inner}>
                <a
                    className={styles.brand}
                    href="#top"
                    aria-label="Skillloop home"
                >
                    <span className={styles.brandIcon} aria-hidden="true">
                        <span />
                        <span />
                    </span>
                    <span>skillloop</span>
                </a>

                <nav
                    className={menuOpen ? styles.navOpen : styles.nav}
                    id="site-navigation"
                    aria-label="Main navigation"
                >
                    {navigationLinks.map((link) => (
                        <a
                            className={styles.navLink}
                            href={link.href}
                            key={link.href}
                            onClick={closeMenu}
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                <div className={styles.actions}>
                    <a
                        className={styles.repositoryLink}
                        href="https://github.com/a2rp/skills-exchange-board"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <FaGithub aria-hidden="true" />
                        <span>Repository</span>
                    </a>
                    <button
                        className={styles.menuButton}
                        type="button"
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={menuOpen}
                        aria-controls="site-navigation"
                        onClick={() => setMenuOpen((open) => !open)}
                    >
                        {menuOpen ? (
                            <FaXmark aria-hidden="true" />
                        ) : (
                            <FaBars aria-hidden="true" />
                        )}
                    </button>
                </div>
            </div>
        </header>
    );
};

export default SiteHeader;
