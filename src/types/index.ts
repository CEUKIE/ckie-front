import {RouteProp} from '@react-navigation/native';
import {SvgProps} from 'react-native-svg';

export namespace MainTabType {
  export interface MainTabElement {
    name: string;
    title: string;
    component: ScreenComponentType<any, any>;
    SVGIcon: React.FC<SvgProps>;
  }

  type ScreenComponentType<
    ParamList extends Record<string, object | undefined>,
    RouteName extends keyof ParamList,
  > =
    | React.ComponentType<{
        route: RouteProp<ParamList, RouteName>;
        navigation: any;
      }>
    | React.ComponentType<{}>;
}
