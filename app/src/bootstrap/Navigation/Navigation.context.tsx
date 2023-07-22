import React, {useContext} from 'react';

export type Stacks = 'app' | 'login' | 'loading';

export interface NavigationContextProps {
  stack: Stacks;
  setStack: React.Dispatch<React.SetStateAction<Stacks>>;
}

const NavigationContext = React.createContext<NavigationContextProps>({
  stack: 'login',
  setStack: () => {
    //do nothing
  },
});

export const useNavigationContext = (): NavigationContextProps => {
  const navigationContext = useContext(NavigationContext);
  if (navigationContext === undefined) {
    throw new Error(
      'useNavigationContext must be used within a NavigationProvider',
    );
  }

  return navigationContext;
};

export default NavigationContext;
