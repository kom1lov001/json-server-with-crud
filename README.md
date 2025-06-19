# Furor Progress CRUD

A modern CRUD (Create, Read, Update, Delete) application built with Vue 3, Quasar, Tailwind CSS, and Pinia. It uses `json-server` to simulate a backend, and both the frontend and backend run concurrently for a seamless development experience.

## Tech Stack

- Vue 3
- Quasar Framework
- Tailwind CSS
- Pinia (state management)
- Vue Router
- Axios
- json-server (mock backend)
- TypeScript
- Vite
- Nodemon
- Husky (Git hooks)
- Prettier & ESLint (code quality tools)

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/kom1lov001/json-server-with-crud.git
cd furor-progress-crud
```

### 2.Install Dependencies

- npm install

### 3.Create .env.local

- VITE_BASE_API_URL=http://localhost:3000/
- To configure the base API URL for the frontend, create a .env.local file in the root of your project and add the following line.

## 4. Run the Project

- npm run dev
  Start both the frontend (Vite) and backend (json-server) with a single command:

This command uses concurrently to run:

Vite development server at: http://localhost:5173

json-server mock API at: http://localhost:3000

## Project Structure

furor-progress-crud/
├── backend/
│ └── product.json # Mock data for json-server
├── src/
│ └── pages/ # CRUD views/pages
├── .env.local # API base URL environment variable
├── nodemon.json # nodemon configuration for json-server
├── package.json # Project scripts and dependencies
└── README.md # Project documentation

This project uses json-server to provide a simple mock backend API based on the file backend/product.json.

When you run npm run dev, the backend starts automatically with nodemon, watching for changes in the backend/ folder.

Example API Endpoint:

GET http://localhost:3000/products
Supports full CRUD operations:

GET

POST

PUT

DELETE

Linting & Formatting
To check code quality using ESLint:

npm run lint
To automatically format your code using Prettier:

npm run format
Git Hooks (Husky)
Husky is used to manage Git hooks, such as running checks before committing code.

After cloning the repository, initialize husky with the following command:

npm run prepare
Build for Production
To generate an optimized production-ready build:

npm run build
Author
Name: Avaz Komilov

Role: Frontend Developer

Telegram: ''

License
This project is licensed under the MIT License.

yaml
Copy
Edit

---
