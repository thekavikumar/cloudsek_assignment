![Image](https://media.discordapp.net/attachments/1012227636312944650/1239077109360496742/Safari_Big_Sur_-_Light.png?ex=66419bfb&is=66404a7b&hm=51363bf7ef87fd165bbe1f6a8a6efb208c4a535984b62ea1c57c4cc15ccbed9b&=&format=webp&quality=lossless&width=1038&height=602)

# CloudSek Assignment 👨‍💻

This project is a Post-Comments Service implemented using Next.js for the frontend, Node.js for the backend, and MongoDB for data storage. It provides functionalities to create posts, comments, and perform CRUD operations on them. Authentication is implemented using Kinvey.

## Live Demo 🚀

You can access the live demo [here](https://cloudsekassignment.vercel.app/).

## Repository Structure 📂

The repository consists of two folders:

1. **frontend**: Contains the Next.js application for the frontend.
2. **backend**: Contains the Node.js application for the backend.

## Setup and Run 🛠️

### Prerequisites

- Node.js installed on your machine
- MongoDB instance
- Google account for authentication

### Installation

1. Clone the repository:

```bash
git clone https://github.com/thekavikumar/cloudsek_assignment.git
```

2. Navigate to the backend folder:

```bash
cd cloudsek_assignment/backend
```

3. Install dependencies:

```bash
npm install
```

### Configuration

1. Set up your MongoDB instance and obtain the connection URI.

2. Create a `.env` file in the backend folder and add the following:

```plaintext
MONGODB_URI=your_mongodb_connection_uri
```

### Running the Backend

Start the Node.js server:

```bash
npm run start
```

### Running the Frontend

1. Navigate to the frontend folder:

```bash
cd ../frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file in the frontend folder and add the following:

```plaintext

// Kinde Configuration
KINDE_CLIENT_ID=your_kinde_client_id
KINDE_CLIENT_SECRET=your_kinde_client_secret
KINDE_ISSUER_URL=your_kinde_issuer_url
KINDE_SITE_URL=http://localhost:3000
KINDE_POST_LOGOUT_REDIRECT_URL=http://localhost:3000
KINDE_POST_LOGIN_REDIRECT_URL=http://localhost:3000/dashboard

// Backend URL
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
```

3. Start the Next.js development server:

```bash
npm run dev
```

## API Documentation 📝

### Endpoints

- `GET /api/getPosts`: Retrieve all posts.
- `GET /api/getPost/:postId`: Retrieve a post by ID.
- `POST /api/createPost`: Create a new post.
- `PUT /api/updatePost/:postId`: Update a post.
- `DELETE /api/deletePost/:userId/:postId`: Delete a post.
- `DELETE /api/deleteComment/:postId/:commentId/:userId`: Delete a comment.
- `POST /api/createComment/:postId`: Create a comment on a post.

## Authentication 🔒

Authentication is implemented using Kinde. Ensure proper configuration and handling of user authentication for secure access to the endpoints.

## Code Quality 🌟

The codebase follows best practices and is well-structured. Comments and documentation are provided where necessary to enhance readability and maintainability.
