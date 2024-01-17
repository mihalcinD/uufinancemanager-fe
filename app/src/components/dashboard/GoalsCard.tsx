import { Box, Button, Paper, Skeleton, Typography } from '@mui/material';
import { useSavingGoalsContext } from '../../context/SavingGoalsContext.tsx';
import { useNavigate } from 'react-router-dom';
import { useHouseholdsContext } from '../../context/HouseholdsContext.tsx';

type Props = {
  isLoading?: boolean;
};
const GoalsCard = ({ isLoading }: Props) => {
  const { savingGoals } = useSavingGoalsContext();
  const { active } = useHouseholdsContext();
  const navigate = useNavigate();
  return (
    <>
      {isLoading ? (
        <Skeleton variant="rounded" sx={{ display: 'flex', flex: 1, height: 300 }} />
      ) : (
        <Paper
          elevation={8}
          sx={{ display: 'flex', flex: 1, p: 2, flexDirection: 'column', gap: 1, bgcolor: '#9a3900' }}>
          <Typography variant={'h5'} component={'h2'} fontWeight={900}>
            Saving Goals
          </Typography>
          <Box>
            {savingGoals && savingGoals.length > 0 ? (
              savingGoals.slice(0, 5).map((goal, index) => (
                <Box display={'flex'} flexDirection={'row'} py={0.3} justifyContent={'space-between'}>
                  <Typography fontWeight={600}>{goal.name}</Typography>
                  <Typography fontWeight={400}>{(goal.currentBalance / goal.goal) * 100 + ' %'}</Typography>
                </Box>
              ))
            ) : (
              <Typography>No saving goals yet</Typography>
            )}
          </Box>
          <Button
            variant={'text'}
            color={'inherit'}
            sx={{ alignSelf: 'flex-end' }}
            onClick={() => {
              navigate('/' + active + '/saving-goals');
            }}>
            <Typography color="inherit" fontWeight={700}>
              Show more
            </Typography>
          </Button>
        </Paper>
      )}
    </>
  );
};

export default GoalsCard;
