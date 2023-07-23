import React, {useCallback, useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {styled} from 'styled-components';
import ScreenContainer from '../../shared/components/ScreenContainer/ScreenContainer';
import {MainHeading} from '../../shared/components/Typography';
import CTA from '../../shared/components/CTA/CTA';
import {textClick} from '../../shared/utils/haptics';
import useDataStore from '../../state/dataStore';

const AmountContainer = styled(Pressable)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 5px;
`;

const ContentContainer = styled(View)`
  flex: 1;
  margin-bottom: 50px;
`;

const FixedContainer = styled(View)`
  position: absolute;
  bottom: 30px;
  width: 100%;
  align-self: center;
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
  flex: 1;
`;

const Number = styled(Text)`
  flex: 1;
  color: white;
  text-align: center;
  font-size: 38px;
`;

export default function Amount(props) {
  const {navigation} = props;
  const [enteredAmount, setEnteredAmount] = useState('');
  const numInputs = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];
  const setTransferAmount = useDataStore(state => state.setTransferAmount);

  const handleAmountChange = useCallback((data: string) => {
    setEnteredAmount(data);
  }, []);

  const handleNumberPress = (value: string) => {
    textClick();
    setEnteredAmount(prev => prev + value);
  };

  const handleBackSpace = () => {
    setEnteredAmount(prev => prev.substring(0, prev.length - 1));
  };

  return (
    <ScreenContainer>
      <MainHeading>Enter Amount</MainHeading>
      <ContentContainer>
        <AmountContainer style={{flex: 1}}>
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
                style={{fontSize: 40}}
              />
              <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                style={{
                  fontSize: 40,
                  fontWeight: '700',
                  color: enteredAmount.length > 0 ? 'white' : '#293657',
                }}>
                {enteredAmount.length > 0 ? enteredAmount : '0'}
              </Text>
            </AmountInputContainer>
          </Pressable>
        </AmountContainer>
        <KeypadContainer style={{flex: 1}}>
          {numInputs.map((eachNumArray, index) => (
            <NumberContainer key={index}>
              {eachNumArray.map(eachNum => (
                <Number
                  key={eachNum}
                  onPress={() => handleNumberPress(eachNum.toString())}>
                  {eachNum}
                </Number>
              ))}
            </NumberContainer>
          ))}
          <NumberContainer>
            <Number onPress={() => handleNumberPress('.')}>.</Number>
            <Number onPress={() => handleNumberPress('0')}>0</Number>
            <Number
              onLongPress={() => setEnteredAmount('')}
              onPress={handleBackSpace}>
              {'<-'}
            </Number>
          </NumberContainer>
        </KeypadContainer>
      </ContentContainer>

      <FixedContainer>
        <CTA
          title="Next"
          onPress={() => {
            setTransferAmount(parseFloat(enteredAmount));
            navigation.push('Preview');
          }}
          disabled
        />
      </FixedContainer>
    </ScreenContainer>
  );
}
