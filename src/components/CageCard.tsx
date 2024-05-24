import styled from '@emotion/native';
import React from 'react';
import {Image} from 'react-native';

import {useNav} from '../hooks/useNav';
import useIndividualIdStore from '../stores/useIndividualIdStore';

export interface CageCardProps {
  id: string;
  name: string;
  memo: string;
}

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

const CageCard = ({id, name, memo}: CageCardProps) => {
  const navigation = useNav<'MainTab'>();
  const updateId = useIndividualIdStore(state => state.updateId);

  return (
    <Card
      onPress={() => {
        updateId(id);
        navigation.push('CageTopTab');
      }}>
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
            <Name>{name}</Name>
          </NameBlock>
          <MemoBlock>
            <Memo>{memo}</Memo>
          </MemoBlock>
        </InfoBlock>
      </IndividualBox>
    </Card>
  );
};

export default CageCard;
