import React, {Suspense} from 'react';
import styled from '@emotion/native';
import {RouteProp, useRoute} from '@react-navigation/native';

import theme from '../styles/theme';
import SafeAreaView from '../components/common/SafeAreaView';
import Button from '../components/common/Button';
import SearchIcon from '../assets/icons/search.svg';
import Species from '../components/Species';
import useSpeciesList from '../hooks/useSpeciesList';
import Indicator from '../components/Indicator';
import {useNav} from '../hooks/useNav';
import useCageRegistrationStore from '../stores/useCageRegistrationStore';
import {RootStackParamList} from '../navigations/CageRegistrationStack';
import useCageConnectStore from '../stores/useCageConnectStore';

interface SpeciesSelectScreenProps
  extends RouteProp<RootStackParamList, 'CageSpeciesSelectScreen'> {}

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

const CageSpeciesSelectScreen = () => {
  const navigation = useNav<'SpeciesSelectScreen'>();
  const {setSpeciesLabel} = useRoute<SpeciesSelectScreenProps>().params;
  const updateSpeciesId = useCageRegistrationStore(
    state => state.updateSpeciesId,
  );
  const {updateCage} = useCageConnectStore(state => state);
  const {data} = useSpeciesList();

  return (
    <SafeAreaView>
      <Suspense fallback={<Indicator />}>
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
            {data.map((species, index) => (
              <Species
                key={index}
                name={species.name}
                onPress={() => {
                  updateSpeciesId(species.id);
                  setSpeciesLabel(species.name);
                  updateCage('minTemp', species.minTemperature);
                  updateCage('maxTemp', species.maxTemperature);
                  updateCage('minHumidity', species.minHumidity);
                  updateCage('maxHumidity', species.maxHumidity);
                  navigation.goBack();
                }}
              />
            ))}
          </SpeciesBox>
        </Container>
      </Suspense>
    </SafeAreaView>
  );
};

export default CageSpeciesSelectScreen;
