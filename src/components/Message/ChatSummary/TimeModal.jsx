import React, { useState, useEffect } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import {
  Button,
  DialogActions,
  DialogContent,
  Divider,
  TextField,
} from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';

import { showNotification } from 'slices/Common/notification.slice';
import { hideLoading, showLoading } from 'slices/Common/loading.slice';

import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const marks = [
  {
    value: 0,
    label: '0°C',
  },
  {
    value: 20,
    label: '20°C',
  },
  {
    value: 37,
    label: '37°C',
  },
  {
    value: 100,
    label: '100°C',
  },
];

/**
 * @author
 * @function TimeModal
 **/

export const TimeModal = ({ openDialog, handleCloseDialog }) => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  function valuetext(value) {
    return `${value}°C`;
  }
  return (
    <div>
      <Dialog
        scroll="paper"
        onClose={handleCloseDialog}
        open={openDialog}
        maxWidth="md"
      >
        <DialogTitle sx={{ textAlign: 'center' }}>
          Set expire time for message
        </DialogTitle>
        <Divider />
        <DialogContent dividers={true}>
          <Box sx={{ width: 300,height:100, mt:10 }}>
            <Slider
              aria-label="Custom marks"
              defaultValue={20}
              getAriaValueText={valuetext}
              step={10}
              valueLabelDisplay="auto"
            //   marks={marks}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
