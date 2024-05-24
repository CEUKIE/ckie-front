import styled from '@emotion/native';
import React from 'react';
import {ScrollView} from 'react-native';

import theme from '../styles/theme';
import Button from '../components/common/Button';
import SearchIcon from '../assets/icons/search.svg';
import AddIcon from '../assets/icons/add.svg';
import CageCard from '../components/CageCard';
import SafeAreaView from '../components/common/SafeAreaView';
import {cages} from '../db/cages';

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
  margin: 8px;
`;

const CageCardList = styled.View``;

const CageManagementScreen = () => {
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
          <CageCardList>
            {cages.map(cage => (
              <CageCard
                key={cage.id}
                id={cage.id}
                name={cage.name}
                memo={cage.memo}
              />
            ))}
            <RegistButton>
              <AddIcon width={30} height={30} fill={theme.color.white} />
            </RegistButton>
          </CageCardList>
        </ScrollView>
      </Container>
    </SafeAreaView>
  );
};

export default CageManagementScreen;
