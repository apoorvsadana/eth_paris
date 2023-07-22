import React, {useCallback, useRef, useState} from 'react';
import {
  Button,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {styled} from 'styled-components';
import ScreenContainer from '../shared/components/ScreenContainer/ScreenContainer';

const AmountContainer = styled(Pressable)`
  flex-direction: row;
  justify-content: center;
  margin: 5px;
`;

const AmountInputContainer = styled(View)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-height: 80px;
`;

const AmountInput = styled(TextInput)`
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
`;

const KeypadContainer = styled(View)`
  flex-direction: column;
`;

const NumberContainer = styled(View)`
  flex-direction: row;
`;

const Number = styled(Text)`
  flex: 1;
  color: white;
  text-align: center;
  font-size: 38px;
`;

export default function Amount(props) {
  const {navigation} = props;
  const [enteredAmount, setEnteredAmount] = useState('0');

  const handleAmountChange = useCallback((data: string) => {
    setEnteredAmount(data);
  }, []);

  const handleOnPress = () => {
    textInputRef.current.focus();
  };

  const textInputRef = useRef(null);
  return (
    <ScreenContainer>
      <Text style={styles.text}>Swap</Text>
      <AmountContainer>
        <View style={{flex: 1}} />
        <Pressable
          style={{
            flex: 6,
            alignItems: 'center',
            padding: 20,
          }}>
          <AmountInputContainer>
            <AmountInput
              numberOfLines={1}
              allowFontScaling
              keyboardType="numeric"
              placeholder={`0.0`}
              placeholderTextColor="#808080"
              value={enteredAmount}
              keyboardAppearance="dark"
              onChangeText={d => {
                handleAmountChange(d);
              }}
              ref={textInputRef}
              style={{fontSize: 40}}
              autoFocus
            />
            <Text
              onPress={handleOnPress}
              numberOfLines={1}
              adjustsFontSizeToFit
              style={{fontSize: 40, fontWeight: '700', color: 'white'}}>
              {/* {enteredAmount.length === 0
                ? '0.0' + ' ' + (isDollarFocussed ? '$' : coin.unit)
                : (isDollarFocussed ? dollarValue : coinValue) +
                  ' ' +
                  (isDollarFocussed ? '$' : coin.unit)} */}
              {enteredAmount}
            </Text>
          </AmountInputContainer>
          <AmountInputContainer>
            <AmountInput
              numberOfLines={1}
              allowFontScaling
              keyboardType="numeric"
              placeholder={`0.0`}
              placeholderTextColor="#808080"
              value={enteredAmount}
              keyboardAppearance="dark"
              onChangeText={d => {
                handleAmountChange(d);
              }}
              ref={textInputRef}
              style={{fontSize: 40}}
              autoFocus
            />
            <Text
              onPress={handleOnPress}
              numberOfLines={1}
              adjustsFontSizeToFit
              style={{fontSize: 40, fontWeight: '700', color: 'white'}}>
              {/* {enteredAmount.length === 0
                ? '0.0' + ' ' + (isDollarFocussed ? '$' : coin.unit)
                : (isDollarFocussed ? dollarValue : coinValue) +
                  ' ' +
                  (isDollarFocussed ? '$' : coin.unit)} */}
              {enteredAmount}
            </Text>
          </AmountInputContainer>
          {/* <ConvertedValue>
            {!isDollarFocussed ? '$' : coin.unit}{' '}
            {!isDollarFocussed ? dollarValue : coinValue}
          </ConvertedValue> */}
        </Pressable>
      </AmountContainer>
      <KeypadContainer>
        <NumberContainer>
          <Number>1</Number>
          <Number>2</Number>
          <Number>3</Number>
        </NumberContainer>
        <NumberContainer>
          <Number>4</Number>
          <Number>5</Number>
          <Number>6 </Number>
        </NumberContainer>
        <NumberContainer>
          <Number>7</Number>
          <Number>8</Number>
          <Number>9</Number>
        </NumberContainer>
      </KeypadContainer>
      <Button onPress={() => navigation.push('Preview')} title="next" />
      <Button onPress={() => navigation.pop()} title="go back" />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  text: {
    color: 'black',
  },
});
