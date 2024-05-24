import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import theme from '../styles/theme';
import ScheduleScreen from '../screens/ScheduleScreen';
import WeightChartScreen from '../screens/WeightChartScreen';
import IndividualAlbumScreen from '../screens/IndividualAlbumScreen';

export type RootStackParamList = {
  ScheduleScreen: undefined;
  WeightChartScreen: undefined;
  IndividualAlbumScreen: undefined;
};

const Tab = createMaterialTopTabNavigator<RootStackParamList>();

const IndividulaTopTab = () => {
  return (
    <Tab.Navigator
      initialRouteName={'ScheduleScreen'}
      screenOptions={{
        tabBarInactiveTintColor: 'black',
        tabBarActiveTintColor: theme.color.secondary,
        tabBarLabelStyle: {fontSize: 14},
        tabBarIndicatorStyle: {backgroundColor: theme.color.secondary},
      }}>
      <Tab.Screen
        name={'ScheduleScreen'}
        component={ScheduleScreen}
        options={{
          tabBarLabel: '기록',
        }}
      />
      <Tab.Screen
        name={'WeightChartScreen'}
        component={WeightChartScreen}
        options={{
          tabBarLabel: '체중',
        }}
      />
      <Tab.Screen
        name={'IndividualAlbumScreen'}
        component={IndividualAlbumScreen}
        options={{
          tabBarLabel: '앨범',
        }}
      />
    </Tab.Navigator>
  );
};

export default IndividulaTopTab;
