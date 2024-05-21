import styled from '@emotion/native';
import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import SearchIcon from '../assets/icons/search.svg';
import AddIcon from '../assets/icons/add.svg'
import theme from '../styles/theme';
import Button from '../components/common/Button';
import IndividualCardComponent from './IndividualCardComponent';
import {individuals} from './data';
import {Alert} from 'react-native';


const Container = styled.View`
  margin: 0px 24px;
`;
const SearchBox = styled.View`
  margin: 25px 20px;
  border: 3px solid ${({theme}) => theme.color.secondary};
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
  background-color: ${({theme}) => theme.color.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  width: 44%;
  margin: 8px
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
        <SearchBox>
          <SearchInput placeholder='개체검색'/>
          <Button varient='text'>
            <SearchIcon width={30} height={30} fill={theme.color.secondary} />
          </Button>
        </SearchBox>
        <IndividualList>
          {individuals.map(individual => (
              <IndividualCardComponent key={individual.id} individual={individual} />
          ))}
          <IndividualAdd>
            <AddIcon width={30} height={30} fill={theme.color.white}/>
          </IndividualAdd>
        </IndividualList>
      </Container>
    </SafeAreaView>
  );
};

export default IndividualManagementScreen;