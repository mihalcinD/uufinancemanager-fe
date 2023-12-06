import { JSX } from 'react';
import { HouseholdsProvider } from './HouseholdsContext.tsx';

type Props = {
  children: JSX.Element | JSX.Element[];
};

const AuthorizedContextsContainer = ({ children }: Props) => {
  return <HouseholdsProvider>{children}</HouseholdsProvider>;
};

export default AuthorizedContextsContainer;
