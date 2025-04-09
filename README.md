# Open Access Learn

An open-source learning platform for programming and technology education.

## Project Structure

```
open-access-learn/
├── frontend/               # React/Svelte frontend
│   ├── public/            # Static assets
│   ├── src/              # Source code
│   └── tailwind.config.js # Tailwind CSS configuration
├── backend/               # Rust or FastAPI backend
│   ├── src/              # Source code
│   └── Cargo.toml / main.py # Dependencies and entry point
├── content/              # Markdown-based lesson files
│   ├── rust/            # Rust programming lessons
│   ├── html/            # HTML/CSS lessons
│   └── index.yaml       # Content index
├── db/                   # Database schema & migrations
├── scripts/             # Setup, deploy, test scripts
├── .github/workflows/   # CI/CD configurations
└── README.md            # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (for frontend)
- Rust or Python (for backend)
- PostgreSQL (for database)
- Git

### Development Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/open-access-learn.git
   cd open-access-learn
   ```

2. Set up the frontend:

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. Set up the backend:

   ```bash
   cd backend
   # For Rust:
   cargo build
   cargo run
   # For Python:
   pip install -r requirements.txt
   python main.py
   ```

4. Set up the database:
   ```bash
   cd db
   # Run migrations
   ```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
