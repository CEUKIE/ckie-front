import styled from '@emotion/native';
import React, {Suspense} from 'react';

import SearchIcon from '../assets/icons/search.svg';
import AddIcon from '../assets/icons/add.svg';
import theme from '../styles/theme';
import Button from '../components/common/Button';
import IndividualCardComponent from '../components/IndividualCard';
import SafeAreaView from '../components/common/SafeAreaView';
import {ScrollView} from 'react-native';
import {useNav} from '../hooks/useNav';
import useIndividuals from '../hooks/useIndividuals';
import Indicator from '../components/Indicator';

const Container = styled.View`
  margin: 0px ${props => props.theme.margin.screen};
  flex: 1;
`;

const SearchBox = styled.View`
  margin: 20px 48px;
  border: 3px solid ${props => props.theme.color.secondary};
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  padding: 8px 10px;
`;

const SearchInput = styled.TextInput`
  display: flex;
  flex: 1;
  font-size: ${props => props.theme.fontSize.body1};
`;

const RegistButton = styled.TouchableOpacity`
  background-color: ${props => props.theme.color.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  width: 44%;
  margin: 8px;
`;

const IndividualList = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const IndividualManagementScreen = () => {
  const navigation = useNav<'MainTab'>();
  const {data} = useIndividuals();

  const moveToRegist = () => navigation.push('IndividualRegistrationScreen');

  return (
    <SafeAreaView>
      <Suspense fallback={<Indicator />}>
        <Container>
          <SearchBox>
            <SearchInput
              placeholder="이름으로 검색해봐요!"
              placeholderTextColor={theme.color.lightGray}
            />
            <Button varient="text">
              <SearchIcon width={30} height={30} fill={theme.color.secondary} />
            </Button>
          </SearchBox>
          <ScrollView>
            <IndividualList>
              {data.map(individual => (
                <IndividualCardComponent
                  key={individual.id}
                  individual={{
                    id: individual.id,
                    name: individual.name,
                    avatarUrl: individual.avatarUrl,
                    gender: individual.gender,
                    memo: individual.memo,
                    hatchedAt: new Date(individual.hatchedAt),
                  }}
                />
              ))}
              <RegistButton onPress={moveToRegist}>
                <AddIcon width={30} height={30} fill={theme.color.white} />
              </RegistButton>
            </IndividualList>
          </ScrollView>
        </Container>
      </Suspense>
    </SafeAreaView>
  );
};

export default IndividualManagementScreen;
