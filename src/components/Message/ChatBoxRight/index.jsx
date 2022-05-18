import useToggle from 'hooks/useToggle';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import messageService from 'services/message/message.service';
import { addObjectToUniqueArray } from 'utils';
import { ChatBoxContent } from './ChatBoxContent';
import { ChatBoxHeader } from './ChatBoxHeader';
import { ForwardMessageModal } from './ForwardMessageModal';
import { ChatInput } from './MessageText/ChatInput';
import whyDidYouRender from '@welldone-software/why-did-you-render';

whyDidYouRender(React, {
  onlyLogs: true,
  titleColor: 'green',
  diffNameColor: 'darkturquoise',
});
/**
 * @author
 * @function ChatBoxRight
 **/

export const ChatBoxRight = React.memo(({ socket, groupInfo }) => {
    const user = useSelector((state) => state.auth.user);
    const [textInput, setTextInput] = useState('');
    const [messages, setMessages] = useState(null);
    const [isTypingList, setIsTypingList] = useState([]);
    const [toggle, handleOpenToggle, handleCloseToggle] = useToggle();
    const [forwardMessage, setForwardMessage] = useState('');
    
  useEffect(() => {
    if (socket && groupInfo) {
        //user identidy
        socket.emit('identity', user._id)

      //join room on connect
      socket.emit('joinRoom', groupInfo._id);

      //receive list of user who are typing
      socket.on('user-typing', (fields) => {
        const { user: typingUser, isTyping } = fields;
        // console.log("files",addObjectToUniqueArray(isTypingList, typingUser, isTyping))
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
    socket.emit('user-stop-typing',{chatRoomId :groupInfo._id, user:user});
    setTextInput('');
  };

  return (
    <React.Fragment>
      <ChatBoxHeader groupInfo={groupInfo} />

      <ChatBoxContent
        messages={messages}
        isTypingList={isTypingList}
        handleOpenDialog={handleOpenToggle}
        setForwardMessage={setForwardMessage}
        socket={socket}
        groupInfo={groupInfo}
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
        groupInfo={groupInfo}
      />
    </React.Fragment>
  );
});

ChatBoxRight.whyDidYouRender = true;
