import styled from '@emotion/native';
import React from 'react';
import {GestureResponderEvent} from 'react-native-modal';
import {Body2} from './common/TextGroup';
import ArrowIcon from '../assets/icons/arrow-right-icon.svg';
import theme from '../styles/theme';

interface MenuButton {
  text: string;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
}

const TouableArea = styled.TouchableWithoutFeedback``;

const Container = styled.View`
  padding: 8px 0;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const MenuName = styled(Body2)`
  font-weight: 600;
`;

const MenuButton = ({text, onPress}: MenuButton) => {
  return (
    <TouableArea onPress={onPress}>
      <Container>
        <MenuName>{text}</MenuName>
        <ArrowIcon width={24} height={24} fill={theme.color.font.text1} />
      </Container>
    </TouableArea>
  );
};

export default MenuButton;
