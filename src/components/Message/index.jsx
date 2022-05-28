import React, { useEffect, useState } from 'react';

import messageService from 'services/message/message.service';

import { GroupMessageList } from './GroupChatLeft';
import { ChatBoxRight } from './ChatBoxRight';
import { ChatSummary } from './ChatSummary';
import { useDispatch } from 'react-redux';
import { playSound } from 'slices/Common/sound.slice';

import { NEW_MESSAGE_SOUND } from 'constants';

/**
 * @author
 * @function MessageComponent
 **/

export const MessageComponent = ({ socket }) => {
  const [chatRooms, setChatRooms] = useState([]);
  const [currentChatRoom, setCurrentChatRoom] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    if (socket) {
      socket.on('recieve-message', (data) => {
        getChatRooms(false);
        dispatch(
          playSound({ sound: NEW_MESSAGE_SOUND, play: true, playInLoop: false })
        );
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
  }, [socket, dispatch]);

  useEffect(() => {
    getChatRooms();
  }, []);

  const getChatRooms = async (neeedUpdateCurrentRoom = true) => {
    try {
      const response = await messageService.getChatRoomofUser();
      setChatRooms(response.data.chatrooms);
      neeedUpdateCurrentRoom && setCurrentChatRoom(response.data.chatrooms[0]);
    } catch (error) {
      console.log(error);
    }
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
        <ChatBoxRight
          groupInfo={currentChatRoom}
          socket={socket}
          //   chatRooms={chatRooms}
        />
      </div>

      <div className="message-summary-right">
        <ChatSummary groupInfo={currentChatRoom} />
      </div>
    </div>
  );
};
