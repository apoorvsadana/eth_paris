import {View, Platform} from 'react-native';
import React, {Dispatch, SetStateAction} from 'react';
import styled from 'styled-components';
import {TextInput} from 'react-native-gesture-handler';
import {CustomImage} from '../CustomImage/CustomImage';

const MainContainer = styled(View)`
  flex-direction: row;
  border: 1px solid rgba(61, 61, 63, 1);
  border-radius: 12px;
  margin-bottom: 10px;
  align-items: center;
`;

interface Props {
  placeholder: string;
  shouldShowSearchIcon?: boolean;
  handleOnChange: Dispatch<SetStateAction<string>>;
  text: string;
}

const Searchbar: React.FC<Props> = props => {
  const {placeholder, shouldShowSearchIcon, text, handleOnChange} = props;

  return (
    <MainContainer style={{padding: Platform.OS === 'android' ? 0 : 10}}>
      {shouldShowSearchIcon && (
        <CustomImage
          source={require('./assets/Search.png')}
          width={'15px'}
          height={'15px'}
          style={{margin: 10}}
        />
      )}
      <TextInput
        keyboardAppearance="dark"
        onChangeText={handleOnChange}
        value={text}
        placeholder={placeholder}
        placeholderTextColor={'rgba(61, 61, 63, 1)'}
        style={{color: 'rgba(250, 250, 250, 1)'}}
      />
    </MainContainer>
  );
};

export default Searchbar;

Searchbar.defaultProps = {
  placeholder: 'Search',
  shouldShowSearchIcon: true,
};
