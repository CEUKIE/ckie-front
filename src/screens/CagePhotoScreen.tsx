import styled from '@emotion/native';
import React from 'react';

import SafeAreaView from '../components/common/SafeAreaView';
import useIndividualIdStore from '../stores/useIndividualIdStore';
import {Headline6} from '../components/common/TextGroup';

const Container = styled.View`
  margin-top: 24px;
`;

const CagePhotoScreen = () => {
  const id = useIndividualIdStore(state => state.id);

  return (
    <SafeAreaView>
      <Container>
        <Headline6>{id}</Headline6>
      </Container>
    </SafeAreaView>
  );
};

export default CagePhotoScreen;
