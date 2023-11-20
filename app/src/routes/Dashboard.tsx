import { useParams } from 'react-router-dom';

const Dashboard = () => {
  const { id } = useParams<{ id: string }>();
  return <>Dashboard for family {id}</>;
};

export default Dashboard;
