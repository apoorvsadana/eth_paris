import {View, Text, Button} from 'react-native';
import React from 'react';
import ScreenContainer from '../shared/components/ScreenContainer/ScreenContainer';

export default function Preview(props) {
  const {navigation} = props;
  return (
    <ScreenContainer>
      <Text>Preview</Text>
      <Button onPress={() => navigation.push('Success')} title="next" />
      <Button onPress={() => navigation.pop()} title="go back" />
    </ScreenContainer>
  );
}
