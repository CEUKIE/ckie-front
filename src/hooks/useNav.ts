import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../navigations/RootNavigation';
import {StackNavigationProp} from '@react-navigation/stack';

export const useNav = <T extends keyof RootStackParamList>() =>
  useNavigation<StackNavigationProp<RootStackParamList, T>>();
