import { useEffect, useState } from "react";
import { FiCheck, FiX } from "react-icons/fi";
import BackToTop from "./components/backToTop/index.jsx";
import BoardIntro from "./components/boardIntro/index.jsx";
import HowItWorks from "./components/howItWorks/index.jsx";
import SiteFooter from "./components/siteFooter/index.jsx";
import SiteHeader from "./components/siteHeader/index.jsx";
import SkillBoard from "./components/skillBoard/index.jsx";
import { currentMember, skillListings } from "./data/skillListings.js";
import styles from "./App.module.css";

const storageKeys = {
    listings: "skillloop-listings",
    saved: "skillloop-saved",
    requests: "skillloop-requests",
};

const readList = (key, fallback) => {
    try {
        const stored = window.localStorage.getItem(key);
        const parsed = stored ? JSON.parse(stored) : null;
        return Array.isArray(parsed) ? parsed : fallback;
    } catch {
        return fallback;
    }
};

const writeList = (key, value) => {
    try {
        window.localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch {
        return false;
    }
};

const App = () => {
    const [listings, setListings] = useState(() =>
        readList(storageKeys.listings, skillListings),
    );
    const [savedIds, setSavedIds] = useState(() =>
        readList(storageKeys.saved, []),
    );
    const [requests, setRequests] = useState(() =>
        readList(storageKeys.requests, []),
    );
    const [notice, setNotice] = useState("");
    const sentRequestIds = requests.map((request) => request.listingId);

    useEffect(() => {
        if (!notice) {
            return undefined;
        }

        const timer = window.setTimeout(() => setNotice(""), 3400);
        return () => window.clearTimeout(timer);
    }, [notice]);

    const addListing = (listing) => {
        const nextListings = [listing, ...listings];
        setListings(nextListings);
        const saved = writeList(storageKeys.listings, nextListings);
        setNotice(
            saved
                ? "Your skill is on the board."
                : "Your skill was added for this visit.",
        );
    };

    const toggleSaved = (listingId) => {
        const nextSaved = savedIds.includes(listingId)
            ? savedIds.filter((id) => id !== listingId)
            : [listingId, ...savedIds];
        setSavedIds(nextSaved);
        const saved = writeList(storageKeys.saved, nextSaved);
        setNotice(
            saved
                ? "Saved skills are updated."
                : "Saved skills are updated for this visit.",
        );
    };

    const sendRequest = (listing, details) => {
        if (sentRequestIds.includes(listing.id)) {
            return;
        }

        const nextRequests = [
            {
                id: Date.now().toString(),
                listingId: listing.id,
                name: listing.name,
                skill: listing.skill,
                ...details,
                sentAt: new Date().toISOString(),
            },
            ...requests,
        ];
        setRequests(nextRequests);
        const saved = writeList(storageKeys.requests, nextRequests);
        setNotice(
            saved
                ? `Your request to ${listing.name} was saved.`
                : "Your request was added for this visit.",
        );
    };

    return (
        <div className={styles.appShell} id="top">
            <SiteHeader />
            <main className={styles.pageContent}>
                <BoardIntro
                    skillCount={listings.length}
                    memberCount={listings.length}
                />
                <SkillBoard
                    listings={listings}
                    currentMember={currentMember}
                    savedIds={savedIds}
                    sentRequestIds={sentRequestIds}
                    requestCount={requests.length}
                    onToggleSaved={toggleSaved}
                    onSendRequest={sendRequest}
                    onCreateListing={addListing}
                />
                <HowItWorks />
            </main>
            <SiteFooter />
            <BackToTop />
            {notice ? (
                <div className={styles.notice} role="status" aria-live="polite">
                    <span className={styles.noticeIcon} aria-hidden="true">
                        <FiCheck />
                    </span>
                    <p>{notice}</p>
                    <button
                        type="button"
                        aria-label="Dismiss message"
                        onClick={() => setNotice("")}
                    >
                        <FiX aria-hidden="true" />
                    </button>
                </div>
            ) : null}
        </div>
    );
};

export default App;
