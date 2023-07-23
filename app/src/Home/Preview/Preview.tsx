import {Text, View} from 'react-native';
import React, {useMemo, useState} from 'react';
import ScreenContainer from '../../shared/components/ScreenContainer/ScreenContainer';
import {useWalletConnectModal} from '@walletconnect/modal-react-native';
import {ethers} from 'ethers';

import {signMessage} from '../../shared/utils/MethodUtil';
import CTA from '../../shared/components/CTA/CTA';
import {styled} from 'styled-components';
import {MainHeading} from '../../shared/components/Typography';
import useDataStore from '../../state/dataStore';
import {truncate} from '../../shared/utils/truncate';
import {get, post} from '../../services';

const FixedContainer = styled(View)`
  position: absolute;
  bottom: 30px;
  width: 100%;
  align-self: center;
`;

const DetailsCard = styled(View)`
  background-color: #293657;
  padding: 16px;
  border-radius: 12px;
  gap: 10px;
`;

const DataTitle = styled(Text)`
  font-size: 14px;
  color: white;
`;

const DataValue = styled(Text)`
  font-size: 14px;
  color: white;
`;

const DataContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
`;

export default function Preview(props) {
  const {navigation} = props;
  const {provider} = useWalletConnectModal();
  const recepientAddress = useDataStore(state => state.recepientAddress);
  const userAddress = useDataStore(state => state.userAddress);

  const transferAmount = useDataStore(state => state.transferAmount);
  const setTransactionHash = useDataStore(state => state.setTransactionHash);
  const [loading, setLoading] = useState(false);
  const web3Provider = useMemo(
    () => (provider ? new ethers.providers.Web3Provider(provider) : undefined),
    [provider],
  );

  const wrapRpcRequest = async (message: string) => {
    if (!web3Provider) {
      console.log('wallet provider not present');
      return;
    }
    try {
      setLoading(true);
      const result = await signMessage({web3Provider, message});
      return result.result;
    } catch (error: any) {
      console.log('RPC request failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignRequest = async () => {
    try {
      const response = await get({
        amount: transferAmount,
        recepient: recepientAddress,
      });
      if (response.data.txnHash) {
        setTransactionHash(response.data.txnHash);
        const signature = await wrapRpcRequest(response.data.txnHash);
        await post({
          amount: transferAmount,
          recepient: recepientAddress,
          signature: signature,
        });
        navigation.push('Success');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ScreenContainer>
      <MainHeading>Transaction Preview</MainHeading>
      <DetailsCard>
        <DataContainer>
          <DataTitle>From:</DataTitle>
          <DataValue>{truncate(userAddress, 16)}</DataValue>
        </DataContainer>
        <DataContainer>
          <DataTitle>To:</DataTitle>
          <DataValue>{recepientAddress}</DataValue>
        </DataContainer>
        <DataContainer>
          <DataTitle>Amount:</DataTitle>
          <DataValue>{transferAmount}</DataValue>
        </DataContainer>
        <DataContainer>
          <DataTitle>Token:</DataTitle>
          <DataValue>ETH</DataValue>
        </DataContainer>
      </DetailsCard>
      <FixedContainer>
        <CTA onPress={() => handleSignRequest()} title="Confirm" />
      </FixedContainer>
    </ScreenContainer>
  );
}
