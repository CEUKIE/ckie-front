import styled from '@emotion/native';
import React, {Suspense, useEffect} from 'react';
import {View} from 'react-native';

import SafeAreaView from '../components/common/SafeAreaView';
import WeightChart from '../components/WeightChart';
import {Body1, Body2} from '../components/common/TextGroup';
import theme from '../styles/theme';
import useWeightRecordsStore from '../stores/useWeightRecordsStore';
import useWeightRecords from '../hooks/useWeightRecords';
import useIndividualIdStore from '../stores/useIndividualIdStore';
import Indicator from '../components/Indicator';

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

const WeightChartScreen = () => {
  const individualId = useIndividualIdStore(state => state.id);
  const {weightUnit, weightRecords, updateWeightRecords} =
    useWeightRecordsStore(state => state);
  const {data} = useWeightRecords(individualId);

  useEffect(() => {
    const records: {targetDate: Date; weight: number}[] = data.map(record => ({
      ...record,
      targetDate: new Date(record.targetDate),
    }));
    console.log('차트 스크린: ' + data);
    updateWeightRecords([...records]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <SafeAreaView>
      <Suspense fallback={<Indicator />}>
        <Container>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: theme.color.lightGray,
            }}>
            <WeightChart
              weightRecords={weightRecords}
              weightUnit={weightUnit}
            />
          </View>
          <RecordItemBlock>
            <RecordTitleBlock>
              <RecordTitle>날짜</RecordTitle>
              <RecordTitle>체중</RecordTitle>
              <RecordTitle>변화량</RecordTitle>
            </RecordTitleBlock>
            {data.length !== 0 &&
              weightRecords.map((record, index) => {
                const date = record.targetDate;
                const dateFormat = `${date.getFullYear()}.${
                  date.getMonth() + 1
                }.${date.getDate()}`;
                const weightChange =
                  index > 0
                    ? data[index].weight - data[index - 1].weight
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
                        ? weightChange > 0
                          ? `+${weightChange.toFixed(1)}`
                          : weightChange.toFixed(1)
                        : weightChange}
                    </WeightChange>
                  </RecordItem>
                );
              })}
          </RecordItemBlock>
        </Container>
      </Suspense>
    </SafeAreaView>
  );
};

export default WeightChartScreen;
