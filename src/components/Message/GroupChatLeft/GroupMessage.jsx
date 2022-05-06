import React from 'react'
import PropTypes from 'prop-types'

/**
* @author
* @function GroupMessage
**/

export const GroupMessage = ({groupInfo}) => {
    // console.log('groupInfo',groupInfo)
    
  return( 
    <div className="group-chat-wrapper">
        <div className='img-box'>
            <img src={groupInfo?.avatar} alt='group-avatar'/>
        </div>
        <div className='group-info'>
            <div> Khang Duy</div>
            <div>
                hello
            </div>
        </div>
    </div>
   )
  }


GroupMessage.propTypes = {
    groupInfo: PropTypes.object
}