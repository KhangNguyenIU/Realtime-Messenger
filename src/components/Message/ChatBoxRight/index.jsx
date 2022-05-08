import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import messageService from 'services/message/message.service';
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

  useEffect(() => {
    if (socket && groupInfo) {
      socket.emit('joinRoom', groupInfo._id);
    }
  }, [socket, groupInfo]);

  useEffect(() => {

    if (socket) {
      socket.on('recieve-message', (message) => {
        setMessages((state) => [...state, message]);
      });
    }
  }, [socket]);

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

  useEffect(() => {
    const getMessage = async () => {
      if (groupInfo) {
        try {
          const response = await messageService.getMessageFromChatroom(
            groupInfo._id
          );
          setMessages(response.data.data);
        } catch (error) {
          //   console.log(error);
        }
      }
    };

    getMessage();
  }, [groupInfo]);

  return (
    <React.Fragment>
      <ChatBoxHeader groupInfo={groupInfo} />

      <ChatBoxContent messages={messages} />

      <ChatInput
        textInput={textInput}
        setTextInput={setTextInput}
        handleSendMessage={handleSendMessage}
      />
    </React.Fragment>
  );
};
