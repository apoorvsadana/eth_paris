import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Loading from '../../Loading/Loading';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {styled} from 'styled-components';
import {View} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import NavigationContext from './Navigation.context';
import Onboarding from '../../Onboarding';
import Address from '../../Home/SelectAddress/Address';
import Amount from '../../Home/EnterAmount/Amount';
import Success from '../../Home/Success/Success';
import Preview from '../../Home/Preview/Preview';

const FlexContainer = styled(View)`
  flex: 1;
  background-color: black;
`;

const RootStack = createNativeStackNavigator();
const SendStack = createNativeStackNavigator();

const SendFlow: React.FC<{props: any}> = props => {
  return (
    <SendStack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: '#000000',
        },
      }}>
      <SendStack.Screen name="Success" component={Success} />
      <SendStack.Screen name="Address" component={Address} />
      <SendStack.Screen name="Amount" component={Amount} />
      <SendStack.Screen name="Preview" component={Preview} />
    </SendStack.Navigator>
  );
};

const AppScreens: React.FC<{stack: any}> = ({stack}) => {
  const getCurrentStack = useCallback((): React.ReactNode => {
    switch (stack) {
      case 'app':
        return (
          <React.Fragment>
            <RootStack.Screen name="Send" component={SendFlow} />
          </React.Fragment>
        );
      case 'loading':
        return (
          <React.Fragment>
            <RootStack.Screen name="Loading" component={Loading} />
          </React.Fragment>
        );

      case 'login':
        return (
          <React.Fragment>
            <RootStack.Screen name="Onboarding" component={Onboarding} />
          </React.Fragment>
        );
      default:
        return null;
    }
  }, [stack]);

  return (
    <FlexContainer>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: '#000000',
          },
        }}>
        {getCurrentStack()}
      </RootStack.Navigator>
    </FlexContainer>
  );
};

export default function Navigation() {
  const [stack, setStack] = useState<any>('login');

  const navigationContextValue = useMemo(
    () => ({stack, setStack}),
    [stack, setStack],
  );

  useEffect(() => {
    setTimeout(() => {
      RNBootSplash.hide();
    }, 2000);
  }, []);

  return (
    <NavigationContainer>
      <NavigationContext.Provider value={navigationContextValue}>
        <AppScreens stack={stack} />
      </NavigationContext.Provider>
    </NavigationContainer>
  );
}
