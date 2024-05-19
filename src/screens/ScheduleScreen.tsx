import React, {useEffect, useState} from 'react';
import styled from '@emotion/native';

import SafeAreaView from '../components/common/SafeAreaView';
import {Text, View} from 'react-native';
import {Calendar} from 'react-native-calendars';
import theme from '../styles/theme';
import {plans} from '../db/plants';
import CategoryItemList from '../components/CategoryItemList';
import {categories} from '../db/categories';

interface Category {
  name: string;
  color: string;
}

interface MarkedType {
  [key: string]: {dots: Category[]};
}

const Container = styled.View`
  padding: 12px 16px;
  flex: 1;
  gap: 16px;
`;

const ScheduleScreen = () => {
  const [selected, setSelected] = useState('');
  const [markedDates, setMarkedDates] = useState<MarkedType>({});

  useEffect(() => {
    const planList: MarkedType = {};
    plans.forEach(p => {
      planList[p.target] = {dots: [...p.record]};
    });
    setMarkedDates(planList);
  }, []);

  return (
    <SafeAreaView>
      {Object.keys(markedDates).length === plans.length ? (
        <Container>
          <CategoryItemList items={categories} />
          <Calendar
            monthFormat={'M월'}
            onDayPress={day => {
              setSelected(day.dateString);
            }}
            hideExtraDays
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
            <Text>
              {markedDates[selected] &&
                markedDates[selected].dots.map((t, i) => (
                  <Text key={i}>{t.name}</Text>
                ))}
            </Text>
          </View>
        </Container>
      ) : (
        <Text>loading...</Text>
      )}
    </SafeAreaView>
  );
};

export default ScheduleScreen;
