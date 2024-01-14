import { TransactionResponse } from '../../../types/api/response/transactions.ts';
import { Box, Typography } from '@mui/material';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';

type Props = {
  transaction: TransactionResponse;
};
const TransactionItem = ({ transaction }: Props) => {
  return (
    <Box display={'flex'} gap={1} alignItems={'center'}>
      <ArrowDropDownCircleIcon
        sx={{ color: transaction.value > 0 ? '#27c947' : '#c92727', rotate: transaction.value > 0 ? '180deg' : '0deg' }}
        fontSize={'small'}
      />
      <Box
        display={'flex'}
        borderBottom={0.5}
        flex={1}
        borderColor={'#989898'}
        py={1.5}
        gap={0.5}
        justifyContent={'space-between'}>
        <Typography>{transaction.description}</Typography>
        <Typography fontWeight={600}>{'CZK ' + Math.abs(transaction.value)}</Typography>
      </Box>
    </Box>
  );
};
export default TransactionItem;
