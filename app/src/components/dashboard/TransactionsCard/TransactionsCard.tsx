import { Box, Button, Paper, Skeleton, Typography } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { useTransactionsContext } from '../../../context/TransactionsContext.tsx';
import { useHouseholdsContext } from '../../../context/HouseholdsContext.tsx';
import TransactionItem from './TransactionItem.tsx';

const TransactionsCard = () => {
  const { transactions, isLoading } = useTransactionsContext();
  const navigate = useNavigate();
  const { active } = useHouseholdsContext();
  return (
    <>
      {isLoading ? (
        <Skeleton variant="rounded" sx={{ display: 'flex', flex: 1, height: 300 }} />
      ) : (
        <Paper elevation={8} sx={{ display: 'flex', flex: 1, p: 2, flexDirection: 'column', gap: 1 }}>
          <Typography variant={'h5'} component={'h2'} fontWeight={900}>
            Last Transactions
          </Typography>
          <Box>
            {transactions && transactions.length > 0 ? (
              transactions
                .slice(0, 5)
                .map((transaction, index) => <TransactionItem key={index} transaction={transaction} />)
            ) : (
              <Typography>No transactions yet</Typography>
            )}
          </Box>
          <Button
            variant={'text'}
            color={'inherit'}
            sx={{ alignSelf: 'flex-end' }}
            onClick={() => {
              navigate('/' + active + '/transactions');
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

export default TransactionsCard;
