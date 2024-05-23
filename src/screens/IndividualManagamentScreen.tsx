import styled from '@emotion/native';
import React from 'react';

import SearchIcon from '../assets/icons/search.svg';
import AddIcon from '../assets/icons/add.svg';
import theme from '../styles/theme';
import Button from '../components/common/Button';
import IndividualCardComponent from './IndividualCard';
import {individuals} from '../db/data';
import SafeAreaView from '../components/common/SafeAreaView';
import {ScrollView} from 'react-native';

const Container = styled.View`
  margin: 0px ${props => props.theme.margin.screen};
  flex: 1;
`;
const SearchBlock = styled.View`
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
  return (
    <SafeAreaView>
      <Container>
        <SearchBlock>
          <SearchInput
            placeholder="이름으로 검색해봐요!"
            placeholderTextColor={theme.color.lightGray}
          />
          <Button varient="text">
            <SearchIcon width={30} height={30} fill={theme.color.secondary} />
          </Button>
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
            <RegistButton>
              <AddIcon width={30} height={30} fill={theme.color.white} />
            </RegistButton>
          </IndividualList>
        </ScrollView>
      </Container>
    </SafeAreaView>
  );
};

export default IndividualManagementScreen;
