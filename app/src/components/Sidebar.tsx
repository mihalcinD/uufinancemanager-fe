import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  ListSubheader,
  AppBar,
  IconButton,
  useTheme,
  Divider,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { useHouseholdsContext } from '../context/HouseholdsContext.tsx';
import { useDrawerContext } from '../context/DrawerContext.tsx';
import { useNavigate } from 'react-router-dom';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
const Sidebar = () => {
  const { households, setActive, active } = useHouseholdsContext();
  const { isOpen } = useDrawerContext();
  const navigate = useNavigate();
  const { toggleIsOpen } = useDrawerContext();
  const theme = useTheme();
  return (
    <Drawer
      open={isOpen}
      sx={{
        width: 300,
        borderWidth: 0,
        flexShrink: 0,

        '& .MuiDrawer-paper': {
          width: 301,
          boxSizing: 'border-box',
        },
      }}
      variant="persistent">
      <AppBar position={'static'} sx={{ boxShadow: 'none' }}>
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            backgroundColor: { xs: theme.palette.background.default, lg: 'transparent' },
          }}>
          <IconButton size="large" color="inherit" sx={{ display: { xs: 'flex', lg: 'none' } }} onClick={toggleIsOpen}>
            <ArrowBackIosNewIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <List
        sx={{ marginTop: 2 }}
        subheader={
          <ListSubheader sx={{ fontSize: '1.5rem', fontWeight: 'bold', backgroundColor: 'transparent' }}>
            Households
          </ListSubheader>
        }>
        {households &&
          households.map((household, index) => (
            <ListItem key={household.id} disablePadding>
              <ListItemButton
                selected={index === active}
                onClick={() => {
                  navigate(index + 1 + '/dashboard');
                  setActive(index);
                }}>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary={household.name} color={'inherit'} />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
