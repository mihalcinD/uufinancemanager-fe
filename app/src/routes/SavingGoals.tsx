import { useParams } from 'react-router-dom';

const SavingGoals = () => {
  const { id } = useParams<{ id: string }>();
  return <>Saving goals for family {id}</>;
};

export default SavingGoals;
