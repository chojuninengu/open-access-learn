export const mockData = {
    subjects: {
        ordinary: [
            { id: 'math-o', name: 'Mathematics' },
            { id: 'physics-o', name: 'Physics' },
            { id: 'chemistry-o', name: 'Chemistry' },
            { id: 'biology-o', name: 'Biology' },
            { id: 'english-o', name: 'English Language' },
            { id: 'french-o', name: 'French Language' },
            { id: 'history-o', name: 'History' },
            { id: 'geography-o', name: 'Geography' }
        ],
        advanced: [
            { id: 'math-a', name: 'Mathematics' },
            { id: 'physics-a', name: 'Physics' },
            { id: 'chemistry-a', name: 'Chemistry' },
            { id: 'biology-a', name: 'Biology' },
            { id: 'english-a', name: 'English Literature' },
            { id: 'french-a', name: 'French Literature' },
            { id: 'history-a', name: 'History' },
            { id: 'geography-a', name: 'Geography' }
        ]
    },
    topics: {
        'math-o': [
            { id: 'math-o-1', name: 'Algebra', description: 'Basic algebraic operations and equations' },
            { id: 'math-o-2', name: 'Geometry', description: 'Plane geometry and spatial relationships' },
            { id: 'math-o-3', name: 'Statistics', description: 'Data analysis and probability' }
        ],
        'physics-o': [
            { id: 'physics-o-1', name: 'Mechanics', description: 'Forces and motion' },
            { id: 'physics-o-2', name: 'Electricity', description: 'Electric circuits and magnetism' },
            { id: 'physics-o-3', name: 'Waves', description: 'Sound and light waves' }
        ],
        // Add more topics for other subjects as needed
    }
}; 