import styled from '@emotion/native';
import React from 'react';
import PlanItem, {PlanItemProps} from './PlanItem';
import {Body1} from './common/TextGroup';
import {View} from 'react-native';
import { Shadow } from 'react-native-shadow-2';

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
          <Shadow
            key={index}
            startColor={'#f8f8f8'}
            distance={5}
            style={{width: '100%', borderRadius: 12}}>
            <PlanItem name={item.name} color={item.color} memo={item.memo} />
          </Shadow>
        ))}
      </View>
    </Container>
  );
};

export default PlanItemList;
