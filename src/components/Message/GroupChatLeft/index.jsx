import React from 'react'
import { GroupMessage } from './GroupMessage'

/**
* @author
* @function GroupMessageList
**/

export const GroupMessageList = ({chatRooms, setCurrentChatRoom, currentChatRoom, socket}) => {

    const handleClick = (chatRoom) => {
        if(socket && currentChatRoom){
            socket.emit('leaveRoom',currentChatRoom._id)
        }
        setCurrentChatRoom(chatRoom)
    }

  return(
    <div>{
        !!chatRooms.length && chatRooms.map((room,index)=>(
            <GroupMessage 
            socket={socket}
            key ={index} 
            groupInfo={room}
            handleClick={handleClick}
            />
        ))
    }</div>
   )

 }