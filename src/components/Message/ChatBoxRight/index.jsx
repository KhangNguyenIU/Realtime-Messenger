import useToggle from 'hooks/useToggle';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import messageService from 'services/message/message.service';
import { addObjectToUniqueArray } from 'utils';
import { ChatBoxContent } from './ChatBoxContent';
import { ChatBoxHeader } from './ChatBoxHeader';
import { ForwardMessageModal } from './ForwardMessageModal';
import { ChatInput } from './MessageText/ChatInput';
import whyDidYouRender from '@welldone-software/why-did-you-render';
import { TYPE_TEXT } from 'constants';
import { hideLoading, showLoading } from 'slices/Common/loading.slice';
import { LOADING_MESSAGE } from 'constants';
import { LOADING_FETCH_MESSAGES } from 'constants';

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
  const currentChat = useSelector((state) => state.currentRoom);
  const dispatch = useDispatch();

  const [textInput, setTextInput] = useState('');
  const [messageType, setMessageType] = useState(TYPE_TEXT);
  const [messages, setMessages] = useState(null);
  const [isTypingList, setIsTypingList] = useState([]);
  const [toggle, handleOpenToggle, handleCloseToggle] = useToggle();
  const [forwardMessage, setForwardMessage] = useState({});

  useEffect(() => {
    if (socket && groupInfo) {
      //user identidy
      socket.emit('identity', user._id);

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
        dispatch(showLoading({ type: LOADING_FETCH_MESSAGES }));
        const response = await messageService.getMessageFromChatroom(
          groupInfo._id
        );
        if(response){
            dispatch(hideLoading())
            setMessages(response.data.data);
        }
      } catch (error) {}
    }
  }, [groupInfo]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!textInput) return;

    let messagePacket = {
      chatRoomId: groupInfo._id,
      message: textInput,
      postedBy: user._id,
      type: messageType,
    };
    socket.emit('send-message', messagePacket);
    dispatch(showLoading({ type: LOADING_MESSAGE }));
    socket.emit('user-stop-typing', { chatRoomId: groupInfo._id, user: user });
    setMessageType(TYPE_TEXT);
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
        setMessages={setMessages}
      />

      <ChatInput
        textInput={textInput}
        setTextInput={setTextInput}
        handleSendMessage={handleSendMessage}
        socket={socket}
        groupInfo={groupInfo}
        setMessageType={setMessageType}
        messageType={messageType}
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
