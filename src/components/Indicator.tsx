import styled from '@emotion/native';
import React from 'react';
import {ActivityIndicator} from 'react-native';

import theme from '../styles/theme';

const Container = styled.View``;

const Indicator = () => {
  return (
    <Container>
      <ActivityIndicator
        size={'large'}
        color={theme.color.secondary}
        style={{marginTop: 24}}
      />
    </Container>
  );
};

export default Indicator;
