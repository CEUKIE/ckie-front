import React, {useState} from 'react';
import styled from '@emotion/native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import SafeAreaView from '../components/common/SafeAreaView';
import Button from '../components/common/Button';
import {Body1, Headline6} from '../components/common/TextGroup';
import {RootStackParamList} from '../navigations/CageRegistrationStack';
import ClickableAvatar from '../components/ClickableAvatar';
import ImagePickerActionSheet from '../components/ImagePickerActionSheet';
import useActionSheet from '../hooks/useActionSheet';
import TextArea from '../components/common/TextArea';
import theme from '../styles/theme';
import SearchIcon from '../assets/icons/search.svg';
import useCageRegistrationStore from '../stores/useCageRegistrationStore';
import useCageConnectStore from '../stores/useCageConnectStore';

const Container = styled.View`
  margin: 0 ${props => props.theme.margin.screen};
  flex: 1;
  justify-content: space-between;
`;

const ContenetBlock = styled.View`
  gap: 64px;
`;

const Title = styled(Headline6)``;

const InputBlock = styled.View`
  gap: 48px;
`;

const InputBox = styled.View`
  gap: 8px;
`;

const SpeciesBox = styled.View`
  flex-direction: row;
  gap: 10px;
`;

const SearhchButton = styled(Button)`
  padding: 18px 0;
`;

const CageInfoInputScreen = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParamList, 'BluetoothConnectScreen'>
    >();
  const {actionSheetRef, openActionSheet, closeActionSheet} = useActionSheet();
  const [avatarUrl, setAvatarUrl] = useState(
    'https://image.ckie.store/images/individual-profile.jpeg',
  );
  const [speciesLabel, setSpeciesLabel] = useState('');
  const {name, speciesId, updateName} = useCageRegistrationStore(
    state => state,
  );
  const states = useCageConnectStore(state => state);

  return (
    <SafeAreaView>
      <Container>
        <ImagePickerActionSheet
          actionSheetRef={actionSheetRef}
          closeActionSheet={closeActionSheet}
          setImageUrl={setAvatarUrl}
        />
        <ContenetBlock>
          <ClickableAvatar
            onPress={openActionSheet}
            uri={avatarUrl}
            size={100}
          />
          <InputBlock>
            <InputBox>
              <Title>이름</Title>
              <TextArea
                multiline={false}
                value={name}
                onChangeText={updateName}
                placeholder="사육장 이름을 입력해주세요"
                placeholderTextColor={theme.color.lightGray}
              />
            </InputBox>
            <InputBox>
              <Title>종 선택</Title>
              <SpeciesBox>
                <TextArea
                  editable={false}
                  style={{flex: 1}}
                  multiline={false}
                  value={speciesLabel}
                  placeholder="사육할 종을 선택해주세요"
                  placeholderTextColor={theme.color.lightGray}
                />
                <Button
                  varient="text"
                  onPress={() =>
                    navigation.push('CageSpeciesSelectScreen', {
                      setSpeciesLabel,
                    })
                  }>
                  <SearchIcon
                    width={30}
                    height={30}
                    fill={theme.color.secondary}
                  />
                </Button>
              </SpeciesBox>
            </InputBox>
          </InputBlock>
        </ContenetBlock>
        <SearhchButton
          onPress={() => {
            console.log(JSON.stringify(states, null, 2));
            navigation.push('WifiInfoScreen');
          }}
          disabled={!(name && speciesId)}>
          <Body1>다음</Body1>
        </SearhchButton>
      </Container>
    </SafeAreaView>
  );
};

export default CageInfoInputScreen;
