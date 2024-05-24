import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';

import { UserProfileData } from '../../misc/types';
import { useUserLogoutMutation } from '../../redux/userQuery';
import { useAppDispatch } from '../hooks/useDispatchApp';
import { useNavigate } from 'react-router-dom';
import { logOut, removeUserInfo } from '../../redux/slices/userSlice';
import { emptyCart } from '../../redux/slices/cartSlice';
import { setNotification } from '../../redux/slices/notificationSlice';
import FetchAllOrdersUser from '../order/FetchAllOrdersUser';
import { Address } from './UserAddress';
import { UserInfo } from './UserInfoCard';

export default function UserProfileCard({ data }: { data: UserProfileData }) {
  const [userLogout] = useUserLogoutMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [selectedComponent, setSelectedComponent] = useState<
    'orderHistory' | 'userInfo' | 'Address' | null
  >('orderHistory');

  const handleClick = (component: 'orderHistory' | 'userInfo' | 'Address') => {
    setSelectedComponent(component);
  };

  const handleLogout = async () => {
    const res = await userLogout({});
    dispatch(logOut());
    dispatch(removeUserInfo());
    dispatch(emptyCart());

    if (
      'data' in res &&
      'message' in res.data &&
      res.data.message === 'Logged out successfully'
    ) {
      dispatch(
        setNotification({
          open: true,
          message: 'Logout Successful',
          severity: 'success',
        }),
      );
      navigate('/login');
    } else {
      dispatch(
        setNotification({
          open: true,
          message: 'Logout Failed',
          severity: 'error',
        }),
      );
    }
  };
  return (
    <>
      <Grid
        container
        display='flex'
        justifyContent='center'
        marginBottom='5rem'
        spacing={5}
        // marginTop='3rem'
      >
        <Grid item xs={12} sm={12} md={3}>
          <Grid item xs={12} marginBottom={5}>
            <Card sx={{ padding: '10px' }}>
              <CardContent sx={{ padding: '0 !important' }}>
                <Grid display='flex' alignItems='center'>
                  <Stack marginRight={2}>
                    <Avatar
                      alt={data.name}
                      src={(data && data.avatar) || undefined}
                      sx={{ width: 50, height: 50 }}
                    />
                  </Stack>

                  <Grid item xs={12}>
                    <Typography>Hi,</Typography>
                    <Typography fontWeight={700}>
                      {data.name.toLocaleUpperCase()}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card sx={{ padding: '10px' }}>
              <Box
                alignItems='center'
                display='flex'
                flexDirection='row'
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  },
                }}
                onClick={() => handleClick('orderHistory')}
              >
                <IconButton
                  size='small'
                  aria-label='show 17 new notifications'
                  color='inherit'
                >
                  <LocalShippingIcon />
                </IconButton>
                <Typography marginLeft={2}>Order History</Typography>
              </Box>

              <Box
                alignItems='center'
                display='flex'
                flexDirection='row'
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  },
                }}
                onClick={() => handleClick('userInfo')}
              >
                <IconButton
                  size='small'
                  aria-label='show 17 new notifications'
                  color='inherit'
                >
                  <AccountBoxIcon />
                </IconButton>
                <Typography marginLeft={2}>User Info</Typography>
              </Box>

              <Box
                alignItems='center'
                display='flex'
                flexDirection='row'
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  },
                }}
                onClick={() => handleClick('Address')}
              >
                <IconButton
                  size='small'
                  aria-label='show 17 new notifications'
                  color='inherit'
                >
                  <HomeIcon />
                </IconButton>
                <Typography marginLeft={2}>Address</Typography>
              </Box>

              <Box
                alignItems='center'
                display='flex'
                flexDirection='row'
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  },
                }}
                onClick={() => handleLogout()}
              >
                <IconButton
                  size='small'
                  aria-label='show 17 new notifications'
                  color='inherit'
                >
                  <LogoutIcon />
                </IconButton>
                <Typography marginLeft={2}>Logout</Typography>
              </Box>
            </Card>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={9}>
          {selectedComponent === 'orderHistory' && (
            <FetchAllOrdersUser userId={data.id} />
          )}
          {selectedComponent === 'userInfo' && <UserInfo user={data} />}
          {selectedComponent === 'Address' && <Address userId={data.id} />}
          {!selectedComponent && (
            <Typography>Select an option to view details</Typography>
          )}
        </Grid>
      </Grid>
    </>
  );
}
