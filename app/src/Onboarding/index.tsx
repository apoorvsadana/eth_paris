import React from 'react';
import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';

import useAuth from '../Auth/hooks/useAuth';
import {
  WalletConnectModal,
  useWalletConnectModal,
} from '@walletconnect/modal-react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

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
  const {open, isConnected, address, provider} = useWalletConnectModal();
  return (
    <SafeAreaView style={styles.container}>
      <Button
        onPress={login}
        title="Learn More"
        color="#ffffff"
        accessibilityLabel="Learn more about this purple button"
      />
      {isConnected ? (
        <View>
          <Text>Connected to {address}</Text>
          <TouchableOpacity onPress={() => provider?.disconnect()}>
            <Text>Disconnect</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          onPress={() => {
            open();
            // login();
          }}>
          <Text>Connect</Text>
        </TouchableOpacity>
      )}

      <WalletConnectModal
        projectId={projectId}
        providerMetadata={providerMetadata}
      />
      <Text style={styles.text}>Onboarding</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'black',
  },
});
