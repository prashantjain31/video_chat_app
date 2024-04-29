// MessageParser.jsx

import React from 'react';

const MessageParser = ({ children, actions }) => {
    const parse = (message) => {
        // Use actions from the ActionProvider
        actions.someAction(); // Example usage
    };

    return (
        <div>
            {React.Children.map(children, (child) => {
                return React.cloneElement(child, {
                    parse: parse,
                    actions: actions,
                });
            })}
        </div>
    );
};

export default MessageParser;
