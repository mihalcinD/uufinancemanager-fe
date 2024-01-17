import { useParams } from 'react-router-dom';
import ContentWrapper from '../components/ContentWrapper';
import { Paper, Typography } from '@mui/material';

const SavingGoal = () => {
  const { savingID } = useParams();

  return (
    <ContentWrapper>
      <Paper elevation={1} sx={{ width: '100%', p: 4 }}>
        <Typography variant={'h5'} component={'h2'} fontWeight={900} mb={3}>
          {savingID}
        </Typography>
      </Paper>
    </ContentWrapper>
  );
};

export default SavingGoal;
