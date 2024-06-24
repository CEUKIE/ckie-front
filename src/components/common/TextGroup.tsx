import styled from '@emotion/native';
import {ColorValue, TextProps} from 'react-native';

type ITextProps = TextProps & {
  color?: ColorValue;
};

export const Headline5 = styled.Text<ITextProps>`
  font-family: 'Pretendard';
  color: ${({color}) => (color ? color.toString() : 'black')};
  font-size: ${({theme}) => theme.fontSize.headline5};
  font-weight: 700;
`;

export const Headline6 = styled.Text<ITextProps>`
  font-family: 'Pretendard';
  color: ${({color}) => (color ? color.toString() : 'black')};
  font-size: ${({theme}) => theme.fontSize.headline6};
  font-weight: 500;
`;

export const Body1 = styled.Text<ITextProps>`
  font-family: 'Pretendard';
  color: ${({color}) => (color ? color.toString() : 'black')};
  font-size: ${({theme}) => theme.fontSize.body1};
`;

export const Body2 = styled.Text<ITextProps>`
  font-family: 'Pretendard';
  color: ${({color}) => (color ? color.toString() : 'black')};
  font-size: ${({theme}) => theme.fontSize.body2};
`;

export const Caption = styled.Text<ITextProps>`
  font-family: 'Pretendard';
  color: ${({color, theme}) => (color ? color.toString() : theme.color.gray)};
  font-size: ${({theme}) => theme.fontSize.caption};
`;

export const Overline = styled.Text<ITextProps>`
  color: ${({color}) => (color ? color.toString() : 'black')};
  font-size: ${({theme}) => theme.fontSize.overline};
`;
