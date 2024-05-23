import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../stacks/RootNavigation';
import {StackNavigationProp} from '@react-navigation/stack';

export const useNav = <T extends keyof RootStackParamList>() =>
  useNavigation<StackNavigationProp<RootStackParamList, T>>();
