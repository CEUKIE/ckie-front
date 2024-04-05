import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// icon
import CageIcon from '../assets/icons/cage.svg';
import HomeIcon from '../assets/icons/home-fill.svg';
import TempIcon from '../assets/icons/temp-hot-line.svg';

import CageManagementScreen from '../screens/CageManagementScreen';
import IndividualManagamentScreen from '../screens/IndividualManagamentScreen';
import MyPage from '../screens/MyPage';
import {BottomTabBarType} from '../types';

const elements: BottomTabBarType.BottomTabBarElement[] = [
  {
    name: 'cage',
    title: '사육장',
    component: CageManagementScreen,
    SVGIcon: CageIcon,
  },
  {
    name: 'individual',
    title: '개체',
    component: IndividualManagamentScreen,
    SVGIcon: TempIcon,
  },
  {
    name: 'myPage',
    title: '마이페이지',
    component: MyPage,
    SVGIcon: HomeIcon,
  },
];

const BottomTabBar = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="cage"
      screenOptions={{
        tabBarActiveTintColor: '#FFC25C',
      }}>
      {elements.map(e => (
        <Tab.Screen
          key={e.name}
          name={e.name}
          component={e.component}
          options={{
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

export default BottomTabBar;
