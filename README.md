# Prajwal H K — Portfolio

A minimal responsive developer portfolio built for Prajwal H K, a BCA student and AI/ML enthusiast.

## Tech Stack

- React + Vite + JavaScript
- Tailwind CSS
- Framer Motion
- Lucide React

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Edit the published portfolio

Open `/admin` on the deployed portfolio to edit profile details, add or remove projects, update project links, upload project screenshots, and replace the resume PDF. Choose **Publish updates** to commit the changes to this repository. The hosting provider must be connected to this GitHub repository with automatic deployments enabled for updates to appear publicly.

The editor asks for a GitHub fine-grained personal access token with access to `prajwalhk152-sketch/personal_portfolio` and **Contents: Read and write** permission. Create the token in GitHub's developer settings. The token is only held in the current browser tab while the page is open; it is not stored in the project or browser storage. Revoke it from GitHub when you no longer need it. Do not share it.

Portfolio content is stored in `public/portfolio.json`. Existing project images and resume remain in `public/`.

For Vercel, import the GitHub repository, select Vite, then deploy with `npm run build` and `dist` as output.
