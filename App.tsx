import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import FA6Icon from 'react-native-vector-icons/FontAwesome6';
import CageManagementScreen from './src/screens/CageManagementScreen';
import IndividualManagamentScreen from './src/screens/IndividualManagamentScreen';
import MyPage from './src/screens/MyPage';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <MyTab />
    </NavigationContainer>
  );
};

const MyTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="cage"
        component={CageManagementScreen}
        options={{
          title: '사육장',
          tabBarIcon: ({color, size}) => (
            <Icon name="water" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="individual"
        component={IndividualManagamentScreen}
        options={{
          title: '개체',
          tabBarIcon: ({color, size}) => (
            <FA6Icon name="temperature-half" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="myPage"
        component={MyPage}
        options={{
          title: '프로필',
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

let AppEntryPoint = App;

if (process.env.STORYBOOK_ENABLED) {
  AppEntryPoint = require('./.ondevice').default;
}

export default AppEntryPoint;
