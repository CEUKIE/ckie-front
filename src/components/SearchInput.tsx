import styled from '@emotion/native';
import React from 'react';

import SearchIcon from '../assets/icons/search.svg';
import Button from './common/Button';
import theme from '../styles/theme';
import {TextInputProps} from 'react-native';

interface SearchInputProps extends TextInputProps {
  placeholder: string;
}

const Container = styled.View`
  border: 2px solid ${props => props.theme.color.secondary};
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  padding: 4px 10px;
`;

const Input = styled.TextInput`
  display: flex;
  flex: 1;
  font-size: ${props => props.theme.fontSize.body1};
`;

const SearchInput = ({placeholder, ...rest}: SearchInputProps) => {
  return (
    <Container>
      <Input
        placeholder={placeholder}
        placeholderTextColor={theme.color.lightGray}
        {...rest}
      />
      <Button varient="text">
        <SearchIcon width={30} height={30} fill={theme.color.secondary} />
      </Button>
    </Container>
  );
};

export default SearchInput;
