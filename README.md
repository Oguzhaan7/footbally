# ⚽ Footbally - Modern Football League Management Platform

<div align="center">

🌐 **[Live Demo - footbally.vercel.app](https://footbally.vercel.app)** 🌐

![Footbally Logo](https://img.shields.io/badge/⚽-Footbally-emerald?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDQgOUwxMC45MSA4LjI2TDEyIDJaIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+)

**A beautiful, modern football league management platform built with Next.js, GraphQL, and MongoDB**

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-footbally.vercel.app-brightgreen?style=for-the-badge)](https://footbally.vercel.app)

[![Next.js](https://img.shields.io/badge/Next.js-15.3.4-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![GraphQL](https://img.shields.io/badge/GraphQL-16.11.0-e10098?style=flat-square&logo=graphql)](https://graphql.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.16.1-green?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

</div>

## 🎯 Features

### ⚡ Core Functionality

- **League Management**: Create and manage multiple football leagues
- **Team Management**: Add teams with automatic player generation
- **Player Analytics**: Detailed player statistics and performance metrics
- **League Simulation**: Automatic match simulation for complete leagues (10 teams)
- **Responsive Design**: Beautiful UI that works on all devices

### 🎨 Modern UI/UX

- **Shadcn/UI Components**: Professional, accessible component library
- **Tailwind CSS**: Modern styling with gradients and animations
- **Interactive Elements**: Hover effects, transitions, and micro-interactions
- **Professional Logo Design**: Custom branding with modern aesthetics

### 🔧 Technical Features

- **Next.js 15**: Latest React framework with App Router and Turbopack
- **GraphQL API**: Type-safe API with Apollo Server
- **MongoDB Integration**: Scalable NoSQL database
- **Form Validation**: React Hook Form with Zod schemas
- **Toast Notifications**: User-friendly feedback with Sonner
- **Type Safety**: Full TypeScript coverage
- **Modern Architecture**: Clean, maintainable codebase

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.0 or higher
- **MongoDB** (local or cloud instance)
- **pnpm** (recommended) or npm

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/footbally.git
cd footbally
```

### 2. Install Dependencies

```bash
# Using pnpm (recommended)
pnpm install

# Or using npm
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/footbally
# For MongoDB Atlas (cloud):
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/footbally?retryWrites=true&w=majority

# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development

# Optional: Add additional environment variables as needed
# NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
# NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### 4. Database Setup

```bash
# Start your local MongoDB service
# On macOS with Homebrew:
brew services start mongodb-community

# On Windows (if installed as service):
net start MongoDB

# On Linux:
sudo systemctl start mongod
```

### 5. Seed the Database (Optional)

```bash
# Run the seed script to populate with sample data
npx tsx lib/seed.ts
```

### 6. Start Development Server

```bash
# Using pnpm
pnpm dev

# Or using npm
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your application! 🎉

## 📁 Project Structure

```
footbally/
├── app/                    # Next.js App Router
│   ├── api/               # API routes (GraphQL endpoint)
│   ├── leagues/           # League pages
│   ├── teams/             # Team pages
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── forms/            # Form components
│   ├── home/             # Homepage components
│   ├── layout/           # Layout components
│   ├── league/           # League-specific components
│   ├── providers/        # Context providers
│   ├── team/             # Team-specific components
│   └── ui/               # Shadcn/UI components
├── graphql/              # GraphQL setup
│   ├── client/           # Client-side queries/mutations
│   └── server/           # Server-side resolvers/schemas
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── models/               # MongoDB/Mongoose models
└── public/               # Static assets
```

## 🎮 Usage Guide

### Creating Your First League

1. **Navigate to Leagues**: Click on "Leagues" in the navigation
2. **Add New League**: Click the "Create League" button
3. **Fill Details**: Enter league name and country
4. **Save**: Your league is now created!

### Adding Teams

1. **Go to Teams Page**: Click "Teams" or visit a specific league
2. **Add Team**: Click "Add Team" button
3. **Auto-Generation**: Players are automatically generated for new teams
4. **League Assignment**: Teams can be assigned to specific leagues

### Running Simulations

1. **Complete League**: Ensure your league has exactly 10 teams
2. **Simulate**: Click the "Simulate League" button
3. **View Results**: Check updated standings and statistics

## 🛠️ Development

### Available Scripts

```bash
# Development
pnpm dev          # Start development server with Turbopack
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint

# Database
npx tsx lib/seed.ts    # Seed database with sample data
```

### Database Schema

#### League Model

```typescript
{
  name: string;        // League name
  country: string;     // Country/region
  teams: ObjectId[];   // Referenced teams
}
```

#### Team Model

```typescript
{
  name: string;        // Team name
  league: ObjectId;    // Referenced league
  players: ObjectId[]; // Referenced players
  logoUrl?: string;    // Team logo URL
  // Match statistics
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
}
```

#### Player Model

```typescript
{
  name: string; // Player name
  position: string; // Position (GK, DEF, MID, FW)
  team: ObjectId; // Referenced team
  // Player attributes (0-100)
  pace: number;
  shooting: number;
  passing: number;
  defending: number;
  dribbling: number;
  physical: number;
}
```

## 🔗 API Endpoints

### GraphQL Endpoint

- **URL**: `/api/graphql`
- **Playground**: Available in development mode

### Key Queries

```graphql
# Get all leagues with teams
query GetLeagues {
  leagues {
    _id
    name
    country
    teams {
      _id
      name
    }
  }
}

# Get league with full team details
query GetLeague($id: ID!) {
  league(id: $id) {
    _id
    name
    country
    teams {
      _id
      name
      played
      won
      drawn
      lost
      points
      players {
        _id
        name
        position
      }
    }
  }
}
```

### Key Mutations

```graphql
# Create a new league
mutation CreateLeague($input: CreateLeagueInput!) {
  createLeague(input: $input) {
    _id
    name
    country
  }
}

# Create team with auto-generated players
mutation CreateTeamWithPlayers($input: CreateTeamInput!) {
  createTeamWithPlayers(input: $input) {
    _id
    name
    league {
      _id
      name
    }
    players {
      _id
      name
      position
    }
  }
}

# Simulate league matches
mutation SimulateLeague($leagueId: ID!) {
  simulateLeague(leagueId: $leagueId)
}
```

## 🎨 Customization

### Styling

- Modify `tailwind.config.js` for theme customization
- Update `app/globals.css` for global styles
- Component styles use Tailwind classes with custom gradients

### Colors & Branding

The app uses a modern color palette:

- **Primary**: Emerald/Green gradients
- **Secondary**: Blue/Cyan gradients
- **Accent**: Purple/Pink gradients
- **Neutral**: Slate/Gray tones

## 🚀 Deployment & DevOps

### Live Demo

🌐 **Production URL**: [https://footbally.vercel.app](https://footbally.vercel.app)

This application is deployed on **Vercel** with **MongoDB Atlas** as the cloud database.

### Production Architecture

- **Frontend & API**: Vercel (Edge Functions)
- **Database**: MongoDB Atlas (Cloud)
- **CDN**: Vercel Edge Network
- **Environment**: Node.js 18+ Runtime

### Vercel Deployment (Current Production)

The application is already deployed and running on Vercel with the following configuration:

#### 1. Automatic Deployments

- **Main Branch**: Auto-deploys to production
- **Feature Branches**: Deploy to preview URLs
- **Pull Requests**: Automatic preview deployments

#### 2. Environment Variables (Production)

```env
# Production Environment Variables (Set in Vercel Dashboard)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/footbally?retryWrites=true&w=majority
NEXT_PUBLIC_APP_URL=https://footbally.vercel.app
NODE_ENV=production
```

#### 3. MongoDB Atlas Configuration

- **Cluster**: M0 (Free Tier) - Scalable to paid tiers
- **Region**: Auto-selected for optimal performance
- **Security**: IP Whitelist + Database Authentication
- **Backup**: Automatic daily backups
- **Monitoring**: Built-in Atlas monitoring

#### 4. Performance Optimizations

- **Edge Runtime**: Fast global response times
- **Image Optimization**: Next.js automatic image optimization
- **Static Generation**: Pre-built pages for better performance
- **CDN**: Global content delivery network

### Setting Up Your Own Deployment

#### Option 1: Vercel (Recommended)

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Login to Vercel
vercel login

# 3. Deploy
vercel

# 4. Set environment variables
vercel env add MONGODB_URI
vercel env add NEXT_PUBLIC_APP_URL
```

#### Option 2: Manual Vercel Setup

1. **Connect Repository**:

   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Choose "Next.js" framework preset

2. **Configure Environment Variables**:

   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/footbally
   NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
   NODE_ENV=production
   ```

3. **Deploy**: Automatic deployment on git push

#### MongoDB Atlas Setup

1. **Create Atlas Account**: [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)

2. **Create Cluster**:

   ```bash
   # Free M0 cluster recommended for development
   # M2/M5 clusters for production with higher traffic
   ```

3. **Database Configuration**:

   ```javascript
   // Collections created automatically:
   -leagues - teams - players;
   ```

4. **Security Setup**:

   ```bash
   # Network Access: Add 0.0.0.0/0 (Allow from anywhere)
   # Database Access: Create user with read/write permissions
   ```

5. **Connection String**:
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/footbally?retryWrites=true&w=majority
   ```

### Production Monitoring & Analytics

#### Performance Metrics

- **Core Web Vitals**: Monitored via Vercel Analytics
- **Database Performance**: MongoDB Atlas Performance Advisor
- **Error Tracking**: Built-in Vercel error reporting
- **Uptime**: 99.9% availability with Vercel Edge Network

#### Scaling Considerations

- **Database**: MongoDB Atlas auto-scaling
- **Serverless Functions**: Vercel auto-scaling
- **CDN**: Global edge caching
- **Concurrent Users**: Supports 1000+ concurrent users

### CI/CD Pipeline

```yaml
# Automatic workflow on every push:
1. Code pushed to GitHub
2. Vercel builds the application
3. Runs type checking and linting
4. Deploys to preview URL (PRs) or production (main)
5. Sends deployment notifications
```

### Backup & Recovery

#### Database Backups

- **Automatic**: Daily MongoDB Atlas backups
- **Retention**: 7 days (Free tier), configurable for paid tiers
- **Point-in-time**: Available for M10+ clusters

#### Application Backups

- **Source Code**: GitHub repository
- **Deployment History**: Vercel deployment history
- **Rollback**: One-click rollback in Vercel dashboard

### Security

#### Production Security Features

- **HTTPS**: Automatic SSL certificates
- **Environment Variables**: Encrypted at rest
- **Database**: TLS/SSL encryption in transit
- **Authentication**: MongoDB user authentication
- **Network**: IP whitelisting available

#### Security Best Practices Implemented

```typescript
// Input validation with Zod schemas
// GraphQL query depth limiting
// MongoDB connection pooling
// Rate limiting (via Vercel)
// CORS configuration
```

### Cost Analysis

#### Current Production Costs

```
Vercel Pro Plan: $20/month
- Unlimited bandwidth
- Advanced analytics
- Team collaboration

MongoDB Atlas M0: FREE
- 512 MB storage
- Shared cluster
- Community support

Total Monthly Cost: $20 USD
```

#### Scaling Costs

```
For high-traffic applications:
- Vercel Pro: $20/month (current)
- MongoDB Atlas M2: $9/month (dedicated cluster)
- Total: ~$29/month for professional usage
```

### Local Development to Production Workflow

#### Development Flow

```bash
# 1. Local Development
pnpm dev              # Local development server
pnpm seed            # Seed local database

# 2. Testing
pnpm build           # Test production build
pnpm lint            # Code quality check

# 3. Deployment
git push origin main # Auto-deploy to production
git push origin feature/new-feature # Deploy to preview
```

#### Environment Management

```bash
# Local (.env.local)
MONGODB_URI=mongodb://localhost:27017/footbally

# Production (Vercel Environment Variables)
MONGODB_URI=mongodb+srv://cluster.mongodb.net/footbally
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

\*_oguzhan_

- Modern web development solutions
- Built with ❤️ using Next.js and TypeScript

---

<div align="center">

**[⬆ Back to Top](#-footbally---modern-football-league-management-platform)**

Made with ⚽ and ☕ by the Footbally team

</div>
