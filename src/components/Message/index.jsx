import React, { useEffect, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import messageService from 'services/message/message.service';
import { GroupMessageList } from './GroupChatLeft';
import { ChatBoxHeader } from './ChatBoxRight/ChatBoxHeader';
import { useSelector } from 'react-redux';
import { IconButton } from '@mui/material';
import { Message } from './ChatBoxRight/MessageText';

/**
 * @author
 * @function MessageComponent
 **/

export const MessageComponent = ({ socket }) => {
    const user = useSelector(state =>state.auth.user)
    const [message, setMessage] = useState([]);
    const [chatRooms, setChatRooms] = useState([])
    const [inputText, setInputText] = useState('')
    // console.log({message})
    const soket = useSelector(state => state.socket)
    console.log(soket)
  useEffect(() => {
    if (socket) {
        socket.emit('joinRoom','6273acde34d8db3ff3aac1ac');
      socket.on('recieve-message', (message) => setMessage(state=>([...state, message])));
    }
  }, [socket]);

  useEffect(() => {
    const getMessage = async () => {
      try {
        const response = await messageService.getMessageFromChatroom(
          '6273acde34d8db3ff3aac1ac'
        );
        setMessage(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    getMessage();
  }, []);

  useEffect(()=>{
    const getChatRooms = async ()=>{
        try{
            const response = await messageService.getChatRoomofUser();
            setChatRooms(response.data.chatrooms);
            console.log(response.data);
        }catch(error){
            console.log(error);
        }
    }

    getChatRooms()
  },[])

  const handleChangeInput = e=>{
        setInputText(e.target.value);
  }
  const handleSendMessage = (e) => {
      e.preventDefault()
        let messagePacket ={
            chatRoomId :'6273acde34d8db3ff3aac1ac' , message:inputText, postedBy:user._id
        }
      
      socket.emit('send-message', messagePacket);
        setInputText('');
  };

  return (
    <div className="message-wrapper">
      <div className="message-group-left"> 
        <GroupMessageList chatRooms={chatRooms}/>
      </div>

      <div className="message-chatbox-right">
        <ChatBoxHeader groupInfo={chatRooms[0]}/>

        <div className="chatbox-content">
          {message.map((item, index) => (
              <Message key ={index} message={item}/>
          ))}
        </div>

        <div className="chatbox-input">
          <input type="text" value={inputText} className="message-input" onChange={handleChangeInput}/>
          <IconButton onClick={handleSendMessage}>
            <SendIcon  color="secondary"/>
          </IconButton>
        </div>
      </div>
    </div>
  );
};
