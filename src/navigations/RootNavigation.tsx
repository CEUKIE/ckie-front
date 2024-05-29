import React, {useEffect} from 'react';
import {
  StackNavigationOptions,
  createStackNavigator,
} from '@react-navigation/stack';

import MainTab from '../components/MainTabBar';
import UserInfoEditScreen from '../screens/UserInfoEditScreen';
import CageTopTab from './CageTopTab';
import IndividulaTopTab from './IndividulaTopTab';
import LoginScreen from '../screens/LoginScreen';
import IndividualRegistrationScreen from '../screens/IndividualRegistrationScreen';
import IndividualInfoEditScreen from '../screens/IndividualInfoEditScreen';
import {verfiyAccessToken} from '../api/api';
import useLoginStore from '../stores/useLoginStore';
import UserInfoInputScreen from '../screens/UserInfoInputScreen';
import {Platform} from '../api/types';
import BackArrowIcon from '../assets/icons/arrow-left-icon.svg';
import theme from '../styles/theme';

export type RootStackParamList = {
  LoginScreen: undefined;
  MainTab: undefined;
  CageTopTab: undefined;
  IndividualTopTab: undefined;
  IndividualRegistrationScreen: undefined;
  IndividualInfoEditScreen: undefined;
  UserInfoInputScreen: {
    accessToken: string;
  };
  UserInfoEditScreen: {
    avatarUrl: string;
    nickname: string;
    introduction: string;
    platform: Platform;
  };
};

const Stack = createStackNavigator<RootStackParamList>();

export const inputScreenHeaderOption: StackNavigationOptions = {
  headerTitle: ' ',
  headerShadowVisible: false,
  headerBackImage: () => (
    <BackArrowIcon width={32} height={32} fill={theme.color.black} />
  ),
};

const RootNavigation = () => {
  const {isLogined, updateIsLogined} = useLoginStore(state => state);
  useEffect(() => {
    (async () => {
      try {
        const response = await verfiyAccessToken();
        updateIsLogined(response.result!.isVerified);
      } catch (e) {
        console.error(`error: ${e}`);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        name={'IndividualRegistrationScreen'}
        component={IndividualRegistrationScreen}
        options={{
          ...inputScreenHeaderOption,
        }}
      />
      <Stack.Screen
        name={'IndividualInfoEditScreen'}
        component={IndividualInfoEditScreen}
        options={{
          ...inputScreenHeaderOption,
        }}
      />
      <Stack.Screen
        name={'UserInfoInputScreen'}
        component={UserInfoInputScreen}
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
