import styled from '@emotion/native';
import React, {Suspense} from 'react';

import AddIcon from '../assets/icons/add.svg';
import theme from '../styles/theme';
import IndividualCardComponent from '../components/IndividualCard';
import SafeAreaView from '../components/common/SafeAreaView';
import {ScrollView} from 'react-native';
import {useNav} from '../hooks/useNav';
import useIndividuals from '../hooks/useIndividuals';
import Indicator from '../components/Indicator';
import SearchInput from '../components/SearchInput';

const Container = styled.View`
  margin: 0px ${props => props.theme.margin.screen};
  flex: 1;
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

const SearchBlock = styled.View`
  padding: 0 40px;
  padding-top: 20px;
`;

const IndividualList = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const IndividualManagementScreen = () => {
  const navigation = useNav<'MainTab'>();
  const {data: individuals} = useIndividuals();

  const moveToRegist = () => navigation.push('IndividualRegistrationScreen');

  return (
    <SafeAreaView>
      <Suspense fallback={<Indicator />}>
        <Container>
          <SearchBlock>
            <SearchInput placeholder={'이름으로 검색해봐요!'} />
          </SearchBlock>
          <ScrollView>
            <IndividualList>
              {individuals.map(individual => (
                <IndividualCardComponent
                  key={individual.id}
                  individual={{
                    ...individual,
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
