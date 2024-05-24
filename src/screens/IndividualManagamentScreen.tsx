import styled from '@emotion/native';
import React from 'react';
import SearchIcon from '../assets/icons/search.svg';
import AddIcon from '../assets/icons/add.svg';
import theme from '../styles/theme';
import Button from '../components/common/Button';
import IndividualCardComponent from './IndividualCardComponent';
import {individuals} from '../db/data';
import SafeAreaView from '../components/common/SafeAreaView';
import {ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';

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

const IndividualAdd = styled.TouchableOpacity`
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
  const navigation = useNavigation();

  return (
    <SafeAreaView>
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
            {individuals.map(individual => (
              <IndividualCardComponent
                key={individual.id}
                individual={individual}
              />
            ))}
            <IndividualAdd>
              <AddIcon width={30} height={30} fill={theme.color.white} />
            </IndividualAdd>
          </IndividualList>
        </ScrollView>
      </Container>
    </SafeAreaView>
  );
};

export default IndividualManagementScreen;
