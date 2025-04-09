import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { curriculumService } from '../services/curriculumService';

const Curriculum = () => {
    const { t } = useTranslation();
    const [level, setLevel] = useState('');
    const [subject, setSubject] = useState('');
    const [subjects, setSubjects] = useState([]);
    const [topics, setTopics] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [videos, setVideos] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch subjects when level changes
    useEffect(() => {
        if (level) {
            setLoading(true);
            curriculumService.getSubjectsByLevel(level)
                .then(data => {
                    setSubjects(data);
                    setError(null);
                })
                .catch(err => {
                    setError(t('error.fetching_subjects'));
                    console.error(err);
                })
                .finally(() => setLoading(false));
        }
    }, [level, t]);

    // Fetch topics when subject changes
    useEffect(() => {
        if (level && subject) {
            setLoading(true);
            curriculumService.getTopicsBySubject(level, subject)
                .then(data => {
                    setTopics(data);
                    setError(null);
                })
                .catch(err => {
                    setError(t('error.fetching_topics'));
                    console.error(err);
                })
                .finally(() => setLoading(false));
        }
    }, [level, subject, t]);

    // Fetch videos when topic is selected
    useEffect(() => {
        if (selectedTopic) {
            setLoading(true);
            curriculumService.getRecommendedVideos(selectedTopic.name, level)
                .then(data => {
                    setVideos(data);
                    setError(null);
                    // Select the first video by default
                    if (data.length > 0) {
                        setSelectedVideo(data[0]);
                    }
                })
                .catch(err => {
                    setError(t('error.fetching_videos'));
                    console.error(err);
                })
                .finally(() => setLoading(false));
        }
    }, [selectedTopic, level, t]);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">{t('curriculum.title')}</h1>
            
            {/* Level and Subject Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('curriculum.select_level')}
                    </label>
                    <select
                        className="w-full p-2 border rounded"
                        value={level}
                        onChange={(e) => setLevel(e.target.value)}
                    >
                        <option value="">{t('curriculum.select_level')}</option>
                        <option value="ordinary">{t('curriculum.ordinary_level')}</option>
                        <option value="advanced">{t('curriculum.advanced_level')}</option>
                    </select>
                </div>

                {level && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t('curriculum.select_subject')}
                        </label>
                        <select
                            className="w-full p-2 border rounded"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
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
                                    className={`p-4 border rounded cursor-pointer ${
                                        selectedTopic?.id === topic.id ? 'bg-blue-50 border-blue-500' : ''
                                    }`}
                                    onClick={() => setSelectedTopic(topic)}
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
                                <div className="relative pb-[56.25%] h-0">
                                    <iframe
                                        className="absolute top-0 left-0 w-full h-full"
                                        src={selectedVideo.embedUrl}
                                        title={selectedVideo.title}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                                <div className="mt-4">
                                    <h3 className="text-lg font-medium">{selectedVideo.title}</h3>
                                    <p className="text-sm text-gray-600">{selectedVideo.channelTitle}</p>
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
                                    className={`flex gap-4 p-3 border rounded cursor-pointer ${
                                        selectedVideo?.id === video.id ? 'bg-blue-50 border-blue-500' : ''
                                    }`}
                                    onClick={() => setSelectedVideo(video)}
                                >
                                    <img
                                        src={video.thumbnail}
                                        alt={video.title}
                                        className="w-32 h-20 object-cover rounded"
                                    />
                                    <div>
                                        <h3 className="font-medium">{video.title}</h3>
                                        <p className="text-sm text-gray-600">{video.channelTitle}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Loading State */}
            {loading && (
                <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            )}
        </div>
    );
};

export default Curriculum; 