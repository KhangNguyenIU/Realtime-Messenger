import useEventListener from 'hooks/useEventListener';
import useToggle from 'hooks/useToggle';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import messageService from 'services/message/message.service';
import { addObjectToUniqueArray } from 'utils';
import { ChatBoxContent } from './ChatBoxContent';
import { ChatBoxHeader } from './ChatBoxHeader';
import { ForwardMessageModal } from './ForwardMessageModal';
import { ChatInput } from './MessageText/ChatInput';

/**
 * @author
 * @function ChatBoxRight
 **/

export const ChatBoxRight = ({ socket, groupInfo , chatRooms}) => {
  const user = useSelector((state) => state.auth.user);
  const [textInput, setTextInput] = useState('');
  const [messages, setMessages] = useState(null);
  const [isTypingList, setIsTypingList] = useState([]);
  const [toggle, handleOpenToggle, handleCloseToggle] = useToggle();
    const [forwardMessage , setForwardMessage] = useState("");

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
    // eslint-disable-next-line
  }, [socket, groupInfo]);

  useEffect(() => {
    if (socket) {
      socket.on('recieve-message', (fields) => {
        const { message } = fields;
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

      <ChatBoxContent
        messages={messages}
        isTypingList={isTypingList}
        handleOpenDialog={handleOpenToggle}
        chatRooms={chatRooms}
        setForwardMessage={setForwardMessage}
      />

      <ChatInput
        textInput={textInput}
        setTextInput={setTextInput}
        handleSendMessage={handleSendMessage}
        socket={socket}
        groupInfo={groupInfo}
      />

      <ForwardMessageModal
        openDialog={toggle}
        socket={socket}
        handleCloseDialog={handleCloseToggle}
        forwardMessage={forwardMessage}
        chatRooms={[...chatRooms.filter((room) => room._id !== groupInfo._id)]}
      />
    </React.Fragment>
  );
};
