import styled from '@emotion/native';
import React from 'react';
import {TextInputProps} from 'react-native';

interface TextAreaProps extends TextInputProps {
  fontSize?: number | undefined;
}

const Input = styled.TextInput<{fontSize?: number | undefined}>`
  font-size: ${({fontSize}) => (fontSize ? `${fontSize}px` : '14px')};
  border: 1px solid ${props => props.theme.color.lightGray};
  border-radius: 8px;
  padding: 12px;
`;

const TextArea = ({fontSize, ...rest}: TextAreaProps) => {
  return <Input {...rest} fontSize={fontSize} multiline />;
};

export default TextArea;
