import { createContext, useContext, useEffect, useMemo, JSX, useState } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';

type Props = {
  children: JSX.Element | JSX.Element[];
};

type DrawerContextType = {
  isOpen: boolean;
  toggleIsOpen: () => void;
};

export const useDrawerContext = () => {
  return useContext(DrawerContext);
};

export const DrawerContext = createContext<DrawerContextType>(undefined!);

export const DrawerProvider = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('lg'));

  const toggleIsOpen = () => {
    setIsOpen(prevState => !prevState);
  };
  useEffect(() => {
    if (isMediumScreen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, [isMediumScreen]);

  return <DrawerContext.Provider value={{ isOpen, toggleIsOpen }}>{children}</DrawerContext.Provider>;
};
