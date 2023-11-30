import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  ListSubheader,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { useHouseholdsContext } from '../context/HouseholdsContext.tsx';
import { useDrawerContext } from '../context/DrawerContext.tsx';
import { useNavigate } from 'react-router-dom';
const Sidebar = () => {
  const { households, setActive, active } = useHouseholdsContext();
  const { isOpen } = useDrawerContext();
  const navigate = useNavigate();
  return (
    <Drawer
      open={isOpen}
      sx={{
        width: 300,
        borderWidth: 0,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 300,
          boxSizing: 'border-box',
          backgroundColor: 'theme.palette.background.paper',
        },
      }}
      variant="persistent">
      <Toolbar />

      <List
        sx={{ marginTop: 2 }}
        subheader={<ListSubheader sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Households</ListSubheader>}>
        {households.map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              selected={index === active}
              onClick={() => {
                navigate(index + 1 + '/dashboard');
                setActive(index);
              }}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={text} color={'inherit'} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
