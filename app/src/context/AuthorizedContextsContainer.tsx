import { JSX } from 'react';
import { HouseholdsProvider } from './HouseholdsContext.tsx';
import { HouseholdProvider } from './HouseholdContext.tsx';
import { TransactionsProvider } from './TransactionsContext.tsx';
import { SavingGoalsProvider } from './SavingGoalsContext.tsx';
import { StatisticsProvider } from './StatisticsContext.tsx';
import { TagsProvider } from './TagsContext.tsx';

type Props = {
  children: JSX.Element | JSX.Element[];
};

const AuthorizedContextsContainer = ({ children }: Props) => {
  return (
    <HouseholdsProvider>
      <HouseholdProvider>
        <TagsProvider>
          <TransactionsProvider>
            <SavingGoalsProvider>
              <StatisticsProvider>{children}</StatisticsProvider>
            </SavingGoalsProvider>
          </TransactionsProvider>
        </TagsProvider>
      </HouseholdProvider>
    </HouseholdsProvider>
  );
};

export default AuthorizedContextsContainer;
