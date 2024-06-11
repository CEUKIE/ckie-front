import React from 'react';
import styled from '@emotion/native';

import SafeAreaView from '../components/common/SafeAreaView';
import Button from '../components/common/Button';
import {Body1, Headline6} from '../components/common/TextGroup';
import TextArea from '../components/common/TextArea';
import theme from '../styles/theme';
import useCageConnectStore from '../stores/useCageConnectStore';
import useCageRegistrationStore from '../stores/useCageRegistrationStore';
import { ActivityIndicator } from 'react-native';

const Container = styled.View`
  margin: 0 ${props => props.theme.margin.screen};
  flex: 1;
  justify-content: space-between;
`;

const ContenetBlock = styled.View`
  gap: 64px;
`;

const Title = styled(Headline6)``;

const InputBlock = styled.View`
  gap: 48px;
`;

const InputBox = styled.View`
  gap: 8px;
`;

const SpeciesBox = styled.View`
  flex-direction: row;
  gap: 10px;
`;

const CompleteButton = styled(Button)`
  padding: 18px 0;
`;

const WifiInfoScreen = () => {
  const {updateCage, wifiId, wifiPw, device, ...rest} = useCageConnectStore(
    state => state,
  );
  const {name, speciesId} = useCageRegistrationStore(state => state);

  return (
    <SafeAreaView>
      <Container>
        <ContenetBlock>
          <InputBlock>
            <InputBox>
              <Title>WIFI ID</Title>
              <TextArea
                multiline={false}
                value={wifiId}
                onChangeText={value => updateCage('wifiId', value)}
                placeholder="Wifi 이름를 입력해주세요"
                placeholderTextColor={theme.color.lightGray}
              />
            </InputBox>
            <InputBox>
              <Title>WIFI PW</Title>
              <TextArea
                multiline={false}
                value={wifiPw}
                onChangeText={value => updateCage('wifiPw', value)}
                placeholder="Wifi 비밀번호를 입력해주세요"
                placeholderTextColor={theme.color.lightGray}
              />
            </InputBox>
          </InputBlock>
        </ContenetBlock>
        <CompleteButton
          onPress={() => {
            console.log(device?.id);
            console.log(wifiId);
            console.log(wifiPw);
            console.log(name);
            console.log(speciesId);
            console.log(rest);
          }}>
          <Body1>완료</Body1>
          {/* <ActivityIndicator /> */}
        </CompleteButton>
      </Container>
    </SafeAreaView>
  );
};

export default WifiInfoScreen;
