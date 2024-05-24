import styled from '@emotion/native';
import React, {useState} from 'react';

import {Body1, Headline6} from '../components/common/TextGroup';
import Avatar from '../components/common/Avatar';
import SafeAreaView from '../components/common/SafeAreaView';
import UnderLineTextInput from '../components/common/UnderLineTextInput';
import TextArea from '../components/common/TextArea';
import MenuButton from '../components/MenuButton';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../navigations/RootNavigation';
import Button from '../components/common/Button';
import theme from '../styles/theme';

interface UserInfoEditScreenProps
  extends RouteProp<RootStackParamList, 'UserInfoEditScreen'> {}

const Container = styled.View`
  flex: 1;
  margin: 0 ${props => props.theme.margin.screen};
  padding: ${props => props.theme.margin.screen} 0;
  justify-content: space-between;
`;

const ContentBlock = styled.View`
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

const UserInfoEditScreen = () => {
  const {params} = useRoute<UserInfoEditScreenProps>();
  const [newAvatar, setNewAvatar] = useState(params.avatarUrl);
  const [newNickname, setNewNickname] = useState(params.nickname);
  const [newIntroduction, setNewIntroduction] = useState(params.introduction);

  return (
    <SafeAreaView>
      <Container>
        <ContentBlock>
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
                  params.platform === 'kakao'
                    ? '카카오'
                    : params.platform === 'google'
                    ? '구글'
                    : '네이버'
                })`}
              />
            </AccountBlock>
          </InfoContainer>
        </ContentBlock>
        <Button>
          <Headline6 color={theme.color.white}>저장</Headline6>
        </Button>
      </Container>
    </SafeAreaView>
  );
};

export default UserInfoEditScreen;
