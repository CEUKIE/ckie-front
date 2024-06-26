import styled from '@emotion/native';
import React from 'react';
import {Body1, Body2} from './common/TextGroup';
import theme from '../styles/theme';
import {RecordType} from '../api/types';

export interface PlanItemProps {
  name: RecordType.RecordCategory;
  color: string;
  memo?: string;
}

const Container = styled.View`
  flex-direction: row;
  padding: 24px;
  border-radius: 8px;
  gap: 12px;
  margin-top: 12px;
  border: 1.5px solid #e7e7e7;
`;

const ColorBox = styled.View<{color: string}>`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background-color: ${({color}) => color};
`;

const InfoBlock = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex: 1;
`;

const BoldBody1 = styled(Body1)`
  font-weight: 600;
`;

const PlanItem = ({name, color, memo}: PlanItemProps) => {
  return (
    <Container>
      <ColorBox color={color} />
      <InfoBlock>
        <BoldBody1>
          {name === 'FEEDING'
            ? '피딩'
            : name === 'WEIGHT'
            ? '무게'
            : name === 'ECDYSIS'
            ? '탈피'
            : '기타'}
        </BoldBody1>
        <Body2 color={theme.color.font.text1}>{memo}</Body2>
      </InfoBlock>
    </Container>
  );
};

export default PlanItem;
