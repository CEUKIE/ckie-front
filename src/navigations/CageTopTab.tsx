import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import CageTemperatureScreen from '../screens/CageTemperatureScreen';
import CageHumidityScreen from '../screens/CageHumidityScreen';
import CagePhotoScreen from '../screens/CagePhotoScreen';
import theme from '../styles/theme';

import TempIcon from '../assets/icons/temp-hot-line.svg';
import HumidityIcon from '../assets/icons/humidity-icon.svg';
import AlbumIcon from '../assets/icons/image-icon.svg';

export type RootStackParamList = {
  CageTemperatureScreen: undefined;
  CageHumidityScreen: undefined;
  CagePhotoScreen: undefined;
};

const Tab = createMaterialTopTabNavigator<RootStackParamList>();

const CageTopTab = () => {
  return (
    <Tab.Navigator
      initialRouteName={'CageTemperatureScreen'}
      screenOptions={{
        tabBarInactiveTintColor: 'black',
        tabBarActiveTintColor: theme.color.secondary,
        tabBarLabelStyle: {fontSize: 14},
        tabBarIndicatorStyle: {backgroundColor: theme.color.secondary},
      }}>
      <Tab.Screen
        name={'CageTemperatureScreen'}
        component={CageTemperatureScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({color}) => (
            <TempIcon width={30} height={30} fill={color} />
          ),
        }}
      />
      <Tab.Screen
        name={'CageHumidityScreen'}
        component={CageHumidityScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({color}) => (
            <HumidityIcon width={30} height={30} fill={color} />
          ),
        }}
      />
      <Tab.Screen
        name={'CagePhotoScreen'}
        component={CagePhotoScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({color}) => (
            <AlbumIcon width={30} height={30} fill={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default CageTopTab;
