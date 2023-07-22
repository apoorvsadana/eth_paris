import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Home from '../../Home/Home';

export default function Navigation() {
  return (
    <NavigationContainer>
      <Home />
    </NavigationContainer>
  );
}
