import React, { useEffect, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Message } from './MessageText';
import { TypingLoadingMessage } from './MessageText/TypingLoadingMessage';

/**
 * @author
 * @function ChatBoxContent
 **/

export const ChatBoxContent = ({
  messages,
  setMessages,
  isTypingList,
  handleOpenDialog,
  setForwardMessage,
  socket,
  groupInfo,
}) => {

  const chatBoxRef = useRef(null);
  const user = useSelector((state) => state.auth.user);
  //check if user has read the last message in the chat box
  const isReaded = useMemo(() => {
    if (!groupInfo?.messages[0]?.readByRecipients) return true;
    return groupInfo?.messages[0]?.readByRecipients?.find(
      (x) => x.readByUserId === user._id
    )
      ? true
      : false;
  }, [user, groupInfo]);

  useEffect(() => {
    // console.log({ isReaded }, groupInfo?.name);
    if (!isReaded && socket && user && groupInfo) {
      socket.emit('user-read-message', {
        user: user?._id,
        message: groupInfo?.messages[0]?._id,
      });
    }
  }, [socket, groupInfo, isReaded, user]);

  useEffect(() => {
    if (socket && messages) {
      socket.on('test-global', (data) => {
        handleAutoRemoveMessage(messages,data);
      });
    }
  }, [socket, messages]);

  useEffect(() => {
    chatBoxRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTypingList]);

  const handleAutoRemoveMessage = (messages=[],messageId) => {
    let temp = [...messages];
    let index = temp.find((x, index) => {
      if (x._id === messageId) {
        temp[index].message = 'This message has been deleted by the sender';
        temp[index].isDeleted = true;
      }
      return x._id === messageId;
    });
    if (index) {
      setMessages(temp);
    }
  };

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

        <div ref={chatBoxRef}>
          {!!isTypingList.length && (
            <TypingLoadingMessage isTypingList={isTypingList} />
          )}
        </div>
        
      </div>
    </React.Fragment>
  );
};
