import styled from '@emotion/native';
import React from 'react';
import {Caption} from './common/TextGroup';
import theme from '../styles/theme';
import {Shadow} from 'react-native-shadow-2';

export interface CategoryItemProps {
  name: string;
  color: string;
  icon: React.JSX.Element;
  setModalVisible:
    | React.Dispatch<React.SetStateAction<boolean>>
    | ((visible: boolean) => void);
}

const Container = styled.View`
  align-items: center;
  gap: 6px;
`;

const Button = styled.TouchableOpacity<{color: string}>`
  background-color: ${({color}) => color};
  border-radius: 9px;
  padding: 12px;
`;

const CategoryItem = ({
  name,
  color,
  icon,
  setModalVisible,
}: CategoryItemProps) => {
  return (
    <Container>
      <Shadow startColor={'#0001'} distance={3} style={{borderRadius: 9}}>
        <Button color={color} onPress={() => setModalVisible(true)}>
          {icon}
        </Button>
      </Shadow>

      <Caption color={theme.color.font.text1}>{name}</Caption>
    </Container>
  );
};

export default CategoryItem;
