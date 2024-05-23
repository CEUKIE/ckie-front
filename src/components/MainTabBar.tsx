import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// icon
import CageIcon from '../assets/icons/cage.svg';
import HomeIcon from '../assets/icons/home-fill.svg';
import TempIcon from '../assets/icons/temp-hot-line.svg';

import CageManagementScreen from '../screens/CageManagementScreen';
import MyPage from '../screens/MyPage';
import {MainTabType} from '../types';
import {Image, Platform, View} from 'react-native';
import IndividualManagementScreen from '../screens/IndividualManagamentScreen';

export type RootStackParamList = {
  CageManagementScreen: undefined;
  IndividualManagementScreen: undefined;
  MyPage: undefined;
};

const elements: MainTabType.MainTabElement[] = [
  {
    name: 'CageManagementScreen',
    title: '사육장',
    component: CageManagementScreen,
    SVGIcon: CageIcon,
  },
  {
    name: 'IndividualManagementScreen',
    title: '개체',
    component: IndividualManagementScreen,
    SVGIcon: TempIcon,
  },
  {
    name: 'MyPage',
    title: '마이페이지',
    component: MyPage,
    SVGIcon: HomeIcon,
  },
];

const MainTab = () => {
  const Tab = createBottomTabNavigator<RootStackParamList>();

  return (
    <Tab.Navigator
      initialRouteName={'CageManagementScreen'}
      screenOptions={{
        tabBarActiveTintColor: '#FFC25C',
      }}>
      {elements.map(e => (
        <Tab.Screen
          key={e.name}
          name={e.name}
          component={e.component}
          options={{
            headerStatusBarHeight: Platform.OS === 'ios' ? 58 : 16,
            headerLeft: () => (
              <View style={{paddingBottom: 20, paddingLeft: 16}}>
                <Image
                  style={{width: 86, height: 43, paddingLeft: 10}}
                  src={'https://image.ckie.store/images/header-logo.png'}
                />
              </View>
            ),
            headerTitle: () => <></>,
            title: e.title,
            tabBarIcon: ({color, size}) => (
              <e.SVGIcon width={size} height={size} fill={color} />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default MainTab;
