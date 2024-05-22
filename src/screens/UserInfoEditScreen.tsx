import styled from '@emotion/native';
import React, {useState} from 'react';

import {Body1} from '../components/common/TextGroup';
import Avatar from '../components/common/Avatar';
import SafeAreaView from '../components/common/SafeAreaView';
import UnderLineTextInput from '../components/common/UnderLineTextInput';
import TextArea from '../components/common/TextArea';
import MenuButton from '../components/MenuButton';

interface UserInfoEditScreenProps {
  avatarUrl: string;
  nickname: string;
  introduction: string;
  platform: 'kakao' | 'google' | 'naver';
}

const Container = styled.View`
  margin: 0 ${props => props.theme.margin.screen};
  padding: ${props => props.theme.margin.screen} 0;
  gap: 48px;
`;

const AvatarBlock = styled.View`
  align-items: center;
`;

const InfoContainer = styled.View`
  gap: 48px;
`;

const InfoBlock = styled.View`
  gap: 12px;
`;

const InfoTitle = styled(Body1)`
  color: ${props => props.theme.color.font.text1};
  font-weight: 600;
`;

const AccountBlock = styled.View``;

const UserInfoEditScreen = ({
  avatarUrl = 'https://image.ckie.store/images/default-profile-image.png',
  nickname = '달팽이',
  introduction = '다들 안녕',
  platform = 'naver',
}: UserInfoEditScreenProps) => {
  const [newAvatar, setNewAvatar] = useState(avatarUrl);
  const [newNickname, setNewNickname] = useState(nickname);
  const [newIntroduction, setNewIntroduction] = useState(introduction);

  return (
    <SafeAreaView>
      <Container>
        <AvatarBlock>
          <Avatar size={100} rounded uri={newAvatar} />
        </AvatarBlock>
        <InfoContainer>
          <InfoBlock>
            <InfoTitle>닉네임</InfoTitle>
            <UnderLineTextInput
              placeholder={'2~15자의 닉네임을 입력해주세요.'}
              value={newNickname}
              onChangeText={setNewNickname}
              autoFocus
            />
          </InfoBlock>
          <InfoBlock>
            <InfoTitle>소개</InfoTitle>
            <TextArea
              placeholder={'자신을 소개해주세요.'}
              value={newIntroduction}
              onChangeText={setNewIntroduction}
            />
          </InfoBlock>
          <AccountBlock>
            <MenuButton
              text={`로그아웃 (${
                platform === 'kakao'
                  ? '카카오'
                  : platform === 'google'
                  ? '구글'
                  : '네이버'
              })`}
            />
          </AccountBlock>
        </InfoContainer>
      </Container>
    </SafeAreaView>
  );
};

export default UserInfoEditScreen;
