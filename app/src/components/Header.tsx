import { AppBar, Box, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import { useState, MouseEvent } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import MenuIcon from '@mui/icons-material/Menu';
import { useDrawerContext } from '../context/DrawerContext.tsx';

const Header = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const { logout, user } = useAuth0();
  const { toggleIsOpen } = useDrawerContext();
  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <AppBar position="fixed" sx={{ boxShadow: 'none', zIndex: theme => theme.zIndex.drawer + 1 }}>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: { xs: 'space-between', md: 'flex-end' },
          alignItems: 'center',
        }}>
        <IconButton size="large" color="inherit" sx={{ display: { xs: 'block', md: 'none' } }} onClick={toggleIsOpen}>
          <MenuIcon />
        </IconButton>
        <IconButton
          size="large"
          aria-label="Home page"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          color="inherit"
          onClick={handleOpenUserMenu}>
          <PermIdentityOutlinedIcon />
        </IconButton>

        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
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
          onClose={handleCloseUserMenu}>
          <Box px={2} pt={1} pb={2}>
            <Typography textAlign="center">{user?.email}</Typography>
          </Box>
          <MenuItem onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
            <Typography textAlign="center">Logout</Typography>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
