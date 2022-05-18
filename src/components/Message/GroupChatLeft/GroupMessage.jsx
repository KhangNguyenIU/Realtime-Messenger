import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { stringCut } from 'utils';
import { useSelector } from 'react-redux';

/**
 * @author
 * @function GroupMessage
 **/

const MAX_LENTH_DISPLAY = 20;

export const GroupMessage = ({ groupInfo, handleClick, socket }) => {
  const user = useSelector((state) => state.auth.user);
  const [isReaded, setIsReaded] = useState(true);
  useEffect(() => {
      //default case when data is not already loaded
    if (!groupInfo?.messages[0]?.readByRecipients) {
      setIsReaded(true);
      return;
    }

    // check when data is aldready loaded
    let checkReaded = groupInfo?.messages[0]?.readByRecipients?.find(
      (x) => x.readByUserId === user._id
    )
      ? true
      : false;
    setIsReaded(checkReaded);
  }, [socket, groupInfo, user]);

  return (
    <div className="wrapper">
      <div
        className={`group-chat-wrapper ${!isReaded && 'is-not-readed'}`}
        onClick={() => handleClick(groupInfo)}
      >
        <div className="img-box">
          <img src={groupInfo?.avatar} alt="group-avatar" />
        </div>
        <div className="group-info">
          <div className="group-name">
            {' '}
            {stringCut(groupInfo.name, MAX_LENTH_DISPLAY)}
          </div>
          <div className="group-last-message">hello</div>
        </div>
      </div>
    </div>
  );
};

GroupMessage.propTypes = {
  groupInfo: PropTypes.object,
};
