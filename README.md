![Project screenshot](./screenshot.png)

# Skillloop

Skillloop is a community board where neighbors trade practical skills. A member shares one thing they can teach, names one thing they want to learn, and can find people whose swap fits both ways.

## What the project includes

- A searchable board of sample skills with member, neighborhood, category, meeting style, availability, and a short description.
- A `Good matches` view that highlights exact two-way matches. A listing is a match when the skill it offers is the skill the sample member wants, and the skill it wants is what the sample member can teach. Matching ignores letter case and surrounding spaces.
- Category and meeting-style filters, plus a search for skills, members, neighborhoods, and descriptions.
- Saved skills that stay saved in the same browser.
- A `Share a skill` form for adding a listing with a name, neighborhood, offered skill, wanted skill, category, meeting style, best time, photo, and introduction.
- A custom swap-request dialog with a skill offer and optional note. Sending a request updates that card and the request count.
- A personal exchange panel showing the sample offer, wanted skill, saved count, and requests sent.
- Local Picsum photos, a responsive fixed header, mobile navigation, a project footer, and a floating Back to top button after scrolling more than 50px.

## How to use it

1. Search for a person or skill, or choose a category and meeting style.
2. Open `Good matches` to see listings that fit the sample member's offer and learning goal.
3. Select the bookmark on a card to save it. Open `Saved` or use the `Saved skills` button in the personal panel to view saved cards.
4. Select `Request a swap`, enter the skill you can share, and send an optional note. The card changes to `Request sent` and the request count increases.
5. Select `Share a skill`, complete the form, and add your listing to the board.

## Data and limits

Listings, saved skill IDs, and sent request details are stored in this browser's local storage under `skillloop-listings`, `skillloop-saved`, and `skillloop-requests`. They remain on this browser and device only. Clearing the browser's local storage removes the saved data.

This is a front-end demo with sample neighbors. It does not have accounts, a server, real messaging, or scheduling. A sent request is recorded locally and shown in the interface; it is not delivered to another person. The sample member's offer and learning goal are fixed, and new listings can choose from the local sample photos rather than upload an image.

## Run locally

Use Node.js and npm in this folder:

```sh
npm install
npm run dev
```

Vite prints the local address in the terminal.

## Check and preview

```sh
npm run lint
npm run build
npm run preview
```

ESLint checks the source. Vite writes the production build to `dist`.

## Deploy

The project publishes from the `gh-pages` branch. `npm run deploy` runs the production build first and then publishes `dist`:

```sh
npm run deploy
```

Website: [https://a2rp.github.io/skills-exchange-board/](https://a2rp.github.io/skills-exchange-board/)

## Future improvements

These are ideas for later versions and are not implemented now:

- Add member accounts and server-backed listings.
- Deliver swap requests through messaging and add a shared schedule.
- Add distance-based search, member availability calendars, and meetup locations.
- Let members upload photos and add community moderation tools.

## Links

- Portfolio: [https://www.ashishranjan.net](https://www.ashishranjan.net)
- GitHub: [https://github.com/a2rp](https://github.com/a2rp)
- CodePen: [https://codepen.io/ash1198](https://codepen.io/ash1198)
- LinkedIn: [https://www.linkedin.com/in/aashishranjan](https://www.linkedin.com/in/aashishranjan)
- Facebook: [https://www.facebook.com/theash.ashish/](https://www.facebook.com/theash.ashish/)
- YouTube: [https://www.youtube.com/@ashishranjan-ashz?sub_confirmation=1](https://www.youtube.com/@ashishranjan-ashz?sub_confirmation=1)
- Email: [mailto:ash.ranjan09@gmail.com](mailto:ash.ranjan09@gmail.com)

## Support

- Support: [https://a2rp-donation-page.netlify.app/](https://a2rp-donation-page.netlify.app/)
- Buy Me a Coffee: [https://buymeacoffee.com/ashishranjan](https://buymeacoffee.com/ashishranjan)
- Patreon: [https://www.patreon.com/ashishranjan](https://www.patreon.com/ashishranjan)
