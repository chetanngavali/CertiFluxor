# FluxCert

Enterprise-grade automated certificate generation infrastructure.

## Key Features
- **Smart Excel Ingestion**: Automatically detect headers and map data to certificates.
- **Visual Designer**: Drag-and-drop studio for high-fidelity certificate templates.
- **Developer First**: Production-ready REST API for LMS and Event integrations.
- **Enterprise Scale**: Built for 10k+ certificates per month.

## Tech Stack
- **Frontend**: React + Tailwind CSS + Framer Motion
- **Backend**: Express.js
- **Database**: MariaDB + Drizzle ORM
- **Automation**: Excel parser + Visual bindings

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/chetanngavali/CertiFluxor.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Copy `.env.example` to `.env` and fill in your MariaDB credentials.

4. Push schema and seed:
   ```bash
   npm run db:push
   ```

5. Run development server:
   ```bash
   npm run dev
   ```

## Development
- `npm run dev`: Start the development server.
- `npm run db:seed`: Seed the database with initial templates and API keys.
- `npm run build`: Build for production.
