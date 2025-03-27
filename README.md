# Blog App

This is a **blog app** built using **Next.js** for dynamic routing and rendering. It provides a platform to display blog posts with features such as comments and dynamic data fetching. The app uses modern web technologies to create an optimized, responsive, and fast experience.

## Features

- **Dynamic Routing**: Utilizes **Next.js page routing** to handle blog posts dynamically.
- **Contact Form**: Users can write a message to blog author.
- **Comments System**: Users can comment on each post, and the comments are dynamically fetched and rendered.
- **Markdown Rendering**: Blog posts are written in Markdown, and the content is rendered using **React Markdown**.
- **Likes on Posts**: Users can like a post, and the number of likes is dynamically updated. The like count is stored in the database and displayed on the post page.
- **Error Handling**: Proper error handling for failed API calls.

## Technologies Used

- **Next.js** (React framework for server-side rendering and static site generation)
- **React** (JavaScript library for building user interfaces)
- **TypeScript** (Superset of JavaScript that adds types)
- **Zustand** (State management solution)
- **React Markdown** (To render Markdown content)
- **Vercel** (For deploying the app)
- **Tailwind CSS** (Utility-first CSS framework)
- **PostgreSQL** (Relational database used to store blog posts, comments, and likes)
- **Supabase** (Backend-as-a-Service platform for managing the database)

## Database and Storage Setup

To set up the database and storage, follow these steps:

1. **Go to Vercel**: Log in to your **Vercel** account.
2. **Create a New Storage**: In the Vercel dashboard, create a new storage instance.
3. **Select Supabase PostgreSQL**: Choose **Supabase** with **PostgreSQL** for the storage solution. This will automatically set up your database and connection.

Vercel will provide the necessary environment variables like **SUPABASE_URL** and **SUPABASE_ANON_KEY** to connect to the database.

Once the setup is complete, your database will be ready for use.

## Getting Started

To get started with the project locally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/nadiia-dev/blog.git
cd blog
```

Install the dependencies:

2. Install the dependencies:

```bash
npm install
```

3. Create a .env file in the root directory and add any necessary environment variables:

```env
POSTGRES_URL= your postgres database url
NEXT_PUBLIC_API_URL= your api url here
```

4. Run the app in development mode:

```bash
npm run dev
```

5. Visit http://localhost:3000 in your browser to see the app in action.

## Deployment

This app is deployed on Vercel.
