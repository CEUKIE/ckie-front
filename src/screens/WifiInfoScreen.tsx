import React, {useEffect, useState} from 'react';
import styled from '@emotion/native';
import base64 from 'react-native-base64';

import SafeAreaView from '../components/common/SafeAreaView';
import Button from '../components/common/Button';
import {Body1, Headline6} from '../components/common/TextGroup';
import TextArea from '../components/common/TextArea';
import theme from '../styles/theme';
import useCageConnectStore from '../stores/useCageConnectStore';
import useCageRegistrationStore from '../stores/useCageRegistrationStore';
import useCreateCage from '../hooks/useCreateCage';
import {useSocket} from '../providers/SocketProvider';
import {useNav} from '../hooks/useNav';
import Indicator from '../components/Indicator';
import { ActivityIndicator } from 'react-native';
import { manager } from '../components/bluetooth';

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

const CompleteButton = styled(Button)`
  padding: 18px 0;
  background-color: ${props => props.theme.color.secondary};
`;

const WifiInfoScreen = () => {
  const navigation = useNav<'MainTab'>();
  const {
    updateCage,
    wifiId,
    wifiPw,
    device,
    minTemp,
    maxTemp,
    minHumidity,
    maxHumidity,
    pairingStatus,
  } = useCageConnectStore(state => state);
  const {name, avatarUrl, speciesId} = useCageRegistrationStore(state => state);
  const {mutate} = useCreateCage();
  const {socket} = useSocket();
  const [isLoading, setIsLoading] = useState(false);
  const charUUID = '5a9edc71-80cb-4159-b2e6-a2913b761026';
  const sericeUUID = '2f05b2a5-079f-4a07-b9c0-3b1fe7d615c9';

  const write = async () => {
    try {
      const stringify = `wifi_id ${wifiId}; wifi_pw ${wifiPw}; min_temp ${minTemp}; max_temp ${maxTemp}; min_humidity ${minHumidity}; max_humidity ${maxHumidity};`;
      console.log(stringify);
      const data = base64.encode(JSON.stringify(stringify));

      await manager.writeCharacteristicWithResponseForDevice(
        device?.id!,
        sericeUUID,
        charUUID,
        data,
      );
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on('connect-cage', () => {
        setIsLoading(false);
        navigation.replace('MainTab');
      });

      return () => {
        socket.off('connect-cage');
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

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
            console.log(avatarUrl);
            write();
            mutate({
              id: device?.id!,
              name,
              avatarUrl,
            });
            setIsLoading(true);
          }}>
          {isLoading ? (
            <ActivityIndicator color={theme.color.white} />
          ) : (
            <Body1 color={theme.color.white}>완료</Body1>
          )}
          {/* <ActivityIndicator /> */}
        </CompleteButton>
      </Container>
    </SafeAreaView>
  );
};

export default WifiInfoScreen;
