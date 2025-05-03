# FlexForge AI

FlexForge AI is a full-stack web application designed to generate personalized workout routines using AI. Built with a modern tech stack including Next.js, Tailwind CSS, Convex, and integrated with Google's Gemini AI, the app provides users with fitness recommendations tailored to their needs. It also features authentication and user management powered by Clerk, and integrates Vercel’s VAPI for voice-based interactions.

## Demo

![FlexForge+AI](https://github.com/user-attachments/assets/d306967d-0ffa-49d5-89c1-510e8cf26ec9)

## Features

* 🧠 AI-powered workout plan generation using Gemini
* 🔊 Voice interaction via VAPI
* 🔐 Authentication and user management with Clerk
* 📝 Customizable workout preferences
* 📊 Progress tracking and real-time updates via Convex
* 💾 Scalable backend using Convex database

## Tech Stack

**Frontend:**

* Next.js
* Tailwind CSS

**Backend & Infrastructure:**

* Convex (Backend as a service)
* Gemini AI API
* Clerk (Authentication)
* Vercel VAPI (Voice interaction)

## Getting Started

### Prerequisites

* Node.js (v18 or higher)
* npm or yarn
* Convex project configured
* Gemini API key
* Clerk project and frontend API key
* VAPI credentials from Vercel

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/Purnima47/FlexForge_AI.git
cd FlexForge_AI
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

Create a `.env.local` file in the root directory:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CONVEX_URL=your_convex_deployment_url
GEMINI_API_KEY=your_gemini_api_key
VAPI_API_KEY=your_vapi_api_key
CONVEX_DEPLOYMENT=your_convex_deployement_name
NEXT_PUBLIC_CLERK_SIGN_UP_URL=your_clerk_sign_up_url 
NEXT_PUBLIC_CLERK_SIGN_in_URL=your_clerk_sign_in_url 
```

4. **Run the application**

```bash
npm run dev
```

## Folder Structure

```
FlexForge_AI/
├── src/           # Next.js app directory
├── convex/        # Convex functions and configuration
├── public/        # Static assets
└── .env.local     # Environment configuration
```

## Screenshots

![image](https://github.com/user-attachments/assets/edc8522e-2fa2-49ea-8a0b-7166ce1a8ce0)
![image](https://github.com/user-attachments/assets/a2da5ce6-bb9a-418c-b235-0304c04c9a9f)

---

Made with ❤️ by [Purnima47](https://github.com/Purnima47)