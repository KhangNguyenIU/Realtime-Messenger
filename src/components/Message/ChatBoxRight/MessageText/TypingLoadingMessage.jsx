import React, { useEffect } from 'react';
import { detectWhoIsTyping } from 'utils';

/**
 * @author
 * @function TypingLoadingMessage
 **/

export const TypingLoadingMessage = ({isTypingList}) => {


  return (
    <React.Fragment>
      <div className="message-content is-typing">
        <div className="message-typing-wrapper">
          <div className="message-typing">
            <div className="dot-flashing"></div>
          </div>
          <p  className="is-typing-text" style={{color: 'white'}}>
          {detectWhoIsTyping(isTypingList)}
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};
