import React, { useState } from 'react';

const AIGenerator = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    const handleGenerate = () => {
        // Simulate AI content generation
        setOutput(`Generated content based on: ${input}`);
    };

    return (
        <div>
            <h1>AI Content Generator</h1>
            <input 
                type="text" 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                placeholder="Enter your prompt here"
            />
            <button onClick={handleGenerate}>Generate</button>
            <div>
                <h2>Generated Content:</h2>
                <p>{output}</p>
            </div>
        </div>
    );
};

export default AIGenerator;