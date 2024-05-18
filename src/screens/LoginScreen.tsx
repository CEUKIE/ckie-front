import styled from '@emotion/native';
import React from 'react';

import SafeAreaView from '../components/common/SafeAreaView';
import Button from '../components/common/Button';
import {Body2} from '../components/common/TextGroup';
import theme from '../styles/theme';
import KakaoIcon from '../assets/icons/kakao-symbol.svg';
import NaverIcon from '../assets/icons/naver-symbol.svg';
import GoogleIcon from '../assets/icons/google-symbol.svg';

const Container = styled.View`
  margin: 0 24px;
  align-items: center;
  flex: 1;
  gap: 64px;
`;

const LogoBlock = styled.View`
  margin-top: 52px;
`;

const Logo = styled.Image`
  width: 214px;
  height: 214px;
  margin-bottom: 12px;
`;

const AppNameBlock = styled.View`
  flex-direction: row;
  align-items: flex-end;
  height: fit-content;
`;

const CookieImage = styled.Image`
  width: 40px;
  height: 40px;
  margin-right: 8px;
`;

const LargeText = styled.Text`
  font-size: 48px;
  font-family: 'Jua';
`;

const SmallText = styled.Text`
  font-size: 24px;
  font-family: 'Jua';
`;

const LoginButtonBlock = styled.View`
  gap: 14px;
`;

const LoginButton = styled(Button)<{color?: string}>`
  width: 265px;
  height: 48px;
  padding: 0 14px;
  background-color: ${({color}) => color};
`;

const ButtonInnerBlock = styled.View`
  flex-direction: row;
  align-items: center;
`;

const JuaBody2 = styled(Body2)`
  font-family: 'Jua';
  flex: 1;
  text-align: center;
`;

const LoginScreen = () => {
  return (
    <SafeAreaView>
      <Container>
        <LogoBlock>
          <Logo src={'https://image.ckie.store/images/login-page-logo.png'} />
          <AppNameBlock>
            <CookieImage src={'https://image.ckie.store/images/cookie.png'} />
            <LargeText>크</LargeText>
            <SmallText>레</SmallText>
            <LargeText>키</LargeText>
            <SmallText>우기</SmallText>
          </AppNameBlock>
        </LogoBlock>
        <LoginButtonBlock>
          <LoginButton color={theme.color.kakao}>
            <ButtonInnerBlock>
              <KakaoIcon width={18} height={18} />
              <JuaBody2>카카오 로그인</JuaBody2>
            </ButtonInnerBlock>
          </LoginButton>
          <LoginButton varient={'outline'}>
            <ButtonInnerBlock>
              <GoogleIcon width={20} height={20} />
              <JuaBody2>Google 로그인</JuaBody2>
            </ButtonInnerBlock>
          </LoginButton>
          <LoginButton color={theme.color.naver}>
            <ButtonInnerBlock>
              <NaverIcon width={16} height={16} />
              <JuaBody2 color={'white'}>네이버 로그인</JuaBody2>
            </ButtonInnerBlock>
          </LoginButton>
        </LoginButtonBlock>
      </Container>
    </SafeAreaView>
  );
};

export default LoginScreen;
