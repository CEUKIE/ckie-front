import styled from '@emotion/native';
import React from 'react';
import {Image} from 'react-native';

import {useNav} from '../hooks/useNav';

export interface CageCardProps {}

const Card = styled.TouchableOpacity`
  background-color: ${props => props.theme.color.primary};
  padding: 20px;
  border-radius: 10px;
  margin: 8px;
`;
const IndividualBox = styled.View`
  background-color: white;
  width: 100%;
`;
const ProfileBlock = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 4px;
`;
const ProfileImage = styled(Image)`
  width: 100px;
  height: 100px;
  border-radius: 10px;
`;
const InfoBlock = styled.View`
  display: flex;
  gap: 5px;
`;
const HatchDate = styled.Text`
  text-align: center;
`;
const NameBlock = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: baseline;
  gap: 3px;
  text-align: center;
`;
const Name = styled.Text``;

const MemoBlock = styled.View`
  margin: 0px 10px 5px 10px;
  border-radius: 10px;
  background-color: #ffdfbe;
`;
const Memo = styled.Text`
  border-radius: 5px;
  text-align: center;
  padding: 10px;
  display: flex;
`;

const CageCard = () => {
  const navigation = useNav<'MainTab'>();

  return (
    <Card onPress={() => navigation.push('CageTopTab')}>
      <IndividualBox>
        <ProfileBlock>
          <ProfileImage
            source={{
              uri: 'https://image.ckie.store/images/individual-profile.jpeg',
            }}
          />
        </ProfileBlock>
        <InfoBlock>
          <NameBlock>
            <Name>코따리 집</Name>
          </NameBlock>
          <HatchDate>2024년 12월 6일</HatchDate>
          <MemoBlock>
            <Memo>코따리의 펜트하우스</Memo>
          </MemoBlock>
        </InfoBlock>
      </IndividualBox>
    </Card>
  );
};

export default CageCard;
