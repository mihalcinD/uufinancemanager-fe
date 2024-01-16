import Grid from '@mui/material/Unstable_Grid2';
import { Box } from '@mui/material';
import ContentWrapper from '../components/ContentWrapper.tsx';
import BalanceCard from '../components/dashboard/BalanceCard/BalanceCard.tsx';
import StatisticsCard from '../components/dashboard/StatisticsCard.tsx';
import MovementsCard from '../components/dashboard/MovementsCard.tsx';
import TransactionsCard from '../components/dashboard/TransactionsCard/TransactionsCard.tsx';
import GoalsCard from '../components/dashboard/GoalsCard.tsx';
import MembersCard from '../components/dashboard/MembersCard.tsx';
import { useHouseholdContext } from '../context/HouseholdContext.tsx';

const GRID_SPACING = 2.5;
const Dashboard = () => {
  const { household, isLoading } = useHouseholdContext();

  return (
    <ContentWrapper>
      <Grid container rowSpacing={GRID_SPACING} columnSpacing={GRID_SPACING}>
        <Grid xs={12} md={6}>
          <BalanceCard isLoading={isLoading} balance={household?.balance} />
        </Grid>
        <Grid xs={12} md={6}>
          <Box height={300} display={'flex'} flex={1} flexDirection={'column'} gap={GRID_SPACING}>
            <StatisticsCard householdId={id} isLoading={isLoading} overall={household?.balance} />
            <Box display={'flex'} flex={1} gap={GRID_SPACING}>
              <MovementsCard isLoading={isLoading} income value={household?.incomes} />
              <MovementsCard isLoading={isLoading} value={household?.expenses} />
            </Box>
          </Box>
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          <TransactionsCard />
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          <GoalsCard isLoading={isLoading} />
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          <MembersCard isLoading={isLoading} />
        </Grid>
      </Grid>
    </ContentWrapper>
  );
};

export default Dashboard;
