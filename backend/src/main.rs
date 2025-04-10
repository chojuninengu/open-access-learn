use actix_cors::Cors;
use actix_web::{web, App, HttpResponse, HttpServer, Responder};
use serde::{Deserialize, Serialize};
use std::env;

#[derive(Debug, Serialize, Deserialize)]
struct AIChatRequest {
    question: String,
    subject: String,
    level: String,
    context: AIContext,
}

#[derive(Debug, Serialize, Deserialize)]
struct SubjectInfo {
    code: String,
    name: String,
    level: String,
    papers: Vec<String>,
    sections: Vec<String>,
    years: Vec<ExamYear>,
    syllabus: Option<Syllabus>,
    compulsory: bool
}

#[derive(Debug, Serialize, Deserialize)]
struct Syllabus {
    topics: Vec<String>,
    resources: Vec<String>,
    description: String
}

#[derive(Debug, Serialize, Deserialize)]
struct ExamYear {
    year: String,
    session: String,
    papers: Vec<ExamPaper>,
}

#[derive(Debug, Serialize, Deserialize)]
struct ExamPaper {
    name: String,
    paper_type: String,
}

fn init_gce_subjects() -> Vec<SubjectInfo> {
    let mut subjects = Vec::new();
    
    // O-Level Subjects
    subjects.extend(vec![
        SubjectInfo {
            code: "0505".to_string(),
            name: "ACCOUNTING".to_string(),
            level: "O Level".to_string(),
            papers: vec!["Paper 1 (MCQ)".to_string(), "Paper 2 (Theory)".to_string()],
            sections: vec!["OHADA Approach".to_string(), "IAS/IFRS Approach".to_string()],
            years: vec![],
            syllabus: Some(Syllabus {
                topics: vec!["Basic Accounting".to_string(), "Financial Statements".to_string()],
                resources: vec!["OHADA Guidelines".to_string()],
                description: "Covers both OHADA and IAS/IFRS approaches".to_string()
            }),
            compulsory: false
        },
        SubjectInfo {
            code: "0510".to_string(),
            name: "BIOLOGY".to_string(),
            level: "O Level".to_string(),
            papers: vec!["Paper 1 (MCQ)".to_string(), "Paper 2 (Theory)".to_string()],
            sections: vec!["Section A (Compulsory)".to_string(), "Section B (Choice)".to_string()],
            years: vec![],
            syllabus: Some(Syllabus {
                topics: vec!["Cell Biology".to_string(), "Human Biology".to_string()],
                resources: vec!["GCE Board Biology Syllabus".to_string()],
                description: "Comprehensive study of living organisms".to_string()
            }),
            compulsory: false
        },
        SubjectInfo {
            code: "0515".to_string(),
            name: "CHEMISTRY".to_string(),
            level: "O Level".to_string(),
            papers: vec!["Paper 1 (MCQ)".to_string(), "Paper 2 (Theory)".to_string()],
            sections: vec!["Theory".to_string(), "Practical".to_string()],
            years: vec![],
            syllabus: Some(Syllabus {
                topics: vec!["Atomic Structure".to_string(), "Chemical Reactions".to_string(), "Organic Chemistry".to_string()],
                resources: vec!["GCE Board Chemistry Syllabus".to_string()],
                description: "Study of matter, its properties, and reactions".to_string()
            }),
            compulsory: false
        },
        SubjectInfo {
            code: "0520".to_string(),
            name: "ENGLISH LANGUAGE".to_string(),
            level: "O Level".to_string(),
            papers: vec!["Paper 1 (Essay)".to_string(), "Paper 2 (Comprehension)".to_string()],
            sections: vec!["Writing".to_string(), "Reading".to_string()],
            years: vec![],
            syllabus: Some(Syllabus {
                topics: vec!["Grammar".to_string(), "Composition".to_string()],
                resources: vec!["GCE Board English Syllabus".to_string()],
                description: "Core language skills and communication".to_string()
            }),
            compulsory: true
        },
        SubjectInfo {
            code: "0525".to_string(),
            name: "FRENCH".to_string(),
            level: "O Level".to_string(),
            papers: vec!["Paper 1 (Oral)".to_string(), "Paper 2 (Written)".to_string()],
            sections: vec!["Oral Communication".to_string(), "Written Expression".to_string()],
            years: vec![],
            syllabus: Some(Syllabus {
                topics: vec!["Grammar".to_string(), "Vocabulary".to_string(), "Communication".to_string()],
                resources: vec!["GCE Board French Syllabus".to_string()],
                description: "French language proficiency and communication".to_string()
            }),
            compulsory: true
        },
        SubjectInfo {
            code: "0530".to_string(),
            name: "MATHEMATICS".to_string(),
            level: "O Level".to_string(),
            papers: vec!["Paper 1 (MCQ)".to_string(), "Paper 2 (Theory)".to_string()],
            sections: vec!["Pure Mathematics".to_string(), "Statistics".to_string()],
            years: vec![],
            syllabus: Some(Syllabus {
                topics: vec!["Algebra".to_string(), "Geometry".to_string(), "Trigonometry".to_string(), "Statistics".to_string()],
                resources: vec!["GCE Board Mathematics Syllabus".to_string()],
                description: "Essential mathematical concepts and problem-solving".to_string()
            }),
            compulsory: true
        },
        // Add more O-Level subjects here
    ]);

    // A-Level Subjects
    subjects.extend(vec![
        SubjectInfo {
            code: "0710".to_string(),
            name: "BIOLOGY".to_string(),
            level: "A Level".to_string(),
            papers: vec!["Paper 1".to_string(), "Paper 2".to_string(), "Paper 3".to_string()],
            sections: vec!["Theory".to_string(), "Structured Questions".to_string(), "Practical".to_string()],
            years: vec![
                ExamYear {
                    year: "2024".to_string(),
                    session: "June".to_string(),
                    papers: vec![
                        ExamPaper { name: "Paper 1".to_string(), paper_type: "Theory".to_string() },
                        ExamPaper { name: "Paper 2".to_string(), paper_type: "Structured Questions".to_string() },
                        ExamPaper { name: "Paper 3".to_string(), paper_type: "Practical".to_string() },
                    ],
                }
            ],
            syllabus: Some(Syllabus {
                topics: vec!["Advanced Cell Biology".to_string(), "Genetics".to_string(), "Ecology".to_string()],
                resources: vec!["GCE Board A-Level Biology Syllabus".to_string()],
                description: "Advanced study of biological systems and processes".to_string()
            }),
            compulsory: false
        },
        SubjectInfo {
            code: "0715".to_string(),
            name: "CHEMISTRY".to_string(),
            level: "A Level".to_string(),
            papers: vec!["Paper 1".to_string(), "Paper 2".to_string(), "Paper 3".to_string()],
            sections: vec!["Theory".to_string(), "Structured Questions".to_string(), "Practical".to_string()],
            years: vec![],
            syllabus: Some(Syllabus {
                topics: vec!["Physical Chemistry".to_string(), "Organic Chemistry".to_string(), "Inorganic Chemistry".to_string()],
                resources: vec!["GCE Board A-Level Chemistry Syllabus".to_string()],
                description: "Advanced study of chemical principles and reactions".to_string()
            }),
            compulsory: false
        },
        SubjectInfo {
            code: "0720".to_string(),
            name: "PHYSICS".to_string(),
            level: "A Level".to_string(),
            papers: vec!["Paper 1".to_string(), "Paper 2".to_string(), "Paper 3".to_string()],
            sections: vec!["Theory".to_string(), "Structured Questions".to_string(), "Practical".to_string()],
            years: vec![],
            syllabus: Some(Syllabus {
                topics: vec!["Mechanics".to_string(), "Electricity".to_string(), "Modern Physics".to_string()],
                resources: vec!["GCE Board A-Level Physics Syllabus".to_string()],
                description: "Advanced study of matter, energy, and their interactions".to_string()
            }),
            compulsory: false
        },
        SubjectInfo {
            code: "0725".to_string(),
            name: "MATHEMATICS".to_string(),
            level: "A Level".to_string(),
            papers: vec!["Pure Mathematics".to_string(), "Mechanics".to_string(), "Statistics".to_string()],
            sections: vec!["Pure Mathematics".to_string(), "Applied Mathematics".to_string()],
            years: vec![],
            syllabus: Some(Syllabus {
                topics: vec!["Calculus".to_string(), "Algebra".to_string(), "Vectors".to_string(), "Statistics".to_string()],
                resources: vec!["GCE Board A-Level Mathematics Syllabus".to_string()],
                description: "Advanced mathematical concepts and applications".to_string()
            }),
            compulsory: false
        },
        // Add more A-Level subjects here
    ]);

    subjects
}

