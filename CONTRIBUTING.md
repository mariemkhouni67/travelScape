# Contributing to TravelScape

Thank you for your interest in contributing to **TravelScape**! 🎉  
We welcome contributions of all kinds — bug fixes, new features, documentation improvements, and more.

---

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Development Setup](#development-setup)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Style Guide](#style-guide)

---

## Code of Conduct

By participating in this project, you agree to uphold a welcoming, inclusive, and respectful environment. Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before contributing.

---

## Getting Started

1. **Fork** the repository on GitHub
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/travelScape.git
   cd travelScape
   ```
3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/mariemkhouni67/travelScape.git
   ```
4. **Create a branch** for your work:
   ```bash
   git checkout -b feature/your-feature-name
   ```

---

## How to Contribute

### 🐛 Reporting Bugs

- Use [GitHub Issues](https://github.com/mariemkhouni67/travelScape/issues) to report bugs
- Include a clear description, steps to reproduce, expected vs. actual behavior
- Add screenshots or recordings if applicable
- Specify your browser and OS

### 💡 Suggesting Features

- Open a [GitHub Issue](https://github.com/mariemkhouni67/travelScape/issues) with the `enhancement` label
- Describe the feature, the problem it solves, and any proposed implementation details

### 🔧 Submitting Code

- Pick an open issue or create one describing your change
- Follow the [Development Setup](#development-setup) to run the project locally
- Write clean, well-documented code following the [Style Guide](#style-guide)
- Test your changes thoroughly before submitting

---

## Development Setup

### Prerequisites

- Node.js **v18.0.0+**
- MongoDB (local or [Atlas](https://www.mongodb.com/atlas))
- Cloudinary account (for image uploads)

### Frontend

```bash
# From project root
npm install
npm run dev
```

### Backend

```bash
cd server
npm install

# Create server/.env with your environment variables (see README)
npm run dev
```

The frontend runs on `http://localhost:5173` and the backend on `http://localhost:5000`.

---

## Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <short description>

[optional body]

[optional footer]
```

### Types

| Type | Description |
|---|---|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `style` | Formatting (no logic change) |
| `refactor` | Code restructuring |
| `perf` | Performance improvement |
| `test` | Adding or fixing tests |
| `chore` | Build, CI, or tooling changes |

### Examples

```
feat(booking): add multi-step booking wizard
fix(navbar): resolve dropdown closing on mobile tap
docs(readme): update API reference section
style(hotels): fix card alignment on tablet breakpoint
```

---

## Pull Request Process

1. **Sync** with upstream before pushing:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Push** your branch:
   ```bash
   git push origin feature/your-feature-name
   ```

3. **Open a Pull Request** on GitHub:
   - Reference related issues (e.g., `Closes #42`)
   - Provide a clear description of your changes
   - Include before/after screenshots for UI changes

4. **Review**: A maintainer will review your PR. Address any requested changes.

5. **Merge**: Once approved, your PR will be merged. 🎉

---

## Style Guide

### JavaScript / React

- Use **functional components** and **React hooks**
- Use **ES module** syntax (`import`/`export`)
- Follow the existing component structure (see `src/components/`)
- Use **Framer Motion** for all animations
- Use **Zustand** for global state, **Context** for auth/theme

### CSS / Styling

- Use **TailwindCSS v4** utility classes
- Follow the glassmorphic design system established in the project
- Support both **dark and light mode** via Tailwind `dark:` variants
- Ensure **responsive design** works on mobile, tablet, and desktop

### File Organization

- Place components in the appropriate subdirectory under `src/components/`
- Pages go in `src/pages/`
- Backend routes, controllers, and models follow the MVC pattern in `server/src/`

### Naming Conventions

- **Components**: PascalCase (`BookingForm.jsx`)
- **Hooks**: camelCase with `use` prefix (`useDebounce.js`)
- **Services**: camelCase (`authService.js`)
- **CSS classes**: Tailwind utilities or kebab-case for custom classes

---

## 🙏 Thank You!

Every contribution matters — whether it's fixing a typo or building a new feature.  
Thank you for helping make TravelScape better! ✨
