import React, { useState } from 'react';
import "./Dashboard.css";
import Chatbot from 'react-chatbot-kit';
import config from './config';
import MessageParser from './MessageParser';
import ActionProvider from './ActionProvider'; // Import the ActionProvider class directly
import 'react-chatbot-kit/build/main.css';
import { axiosInstance } from './api';

const Dashboard = () => {
    const [showSummary, setShowSummary] = useState(false);
    const [showChatbot, setShowChatbot] = useState(false);
    const [initialized, setInitialized] = useState(false);
    const [videoUrl, setVideoUrl] = useState('');
    const [summaryText, setSummaryText] = useState('');

    axiosInstance.interceptors.request.use(
        (config) => {
          const accessToken = localStorage.getItem('access_token');
          if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
          }
          return config;
        },
        (error) => Promise.reject(error)
      );

    const handleChatbotToggle = async () => {
        if (!initialized) {
            try {
                await axiosInstance.get('/generate');
                setInitialized(true);
            } catch (error) {
                console.error('Error generating chatbot:', error);
            }
        }
        setShowChatbot(!showChatbot);
        setShowSummary(false); // Ensure summary textbox is hidden
    };

    const handleSummarizeToggle = () => {
        setShowSummary(!showSummary);
        setShowChatbot(false); // Ensure chatbot is hidden
        if (!showSummary) {
            handleSummarize(); // Call the handleSummarize function when toggling the summary textbox
        }
    };

    const handleLogout = () => {
        // Perform logout logic here (e.g., clear session)
        console.log("Logout clicked");
        localStorage.removeItem('access_token');
        // Redirect to the login page
        window.location.href = '/'; // Navigate to the root path (Login page)
    };

    const handleAddData = async () => {
        try {
          await axiosInstance.post('/addData', { url: videoUrl });
          setVideoUrl('');
          // Handle success
        } catch (error) {
          console.error('Error adding data:', error);
          // Handle error
        }
      };

      const handleRemoveData = async () => {
        try {
          await axiosInstance.post('/removeData');
          // Handle success
        } catch (error) {
          console.error('Error removing data:', error);
          // Handle error
        }
      };

      const handleSummarize = async () => {
        try {
          const response = await axiosInstance.post('/summary', { url: videoUrl });
          const summary = response.data;
          setSummaryText(summary);
        } catch (error) {
          console.error('Error generating summary:', error);
          // Handle error
        }
      };

    return (
        <>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
            <div className="container">
                <h2>YouTube Video to Summary</h2>
                <br />
                <input
                    className="text-box"
                    placeholder="Enter the YouTube URL"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                />

                <div className="btn-style">
                    
                    <button onClick={handleAddData}>Add To Data</button>
                    <button onClick={handleRemoveData}>Delete</button>
                    <button onClick={handleSummarizeToggle}>Summarize</button>
                    <button onClick={handleChatbotToggle}>{showChatbot ? 'Close Chatbot' : 'Open Chatbot'}</button>
                </div>

                {showSummary && !showChatbot && (
                    <p className="main-content">
                        {summaryText}
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
