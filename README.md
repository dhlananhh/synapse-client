# Synapse - A Modern Discussion Forum (Client-Side)

Synapse is the client-side implementation of a feature-rich, modern discussion forum inspired by platforms like Reddit. It is built with a cutting-edge technology stack and designed for a highly interactive and responsive user experience. This project serves as a comprehensive thesis demonstrating advanced concepts in frontend engineering.

<div align="center">
  <a href="https://synapse-discussion-forum.vercel.app/" target="_blank">
    <img
      src="https://img.shields.io/website?label=Live%20Demo&style=for-the-badge&url=https%3A%2F%2Fsynapse-discussion-forum.vercel.app%2F&up_color=06B6D4"
      alt="Live Demo"
    />
  </a>
  <img
    src="https://img.shields.io/github/languages/code-size/dhlananhh/synapse-client?style=for-the-badge&color=8B5CF6"
    alt="Code Size"
  />
  <img
    src="https://img.shields.io/github/last-commit/dhlananhh/synapse-client?style=for-the-badge&color=F59E0B"
    alt="Last Commit"
  />
  <a href="https://github.com/dhlananhh/synapse-client/blob/main/LICENSE.md" target="_blank">
    <img
      src="https://img.shields.io/github/license/dhlananhh/synapse-client?style=for-the-badge&color=EC4899"
      alt="License"
    />
  </a>
</div>

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

## 📁 Final Project Structure

The project follows a feature-centric architecture within the Next.js App Router paradigm. This structure is designed for scalability, maintainability, and clear separation of concerns. It incorporates modern best practices, including a clear distinction between different types of components, hooks, and state management strategies.

```
synapse-client/
├── public/                                   # 🏞️ Static assets (images, fonts)
└── src/
    ├── app/                                  # 🗺️ Next.js App Router (Routing & Pages)
    │   ├── (auth)/                           # - Group for authentication pages (login, register)
    │   │   ├── login
    │   │   │     └── page.tsx
    │   │   └── register
    │   │   │     └── page.tsx
    │   ├── (landing)/                        # - Group for the public, unauthenticated landing page
    │   │   └── page.tsx                      #       -> Handles the root "/" URL
    │   ├── (main)/                           # - Group for the main application layout (with Navbar, Footer, etc.)
    │   │   ├── (communities)/
    │   │   │   └── c/[slug]/                 # - Dynamic route for a single community (/c/nextjs)
    │   │   │     └── page.tsx
    │   │   ├── (posts)/
    │   │   │   └── p/[postId]/               # - Dynamic routes for posts (/p/post123 and /p/post123/edit)
    │   │   ├── (user)/
    │   │   │   └── u/[username]/             # - Dynamic route for a user profile (/u/john_doe)
    │   │   │     └── page.tsx
    │   │   ├── feed/                         # - The main post feed page (/feed)
    │   │   │     └── page.tsx
    │   │   ├── settings/                     # - User settings page (/settings)
    │   │   │     └── page.tsx
    │   │   └── submit/                       # - Create post page (/submit)
    │   │         └── page.tsx
    │   ├── search/                           # - Search results page (/search)
    │   │         └── page.tsx
    │   ├── layout.tsx                        # - Root layout (<html> and <body>)
    │   └── not-found.tsx                     # - Custom 404 error page
    │
    ├── components/                           # 🧩 React Components
    │   ├── features/                         # - Large, feature-specific components
    │   │   ├── auth/                         # - LoginForm, RegisterForm
    │   │   ├── chat/                         # - ChatWidget
    │   │   ├── command/                      # - CommandMenu
    │   │   ├── comment/                      # - CommentSection, CommentItem, CommentForm
    │   │   ├── community/                    # - CommunityHeader, TopCommunitiesWidget
    │   │   ├── notifications/                # - NotificationBell, NotificationItem
    │   │   ├── onboarding/                   # - OnboardingModal
    │   │   ├── post/                         # - PostFeed, PostCard, VoteClient, CreatePostForm, etc.
    │   │   ├── settings/                     # - UpdateProfileForm
    │   │   └── user/                         # - UserProfile, ProfileHeader, ActivityCalendar, etc.
    │   ├── providers/                        # - Global context providers & headless components
    │   │   ├── CommandMenuProvider.tsx
    │   │   ├── GlobalModals.tsx
    │   │   ├── NotificationSimulator.tsx
    │   │   ├── ThemeProvider.tsx
    │   │   └── TopProgressBar.tsx
    │   ├── shared/                           # - Highly reusable components used across many features
    │   │   ├── ConfirmDialog.tsx
    │   │   ├── MobileNav.tsx
    │   │   ├── Navbar.tsx
    │   │   ├── SearchBar.tsx
    │   │   ├── UserAvatar.tsx
    │   │   ├── UserNav.tsx
    │   │   ├── EmptyState.tsx
    │   │   ├── ErrorDisplay.tsx
    │   │   └── Footer.tsx
    │   └── ui/                               # - Primitive UI components from Shadcn UI (Button, Card, Sonner...)
    │
    ├── context/                              # 🧠 Global State Management (React Context API)
    │   ├── AuthContext.tsx                   # - Manages user session, votes, subscriptions, modal triggers
    │   └── CommandMenuContext.tsx            # - Manages the state and keyboard listeners for the command menu
    │
    ├── hooks/                                # 🎣 Custom React Hooks
    │   └── useIntersectionObserver.ts        # - Logic for detecting when an element is visible for infinite scroll
    │
    ├── libs/                                 # 📚 Libraries, Helpers & Utilities
    │   ├── api.ts                            # - Simulated backend API functions (fetch, create, update, delete)
    │   ├── mock-data.ts                      # - The in-memory "database" with mock users, posts, communities
    │   ├── paths.ts                          # - Centralized, type-safe route constants
    │   ├── utils.ts                          # - General utility functions (e.g., `cn` for classnames)
    │   └── validators/                       # - Zod schemas for form validation (auth, post, user)
    │
    ├── locales/                                 
    │   ├── en.json                          
    │   └── vn.json                     
    │
    ├── store/                                # 🏪 Global State Management (Zustand)
    │   ├── useChatStore.ts                   # - State for the real-time chat feature
    │   └── useNotificationStore.ts           # - State for the global notification system
    │
    ├── styles/                                
    │   ├── globals.css                        
    │   └── tailwind.config.ts 
    │
    ├── types/                                # 📝 TypeScript Type Definitions
    │   ├── globals.d.ts
    │   └── index.d.ts                        # - Centralized definitions for all custom types (User, Post, etc.)
    │
    └── utils/                      

```

