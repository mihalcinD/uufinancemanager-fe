import ContentWrapper from '../components/ContentWrapper.tsx';
import Grid from '@mui/material/Unstable_Grid2';
import { useSavingGoalsContext } from '../context/SavingGoalsContext.tsx';
import { Skeleton, Stack, Typography } from '@mui/material';
import AddTransactionButton from '../components/transactions/AddTransactionButton.tsx';
import SavingGoalCard from '../components/savingGoals/SavingGoalCard.tsx';

const GRID_SPACING = 2.5;

const SavingGoals = () => {
  const { savingGoals, isLoading } = useSavingGoalsContext();

  return (
    <ContentWrapper>
      <Stack p={2} direction="row" gap={2} justifyContent={'space-between'} flexWrap={'wrap'} alignItems={'center'}>
        <Typography variant={'h2'} fontWeight={900} p={2}>
          Saving Goals
        </Typography>
        <AddTransactionButton />
      </Stack>
      <Grid container rowSpacing={GRID_SPACING} columnSpacing={GRID_SPACING}>
        {isLoading ? (
          [1, 2, 3, 4].map((_, index) => (
            <Grid xs={12} md={6} lg={4} key={index}>
              <Skeleton variant="rounded" sx={{ display: 'flex', flex: 1, height: 200 }} />
            </Grid>
          ))
        ) : savingGoals && savingGoals.length > 0 ? (
          savingGoals.map((savingGoal, index) => (
            <Grid xs={12} md={6} lg={4} key={index}>
              <SavingGoalCard savingGoal={savingGoal} />
            </Grid>
          ))
        ) : (
          <Typography variant={'h5'}>No saving goals yet</Typography>
        )}
      </Grid>
    </ContentWrapper>
  );
};

export default SavingGoals;
