import styled from '@emotion/native';
import React from 'react';
import {Image} from 'react-native';
import MaleIcon from '../assets/icons/men.svg';
import FemaleIcon from '../assets/icons/women.svg';
import theme from '../styles/theme';
import {formatKorean} from '../utils/format-date';

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

const Card = styled.View`
  background-color: ${props => props.theme.color.primary};
  padding: 20px;
  border-radius: 10px;
  width: 44%;
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
  return (
    <Card>
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