### Architectural Decisions Explained:

- **`app/` Directory**: We leverage Next.js's **App Router** for file-system based routing.
  **Route Groups** (`(main)`, `(auth)`) are used to apply different layouts to different sections of the application without affecting the URL structure.
- **`components/` Directory**: This follows a three-tiered structure for maximum clarity:
  - **`ui/`**: Low-level, unstyled, or minimally styled primitives. Mostly auto-generated by **Shadcn UI**.
  - **`shared/`**: Components composed from `ui/` elements that are context-agnostic and reused widely (e.g., `ConfirmDialog`, `EmptyState`).
  - **`features/`**: High-level components specific to a single business feature (e.g., the `PostFeed`'s entire infinite scroll logic is encapsulated here). This makes features easy to find and reason about.
- **`context/` vs `store/`**: We strategically use two different state management patterns:
  - **React Context (`context/`)**: Used for global state that does **not** update frequently (e.g., the current user's authentication status, theme). This is a simple, built-in solution.
  - **Zustand (`store/`)**: Used for global state that updates **frequently** and could cause performance issues with Context's re-renders (e.g., real-time chat messages, notifications). Zustand is highly optimized for such scenarios.
- **`lib/` Directory**: A standard convention for code that isn't a React component, hook, or context. Placing our **simulated API** here makes the transition to a real backend straightforward—we would simply rewrite the function bodies in `api.ts` to use `fetch` without needing to change any of the components that call them.

### Key Architectural Updates Reflected in this Structure:

-   **Routing (`app/`):** The structure clearly shows the separation between the **`(landing)`** group for unauthenticated users and the **`(main)`** group for the core application experience. The move of the post feed to `/feed` is also documented. The addition of the `/edit` page for posts is now visible.
-   **Components (`components/`):** The `features/` directory is now fully fleshed out, with a sub-folder for each major feature domain (auth, chat, post, user, etc.). This makes the project incredibly easy to navigate. The `providers/` directory now correctly lists all our global system components, like the `NotificationSimulator` and `GlobalModals`.
-   **State Management (`context/` & `store/`):** The structure explicitly shows the strategic decision to use both React Context and Zustand for different state management needs, a hallmark of a mature architecture.
-   **Libraries & Utilities (`lib/`):** The addition of the `paths.ts` file is a key highlight, demonstrating a commitment to maintainable code by centralizing route management.

This final project structure is a complete and accurate representation of the sophisticated application you have built. It serves as an excellent architectural overview in your documentation.

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
