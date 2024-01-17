import { Box, Paper, Skeleton, Typography } from '@mui/material';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';

type Props = {
  isLoading?: boolean;
  income?: boolean;
  value?: number;
};
const MovementsCard = ({ isLoading, income, value }: Props) => {
  return (
    <>
      {isLoading ? (
        <>
          <Skeleton variant="rounded" sx={{ display: 'flex', flex: 1, height: 55 }} />
        </>
      ) : (
        <>
          <Paper
            elevation={8}
            sx={{
              display: 'flex',
              flex: 1,
              flexDirection: 'row',
              px: 2,
              alignItems: 'center',
              gap: { xs: 1, md: 2 },
              minHeight: 55,
            }}>
            <ArrowDropDownCircleIcon
              sx={{ color: income ? '#27c947' : '#c92727', rotate: income ? '180deg' : '0deg' }}
              fontSize={'medium'}
            />
            <Box display={'flex'} flexDirection={'row'} gap={1} alignItems={'center'}>
              <Typography>CZK</Typography>
              <Typography variant="h6" component="h2" fontWeight={600}>
                {value}
              </Typography>
            </Box>
          </Paper>
        </>
      )}
    </>
  );
};

export default MovementsCard;
