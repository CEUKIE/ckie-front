import styled from '@emotion/native';
import React, {useEffect, useState} from 'react';

import {Body1, Caption, Headline6} from '../components/common/TextGroup';
import SafeAreaView from '../components/common/SafeAreaView';
import UnderLineTextInput from '../components/common/UnderLineTextInput';
import TextArea from '../components/common/TextArea';
import MenuButton from '../components/MenuButton';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../navigations/RootNavigation';
import Button from '../components/common/Button';
import theme from '../styles/theme';
import useUpdateUser from '../hooks/useUpdateUser';
import ImagePickerActionSheet from '../components/ImagePickerActionSheet';
import ClickableAvatar from '../components/ClickableAvatar';
import useActionSheet from '../hooks/useActionSheet';
import {useNav} from '../hooks/useNav';

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

const AccountBlock = styled.View``;

const UserInfoEditScreen = () => {
  const navigation = useNav<'UserInfoEditScreen'>();
  const {actionSheetRef, openActionSheet, closeActionSheet} = useActionSheet();
  const {params} = useRoute<UserInfoEditScreenProps>();
  const {mutate} = useUpdateUser();

  const [nicknameValidText, setNicknameValidText] = useState('');
  const [isValidNickname, setIsValidNickname] = useState(false);
  const [newAvatar, setNewAvatar] = useState(params.avatarUrl);
  const [newNickname, setNewNickname] = useState(params.nickname);
  const [newIntroduction, setNewIntroduction] = useState(params.introduction);

  const onPressSave = () => {
    mutate({
      avatarUrl: newAvatar,
      nickname: newNickname,
      introduction: newIntroduction,
    });
    navigation.goBack();
  };

  useEffect(() => {
    if (newNickname.length < 2) {
      setNicknameValidText('* 닉네임을 2자 이상 입력해주세요.');
      setIsValidNickname(false);
    } else {
      setNicknameValidText('');
      setIsValidNickname(true);
    }
  }, [newNickname]);

  return (
    <SafeAreaView>
      <Container>
        <ImagePickerActionSheet
          actionSheetRef={actionSheetRef}
          setImageUrl={setNewAvatar}
          closeActionSheet={closeActionSheet}
        />
        <ContentBlock>
          <ClickableAvatar
            onPress={openActionSheet}
            uri={newAvatar}
            size={100}
          />
          <InfoContainer>
            <InfoBlock>
              <InfoTitle>닉네임</InfoTitle>
              <UnderLineTextInput
                placeholder={'2~15자의 닉네임을 입력해주세요.'}
                value={newNickname}
                onChangeText={setNewNickname}
              />
              <InputValidationText>{nicknameValidText}</InputValidationText>
            </InfoBlock>
            <InfoBlock>
              <InfoTitle>소개</InfoTitle>
              <TextArea
                placeholder={'자신을 소개해주세요.'}
                value={newIntroduction}
                onChangeText={setNewIntroduction}
                maxLength={30}
                numberOfLines={3}
              />
            </InfoBlock>
            <AccountBlock>
              <MenuButton
                text={`${
                  params.platform === 'KAKAO'
                    ? '카카오'
                    : params.platform === 'GOOGLE'
                    ? '구글'
                    : '네이버'
                }로 가입했어요`}
              />
            </AccountBlock>
          </InfoContainer>
        </ContentBlock>
        <Button
          onPress={onPressSave}
          color={theme.color.secondary}
          disabled={!isValidNickname}>
          <Headline6 color={theme.color.white}>저장</Headline6>
        </Button>
      </Container>
    </SafeAreaView>
  );
};

export default UserInfoEditScreen;
