import styled from '@emotion/native';
import {ScrollView, Modal, Text} from 'react-native';
import React, {useState} from 'react';
import DatePicker from 'react-native-date-picker';
import {Picker} from '@react-native-picker/picker';

import SafeAreaView from '../components/common/SafeAreaView';
import Button from '../components/common/Button';
import CameraIcon from '../assets/icons/camera.svg';
import theme from '../styles/theme';
import Male from '../assets/icons/male.svg';
import Female from '../assets/icons/female.svg';
import Genderless from '../assets/icons/genderless.svg';

const Container = styled.View`
  margin: 0px ${props => props.theme.margin.screen};
  flex: 1;
`;

const ProfileBox = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Profile = styled.View`
  border: 3px solid ${({theme}) => theme.color.lightGray};
  border-radius: 10px;
  padding: 35px;
  margin-bottom: 30px;
  box-shadow: 0px 0px 4px ${({theme}) => theme.color.lightGray};
  background-color: ${({theme}) => theme.color.white};
`;

const Info = styled.View`
  width: 100%;
`;

const Label = styled.Text`
  font-size: ${({theme}) => theme.fontSize.body1};
  margin-bottom: 10px;
`;

const Input = styled.TextInput`
  padding: 10px;
  display: flex;
  border-width: 2px;
  width: 93%;
  border-radius: 10px;
  border-color: ${({theme}) => theme.color.lightGray};
  background-color: ${({theme}) => theme.color.white};
  elevation: 5; /* 그림자 효과 크기 조절 */
  shadow-color: #000; /* 그림자 색상 */
  shadow-offset: 0px 2px; /* 그림자 위치 조절 */
  shadow-opacity: 0.2; /* 그림자 투명도 조절 */
  shadow-radius: 3px; /* 그림자 반경 */
`;

const Box = styled.View`
  margin-bottom: 20px;
`;

const ShortBox = styled.View`
  display: flex;
  flex-direction: row;
`;

const SearchInput = styled.TextInput`
  margin-right: 5px;
  padding: 10px;
  display: flex;
  border-width: 2px;
  width: 85%;
  border-radius: 10px;
  border-color: ${({theme}) => theme.color.lightGray};
  background-color: ${({theme}) => theme.color.white};
  elevation: 5; /* 그림자 효과 크기 조절 */
  shadow-color: #000; /* 그림자 색상 */
  shadow-offset: 0px 2px; /* 그림자 위치 조절 */
  shadow-opacity: 0.2; /* 그림자 투명도 조절 */
  shadow-radius: 3px; /* 그림자 반경 */
`;

const GenderList = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding: 2px;
`;

const MaleBox = styled.View`
  background-color: #c7f1ff;
  border-radius: 10px;
  padding: 10px;
`;

const FemaleBox = styled.View`
  background-color: #ffc7c7;
  border-radius: 10px;
  padding: 10px;
`;

const GenderLessBox = styled.View`
  background-color: #fdf2b1;
  border-radius: 10px;
  padding: 10px;
`;

const ModalBack = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: 'rgba(0,0,0,0.5)';
`;

const ModalBox = styled.View`
  background-color: ${({theme}) => theme.color.white};
  width: 80%;
  border-radius: 10px;
  padding: 20px;
`;

const WeightInput = styled.TextInput`
  margin-right: 5px;
  padding: 10px;
  display: flex;
  border-width: 2px;
  width: 65%;
  border-radius: 10px;
  border-color: ${({theme}) => theme.color.lightGray};
  background-color: ${({theme}) => theme.color.white};
  elevation: 5; /* 그림자 효과 크기 조절 */
  shadow-color: #000; /* 그림자 색상 */
  shadow-offset: 0px 2px; /* 그림자 위치 조절 */
  shadow-opacity: 0.2; /* 그림자 투명도 조절 */
  shadow-radius: 3px; /* 그림자 반경 */
`;

const WeightList = styled.View`
  display: flex;
  flex-direction: row;
  gap: 5px;
`;

const WeightText = styled.Text`
  color: #7d7d7d;
  font-weight: 700;
`;

const WeightButton = styled(Button)`
  width: 25%;
  elevation: 5; /* 그림자 효과 크기 조절 */
  shadow-color: #000; /* 그림자 색상 */
  shadow-offset: 0px 2px; /* 그림자 위치 조절 */
  shadow-opacity: 0.1; /* 그림자 투명도 조절 */
  shadow-radius: 3px; /* 그림자 반경 */
`;

const IndividualInfoEditScreen = () => {
  const [date, setDate] = useState(new Date());
  const [DateOpen, setDateOpen] = useState(false);
  const [CageOpen, setCageOpen] = useState(false);

  const [selectedValue, setSelectedValue] = useState('');

  return (
    <SafeAreaView>
      <ScrollView>
        <Container>
          <Modal visible={CageOpen} transparent={true} animationType="slide">
            <ModalBack>
              <ModalBox>
                <Picker
                  selectedValue={selectedValue}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedValue(itemValue)
                  }>
                  <Picker.Item label="사육장1" value="사육장1" />
                  <Picker.Item label="사육장2" value="사육장2" />
                  <Picker.Item label="사육장3" value="사육장3" />
                </Picker>
                <Button varient="text" onPress={() => setCageOpen(false)}>
                  <Text>확인</Text>
                </Button>
              </ModalBox>
            </ModalBack>
          </Modal>
          <ProfileBox>
            <Profile>
              <Button varient="text">
                <CameraIcon width={45} height={45} fill={theme.color.gray} />
              </Button>
            </Profile>
            <Info>
              <Box>
                <Label>이름</Label>
                <Input
                  placeholder="이름을 입력해주세요!"
                  placeholderTextColor={theme.color.lightGray}
                />
              </Box>
              <Box>
                <Label>해칭일</Label>
                <Input
                  editable={false}
                  placeholder="해칭일을 입력해주세요!"
                  placeholderTextColor={theme.color.lightGray}
                  value={`${date.getFullYear()}년 ${
                    date.getMonth() + 1
                  }월 ${date.getDate()}일`}
                  onPressIn={() => setDateOpen(true)}
                />
                <DatePicker
                  modal
                  mode={'date'}
                  open={DateOpen}
                  date={date}
                  onConfirm={date => {
                    setDateOpen(false);
                    setDate(date);
                  }}
                  onCancel={() => {
                    setDateOpen(false);
                  }}
                />
              </Box>
              <Box>
                <Label>성별</Label>
                <GenderList>
                  <Button varient="text">
                    <FemaleBox>
                      <Female width={50} height={50} fill={theme.color.white} />
                    </FemaleBox>
                  </Button>
                  <Button varient="text">
                    <MaleBox>
                      <Male width={50} height={50} fill={theme.color.white} />
                    </MaleBox>
                  </Button>
                  <Button varient="text">
                    <GenderLessBox>
                      <Genderless
                        width={50}
                        height={50}
                        fill={theme.color.white}
                      />
                    </GenderLessBox>
                  </Button>
                </GenderList>
              </Box>
              <Box>
                <Label>사육장</Label>
                <Input
                  placeholder="사육장을 선택해봐요!"
                  placeholderTextColor={theme.color.lightGray}
                  onPressIn={() => setCageOpen(true)}
                  value={selectedValue}
                />
              </Box>
              <Box>
                <Label>메모</Label>
                <Input
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

export default IndividualInfoEditScreen;
