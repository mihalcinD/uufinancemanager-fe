import { Box, Button, Paper, Skeleton, Typography } from '@mui/material';
import { useHouseholdsContext } from '../../context/HouseholdsContext.tsx';
import { useNavigate } from 'react-router-dom';
import { useUsersContext } from '../../context/UsersContext.tsx';
import { useHouseholdContext } from '../../context/HouseholdContext.tsx';
import { useAuth0 } from '@auth0/auth0-react';

type Props = {
  isLoading?: boolean;
};
const MembersCard = ({ isLoading }: Props) => {
  const { active } = useHouseholdsContext();
  const { household } = useHouseholdContext();
  const { users } = useUsersContext();
  const navigate = useNavigate();
  const { user } = useAuth0();

  return (
    <>
      {isLoading ? (
        <Skeleton variant="rounded" sx={{ display: 'flex', flex: 1, height: 300 }} />
      ) : (
        <Paper elevation={8} sx={{ display: 'flex', flex: 1, p: 2, flexDirection: 'column', gap: 1 }}>
          <Typography variant={'h5'} component={'h2'} fontWeight={900}>
            Settings
          </Typography>
          <Box>
            <Typography component={'h2'} fontWeight={600} mb={0.5}>
              Members
            </Typography>
            {users.map((user, index) => (
              <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} key={index}>
                <Typography>{user.email}</Typography>
              </Box>
            ))}
          </Box>
          <Button
            variant={'text'}
            color={'inherit'}
            sx={{ alignSelf: 'flex-end' }}
            onClick={() => {
              navigate('/' + active + '/settings');
            }}>
            {household?.ownerId === user?.sub && (
              <Typography color="inherit" fontWeight={700}>
                Show Settings
              </Typography>
            )}
          </Button>
        </Paper>
      )}
    </>
  );
};

export default MembersCard;
