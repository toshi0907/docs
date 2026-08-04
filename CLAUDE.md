# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository purpose

This is a Jekyll-based technical documentation site (`各種ドキュメント保存用`) published via GitHub Pages at https://toshi0907.github.io/docs/. There is no application code — the deliverable is the set of Markdown reference pages under `docs/` and the Jekyll configuration/theme that renders them. There are no tests or linters in this repo; "correctness" means the site builds cleanly and pages render as expected.

## Repository layout

- `docs/` — the actual Jekyll site root (this is what gets built/served, not the repo root)
  - `_config.yml` — Jekyll config; `header_pages:` controls the nav bar page order
  - `Gemfile` — Ruby deps (Jekyll 4.3.0, Minima theme, jekyll-feed, jekyll-sitemap)
  - `_layouts/`, `_includes/` — custom layouts (`default.html`, `doc.html`, `page.html`) and partials (`head.html`, `header.html`)
  - `assets/js/search.js`, `assets/css/search.css`, `search.json` — client-side search (fetches `/docs/search.json` built from the collection)
  - `index.md` — homepage with the manual doc listing (must stay in sync with `_config.yml`'s `header_pages`)
  - `<topic>.md` (api, git, github, gdb, html, css, javascript, nodejs, python, csharp, regexp, nginx, shellscript, bat, jekyll, linux, termux, vscode, gas, ...) — individual reference docs, one per technology
- `copilot-instructions.md` (repo root) — Japanese content-writing guidelines for pages under `docs/*.md` (TOC, front matter, tone, Liquid-syntax escaping, etc.); the content-convention rules below are derived from it
- `.vscode/tasks.json` — VS Code build task that runs the Jekyll build+serve commands below

## Build / serve commands

All Jekyll commands must be run from the `docs/` subdirectory, not the repo root.

```bash
cd docs

# one-time: install bundler for this user, then put it on PATH (needed every new shell session)
gem install --user-install bundler
export PATH="$PATH:/home/runner/.local/share/gem/ruby/3.2.0/bin"

# install gems (first run takes ~15-20s; do not cancel, allow >=60s timeout)
bundle install --path ./vendor/bundle

# build the site (normally completes in well under 1s; do not cancel, allow >=30s timeout)
bundle exec jekyll build

# serve locally with live rebuild, bind to 0.0.0.0 so it's reachable in a container
bundle exec jekyll serve --host 0.0.0.0 --port 4000
# site is then available at http://localhost:4000/docs/ (note the /docs/ baseurl)
```

There is no test suite or linter — validation is: build succeeds with no errors, then manually check the page in a running `jekyll serve` (TOC renders, code blocks render, links work).

Known, expected build noise (not failures): Liquid syntax warnings from `github.md` (documenting `${{ ... }}` GitHub Actions syntax) and Sass deprecation warnings from the Minima theme.

## Content conventions (from `copilot-instructions.md`)

When adding or editing a page under `docs/*.md`:

- Every page needs Jekyll front matter: `layout: page` and a `title`.
- Every page needs a table of contents using Jekyll/kramdown's auto-TOC, placed right after the front matter: `* 目次` followed by `{:toc}`. Do not hand-write a manual list-based TOC — it won't stay in sync with headings.
- Body text is written in Japanese (polite/丁寧語), with English technical terms glossed inline where useful (e.g. `shebang（シバン）`).
- When documenting template syntax that collides with Jekyll's Liquid parser (`${{ ... }}` from GitHub Actions, `${VAR}` from Docker Compose, Helm's `{{ .Values }}`, etc.), wrap the code block in `{% raw %} ... {% endraw %}` so Jekyll doesn't try to evaluate it.
- Adding a new page requires two additional edits to keep navigation consistent: add the filename to `header_pages:` in `docs/_config.yml`, and add a matching link to the list in `docs/index.md` — keep the ordering identical in both places.
- Each topic page ends with a `## 参考資料` (references) section split into `### 公式ドキュメント` / `### 学習リソース` / `### ツールとライブラリ` (and optionally `### ベストプラクティス・参考文献`). `copilot-instructions.md` itself should not contain reference links — only rules/guidelines belong there.

## Deployment

GitHub Pages builds and deploys automatically from the `docs/` folder on pushes to the main branch (Pages "Deploy from a branch" source) — there is no GitHub Actions workflow in this repo and no manual deploy step.
