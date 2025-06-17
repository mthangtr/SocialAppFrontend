# FeedSocialApp

A modern, full-featured social media platform built with Next.js and TypeScript, offering a comprehensive social networking experience similar to Facebook.

## 📋 Project Overview

FeedSocialApp is a responsive social media application that enables users to create posts, interact with content, and connect with others. Built with modern web technologies, it features real-time updates, infinite scrolling, and a robust authentication system.

### Key Features

-   🔐 **Secure Authentication** - JWT-based login/signup with session management
-   📱 **Responsive Design** - Optimized for desktop and mobile devices
-   🌙 **Dark/Light Theme** - Toggle between themes with system preference detection
-   📝 **Rich Post Creation** - Text posts with multiple image uploads
-   ♥️ **Social Interactions** - Like, comment, and share posts
-   🔍 **Advanced Search** - Real-time user search with debounced queries
-   👥 **User Profiles** - Dynamic profile pages with friend management
-   🔒 **Privacy Controls** - Post privacy settings (public, private, friends)
-   📜 **Infinite Scroll** - Smooth content loading for better UX
-   🎨 **Modern UI** - Clean interface with smooth animations

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend API   │    │   Database      │
│   (Next.js)     │◄──►│   (Node.js)     │◄──►│   (MongoDB)     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Redux Store   │    │   JWT Auth      │    │   User Data     │
│   RTK Query     │    │   Session Mgmt  │    │   Posts         │
│   Local Storage │    │   File Upload   │    │   Comments      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🛠️ Tech Stack

### Frontend

-   **Framework:** Next.js 14 (App Router)
-   **Language:** TypeScript
-   **Styling:** Tailwind CSS + NextUI + Shadcn/ui
-   **State Management:** Redux Toolkit + RTK Query
-   **UI Components:** Radix UI, Material-UI, Ant Design
-   **Animations:** Framer Motion
-   **Icons:** Lucide React, FontAwesome

### Backend Integration

-   **API:** RESTful with JWT authentication
-   **File Upload:** Multi-image support
-   **Real-time:** Infinite scroll pagination

### Development Tools

-   **Linting:** ESLint
-   **Package Manager:** npm
-   **Version Control:** Git

## 🚀 Installation Guide

### Prerequisites

-   Node.js 18+
-   npm or yarn
-   Backend API running on `http://localhost:8080`

### Setup Instructions

1. **Clone the repository**

    ```bash
    git clone <repository-url>
    cd feeds-frontend
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Start development server**

    ```bash
    npm run dev
    ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 📁 Folder Structure

```
feeds-frontend/
├── public/                 # Static assets
│   └── assets/
│       ├── images/        # Default images
│       ├── sounds/        # Audio files
│       └── svg/          # SVG icons
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── auth/         # Authentication pages
│   │   ├── home/         # News feed page
│   │   ├── profile/      # User profile pages
│   │   ├── search/       # Search functionality
│   │   └── friend-suggestion/ # Friend suggestions
│   ├── components/       # Reusable components
│   │   ├── LayoutComponent/   # Header, Sidebars
│   │   ├── Pages/            # Page-specific components
│   │   ├── Buttons/          # Button components
│   │   └── ui/               # UI components
│   ├── lib/              # Core utilities
│   │   ├── api/          # API configurations
│   │   ├── states/       # Redux slices
│   │   ├── store.ts      # Redux store
│   │   └── hooks.ts      # Custom hooks
│   ├── hooks/            # Custom React hooks
│   ├── types/            # TypeScript definitions
│   ├── styles/           # Global styles
│   └── utils/            # Utility functions
├── package.json          # Dependencies
├── tailwind.config.ts    # Tailwind configuration
├── next.config.mjs       # Next.js configuration
└── tsconfig.json         # TypeScript configuration
```

## 🔌 API Usage Examples

### Authentication

```typescript
// Login
const [login] = useLoginMutation();
const response = await login({ email, password }).unwrap();

// Register
const [register] = useRegisterMutation();
const response = await register({ username, email, password }).unwrap();
```

### Posts

```typescript
// Create post with images
const [createPost] = useCreatePostMutation();
const formData = new FormData();
formData.append('content', 'Hello World!');
formData.append('media', imageFile);
const response = await createPost(formData).unwrap();

// Fetch posts with infinite scroll
const { data: posts } = useFetchPostsQuery({ userId, page });
```

### User Management

```typescript
// Search users
const { data: users } = useFetchUsersSearchQuery({ page, search: query });

// Update profile
const [updateUser] = useUpdateUserMutation();
const response = await updateUser({ userId, data }).unwrap();
```

## ⚙️ Configuration Options

### Environment Variables

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8080

# Authentication
NEXT_PUBLIC_JWT_SECRET=your-jwt-secret

# File Upload
NEXT_PUBLIC_MAX_FILE_SIZE=5242880
NEXT_PUBLIC_ALLOWED_FILE_TYPES=image/jpeg,image/png,image/gif
```

### Theme Configuration

The app supports both light and dark themes with system preference detection:

-   Automatic theme switching based on system preference
-   Manual theme toggle in user menu
-   Persistent theme selection in localStorage

### API Endpoints

-   **Base URL:** `http://localhost:8080`
-   **Authentication:** `/auth/*`
-   **Posts:** `/posts/*`
-   **Users:** `/users/*`
-   **Comments:** `/comments/*`
-   **Search:** `/search/*`

## 🎯 Features in Detail

### Post Management

-   Create posts with text and multiple images
-   Edit and delete own posts
-   Set privacy levels (public, private, friends)
-   Infinite scroll pagination
-   Real-time updates

### User Interactions

-   Like/unlike posts
-   Comment on posts with nested replies
-   Follow/unfollow users
-   Friend requests and suggestions
-   User search with real-time results

### Profile System

-   Dynamic profile pages
-   Edit profile information
-   Upload profile pictures
-   View user's posts and activity
-   Friend management

### Security Features

-   JWT-based authentication
-   Protected routes with middleware
-   Session management
-   Input validation and sanitization
-   XSS protection

## 🎨 UI/UX Highlights

-   **Modern Design:** Clean, intuitive interface
-   **Responsive Layout:** Works seamlessly on all devices
-   **Smooth Animations:** Framer Motion for enhanced UX
-   **Accessibility:** ARIA labels and keyboard navigation
-   **Loading States:** Skeleton loaders and spinners
-   **Error Handling:** User-friendly error messages
-   **Toast Notifications:** Real-time feedback

## 🚀 Performance Optimizations

-   **Code Splitting:** Automatic with Next.js
-   **Image Optimization:** Next.js Image component
-   **Lazy Loading:** Components and images
-   **Caching:** RTK Query for API responses
-   **Bundle Optimization:** Tree shaking and minification

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
