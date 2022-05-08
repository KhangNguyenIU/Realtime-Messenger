import React from 'react'
import { GroupMessage } from './GroupMessage'

/**
* @author
* @function GroupMessageList
**/

export const GroupMessageList = ({chatRooms, setCurrentChatRoom}) => {

    const handleClick = (chatRoom) => {
        setCurrentChatRoom(chatRoom)
    }
  return(
    <div>{
        !!chatRooms.length && chatRooms.map((room,index)=>(
            <GroupMessage 
            key ={index} 
            groupInfo={room}
            handleClick={handleClick}
            />
        ))
    }</div>
   )

 }