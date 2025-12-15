export interface Project {
  slug: string; // URL-friendly identifier
  title: string;
  description: string;
  technologies: string[];
  github?: string; // Optional - can be private org repo
  demo?: string; // Optional - can be private/internal demo
  isPrivate?: boolean; // Indicates if it's a private/organization project
  organization?: string; // Name of the organization (optional)
  features?: string[]; // Key features of the project
  codeSnippets?: {
    title: string;
    language: string;
    code: string;
  }[]; // Code examples to showcase
  longDescription?: string; // Detailed description
}

export const projects: Project[] = [
  {
    slug: 'ecommerce-platform',
    title: 'E-Commerce Platform',
    description:
      'A full-stack e-commerce solution with payment integration, inventory management, and admin dashboard.',
    longDescription:
      'A comprehensive e-commerce platform built with modern technologies. Features include user authentication, product catalog management, shopping cart functionality, secure payment processing with Stripe, order management, and an admin dashboard for inventory and sales tracking.',
    technologies: ['Next.js', 'TypeScript', 'Prisma', 'Stripe', 'Tailwind CSS'],
    github: 'https://github.com/yourusername/ecommerce-platform',
    demo: 'https://ecommerce-demo.example.com',
    features: [
      'Secure payment processing with Stripe',
      'Real-time inventory management',
      'User authentication and authorization',
      'Admin dashboard with analytics',
      'Responsive design for all devices',
    ],
    codeSnippets: [
      {
        title: 'Payment Processing',
        language: 'typescript',
        code: `// Example: Stripe payment integration
        import Stripe from 'stripe';

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

        export async function createPaymentIntent(amount: number) {
          const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // Convert to cents
            currency: 'usd',
          });
          return paymentIntent;
        }`,
      },
      {
        title: 'Product API Route',
        language: 'typescript',
        code: `// Example: Next.js API route for products
        import { NextApiRequest, NextApiResponse } from 'next';
        import { prisma } from '@/lib/prisma';

        export default async function handler(
          req: NextApiRequest,
          res: NextApiResponse
        ) {
          if (req.method === 'GET') {
            const products = await prisma.product.findMany({
              include: { category: true },
            });
            return res.json(products);
          }
          // ... other methods
        }`,
      },
    ],
  },
  {
    slug: 'internal-crm-system',
    title: 'Internal CRM System',
    description:
      'A comprehensive CRM system built for organization with customer management, sales tracking, and analytics dashboard.',
    longDescription:
      'A full-featured CRM system designed for internal use within the organization. Includes customer relationship management, sales pipeline tracking, lead management, automated email campaigns, and comprehensive analytics dashboard.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Express', 'TypeScript'],
    isPrivate: true,
    organization: 'Your Organization Name',
    features: [
      'Customer relationship management',
      'Sales pipeline tracking',
      'Lead management and scoring',
      'Automated email campaigns',
      'Analytics and reporting dashboard',
    ],
  },
  {
    slug: 'task-management-app',
    title: 'Task Management App',
    description:
      'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
    longDescription:
      'A modern task management application with real-time collaboration features. Built with React and Node.js, featuring WebSocket connections for live updates, drag-and-drop task organization, team workspaces, and comprehensive project management tools.',
    technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Express'],
    github: 'https://github.com/yourusername/task-manager',
    demo: 'https://task-demo.example.com',
    features: [
      'Real-time updates with WebSocket',
      'Drag-and-drop task organization',
      'Team collaboration and workspaces',
      'Project boards and kanban views',
      'Task assignments and notifications',
    ],
    codeSnippets: [
      {
        title: 'WebSocket Connection',
        language: 'typescript',
        code: `// Real-time updates with Socket.io
        import { io } from 'socket.io-client';

        const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!);

        socket.on('task-updated', (task) => {
          updateTaskInState(task);
        });

        export function updateTask(taskId: string, updates: TaskUpdate) {
          socket.emit('update-task', { taskId, updates });
        }`,
      },
    ],
  },
  {
    slug: 'enterprise-dashboard',
    title: 'Enterprise Dashboard',
    description:
      'Analytics and reporting dashboard for enterprise clients with real-time data visualization and custom reporting.',
    longDescription:
      'An enterprise-grade analytics dashboard providing real-time insights and custom reporting capabilities. Features advanced data visualization with D3.js, customizable dashboards, export functionality, and role-based access control.',
    technologies: ['Next.js', 'Python', 'PostgreSQL', 'D3.js', 'FastAPI'],
    isPrivate: true,
    organization: 'Your Organization Name',
    demo: 'https://internal-demo.example.com',
    features: [
      'Real-time data visualization',
      'Custom report generation',
      'Interactive charts with D3.js',
      'Role-based access control',
      'Data export functionality',
    ],
  },
  {
    slug: 'weather-dashboard',
    title: 'Weather Dashboard',
    description:
      'A beautiful weather dashboard with location-based forecasts, interactive maps, and detailed weather analytics.',
    longDescription:
      'A modern weather dashboard application providing location-based forecasts, interactive weather maps, detailed analytics, and historical weather data. Built with Vue.js and integrated with OpenWeather API for real-time weather information.',
    technologies: ['Vue.js', 'Chart.js', 'OpenWeather API', 'Vite'],
    github: 'https://github.com/yourusername/weather-dashboard',
    demo: 'https://weather-demo.example.com',
    features: [
      'Location-based weather forecasts',
      'Interactive weather maps',
      'Historical weather data',
      'Chart visualizations',
      'Responsive design',
    ],
    codeSnippets: [
      {
        title: 'Weather API Integration',
        language: 'javascript',
        code: `// Fetching weather data
        async function fetchWeatherData(location) {
          const response = await fetch(
            \`https://api.openweathermap.org/data/2.5/weather?q=\${location}&appid=\${API_KEY}\`
          );
          const data = await response.json();
          return {
            temperature: data.main.temp,
            description: data.weather[0].description,
            humidity: data.main.humidity,
          };
        }`,
      },
    ],
  },
];
