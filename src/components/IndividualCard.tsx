import styled from '@emotion/native';
import React, {useRef} from 'react';
import {Image} from 'react-native';
import {ActionSheetRef} from 'react-native-actions-sheet';

import MoreIcon from '../assets/icons/more-icon.svg';
import MaleIcon from '../assets/icons/male.svg';
import FemaleIcon from '../assets/icons/female.svg';
import theme from '../styles/theme';
import {formatKorean} from '../utils/format-date';
import {useNav} from '../hooks/useNav';
import useIndividualIdStore from '../stores/useIndividualIdStore';
import Button from './common/Button';
import IndividualMoreSeeActionSheet from './IndividualMoreSeeActionSheet';

export interface IndividualCardProps {
  individual: Individual;
}

export interface Individual {
  id: string;
  name: string;
  profileImage: string;
  gender: 'male' | 'female';
  hatchedAt: Date;
  memo: string;
}

const Card = styled.TouchableOpacity`
  background-color: ${props => props.theme.color.primary};
  padding: 20px;
  border-radius: 10px;
  width: 44%;
  margin: 8px;
`;

const MoreButton = styled(Button)`
  position: absolute;
  top: 0px;
  right: 4px;
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

const NameAndGenderBlock = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: baseline;
  gap: 3px;
  text-align: center;
`;

const Name = styled.Text``;
const Gender = styled.Text``;

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

const IndividualCardComponent = ({individual}: IndividualCardProps) => {
  const navigation = useNav<'IndividualTopTab'>();
  const updateId = useIndividualIdStore(state => state.updateId);
  const actionSheetRef = useRef<ActionSheetRef>(null);

  const openActionSheet = () => actionSheetRef.current?.show();
  const closeActionSheet = () => actionSheetRef.current?.hide();
  const moveToEdit = () => {
    closeActionSheet();
    navigation.push('IndividualInfoEditScreen');
  };

  return (
    <Card
      onPress={() => {
        updateId(individual.id);
        navigation.push('IndividualTopTab');
      }}>
      <IndividualMoreSeeActionSheet
        actionSheetRef={actionSheetRef}
        onPressEdit={moveToEdit}
        onPressDelete={() => {}}
      />
      <MoreButton varient={'text'} onPress={openActionSheet}>
        <MoreIcon width={24} height={24} fill={theme.color.gray} />
      </MoreButton>
      <IndividualBox>
        <ProfileBlock>
          <ProfileImage source={{uri: individual.profileImage}} />
        </ProfileBlock>
        <InfoBlock>
          <NameAndGenderBlock>
            <Name>{individual.name}</Name>
            <Gender>
              {individual.gender === 'male' ? (
                <MaleIcon width={10} height={10} />
              ) : (
                <FemaleIcon
                  width={10}
                  height={10}
                  fill={theme.color.secondary}
                />
              )}
            </Gender>
          </NameAndGenderBlock>
          <HatchDate>{formatKorean(individual.hatchedAt)}</HatchDate>
          <MemoBlock>
            <Memo>{individual.memo}</Memo>
          </MemoBlock>
        </InfoBlock>
      </IndividualBox>
    </Card>
  );
};

export default IndividualCardComponent;
