# 🚀 OSS Explorer

> 🔎 Discover Open-Source Projects Worth Building

A modern, responsive platform for discovering open-source projects based on **domain, technology, difficulty, and experience level**.

🌐 **Live Demo:** https://ossexplorer.vercel.app/

---

## ✨ Features

🔎 **Smart Search**
- Search projects by name
- Search descriptions
- Search technologies
- Search domains

🎯 **Powerful Filters**
- Filter by domain
- Filter by difficulty
- Filter by technology
- Select multiple technologies
- Filter beginner-friendly projects

⭐ **Project Sorting**
- Most stars
- Least stars
- Recently added
- Relevance

🔗 **URL-Based Filtering**

Filters are synchronized with the URL, so filtered results can be shared directly.

Example:

`/projects?domain=Backend&difficulty=Intermediate&technology=Python`

This means filters survive:

- 🔄 Page refresh
- 🔗 Shared URLs
- ⬅️ Browser Back
- ➡️ Browser Forward

🔖 **Bookmarks**

Save interesting projects and access them later from:

`/saved`

Bookmarks are persisted in the browser.

📄 **Project Details**

Every project has a dedicated page containing:

- 📌 Project information
- 🏷️ Technologies
- ⭐ GitHub stars
- 🎯 Difficulty
- 🌱 Beginner-friendly status
- 🔗 GitHub repository
- 🔖 Bookmark
- 📤 Share

🌙 **Dark Mode**

Complete dark/light theme support across the application.

📱 **Responsive Design**

Designed for:

- 💻 Desktop
- 💻 Laptop
- 📱 Tablet
- 📱 Mobile

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| ⚛️ React | UI development |
| ▲ Next.js 16 | Application framework |
| 📘 TypeScript | Type safety |
| 🎨 Tailwind CSS | Styling |
| 🧭 App Router | Routing |
| 💾 Local Storage | Bookmark persistence |
| 🔄 useSyncExternalStore | Bookmark state |
| ▲ Vercel | Deployment |

---

## 🧭 Pages

| Route | Description |
|---|---|
| 🏠 `/` | Home page |
| 🔎 `/projects` | Project explorer |
| 📄 `/projects/[id]` | Project details |
| 🔖 `/saved` | Saved projects |

---

## 🏗️ Project Structure

```text
src/
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   ├── globals.css
│   │
│   ├── projects/
│   │   ├── page.tsx
│   │   ├── ProjectsContent.tsx
│   │   └── [id]/
│   │       ├── page.tsx
│   │       └── not-found.tsx
│   │
│   └── saved/
│       └── page.tsx
│
├── components/
│   ├── home/
│   ├── layout/
│   ├── project/
│   └── ui/
│
├── data/
│   └── projects.ts
│
└── lib/
    ├── bookmarks.ts
    └── cn.ts