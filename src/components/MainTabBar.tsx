import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// icon
import CalendarIcon from '../assets/icons/calendar-icon.svg';
import TempIcon from '../assets/icons/temp-hot-line.svg';
import ProfileIcon from '../assets/icons/profile-icon.svg';

import CageManagementScreen from '../screens/CageManagementScreen';
import MyPage from '../screens/MyPage';
import {MainTabType} from '../types';
import {Image, Platform, View} from 'react-native';
import IndividualManagementScreen from '../screens/IndividualManagamentScreen';
import {retrieve} from '../utils/persistence';
import theme from '../styles/theme';

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
    SVGIcon: TempIcon,
  },
  {
    name: 'IndividualManagementScreen',
    title: '개체',
    component: IndividualManagementScreen,
    SVGIcon: CalendarIcon,
  },
  {
    name: 'MyPage',
    title: '마이페이지',
    component: MyPage,
    SVGIcon: ProfileIcon,
  },
];

const MainTab = () => {
  const Tab = createBottomTabNavigator<RootStackParamList>();

  useEffect(() => {
    (async () => {
      console.log('token: ' + (await retrieve('accessToken')));
    })();
  }, []);

  return (
    <Tab.Navigator
      initialRouteName={'CageManagementScreen'}
      screenOptions={{
        tabBarActiveTintColor: theme.color.secondary,
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
