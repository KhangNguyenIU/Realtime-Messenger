import React from 'react'
import InfoIcon from '@mui/icons-material/Info';
/**
* @author
* @function ChatBoxHeader
**/

export const ChatBoxHeader = ({groupInfo}) => {
  return(
    <div className="chatbox-header">
        <img alt='group-avater' src={groupInfo?.avatar}/>
        <div className='chatbox-tool-info'>
            <InfoIcon/>
        </div>
    </div>
   )
  }
