import axios from 'axios';

const CAMEROON_EDUCATION_API = 'https://api.cameroon-education.gov.cm'; // Replace with actual API endpoint
const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

export const curriculumService = {
    // Fetch curriculum data based on level and subject
    async getCurriculumData(level, subject) {
        try {
            const response = await axios.get(`${CAMEROON_EDUCATION_API}/curriculum`, {
                params: {
                    level,
                    subject
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching curriculum data:', error);
            throw error;
        }
    },

    // Get recommended YouTube videos for a specific topic
    async getRecommendedVideos(topic) {
        try {
            const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
                params: {
                    part: 'snippet',
                    q: `${topic} cameroon education`,
                    type: 'video',
                    maxResults: 5,
                    key: YOUTUBE_API_KEY
                }
            });
            return response.data.items.map(item => ({
                id: item.id.videoId,
                title: item.snippet.title,
                description: item.snippet.description,
                thumbnail: item.snippet.thumbnails.medium.url,
                channelTitle: item.snippet.channelTitle
            }));
        } catch (error) {
            console.error('Error fetching YouTube videos:', error);
            throw error;
        }
    },

    // Get all available subjects for a specific level
    async getSubjectsByLevel(level) {
        try {
            const response = await axios.get(`${CAMEROON_EDUCATION_API}/subjects`, {
                params: { level }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching subjects:', error);
            throw error;
        }
    },

    // Get curriculum topics for a specific subject and level
    async getTopicsBySubject(level, subject) {
        try {
            const response = await axios.get(`${CAMEROON_EDUCATION_API}/topics`, {
                params: { level, subject }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching topics:', error);
            throw error;
        }
    }
}; 