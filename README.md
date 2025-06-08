# 🎓 Erudite - Collaborative Skill Sharing Platform

[![Live Demo](https://img.shields.io/badge/Demo-Live-green?style=for-the-badge)](https://erudite-nine.vercel.app)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

> **Learn Together, Grow Together** - A modern platform where people connect to share skills, learn from each other, and build meaningful relationships through collaborative learning.

## 📖 About

Erudite is a **React-based mobile web application** designed for skill sharing and peer-to-peer learning. Connect with people who have the skills you want to learn, and share your expertise in return. Whether you're looking to learn programming, design, languages, music, or any other skill, Erudite makes it easy to find the right learning partner.

**🌟 Key Concept**: No traditional backend required - this is a community-driven platform focused on connecting learners and fostering collaborative growth.

## ✨ Features

### 🤝 **Social Learning**
- **Skill Matching**: Find people with complementary skills
- **Profile System**: Showcase your skills and learning goals
- **Community Groups**: Join specialized learning communities
- **Real-time Chat**: Connect and communicate with other learners

### 📅 **Learning Management**
- **Session Scheduling**: Book learning sessions that fit your schedule
- **Progress Tracking**: Monitor your learning journey
- **Skill Challenges**: Participate in skill-building challenges
- **Achievement System**: Earn rewards and recognition

### 🎨 **User Experience**
- **Mobile-First Design**: Optimized for mobile devices
- **Dark/Light Theme**: Toggle between themes
- **Responsive UI**: Beautiful interface powered by Radix UI components
- **Smooth Animations**: Enhanced with Framer Motion

### 🛠 **Platform Features**
- **Authentication System**: Secure user authentication
- **Onboarding Flow**: Guided setup for new users
- **Settings Management**: Customize your experience
- **People Discovery**: Browse and connect with other learners

## 🚀 Tech Stack

### **Core Framework**
- **Next.js 15.2.4** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript 5** - Type-safe development

### **UI & Styling**
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **Radix UI** - Accessible, unstyled UI components
- **Lucide React** - Beautiful icons
- **Framer Motion** - Smooth animations

### **Form & Validation**
- **React Hook Form 7.54.1** - Performant forms
- **Zod 3.24.1** - TypeScript-first schema validation
- **@hookform/resolvers** - Form validation resolvers

### **Development Tools**
- **PostCSS** - CSS processing
- **Class Variance Authority** - Component variant management
- **clsx & tailwind-merge** - Conditional className utilities

## 📦 Installation

### Prerequisites
- **Node.js** 18+ and **npm** (or **pnpm** recommended)
- Modern web browser

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/johndoniego/erudite.git
   cd erudite
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   # or if using pnpm
   pnpm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npm run start
```

## 🎯 Usage

### Getting Started
1. **Sign Up**: Create your account through the authentication flow
2. **Complete Onboarding**: Set up your profile and select skills
3. **Explore**: Browse available skills and learning communities
4. **Connect**: Find and connect with other learners
5. **Schedule**: Book learning sessions with your matches
6. **Learn & Teach**: Start your collaborative learning journey!

### Key Pages & Features
- **`/`** - Landing page with app overview
- **`/auth`** - Authentication (sign up/sign in)
- **`/onboarding`** - New user setup flow
- **`/skills`** - Browse and search available skills
- **`/people`** - Discover other learners
- **`/communities`** - Join learning communities
- **`/schedule`** - Manage your learning sessions
- **`/chat`** - Message other users
- **`/profile`** - Your personal profile
- **`/rewards`** - View achievements and rewards

## 🏗 Project Structure

```
erudite/
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication pages
│   ├── challenges/        # Skill challenges
│   ├── chat/              # Messaging system
│   ├── communities/       # Learning communities
│   ├── onboarding/        # User onboarding flow
│   ├── people/            # User discovery
│   ├── profile/           # User profiles
│   ├── rewards/           # Achievement system
│   ├── schedule/          # Session scheduling
│   ├── settings/          # App settings
│   ├── skills/            # Skill browsing
│   └── page.tsx           # Landing page
├── components/            # Reusable UI components
│   └── ui/               # Radix UI component library
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── public/               # Static assets
├── styles/               # Global styles
└── ...config files
```

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Use the existing UI component patterns
- Ensure mobile responsiveness
- Add proper error handling
- Write descriptive commit messages

## 🔗 Links

- **Live Demo**: [erudite-nine.vercel.app](https://erudite-nine.vercel.app)
- **Repository**: [github.com/johndoniego/erudite](https://github.com/johndoniego/erudite)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with ❤️ for the learning community
- UI components powered by [Radix UI](https://www.radix-ui.com/)
- Icons by [Lucide](https://lucide.dev/)
- Deployed on [Vercel](https://vercel.com/)

---

**Ready to start your learning journey?** [Try Erudite now!](https://erudite-nine.vercel.app) 🚀
