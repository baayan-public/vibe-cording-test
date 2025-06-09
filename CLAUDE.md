# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Development with Turbopack (faster builds)
npm run dev

# Production build
npm run build

# Production server
npm start

# Code linting
npm run lint
```

## Project Architecture

This is a Next.js 15 quiz application called "Infra Tech Hub" (TCPレベル判定君) for assessing TCP/networking skills with a Japanese interface.

### Key Architecture Patterns

**App Router Structure**: Uses Next.js 15 App Router with TypeScript. Main routes are `/quiz` (listing), `/quiz/[id]` (individual quiz), and `/result` (quiz results).

**Component Organization**: 
- `src/components/layout/` - Header/Footer with barrel exports
- `src/components/quiz/` - Quiz-specific components (QuizList, QuizOption)
- Components use TypeScript interfaces and "use client" directives

**Quiz Data Flow**: Currently hardcoded in page components, designed for future dynamic loading from markdown files in `src/quiz-content/`. Quiz state flows: page load → localStorage → results page.

**Markdown-based Content**: Quiz definitions use markdown with YAML frontmatter format:
```markdown
---
id: quiz-id
title: Quiz Title
level: 1
levelName: SYN
topic: ネットワーク基礎
---
# Question content in markdown
```

### State Management

- **Local React state** with useState/useEffect
- **URL parameters** for quiz navigation and results deep-linking  
- **localStorage** for temporary result persistence
- **No global state management** (Redux/Zustand) currently used

### Styling & UI

- **Tailwind CSS 4** with utility-first approach
- **Dark theme** support via CSS custom properties
- **Responsive design** with mobile-first breakpoints
- **Japanese language** interface with consistent blue/gray color scheme

### Technology Stack Notes

**Dependencies**: 
- Supabase client installed but unused (prepared for user auth/progress tracking)
- SWR and Axios installed but unused (prepared for API integration)
- gray-matter and marked for markdown processing

**Build Tools**: Uses Turbopack for fast development builds (--turbopack flag in dev script)

### Current Data Structure

Quiz data follows this TypeScript interface:
```typescript
type Quiz = {
  id: string;
  title: string; 
  level: number;        // 1-4 corresponding to SYN/ACK/ESTABLISHED/FIN-ACK
  levelName: string;
  questions: number;
  description: string;
  topic: string;
};
```

Results are stored in localStorage with score, time, and performance analytics.

### Development Context

This is MVP phase focusing on anonymous quiz functionality. Future planned features include user authentication (Supabase), dynamic content management, and enterprise features. The codebase is structured to support these additions without major refactoring.