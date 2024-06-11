import React from 'react';
import {
  StackNavigationOptions,
  createStackNavigator,
} from '@react-navigation/stack';

import theme from '../styles/theme';
import BackArrowIcon from '../assets/icons/arrow-left-icon.svg';
import BluetoothConnectScreen from '../screens/BluetoothConnectScreen';
import CageInfoInputScreen from '../screens/CageInfoInputScreen';
import WifiInfoScreen from '../screens/WifiInfoScreen';
import CageSpeciesSelectScreen from '../screens/CageSpeciesSelectScreen';

export type RootStackParamList = {
  BluetoothConnectScreen: undefined;
  CageInfoInputScreen: undefined;
  WifiInfoScreen: undefined;
  CageSpeciesSelectScreen: {
    setSpeciesLabel: React.Dispatch<React.SetStateAction<string>>;
  };
};

const Stack = createStackNavigator<RootStackParamList>();

export const inputScreenHeaderOption: StackNavigationOptions = {
  headerTitle: ' ',
  headerShadowVisible: false,
  headerBackImage: () => (
    <BackArrowIcon width={32} height={32} fill={theme.color.black} />
  ),
};

const CageRegistrationStack = () => {
  return (
    <Stack.Navigator initialRouteName={'BluetoothConnectScreen'}>
      <Stack.Screen
        name={'BluetoothConnectScreen'}
        component={BluetoothConnectScreen}
        options={inputScreenHeaderOption}
      />
      <Stack.Screen
        name={'CageInfoInputScreen'}
        component={CageInfoInputScreen}
        options={inputScreenHeaderOption}
      />
      <Stack.Screen
        name={'WifiInfoScreen'}
        component={WifiInfoScreen}
        options={inputScreenHeaderOption}
      />
      <Stack.Screen
        name={'CageSpeciesSelectScreen'}
        component={CageSpeciesSelectScreen}
        options={inputScreenHeaderOption}
      />
    </Stack.Navigator>
  );
};

export default CageRegistrationStack;
