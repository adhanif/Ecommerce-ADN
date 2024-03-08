import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import GoogleIcon from '../images/google.png';
import { StandardButton } from '../customStyling/buttons';
import { useAppDispatch } from '../hooks/useDispatchApp';
import { setGoogleToken } from '../../redux/slices/userSlice';

export default function GoogleLogIn() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      dispatch(setGoogleToken(tokenResponse.access_token));

      navigate('/');
    },
    onError: (error) => {
      if (error) {
        console.log(error);
      }
    },
  });

  return (
    <>
      <Stack
        direction='row'
        spacing={2}
        justifyContent='center'
        marginTop='15px'
      >
        <StandardButton
          variant='outlined'
          startIcon={
            <img src={GoogleIcon} alt='Google Logo' width={24} height={24} />
          }
          sx={{ paddingX: '2rem' }}
          onClick={() => loginWithGoogle()}
        >
          Sign in with google
        </StandardButton>
      </Stack>
    </>
  );
}
