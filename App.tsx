import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import BottomTabBar from './src/components/BottomTabBar';
import {ThemeProvider} from '@emotion/react';
import theme from './src/styles/theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <BottomTabBar />
      </NavigationContainer>
    </ThemeProvider>
  );
};

let AppEntryPoint = App;

if (process.env.STORYBOOK_ENABLED) {
  AppEntryPoint = require('./.ondevice').default;
}

export default AppEntryPoint;
