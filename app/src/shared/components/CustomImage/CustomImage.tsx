import React from 'react';
import {Image} from 'react-native';
import styled from 'styled-components';

interface Props {
  source: any;
  width: string;
  height: string;
}
const CustomSize = styled(Image)`
  width: ${props => props.width};
  height: ${props => props.height};
`;
export const CustomImage: React.FC<Props> = props => {
  return <CustomSize style={{resizeMode: 'contain'}} {...props} />;
};
