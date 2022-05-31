import { Switch } from '@mui/material';
import useToggle from 'hooks/useToggle';
import React from 'react';
import { TimeModal } from './TimeModal';

/**
 * @author
 * @function FunctionList
 **/

export const FunctionList = (props) => {
  const [checked, setChecked] = React.useState(false);
  const [toggle, handleOpenToggle, handleCloseToggle,toggleFn] = useToggle(false)
  console.log(toggle);

  return (
    <React.Fragment>
      <div className="function-list">
        <div className="function-item">
          <p>Auto delete message</p>
          <Switch checked={toggle} onChange={toggleFn} />
        </div>

        <div className="function-item">
          <p>Leave the chat</p>
        </div>
      </div>

      <TimeModal openDialog={toggle} handleCloseDialog={handleCloseToggle}/>
    </React.Fragment>
  );
};
