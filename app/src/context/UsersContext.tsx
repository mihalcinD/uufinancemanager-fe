import { createContext, useContext, useEffect, useState } from 'react';
import { useHouseholdsContext } from './HouseholdsContext';

export type User = {
  id: string;
  name: string;
  surname: string;
  email: string;
  password: string;
};

type UsersContextType = {
  users: User[];
  allUsers: User[];
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
    {
      id: 'google-oauth2|117921399124625958264',
      email: 'mihalcindavid@gmail.com',
      password: 'Heslo1234',
      name: 'Dávid',
      surname: 'Mihalčin',
    },
  ];
  useEffect(() => {
    if (!active && households) return;
    const activeHousehold = households?.find(household => household._id === active);
    let localUsers = activeHousehold?.membersIds.map(user => users.find(item => item.id === user));
    localUsers?.unshift(users.find(item => item.id === activeHousehold?.ownerId));
    if (!localUsers) return;
    const filtered = localUsers.filter(user => user !== undefined) as unknown as User[];
    setUsersInHousehold(filtered);
  }, [active, households]);
  return (
    <UsersContext.Provider value={{ allUsers: users, users: usersInHousehold, isLoading: false }}>{children}</UsersContext.Provider>
  );
};

export const UsersContext = createContext<UsersContextType>(undefined!);
