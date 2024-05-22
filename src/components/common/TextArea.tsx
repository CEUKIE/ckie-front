import styled from '@emotion/native';
import React from 'react';
import {TextInputProps} from 'react-native';

interface TextAreaProps extends TextInputProps {}

const Input = styled.TextInput`
  border: 1px solid ${props => props.theme.color.lightGray};
  border-radius: 8px;
  padding: 12px;
`;

const TextArea = (props: TextAreaProps) => {
  return <Input multiline {...props} />;
};

export default TextArea;
