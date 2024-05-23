import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MainTab from '../components/MainTabBar';
import UserInfoEditScreen from '../screens/UserInfoEditScreen';

export type RootStackParamList = {
  MainTab: undefined;
  UserInfoEditScreen: {
    avatarUrl: string;
    nickname: string;
    introduction: string;
    platform: 'kakao' | 'google' | 'naver';
  };
};

const Stack = createStackNavigator<RootStackParamList>();

const inputScreenHeaderOption = {
  headerTitle: ' ',
  headerShadowVisible: false,
};

const RootNavigation = () => {
  return (
    <Stack.Navigator initialRouteName={'MainTab'}>
      <Stack.Screen
        name={'MainTab'}
        component={MainTab}
        options={{
          ...inputScreenHeaderOption,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'UserInfoEditScreen'}
        component={UserInfoEditScreen}
        options={{
          ...inputScreenHeaderOption,
        }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigation;