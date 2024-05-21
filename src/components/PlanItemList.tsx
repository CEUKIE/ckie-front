import styled from '@emotion/native';
import React from 'react';
import PlanItem, {PlanItemProps} from './PlanItem';
import {Body1} from './common/TextGroup';
import {View} from 'react-native';

const Container = styled.View`
  gap: 12px;
`;

const PlanItemList = ({items, date}: {items: PlanItemProps[]; date: Date}) => {
  return (
    <Container>
      <Body1>{`${date.getFullYear()}년 ${
        date.getMonth() + 1
      }월 ${date.getDate()}일`}</Body1>
      <View>
        {items.map((item, index) => (
          <PlanItem
            key={index}
            name={item.name}
            color={item.color}
            memo={item.memo}
          />
        ))}
      </View>
    </Container>
  );
};

export default PlanItemList;
