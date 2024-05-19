import styled from '@emotion/native';
import React from 'react';
import {Caption} from './common/TextGroup';
import theme from '../styles/theme';

export interface CategoryItemProps {
  name: string;
  color: string;
}

const Container = styled.View`
  align-items: center;
  gap: 6px;
  padding: 4px;
`;

const ColorBox = styled.View<{color: string}>`
  background-color: ${({color}) => color};
  width: 18px;
  height: 18px;
  border-radius: 9px;
`;

const CategoryItem = ({name, color}: CategoryItemProps) => {
  return (
    <Container>
      <ColorBox color={color} />
      <Caption color={theme.color.font.text1}>{name}</Caption>
    </Container>
  );
};

export default CategoryItem;
