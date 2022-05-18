import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { stringCut } from 'utils';
import { useSelector } from 'react-redux';

/**
 * @author
 * @function GroupMessage
 **/

const MAX_LENTH_DISPLAY = 20;

export const GroupMessage = ({ groupInfo, handleClick, socket }) => {
    console.log("re render")
  const user = useSelector((state) => state.auth.user);
  // console.log(groupInfo)
  const isReaded = useMemo(() => {
    return groupInfo?.messages[0]?.readByRecipients?.find(
      (x) => x.readByUserId === user._id
    )
      ? true
      : false;
  }, [groupInfo, user]);

  useEffect(() => {
    if (!isReaded && socket) {
      console.log('emit');
      socket.emit('user-read-message', {
        user: user._id,
        message: groupInfo?.messages[0]?._id,
      });
    }
  }, [isReaded, socket, groupInfo, user]);
  console.log("mess ", groupInfo?.messages[0]?.readByRecipients, groupInfo?.name)
  console.log({ isReaded }, groupInfo.name);
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
