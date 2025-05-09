import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import HomeScreen from '../screens/HomeScreen';

export default function MainApp() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
      <StatusBar barStyle="light-content" />
      <HomeScreen/>
    </SafeAreaView>
  );
}
