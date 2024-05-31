import styled from '@emotion/native';
import DatePicker from 'react-native-date-picker';
import {Picker} from '@react-native-picker/picker';
import {KeyboardAvoidingView, Platform, ScrollView, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import SafeAreaView from '../components/common/SafeAreaView';
import Button from '../components/common/Button';
import theme from '../styles/theme';
import Male from '../assets/icons/male.svg';
import Female from '../assets/icons/female.svg';
import Genderless from '../assets/icons/genderless.svg';
import {Body1, Caption, Headline6} from '../components/common/TextGroup';
import TextArea from '../components/common/TextArea';
import ImagePickerActionSheet from '../components/ImagePickerActionSheet';
import useActionSheet from '../hooks/useActionSheet';
import ClickableAvatar from '../components/ClickableAvatar';
import {formatKorean} from '../utils/format-date';
import ModalView from '../components/common/ModalView';
import useCages from '../hooks/useCages';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../navigations/RootNavigation';
import useUpdateIndividual from '../hooks/useUpdateIndividual';

const Container = styled.View`
  margin: 0px ${props => props.theme.margin.screen};
  flex: 1;
`;

const ProfileBox = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 36px;
`;

const Info = styled.View`
  width: 100%;
`;

const Label = styled.Text`
  font-size: ${props => props.theme.fontSize.body1};
  margin-bottom: 10px;
`;

const Box = styled.View`
  margin-bottom: 20px;
`;

const GenderList = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding: 2px;
`;

const GenderButton = styled(Button)`
  border-radius: 10px;
  padding: 10px;
`;

const RegistButton = styled(Button)`
  margin-top: 32px;
`;

const InputValidationText = styled(Caption)<{color?: string}>`
  color: ${props => props.color};
  margin-top: 4px;
`;

interface IndividualInfoEditScreenProps
  extends RouteProp<RootStackParamList, 'IndividualInfoEditScreen'> {}

const IndividualInfoEditScreen = () => {
  const {params} = useRoute<IndividualInfoEditScreenProps>();
  const {mutate} = useUpdateIndividual();
  const {data: cages} = useCages();
  const [individual, setIndividual] =
    useState<IndividualInfoEditScreenProps['params']>(params);

  const {actionSheetRef, openActionSheet, closeActionSheet} = useActionSheet();

  const [isDateModalVisible, setIsDateModalVisible] = useState(false);
  const [isCageModalVisible, setIsCageModalVisible] = useState(false);
  const [selectedCageValue, setSelectedValue] = useState(individual.cage?.id);
  const [selectedCageValueIndex, setSelectedValueIndex] = useState(0);

  const [isValidName, setIsValidName] = useState(false);
  const [isValidHatchedAt, setIsValidHatchedAt] = useState(true);

  const onChange = <T extends keyof IndividualInfoEditScreenProps['params']>(
    key: T,
    value: IndividualInfoEditScreenProps['params'][T],
  ) => {
    setIndividual({
      ...individual,
      [key]: value,
    });
  };

  const onSave = () => {
    const {cage, ...data} = individual;
    console.log({
      ...data,
      ['cageId']: cage?.id,
    });
    mutate({
      ...data,
      ['cageId']: cage?.id,
    });
  };

  const validateName = () => {
    if (individual.name.length >= 2) {
      setIsValidName(true);
    } else {
      setIsValidName(false);
    }
  };

  const validateHatchedAt = () => {
    if (individual.hatchedAt) {
      const today = new Date().getTime();
      const difference = today - individual.hatchedAt.getTime();

      if (difference >= 0) {
        setIsValidHatchedAt(true);
      } else {
        setIsValidHatchedAt(false);
      }
    } else {
      setIsValidHatchedAt(true);
    }
  };

  useEffect(() => {
    validateName();
    validateHatchedAt();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [individual]);

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView>
          <Container>
            <ImagePickerActionSheet
              actionSheetRef={actionSheetRef}
              setImageUrl={(url: string) => onChange('avatarUrl', url)}
              closeActionSheet={closeActionSheet}
            />
            <ModalView
              isVisible={isCageModalVisible}
              setIsVisible={setIsCageModalVisible}>
              <View>
                <Picker
                  selectedValue={selectedCageValue}
                  onValueChange={(itemValue, itemIndex) => {
                    setSelectedValue(itemValue);
                    setSelectedValueIndex(itemIndex);
                  }}>
                  {cages.map((cage, index) => (
                    <Picker.Item
                      key={index}
                      label={cage.name}
                      value={cage.id}
                    />
                  ))}
                </Picker>
                <Button
                  onPress={() => {
                    onChange('cage', cages[selectedCageValueIndex]);
                    setIsCageModalVisible(false);
                  }}>
                  <Body1 color={theme.color.white}>확인</Body1>
                </Button>
              </View>
            </ModalView>

            <ProfileBox>
              <ClickableAvatar
                onPress={openActionSheet}
                uri={individual.avatarUrl}
                size={100}
              />
              <Info>
                <Box>
                  <Label>이름</Label>
                  <TextArea
                    multiline={false}
                    value={individual.name}
                    onChangeText={value => onChange('name', value)}
                    placeholder="이름을 입력해주세요!"
                    placeholderTextColor={theme.color.lightGray}
                  />
                  {!isValidName && (
                    <InputValidationText color={theme.color.red}>
                      * 이름은 2자 이상 입력해주세요
                    </InputValidationText>
                  )}
                </Box>
                <Box>
                  <Label>해칭일</Label>
                  <TextArea
                    multiline={false}
                    editable={false}
                    placeholder="해칭일을 입력해주세요!"
                    placeholderTextColor={theme.color.lightGray}
                    value={
                      individual.hatchedAt
                        ? formatKorean(individual.hatchedAt)
                        : ''
                    }
                    onPressIn={() => setIsDateModalVisible(true)}
                  />
                  {!isValidHatchedAt && (
                    <InputValidationText color={theme.color.red}>
                      * 태어난 날짜가 오늘 이후일 수 없어요
                    </InputValidationText>
                  )}
                  <DatePicker
                    modal
                    mode={'date'}
                    locale={'ko-KR'}
                    open={isDateModalVisible}
                    date={new Date()}
                    onConfirm={date => {
                      setIsDateModalVisible(false);
                      onChange('hatchedAt', date);
                    }}
                    onCancel={() => setIsDateModalVisible(false)}
                  />
                </Box>
                <Box>
                  <Label>성별</Label>
                  <GenderList>
                    <GenderButton
                      color={
                        individual.gender === 'FEMALE'
                          ? theme.color.secondary
                          : theme.color.primary
                      }
                      onPress={() => onChange('gender', 'FEMALE')}>
                      <Female width={50} height={50} fill={theme.color.white} />
                    </GenderButton>
                    <GenderButton
                      color={
                        individual.gender === 'MALE' ? '#00A7DD' : '#c7f1ff'
                      }
                      onPress={() => onChange('gender', 'MALE')}>
                      <Male width={50} height={50} fill={theme.color.white} />
                    </GenderButton>
                    <GenderButton
                      color={
                        individual.gender === 'LESS' ? '#FFB799' : '#fdf2b1'
                      }
                      onPress={() => onChange('gender', 'LESS')}>
                      <Genderless
                        width={50}
                        height={50}
                        fill={theme.color.white}
                      />
                    </GenderButton>
                  </GenderList>
                </Box>
                <Box>
                  <Label>사육장</Label>
                  <TextArea
                    multiline={false}
                    editable={false}
                    placeholder="사육장을 선택해봐요!"
                    placeholderTextColor={theme.color.lightGray}
                    onPressOut={() => setIsCageModalVisible(true)}
                    value={individual.cage?.name}
                  />
                </Box>
                <Box>
                  <View style={{flexDirection: 'row', gap: 4}}>
                    <Label>메모</Label>
                    <Caption>* 개체 카드 앞면에 표시돼요</Caption>
                  </View>
                  <TextArea
                    maxLength={10}
                    placeholder="예) 못된놈"
                    placeholderTextColor={theme.color.lightGray}
                    value={individual.memo || ''}
                    onChangeText={value => onChange('memo', value)}
                  />
                  <InputValidationText>
                    * 메모는 10자 이하로 입력해주세요
                  </InputValidationText>
                </Box>
              </Info>
            </ProfileBox>
            <RegistButton
              color={theme.color.secondary}
              disabled={!(isValidName && isValidHatchedAt)}
              onPress={onSave}>
              <Headline6 color={theme.color.white}>저장</Headline6>
            </RegistButton>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default IndividualInfoEditScreen;
