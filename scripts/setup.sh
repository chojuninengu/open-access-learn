#!/bin/bash

# Exit on error
set -e

echo "Setting up Open Access Learn development environment..."

# Check for required tools
command -v node >/dev/null 2>&1 || { echo "Node.js is required but not installed. Aborting." >&2; exit 1; }
command -v npm >/dev/null 2>&1 || { echo "npm is required but not installed. Aborting." >&2; exit 1; }
command -v psql >/dev/null 2>&1 || { echo "PostgreSQL is required but not installed. Aborting." >&2; exit 1; }

# Setup frontend
echo "Setting up frontend..."
cd frontend
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Setup backend (Rust)
echo "Setting up Rust backend..."
cd ../backend
cargo build

# Setup database
echo "Setting up database..."
cd ../db
psql -U postgres -f schema.sql

echo "Setup complete! You can now start developing."
echo "To start the frontend: cd frontend && npm run dev"
echo "To start the backend: cd backend && cargo run" 