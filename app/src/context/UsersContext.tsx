import { createContext, useContext, useEffect, useState } from 'react';
import { useHouseholdsContext } from './HouseholdsContext';

type User = {
  id: string;
  name: string;
  surname: string;
  email: string;
  password: string;
};

type UsersContextType = {
  users: User[];
  isLoading: boolean;
};

export const useUsersContext = () => {
  return useContext(UsersContext);
};

interface UsersProviderProps {
  children: React.ReactNode;
}

export const UsersProvider = ({ children }: UsersProviderProps) => {
  const { active, households } = useHouseholdsContext();
  const [usersInHousehold, setUsersInHousehold] = useState<User[]>([]);

  const users: User[] = [
    {
      id: 'auth0|65561c19acfca2fa0a102bb5',
      email: 'test@test.com',
      password: 'Heslo1234',
      name: 'Jarda',
      surname: 'Okurka',
    },
    {
      id: 'google-oauth2|100723981934961506649',
      email: 'kubalucky762@gmail.com',
      password: 'Heslo1234',
      name: 'Jakub',
      surname: 'Šťastný',
    },
  ];
  useEffect(() => {
    if (!active && households) return;
    const activeHousehold = households?.find(household => household._id === active);
    let localUsers = activeHousehold?.membersIds.map(user => users.find(item => item.id === user));
    localUsers?.push(users.find(item => item.id === activeHousehold?.ownerId))
    if (!localUsers) return;
    const filtered = localUsers.filter(user => user !== undefined) as unknown as User[];
    setUsersInHousehold(filtered);
  }, [active, households]);
  return (
    <UsersContext.Provider value={{ users: usersInHousehold, isLoading: false }}>{children}</UsersContext.Provider>
  );
};

export const UsersContext = createContext<UsersContextType>(undefined!);
