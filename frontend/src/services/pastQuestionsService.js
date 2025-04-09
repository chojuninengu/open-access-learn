import axios from 'axios';
import { API_CONFIG } from '../config/api';

export const pastQuestionsService = {
    // Fetch past questions based on filters
    async getPastQuestions(level, subject, year) {
        try {
            // In a real implementation, this would call the backend API
            // For now, we'll return mock data
            const mockQuestions = {
                'biology-o-2023': [
                    {
                        id: 'bio-2023-1',
                        question: 'Explain the process of photosynthesis and its importance in the ecosystem.',
                        answer: 'Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize foods with carbon dioxide and water. It is important because it produces oxygen and provides energy for the food chain.',
                        marks: 10
                    },
                    {
                        id: 'bio-2023-2',
                        question: 'Describe the structure and function of the human heart.',
                        answer: 'The human heart is a muscular organ that pumps blood throughout the body. It has four chambers: two atria and two ventricles. The right side pumps blood to the lungs, while the left side pumps blood to the rest of the body.',
                        marks: 8
                    }
                ],
                'math-o-2023': [
                    {
                        id: 'math-2023-1',
                        question: 'Solve the quadratic equation: x² - 5x + 6 = 0',
                        answer: 'The solutions are x = 2 and x = 3. This can be found by factoring: (x-2)(x-3) = 0',
                        marks: 5
                    },
                    {
                        id: 'math-2023-2',
                        question: 'Calculate the area of a circle with radius 7cm.',
                        answer: 'Area = πr² = π(7)² = 49π cm² ≈ 153.94 cm²',
                        marks: 4
                    }
                ]
            };

            const key = `${subject}-${level}-${year}`;
            return mockQuestions[key] || [];
        } catch (error) {
            console.error('Error fetching past questions:', error);
            throw error;
        }
    },

    // Get available years for a subject and level
    async getAvailableYears(level, subject) {
        try {
            // In a real implementation, this would call the backend API
            return Array.from({ length: 15 }, (_, i) => 2023 - i);
        } catch (error) {
            console.error('Error fetching available years:', error);
            throw error;
        }
    },

    // Get available subjects for a level
    async getAvailableSubjects(level) {
        try {
            // In a real implementation, this would call the backend API
            const subjects = {
                ordinary: [
                    'Mathematics',
                    'Physics',
                    'Chemistry',
                    'Biology',
                    'English Language',
                    'French Language',
                    'History',
                    'Geography',
                    'Economics',
                    'Accounting',
                    'Commerce',
                    'Computer Science'
                ],
                advanced: [
                    'Mathematics',
                    'Physics',
                    'Chemistry',
                    'Biology',
                    'English Literature',
                    'French Literature',
                    'History',
                    'Geography',
                    'Economics',
                    'Accounting',
                    'Commerce',
                    'Computer Science'
                ]
            };
            return subjects[level] || [];
        } catch (error) {
            console.error('Error fetching available subjects:', error);
            throw error;
        }
    }
}; 