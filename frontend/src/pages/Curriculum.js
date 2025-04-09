import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { curriculumService } from '../services/curriculumService';
import LoadingSpinner from '../components/LoadingSpinner';
import RetryButton from '../components/RetryButton';

/**
 * Curriculum page component that displays educational content and videos.
 * @component
 * @returns {JSX.Element} The Curriculum page component
 */
const Curriculum = () => {
    const { t } = useTranslation();
    
    // State management
    const [level, setLevel] = useState('');
    const [subject, setSubject] = useState('');
    const [subjects, setSubjects] = useState([]);
    const [topics, setTopics] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [videos, setVideos] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [videoLoading, setVideoLoading] = useState(false);
    const [videoError, setVideoError] = useState(null);

    // Fetch subjects when level changes
    useEffect(() => {
        const fetchSubjects = async () => {
            if (!level) return;
            
            setLoading(true);
            try {
                const data = await curriculumService.getSubjectsByLevel(level);
                setSubjects(data);
                setError(null);
            } catch (err) {
                setError(t('error.fetching_subjects'));
                console.error('Error fetching subjects:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchSubjects();
    }, [level, t]);

    // Fetch topics when subject changes
    useEffect(() => {
        const fetchTopics = async () => {
            if (!level || !subject) return;
            
            setLoading(true);
            try {
                const data = await curriculumService.getTopicsBySubject(level, subject);
                setTopics(data);
                setError(null);
            } catch (err) {
                setError(t('error.fetching_topics'));
                console.error('Error fetching topics:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchTopics();
    }, [level, subject, t]);

    // Fetch videos when topic is selected
    useEffect(() => {
        const fetchVideos = async () => {
            if (!selectedTopic) return;
            
            setLoading(true);
            try {
                const data = await curriculumService.getRecommendedVideos(selectedTopic.name, level);
                setVideos(data);
                setError(null);
                if (data.length > 0) {
                    setSelectedVideo(data[0]);
                }
            } catch (err) {
                setError(t('error.fetching_videos'));
                console.error('Error fetching videos:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, [selectedTopic, level, t]);

    // Event handlers
    const handleLevelChange = (e) => {
        setLevel(e.target.value);
        setSubject('');
        setSelectedTopic(null);
        setSelectedVideo(null);
    };

    const handleSubjectChange = (e) => {
        setSubject(e.target.value);
        setSelectedTopic(null);
        setSelectedVideo(null);
    };

    const handleTopicSelect = (topic) => {
        setSelectedTopic(topic);
    };

    const handleVideoSelect = (video) => {
        setVideoLoading(true);
        setVideoError(null);
        setSelectedVideo(video);
        
        // Clear loading state after a short delay to ensure the iframe has time to load
        const loadingTimer = setTimeout(() => {
            setVideoLoading(false);
        }, 1000);

        // Cleanup timer on unmount or when selecting a new video
        return () => clearTimeout(loadingTimer);
    };

    const handleRetry = () => {
        if (selectedTopic) {
            setSelectedTopic(null);
            setSelectedTopic(selectedTopic);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">{t('curriculum.title')}</h1>
            
            {/* Level and Subject Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                    <label 
                        htmlFor="level-select"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        {t('curriculum.select_level')}
                    </label>
                    <select
                        id="level-select"
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={level}
                        onChange={handleLevelChange}
                    >
                        <option value="">{t('curriculum.select_level')}</option>
                        <option value="ordinary">{t('curriculum.ordinary_level')}</option>
                        <option value="advanced">{t('curriculum.advanced_level')}</option>
                    </select>
                </div>

                {level && (
                    <div>
                        <label 
                            htmlFor="subject-select"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            {t('curriculum.select_subject')}
                        </label>
                        <select
                            id="subject-select"
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={subject}
                            onChange={handleSubjectChange}
                        >
                            <option value="">{t('curriculum.select_subject')}</option>
                            {subjects.map((sub) => (
                                <option key={sub.id} value={sub.id}>
                                    {sub.name}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
            </div>

            {/* Topics and Video Player Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Topics List */}
                {subject && (
                    <div className="lg:col-span-1">
                        <h2 className="text-xl font-semibold mb-4">{t('curriculum.topics')}</h2>
                        <div className="space-y-2">
                            {topics.map((topic) => (
                                <div
                                    key={topic.id}
                                    className={`p-4 border rounded cursor-pointer transition-colors
                                        ${selectedTopic?.id === topic.id 
                                            ? 'bg-blue-50 border-blue-500' 
                                            : 'hover:bg-gray-50'}`}
                                    onClick={() => handleTopicSelect(topic)}
                                >
                                    <h3 className="font-medium">{topic.name}</h3>
                                    <p className="text-sm text-gray-600">{topic.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Video Player and List */}
                {selectedTopic && (
                    <div className="lg:col-span-2">
                        {/* Video Player */}
                        {selectedVideo && (
                            <div className="mb-6">
                                <div className="relative pb-[56.25%] h-0 bg-gray-100 rounded-lg overflow-hidden">
                                    {videoLoading ? (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <LoadingSpinner size="md" />
                                        </div>
                                    ) : videoError ? (
                                        <div className="absolute inset-0 flex items-center justify-center bg-red-50">
                                            <div className="text-center">
                                                <p className="text-red-600 mb-2">{t('error.video_load')}</p>
                                                <RetryButton onClick={() => handleVideoSelect(selectedVideo)} />
                                            </div>
                                        </div>
                                    ) : (
                                        <iframe
                                            className="absolute top-0 left-0 w-full h-full"
                                            src={selectedVideo.embedUrl}
                                            title={selectedVideo.title}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            onLoad={() => setVideoLoading(false)}
                                            onError={() => {
                                                setVideoError(true);
                                                setVideoLoading(false);
                                            }}
                                        />
                                    )}
                                </div>
                                <div className="mt-4">
                                    <h3 className="text-lg font-medium">{selectedVideo.title}</h3>
                                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                                        <p>{selectedVideo.channelTitle}</p>
                                        {selectedVideo.duration && (
                                            <span>• {selectedVideo.duration}</span>
                                        )}
                                        {selectedVideo.viewCount && (
                                            <span>• {selectedVideo.viewCount}</span>
                                        )}
                                    </div>
                                    <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                                        {selectedVideo.description}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Video List */}
                        <h2 className="text-xl font-semibold mb-4">
                            {t('curriculum.recommended_videos')} - {selectedTopic.name}
                        </h2>
                        <div className="space-y-4">
                            {videos.map((video) => (
                                <div
                                    key={video.id}
                                    className={`flex gap-4 p-3 border rounded cursor-pointer transition-colors
                                        ${selectedVideo?.id === video.id 
                                            ? 'bg-blue-50 border-blue-500' 
                                            : 'hover:bg-gray-50'}`}
                                    onClick={() => handleVideoSelect(video)}
                                >
                                    <div className="relative">
                                        <img
                                            src={video.thumbnail}
                                            alt={video.title}
                                            className="w-32 h-20 object-cover rounded"
                                        />
                                        {video.duration && (
                                            <span className="absolute bottom-1 right-1 bg-black bg-opacity-75 text-white text-xs px-1 rounded">
                                                {video.duration}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-medium truncate">{video.title}</h3>
                                        <p className="text-sm text-gray-600 truncate">{video.channelTitle}</p>
                                        {video.viewCount && (
                                            <p className="text-xs text-gray-500">{video.viewCount} views</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Loading State */}
            {loading && (
                <div className="text-center py-8">
                    <LoadingSpinner size="lg" />
                    <p className="mt-4 text-gray-600">{t('loading')}</p>
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded flex flex-col items-center">
                    <p className="mb-4">{error}</p>
                    <RetryButton onClick={handleRetry} />
                </div>
            )}
        </div>
    );
};

export default Curriculum; 