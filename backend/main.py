from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Open Access Learn API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Welcome to Open Access Learn API"} 10072 open-access-learn/backend git:(main) ✗ » cargo build                                                       
error: failed to parse manifest at `/home/ju-nine/projects/personal_projects/open-access-learn/backend/Cargo.toml`

Caused by:
  no targets specified in the manifest
  either src/lib.rs, src/main.rs, a [lib] section, or [[bin]] section must be present
10073 open-access-learn/backend git:(main) ✗ » ls
Cargo.toml  main.py  src
10074 open-access-learn/backend git:(main) ✗ » cargo build
error: failed to parse manifest at `/home/ju-nine/projects/personal_projects/open-access-learn/backend/Cargo.toml`

Caused by:
  no targets specified in the manifest
  either src/lib.rs, src/main.rs, a [lib] section, or [[bin]] section must be present
10075 open-access-learn/backend git:(main) ✗ » 
