# sales-pulse

🚀 Sales Pulse – A RESTful API for managing monthly sales data using Fastify and TypeScript. Built for a 1-week backend challenge with focus on clean architecture and modern best practices.

## Prerequisites

- Node.js (v20 or higher)
- pnpm (v9 or higher)
- Docker and Docker Compose
- PostgreSQL (if running locally without Docker)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/brix101/sales-pulse
cd sales-pulse
```

### 2. Environment Setup

Copy the example environment file and update the values:

```bash
cp .env.example .env
```

Update the following variables in `.env`:

- `DATABASE_URL`: Your PostgreSQL connection string
- `PORT`: The port number for the API server (default: 3000)

### 3. Installation

Install dependencies using pnpm:

```bash
pnpm install
```

### 4. Database Setup

#### Using Docker (Recommended)

Start the PostgreSQL database:

```bash
docker-compose up -d
```

#### Running Migrations

Generate and apply database migrations:

```bash
# Apply migrations
pnpm db:migrate

# Seed the database with sample data
pnpm db:seed
```

### 5. Development

Start the development server:

```bash
pnpm dev
```

The API will be available at `http://localhost:3000`

### 6. Production Build

Build and start the production server:

```bash
# Build the application
pnpm build

# Start the server
pnpm start
```

## Available Scripts

- `pnpm dev`: Start development server with hot-reload
- `pnpm build`: Build the application
- `pnpm start`: Start production server
- `pnpm lint`: Run ESLint
- `pnpm lint:fix`: Fix ESLint issues
- `pnpm format`: Check code formatting
- `pnpm format:fix`: Fix code formatting
- `pnpm db:generate`: Generate database migrations
- `pnpm db:migrate`: Apply database migrations
- `pnpm db:studio`: Open Drizzle Studio for database management
- `pnpm db:push`: Push schema changes to database
- `pnpm db:seed`: Seed the database with sample data

## Docker Support

The project includes Docker Compose configuration for the PostgreSQL database. To use it:

1. Start the database:

```bash
docker-compose up -d
```

2. Stop the database:

```bash
docker-compose down
```
