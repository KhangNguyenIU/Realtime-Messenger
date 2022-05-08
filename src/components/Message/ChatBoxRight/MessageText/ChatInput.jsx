import { IconButton } from '@mui/material';
import React from 'react';
import SendIcon from '@mui/icons-material/Send';

/**
 * @author
 * @function ChatInput
 **/

export const ChatInput = ({ textInput, setTextInput, handleSendMessage }) => {
    const handleChangeInput = (e) => {
      setTextInput(e.target.value);
    };

  return (
    <React.Fragment>
      <div className="chatbox-input">
        <input
          type="text"
          value={textInput}
          className="message-input"
          //   onChange={handleChangeInput}
          onChange={handleChangeInput}
        />
        <IconButton onClick={handleSendMessage}>
          <SendIcon color="secondary" />
        </IconButton>
      </div>
    </React.Fragment>
  );
};
