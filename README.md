# Pages & Co.

Welcome to the frontend application for Pages & Co. This repository is built using React, Vite, and TypeScript, configured with modern frontend architecture and tooling.

## Installation & Setup

This project uses [Bun](https://bun.sh/) as its primary package manager and runtime for speed and efficiency.

### Prerequisites

Make sure you have [Bun installed](https://bun.sh/docs/installation) on your machine.

```bash
curl -fsSL https://bun.sh/install | bash
```

### Steps

1. **Clone the repository** (if not already done)

   ```bash
   git clone https://github.com/pilaf-pro/pages-and-co.git
   cd pages-and-co
   ```

2. **Install dependencies**

   ```bash
   bun install
   ```

3. **Start the development server**
   ```bash
   bun run dev
   ```
   _The application will typically start at `http://localhost:5173/`._

### Available Scripts

- `bun run dev` - Starts the Vite development server.
- `bun run build` - Compiles TypeScript and builds the production bundle.
- `bun run preview` - Locally preview the production build.
- `bun run lint` - Runs ESLint to check for code issues.
- `bun run type-check` - Runs the TypeScript compiler to verify type correctness.

---

## Project Structure

The project follows a feature-based architecture to keep code modular, scalable, and easy to navigate.

```text
src/
├── assets/          # Static assets like images and global SVG icons
├── components/      # Reusable UI components used across multiple features
│   ├── layout/      # Layout components (Header, Footer, MainLayout)
│   └── ui/          # Generic UI components (BookCard, Pagination, FadeInSection)
├── data/            # Static mock data sources (books.json, categories.json)
├── features/        # Feature-specific modules
│   ├── auth/        # Authentication pages (Login, Register)
│   ├── checkout/    # UI of Checkout page
│   ├── detail/      # UI of Book Details page
│   ├── home/        # UI of Home page
│   ├── list/        # UI of List/Category page
│   └── not-found/   # UI of 404 Not Found page
├── layouts/         # High-level layout wrappers for pages
├── routes/          # Routing configuration (react-router-dom)
├── styles/          # Global styles, CSS variables, and resets
├── types/           # TypeScript interfaces and types (e.g., book.ts)
├── utils/           # Helper functions and utilities (e.g., textUtils)
├── App.tsx          # Main Application component that initializes the router
└── main.tsx         # React entry point
```

### Core Technologies

- **React 19**
- **Vite** (Build tool)
- **TypeScript** (Static typing)
- **CSS Modules** (Component-scoped styling)
- **React Router v7** (Client-side routing)
- **Bun** (Package management)
- **ESLint / Prettier** (Code formatting & linting)
