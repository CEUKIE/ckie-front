import styled from '@emotion/native';
import React, {Suspense, useEffect, useState} from 'react';
import {RefreshControl, ScrollView} from 'react-native';

import theme from '../styles/theme';
import AddIcon from '../assets/icons/add.svg';
import CageCard from '../components/CageCard';
import SafeAreaView from '../components/common/SafeAreaView';
import {useNav} from '../hooks/useNav';
import useCages, {QUERY_KEY} from '../hooks/useCages';
import Indicator from '../components/Indicator';
import SearchInput from '../components/SearchInput';
import {useQueryClient} from '@tanstack/react-query';

const Container = styled.View`
  margin: 0px ${props => props.theme.margin.screen};
  flex: 1;
`;

const SearchBlock = styled.View`
  padding: 0 40px;
  padding-top: 20px;
`;

const RegistButton = styled.TouchableOpacity`
  background-color: ${props => props.theme.color.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  margin: 8px;
`;

const CageCardList = styled.View`
  margin-top: 12px;
`;

const CageManagementScreen = () => {
  const navigation = useNav<'MainTab'>();
  const {data} = useCages();
  const [refreshing, setRefreshing] = useState(false);
  const queryClient = useQueryClient();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    queryClient.invalidateQueries({queryKey: [QUERY_KEY]});
    setTimeout(() => {
      setRefreshing(false);
    }, 1200);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const moveToRegistStack = () => {
    navigation.push('CageRegistrationStack');
  };

  return (
    <SafeAreaView>
      <Suspense fallback={<Indicator />}>
        <Container>
          <SearchBlock>
            <SearchInput
              placeholder="이름으로 검색해봐요!"
              placeholderTextColor={theme.color.lightGray}
            />
          </SearchBlock>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <CageCardList>
              {data.map(cage => (
                <CageCard
                  key={cage.id}
                  id={cage.id}
                  name={cage.name}
                  avatarUrl={cage.avatarUrl}
                />
              ))}
              <RegistButton onPress={moveToRegistStack}>
                <AddIcon width={30} height={30} fill={theme.color.white} />
              </RegistButton>
            </CageCardList>
          </ScrollView>
        </Container>
      </Suspense>
    </SafeAreaView>
  );
};

export default CageManagementScreen;
