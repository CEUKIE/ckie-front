import styled from '@emotion/native';
import React from 'react';
import theme from '../../styles/theme';
import {TextInputProps} from 'react-native';

interface UnderLuneTextInputProps extends TextInputProps {
  fontSize?: number | undefined;
}

const Input = styled.TextInput<{fontSize: number | undefined}>`
  padding: 8px 0;
  font-size: ${({fontSize}) => (fontSize ? fontSize : '14px')};
`;

const UnderLineTextInput = ({fontSize, ...rest}: UnderLuneTextInputProps) => {
  return (
    <Input
      {...rest}
      fontSize={fontSize}
      style={{borderBottomWidth: 1, borderBottomColor: theme.color.lightGray}}
    />
  );
};

export default UnderLineTextInput;
