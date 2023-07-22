import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Home</Text>
    </SafeAreaView>
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
