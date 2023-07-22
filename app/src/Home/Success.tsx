import {Button, Text} from 'react-native';
import React from 'react';
import ScreenContainer from '../shared/components/ScreenContainer/ScreenContainer';

export default function Success(props) {
  const {navigation} = props;
  return (
    <ScreenContainer>
      <Text>Success</Text>
      <Button onPress={() => navigation.pop()} title="go back" />
    </ScreenContainer>
  );
}
