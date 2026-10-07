import {
    FaCodepen,
    FaFacebookF,
    FaGithub,
    FaLinkedinIn,
    FaYoutube,
} from "react-icons/fa6";
import { FiCoffee, FiHeart, FiMail, FiShield } from "react-icons/fi";
import styles from "./styles.module.css";

const profileLinks = [
    { label: "Portfolio", href: "https://www.ashishranjan.net", Icon: FiHeart },
    { label: "GitHub", href: "https://github.com/a2rp", Icon: FaGithub },
    { label: "CodePen", href: "https://codepen.io/ash1198", Icon: FaCodepen },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/aashishranjan", Icon: FaLinkedinIn },
    { label: "Facebook", href: "https://www.facebook.com/theash.ashish/", Icon: FaFacebookF },
    { label: "YouTube", href: "https://www.youtube.com/@ashishranjan-ashz?sub_confirmation=1", Icon: FaYoutube },
    { label: "Email", href: "mailto:ash.ranjan09@gmail.com", Icon: FiMail },
    { label: "Source code", href: "https://github.com/a2rp/skills-exchange-board", Icon: FaGithub },
];

const supportLinks = [
    { label: "Support", href: "https://a2rp-donation-page.netlify.app/", Icon: FiHeart },
    { label: "Buy Me a Coffee", href: "https://buymeacoffee.com/ashishranjan", Icon: FiCoffee },
    { label: "Patreon", href: "https://www.patreon.com/ashishranjan", Icon: FiShield },
];

const FooterLink = ({ link }) => {
    const { label, href, Icon } = link;

    return (
        <a className={styles.link} href={href} target="_blank" rel="noreferrer">
            <Icon aria-hidden="true" />
            <span>{label}</span>
        </a>
    );
};

const SiteFooter = () => (
    <footer className={styles.siteFooter}>
        <div className={styles.inner}>
            <div className={styles.credit}>
                <a
                    className={styles.logoLink}
                    href="https://www.ashishranjan.net"
                    target="_blank"
                    rel="noreferrer"
                >
                    <img
                        src={import.meta.env.BASE_URL + "logo.png"}
                        alt="Ashish Ranjan"
                        width="32"
                        height="32"
                    />
                </a>
                <p>
                    © {new Date().getFullYear()}{" "}
                    <a href="https://github.com/a2rp" target="_blank" rel="noreferrer">
                        Ashish Ranjan
                    </a>
                    . All rights reserved.
                </p>
            </div>

            <div className={styles.linkGroups}>
                <section className={styles.linkGroup} aria-labelledby="footer-links-title">
                    <h2 id="footer-links-title">Links</h2>
                    <div className={styles.linkList}>
                        {profileLinks.map((link) => (
                            <FooterLink key={link.label} link={link} />
                        ))}
                    </div>
                </section>
                <section className={styles.linkGroup} aria-labelledby="footer-support-title">
                    <h2 id="footer-support-title">Support</h2>
                    <div className={styles.linkList}>
                        {supportLinks.map((link) => (
                            <FooterLink key={link.label} link={link} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
        <div className={styles.bottom}>
            <span>Skillloop · A neighborhood skill board</span>
            <a href="#top">Back to start</a>
        </div>
    </footer>
);

export default SiteFooter;
