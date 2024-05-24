import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MainTab from '../components/MainTabBar';
import UserInfoEditScreen from '../screens/UserInfoEditScreen';
import CageTopTab from './CageTopTab';
import IndividulaTopTab from './IndividulaTopTab';
import LoginScreen from '../screens/LoginScreen';

export type RootStackParamList = {
  LoginScreen: undefined;
  MainTab: undefined;
  CageTopTab: undefined;
  IndividualTopTab: undefined;
  UserInfoEditScreen: {
    avatarUrl: string;
    nickname: string;
    introduction: string;
    platform: 'kakao' | 'google' | 'naver';
  };
};

const Stack = createStackNavigator<RootStackParamList>();

export const inputScreenHeaderOption = {
  headerTitle: ' ',
  headerShadowVisible: false,
};

const RootNavigation = () => {
  // TODO 토큰과 상태를 통해 로그인 여부 확인하도록 변경.
  const isLogined = true;

  return (
    <Stack.Navigator initialRouteName={isLogined ? 'MainTab' : 'LoginScreen'}>
      {!isLogined && (
        <Stack.Screen
          name={'LoginScreen'}
          component={LoginScreen}
          options={{
            ...inputScreenHeaderOption,
            headerShown: false,
          }}
        />
      )}
      <Stack.Screen
        name={'MainTab'}
        component={MainTab}
        options={{
          ...inputScreenHeaderOption,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'CageTopTab'}
        component={CageTopTab}
        options={{
          ...inputScreenHeaderOption,
        }}
      />
      <Stack.Screen
        name={'IndividualTopTab'}
        component={IndividulaTopTab}
        options={{
          ...inputScreenHeaderOption,
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
