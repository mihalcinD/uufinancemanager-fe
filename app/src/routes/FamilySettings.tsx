import { useParams } from 'react-router-dom';

const FamilySettings = () => {
  const { id } = useParams<{ id: string }>();
  return <>Settings for family {id}</>;
};

export default FamilySettings;
