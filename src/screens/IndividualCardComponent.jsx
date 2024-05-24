import styled from '@emotion/native';
import React from 'react';
import {Image} from 'react-native';
import Male from '../assets/icons/male.svg';
import Female from '../assets/icons/female.svg';
import theme from '../styles/theme';

const IndividualCard = styled.View`
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

const IndividualProfile = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 4px;
`;

const IndividualProfileImage = styled(Image)`
  width: 100px;
  height: 100px;
  border-radius: 10px;
`;

const IndividualInfoBox = styled.View`
  display: flex;
  gap: 5px;
`;

const IndividualBirth = styled.Text`
  text-align: center;
`;

const IndividualNameGender = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: baseline;
  gap: 3px;
  text-align: center;
`;

const IndividualName = styled.Text``;

const IndividualGender = styled.Text``;

const IndividualMemoBox = styled.View`
  margin: 0px 10px 5px 10px;
  border-radius: 10px;
  background-color: #ffdfbe;
`;

const IndividualMemo = styled.Text`
  border-radius: 5px;
  text-align: center;
  padding: 10px;
  display: flex;
`;

const IndividualCardComponent = ({individual}) => {
  return (
    <IndividualCard>
      <IndividualBox>
        <IndividualProfile>
          <IndividualProfileImage source={{uri: individual.profileImage}} />
        </IndividualProfile>
        <IndividualInfoBox>
          <IndividualNameGender>
            <IndividualName>{individual.name}</IndividualName>
            <IndividualGender>
              {individual.gender === 'Male' ? (
                <Male width={10} height={10} />
              ) : (
                <Female width={10} height={10} fill={theme.color.secondary} />
              )}
            </IndividualGender>
          </IndividualNameGender>
          <IndividualBirth>{individual.dob}</IndividualBirth>
          <IndividualMemoBox>
            <IndividualMemo>{individual.memo}</IndividualMemo>
          </IndividualMemoBox>
        </IndividualInfoBox>
      </IndividualBox>
    </IndividualCard>
  );
};

export default IndividualCardComponent;