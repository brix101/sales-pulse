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
- `LOG_LEVEL`: Logging level (default: info)

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
pnpm orm migration:up

# Seed the database with sample data
pnpm orm seeder:seed
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
- `pnpm orm`: Run MikroORM CLI commands
  - `pnpm orm migration:create`: Create a new migration
  - `pnpm orm migration:up`: Apply pending migrations
  - `pnpm orm migration:down`: Revert the last migration
  - `pnpm orm seeder:seed`: Seed the database
  - `pnpm orm schema:update`: Update database schema
  - `pnpm orm schema:fresh`: Drop and recreate database schema

## API Documentation and Testing

The project includes a Postman collection for testing the API endpoints. The collection is located in `postman_collection.json` at the root of the project.

### Available Endpoints

- **Authentication**

  - `POST /api/v1/users/signup` - Register a new user
  - `POST /api/v1/users/login` - Login user
  - `GET /api/v1/users/me` - Get current user profile

- **Sales**

  - `GET /api/v1/sales` - Get sales data
    - Query Parameters:
      - `customerId` (optional) - Filter by customer ID
      - `month` (optional) - Filter by month (format: YYYY-MM)
      - `page` (optional) - Page number (default: 1)
      - `limit` (optional) - Items per page (default: 10)

- **Customers**

  - `GET /api/v1/customers` - Get list of customers
    - Query Parameters:
      - `page` (optional) - Page number (default: 1)
      - `limit` (optional) - Items per page (default: 10)

- **Products**
  - `GET /api/v1/products` - Get list of products
    - Query Parameters:
      - `page` (optional) - Page number (default: 1)
      - `limit` (optional) - Items per page (default: 10)

### Using the Postman Collection

1. Import the `postman_collection.json` file into Postman
2. Set up your environment variables:
   - `baseUrl`: Your API base URL (default: http://localhost:3000)
   - `token`: JWT token received after login (automatically set after successful login)
3. Start with the authentication endpoints to get your token
4. Use the token for authenticated requests

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
