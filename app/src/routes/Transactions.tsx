import ContentWrapper from '../components/ContentWrapper.tsx';
import { Stack, Typography } from '@mui/material';
import { useTransactionsContext } from '../context/TransactionsContext.tsx';
import TransactionsList from '../components/transactions/TransactionsList.tsx';
import AddTransactionButton from '../components/transactions/AddTransactionButton.tsx';

const Transactions = () => {
  const { transactions } = useTransactionsContext();
  return (
    <ContentWrapper>
      <Stack p={2} direction="row" gap={2} justifyContent={'space-between'} flexWrap={'wrap'} alignItems={'center'}>
        <Typography variant={'h2'} fontWeight={900} p={2}>
          Transactions
        </Typography>
        <AddTransactionButton />
      </Stack>
      <TransactionsList transactions={transactions} />
    </ContentWrapper>
  );
};

export default Transactions;
