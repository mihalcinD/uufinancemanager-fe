import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Unstable_Grid2';
import { Box } from '@mui/material';
import ContentWrapper from '../components/ContentWrapper.tsx';
import BalanceCard from '../components/dashboard/BalanceCard.tsx';
import StatisticsCard from '../components/dashboard/StatisticsCard.tsx';
import MovementsCard from '../components/dashboard/MovementsCard.tsx';
import TransactionsCard from '../components/dashboard/TransactionsCard.tsx';
import GoalsCard from '../components/dashboard/GoalsCard.tsx';
import MembersCard from '../components/dashboard/MembersCard.tsx';
import useHousehold from '../hooks/api/useHousehold.ts';

const GRID_SPACING = 2.5;
const Dashboard = () => {
  const { id } = useParams<{ id: string | undefined }>();
  const { household, isLoading } = useHousehold({ id });

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
              <MovementsCard isLoading={isLoading} income value={household?.balance} />
              <MovementsCard isLoading={isLoading} value={household?.balance} />
            </Box>
          </Box>
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          <TransactionsCard isLoading={isLoading} />
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
