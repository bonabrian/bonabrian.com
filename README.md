<h1 align="center">
  My Own Digital Home on the Internet
</h1>

<p align="center">
  This is my personal website built with <a href="https://nextjs.org/" target="_blank">Next.js</a>, <a href="https://tailwindcss.com/" target="_blank">Tailwind CSS</a>, and hosted on <a href="https://www.vercel.com/" target="_blank">Vercel</a>
</p>

<br/>
<div align="center">

  <a href="https://bonabrian.com" target="_blank">![View Demo](https://img.shields.io/badge/View%20Demo-8865ff?style=for-the-badge)</a> <a href="https://github.com/bonabrian/bonabrian.com/issues/new?assignees=&labels=bug&template=bug_report.md&title=" target="_blank">![Report Bug](https://img.shields.io/badge/Report%20Bug-ff5432?style=for-the-badge)</a> <a href="https://github.com/bonabrian/bonabrian.com/issues/new?assignees=&labels=&template=feature_request.md&title=" target="_blank">![Request Feature](https://img.shields.io/badge/Request%20Feature-96d117?style=for-the-badge)</a> <a href="https://github.com/bonabrian/bonabrian.com/fork" target="_blank">![Forks](https://img.shields.io/github/forks/bonabrian/bonabrian.com?color=8865ff&style=for-the-badge)</a> <a href="https://github.com/bonabrian/bonabrian.com/stargazers" target="_blank">![Stars](https://img.shields.io/github/stars/bonabrian/bonabrian.com?color=8865ff&style=for-the-badge)</a>

</div>

## Running Locally
1. Clone this repository
   ```bash
   git clone https://github.com/bonabrian/bonabrian.com.git
   ```
2. Change directory
   ```bash
   cd bonabrian.com
   ```
3. Install dependencies
   ```bash
   yarn
   ```
4. Create a `.env` file similar to [`.env.example`](https://github.com/bonabrian/bonabrian.com/blob/main/.env.example) and input environment variables
   ```txt
    # Google
    GOOGLE_ID=#GOOGLE_ID
    GOOGLE_SECRET=#GOOGLE_SECRET

    # Sentry
    SENTRY_DSN=#SENTRY_DSN

    # PlanetScale DB
    DATABASE_URL=#PLANET_SCALE_DB_MAIN
    SHADOW_DATABASE_URL=#PLANET_SCALE_DB_DEV

    # GitHub
    GITHUB_ID=#GITHUB_ID
    GITHUB_SECRET=#GITHUB_SECRET

    # Spotify
    SPOTIFY_CLIENT_ID=#SPOTIFY_CLIENT_ID
    SPOTIFY_CLIENT_SECRET=#SPOTIFY_CLIENT_SECRET
    SPOTIFY_CLIENT_REFRESH_TOKEN=#SPOTIFY_CLIENT_REFRESH_TOKEN
   ```

5. Start hacking
   ```bash
   yarn dev
   ```

## Files to customize

- `config/*` - contains most of the site related information which should modified for a user's need.
- `pages/about.tsx` - update with yours.
- `public/share/resume.pdf` - replace with your best resume.
- `public/static` - store assets such as images and favicons.
- `tailwind.config.js` - contains the tailwind styles, and modify as you like to change overall look and feel to the site.
- `content` - replace with your blog posts, projects, and snippets.
- `next.config.js` - configuration related to Next.js. You need to adapt the Content Security Policy if you want to load scripts, images etc. from other domains. 

## Stack
- **Framework**: [Next.js](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database**: [PlanetScale](https://planetscale.com)
- **ORM**: [Prisma](https://prisma.io/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Deployment**: [Vercel](https://vercel.com)
- **Content**: [MDX](https://github.com/mdx-js/mdx), [contentlayer](https://github.com/contentlayerdev/contentlayer)
- **Monitoring**: [Sentry](https://sentry.io)

## Contributing
Contributions make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **really appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue and don't forget to give the project a star!

1. Fork the Project
2. Commit your Changes

   ```bash
   git commit -m 'Add some amazing feature'
   ```

3. Push to the Branch

   ```bash
   git push origin main
   ```

4. Open a Pull Request

<div align="center">

[![PRs Welcome](https://img.shields.io/badge/PR-Welcome-8865ff?style=for-the-badge)](https://makeapullrequest.com)

</div>
