import React, {useEffect} from 'react';
import {Image, View} from 'react-native';

import useAuth from '../Auth/hooks/useAuth';
import {
  WalletConnectModal,
  useWalletConnectModal,
} from '@walletconnect/modal-react-native';
import useDataStore from '../state/dataStore';
import ScreenContainer from '../shared/components/ScreenContainer/ScreenContainer';
import CTA from '../shared/components/CTA/CTA';
import Logo from './assets/productLogo.png';

const projectId = '96db474090ba81b7e14d5b5e8102f269';

const providerMetadata = {
  name: 'eth_paris',
  description: 'Scan qrcode to connect',
  url: 'https://walletconnect.org',
  icons: ['https://walletconnect.org/walletconnect-logo.png'],
  redirect: {
    native: 'com.demoapp.eth',
  },
};

export default function Onboarding() {
  const {login} = useAuth();
  const {open, isConnected, address, close} = useWalletConnectModal();
  const setUserAddress = useDataStore(state => state.setUserAddress);

  useEffect(() => {
    if (isConnected && address) {
      close();
      setUserAddress(address);
      login();
    }
  }, [isConnected, login, setUserAddress, address, close]);

  return (
    <ScreenContainer
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {!isConnected ? (
        <>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={Logo}
              style={{margin: 10, width: 145, height: 145}}
            />
            <CTA title="Connect Wallet" onPress={() => open()} />
          </View>
          <WalletConnectModal
            projectId={projectId}
            providerMetadata={providerMetadata}
          />
        </>
      ) : null}
    </ScreenContainer>
  );
}
