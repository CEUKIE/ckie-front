import styled from '@emotion/native';
import React from 'react';
import {Alert, ScrollView} from 'react-native';

import Avatar from '../components/common/Avatar';
import SafeAreaView from '../components/common/SafeAreaView';
import {Body1, Body2, Caption} from '../components/common/TextGroup';
import theme from '../styles/theme';
import Button from '../components/common/Button';
import EditIcon from '../assets/icons/edit-icon.svg';
import CommentIcon from '../assets/icons/comment-icon.svg';
import MenuButton from '../components/MenuButton';

const Container = styled.View`
  margin: 0 ${props => props.theme.margin.screen};
  padding: ${props => props.theme.margin.screen} 0;
  gap: 32px;
`;

const ProfileBlock = styled.View``;

const EditBlock = styled.View`
  flex-direction: row;
`;

const InfoBlock = styled.View`
  margin-left: 16px;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Nickname = styled(Body1)`
  font-weight: 600;
`;

const StyledButton = styled(Button)`
  border-radius: 18px;
`;

const ButtonInner = styled.View`
  flex-direction: row;
  align-items: center;
`;

const CommentBlock = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 10px;
  margin: 12px 0;
`;

const Comment = styled(Caption)`
  color: ${props => props.theme.color.font.text1};
`;

const MenuBlock = styled.View`
  gap: 18px;
`;

const MenuItem = styled.View``;

const MenuTitle = styled(Body1)`
  color: ${props => props.theme.color.gray};
  font-weight: 600;
`;

const MenuButtonBlock = styled.View``;

const MyPage = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <Container>
          <ProfileBlock
            style={{
              borderBottomWidth: 1,
              borderBottomColor: theme.color.lightGray,
            }}>
            <EditBlock>
              <Avatar
                uri={
                  'https://image.ckie.store/images/default-profile-image.png'
                }
                size={84}
                rounded
              />
              <InfoBlock>
                <Nickname>달퍙이</Nickname>
                <StyledButton varient={'outline'}>
                  <ButtonInner>
                    <EditIcon
                      width={12}
                      height={12}
                      fill={theme.color.font.text1}
                    />
                    <Body2>수정</Body2>
                  </ButtonInner>
                </StyledButton>
              </InfoBlock>
            </EditBlock>
            <CommentBlock>
              <CommentIcon
                width={24}
                height={24}
                fill={theme.color.font.text1}
              />
              <Comment>다들 반가워요 저는 달줌이랍니다~</Comment>
            </CommentBlock>
          </ProfileBlock>
          <MenuBlock>
            <MenuItem>
              <MenuTitle>개체</MenuTitle>
              <MenuButtonBlock>
                <MenuButton
                  text={'내 개체'}
                  onPress={() => Alert.alert('개체')}
                />
              </MenuButtonBlock>
            </MenuItem>
            <MenuItem>
              <MenuTitle>사육장</MenuTitle>
              <MenuButton
                text={'내 사육장'}
                onPress={() => Alert.alert('사육장')}
              />
            </MenuItem>
            <MenuItem>
              <MenuTitle>계정</MenuTitle>
              <MenuButton
                text={'로그아웃'}
                onPress={() => Alert.alert('계정')}
              />
            </MenuItem>
          </MenuBlock>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyPage;
