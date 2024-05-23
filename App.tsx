import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from '@emotion/react';
import 'react-native-gesture-handler';

import theme from './src/styles/theme';
import RootNavigation from './src/stacks/RootNavigation';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer independent>
        <RootNavigation />
      </NavigationContainer>
    </ThemeProvider>
  );
};

let AppEntryPoint = App;

if (process.env.STORYBOOK_ENABLED) {
  AppEntryPoint = require('./.ondevice').default;
}

export default AppEntryPoint;
