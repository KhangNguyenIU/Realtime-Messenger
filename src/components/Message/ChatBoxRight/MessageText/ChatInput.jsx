import React, { useEffect, useState } from 'react';

import { CircularProgress, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import ImageIcon from '@mui/icons-material/Image';
import { EmojiEmotions } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import Grow from '@mui/material/Grow';
import { TYPE_IMAGE } from 'constants';
import { TYPE_TEXT } from 'constants';
import { LOADING_MESSAGE } from 'constants';
/**
 * @author
 * @function ChatInput
 **/

export const ChatInput = ({
  textInput,
  setTextInput,
  handleSendMessage,
  groupInfo,
  socket,
  setMessageType,
  messageType,
}) => {
  const user = useSelector((state) => state.auth.user);
  const [fileInput, setFileInput] = useState('');
  const [previewSource, setPreviewSource] = useState('');
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);

  const onLoadImage = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    setFileInput(file);
    setMessageType(TYPE_IMAGE);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
      setTextInput(reader.result);
    };
  };

  const handleChangeInput = (e) => {
    setTextInput(e.target.value);

    if (socket) {
      if (e.target.value.length > 0) {
        socket.emit('user-typing', { chatRoomId: groupInfo._id, user: user });
      } else {
        socket.emit('user-stop-typing', {
          chatRoomId: groupInfo._id,
          user: user,
        });
      }
    }
  };

  const clearInput = () => {
    setTextInput('');
    setFileInput('');
    setPreviewSource('');
    setMessageType(TYPE_TEXT);
  };

  return (
    <React.Fragment>
      <div className="chatbox-input">
        <div className="chat-input-tool">
          <AddCircleOutlinedIcon />
          <label htmlFor="input-image">
            <ImageIcon />
          </label>
          <EmojiEmotions />
          <input
            type="file"
            accept="image/*"
            id="input-image"
            hidden
            onChange={onLoadImage}
          />
        </div>
        <div className="input-field">
          {!previewSource || messageType === TYPE_TEXT ? (
            <Grow in={messageType === TYPE_TEXT}>
              <input
                type="text"
                value={textInput}
                className="message-input"
                onChange={handleChangeInput}
                placeholder="Aa"
              />
            </Grow>
          ) : (
            <Grow in={!!previewSource && messageType === TYPE_IMAGE}>
              <div className="image-preview">
                <div className="image-preview-box">
                  <img src={previewSource || ''} alt="preview" />
                  <div className="close-icon">
                    <IconButton onClick={clearInput}>
                      <DoDisturbOnIcon sx={{ color: 'white' }} />
                    </IconButton>
                  </div>
                </div>
              </div>
            </Grow>
          )}
        </div>
        {loading.show && loading.type === LOADING_MESSAGE ? (
          <CircularProgress color="secondary" size={20} />
        ) : (
          <IconButton onClick={handleSendMessage}>
            <SendIcon color="secondary" />
          </IconButton>
        )}
      </div>
    </React.Fragment>
  );
};
