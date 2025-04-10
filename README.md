# Open Access Learn

An open-source bilingual (English/French) learning platform focused on GCE Ordinary and Advanced Level curriculum for Cameroonian students.

## Features

- 📚 Complete GCE OL & AL curriculum coverage
- 👤 Student accounts with email confirmation
- 📥 Past questions archive with detailed answers
- 📈 Progress tracking and gamification
- 🔁 Bilingual support (English 🇬🇧 + French 🇫🇷)
- 📱 Mobile-friendly Progressive Web App
- 🎯 Interactive lessons with quizzes and hints

## Project Structure
 
```
open-access-learn/
├── frontend/                 # React app with routing & auth
├── backend/                  # Rust (Axum) backend
├── content/
│   ├── ordinary_level/      # OL curriculum
│   │   ├── sciences/        # Science subjects
│   │   └── arts/           # Arts subjects
│   └── advanced_level/      # AL curriculum
│       ├── sciences/        # Science subjects
│       └── arts/           # Arts subjects
├── questions/               # Past question uploads
├── i18n/                    # Language translation files
├── db/                      # PostgreSQL schema & migrations
├── scripts/                 # Setup, deploy, test scripts
├── .github/workflows/       # CI/CD configurations
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (for frontend)
- Rust (for backend)
- PostgreSQL (for database)
- Git

### Development Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/chojuninengu/open-access-learn.git
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
   cargo build
   cargo run
   ```

4. Set up the database:
   ```bash
   cd db
   psql -U postgres -f schema.sql
   ```

## Contributing

We welcome contributions to help improve the platform! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
