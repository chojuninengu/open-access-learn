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
                return [
                    {
                        id: 'mock-1',
                        title: 'Sample Video 1',
                        description: 'This is a sample video about ' + topic,
                        thumbnail: 'https://via.placeholder.com/320x180.png',
                        channelTitle: 'MINESEC Distance Learning'
                    }
                ];
            }

            // First, get the channel's uploads playlist
            const channelResponse = await axios.get('https://www.googleapis.com/youtube/v3/channels', {
                params: {
                    part: 'contentDetails',
                    id: MINESEC_CHANNEL_ID,
                    key: YOUTUBE_API_KEY
                }
            });

            const uploadsPlaylistId = channelResponse.data.items[0].contentDetails.relatedPlaylists.uploads;

            // Then search within the channel's uploads
            const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
                params: {
                    part: 'snippet',
                    playlistId: uploadsPlaylistId,
                    q: `${topic} ${level} level`,
                    type: 'video',
                    maxResults: 10,
                    key: YOUTUBE_API_KEY
                }
            });

            return response.data.items.map(item => ({
                id: item.id.videoId,
                title: item.snippet.title,
                description: item.snippet.description,
                thumbnail: item.snippet.thumbnails.medium.url,
                channelTitle: item.snippet.channelTitle,
                embedUrl: `https://www.youtube.com/embed/${item.id.videoId}`
            }));
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