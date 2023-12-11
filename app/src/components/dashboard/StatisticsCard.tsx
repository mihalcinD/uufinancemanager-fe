import { Paper, Skeleton } from '@mui/material';

type Props = {
  isLoading?: boolean;
};
const StatisticsCard = ({ isLoading }: Props) => {
  return (
    <>
      {isLoading ? (
        <Skeleton variant="rounded" sx={{ display: 'flex', flex: 4 }} />
      ) : (
        <Paper elevation={8} sx={{ display: 'flex', flex: 4 }} />
      )}
    </>
  );
};

export default StatisticsCard;
