import React, { useRef } from 'react';
import { Message } from './MessageText';

/**
 * @author
 * @function ChatBoxContent
 **/

export const ChatBoxContent = ({ messages }) => {
  const chatBoxRef = useRef(null);

  return (
    <React.Fragment>
      <div className="chatbox-content" ref={chatBoxRef}>
          {
              !!messages && messages.map((message, index) => (
                    <Message key={index} message={message} />
              ))
          }
      </div>
    </React.Fragment>
  );
};
