import React from 'react';
import styled from '@emotion/native';
import theme from '../styles/theme';
import SafeAreaView from '../components/common/SafeAreaView';
import Button from '../components/common/Button';
import SearchIcon from '../assets/icons/search.svg';
import {species} from '../db/species-data';
import {Alert} from 'react-native';

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

const SpeciesBox = styled.View`
  padding: 10px 0px 0px 0px;
`;

const Touch = styled.TouchableWithoutFeedback``;

const Species = styled.View`
  padding: 23px 0px;
`;

const SpeciesText = styled.Text`
  font-size: ${({theme}) => theme.fontSize.body1};
`;

const SpeciesSelectScreen = () => {
  return (
    <SafeAreaView>
      <Container>
        <SearchBox>
          <SearchInput
            placeholder="종을 검색해봐요!"
            placeholderTextColor={theme.color.lightGray}
          />
          <Button varient="text">
            <SearchIcon width={30} height={30} fill={theme.color.secondary} />
          </Button>
        </SearchBox>
        <SpeciesBox>
          <Touch onPress={() => Alert.alert('코끼리응가')}>
            <Species
              style={{borderBottomWidth: 1, borderBottomColor: 'lightgray'}}>
              <SpeciesText>크레스티드 게코</SpeciesText>
            </Species>
          </Touch>
          <Touch onPress={() => Alert.alert('코끼리응가')}>
            <Species
              style={{borderBottomWidth: 1, borderBottomColor: 'lightgray'}}>
              <SpeciesText>크레스티드 게코</SpeciesText>
            </Species>
          </Touch>
          <Touch onPress={() => Alert.alert('코끼리응가')}>
            <Species
              style={{borderBottomWidth: 1, borderBottomColor: 'lightgray'}}>
              <SpeciesText>크레스티드 게코</SpeciesText>
            </Species>
          </Touch>
          <Touch onPress={() => Alert.alert('코끼리응가')}>
            <Species
              style={{borderBottomWidth: 1, borderBottomColor: 'lightgray'}}>
              <SpeciesText>크레스티드 게코</SpeciesText>
            </Species>
          </Touch>
          <Touch onPress={() => Alert.alert('코끼리응가')}>
            <Species
              style={{borderBottomWidth: 1, borderBottomColor: 'lightgray'}}>
              <SpeciesText>크레스티드 게코</SpeciesText>
            </Species>
          </Touch>
        </SpeciesBox>
      </Container>
    </SafeAreaView>
  );
};

export default SpeciesSelectScreen;
