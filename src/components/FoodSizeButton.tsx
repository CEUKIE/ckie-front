import styled from '@emotion/native';
import React from 'react';
import {GestureResponderEvent} from 'react-native-modal';
import {Body1} from './common/TextGroup';
import {Shadow} from 'react-native-shadow-2';

interface FoodSizeButtonProps {
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  clicked: boolean;
  size: string;
}

const Container = styled.TouchableOpacity<{clicked: boolean}>`
  border-radius: 8px;
  padding: 8px 32px;
  background-color: ${({clicked, theme}) =>
    clicked ? theme.color.primary : 'white'};
`;

const FoodSizeButton = ({onPress, clicked, size}: FoodSizeButtonProps) => {
  return (
    <Shadow startColor={'#0001'} distance={4} style={{borderRadius: 8}}>
      <Container onPress={onPress} clicked={clicked}>
        <Body1>{size}</Body1>
      </Container>
    </Shadow>
  );
};

export default FoodSizeButton;
