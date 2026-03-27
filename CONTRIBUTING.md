# Contributing to Lumineers

Thank you for contributing.

This document describes how to contribute safely and consistently to the project.

## Development Setup

1. Fork the repository and clone your fork.
2. Install dependencies:

```bash
npm install
```

3. Add environment variables in `.env.local` (Firebase keys).
4. Start the development server:

```bash
npm run dev
```

## Branching

Use short, focused branches from `main`.

Examples:

- `feat/story-card-ux`
- `fix/upload-validation`
- `docs/readme-refresh`

## Commit Style

Use clear, imperative commit messages.

Recommended format:

- `feat: add upload metadata validation`
- `fix: prevent null author avatar crash`
- `docs: update SEO setup notes`

## Quality Checklist

Before opening a pull request, run:

```bash
npm run lint
npm test
npm run build
```

Then verify:

- No console errors in primary routes (`/`, `/blogs`, `/upload`)
- Mobile and desktop UI both work
- New UI follows the established visual system
- No secrets or private credentials are committed

## Pull Request Guidelines

Include in the PR description:

1. What changed
2. Why it changed
3. Screenshots or short video for UI updates
4. Any migration or environment notes

Keep PRs focused. Large refactors should be split into smaller reviewable units.

## Reporting Issues

When filing a bug, include:

- Steps to reproduce
- Expected behavior
- Actual behavior
- Browser/device info
- Console/network errors (if any)

## Security

Do not open public issues containing API keys, tokens, or private project data.

If you discover a security-sensitive issue, contact the maintainers privately first.

## Code of Conduct

Be respectful and constructive in all project interactions.
