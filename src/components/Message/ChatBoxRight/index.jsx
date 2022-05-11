import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import messageService from 'services/message/message.service';
import { addObjectToUniqueArray } from 'utils';
import { ChatBoxContent } from './ChatBoxContent';
import { ChatBoxHeader } from './ChatBoxHeader';
import { ChatInput } from './MessageText/ChatInput';

/**
 * @author
 * @function ChatBoxRight
 **/

export const ChatBoxRight = ({ socket, groupInfo }) => {
  const user = useSelector((state) => state.auth.user);
  const [textInput, setTextInput] = useState('');
  const [messages, setMessages] = useState(null);
  const [isTypingList, setIsTypingList] = useState([]);

 console.log("typing", isTypingList)
  useEffect(() => {
    if (socket && groupInfo) {
        //join room on connect
      socket.emit('joinRoom', groupInfo._id);

      //receive list of user who are typing
      socket.on('user-typing', (fields) => {
        const { user: typingUser, isTyping } = fields;
        if (typingUser._id !== user._id) {
          setIsTypingList([
            ...addObjectToUniqueArray(isTypingList, typingUser, isTyping),
          ]);
        }
      });
    }
  }, [socket, groupInfo]);

  useEffect(() => {
    if (socket) {
      socket.on('recieve-message', (fields) => {
        const { chatRoomId, message } = fields;
        setMessages((state) => [...state, message]);
      });
    }
  }, [socket]);

  useEffect(() => {
    getMessage();
    setIsTypingList([]);
    //eslint-disable-next-line
  }, [groupInfo, setMessages]);

  const getMessage = useCallback(async () => {
    if (groupInfo) {
      try {
        const response = await messageService.getMessageFromChatroom(
          groupInfo._id
        );
        setMessages(response.data.data);
      } catch (error) {}
    }
  }, [groupInfo]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    let messagePacket = {
      chatRoomId: groupInfo._id,
      message: textInput,
      postedBy: user._id,
    };

    socket.emit('send-message', messagePacket);
    setTextInput('');
  };

  return (
    <React.Fragment>
      <ChatBoxHeader groupInfo={groupInfo} />

      <ChatBoxContent messages={messages}
      isTypingList={isTypingList}
      />

      <ChatInput
        textInput={textInput}
        setTextInput={setTextInput}
        handleSendMessage={handleSendMessage}
        socket={socket}
        groupInfo={groupInfo}
      />
    </React.Fragment>
  );
};
