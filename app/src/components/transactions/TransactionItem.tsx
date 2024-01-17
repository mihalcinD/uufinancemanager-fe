import { TransactionResponse } from '../../types/api/response/transactions.ts';
import { Box, Chip, Typography } from '@mui/material';
import { useTagsContext } from '../../context/TagsContext.tsx';
import BalanceIndicator from '../BalanceIndicator.tsx';

type Props = {
  transaction: TransactionResponse;
};
const TransactionItem = ({ transaction }: Props) => {
  const date = new Date(transaction.createdAt * 1000).toLocaleDateString();
  const { tags } = useTagsContext();
  return (
    <Box
      display={'flex'}
      py={1.5}
      borderBottom={1}
      borderColor={'#989898'}
      justifyContent={'space-between'}
      flexDirection={'row'}>
      <Box display={'flex'} flexDirection={'row'} gap={1.5} alignItems={'center'}>
        <Typography fontSize={'0.8rem'}>{date}</Typography>
        <Typography fontWeight={900}>{transaction.description}</Typography>
        <Box>
          {transaction.tags.map((tagID, index) => (
            <Chip label={tags?.filter(tag => tag._id === tagID)[0]?.name} key={index} />
          ))}
        </Box>
      </Box>
      <Box display={'flex'} flexDirection={'row'} gap={1.5} alignItems={'center'}>
        <Typography fontWeight={900}>{'CZK ' + Math.abs(transaction.value)}</Typography>
        <BalanceIndicator value={transaction.value} />
      </Box>
    </Box>
  );
};
export default TransactionItem;
