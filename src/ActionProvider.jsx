import React from 'react';
import { axiosInstance } from './api';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const handleUserMessage = async (message) => {
    try {
      const response = await axiosInstance.post('/query', { query: message });
      const botResponse = response.data.result;
      setState((prevState) => ({
        ...prevState,
        messages: [...prevState.messages, createChatBotMessage(botResponse)],
      }));
    } catch (error) {
      console.error('Error handling user message:', error);
      setState((prevState) => ({
        ...prevState,
        messages: [...prevState.messages, createChatBotMessage('Sorry, an error occurred while processing your request.')],
      }));
    }
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleUserMessage,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;