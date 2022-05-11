import React from 'react';

/**
 * @author
 * @function TypingLoadingMessage
 **/

export const TypingLoadingMessage = (props) => {
  return (
    <div className="message-content">
      <div className='message-typing-wrapper'>
        <div className="message-typing">
          <div className="dot-flashing"></div>
        </div>
      </div>
    </div>
  );
};
