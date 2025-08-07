# NDIS MVP - Participant Management System

## Project Overview

This is a comprehensive NDIS (National Disability Insurance Scheme) participant management system designed for support coordinators, allied health professionals, and support workers. The application provides tools for managing participants, tracking support sessions, generating invoices, and maintaining compliance with NDIS requirements.

## Features

- **Participant Management**: Complete participant profiles with NDIS plan details
- **Session Logging**: Track support sessions and activities
- **Invoice Generation**: Generate NDIS-compliant invoices with item codes
- **Staff Management**: Manage support workers and coordinators
- **Document Management**: Store and organize participant documents
- **Calendar Integration**: Schedule and track appointments
- **Reporting**: Generate compliance and activity reports
- **Role-based Access**: Secure access control for different user types

## User Roles

- **Super Admin**: Full system access and administration
- **Support Coordinator**: Participant management and coordination
- **Allied Health**: Professional service delivery
- **Support Worker**: Session logging and direct support

## Technology Stack

This project is built with:

- **Frontend**: React 18 with TypeScript
- **UI Framework**: shadcn/ui components
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **State Management**: React Context API

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ndis-mvp
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:8080`

## Development

### Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── forms/          # Form components
│   ├── invoices/       # Invoice-related components
│   ├── Layout/         # Layout components
│   └── ui/            # shadcn/ui components
├── contexts/           # React contexts
├── hooks/             # Custom React hooks
├── lib/               # Utility functions
├── pages/             # Application pages
└── main.tsx           # Application entry point
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Deploy automatically on push to main branch

### Other Platforms

The application can be deployed to any static hosting platform:
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Firebase Hosting

## NDIS Compliance

This application is designed to meet NDIS requirements including:
- Proper participant record keeping
- Accurate session logging
- NDIS item code compliance
- Secure data handling
- Audit trail maintenance

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is proprietary software for NDIS service providers.

## Support

For technical support or questions about NDIS compliance, please contact the development team.
