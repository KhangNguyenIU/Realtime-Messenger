import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import messageService from 'services/message/message.service';

import { GroupMessageList } from './GroupChatLeft';
import { ChatBoxRight } from './ChatBoxRight';
import { ChatSummary } from './ChatSummary';

import { playSound } from 'slices/Common/sound.slice';
import { hideLoading } from 'slices/Common/loading.slice';
import { setChatroom } from 'slices/Chatroom/chatroom.slice';

import { NEW_MESSAGE_SOUND } from 'constants';

/**
 * @author
 * @function MessageComponent
 **/

export const MessageComponent = ({ socket }) => {
  const [chatRooms, setChatRooms] = useState([]);
  const [currentChatRoom, setCurrentChatRoom] = useState(null);
  const chatSummaryRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (socket) {
      socket.on('recieve-message', (data) => {
        console.log('recieved message', data);
        getChatRooms(false);
        dispatch(
          playSound({ sound: NEW_MESSAGE_SOUND, play: true, playInLoop: false })
        );
        dispatch(hideLoading());
      });

      socket.on('new-message-notify', (data) => {
        console.log('reaload');
        if (data.reload) {
          getChatRooms(false);
        }
      });

      socket.on('user-read-message', (data) => {
        if (data.reload) {
          getChatRooms(false);
        }
      });
    }
    //eslint-disable-next-line
  }, [socket, dispatch]);

  useEffect(() => {
    getChatRooms();
  }, []);

  const getChatRooms = async (neeedUpdateCurrentRoom = true) => {
    try {
      const response = await messageService.getChatRoomofUser();
      setChatRooms(response.data.chatrooms);
      neeedUpdateCurrentRoom && setCurrentChatRoom(response.data.chatrooms[0]);
      neeedUpdateCurrentRoom &&
        dispatch(setChatroom(response.data.chatrooms[0]));
    } catch (error) {
      console.log(error);
    }
  };

  const removeRooms = (roomId) => {
    let tempt = [...chatRooms];
    tempt = tempt.filter((x) => x._id !== roomId);
    setChatRooms(tempt);
  };

  return (
    <div className="message-wrapper">
      <div className="message-group-left">
        <GroupMessageList
          chatRooms={chatRooms}
          currentChatRoom={currentChatRoom}
          socket={socket}
          setCurrentChatRoom={setCurrentChatRoom}
          getChatRooms={getChatRooms}
        />
      </div>

      <div className="message-chatbox-middle">
        <ChatBoxRight groupInfo={currentChatRoom} socket={socket} />
      </div>

      <div className="message-summary-right" ref={chatSummaryRef}>
        <ChatSummary
          removeRooms={removeRooms}
          chatSummaryRef={chatSummaryRef}
        />
      </div>
    </div>
  );
};
