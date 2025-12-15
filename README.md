# Naresh Lokhande - Portfolio Website

A modern, responsive portfolio website showcasing my work as a Full Stack Developer. Built with React and deployed on GitHub Pages.

> **Note**: This repository contains both React (CRA) and Next.js versions:
>
> - **Main branch**: React version (current)
> - **nextjs-version branch**: Next.js version (see [NEXTJS_SETUP.md](./NEXTJS_SETUP.md) for details)

## 🌟 Features

- **Responsive Design**: Fully responsive layout that works seamlessly on desktop, tablet, and mobile devices
- **Dark/Light Theme**: Toggle between dark and light modes with theme persistence
- **Modern UI**: Built with Tailwind CSS and shadcn/ui components for a clean, professional look
- **Project Showcase**: Display your projects with images, descriptions, and technology tags
- **Tech Stack Section**: Highlight your skills across Frontend, Backend, DevOps, and Tools
- **Contact Form**: Integrated contact form for easy communication
- **Smooth Navigation**: React Router for seamless page navigation
- **Social Links**: Quick access to GitHub, LinkedIn, Twitter, and email

## 🚀 Tech Stack

### Frontend

- **React 19** - Modern React with latest features
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible component library
- **Framer Motion** - Animation library for smooth transitions
- **Lucide React** - Icon library
- **next-themes** - Theme management

### Development Tools

- **Create React App** - Project scaffolding and build tools
- **gh-pages** - GitHub Pages deployment

## 📁 Project Structure

```
nareshlokhande.github.io/
├── public/                 # Static assets
│   ├── index.html
│   └── ...
├── src/
│   ├── components/        # Reusable components
│   │   ├── ui/            # UI components (Button, Card, Input, etc.)
│   │   ├── Navbar.js      # Navigation bar
│   │   ├── Footer.js      # Footer component
│   │   ├── ContactForm.js # Contact form
│   │   ├── ProjectCard.js # Project display card
│   │   └── TechStack.js   # Technology stack display
│   ├── pages/             # Page components
│   │   ├── Home.js        # Home page
│   │   └── Contact.js     # Contact page
│   ├── context/           # React context
│   │   └── ThemeContext.js # Theme management
│   ├── lib/               # Utility functions
│   ├── actions.js         # API actions
│   ├── App.js             # Main app component
│   └── index.js           # Entry point
├── package.json
└── README.md
```

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/NareshLokhande/nareshlokhande.github.io.git
   cd nareshlokhande.github.io
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```
   The app will open at [http://localhost:3000](http://localhost:3000)

## 📜 Available Scripts

### `npm start`

Runs the app in development mode at [http://localhost:3000](http://localhost:3000). The page will reload when you make changes.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder. The build is optimized and ready for deployment.

### `npm run deploy`

Deploys the built app to GitHub Pages. This command:

1. Runs `npm run build` to create a production build
2. Deploys the `build` folder to the `gh-pages` branch

## 🎨 Customization

### Update Personal Information

- Edit `src/pages/Home.js` to update the hero section and social links
- Modify `src/components/Navbar.js` to change navigation items
- Update `src/components/Footer.js` for footer information

### Add Projects

Edit the projects array in `src/pages/Home.js`:

```javascript
<ProjectCard
  title="Your Project Title"
  description="Project description"
  image={YourImage}
  link="https://github.com/your-repo"
  tags={['React', 'Node.js', 'MongoDB']}
/>
```

### Update Tech Stack

Modify the `technologies` array in `src/components/TechStack.js`:

```javascript
const technologies = [
  {
    category: 'Frontend',
    skills: ['React', 'Vue', 'Angular'],
  },
  // Add more categories...
];
```

### Configure Contact Form

Update the API endpoint in `src/actions.js`:

```javascript
const response = await fetch('https://your-backend-api.com/contact', {
  // ... your configuration
});
```

## 🌐 Deployment

This project is configured for GitHub Pages deployment. The `homepage` field in `package.json` is set to your GitHub Pages URL.

### Deploy to GitHub Pages

1. **Build the project**

   ```bash
   npm run build
   ```

2. **Deploy**
   ```bash
   npm run deploy
   ```

The site will be available at `https://nareshlokhande.github.io`

## 🔒 Security

All security vulnerabilities have been addressed using npm overrides in `package.json`:

- `nth-check >=2.0.1`
- `postcss >=8.4.31`
- `webpack-dev-server >=5.2.1`

Run `npm audit` to verify no vulnerabilities exist.

## 📝 License

This project is private and all rights are reserved.

## 📧 Contact

- **Email**: nareshlokhande.dev@gmail.com
- **GitHub**: [@NareshLokhande](https://github.com/NareshLokhande)
- **Website**: [https://nareshlokhande.github.io](https://nareshlokhande.github.io)

---

Built with ❤️ using React and Tailwind CSS
