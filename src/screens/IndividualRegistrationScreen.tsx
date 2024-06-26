import styled from '@emotion/native';
import DatePicker from 'react-native-date-picker';
import {Picker} from '@react-native-picker/picker';
import {KeyboardAvoidingView, Platform, ScrollView, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import SafeAreaView from '../components/common/SafeAreaView';
import Button from '../components/common/Button';
import theme from '../styles/theme';
import SearchIcon from '../assets/icons/search.svg';
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
import {useNav} from '../hooks/useNav';
import useCreateIndividualStore from '../stores/useCreateIndividualStore';
import useCreateIndividual from '../hooks/useCreateIndividual';
import {IndividualType} from '../api/types';
import useCages from '../hooks/useCages';

interface SelectButtonProps {
  isSelected: boolean;
}

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

const Label = styled(Body1)`
  font-size: ${props => props.theme.fontSize.body1};
  margin-bottom: 10px;
`;

const Box = styled.View`
  margin-bottom: 20px;
`;

const ShortBox = styled.View`
  display: flex;
  flex-direction: row;
  gap: 10px;
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

const WeightList = styled.View`
  display: flex;
  flex-direction: row;
  gap: 5px;
`;

const WeightText = styled(Body1)`
  color: ${props => props.theme.color.white};
  font-weight: 700;
`;

const WeightButton = styled(Button)<SelectButtonProps>`
  background-color: ${props =>
    props.isSelected ? props.theme.color.secondary : props.theme.color.primary};
  width: 60px;
`;

const RegistButton = styled(Button)`
  margin-top: 48px;
`;

const InputValidationText = styled(Caption)<{color?: string}>`
  color: ${props => props.color};
  margin-top: 4px;
`;

const IndividualRegistrationScreen = () => {
  const navigation = useNav<'IndividualRegistrationScreen'>();
  const {mutate} = useCreateIndividual();
  const {data: cages} = useCages();
  const {updateIndividual, clear, ...individual} = useCreateIndividualStore(
    state => state,
  );
  const [speciesLabel, setSpeciesLabel] = useState('');

  const {actionSheetRef, openActionSheet, closeActionSheet} = useActionSheet();
  const [imageUrl, setImageUrl] = useState(
    'https://image.ckie.store/images/individual-profile.jpeg',
  );

  const [isDateModalVisible, setIsDateModalVisible] = useState(false);
  const [isCageModalVisible, setIsCageModalVisible] = useState(false);
  const [selectedCageValue, setSelectedValue] = useState('');
  const [selectedCageValueIndex, setSelectedValueIndex] = useState(0);
  const [selectedCageLabel, setSelectedLabel] = useState('');

  const [isValidName, setIsValidName] = useState(false);
  const [isValidWeight, setIsValidWeight] = useState(false);
  const [isValidHatchedAt, setIsValidHatchedAt] = useState(true);

  const onRegist = () => {
    console.log(individual);
    mutate(individual as IndividualType.CreateIndividualRequest);
    clear();
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

  const validateWeight = () => {
    if (individual.weight && individual.weight > 0) {
      setIsValidWeight(true);
    } else {
      setIsValidWeight(false);
    }
  };

  useEffect(() => {
    updateIndividual('avatarUrl', imageUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageUrl]);

  useEffect(() => {
    validateName();
    validateWeight();
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
              setImageUrl={setImageUrl}
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
                  <Picker.Item key={'default'} label={'선택'} value={''} />
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
                    setSelectedLabel(
                      cages[
                        selectedCageValueIndex !== 0
                          ? selectedCageValueIndex - 1
                          : 0
                      ].name,
                    );
                    updateIndividual('cageId', selectedCageValue);
                    setIsCageModalVisible(false);
                  }}>
                  <Body1 color={theme.color.white}>확인</Body1>
                </Button>
              </View>
            </ModalView>

            <ProfileBox>
              <ClickableAvatar
                onPress={openActionSheet}
                uri={imageUrl}
                size={100}
              />
              <Info>
                <Box>
                  <Label>이름</Label>
                  <TextArea
                    multiline={false}
                    value={individual.name}
                    onChangeText={value => updateIndividual('name', value)}
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
                      updateIndividual('hatchedAt', date);
                    }}
                    onCancel={() => setIsDateModalVisible(false)}
                  />
                </Box>
                <Box>
                  <Label>종선택</Label>
                  <ShortBox>
                    <TextArea
                      editable={false}
                      style={{flex: 1}}
                      multiline={false}
                      placeholder="종류를 검색해봐요!"
                      placeholderTextColor={theme.color.lightGray}
                      value={speciesLabel}
                    />
                    <Button
                      varient="text"
                      onPress={() =>
                        navigation.push('SpeciesSelectScreen', {
                          setSpeciesLabel: setSpeciesLabel,
                        })
                      }>
                      <SearchIcon
                        width={30}
                        height={30}
                        fill={theme.color.secondary}
                      />
                    </Button>
                  </ShortBox>
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
                      onPress={() => updateIndividual('gender', 'FEMALE')}>
                      <Female width={50} height={50} fill={theme.color.white} />
                    </GenderButton>
                    <GenderButton
                      color={
                        individual.gender === 'MALE' ? '#00A7DD' : '#c7f1ff'
                      }
                      onPress={() => updateIndividual('gender', 'MALE')}>
                      <Male width={50} height={50} fill={theme.color.white} />
                    </GenderButton>
                    <GenderButton
                      color={
                        individual.gender === 'LESS' ? '#FFB799' : '#fdf2b1'
                      }
                      onPress={() => updateIndividual('gender', 'LESS')}>
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
                    value={selectedCageLabel}
                  />
                </Box>
                <Box>
                  <Label>무게</Label>
                  <ShortBox>
                    <TextArea
                      style={{flex: 1}}
                      keyboardType={'decimal-pad'}
                      placeholder="무게를 입력해주세요!"
                      placeholderTextColor={theme.color.lightGray}
                      value={individual.weight ? String(individual.weight) : ''}
                      onChangeText={value =>
                        updateIndividual('weight', Number(value))
                      }
                    />
                    <WeightList>
                      <WeightButton
                        isSelected={individual.weightUnit === 'G'}
                        onPress={() => updateIndividual('weightUnit', 'G')}>
                        <WeightText>g</WeightText>
                      </WeightButton>
                      <WeightButton
                        isSelected={individual.weightUnit === 'KG'}
                        onPress={() => updateIndividual('weightUnit', 'KG')}>
                        <WeightText>kg</WeightText>
                      </WeightButton>
                    </WeightList>
                  </ShortBox>
                  {!isValidWeight && (
                    <InputValidationText color={theme.color.red}>
                      * 올바른 무게를 입력해주세요
                    </InputValidationText>
                  )}
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
                    onChangeText={value => updateIndividual('memo', value)}
                  />
                  <InputValidationText>
                    * 메모는 10자 이하로 입력해주세요
                  </InputValidationText>
                </Box>
              </Info>
            </ProfileBox>
            <RegistButton
              color={theme.color.secondary}
              disabled={!(isValidName && isValidWeight && isValidHatchedAt)}
              onPress={onRegist}>
              <Headline6 color={theme.color.white}>등록</Headline6>
            </RegistButton>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default IndividualRegistrationScreen;
