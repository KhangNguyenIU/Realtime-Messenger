import React from 'react';
import PropTypes from 'prop-types';
import { stringCut } from 'utils';

/**
 * @author
 * @function GroupMessage
 **/

const MAX_LENTH_DISPLAY = 20

export const GroupMessage = ({ groupInfo, handleClick }) => {
  // console.log('groupInfo',groupInfo)

  return (
    <div className='wrapper'>
      <div
        className="group-chat-wrapper"
        onClick={() => handleClick(groupInfo)}
      >
        <div className="img-box">
          <img src={groupInfo?.avatar} alt="group-avatar" />
        </div>
        <div className="group-info">
          <div className='group-name'> {stringCut(groupInfo.name, MAX_LENTH_DISPLAY)}</div>
          <div className='group-last-message'>hello</div>
        </div>
      </div>
    </div>
  );
};

GroupMessage.propTypes = {
  groupInfo: PropTypes.object,
};
