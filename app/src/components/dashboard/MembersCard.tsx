import { Paper, Skeleton, Typography } from '@mui/material';

type Props = {
  isLoading?: boolean;
};
const MembersCard = ({ isLoading }: Props) => {
  return (
    <>
      {isLoading ? (
        <Skeleton variant="rounded" sx={{ display: 'flex', flex: 1, height: 300 }} />
      ) : (
        <Paper elevation={8} sx={{ display: 'flex', flex: 1, p: 2, flexDirection: 'column', gap: 2, height: 300 }}>
          <Typography variant={'h5'} component={'h2'} fontWeight={900}>
            Members
          </Typography>
        </Paper>
      )}
    </>
  );
};

export default MembersCard;
