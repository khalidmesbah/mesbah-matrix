# Mesbah Matrix

Your All-in-One Personal Dashboard and Life OS, designed to be a central hub for productivity, learning, and personal growth.

![Mesbah Matrix Screenshot](public/imgs/screenshot.png) <!-- Add a screenshot of your project here -->

## About The Project

Mesbah Matrix is a comprehensive, widget-based dashboard built with modern web technologies. It provides a suite of tools to help you organize your tasks, manage your time, and find inspiration, all in one place.

### Key Features:

- **Productivity Suite**: Includes a Kanban board, a task manager, a calendar, a focus timer, and an Eisenhower Matrix.
- **Inspiration & Faith**: Features sections for Quran, Azkar (Islamic remembrances), daily reminders, and quotes.
- **Creative Tools**: A digital canvas for sketching ideas and a "Portalio" for managing links.
- **Customizable Dashboard**: A dynamic grid layout with a widget slider and a floating dock for easy navigation.
- **User Accounts**: Personalized experience with user accounts and settings.

### Tabs Overview

- **The Grid**: Your personal, customizable workspace. It features a dynamic grid where you can add, remove, resize, and rearrange various widgets to create a dashboard that fits your needs. It's the central hub where you can get an at-a-glance view of your most important information.
- **Account**: Manage your user account settings and profile.
- **Analytics**: View statistics and insights about your activity.
- **Azkar**: Access a collection of Islamic remembrances.
- **Calendar**: Keep track of your events and appointments.
- **Canvas**: A digital whiteboard for sketching and brainstorming.
- **Daily Reminders**: Set and receive daily reminders.
- **Focus**: A timer to help you concentrate on your work.
- **Kanban**: A board to visualize and manage your workflow.
- **Matrix**: The Eisenhower Matrix for prioritizing tasks.
- **Portalio**: A place to manage and organize your links.
- **Quotes**: A collection of inspiring quotes.
- **Quran**: Read and listen to the Holy Quran.
- **Settings**: Configure the application to your preferences.
- **Tasks**: A simple to-do list to manage your tasks.

## Built With

- [Next.js](https://nextjs.org/) - React Framework
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-First CSS Framework
- [shadcn/ui](https://ui.shadcn.com/) - Re-usable components
- [Firebase](https://firebase.google.com/) - Backend Platform (Auth, Firestore, etc.)
- [Zustand](https://github.com/pmndrs/zustand) - State Management

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js v18+
- `pnpm` package manager

```sh
npm install -g pnpm
```

- A Firebase project.

### Installation

1.  **Clone the repo**
    ```sh
    git clone https://github.com/your_username/mesbah-matrix.git
    cd mesbah-matrix
    ```
2.  **Install PNPM packages**
    ```sh
    pnpm install
    ```
3.  **Set up environment variables**
    - Create a `.env` file in the root of the project.
    - Add your Firebase configuration keys. You can get these from your Firebase project settings.
    ```env
    # Firebase
    NEXT_PUBLIC_FIREBASE_API_KEY=
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
    NEXT_PUBLIC_FIREBASE_APP_ID=
    ```
4.  **Run the development server**
    ```sh
    pnpm dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Khalid Mesbah - [@your_twitter](https://twitter.com/your_twitter) - your_email@example.com

Project Link: [https://github.com/your_username/mesbah-matrix](https://github.com/your_username/mesbah-matrix)
