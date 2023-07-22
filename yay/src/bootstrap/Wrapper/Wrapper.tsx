import React from 'react';
import Navigation from '../Navigation/Navigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

export default function Wrapper() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <React.Fragment>
        <Navigation />
      </React.Fragment>
    </GestureHandlerRootView>
  );
}
