import {Image, Linking, Pressable, Text, View} from 'react-native';
import React from 'react';
import ScreenContainer from '../../shared/components/ScreenContainer/ScreenContainer';
import {styled} from 'styled-components';
import CTA from '../../shared/components/CTA/CTA';
import useDataStore from '../../state/dataStore';

const BigHeading = styled(Text)`
  font-size: 40px;
  color: white;
  text-align: center;
  font-weight: 500;
`;

const Amount = styled(Text)`
  font-size: 64px;
  color: white;
  text-align: center;
  font-weight: 500;
`;

const FixedContainer = styled(View)`
  position: absolute;
  bottom: 30px;
  width: 100%;
  align-self: center;
`;

const SecondaryButtonContainer = styled(Pressable)`
  text-align: center;
  padding: 10px;
`;
const SecondaryButtonText = styled(Text)`
  text-align: center;
  color: white;
  font-size: 20px;
`;

const Container = styled(View)`
  justify-content: space-between;
  align-items: center;
  flex: 1;
`;

export default function Success(props) {
  const {navigation} = props;
  const transferAmount = useDataStore(state => state.transferAmount);
  const url = 'https://goerli.voyager.online/tx/';
  const transactionHash = useDataStore(state => state.transactionHash);
  const handleNavigateToExplorer = () => {
    Linking.openURL(url + transactionHash);
  };
  return (
    <ScreenContainer>
      <Container>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('./assets/success.png')}
            style={{marginTop: 50}}
          />
          <View style={{marginTop: 50}}>
            <BigHeading>Success</BigHeading>
            <View
              style={{
                alignItems: 'baseline',
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <Amount style={{marginRight: 10}}>{transferAmount}</Amount>
              <BigHeading style={{color: '#3b4d7d'}}>ETH</BigHeading>
            </View>
          </View>
        </View>
        <View style={{width: '100%'}}>
          <CTA title="Done" onPress={() => navigation.popToTop()} />
          <SecondaryButtonContainer onPress={handleNavigateToExplorer}>
            <SecondaryButtonText>View in explorer</SecondaryButtonText>
          </SecondaryButtonContainer>
        </View>
      </Container>
      {/* <FixedContainer></FixedContainer> */}
    </ScreenContainer>
  );
}
