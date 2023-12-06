import { Box, Button, Typography, Paper, Avatar } from '@mui/material';
import { TextField, Stack } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from 'react';
import ContentWrapper from '../components/ContentWrapper.tsx';

const MyProfile = () => {
  const mockData = { firstName: 'Jara', lastName: 'Novotny', email: 'jaraNovotny@gmail.com', password: 'hashHash' };

  const [firstName, setFirstName] = useState(mockData.firstName);
  const [lastName, setLastName] = useState(mockData.lastName);
  const [email, setEmail] = useState(mockData.email);
  const [password, setPassword] = useState(mockData.password);

  const [open, setOpen] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setOpen(true);
    console.log(firstName, lastName, email, password);
  }

  function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name: string) {
    return {
      sx: {
        width: 150,
        height: 150,
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }

  return (
    <ContentWrapper>
      <Box display={'flex'} flexDirection={'column'} gap={2} alignItems={'center'}>
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
        <Avatar {...stringAvatar(firstName + ' ' + lastName)} />
        <Button onClick={() => {}} variant="outlined" color="info">
          EDIT PROFILE PICTURE
        </Button>
        <Paper elevation={1} sx={{ width: '100%', p: 4 }}>
          <React.Fragment>
            <Typography variant={'h5'} sx={{ marginBottom: 2 }}>
              General
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
                <TextField
                  type="password"
                  variant="outlined"
                  color="secondary"
                  label="Password"
                  onChange={e => setPassword(e.target.value)}
                  value={password}
                  required
                  fullWidth
                  sx={{ maxWidth: '200px' }}
                />
              </Stack>

              <Box display={'flex'} justifyContent={'end'} alignItems={'end'}>
                <Button variant="contained" type="submit">
                  Save
                </Button>
              </Box>
            </form>
          </React.Fragment>
        </Paper>
      </Box>
    </ContentWrapper>
  );
};

export default MyProfile;
