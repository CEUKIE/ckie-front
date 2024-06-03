import React, {Suspense, useEffect, useState} from 'react';
import styled from '@emotion/native';

import SafeAreaView from '../components/common/SafeAreaView';
import {ScrollView, Text, View} from 'react-native';
import {Calendar} from 'react-native-calendars';
import theme from '../styles/theme';
import CategoryItemList from '../components/CategoryItemList';
import PlanItemList from '../components/PlanItemList';
import FeedingModal from '../components/FeedingModal';
import FoodIcon from '../assets/icons/food-icon.svg';
import ScaleIcon from '../assets/icons/scale-icon.svg';
import RapterIcon from '../assets/icons/rapter-icon.svg';
import GuitarIcon from '../assets/icons/guitar-icon.svg';
import WeightModal from '../components/WeightModal';
import MoltingModal from '../components/MoltingModal';
import MemoModal from '../components/MemoModal';
import useIndividualIdStore from '../stores/useIndividualIdStore';
import useRecords from '../hooks/useRecords';
import Indicator from '../components/Indicator';

interface Category {
  name: string;
  color: string;
  memo?: string;
}

interface MarkedType {
  [key: string]: {dots: Category[]};
}

const Container = styled.View`
  padding: 12px 16px;
  flex: 1;
  gap: 16px;
  background-color: #fef9fd;
`;

const ScheduleScreen = () => {
  const individualId = useIndividualIdStore(state => state.id);
  const {data} = useRecords(individualId);

  const [selected, setSelected] = useState('');
  const [markedDates, setMarkedDates] = useState<MarkedType>({});
  const [isFeedingModalVisible, setFeedingModalVisible] = useState(false);
  const [isWeightModalVisible, setWeightModalVisible] = useState(false);
  const [isMoltingModalVisible, setMoltingModalVisible] = useState(false);
  const [isMemoModalVisible, setMemoModalVisible] = useState(false);

  const categories = [
    {
      name: '피딩',
      color: '#DDFFE1',
      icon: <FoodIcon width={32} height={32} fill={theme.color.black} />,
      setModalVisible: setFeedingModalVisible,
    },
    {
      name: '무게',
      color: '#DEDDFF',
      icon: <ScaleIcon width={32} height={32} fill={theme.color.black} />,
      setModalVisible: setWeightModalVisible,
    },
    {
      name: '탈피',
      color: '#FFDDE0',
      icon: <RapterIcon width={32} height={32} fill={theme.color.black} />,
      setModalVisible: setMoltingModalVisible,
    },
    {
      name: '기타',
      color: '#FEFFDD',
      icon: <GuitarIcon width={32} height={32} fill={theme.color.black} />,
      setModalVisible: setMemoModalVisible,
    },
  ];

  useEffect(() => {
    const planList: MarkedType = {};
    data.forEach(p => {
      p.record.forEach(r => {
        r.color =
          r.name === 'FEEDING'
            ? '#DDFFE1'
            : r.name === 'WEIGHT'
            ? '#DEDDFF'
            : r.name === 'ECDYSIS'
            ? '#FFDDE0'
            : '#FEFFDD';
      });
    });
    // TODO 타입 수정
    data.forEach(p => {
      planList[p.target] = {dots: [...p.record]};
    });
    setMarkedDates(planList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <SafeAreaView>
      <Suspense fallback={<Indicator />}>
        <FeedingModal
          isVisible={isFeedingModalVisible}
          setIsVisible={setFeedingModalVisible}
        />
        <WeightModal
          isVisible={isWeightModalVisible}
          setIsVisible={setWeightModalVisible}
          weightUnit={'g'}
          currentWeight={12}
        />
        <MoltingModal
          isVisible={isMoltingModalVisible}
          setIsVisible={setMoltingModalVisible}
        />
        <MemoModal
          isVisible={isMemoModalVisible}
          setIsVisible={setMemoModalVisible}
        />
        {Object.keys(markedDates).length === data.length ? (
          <Container>
            <CategoryItemList items={categories} />
            <ScrollView>
              <Calendar
                style={{borderRadius: 8, marginBottom: 16}}
                monthFormat={'M월'}
                onDayPress={day => {
                  setSelected(day.dateString);
                }}
                markingType={'multi-dot'}
                markedDates={{...markedDates, [selected]: {selected: true}}}
                theme={{
                  arrowColor: theme.color.primary,
                  todayTextColor: theme.color.primary,
                  textDayFontWeight: 'bold',
                  textMonthFontSize: 20,
                  textMonthFontWeight: 'bold',
                  textSectionTitleColor: 'rgba(138, 138, 138, 1)',
                  selectedDotColor: theme.color.secondary,
                  selectedDayTextColor: theme.color.white,
                  selectedDayBackgroundColor: theme.color.secondary,
                }}
              />
              <View>
                {markedDates[selected] && (
                  <PlanItemList
                    items={markedDates[selected].dots}
                    date={new Date(selected)}
                  />
                )}
              </View>
            </ScrollView>
          </Container>
        ) : (
          <Text>loading...</Text>
        )}
      </Suspense>
    </SafeAreaView>
  );
};

export default ScheduleScreen;
