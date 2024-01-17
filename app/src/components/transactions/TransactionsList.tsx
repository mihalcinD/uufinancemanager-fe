import { TransactionsResponse } from '../../types/api/response/transactions.ts';
import { Paper, Typography } from '@mui/material';
import TransactionItem from './TransactionItem.tsx';

type Props = {
  transactions: TransactionsResponse | undefined;
};
const TransactionsList = ({ transactions }: Props) => {
  return (
    <Paper elevation={8} sx={{ p: 4 }}>
      {transactions && transactions.length > 0 ? (
        transactions.map((transaction, index) => <TransactionItem transaction={transaction} key={index} />)
      ) : (
        <Typography>No transactions</Typography>
      )}
    </Paper>
  );
};
export default TransactionsList;
