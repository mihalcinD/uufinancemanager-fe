import { useParams } from 'react-router-dom';

const Statistics = () => {
  const { id } = useParams<{ id: string }>();
  return <>Statistics for family {id}</>;
};

export default Statistics;
