import styled from '@emotion/native';
import DatePicker from 'react-native-date-picker';
import {Picker} from '@react-native-picker/picker';
import {ScrollView, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import SafeAreaView from '../components/common/SafeAreaView';
import Button from '../components/common/Button';
import theme from '../styles/theme';
import SearchIcon from '../assets/icons/search.svg';
import Male from '../assets/icons/male.svg';
import Female from '../assets/icons/female.svg';
import Genderless from '../assets/icons/genderless.svg';
import {IndividualType} from '../api/types';
import {Body1} from '../components/common/TextGroup';
import TextArea from '../components/common/TextArea';
import ImagePickerActionSheet from '../components/ImagePickerActionSheet';
import useActionSheet from '../hooks/useActionSheet';
import ClickableAvatar from '../components/ClickableAvatar';
import {formatKorean} from '../utils/format-date';
import ModalView from '../components/common/ModalView';

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

const Label = styled.Text`
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

const IndividualRegistrationScreen = () => {
  const {actionSheetRef, openActionSheet, closeActionSheet} = useActionSheet();

  const [imageUrl, setImageUrl] = useState(
    'https://image.ckie.store/images/individual-profile.jpeg',
  );
  const [individual, setIndividual] =
    useState<IndividualType.CreateIndividualRequest>({
      name: '',
      avatarUrl: imageUrl,
      weight: 0,
      weightUnit: 'G',
      gender: 'MALE',
      speciesId: '',
      hatchedAt: null,
    });

  const [DateOpen, setDateOpen] = useState(false);
  const [iscageModalVisible, setIsCageModalVisible] = useState(false);
  const [selectedCageValue, setSelectedValue] = useState('');
  const [selectedCageValueIndex, setSelectedValueIndex] = useState(0);
  const [selectedCageLabel, setSelectedLabel] = useState('');

  const cageOptions = [
    {
      label: '코따리의 사육장',
      value: 'c3bfa6a7-ebdd-4a2b-aadb-1bc9644a6b5f',
    },
    {
      label: '코따리의 사육장',
      value: 'c3bfa6a7-ebdd-4a2b-aadb-1bc9644a6b5f',
    },
  ];

  useEffect(() => {
    setIndividual({
      ...individual,
      avatarUrl: imageUrl,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageUrl]);

  useEffect(() => {
    console.log(individual);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [individual.cageId]);

  const onChangeIndividual = <
    T extends keyof IndividualType.CreateIndividualRequest,
  >(
    key: T,
    value: IndividualType.CreateIndividualRequest[T],
  ) => {
    setIndividual({
      ...individual,
      [key]: value,
    });
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <Container>
          <ImagePickerActionSheet
            actionSheetRef={actionSheetRef}
            setImageUrl={setImageUrl}
            closeActionSheet={closeActionSheet}
          />

          <ModalView
            isVisible={iscageModalVisible}
            setIsVisible={setIsCageModalVisible}>
            <View>
              <Picker
                selectedValue={selectedCageValue}
                onValueChange={(itemValue, itemIndex) => {
                  setSelectedValue(itemValue);
                  setSelectedValueIndex(itemIndex);
                }}>
                {cageOptions.map((cage, index) => (
                  <Picker.Item
                    key={index}
                    label={cage.label}
                    value={cage.value}
                  />
                ))}
              </Picker>
              <Button
                onPress={() => {
                  setSelectedLabel(cageOptions[selectedCageValueIndex].label);
                  onChangeIndividual('cageId', selectedCageValue);
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
                  onChangeText={value => onChangeIndividual('name', value)}
                  placeholder="이름을 입력해주세요!"
                  placeholderTextColor={theme.color.lightGray}
                />
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
                  onPressIn={() => setDateOpen(true)}
                />
                <DatePicker
                  modal
                  mode={'date'}
                  locale={'ko-KR'}
                  open={DateOpen}
                  date={new Date()}
                  onConfirm={date => {
                    setDateOpen(false);
                    onChangeIndividual('hatchedAt', date);
                  }}
                  onCancel={() => setDateOpen(false)}
                />
              </Box>
              <Box>
                <Label>종선택</Label>
                <ShortBox>
                  <TextArea
                    style={{flex: 1}}
                    multiline={false}
                    placeholder="종류를 검색해봐요!"
                    placeholderTextColor={theme.color.lightGray}
                  />
                  <Button varient="text">
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
                    onPress={() => onChangeIndividual('gender', 'FEMALE')}>
                    <Female width={50} height={50} fill={theme.color.white} />
                  </GenderButton>
                  <GenderButton
                    color={individual.gender === 'MALE' ? '#00A7DD' : '#c7f1ff'}
                    onPress={() => onChangeIndividual('gender', 'MALE')}>
                    <Male width={50} height={50} fill={theme.color.white} />
                  </GenderButton>
                  <GenderButton
                    color={individual.gender === 'LESS' ? '#FFB799' : '#fdf2b1'}
                    onPress={() => onChangeIndividual('gender', 'LESS')}>
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
                  onPressIn={() => setIsCageModalVisible(true)}
                  value={selectedCageLabel}
                />
              </Box>
              <Box>
                <Label>무게</Label>
                <ShortBox>
                  <TextArea
                    style={{flex: 1}}
                    keyboardType={'numeric'}
                    placeholder="무게를 입력해주세요!"
                    placeholderTextColor={theme.color.lightGray}
                  />
                  <WeightList>
                    <WeightButton
                      isSelected={individual.weightUnit === 'G'}
                      onPress={() => onChangeIndividual('weightUnit', 'G')}>
                      <WeightText>g</WeightText>
                    </WeightButton>
                    <WeightButton
                      isSelected={individual.weightUnit === 'KG'}
                      onPress={() => onChangeIndividual('weightUnit', 'KG')}>
                      <WeightText>kg</WeightText>
                    </WeightButton>
                  </WeightList>
                </ShortBox>
              </Box>
              <Box>
                <Label>메모</Label>
                <TextArea
                  maxLength={20}
                  placeholder="메모를 입력해주세요!"
                  placeholderTextColor={theme.color.lightGray}
                />
              </Box>
            </Info>
          </ProfileBox>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

export default IndividualRegistrationScreen;
