import styled from '@emotion/native';
import React from 'react';
import {TouchableWithoutFeedback} from 'react-native';

import Avatar from './common/Avatar';
import CameraIcon from '../assets/icons/camera-fill-icon.svg';
import theme from '../styles/theme';

interface ClickableAvatarProps {
  onPress: () => void;
  uri: string;
  size: number;
}

const AvatarBlockOuter = styled.View`
  align-items: center;
`;

const AvatarBlock = styled.View`
  align-items: center;
  background-color: rebeccapurple;
  border-radius: 24px;
  width: 100px;
`;

const AvatarDecoration = styled.View`
  position: absolute;
  background-color: ${props => props.theme.color.secondary};
  padding: 8px;
  border-radius: 28px;
  bottom: -10px;
  right: -10px;
`;

const ClickableAvatar = ({onPress, uri, size}: ClickableAvatarProps) => {
  return (
    <AvatarBlockOuter>
      <TouchableWithoutFeedback onPress={onPress}>
        <AvatarBlock>
          <Avatar size={size} rounded uri={uri} />
          <AvatarDecoration>
            <CameraIcon width={20} height={20} fill={theme.color.white} />
          </AvatarDecoration>
        </AvatarBlock>
      </TouchableWithoutFeedback>
    </AvatarBlockOuter>
  );
};

export default ClickableAvatar;
