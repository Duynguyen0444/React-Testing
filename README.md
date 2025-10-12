# React Testing Project

A comprehensive React + TypeScript testing project demonstrating unit testing best practices with Jest and React Testing Library.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Components](#components)
- [Utilities](#utilities)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [Author](#author)

## 🎯 Overview

This project is a hands-on demonstration of unit testing in React applications using modern testing tools and methodologies. It includes various React components with comprehensive test suites to showcase different testing scenarios and best practices.

## ✨ Features

- 🔧 **Modern React 18+** with TypeScript
- 🧪 **Comprehensive Testing** with Jest and React Testing Library
- 📝 **Form Handling** with React Hook Form
- 🎨 **Component Library** with various UI components
- 🔍 **Search Functionality** with debouncing
- 📊 **State Management** examples
- 🛠️ **Utility Functions** with unit tests
- ⚡ **Vite** for fast development and building
- 🎯 **ESLint** for code quality

## 🛠️ Tech Stack

- **Frontend:** React 18+, TypeScript
- **Build Tool:** Vite
- **Testing:** Jest, React Testing Library, @testing-library/user-event
- **Form Handling:** React Hook Form
- **Utilities:** Lodash
- **Code Quality:** ESLint, TypeScript
- **Package Manager:** Yarn

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** >= 22.x
- **Yarn** (recommended) or npm

## 🚀 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd "React Testing"
```

2. Install dependencies:
```bash
yarn install
# or
npm install
```

## 💻 Usage

### Development Server

Start the development server:
```bash
yarn dev
# or
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

Create a production build:
```bash
yarn build
# or
npm run build
```

### Preview Production Build

Preview the production build locally:
```bash
yarn preview
# or
npm run preview
```

## 🧪 Testing

This project includes comprehensive test suites for all components and utilities.

### Run Tests in Watch Mode

```bash
yarn test
# or
npm run test
```

### Run Tests with Coverage (CI Mode)

```bash
yarn test:ci
# or
npm run test:ci
```

### Testing Strategy

- **Unit Tests:** Individual component and utility function testing
- **Integration Tests:** Component interaction testing
- **User Event Testing:** Simulating real user interactions
- **Form Testing:** Input validation and submission testing
- **Async Testing:** Testing debounced search and async operations

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Button/         # Button component with tests
│   ├── Counter/        # Counter component with state management
│   ├── DebounceSearch/ # Search component with debouncing
│   ├── SignUpForm/     # Form component with validation
│   └── TodoList/       # Todo list component
├── utils/              # Utility functions
│   ├── mapOrder.ts     # Array ordering utility
│   ├── sum.ts          # Mathematical operations
│   └── validateEmail.ts # Email validation utility
├── assets/             # Static assets
├── App.tsx             # Main application component
└── main.tsx            # Application entry point
```

## 🧩 Components

### Button Component
A reusable button component with customizable props and event handling.

### Counter Component
Demonstrates state management with increment/decrement functionality.

### DebounceSearch Component
Search input with debouncing to optimize API calls and performance.

### SignUpForm Component
Complete form implementation with validation using React Hook Form.

### TodoList Component
Todo list management with add, remove, and toggle functionality.

## 🔧 Utilities

### mapOrder
Utility function for reordering arrays based on a specified order.

### sum
Mathematical utility for addition operations with proper type checking.

### validateEmail
Email validation utility with comprehensive regex pattern matching.

## 📜 Scripts

| Script | Description |
|--------|-------------|
| `yarn dev` | Start development server |
| `yarn build` | Build for production |
| `yarn preview` | Preview production build |
| `yarn test` | Run tests in watch mode |
| `yarn test:ci` | Run tests with coverage |
| `yarn lint` | Run ESLint |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Write tests for new components and utilities
- Follow TypeScript best practices
- Use ESLint for code quality
- Maintain consistent code formatting
- Update documentation for new features