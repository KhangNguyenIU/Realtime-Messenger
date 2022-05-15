import React, { useEffect, useRef, useState } from 'react';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { Tooltip } from '@mui/material';
import useEventListener from 'hooks/useEventListener';
import useWindowSize from 'hooks/useWindowSize';
/**
 * @author
 * @function MessageText
 **/

export const MessageText = ({ message,handleOpenDialog,setForwardMessage }) => {
  const messageRef = useRef(null);
  const [isOpenTool, setIsonOpenTool] = useState(false);
  const [tooltipPlace, setTooltipPlace] = useState('bottom');
  const { height: windowHeight } = useWindowSize();

  const handleClick = () => {
    handleOpenDialog()
    setForwardMessage(message.message)
  };

  const handleMouseEnter = () => {
    setIsonOpenTool(true);
    if (messageRef.current) {
      if (
        windowHeight - messageRef.current.getBoundingClientRect().bottom <
        150
      ) {
        setTooltipPlace('top');
      } else {
        setTooltipPlace('bottom');
      }
    }
  };

  return (
    <div
      className="message-content"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsonOpenTool(false)}
    >
      <div className="message-owner-avatar">
        <img src={message.postedBy.avatar} alt="user avatar" />
      </div>

      <div className="message">
        <div className="message-content">{message.message}</div>
      </div>

      <div
        className="message-forward"
        ref={messageRef}
        onClick={handleClick}
        hidden
      >
        {isOpenTool && (
          <Tooltip title="Forward" placement={tooltipPlace}>
            <ArrowCircleLeftIcon />
          </Tooltip>
        )}
      </div>
    </div>
  );
};
