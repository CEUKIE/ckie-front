import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import CageTemperatureScreen from '../screens/CageTemperatureScreen';
import CageHumidityScreen from '../screens/CageHumidityScreen';
import CagePhotoScreen from '../screens/CagePhotoScreen';
import theme from '../styles/theme';

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
          tabBarLabel: '온도',
        }}
      />
      <Tab.Screen
        name={'CageHumidityScreen'}
        component={CageHumidityScreen}
        options={{
          tabBarLabel: '습도',
        }}
      />
      <Tab.Screen
        name={'CagePhotoScreen'}
        component={CagePhotoScreen}
        options={{
          tabBarLabel: '사진',
        }}
      />
    </Tab.Navigator>
  );
};

export default CageTopTab;
