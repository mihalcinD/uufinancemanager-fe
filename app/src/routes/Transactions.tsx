import ContentWrapper from '../components/ContentWrapper.tsx';
import { Typography } from '@mui/material';
import { useTransactionsContext } from '../context/TransactionsContext.tsx';
import TransactionsList from '../components/transactions/TransactionsList.tsx';

const Transactions = () => {
  const { transactions } = useTransactionsContext();
  return (
    <ContentWrapper>
      <Typography variant={'h2'} fontWeight={900} p={2}>
        Transactions
      </Typography>
      <TransactionsList transactions={transactions} />
    </ContentWrapper>
  );
};

export default Transactions;
