import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Badge from '@mui/material/Badge';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DiamondIcon from '@mui/icons-material/Diamond';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { AppState } from '../../redux/store';
import { logOut, removeUserInfo } from '../../redux/slices/userSlice';
import {
  useGoogleUserProfileQuery,
  useUserLogoutMutation,
  useUserProfileQuery,
  userQueries,
} from '../../redux/userQuery';
import { setNotification } from '../../redux/slices/notificationSlice';
import { skipToken } from '@reduxjs/toolkit/query';
import ToggleColorMode from './ToggleColorMode';
import { useTheme } from '../contextAPI/ThemeContext';
import { emptyCart } from '../../redux/slices/cartSlice';
import Loading from '../loading/Loading';

function ResponsiveAppBar() {
  const cartData = useSelector((state: AppState) => state.cart.products);

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );
  const { mode } = useTheme();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state: AppState) => state.user.token);

  const googleToken = useSelector((state: AppState) => state.user.googleToken);

  const { data: googleUserRole, isLoading: isGoogleUserLoading } =
    useGoogleUserProfileQuery(googleToken ?? skipToken);

  const { data: userData, isLoading: isUserProfileLoading } =
    useUserProfileQuery(token ?? skipToken);
  const [userLogout] = useUserLogoutMutation();

  const handleLogout = async () => {
    const res = await userLogout({});
    dispatch(logOut());
    dispatch(removeUserInfo());
    dispatch(emptyCart());
    dispatch(userQueries.util.resetApiState());
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

  // const imagUrl = userData ? userData?.avatar : googleUserRole?.picture;

  if (isUserProfileLoading || isGoogleUserLoading) {
    return <Loading />;
  }

  return (
    <AppBar
      position='static'
      sx={{
        boxShadow: 0,
        bgcolor: mode === 'light' ? 'black' : 'dark',
        backgroundImage: 'none',
      }}
    >
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <DiamondIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant='h6'
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
            onClick={() => {
              navigate('/');
            }}
          >
            FASHION
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to={`/`} style={{ textDecoration: 'none' }}>
                  <Typography textAlign='center' color='text.primary'>
                    Home
                  </Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to={`/products`} style={{ textDecoration: 'none' }}>
                  <Typography textAlign='center' color='text.primary'>
                    shop
                  </Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to={`/contact`} style={{ textDecoration: 'none' }}>
                  <Typography textAlign='center' color='text.primary'>
                    contact
                  </Typography>
                </Link>
              </MenuItem>
            </Menu>
          </Box>

          <DiamondIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant='h5'
            noWrap
            component='a'
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
            onClick={() => {
              navigate('/');
            }}
          >
            FASHION
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              component={Link}
              to={`/`}
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Home
            </Button>
            <Button
              component={Link}
              to={`/products`}
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Shop
            </Button>
            <Button
              component={Link}
              to={`/contact`}
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              contact
            </Button>
          </Box>
          <>
            <ToggleColorMode />
          </>
          {!googleToken && !token ? (
            <>
              <Button
                sx={{ my: 2, color: 'white', display: 'block' }}
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
              <Button
                sx={{ my: 2, color: 'white', display: 'block' }}
                onClick={() => navigate('/register')}
              >
                Signup
              </Button>
              <IconButton
                type='button'
                size='large'
                aria-label='show 17 new notifications'
                color='inherit'
                sx={{ marginRight: '0.5rem' }}
                onClick={() => navigate('/cart')}
              >
                <Badge
                  badgeContent={
                    cartData && cartData.length > 0 ? cartData.length : 0
                  }
                  color='error'
                  showZero
                >
                  <AddShoppingCartIcon />
                </Badge>
              </IconButton>
            </>
          ) : (
            <Box sx={{ flexGrow: 0 }}>
              <IconButton
                size='large'
                aria-label='cart'
                color='inherit'
                sx={{ marginRight: '0.5rem' }}
                onClick={() => navigate('/cart')}
              >
                <Badge
                  badgeContent={
                    cartData && cartData.length > 0 ? cartData.length : 0
                  }
                  color='error'
                  showZero
                >
                  <AddShoppingCartIcon />
                </Badge>
              </IconButton>
              <Tooltip title='Open settings'>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt='Remy Sharp'
                    // src={
                    //   // avatarSrc
                    //   userData ? userData?.avatar : googleUserRole?.picture
                    // }
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id='menu-appbar'
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  {(userData || googleToken) && (
                    <Link
                      to={
                        userData
                          ? `${
                              userData.role === 'Customer'
                                ? '/profile'
                                : '/admin'
                            }`
                          : '/googleprofile'
                      }
                      style={{ textDecoration: 'none' }}
                    >
                      <Typography textAlign='center' color='text.primary'>
                        Profile
                      </Typography>
                    </Link>
                  )}
                </MenuItem>

                <MenuItem
                  onClick={() => {
                    handleCloseUserMenu();
                    handleLogout();
                  }}
                >
                  <Typography textAlign='center' color='text.primary'>
                    Logout
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
