import React from 'react';
import { useSelector } from 'react-redux';
import { MessageText } from './MessageText';

/**
 * @author
 * @function Message
 **/

export const Message = ({ message, handleOpenDialog, setForwardMessage }) => {
  const user = useSelector((state) => state.auth.user);
  const isMyMessage = message.postedBy._id === user._id;

  return (
    <React.Fragment>
      <MessageText
        message={message}
        handleOpenDialog={handleOpenDialog}
        setForwardMessage={setForwardMessage}
        isMyMessage={isMyMessage}
      />
    </React.Fragment>
  );
};
