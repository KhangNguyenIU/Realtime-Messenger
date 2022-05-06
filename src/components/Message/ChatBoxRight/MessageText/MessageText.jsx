import React from 'react';

/**
 * @author
 * @function MessageText
 **/

export const MessageText = ({ message }) => {
  return (
    <div className="message-content">
      <div className="message-owner-avatar">
        <img src={message.postedBy.avatar} />
      </div>
      <div className="message">
          <div className='message-content'>
          {message.message}</div>
      </div>
    </div>
  );
};
