import React, { useEffect,  useState } from 'react';
import messageService from 'services/message/message.service';
import { GroupMessageList } from './GroupChatLeft';
import { ChatBoxRight } from './ChatBoxRight';

/**
 * @author
 * @function MessageComponent
 **/

export const MessageComponent = ({ socket }) => {
  const [chatRooms, setChatRooms] = useState([]);
  const [currentChatRoom, setCurrentChatRoom] = useState(null);

  useEffect(() => {
    const getChatRooms = async () => {
      try {
        const response = await messageService.getChatRoomofUser();
        setChatRooms(response.data.chatrooms);
        setCurrentChatRoom(response.data.chatrooms[0]);
      } catch (error) {
        console.log(error);
      }
    };

    getChatRooms();
  }, []);

  return (
    <div className="message-wrapper">
      <div className="message-group-left">
        <GroupMessageList 
        chatRooms={chatRooms} 
        currentChatRoom={currentChatRoom}
        socket={socket}
        setCurrentChatRoom={setCurrentChatRoom} />
      </div>

      <div className="message-chatbox-right">
          <ChatBoxRight 
          groupInfo={currentChatRoom} 
          socket={socket}
          chatRooms={chatRooms}
          
          />
      </div>
    </div>
  );
};
