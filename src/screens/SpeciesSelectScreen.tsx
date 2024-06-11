import React, {Suspense, useEffect, useState} from 'react';
import styled from '@emotion/native';

import theme from '../styles/theme';
import SafeAreaView from '../components/common/SafeAreaView';
import Button from '../components/common/Button';
import SearchIcon from '../assets/icons/search.svg';
import Species from '../components/Species';
import useSpeciesList from '../hooks/useSpeciesList';
import useCreateIndividualStore from '../stores/useCreateIndividualStore';
import Indicator from '../components/Indicator';
import {useNav} from '../hooks/useNav';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../navigations/RootNavigation';
import { SpeciesType } from '../api/types';
import { ScrollView } from 'react-native';

interface SpeciesSelectScreenProps
  extends RouteProp<RootStackParamList, 'SpeciesSelectScreen'> {}

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

const SpeciesSelectScreen = () => {
  const navigation = useNav<'SpeciesSelectScreen'>();
  const {setSpeciesLabel} = useRoute<SpeciesSelectScreenProps>().params;
  const updateIndividual = useCreateIndividualStore(
    state => state.updateIndividual,
  );
  const {data} = useSpeciesList();
  const [searchInput, setSearchInput] = useState('');
  const [filteredData, setFilteredData] = useState<
    SpeciesType.SpeciesListResponse[]
  >([]);

  useEffect(() => {
    const filtered = data.filter(item => item.name.includes(searchInput));
    setFilteredData(filtered);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  return (
    <SafeAreaView>
      <Suspense fallback={<Indicator />}>
        <Container>
          <SearchBox>
            <SearchInput
              value={searchInput}
              onChangeText={setSearchInput}
              placeholder="종을 검색해봐요!"
              placeholderTextColor={theme.color.lightGray}
            />
            <Button varient="text">
              <SearchIcon width={30} height={30} fill={theme.color.secondary} />
            </Button>
          </SearchBox>
          <SpeciesBox>
            <ScrollView>
              {filteredData.map((species, index) => (
                <Species
                  key={index}
                  name={species.name}
                  onPress={() => {
                    updateIndividual('speciesId', species.id);
                    setSpeciesLabel(species.name);
                    navigation.goBack();
                  }}
                />
              ))}
            </ScrollView>
          </SpeciesBox>
        </Container>
      </Suspense>
    </SafeAreaView>
  );
};

export default SpeciesSelectScreen;
