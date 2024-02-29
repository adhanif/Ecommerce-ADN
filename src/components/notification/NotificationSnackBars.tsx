import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';
import { useSelector } from 'react-redux';

import { AppState, useAppDispatch } from '../../redux/store';
import { setNotification } from '../../redux/slices/notificationSlice';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

export default function NotificationSnackBars() {
  // const [open, setOpen] = React.useState<boolean>(false);

  const notification = useSelector((state: AppState) => state.notification);
  const dispatch = useAppDispatch();

  // console.log(typeof notification.severity);

  // const handleClick = () => {
  //   setOpen(true);
  // };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    // setOpen(false);
    dispatch(setNotification({ open: false, message: '', severity: '' }));
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar
        open={notification.open}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleClose}
          severity={notification.severity as AlertColor}
          sx={{ width: '100%' }}
          variant='filled'
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
