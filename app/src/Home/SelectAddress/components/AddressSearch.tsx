import {View, Text, Platform} from 'react-native';
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import styled from 'styled-components';
import {TextInput} from 'react-native-gesture-handler';
import {CustomImage} from '../../../shared/components/CustomImage/CustomImage';

const MainContainer = styled(View)`
  flex-direction: row;
  border: 1px solid;
  border-radius: 12px;
  border-radius: 12px;
  background-color: #242424;
  align-items: center;
  justify-content: center;
`;

interface Props {
  placeholder: string;
  shouldShowSearchIcon?: boolean;
  handleOnChange: Dispatch<SetStateAction<string>>;
  value: string;
}

const AddressSearch: React.FC<Props> = props => {
  const {placeholder, value, handleOnChange} = props;
  const [validAddress, setValidAddress] = useState(false);
  const [inputFocussed, setInputFocussed] = useState(false);
  //   const verifyAddress = useCallback(() => {
  //     setInputFocussed(false);
  //     const res = checkValidity(value);
  //     if (res) {
  //       setValidAddress(true);
  //     } else {
  //       setValidAddress(false);
  //     }
  //   }, [checkValidity, value]);

  return (
    <MainContainer
      style={{
        borderColor:
          value.length < 66
            ? inputFocussed
              ? '#1A88FF'
              : '#3D3D3F'
            : validAddress
            ? '#31D0AA'
            : '#EE6A63',
        padding: Platform.OS === 'android' ? 6 : 12,
      }}>
      <View
        style={{
          flex: 0.075,
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: 'rgba(61, 61, 63, 1)',
            flex: 1,
            textAlignVertical: 'center',
            paddingTop: Platform.OS === 'android' ? 0 : 5,
          }}>
          To:
        </Text>
      </View>
      <View style={{flex: 1}}>
        <TextInput
          autoCorrect={false}
          cursorColor={'#1a88ff'}
          multiline={true}
          keyboardAppearance="dark"
          onChangeText={handleOnChange}
          maxLength={66}
          value={value}
          onBlur={() => setInputFocussed(false)}
          onFocus={() => {
            setInputFocussed(true);
          }}
          placeholder={placeholder}
          placeholderTextColor={'rgba(61, 61, 63, 1)'}
          style={{
            color: 'rgba(250, 250, 250, 1)',
          }}
        />
      </View>
    </MainContainer>
  );
};

export default AddressSearch;

AddressSearch.defaultProps = {
  placeholder: 'Search',
  shouldShowSearchIcon: true,
};
