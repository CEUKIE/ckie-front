import styled from '@emotion/native';
import React from 'react';

import {Body1} from './common/TextGroup';
import {TouchableWithoutFeedback} from 'react-native';

interface SpeciesProps {
  onPress: () => void;
  name: string;
}

const Container = styled.View`
  padding: 23px 0px;
  border-bottom-width: 1px;
  border-bottom-color: ${props => props.theme.color.lightGray};
`;

const Species = ({onPress, name}: SpeciesProps) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Container>
        <Body1>{name}</Body1>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default Species;
