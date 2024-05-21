import styled from '@emotion/native';
import React from 'react';
import {Shadow} from 'react-native-shadow-2';

import {Body1} from './common/TextGroup';
import {GestureResponderEvent} from 'react-native-modal';

interface FoodButtonProps {
  foodName: string;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  clicked: boolean;
  icon: React.JSX.Element;
}

const Container = styled.View`
  background-color: ${({theme}) => theme.color.white};
  border-radius: 8px;
  align-items: center;
  gap: 12px;
`;

const Button = styled.TouchableOpacity<{clicked: boolean}>`
  background-color: ${({clicked, theme}) =>
    clicked ? theme.color.primary : 'white'};
  border-radius: 12px;
  padding: 12px;
`;

const Name = styled(Body1)`
  font-weight: 300;
`;

const FoodButton = ({foodName, onPress, clicked, icon}: FoodButtonProps) => {
  return (
    <Container>
      <Shadow startColor={'#0001'} distance={4} style={{borderRadius: 12}}>
        <Button onPress={onPress} clicked={clicked}>
          {icon}
        </Button>
      </Shadow>
      <Name>{foodName}</Name>
    </Container>
  );
};

export default FoodButton;
