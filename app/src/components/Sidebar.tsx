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
const Sidebar = () => {
  const { households, setActive, active } = useHouseholdsContext();
  const { isOpen } = useDrawerContext();
  return (
    <Drawer
      open={isOpen}
      sx={{
        backgroundColor: 'primary.main',
        width: 300,
        borderWidth: 0,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 300,

          boxSizing: 'border-box',
          backgroundColor: 'palette.background.paper',
        },
      }}
      variant="persistent">
      <Toolbar />

      <List
        sx={{ marginTop: 2 }}
        subheader={<ListSubheader sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Households</ListSubheader>}>
        {households.map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton selected={index === active} onClick={() => setActive(index)}>
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
