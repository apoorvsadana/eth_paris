import React from 'react';
import {styled} from 'styled-components';
import {SafeAreaView} from 'react-native-safe-area-context';

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #101321;
  padding: 10px;
`;

export default function ScreenContainer(props) {
  return <Container>{props.children}</Container>;
}
