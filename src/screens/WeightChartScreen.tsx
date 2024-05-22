import styled from '@emotion/native';
import React from 'react';
import {View} from 'react-native';

import SafeAreaView from '../components/common/SafeAreaView';
import WeightChart, {
  WeightChartProps,
  WeightRecord,
} from '../components/WeightChart';
import {Body1, Body2} from '../components/common/TextGroup';
import theme from '../styles/theme';

const Container = styled.View`
  margin: 24px 0;
  flex: 1;
`;

const RecordItemBlock = styled.ScrollView``;
const RecordTitleBlock = styled.View`
  flex-direction: row;
  padding: 24px 0;
`;

const RecordTitle = styled(Body1)`
  flex: 1;
  font-weight: 600;
  text-align: center;
`;

const RecordItem = styled.View`
  flex-direction: row;
  padding: 9px;
`;

const RecordData = styled(Body2)`
  flex: 1;
  text-align: center;
  font-weight: 500;
  color: ${props => props.theme.color.font.text1};
`;

const WeightChange = styled(Body2)<{isIncreasing: boolean}>`
  flex: 1;
  text-align: center;
  font-weight: 700;
  color: ${props =>
    props.isIncreasing ? props.theme.color.green : props.theme.color.red};
`;

const data: WeightRecord[] = [
  {targetDate: new Date(), weight: 2},
  {targetDate: new Date(), weight: 3.5},
  {targetDate: new Date(), weight: 4.7},
  {targetDate: new Date(), weight: 3},
  {targetDate: new Date(), weight: 8.2},
  {targetDate: new Date(), weight: 3},
  {targetDate: new Date(), weight: 3},
  {targetDate: new Date(), weight: 3},
  {targetDate: new Date(), weight: 3},
  {targetDate: new Date(), weight: 3},
  {targetDate: new Date(), weight: 3.5},
  {targetDate: new Date(), weight: 4.7},
  {targetDate: new Date(), weight: 3},
  {targetDate: new Date(), weight: 12.2},
  {targetDate: new Date(), weight: 3.5},
  {targetDate: new Date(), weight: 4.7},
  {targetDate: new Date(), weight: 3},
];

const WeightChartScreen = ({
  weightUnit = 'g',
  weightRecords = data,
}: WeightChartProps) => {
  return (
    <SafeAreaView>
      <Container>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: theme.color.lightGray,
          }}>
          <WeightChart weightRecords={weightRecords} weightUnit={weightUnit} />
        </View>
        <RecordItemBlock>
          <RecordTitleBlock>
            <RecordTitle>날짜</RecordTitle>
            <RecordTitle>체중</RecordTitle>
            <RecordTitle>변화량</RecordTitle>
          </RecordTitleBlock>
          {weightRecords.map((record, index) => {
            const date = record.targetDate;
            const dateFormat = `${date.getFullYear()}.${
              date.getMonth() + 1
            }.${date.getDate()}`;
            const weightChange =
              index > 0
                ? weightRecords[index].weight - weightRecords[index - 1].weight
                : 'new';

            return (
              <RecordItem
                key={index}
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: theme.color.lightGray,
                }}>
                <RecordData>{dateFormat}</RecordData>
                <RecordData>{record.weight}</RecordData>
                <WeightChange
                  isIncreasing={weightChange === 'new' || weightChange > 0}>
                  {typeof weightChange === 'number'
                    ? weightChange.toFixed(1)
                    : weightChange}
                </WeightChange>
              </RecordItem>
            );
          })}
        </RecordItemBlock>
      </Container>
    </SafeAreaView>
  );
};

export default WeightChartScreen;
