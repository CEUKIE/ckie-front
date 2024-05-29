import React, {useEffect, useRef, useState} from 'react';
import styled from '@emotion/native';
import {RouteProp, useRoute} from '@react-navigation/native';

import SafeAreaView from '../components/common/SafeAreaView';
import UnderLineTextInput from '../components/common/UnderLineTextInput';
import {Body1, Caption, Headline6} from '../components/common/TextGroup';
import TextArea from '../components/common/TextArea';
import Avatar from '../components/common/Avatar';
import Button from '../components/common/Button';
import theme from '../styles/theme';
import {RootStackParamList} from '../navigations/RootNavigation';
import useSignup from '../hooks/useSignup';
import {TouchableWithoutFeedback} from 'react-native';
import {ActionSheetRef} from 'react-native-actions-sheet';
import ImagePickerActionSheet from '../components/ImagePickerActionSheet';

interface UserInfoInputScreenProps
  extends RouteProp<RootStackParamList, 'UserInfoInputScreen'> {}

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

const InputValidationText = styled(Caption)`
  color: ${props => props.theme.color.red};
`;

export interface Image {
  uri: string;
  type: string;
  name: string;
}

const UserInfoInputScreen = () => {
  const {params} = useRoute<UserInfoInputScreenProps>();
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const {mutate} = useSignup();

  const [avatarUrl, setAvatarUrl] = useState(
    'https://image.ckie.store/images/individual-profile.jpeg',
  );
  const [nickname, setNickname] = useState('');
  const [nicknameValidText, setNicknameValidText] = useState('');
  const [isValidNickname, setIsValidNickname] = useState(false);
  const [introduction, setIntroduction] = useState('');

  const openActionSheet = () => actionSheetRef.current?.show();
  const closeActionSheet = () => actionSheetRef.current?.hide();

  const signup = () => {
    mutate({
      accessToken: params.accessToken,
      avatarUrl,
      nickname,
      introduction,
    });
  };

  useEffect(() => {
    console.log(params.accessToken);
    if (nickname.length < 2) {
      setNicknameValidText('* 닉네임을 2자 이상 입력해주세요.');
      setIsValidNickname(false);
    } else {
      setNicknameValidText('');
      setIsValidNickname(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nickname]);

  return (
    <SafeAreaView>
      <Container>
        <ImagePickerActionSheet
          actionSheetRef={actionSheetRef}
          setImageUrl={setAvatarUrl}
          closeActionSheet={closeActionSheet}
        />
        <ContentBlock>
          <TouchableWithoutFeedback onPress={openActionSheet}>
            <AvatarBlock>
              <Avatar size={100} rounded uri={avatarUrl} />
            </AvatarBlock>
          </TouchableWithoutFeedback>
          <InfoContainer>
            <InfoBlock>
              <InfoTitle>닉네임</InfoTitle>
              <UnderLineTextInput
                maxLength={15}
                placeholder={'2~15자의 닉네임을 입력해주세요.'}
                value={nickname}
                onChangeText={setNickname}
              />
              <InputValidationText>{nicknameValidText}</InputValidationText>
            </InfoBlock>
            <InfoBlock>
              <InfoTitle>소개</InfoTitle>
              <TextArea
                maxLength={30}
                placeholder={'자신을 소개해주세요.'}
                value={introduction}
                onChangeText={setIntroduction}
              />
              <Caption>* 소개는 최대 30자입니다.</Caption>
            </InfoBlock>
          </InfoContainer>
        </ContentBlock>
        <Button
          color={theme.color.secondary}
          disabled={!isValidNickname}
          onPress={signup}>
          <Headline6 color={theme.color.white}>가입하기</Headline6>
        </Button>
      </Container>
    </SafeAreaView>
  );
};

export default UserInfoInputScreen;
