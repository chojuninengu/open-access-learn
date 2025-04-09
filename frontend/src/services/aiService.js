import axios from 'axios';
import { API_BASE_URL } from './api';

/**
 * Service for handling AI interactions in the platform
 */
export const aiService = {
    /**
     * Get AI response for a student's question
     * @param {string} question - The student's question
     * @param {string} subject - The subject area
     * @param {string} level - The education level (ordinary/advanced)
     * @returns {Promise<Object>} AI response
     */
    async getAIResponse(question, subject, level) {
        try {
            const response = await axios.post(`${API_BASE_URL}/ai/chat`, {
                question,
                subject,
                level,
                context: {
                    platform: 'Open Access Learn',
                    curriculum: 'GCE'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error getting AI response:', error);
            throw error;
        }
    },

    /**
     * Get personalized learning recommendations
     * @param {string} subject - The subject area
     * @param {string} level - The education level
     * @param {Array<string>} topics - List of topics the student is studying
     * @returns {Promise<Object>} Learning recommendations
     */
    async getLearningRecommendations(subject, level, topics) {
        try {
            const response = await axios.post(`${API_BASE_URL}/ai/recommendations`, {
                subject,
                level,
                topics,
                preferences: {
                    learning_style: 'interactive',
                    difficulty_level: 'adaptive'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error getting learning recommendations:', error);
            throw error;
        }
    },

    /**
     * Get practice questions based on topic and difficulty
     * @param {string} topic - The specific topic
     * @param {string} difficulty - Difficulty level (easy/medium/hard)
     * @returns {Promise<Object>} Practice questions
     */
    async getPracticeQuestions(topic, difficulty) {
        try {
            const response = await axios.post(`${API_BASE_URL}/ai/practice`, {
                topic,
                difficulty,
                format: 'multiple_choice',
                count: 5
            });
            return response.data;
        } catch (error) {
            console.error('Error getting practice questions:', error);
            throw error;
        }
    }
}; 