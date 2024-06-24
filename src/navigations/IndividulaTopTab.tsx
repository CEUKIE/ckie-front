import React, {useEffect} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import theme from '../styles/theme';
import ScheduleScreen from '../screens/ScheduleScreen';
import WeightChartScreen from '../screens/WeightChartScreen';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList as RootNavigationParamList} from './RootNavigation';
import useIndividualStore from '../stores/useIndividualStore';
import useIndividualDetail from '../hooks/useIndividualDetail';

import CalendarIcon from '../assets/icons/calendar-icon.svg';
import ScaleIcon from '../assets/icons/scale-line-icon.svg';

export type RootStackParamList = {
  ScheduleScreen: undefined;
  WeightChartScreen: undefined;
};

interface IndividuanTopTabProps
  extends RouteProp<RootNavigationParamList, 'IndividualTopTab'> {}

const Tab = createMaterialTopTabNavigator<RootStackParamList>();

const IndividulaTopTab = () => {
  const {params} = useRoute<IndividuanTopTabProps>();
  const {data} = useIndividualDetail(params.individualId);
  const updateIndividual = useIndividualStore(state => state.updateIndividual);

  useEffect(() => {
    updateIndividual(data);
    console.log('indi top tab: ' + data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

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
          title: 'Schedule',
          tabBarShowLabel: false,
          tabBarIcon: ({color}) => (
            <CalendarIcon width={30} height={30} fill={color} />
          ),
        }}
      />
      <Tab.Screen
        name={'WeightChartScreen'}
        component={WeightChartScreen}
        options={{
          title: 'WeightChart',
          tabBarShowLabel: false,
          tabBarIcon: ({color}) => (
            <ScaleIcon width={30} height={30} fill={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default IndividulaTopTab;