#[derive(Debug, Serialize, Deserialize)]
struct AIContext {
    platform: String,
    curriculum: String,
}

async fn health_check() -> impl Responder {
    HttpResponse::Ok().json(serde_json::json!({
        "status": "ok",
        "message": "Server is running"
    }))
}

async fn ai_chat(req: web::Json<AIChatRequest>) -> impl Responder {
    // Validate education level
    let level_response = match req.level.to_lowercase().as_str() {
        "ordinary" => "GCE O Level",
        "advanced" => "GCE A Level",
        _ => return HttpResponse::BadRequest().json(serde_json::json!({
            "error": "Currently only supporting GCE O Level and A Level"
        }))
    };

    // Find subject info
    let gce_subjects = init_gce_subjects();
    let subject_info = gce_subjects.iter().find(|s| 
        s.name.to_lowercase() == req.subject.to_lowercase() || 
        s.code.to_lowercase() == req.subject.to_lowercase()
    );

    let response = match subject_info {
        Some(info) => {
            let base_response = match info.code.as_str() {
                "0710" => {
                    let mut years_info = String::new();
                    for year in &info.years {
                        years_info.push_str(&format!("\n{}{}:\n", 
                            year.session,
                            year.year
                        ));
                        for paper in &year.papers {
                            years_info.push_str(&format!("- {}\n", paper.name));
                        }
                    }
                    format!(
                        "For GCE A Level Biology ({}): {}\n\nExamination Structure:\n\n- Paper 1: Theory\n- Paper 2: Structured Questions\n- Paper 3: Practical\n\nAvailable Papers:{}",
                        info.code, info.name, years_info
                    )
                },
                "0505" => format!(
                    "For GCE O Level Accounting ({}): {}\n\nThis subject follows both OHADA and IAS/IFRS approaches. Key points:\n\n- Paper 1: 50 MCQs (40% weighting, 1h30)\n- Paper 2: 8 questions (60% weighting, 3h)\n  - Section A: OHADA Approach (Choose 3/5 questions)\n  - Section B: IAS/IFRS Approach (Choose 2/3 questions)",
                    info.code, info.name
                ),
                "0510" => format!(
                    "For GCE O Level Biology ({}): {}\n\nThe examination structure:\n\n- Paper 1: 50 MCQs covering the whole syllabus\n- Paper 2: 7 essay questions\n  - Section A: 3 compulsory questions\n  - Section B: Choose 2 from 4 questions",
                    info.code, info.name
                ),
                "0515" => format!(
                    "For GCE O Level Chemistry ({}): {}\n\nExamination format:\n\n- Paper 1: 50 MCQs\n- Paper 2: 10 questions in 3 sections\n  - Section A: Theory\n  - Section B: Alternative to Practical (compulsory)\n  - Section C: Essay questions",
                    info.code, info.name
                ),
                _ => format!(
                    "For GCE {} ({}): {}\n\nThis subject follows the MINESEC approved syllabus. Please refer to the official GCE Board guidelines for examination structure.",
                    level_response, info.name, info.code
                )
            };
            format!("{}

Your question: {}", base_response, req.question)
        },
        None => format!(
            "Subject not found in the GCE O Level curriculum. Available subjects include Accounting (0505), Biology (0510), Chemistry (0515), etc. Please specify a valid subject code or name."
        )
    };

    HttpResponse::Ok().json(serde_json::json!({
        "answer": response,
        "confidence": 0.95,
        "sources": [
            "GCE Board Syllabus 2023",
            "MINESEC Official Guidelines",
            "GCE O Level Past Questions"
        ],
        "context": {
            "curriculum": "Cameroon GCE",
            "level": level_response,
            "examining_board": "Cameroon GCE Board",
            "subject_info": subject_info
        }
    }))
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // Load environment variables
    dotenv::dotenv().ok();

    // Get configuration from environment
    let port = env::var("PORT")
        .unwrap_or_else(|_| "8080".to_string())
        .parse::<u16>()
        .expect("PORT must be a number");

    let frontend_url =
        env::var("FRONTEND_URL").unwrap_or_else(|_| "http://localhost:3000".to_string());

    println!("Starting server at http://localhost:{}", port);
    println!("Frontend URL: {}", frontend_url);

    HttpServer::new(move || {
        // Configure CORS
        let cors = Cors::default()
            .allowed_origin(&frontend_url)
            .allowed_methods(vec!["GET", "POST", "PUT", "DELETE", "OPTIONS"])
            .allowed_headers(vec![
                actix_web::http::header::AUTHORIZATION,
                actix_web::http::header::ACCEPT,
                actix_web::http::header::CONTENT_TYPE,
            ])
            .max_age(3600);

        App::new()
            .wrap(cors)
            .route("/health", web::get().to(health_check))
            .service(
                web::scope("/api")
                    .route("/ai/chat", web::post().to(ai_chat))
            )
    })
    .bind(("0.0.0.0", port))?
    .run()
    .await
}
