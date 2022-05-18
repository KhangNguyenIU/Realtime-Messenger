import React, { useEffect, useRef } from 'react';
import { Message } from './MessageText';
import { TypingLoadingMessage } from './MessageText/TypingLoadingMessage';

/**
 * @author
 * @function ChatBoxContent
 **/

export const ChatBoxContent = ({ messages, isTypingList, handleOpenDialog ,setForwardMessage}) => {
  const chatBoxRef = useRef(null);


  useEffect(() => {
    chatBoxRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTypingList]);

  return (
    <React.Fragment>
      <div className="chatbox-content">

        {!!messages &&
          messages.map((message, index) => (
            <Message 
            key={index}
             message={message} 
             handleOpenDialog={handleOpenDialog} 
             setForwardMessage={setForwardMessage}
             />
          ))}
    
        <div ref={chatBoxRef} >
            {
                !!isTypingList.length && ( <TypingLoadingMessage isTypingList={isTypingList}/>)
            }
        </div>
      </div>
    </React.Fragment>
  );
};
