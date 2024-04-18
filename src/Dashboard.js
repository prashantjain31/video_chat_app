import React, { useState } from 'react';
import "./Dashboard.css";
import ChatBot from 'react-simple-chatbot';

const App = () => {
    const [opened, setOpened] = useState(false);
    const [initialized, setInitialized] = useState(false); // New state to track initialization

    const steps = [
        {
            id: '1',
            message: 'Welcome to our website! How can I assist you today?',
            trigger: '2',
        },
        {
            id: '2',
            user: true,
            trigger: 'checkHi', // Check user input for "hi"
        },
        {
            id: 'checkHi',
            message: 'Hi!',
            trigger: '2', // Go back to user input step
            validator: (value) => {
                // Check if user input is "hi"
                if (value.toLowerCase().trim() === 'hi') {
                    return true; // If "hi", proceed to next step
                }
                return 'Please type "hi"'; // If not "hi", show message and stay on current step
            },
        },
        {
            id: '3',
            message: 'What\'s your problem?',
            end: true, // End the conversation after sending the message
        },
    ];

    const handleChatbotToggle = () => {
        if (!initialized) {
            setInitialized(true); // Set initialized to true when the chatbot is opened for the first time
        }
        setOpened(!opened);
    };

    return (
        <div className="container">
            <h2>YouTube Video to Summary</h2>
            <br />
            <p>A React hook that converts YouTube video to text and makes it available to your React components.</p>

            <textarea className="text-box" placeholder="Enter the YouTube URL"></textarea>

            <div className="btn-style">
                <button>Add To Data</button>
                <button>Delete</button>
                <button onClick={handleChatbotToggle}>{opened ? 'Close Chatbot' : 'Open Chatbot'}</button>
            </div>

            <p className="main-content">
                {/* Content goes here */}
            </p>

            <div className="middle-button">
                <button>Summarize</button>
            </div>

            {initialized && opened && (
                <div className="chatbot-container">
                    <ChatBot
                        steps={steps}
                        opened={opened}
                        handleEnd={handleChatbotToggle}
                    />
                </div>
            )}
        </div>
    );
};

export default App;
