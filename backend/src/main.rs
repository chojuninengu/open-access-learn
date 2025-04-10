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
    papers: Vec<String>,
    sections: Vec<String>,
    years: Vec<ExamYear>,
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

const GCE_SUBJECTS: &[SubjectInfo] = &[
    SubjectInfo {
        code: "0710".to_string(),
        name: "BIOLOGY".to_string(),
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
            },
            ExamYear {
                year: "2024".to_string(),
                session: "Mock".to_string(),
                papers: vec![
                    ExamPaper { name: "NW Mock Paper 1".to_string(), paper_type: "Theory".to_string() },
                    ExamPaper { name: "NW Mock Paper 2".to_string(), paper_type: "Structured Questions".to_string() },
                    ExamPaper { name: "CASPA Mock Paper 1".to_string(), paper_type: "Theory".to_string() },
                    ExamPaper { name: "CASPA Mock Paper 2".to_string(), paper_type: "Structured Questions".to_string() },
                    ExamPaper { name: "CASPA Mock Paper 3".to_string(), paper_type: "Practical".to_string() },
                ],
            },
            ExamYear {
                year: "2023".to_string(),
                session: "June".to_string(),
                papers: vec![
                    ExamPaper { name: "Paper 1".to_string(), paper_type: "Theory".to_string() },
                    ExamPaper { name: "Paper 2".to_string(), paper_type: "Structured Questions".to_string() },
                    ExamPaper { name: "Paper 3".to_string(), paper_type: "Practical".to_string() },
                ],
            },
        ],
    },
    SubjectInfo {
        code: "0505".to_string(),
        name: "ACCOUNTING".to_string(),
        papers: vec!["Paper 1 (MCQ)".to_string(), "Paper 2 (Theory)".to_string()],
        sections: vec!["OHADA Approach".to_string(), "IAS/IFRS Approach".to_string()],
        years: vec![],
    },
    SubjectInfo {
        code: "0510".to_string(),
        name: "BIOLOGY".to_string(),
        papers: vec!["Paper 1 (MCQ)".to_string(), "Paper 2 (Theory)".to_string()],
        sections: vec!["Section A (Compulsory)".to_string(), "Section B (Choice)".to_string()],
        years: vec![],
    },
    SubjectInfo {
        code: "0515".to_string(),
        name: "CHEMISTRY".to_string(),
        papers: vec!["Paper 1 (MCQ)".to_string(), "Paper 2 (Theory)".to_string()],
        sections: vec!["Section A".to_string(), "Section B (Alternative to Practical)".to_string(), "Section C".to_string()],
        years: vec![],
    }
];

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
    let subject_info = GCE_SUBJECTS.iter().find(|s| 
        s.name.to_lowercase() == req.subject.to_lowercase() || 
        s.code.to_lowercase() == req.subject.to_lowercase()
    );

    let response = match subject_info {
        Some(info) => {
            match info.code.as_str() {
                "0505" => format!(
                    "For GCE O Level Accounting ({}): {}\n\nThis subject follows both OHADA and IAS/IFRS approaches. Key points:\n\n- Paper 1: 50 MCQs (40% weighting, 1h30)\n- Paper 2: 8 questions (60% weighting, 3h)\n  - Section A: OHADA Approach (Choose 3/5 questions)\n  - Section B: IAS/IFRS Approach (Choose 2/3 questions)\n\nYour question: {}",
                    info.code, info.name, req.question
                ),
                "0510" => format!(
                    "For GCE O Level Biology ({}): {}\n\nThe examination structure:\n\n- Paper 1: 50 MCQs covering the whole syllabus\n- Paper 2: 7 essay questions\n  - Section A: 3 compulsory questions\n  - Section B: Choose 2 from 4 questions\n\nYour question: {}",
                    info.code, info.name, req.question
                ),
                "0515" => format!(
                    "For GCE O Level Chemistry ({}): {}\n\nExamination format:\n\n- Paper 1: 50 MCQs\n- Paper 2: 10 questions in 3 sections\n  - Section A: Theory\n  - Section B: Alternative to Practical (compulsory)\n  - Section C: Essay questions\n\nYour question: {}",
                    info.code, info.name, req.question
                ),
                _ => format!(
                    "For GCE O Level {} ({}): {}\n\nThis subject follows the MINESEC approved syllabus. Please refer to the official GCE Board guidelines for examination structure.",
                    info.name, info.code, req.question
                )
            }
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
