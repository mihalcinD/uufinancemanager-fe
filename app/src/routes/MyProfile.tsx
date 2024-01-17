import { Box, Button, Typography, Paper } from '@mui/material';
import { TextField, Stack } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import ContentWrapper from '../components/ContentWrapper.tsx';
import { useAuth0 } from '@auth0/auth0-react';

const MyProfile = () => {
  const { user } = useAuth0();
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setFirstName(user.given_name);
      setLastName(user.family_name);
      setEmail(user.email);
    }
  }, [user]);

  function handleSubmit(event) {
    event.preventDefault();
    setOpen(true);
  }

  return (
    <ContentWrapper>
      <Box display={'flex'} flexDirection={'column'} gap={3} alignItems={'center'}>
        <Collapse in={open}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}>
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}>
            Profile info updated!
          </Alert>
        </Collapse>

        <Paper elevation={1} sx={{ width: '100%', p: 4 }}>
          <Typography variant={'h5'} component={'h2'} fontWeight={900} mb={3}>
            User Settings
          </Typography>

          <form onSubmit={handleSubmit}>
            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
              <TextField
                sx={{ maxWidth: '300px' }}
                type="text"
                variant="outlined"
                color="secondary"
                label="First Name"
                onChange={e => setFirstName(e.target.value)}
                value={firstName}
                fullWidth
                required
              />
              <TextField
                sx={{ maxWidth: '300px' }}
                type="text"
                variant="outlined"
                color="secondary"
                label="Last Name"
                onChange={e => setLastName(e.target.value)}
                value={lastName}
                fullWidth
                required
              />
            </Stack>
            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
              <TextField
                type="email"
                variant="outlined"
                color="secondary"
                label="Email"
                onChange={e => setEmail(e.target.value)}
                value={email}
                fullWidth
                required
                sx={{ maxWidth: '400px' }}
              />
            </Stack>

            <Box display={'flex'} justifyContent={'end'} alignItems={'end'}>
              <Button variant="contained" type="submit">
                Save
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </ContentWrapper>
  );
};

export default MyProfile;
