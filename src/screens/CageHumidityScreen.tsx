import styled from '@emotion/native';
import React, {useEffect, useState} from 'react';
import SafeAreaView from '../components/common/SafeAreaView';
import Chart from '../components/Chart';
import {useSocket} from '../providers/SocketProvider';
import Button from '../components/common/Button';
import {ActivityIndicator, ScrollView, View} from 'react-native';
import {Body1, Caption, Headline6} from '../components/common/TextGroup';

import RefreshIcon from '../assets/icons/loop-icon.svg';
import UpIcon from '../assets/icons/up-icon.svg';
import DownIcon from '../assets/icons/down-icon.svg';
import theme from '../styles/theme';
import {Shadow} from 'react-native-shadow-2';
import useTimerStore from '../stores/useTimerStore';
import useCageStates from '../hooks/useCageStates';

const Container = styled.View`
  margin-top: 24px;
  flex: 1;
`;

const MenuBlock = styled.View`
  margin: 32px 24px;
  gap: 28px;
`;

const MenuBox = styled.View`
  gap: 12px;
  padding: 20px 24px 24px 24px;
  border-radius: 12px;
`;

const Title = styled(Headline6)``;

const Content = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const TempText = styled(Body1)`
  font-weight: 700;
`;

const TempBox = styled.View`
  width: 92px;
  align-items: center;
  padding: 12px;
  border-bottom-width: 1.5px;
`;

const ReloadButton = styled.View`
  background-color: ${props => props.theme.color.secondary};
  padding: 3px;
  border-radius: 26px;
  position: absolute;
  top: 15px;
  right: 24px;
`;

const ChangeButtonBlock = styled.View`
  gap: 4px;
`;

const ChangeButton = styled(Button)`
  padding: 0 4px;
  border-radius: 4px;
  background-color: ${props => props.theme.color.secondary};
`;

const Timer = styled(Caption)`
  color: ${props => props.theme.color.white};
  position: absolute;
  top: 8px;
  left: 11px;
`;

// const data: number[] = [
//   24.5, 25.2, 27.4, 22.6, 25.7, 26, 27, 22, 25, 26, 22, 23, 25,
// ];

const CageHumidityScreen = () => {
  // TODO individualId로 데이터 검색 후 사용
  // const individualId = useIndividualIdStore(({id}) => id);
  const [humidity, setHumidity] = useState('init');
  const [minHumidity, setMinHumidity] = useState('init');
  const [maxHumidity, setMaxHumidity] = useState('init');
  const {socket} = useSocket();
  const {timer} = useTimerStore(state => state);
  const [chartData, setChartData] = useState<number[]>([]);
  const cageId = 'c8487f39-b222-477a-955c-60e15be3ea6d';
  const {data: cageStates} = useCageStates(cageId);

  const onChangeHumidity = (type: 'min' | 'max', action: 'up' | 'down') => {
    let newMinHumidity = minHumidity;
    let newMaxHumidity = maxHumidity;

    if (type === 'min') {
      newMinHumidity =
        action === 'up'
          ? String((Number(minHumidity) + 1).toFixed(1))
          : String((Number(minHumidity) - 1).toFixed(1));
      setMinHumidity(newMinHumidity);
    } else if (type === 'max') {
      newMaxHumidity =
        action === 'up'
          ? String((Number(maxHumidity) + 1).toFixed(1))
          : String((Number(maxHumidity) - 1).toFixed(1));
      setMaxHumidity(newMaxHumidity);
    }

    socket?.emit('change-humidity', {
      cageId,
      minHumidity: Number(newMinHumidity).toFixed(1),
      maxHumidity: Number(newMaxHumidity).toFixed(1),
    });
  };

  useEffect(() => {
    const arr: number[] = [];
    cageStates.forEach(state => arr.push(state.humidity));
    console.log('arr: ' + arr);
    setChartData(arr);
  }, [cageStates]);

  useEffect(() => {
    const cageId = '55475ad3-c152-484e-b50d-5bf38fe8b496';
    // requestTemp();

    if (socket) {
      socket.emit('connect-cage', {cageId});

      socket.on('connect-cage', data => {
        console.log(data);
      });

      socket.on(
        'response-temp-humidity',
        (state: {humidity: number; temperature: number}) => {
          setHumidity(String(state.humidity.toFixed(1)));
        },
      );

      socket.on(
        'response-target-humidity',
        (state: {minHumidity: number; maxHumidity: number}) => {
          console.log('희망 습도: ' + JSON.stringify(state));
          setMinHumidity(String(state.minHumidity.toFixed(1)));
          setMaxHumidity(String(state.maxHumidity.toFixed(1)));
        },
      );

      return () => {
        socket.off('connect-cage');
        socket.off('response-temp-humidity');
        socket.off('response-target-humiditiy');
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  return (
    <SafeAreaView>
      <ScrollView>
        <Container>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: theme.color.lightGray,
            }}>
            <Chart records={chartData} labels={[]} yAxisSuffix={'%'} />
          </View>
          {humidity === 'init' ? (
            <ActivityIndicator
              size={'large'}
              color={theme.color.secondary}
              style={{marginTop: 24}}
            />
          ) : (
            <MenuBlock>
              <Shadow
                startColor={'#f8f8f8'}
                distance={5}
                style={{width: '100%', borderRadius: 12}}>
                <MenuBox>
                  <ReloadButton>
                    <View>
                      <Timer>{timer}</Timer>
                      <RefreshIcon
                        width={30}
                        height={30}
                        fill={theme.color.white}
                      />
                    </View>
                  </ReloadButton>
                  <Title>현재 습도</Title>
                  <Content>
                    <TempBox>
                      <TempText>{humidity} %</TempText>
                    </TempBox>
                  </Content>
                </MenuBox>
              </Shadow>
              <Shadow
                startColor={'#f8f8f8'}
                distance={5}
                style={{width: '100%', borderRadius: 12}}>
                <MenuBox>
                  <Title>희망 습도</Title>
                  <Content>
                    <ChangeButtonBlock>
                      <ChangeButton
                        onPress={() => onChangeHumidity('min', 'up')}>
                        <UpIcon
                          width={24}
                          height={24}
                          fill={theme.color.white}
                        />
                      </ChangeButton>
                      <ChangeButton
                        onPress={() => onChangeHumidity('min', 'down')}>
                        <DownIcon
                          width={24}
                          height={24}
                          fill={theme.color.white}
                        />
                      </ChangeButton>
                    </ChangeButtonBlock>
                    <TempBox>
                      <TempText>{minHumidity} %</TempText>
                    </TempBox>
                    <TempText>~</TempText>
                    <TempBox>
                      <TempText>{maxHumidity} %</TempText>
                    </TempBox>
                    <ChangeButtonBlock>
                      <ChangeButton
                        onPress={() => onChangeHumidity('max', 'up')}>
                        <UpIcon
                          width={24}
                          height={24}
                          fill={theme.color.white}
                        />
                      </ChangeButton>
                      <ChangeButton
                        onPress={() => onChangeHumidity('max', 'down')}>
                        <DownIcon
                          width={24}
                          height={24}
                          fill={theme.color.white}
                        />
                      </ChangeButton>
                    </ChangeButtonBlock>
                  </Content>
                </MenuBox>
              </Shadow>
            </MenuBlock>
          )}
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CageHumidityScreen;
