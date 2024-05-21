import styled from '@emotion/native';
import React from 'react';
import theme from '../../styles/theme';

interface AvatarProps {
  uri: string;
  size: number;
  rounded?: boolean;
}

const Image = styled.Image<{size: number; rounded?: boolean}>`
  width: ${({size}) => (size ? `${size}px` : '48px')};
  height: ${({size}) => (size ? `${size}px` : '48px')};
  border-radius: ${({rounded, size}) => (rounded ? '24px' : `${size / 2}px`)};
`;

const Avatar = ({uri, size, rounded}: AvatarProps) => {
  return (
    <Image
      source={{uri}}
      size={size}
      rounded={rounded}
      style={{borderWidth: 1, borderColor: theme.color.silver}}
    />
  );
};

export default Avatar;
