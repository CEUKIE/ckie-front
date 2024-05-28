import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from '@emotion/react';
import 'react-native-gesture-handler';

import theme from './src/styles/theme';
import RootNavigation from './src/navigations/RootNavigation';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        throwOnError: true,
        retry: 0,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <NavigationContainer independent>
          <RootNavigation />
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

let AppEntryPoint = App;

if (process.env.STORYBOOK_ENABLED) {
  AppEntryPoint = require('./.ondevice').default;
}

export default AppEntryPoint;
