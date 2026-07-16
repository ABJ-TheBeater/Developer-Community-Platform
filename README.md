# Developer Community Platform

A full-stack developer platform built with Next.js where users can authenticate with GitHub or Google, publish blogs, join developer communities, and create public developer profiles.

This project was developed as a capstone project using Next.js App Router, MongoDB Atlas, Mongoose, NextAuth.js, TypeScript, Tailwind CSS, and Zod.

---

# Features

- GitHub and Google OAuth authentication
- Public developer profiles
- Profile editing
- Create, edit, and delete blogs
- Browse developer communities
- Join and leave communities
- Search blogs
- Search communities
- Responsive design
- Protected routes and API endpoints
- Form validation using Zod

---

# Technologies Used

- Next.js 16 (App Router)
- React
- TypeScript
- Tailwind CSS
- MongoDB Atlas
- Mongoose
- NextAuth.js
- Zod

---

# Local Installation

Clone the repository:

```bash
git clone https://github.com/ABJ-TheBeater/Developer-Community-Platform.git
```

Navigate into the project:

```bash
cd Developer-Community-Platform
```

Install dependencies:

```bash
npm install
```

Create a `.env.local` file using the variables listed in `.env.example`.

Start the development server:

```bash
npm run dev
```

Open:

```
http://localhost:3000
```

---

# Environment Variables

Create a `.env.local` file containing:

```env
MONGODB_URI=

AUTH_SECRET=

AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=

AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=

NEXT_PUBLIC_APP_URL=
```

---

# MongoDB Atlas Setup

1. Create a MongoDB Atlas cluster.
2. Create a database user.
3. Allow your IP address in Network Access.
4. Copy the connection string.
5. Replace `<password>` with your database password.
6. Paste the connection string into `MONGODB_URI` inside `.env.local`.

---

# Google OAuth Setup

1. Open Google Cloud Console.
2. Create OAuth credentials.
3. Add the callback URL:

```
http://localhost:3000/api/auth/callback/google
```

4. Copy the Client ID and Client Secret into:

```
AUTH_GOOGLE_ID
AUTH_GOOGLE_SECRET
```

---

# GitHub OAuth Setup

1. Open GitHub Developer Settings.
2. Create a new OAuth App.
3. Set the callback URL:

```
http://localhost:3000/api/auth/callback/github
```

4. Copy the Client ID and Client Secret into:

```
AUTH_GITHUB_ID
AUTH_GITHUB_SECRET
```

---

# Rendering Strategy

The application uses multiple rendering strategies provided by Next.js.

- Home page uses Server Components.
- Blogs page uses Incremental Static Regeneration (ISR).
- Blog details are server-rendered.
- Communities pages are server-rendered.
- Public profiles are server-rendered.
- Client Components are used only for interactive features such as forms, authentication, search, and join/leave actions.

---

# Database Models

The project uses MongoDB Atlas with Mongoose.

### User

Stores:

- Name
- Username
- Email
- Profile image
- Headline
- Bio
- Skills
- GitHub URL
- LinkedIn URL

### Blog

Stores:

- Title
- Content
- Author
- Tags
- Created date
- Updated date

### Community

Stores:

- Name
- Slug
- Category
- Description
- Members

---

# Security

- OAuth authentication using NextAuth.js
- Protected API routes
- Ownership verification before editing or deleting blogs
- Zod validation on both client and server
- Sensitive credentials stored in environment variables
- Duplicate community membership prevention

---

# Deployment

Deployment URL:

```
(Add your deployed application URL here)
```

If no deployment is available, the project can be tested locally using the installation steps above.

---

# Test Account

Authentication is performed using GitHub or Google OAuth.

No default username or password is required.

---

# Author

**Ali Jichi**