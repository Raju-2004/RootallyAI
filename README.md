# Exercise Program Application Documentation

## Table of Contents
- [Project Structure](#project-structure)
  - [Frontend](#frontend-client)
  - [Backend](#backend-server)
- [Setup Instructions](#setup-instructions)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)

## Project Structure

### Frontend (Client)
Located in the `/client` directory, built with React + TypeScript + Vite

#### Key Components
- **Components/**
  - `CategoriesDropdown.tsx`
    - Dropdown for selecting exercise categories
    - Structure:
      - Upper body
      - Lower Body
      - Core
    - Each category contains submenu of specific exercises
  
  - `ComboSelector.tsx` 
    - Component for selecting saved exercise combinations
  
  - `ExerciseProgram.tsx`
    - Main component container
    - Integrates all sub-components
  
  - `ExerciseList.tsx`
    - List view of selected exercises
  
  - `ProgramHeader.tsx`
    - Header component containing:
      - Program name
      - Description
      - Clear All button
      - ComboSelector
  
  - `ProgramSettings.tsx`
    - Settings configuration:
      - Days
      - Number of Sessions
      - Notes
  
  - `SaveOptions.tsx`
    - Save functionality:
      - Add as Exercise button
      - Save as combo button

#### Custom Hooks
- `useExerciseProgram.tsx`
  - Program state management
  - Methods:
    - Fetch saved combos
    - Fetch categories
    - Save as combo
    - Save as program

#### UI Components
- Located in `components/ui/`
- Built with shadcn/ui
- Reusable components

#### Types
- `types.ts`
  - TypeScript interfaces
  - Type definitions

### Backend (Server)
Located in the `/server` directory, built with Node.js/Express

#### API Routes
- **Categories**
  - `GET /api/categories` - Get all exercise categories
  
- **Exercises**
  - `GET /api/exercises` - Get all exercises
  
- **Programs**
  - `GET /api/programs` - Get all programs
  - `POST /api/programs` - Create new program
  
- **Combos**
  - `GET /api/combos` - Get exercise combinations
  - `POST /api/combos` - Create new combination

#### Controllers
- `categoryController.js`
  - Methods to get categories
  
- `comboController.js`
  - Methods to get and post combos
  - Handles JSON file operations
  
- `exerciseController.js`
  - Methods to fetch exercises from data.json
  
- `programController.js`
  - Methods to get and post exercise programs

#### Middleware
- `errorHandler.js`
  - Global error handling middleware

## Setup Instructions

### Frontend Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

### Setting up Tailwind CSS and shadcn/ui

1. Install Tailwind CSS and its dependencies:
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

2. Add Tailwind CSS directives to `src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

3. Configure Tailwind by updating `tailwind.config.js`:
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

4. Set up TypeScript path aliases by updating `tsconfig.json` and `tsconfig.app.json`:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

5. Configure Vite path aliases:

First, install node types:
```bash
npm i -D @types/node
```

Then update `vite.config.ts`:
```typescript
import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```

6. Initialize shadcn/ui:
```bash
npx shadcn-ui@latest init
```

7. During shadcn/ui initialization, configure:
   - Typography: Yes
   - Default style: Yes
   - Base color: Slate (or preferred)
   - Global CSS file path: src/index.css
   - CSS variables: Yes
   - Tailwind config location: tailwind.config.js
   - Components path alias: @/components
   - Utils path alias: @/lib/utils

8. Install required shadcn/ui dependencies:
```bash
npm install tailwindcss-animate class-variance-authority clsx tailwind-merge lucide-react
```

9. Start adding shadcn/ui components:
```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add dropdown-menu
# Add other components as needed
```

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```
