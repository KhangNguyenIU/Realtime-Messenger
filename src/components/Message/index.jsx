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
    // console.log(chatRooms)

  useEffect(()=>{
    if(socket){
        socket.on('recieve-message', data =>{
            getChatRooms(false)
        })

        socket.on('new-message-notify', data=>{
            console.log('reaload') 
            if(data.reload){
                getChatRooms(false)
            }
        })

        socket.on('user-read-message', data=>{
            console.log('reaload -new') 
            if(data.reload){
                getChatRooms(false)
            }
        })

    }
  },[socket])

  useEffect(() => {
    getChatRooms();
  }, []);


  const getChatRooms = async (neeedUpdateCurrentRoom=true) => {
    try {
      const response = await messageService.getChatRoomofUser();
      setChatRooms(response.data.chatrooms);
      neeedUpdateCurrentRoom &&  setCurrentChatRoom(response.data.chatrooms[0]);
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
        setCurrentChatRoom={setCurrentChatRoom} />
      </div>

      <div className="message-chatbox-right">
          <ChatBoxRight 
          groupInfo={currentChatRoom} 
          socket={socket}
        //   chatRooms={chatRooms}
          />
      </div>
    </div>
  );
};
