/**
 * API configuration and endpoints
 */

// Base URL for the API
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

// API endpoints
export const API_ENDPOINTS = {
    // AI endpoints
    AI_CHAT: '/ai/chat',
    AI_RECOMMENDATIONS: '/ai/recommendations',
    AI_PRACTICE: '/ai/practice',
    
    // Curriculum endpoints
    CURRICULUM: '/curriculum',
    SUBJECTS: '/subjects',
    TOPICS: '/topics',
    VIDEOS: '/videos',
    
    // Past questions endpoints
    PAST_QUESTIONS: '/past-questions',
    
    // User endpoints
    AUTH: '/auth',
    USERS: '/users',
    PROFILE: '/profile'
}; 