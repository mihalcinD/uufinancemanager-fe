import { useParams } from 'react-router-dom';
import ContentWrapper from '../components/ContentWrapper';
import { Paper, Skeleton, Stack, Typography } from '@mui/material';
import useSavingGoal from '../hooks/api/useSavingGoal.ts';
import TransferButton from '../components/savingGoals/TransferButton.tsx';
import TransactionItem from '../components/transactions/TransactionItem.tsx';

const SavingGoal = () => {
  const { savingID } = useParams();
  const { savingGoal, transactions, createTransaction, isLoading, isLoadingTransactions } = useSavingGoal({
    savingGoalID: savingID,
  });

  const transferToSavingGoal = (value: number) => {
    return createTransaction({ value, description: 'Transfer to ' + savingGoal?.name });
  };
  return (
    <ContentWrapper>
      <>
        {isLoading || isLoadingTransactions ? (
          <Skeleton width={'100%'} height={400} />
        ) : (
          savingGoal && (
            <Paper elevation={1} sx={{ width: '100%', p: 4 }}>
              <Stack direction="row" gap={2} justifyContent={'space-between'} flexWrap={'wrap'} alignItems={'center'}>
                <Typography variant={'h5'} component={'h2'} fontWeight={900}>
                  {savingGoal.name}
                </Typography>
                <TransferButton transfer={transferToSavingGoal} />
              </Stack>
              <Stack direction="row" gap={2} flexWrap={'wrap'} alignItems={'center'} my={3}>
                <Typography variant={'h4'} component={'h2'} fontWeight={900}>
                  {'CZK ' +
                    savingGoal.currentBalance +
                    ' | ' +
                    Math.floor((savingGoal.currentBalance / savingGoal.goal) * 100) +
                    ' %'}
                </Typography>
              </Stack>
              {transactions && transactions.length > 0 ? (
                transactions.map((transaction, index) => <TransactionItem transaction={transaction} key={index} />)
              ) : (
                <Typography>No transactions yet</Typography>
              )}
            </Paper>
          )
        )}
      </>
    </ContentWrapper>
  );
};

export default SavingGoal;
