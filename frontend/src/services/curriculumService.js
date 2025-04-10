import axios from 'axios';
import { mockData } from './mockData';

const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
const MINESEC_CHANNEL_ID = 'UCminesecdistancelearning1724';

export const curriculumService = {
    // Fetch curriculum data based on level and subject
    async getCurriculumData(level, subject) {
        try {
            // Simulating API delay
            await new Promise(resolve => setTimeout(resolve, 500));
            return mockData.topics[subject] || [];
        } catch (error) {
            console.error('Error fetching curriculum data:', error);
            throw error;
        }
    },

    // Get recommended YouTube videos for a specific topic
    async getRecommendedVideos(topic, level) {
        try {
            if (!YOUTUBE_API_KEY) {
                // Return mock video data if no API key is available
                return mockData.videos[topic] || [];
            }

            // Search across all of YouTube for educational content
            const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
                params: {
                    part: 'snippet',
                    q: `${topic} ${level} education tutorial lesson`,
                    type: 'video',
                    videoCategoryId: '27', // Education category
                    relevanceLanguage: 'en',
                    maxResults: 20,
                    order: 'relevance',
                    safeSearch: 'strict',
                    key: YOUTUBE_API_KEY
                }
            });

            // Get video statistics (views, duration) for all videos
            const videoIds = response.data.items.map(item => item.id.videoId).join(',');
            const statsResponse = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
                params: {
                    part: 'statistics,contentDetails',
                    id: videoIds,
                    key: YOUTUBE_API_KEY
                }
            });

            // Combine video data with statistics
            return response.data.items.map((item, index) => {
                const stats = statsResponse.data.items[index];
                const duration = stats?.contentDetails?.duration || 'N/A';
                const viewCount = stats?.statistics?.viewCount || '0';

                return {
                    id: item.id.videoId,
                    title: item.snippet.title,
                    description: item.snippet.description,
                    thumbnail: item.snippet.thumbnails.medium.url,
                    channelTitle: item.snippet.channelTitle,
                    embedUrl: `https://www.youtube.com/embed/${item.id.videoId}`,
                    duration: duration.replace('PT', '').toLowerCase(),
                    viewCount: `${parseInt(viewCount).toLocaleString()} views`,
                    publishedAt: new Date(item.snippet.publishedAt).toLocaleDateString()
                };
            });
        } catch (error) {
            console.error('Error fetching YouTube videos:', error);
            throw error;
        }
    },

    // Get all available subjects for a specific level
    async getSubjectsByLevel(level) {
        try {
            // Simulating API delay
            await new Promise(resolve => setTimeout(resolve, 500));
            return mockData.subjects[level] || [];
        } catch (error) {
            console.error('Error fetching subjects:', error);
            throw error;
        }
    },

    // Get curriculum topics for a specific subject and level
    async getTopicsBySubject(level, subject) {
        try {
            // Simulating API delay
            await new Promise(resolve => setTimeout(resolve, 500));
            return mockData.topics[subject] || [];
        } catch (error) {
            console.error('Error fetching topics:', error);
            throw error;
        }
    }
}; 