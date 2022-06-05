import React, { useEffect, useMemo, useRef, useState } from 'react';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { Avatar, Tooltip } from '@mui/material';
import useWindowSize from 'hooks/useWindowSize';
import { TYPE_TEXT } from 'constants';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useSelector } from 'react-redux';
import moment from 'moment';
/**
 * @author
 * @function MessageText
 **/

export const MessageText = ({
  message,
  handleOpenDialog,
  setForwardMessage,
  isMyMessage,
}) => {
  const messageRef = useRef(null);
  const [isOpenTool, setIsonOpenTool] = useState(false);
  const [tooltipPlace, setTooltipPlace] = useState('bottom');
  const { height: windowHeight } = useWindowSize();
  const currentRoom = useSelector((state) => state.currentRoom);
  console.log('fropm now', moment());
  //   console.log({message})
  const prefix = useMemo(
    () => (isMyMessage ? 'is-my-message' : ' '),
    [isMyMessage]
  );
  const classes = useMemo(() => {
    return {
      messageContent: 'message-content ' + prefix,
      messagePart: 'message-part-dir ' + prefix,
      messageText:
        'message-text ' +
        prefix +
        (message?.isDeleted ? ' puff-in-center' : ''),
      messageForwardButton: 'message-forward ' + prefix,
      messageImage: 'message-image ' + prefix,
    };
  }, [isMyMessage, message]);

  //Click forward button
  const handleClick = () => {
    handleOpenDialog();
    setForwardMessage({ message: message.message, type: message.type });
  };

  //Mouse move over the message then appear the forward button
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
      className={classes.messageContent}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsonOpenTool(false)}
    >
      <div className={classes.messagePart}>
        {!isMyMessage && (
          <div className="message-owner-avatar">
            <Avatar src={message.postedBy.avatar} alt="user avatar" />
          </div>
        )}

        <div className="message">
          {/* <div className={classes.messageText}></div> */}
          {message.type === TYPE_TEXT ? (
            <div className={classes.messageText}>{message.message}</div>
          ) : (
            <div className={classes.messageImage}>
              <img src={message.message} alt="message" />
            </div>
          )}
        </div>
      </div>
      {currentRoom?.autoDelete && (
        <div className='count-down'>
          <CountDown time={currentRoom.duration / 1000} />
          <AccessTimeIcon sx={{ color: 'white',ml:'.4rem' }} />
        </div>
      )}
      <div
        className={classes.messageForwardButton}
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

const CountDown = ({ time }) => {
  const [count, setCount] = useState(time);
  console.log({ count });
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count - 1);
    }, 1000);
    if (count === 0) {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  });
  return <span >{count}</span>;
};
