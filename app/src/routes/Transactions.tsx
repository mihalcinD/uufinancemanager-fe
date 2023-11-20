import { useParams } from 'react-router-dom';

const Transactions = () => {
  const { id } = useParams<{ id: string }>();
  return <>Transactions for family {id}</>;
};

export default Transactions;
