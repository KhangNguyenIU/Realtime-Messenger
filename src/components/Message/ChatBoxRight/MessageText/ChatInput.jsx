import { IconButton } from '@mui/material';
import React from 'react';
import SendIcon from '@mui/icons-material/Send';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import ImageIcon from '@mui/icons-material/Image';
import { EmojiEmotions } from '@mui/icons-material';
import { Socket } from 'socket.io-client';
import { useSelector } from 'react-redux';
/**
 * @author
 * @function ChatInput
 **/

export const ChatInput = ({ textInput, setTextInput, handleSendMessage,groupInfo,socket }) => {
    const user = useSelector((state) => state.auth.user);
    const handleChangeInput = (e) => {
      setTextInput(e.target.value);
      
      if (socket){
          if(e.target.value.length > 0){
            socket.emit('user-typing',{chatRoomId :groupInfo._id, user:user});
          }
          else{
            socket.emit('user-stop-typing',{chatRoomId :groupInfo._id, user:user});
          }
      }
    };

  return (
    <React.Fragment>
      <div className="chatbox-input">
          <div className='chat-input-tool'>
            <AddCircleOutlinedIcon/>
            <ImageIcon/>
            <EmojiEmotions/>
          </div>
        <input
          type="text"
          value={textInput}
          className="message-input"
          onChange={handleChangeInput}
          placeholder="Aa"
        />
        <IconButton onClick={handleSendMessage}>
          <SendIcon color="secondary" />
        </IconButton>
      </div>
    </React.Fragment>
  );
};
