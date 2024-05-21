import styled from '@emotion/native';
import React from 'react';
import CategoryItem, {CategoryItemProps} from './CategoryItem';

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 12px;
`;

const CategoryItemList = ({items}: {items: CategoryItemProps[]}) => {
  return (
    <Container>
      {items.map((item, index) => (
        <CategoryItem
          key={index}
          color={item.color}
          name={item.name}
          icon={item.icon}
          setModalVisible={item.setModalVisible}
        />
      ))}
    </Container>
  );
};

export default CategoryItemList;
