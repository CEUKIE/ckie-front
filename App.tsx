import React from 'react';
import {Button, SafeAreaView} from 'react-native';

const App = () => {
  return (
    <SafeAreaView>
      <Button title="달팽이" />
    </SafeAreaView>
  );
};

let AppEntryPoint = App;

if (process.env.STORYBOOK_ENABLED) {
  AppEntryPoint = require('./.ondevice').default;
}

export default AppEntryPoint;
