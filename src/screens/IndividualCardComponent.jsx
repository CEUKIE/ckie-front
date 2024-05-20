import styled from '@emotion/native';
import React from 'react';
import {Image} from 'react-native';
import Men from '../assets/icons/men.svg';
import Women from '../assets/icons/women.svg';
import theme from '../styles/theme';

const IndividualCard = styled.View`
  background-color: ${({theme}) => theme.color.primary};
  padding: 30px 20px;
  border-radius: 10px;
`;
const IndividualBox = styled.View`
  background-color: white;
`;
const IndividualProfile = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 13px;
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
const IndividualDob = styled.Text`
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
const IndividualName = styled.Text`
`;
const IndividualGender = styled.Text`
`;

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

const IndividualCardComponent = ({ individual }) => {
  return (
    <IndividualCard>
        <IndividualBox>
          <IndividualProfile>
          <IndividualProfileImage source={{ uri: individual.profileImage }} />
          </IndividualProfile>
          <IndividualInfoBox>
            <IndividualNameGender>
              <IndividualName>{individual.name}</IndividualName>
              <IndividualGender>{individual.gender === 'men' ? <Men width={10} height={10}/> : <Women width={10} height={10}/>}</IndividualGender>
            </IndividualNameGender>
            <IndividualDob>{individual.dob}</IndividualDob>
            <IndividualMemoBox>
              <IndividualMemo>{individual.memo}</IndividualMemo>
              </IndividualMemoBox>
          </IndividualInfoBox>
        </IndividualBox>
      </IndividualCard>
  );
};

export default IndividualCardComponent;