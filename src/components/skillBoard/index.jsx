import { useState } from "react";
import { FiFilter, FiPlus, FiSearch, FiX } from "react-icons/fi";
import CreateSkillModal from "../createSkillModal/index.jsx";
import MyExchangePanel from "../myExchangePanel/index.jsx";
import SkillCard from "../skillCard/index.jsx";
import SwapRequestModal from "../swapRequestModal/index.jsx";
import styles from "./styles.module.css";

const viewOptions = [
    { id: "all", label: "All skills" },
    { id: "matches", label: "Good matches" },
    { id: "saved", label: "Saved" },
];

const normalize = (value) => value.trim().toLowerCase();

const isGoodSwap = (listing, currentMember) =>
    normalize(listing.skill) === normalize(currentMember.wantToLearn) &&
    normalize(listing.lookingFor) === normalize(currentMember.canTeach);

const SkillBoard = ({
    listings,
    currentMember,
    savedIds,
    sentRequestIds,
    requestCount,
    onToggleSaved,
    onSendRequest,
    onCreateListing,
}) => {
    const [view, setView] = useState("all");
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All categories");
    const [format, setFormat] = useState("Any meeting style");
    const [requestListing, setRequestListing] = useState(null);
    const [createOpen, setCreateOpen] = useState(false);

    const categories = [
        "All categories",
        ...new Set(listings.map((listing) => listing.category)),
    ];
    const formats = [
        "Any meeting style",
        ...new Set(listings.map((listing) => listing.format)),
    ];
    const matchCount = listings.filter((listing) =>
        isGoodSwap(listing, currentMember),
    ).length;
    const searchValue = normalize(search);

    const visibleListings = listings
        .filter((listing) => {
            const searchText = [
                listing.name,
                listing.skill,
                listing.lookingFor,
                listing.category,
                listing.neighborhood,
                listing.about,
            ]
                .join(" ")
                .toLowerCase();
            const matchesSearch =
                !searchValue || searchText.includes(searchValue);
            const matchesCategory =
                category === "All categories" || listing.category === category;
            const matchesFormat =
                format === "Any meeting style" || listing.format === format;
            const matchesView =
                view === "all" ||
                (view === "matches" && isGoodSwap(listing, currentMember)) ||
                (view === "saved" && savedIds.includes(listing.id));

            return (
                matchesSearch && matchesCategory && matchesFormat && matchesView
            );
        })
        .sort(
            (first, second) =>
                Number(isGoodSwap(second, currentMember)) -
                Number(isGoodSwap(first, currentMember)),
        );

    const openRequest = (listing) => setRequestListing(listing);
    const closeRequest = () => setRequestListing(null);
    const openCreateForm = () => setCreateOpen(true);
    const closeCreateForm = () => setCreateOpen(false);

    const sendRequest = (listing, details) => {
        onSendRequest(listing, details);
        setRequestListing(null);
    };

    const createListing = (listing) => {
        onCreateListing(listing);
        setCreateOpen(false);
        setView("all");
        setSearch("");
        setCategory("All categories");
        setFormat("Any meeting style");
    };

    const showSaved = () => {
        setView("saved");
        setSearch("");
        setCategory("All categories");
        setFormat("Any meeting style");
    };

    const resetFilters = () => {
        setView("all");
        setSearch("");
        setCategory("All categories");
        setFormat("Any meeting style");
    };

    return (
        <>
            <section
                className={styles.board}
                id="exchange-board"
                aria-labelledby="board-title"
            >
                <div className={styles.heading}>
                    <div>
                        <p className={styles.label}>
                            Northbank community board
                        </p>
                        <h2 id="board-title">Find a skill worth sharing.</h2>
                        <p className={styles.description}>
                            Every card is a neighbor offering one lesson and
                            looking for one in return.
                        </p>
                    </div>
                    <button
                        className={styles.addButton}
                        type="button"
                        onClick={openCreateForm}
                    >
                        <FiPlus aria-hidden="true" />
                        Share a skill
                    </button>
                </div>

                <div className={styles.layout}>
                    <div className={styles.main}>
                        <div className={styles.filters}>
                            <div
                                className={styles.tabs}
                                role="tablist"
                                aria-label="Skill list views"
                            >
                                {viewOptions.map((option) => {
                                    const count =
                                        option.id === "all"
                                            ? listings.length
                                            : option.id === "matches"
                                              ? matchCount
                                              : savedIds.length;

                                    return (
                                        <button
                                            className={
                                                view === option.id
                                                    ? styles.activeTab
                                                    : styles.tab
                                            }
                                            id={`view-${option.id}`}
                                            key={option.id}
                                            type="button"
                                            role="tab"
                                            aria-selected={view === option.id}
                                            aria-controls="skill-results"
                                            onClick={() => setView(option.id)}
                                        >
                                            {option.label}
                                            <span>{count}</span>
                                        </button>
                                    );
                                })}
                            </div>

                            <div className={styles.filterFields}>
                                <label className={styles.searchField}>
                                    <span>Search skills or neighbors</span>
                                    <div>
                                        <FiSearch aria-hidden="true" />
                                        <input
                                            type="search"
                                            placeholder="Try pottery, Spanish, or a name"
                                            value={search}
                                            onChange={(event) =>
                                                setSearch(event.target.value)
                                            }
                                        />
                                        {search ? (
                                            <button
                                                type="button"
                                                aria-label="Clear search"
                                                onClick={() => setSearch("")}
                                            >
                                                <FiX aria-hidden="true" />
                                            </button>
                                        ) : null}
                                    </div>
                                </label>
                                <label className={styles.selectField}>
                                    <span>Category</span>
                                    <select
                                        value={category}
                                        onChange={(event) =>
                                            setCategory(event.target.value)
                                        }
                                    >
                                        {categories.map((item) => (
                                            <option key={item}>{item}</option>
                                        ))}
                                    </select>
                                </label>
                                <label className={styles.selectField}>
                                    <span>Meeting style</span>
                                    <select
                                        value={format}
                                        onChange={(event) =>
                                            setFormat(event.target.value)
                                        }
                                    >
                                        {formats.map((item) => (
                                            <option key={item}>{item}</option>
                                        ))}
                                    </select>
                                </label>
                            </div>
                        </div>

                        <div className={styles.resultsHeading}>
                            <div>
                                <span
                                    className={styles.resultIcon}
                                    aria-hidden="true"
                                >
                                    <FiFilter />
                                </span>
                                <strong id="result-count">
                                    {visibleListings.length}{" "}
                                    {visibleListings.length === 1
                                        ? "skill"
                                        : "skills"}
                                </strong>
                                <span>to explore</span>
                            </div>
                            <span>Good matches appear first</span>
                        </div>

                        {visibleListings.length ? (
                            <div
                                className={styles.cardGrid}
                                id="skill-results"
                                role="tabpanel"
                                aria-labelledby={`view-${view}`}
                                aria-live="polite"
                            >
                                {visibleListings.map((listing) => (
                                    <SkillCard
                                        key={listing.id}
                                        listing={listing}
                                        isMatch={isGoodSwap(
                                            listing,
                                            currentMember,
                                        )}
                                        isSaved={savedIds.includes(listing.id)}
                                        requestSent={sentRequestIds.includes(
                                            listing.id,
                                        )}
                                        onRequest={openRequest}
                                        onToggleSaved={onToggleSaved}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div
                                className={styles.emptyState}
                                id="skill-results"
                                role="tabpanel"
                                aria-labelledby={`view-${view}`}
                            >
                                <span
                                    className={styles.emptyIcon}
                                    aria-hidden="true"
                                >
                                    <FiSearch />
                                </span>
                                <h3>No skills found</h3>
                                <p>
                                    Try another search, category, or meeting
                                    style.
                                </p>
                                <button type="button" onClick={resetFilters}>
                                    Show all skills
                                </button>
                            </div>
                        )}
                    </div>

                    <div className={styles.summary}>
                        <MyExchangePanel
                            currentMember={currentMember}
                            savedCount={savedIds.length}
                            requestCount={requestCount}
                            onShowSaved={showSaved}
                            onShareSkill={openCreateForm}
                        />
                    </div>
                </div>
            </section>

            {requestListing ? (
                <SwapRequestModal
                    listing={requestListing}
                    currentMember={currentMember}
                    onClose={closeRequest}
                    onSend={sendRequest}
                />
            ) : null}
            {createOpen ? (
                <CreateSkillModal
                    onClose={closeCreateForm}
                    onCreate={createListing}
                />
            ) : null}
        </>
    );
};

export default SkillBoard;
