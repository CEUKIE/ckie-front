import styled from '@emotion/native';
import React from 'react';
import CategoryItem, {CategoryItemProps} from './CategoryItem';
import {ScrollView} from 'react-native';

const Container = styled.View``;

const CategoryItemList = ({items}: {items: CategoryItemProps[]}) => {
  return (
    <Container>
      <ScrollView horizontal bounces showsHorizontalScrollIndicator={false}>
        {items.map((item, index) => (
          <CategoryItem key={index} color={item.color} name={item.name} />
        ))}
      </ScrollView>
    </Container>
  );
};

export default CategoryItemList;
