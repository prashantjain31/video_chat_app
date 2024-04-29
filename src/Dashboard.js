import React, { useState } from 'react';
import "./Dashboard.css";
import Chatbot from 'react-chatbot-kit';
import config from './config';
import MessageParser from './MessageParser';
import ActionProvider from './ActionProvider'; // Import the ActionProvider class directly
import 'react-chatbot-kit/build/main.css';

const Dashboard = () => {
    const [showSummary, setShowSummary] = useState(false);
    const [showChatbot, setShowChatbot] = useState(false);
    const [initialized, setInitialized] = useState(false);

    const handleChatbotToggle = () => {
        if (!initialized) {
            setInitialized(true);
        }
        setShowChatbot(!showChatbot);
        setShowSummary(false); // Ensure summary textbox is hidden
    };

    const handleSummarizeToggle = () => {
        setShowSummary(!showSummary);
        setShowChatbot(false); // Ensure chatbot is hidden
    };

    const handleLogout = () => {
        // Perform logout logic here (e.g., clear session)
        console.log("Logout clicked");
        // Redirect to the login page
        window.location.href = '/'; // Navigate to the root path (Login page)
    };

    return (
        <>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
            <div className="container">
                <h2>YouTube Video to Summary</h2>
                <br />
                <textarea className="text-box" placeholder="Enter the YouTube URL"></textarea>

                <div className="btn-style">
                    
                    <button>Add To Data</button>
                    <button>Delete</button>
                      <button onClick={handleSummarizeToggle}>Summarize</button>
                    <button onClick={handleChatbotToggle}>{showChatbot ? 'Close Chatbot' : 'Open Chatbot'}</button>
                </div>

                {showSummary && !showChatbot && (
                    <p className="main-content">
                        {/* Content for summary textbox goes here */}
                        This is the summary text box content.
                    </p>
                )}

                {showChatbot && !showSummary && ( 
                    <div className="chatbot-container">
                        <Chatbot
                            config={config}
                            messageParser={MessageParser}
                            actionProvider={ActionProvider}
                        />
                    </div>
                )}
            </div>
        </>
    );
};

export default Dashboard;
