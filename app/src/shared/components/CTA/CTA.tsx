import {Pressable, Text} from 'react-native';
import React from 'react';
import {styled} from 'styled-components';
import {textClick} from '../../utils/haptics';

const StyledButton = styled(Pressable)`
  background-color: ${props => (props.disabled ? '#293657' : '#d63171')};
  width: 100%;
  padding: 16px;
  border-radius: 30px;
  margin: 5px 0px;
`;

const ButtonText = styled(Text)`
  color: #fff;
  text-align: center;
  font-size: 16px;
`;

interface Props {
  title: string;
  onPress: () => void;
  disabled: boolean;
}

const CTA: React.FC<Props> = props => {
  const {title, onPress} = props;
  return (
    <StyledButton
      {...props}
      onPress={() => {
        textClick();
        onPress();
      }}>
      <ButtonText>{title.toUpperCase()}</ButtonText>
    </StyledButton>
  );
};

export default CTA;
