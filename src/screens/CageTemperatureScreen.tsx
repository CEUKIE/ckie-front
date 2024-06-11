import styled from '@emotion/native';
import React, {Suspense, useEffect, useState} from 'react';

import SafeAreaView from '../components/common/SafeAreaView';
import Chart from '../components/Chart';
import {useSocket} from '../providers/SocketProvider';
import {ActivityIndicator, ScrollView, View} from 'react-native';
import {Body1, Caption, Headline6} from '../components/common/TextGroup';
import Button from '../components/common/Button';
import theme from '../styles/theme';
import {Shadow} from 'react-native-shadow-2';

import RefreshIcon from '../assets/icons/loop-icon.svg';
import UpIcon from '../assets/icons/up-icon.svg';
import DownIcon from '../assets/icons/down-icon.svg';
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
  width: 85px;
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

const CageTemperatureScreen = () => {
  // TODO individualId로 데이터 검색 후 사용
  // const individualId = useIndividualIdStore(({id}) => id);
  const [temp, setTemp] = useState('init');
  const [minTemp, setMinTemp] = useState('init');
  const [maxTemp, setMaxTemp] = useState('init');
  const {socket} = useSocket();
  // const [timer, setTimer] = useState(5);
  const {timer, decrementTime} = useTimerStore(state => state);
  const [chartData, setChartData] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const cageId = 'c8487f39-b222-477a-955c-60e15be3ea6d';

  const {data: cageStates} = useCageStates(cageId);

  const requestTemp = () => {
    socket?.emit('request-temp-humidity', {
      cageId,
    });

    socket?.emit('request-target-temp', {
      cageId,
    });

    socket?.emit('request-target-humidity', {
      cageId,
    });
  };

  const onChangeTemp = (type: 'min' | 'max', action: 'up' | 'down') => {
    let newMinTemp = minTemp;
    let newMaxTemp = maxTemp;

    if (type === 'min') {
      newMinTemp =
        action === 'up'
          ? String((Number(minTemp) + 1).toFixed(1))
          : String((Number(minTemp) - 1).toFixed(1));
      setMinTemp(newMinTemp);
    } else if (type === 'max') {
      newMaxTemp =
        action === 'up'
          ? String((Number(maxTemp) + 1).toFixed(1))
          : String((Number(maxTemp) - 1).toFixed(1));
      setMaxTemp(newMaxTemp);
    }

    socket?.emit('change-temp', {
      cageId,
      minTemp: Number(newMinTemp).toFixed(1),
      maxTemp: Number(newMaxTemp).toFixed(1),
    });
  };

  useEffect(() => {
    const tmpData: number[] = [];
    const tmpLabel: string[] = [];
    cageStates.forEach(state => tmpData.push(state.temperature));
    cageStates.forEach(state => {
      const hour = new Date(state.createdAt).getHours();
      console.log('시간' + hour);
      tmpLabel.push(String(hour));
    });
    console.log('arr: ' + tmpData);
    setChartData(tmpData);
    setLabels(tmpLabel);
  }, [cageStates]);

  useEffect(() => {
    console.log('사육장 상태: ' + JSON.stringify(cageStates, null, 2));
    if (socket) {
      socket.emit('connect-cage', {cageId});
      requestTemp();

      socket.on('connect-cage', data => {
        console.log(data);
      });

      socket.on(
        'response-temp-humidity',
        (state: {humidity: number; temperature: number}) => {
          console.log(state);
          setTemp(String(state.temperature.toFixed(1)));
        },
      );

      socket.on(
        'response-target-temp',
        (state: {minTemp: number; maxTemp: number}) => {
          console.log('희망 온도' + JSON.stringify(state));
          setMinTemp(String(state.minTemp.toFixed(1)));
          setMaxTemp(String(state.maxTemp.toFixed(1)));
        },
      );

      const intervalId = setInterval(requestTemp, 6000);
      const timerId = setInterval(() => {
        decrementTime();
      }, 1000); // update timer every second

      return () => {
        clearInterval(intervalId);
        clearInterval(timerId);
        socket.off('connect-cage');
        socket.off('response-temp-humidity');
        socket.off('response-target-temp');
      };
    }
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
            <Suspense
              fallback={
                <ActivityIndicator
                  size={'large'}
                  color={theme.color.secondary}
                  style={{marginTop: 24}}
                />
              }>
              {cageStates.length === chartData.length && (
                <Chart records={chartData} labels={labels} yAxisSuffix={'°C'} />
              )}
            </Suspense>
          </View>
          {temp === 'init' ? (
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
                  <Title>현재 온도</Title>
                  <Content>
                    <TempBox>
                      <TempText>{temp} °C</TempText>
                    </TempBox>
                  </Content>
                </MenuBox>
              </Shadow>
              <Shadow
                startColor={'#f8f8f8'}
                distance={5}
                style={{width: '100%', borderRadius: 12}}>
                <MenuBox>
                  <Title>희망 온도</Title>
                  <Content>
                    <ChangeButtonBlock>
                      <ChangeButton onPress={() => onChangeTemp('min', 'up')}>
                        <UpIcon
                          width={24}
                          height={24}
                          fill={theme.color.white}
                        />
                      </ChangeButton>
                      <ChangeButton onPress={() => onChangeTemp('min', 'down')}>
                        <DownIcon
                          width={24}
                          height={24}
                          fill={theme.color.white}
                        />
                      </ChangeButton>
                    </ChangeButtonBlock>
                    <TempBox>
                      <TempText>{minTemp} °C</TempText>
                    </TempBox>
                    <TempText>~</TempText>
                    <TempBox>
                      <TempText>{maxTemp} °C</TempText>
                    </TempBox>
                    <ChangeButtonBlock>
                      <ChangeButton onPress={() => onChangeTemp('max', 'up')}>
                        <UpIcon
                          width={24}
                          height={24}
                          fill={theme.color.white}
                        />
                      </ChangeButton>
                      <ChangeButton onPress={() => onChangeTemp('max', 'down')}>
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

export default CageTemperatureScreen;
