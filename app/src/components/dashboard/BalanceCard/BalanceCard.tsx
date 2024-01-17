import { Box, Paper, Skeleton, Typography } from '@mui/material';
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import AddTransactionButton from './AddTransactionButton.tsx';

type Props = {
  isLoading?: boolean;
  balance?: number;
};
const BalanceCard = ({ isLoading, balance }: Props) => {
  return (
    <>
      {isLoading ? (
        <Skeleton variant="rounded" sx={{ display: 'flex', flex: 1, height: 380 }} />
      ) : (
        <Paper
          elevation={8}
          sx={{
            display: 'flex',
            flex: 1,
            height: '100%',
            minHeight: 300,
            bgcolor: '#0082E0',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            px: 4,
            py: 2,
            gap: 3,
          }}>
          <Box display={'flex'} flexDirection={'column'} gap={1.5}>
            <Box display={'flex'} p={1.5} bgcolor={'rgba(0,0,0,0.5)'} borderRadius={3} width={'max-content'}>
              <SavingsOutlinedIcon sx={{ color: '#FFF' }} fontSize={'large'} />
            </Box>
            <Box display={'flex'} flexDirection={'row'} alignItems={'center'} gap={2}>
              <Typography variant="h3" component="h2" fontWeight={600}>
                {'CZK ' + Math.abs(balance || 0)}
              </Typography>
              <Box display={'flex'} p={0.5} bgcolor={'#FFF'} borderRadius={50}>
                {balance && balance >= 0 ? (
                  <AddIcon sx={{ color: '#00A825' }} fontSize={'small'} />
                ) : (
                  <RemoveIcon sx={{ color: '#BD0000' }} fontSize={'small'} />
                )}
              </Box>
            </Box>
          </Box>
          <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
            <Typography variant="h4" color="rgba(255,255,255,0.5)" fontWeight={700}>
              Balance
            </Typography>
            <AddTransactionButton />
          </Box>
        </Paper>
      )}
    </>
  );
};

export default BalanceCard;
