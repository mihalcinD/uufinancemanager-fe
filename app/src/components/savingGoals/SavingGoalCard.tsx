import { Box, Paper, Typography } from '@mui/material';
import { SavingGoalResponse } from '../../types/api/response/savingGoals.ts';

type Props = {
  savingGoal: SavingGoalResponse;
};
const SavingGoalCard = ({ savingGoal }: Props) => {
  return (
    <Paper
      sx={{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        gap: 1,
        p: 3,
        height: 200,
        justifyContent: 'flex-end',
        cursor: 'pointer',
      }}
      onClick={() => {}}>
      <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'100%'}>
        <Typography variant={'h4'} fontWeight={900}>
          {(savingGoal.currentBalance / savingGoal.goal) * 100 + ' %'}
        </Typography>
      </Box>
      <Typography variant={'h5'} fontWeight={900}>
        {savingGoal.name}
      </Typography>
    </Paper>
  );
};
export default SavingGoalCard;
