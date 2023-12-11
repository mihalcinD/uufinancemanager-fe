import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Unstable_Grid2';
import { Box, Paper, Skeleton, useTheme } from '@mui/material';
import ContentWrapper from '../components/ContentWrapper.tsx';
import { useHouseholdsContext } from '../context/HouseholdsContext.tsx';

const GRID_SPACING = 2.5;
const Dashboard = () => {
  const { id } = useParams<{ id: string }>();
  const theme = useTheme();
  const { households, isLoading } = useHouseholdsContext();

  return (
    <ContentWrapper>
      <Grid container rowSpacing={GRID_SPACING} columnSpacing={GRID_SPACING}>
        <Grid xs={12} md={6}>
          {isLoading ? (
            <Skeleton variant="rounded" sx={{ display: 'flex', flex: 1, height: 300 }} />
          ) : (
            <Paper elevation={8} sx={{ display: 'flex', flex: 1, height: 300 }} />
          )}
        </Grid>
        <Grid xs={12} md={6}>
          <Box height={300} display={'flex'} flex={1} flexDirection={'column'} gap={GRID_SPACING}>
            {isLoading ? (
              <Skeleton variant="rounded" sx={{ display: 'flex', flex: 4 }} />
            ) : (
              <Paper elevation={8} sx={{ display: 'flex', flex: 4 }} />
            )}
            <Box display={'flex'} flex={1} gap={GRID_SPACING}>
              {isLoading ? (
                <>
                  <Skeleton variant="rounded" sx={{ display: 'flex', flex: 1, height: '100%' }} />
                  <Skeleton variant="rounded" sx={{ display: 'flex', flex: 1, height: '100%' }} />
                </>
              ) : (
                <>
                  <Paper elevation={8} sx={{ display: 'flex', flex: 1 }} />
                  <Paper elevation={8} sx={{ display: 'flex', flex: 1 }} />
                </>
              )}
            </Box>
          </Box>
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          {isLoading ? (
            <Skeleton variant="rounded" sx={{ display: 'flex', flex: 1, height: 300 }} />
          ) : (
            <Paper elevation={8} sx={{ display: 'flex', flex: 1, height: 300 }} />
          )}
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          {isLoading ? (
            <Skeleton variant="rounded" sx={{ display: 'flex', flex: 1, height: 300 }} />
          ) : (
            <Paper elevation={8} sx={{ display: 'flex', flex: 1, height: 300 }} />
          )}
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          {isLoading ? (
            <Skeleton variant="rounded" sx={{ display: 'flex', flex: 1, height: 300 }} />
          ) : (
            <Paper elevation={8} sx={{ display: 'flex', flex: 1, height: 300 }} />
          )}
        </Grid>
      </Grid>
    </ContentWrapper>
  );
};

export default Dashboard;
