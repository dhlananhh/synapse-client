# Synapse - A Modern Discussion Forum (Client-Side)

Synapse is the client-side implementation of a feature-rich, modern discussion forum inspired by platforms like Reddit. It is built with a cutting-edge technology stack and designed for a highly interactive and responsive user experience. This project serves as a comprehensive thesis demonstrating advanced concepts in frontend engineering.

## ✨ Key Features

- **Dynamic Post Feeds:** Infinitely scrolling homepage and community feeds with skeleton loaders for a smooth UX.
- **Content Sorting:** Sort feeds by "Hot," "New," and "Top" to discover content.
- **Interactive Voting System:** Real-time, optimistic UI updates for voting on posts.
- **Real-Time Simulation:** Live chat and a global notification system to make the app feel dynamic.
- **Complete Auth Flow:** User registration, login, and a dedicated onboarding experience.
- **Community & User Pages:** Dedicated pages for communities and user profiles with tabbed content views.
- **Professional UX Polish:**
  - Dark/Light mode with system preference detection.
  - Global loading progress bar.
  - `Cmd+K` Command Menu for power users.
  - Professional toast notifications with Sonner.
  - Reusable confirmation dialogs for destructive actions.
  - Beautiful empty states and custom 404 pages.
- **Fully Responsive Design:** A seamless experience on all devices, featuring a slide-out mobile navigation drawer.

## 🛠️ Technology Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **UI:** React, Tailwind CSS
- **Component Library:** Shadcn UI (Radix UI + Tailwind)
- **State Management:** React Context API (for low-frequency updates) & Zustand (for high-frequency updates like chat and notifications).
- **Forms:** React Hook Form & Zod (for validation).
- **UX Libraries:** `next-themes`, `nextjs-toploader`, `sonner`, `lucide-react`.

## 📁 Project Structure

The project follows a feature-centric architecture within the Next.js App Router paradigm. This structure is designed for scalability, maintainability, and clear separation of concerns.

```
synapse-client/
├── public/                         # 🏞️ Static assets (images, fonts, favicons)
└── src/
    ├── app/                        # 🗺️ Next.js App Router (Routing & Pages)
    │   ├── (auth)/                 # - Group for authentication pages (login, register)
    │   ├── (main)/                 # - Group for main application layout (with Navbar, etc.)
    │   │   ├── (communities)/
    │   │   │   └── c/[slug]/       # - Dynamic route for a single community
    │   │   ├── (posts)/
    │   │   │   └── p/[postId]/     # - Dynamic route for a single post
    │   │   ├── (user)/
    │   │   │   └── u/[username]/   # - Dynamic route for a user profile
    │   │   ├── feed/               # - The main post feed page (/feed)
    │   │   ├── settings/           # - User settings page (/settings)
    │   │   └── submit/             # - Create post page (/submit)
    │   ├── search/                 # - Search results page (/search)
    │   ├── layout.tsx              # - Root layout for the entire application
    │   └── page.tsx                # - The public landing page
    │
    ├── components/                 # 🧩 React Components
    │   ├── features/               # - Large, feature-specific components (e.g., PostFeed, LoginForm)
    │   ├── providers/              # - Global context providers (Theme, Auth, etc.)
    │   ├── shared/                 # - Reusable components used across multiple features (Navbar, SearchBar)
    │   └── ui/                     # - Primitive UI components from Shadcn UI (Button, Card, Sonner)
    │
    ├── context/                    # 🧠 Global State Management (React Context API)
    │   ├── AuthContext.tsx         # - Manages user session, votes, subscriptions
    │   └── CommandMenuContext.tsx  # - Manages the state of the command menu
    │
    ├── hooks/                      # 🎣 Custom React Hooks
    │   └── useIntersectionObserver.ts # - Logic for detecting when an element is visible
    │
    ├── lib/                        # 📚 Libraries, Helpers & Utilities
    │   ├── api.ts                  # - Simulated backend API functions (data fetching/mutation)
    │   ├── mock-data.ts            # - The in-memory "database" for client-side development
    │   ├── utils.ts                # - Utility functions (e.g., `cn` for classnames)
    │   └── validators/             # - Zod schemas for form validation
    │
    ├── store/                      # 🏪 Global State Management (Zustand)
    │   ├── useChatStore.ts         # - State for the real-time chat feature
    │   └── useNotificationStore.ts # - State for the global notification system
    │
    └── types/                      # 📝 TypeScript Type Definitions
        └── index.d.ts              # - Centralized definitions for User, Post, Comment, etc.
```

###  Architectural Decisions Explained:

-   **`app/` Directory**: We leverage Next.js's **App Router** for file-system based routing. 
    **Route Groups** (`(main)`, `(auth)`) are used to apply different layouts to different sections of the application without affecting the URL structure.
-   **`components/` Directory**: This follows a three-tiered structure for maximum clarity:
    -   **`ui/`**: Low-level, unstyled, or minimally styled primitives. Mostly auto-generated by **Shadcn UI**.
    -   **`shared/`**: Components composed from `ui/` elements that are context-agnostic and reused widely (e.g., `ConfirmDialog`, `EmptyState`).
    -   **`features/`**: High-level components specific to a single business feature (e.g., the `PostFeed`'s entire infinite scroll logic is encapsulated here). This makes features easy to find and reason about.
-   **`context/` vs `store/`**: We strategically use two different state management patterns:
    -   **React Context (`context/`)**: Used for global state that does **not** update frequently (e.g., the current user's authentication status, theme). This is a simple, built-in solution.
    -   **Zustand (`store/`)**: Used for global state that updates **frequently** and could cause performance issues with Context's re-renders (e.g., real-time chat messages, notifications). Zustand is highly optimized for such scenarios.
-   **`lib/` Directory**: A standard convention for code that isn't a React component, hook, or context. Placing our **simulated API** here makes the transition to a real backend straightforward—we would simply rewrite the function bodies in `api.ts` to use `fetch` without needing to change any of the components that call them.

## 🚀 Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/dhlananhh/synapse-client
    cd synapse-client
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```
    
3.  **Set up environment variables:**
    Create a `.env.local` file at the root and add any necessary environment variables. For now, this is not required as the app runs entirely on mock data.

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
