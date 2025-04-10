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
    // For now, return a mock response
    HttpResponse::Ok().json(serde_json::json!({
        "answer": format!("Here's what I know about {} for {} level: This is a sample response about the topic. The question was: {}", 
            req.subject, req.level, req.question),
        "confidence": 0.95,
        "sources": ["Sample Educational Resource"]
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
