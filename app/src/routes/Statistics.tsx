import { MenuItem, Paper, Select, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { useState } from 'react';
import { AllInclusiveRounded } from '@mui/icons-material';
import { BalanceChart } from '../components/statistics/balanceChart.tsx';
import { IncomeChart } from '../components/statistics/incomeChart.tsx';
import Grid from '@mui/material/Unstable_Grid2';
import useAnalytics from '../hooks/api/useAnalytics.ts';
import { useParams } from 'react-router-dom';
import useStatistics from '../hooks/api/useStatistics.ts';
import ContentWrapper from '../components/ContentWrapper.tsx';
import { useTagsContext } from '../context/TagsContext.tsx';
import { useUsersContext } from '../context/UsersContext.tsx';

const Statistics = () => {
  const { id } = useParams<{ id: string }>();
  const [timePeriodFilter, setTimePeriodFilter] = useState<-1 | 7 | 30 | 90>(-1);
  const [memberFilter, setMemberFilter] = useState<string>('all');

  const [tagFilter, setTagFilter] = useState<string>('all');
  const { tags, isLoading } = useTagsContext();
  const { users } = useUsersContext();

  const { data: balanceData } = useAnalytics({ parentId: id, period: timePeriodFilter });

  const { data: incomeData } = useStatistics({
    parentId: id,
    positive: true,
    period: timePeriodFilter,
    userId: memberFilter === 'all' ? undefined : memberFilter,
    tagId: tagFilter === 'all' ? undefined : tagFilter,
  });
  const { data: outcomeData } = useStatistics({
    parentId: id,
    positive: false,
    period: timePeriodFilter,
    userId: memberFilter === 'all' ? undefined : memberFilter,
    tagId: tagFilter === 'all' ? undefined : tagFilter,
  });

  return (
    <ContentWrapper>
      <Stack p={2} direction="row" gap={2} justifyContent={'space-between'} flexWrap={'wrap'}>
        <Typography variant={'h2'} fontWeight={900}>
          Statistics
        </Typography>
        <Paper elevation={8} sx={{ p: 1.5, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Stack spacing={0.5}>
            <Typography fontSize={12}>Time period</Typography>
            <ToggleButtonGroup
              value={timePeriodFilter}
              exclusive
              onChange={(e, value) => setTimePeriodFilter(value)}
              aria-label="text alignment">
              <ToggleButton value={-1}>
                <AllInclusiveRounded />
              </ToggleButton>
              <ToggleButton value={7}>7 dnů</ToggleButton>
              <ToggleButton value={30}>30 dnů</ToggleButton>
              <ToggleButton value={90}>90 dnů</ToggleButton>
            </ToggleButtonGroup>
          </Stack>
          <Stack spacing={0.5}>
            <Typography fontSize={12}>Member</Typography>
            <Select
              value={memberFilter}
              sx={{
                height: 48,
                '& legend': {
                  color: 'white',
                },
              }}
              onChange={e => setMemberFilter(e.target.value)}>
              <MenuItem value={'all'}>všichni</MenuItem>
              {users.map(user => (
                <MenuItem value={user.id}>{user.name} {user.surname}</MenuItem>

              ))}
            </Select>
          </Stack>
          <Stack spacing={0.5}>
            <Typography fontSize={12}>Tag</Typography>
            <Select
              value={tagFilter}
              sx={{
                height: 48,
                '& legend': {
                  color: 'white',
                },
              }}
              onChange={e => setTagFilter(e.target.value)}>
              <MenuItem value={'all'}>všechny</MenuItem>
              {tags?.map(tag => <MenuItem value={tag._id}>{tag.name}</MenuItem>)}
            </Select>
          </Stack>
        </Paper>
      </Stack>
      <Stack p={1}>
        <Grid container spacing={2} m={0} sx={{ width: '100%' }}>
          <Grid xs={12}>
            <Paper elevation={8} sx={{ p: 1.5 }}>
              <Typography fontWeight={700} fontSize={20}>
                Household balance
              </Typography>
              <BalanceChart data={balanceData} />
            </Paper>
          </Grid>
          <Grid xs={12} md={6}>
            <Paper elevation={8} sx={{ p: 1.5 }}>
              <Typography fontWeight={700} fontSize={20}>
                Income by user
              </Typography>
              <IncomeChart inpData={incomeData} />
            </Paper>
          </Grid>
          <Grid xs={12} md={6}>
            <Paper elevation={8} sx={{ p: 1.5 }}>
              <Typography fontWeight={700} fontSize={20}>
                Outcome by user
              </Typography>
              <IncomeChart inpData={outcomeData} />
            </Paper>
          </Grid>
        </Grid>
      </Stack>
    </ContentWrapper>
  );
};

export default Statistics;
