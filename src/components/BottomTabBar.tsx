import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// icon
import CageIcon from '../assets/icons/cage.svg';
import HomeIcon from '../assets/icons/home-fill.svg';
import TempIcon from '../assets/icons/temp-hot-line.svg';

import CageManagementScreen from '../screens/CageManagementScreen';
import IndividualManagamentScreen from '../screens/IndividualManagamentScreen';
import MyPage from '../screens/MyPage';

const BottomTabBar = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="cage"
      screenOptions={{
        tabBarActiveTintColor: '#FFC25C',
      }}>
      <Tab.Screen
        name="cage"
        component={CageManagementScreen}
        options={{
          title: '사육장',
          tabBarIcon: ({color, size}) => (
            <CageIcon width={size} height={size} fill={color} />
          ),
        }}
      />
      <Tab.Screen
        name="individual"
        component={IndividualManagamentScreen}
        options={{
          title: '개체',
          tabBarIcon: ({color, size}) => (
            <TempIcon width={size} height={size} fill={color} />
          ),
        }}
      />
      <Tab.Screen
        name="myPage"
        component={MyPage}
        options={{
          title: '프로필',
          tabBarIcon: ({color, size}) => (
            <HomeIcon width={size} height={size} fill={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabBar;
