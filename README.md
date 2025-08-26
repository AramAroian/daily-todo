# Daily To Do

A modern, minimalistic daily task manager built with React, TypeScript, and Vite.  
Features drag-and-drop task sorting, CSV export, and a glassmorphic UI.

## Features

- Add, edit, activate/pause, complete, and delete tasks
- Track active work time per task
- Drag and drop to reorder tasks (powered by [dnd-kit](https://github.com/clauderic/dnd-kit))
- Export tasks to CSV
- Responsive, glassmorphic design

## Future Features

- Functional backend (user authentication, persistent storage)
- Filter tasks (by status, date, priority)
- Completed tasks section (view and manage finished tasks)
- Outlook integration (sync tasks with Microsoft Outlook)


## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation

```sh
npm install
```

### Development

Start the development server:

```sh
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

To build for production:

```sh
npm run build
```

### Lint

To run ESLint:

```sh
npm run lint
```

## Project Structure

```
src/
  App.tsx           # Main app component
  App.css           # App layout styles
  index.css         # Global styles
  main.tsx          # Entry point
  Components/
    Header/         # App header
    TaskArea/
      TaskBoard/    # Task board & drag/drop
      TaskCard/     # Individual task cards
  models/
    TaskModel.ts    # Task data model
  Utils/
    ExportTasks.ts  # CSV export utility
public/
  logo.svg          # App logo
  vite.svg          # Vite logo
```

## Technologies

- React 19
- TypeScript
- Vite
- dnd-kit (drag-and-drop)
- CSS (glassmorphism, responsive grid)

## License

MIT

---

Made with ❤️ for learning and productivity.
