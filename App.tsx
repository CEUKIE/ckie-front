import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import BottomTabBar from './src/components/BottomTabBar';

const App = () => {
  return (
    <NavigationContainer>
      <BottomTabBar />
    </NavigationContainer>
  );
};

let AppEntryPoint = App;

if (process.env.STORYBOOK_ENABLED) {
  AppEntryPoint = require('./.ondevice').default;
}

export default AppEntryPoint;
