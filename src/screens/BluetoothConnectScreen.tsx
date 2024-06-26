import React, {useEffect, useState} from 'react';
import styled from '@emotion/native';
import {useNavigation} from '@react-navigation/native';
import {Device} from 'react-native-ble-plx';
import {StackNavigationProp} from '@react-navigation/stack';

import SafeAreaView from '../components/common/SafeAreaView';
import {manager} from '../components/bluetooth';
import {Alert, ScrollView, Text} from 'react-native';
import Button from '../components/common/Button';
import {Body1, Headline6} from '../components/common/TextGroup';
import theme from '../styles/theme';
import DeviceItem from '../components/DeviceItem';
import {RootStackParamList} from '../navigations/CageRegistrationStack';
import useCageConnectStore from '../stores/useCageConnectStore';

const Container = styled.View`
  flex: 1;
  margin: 0 ${props => props.theme.margin.screen};
  justify-content: space-between;
`;

const TextBlock = styled(Headline6)`
  font-size: 30px;
  font-weight: 600;
  padding: 12px 0;
`;

const ImageBlock = styled.View`
  align-items: center;
`;

const Image = styled.Image`
  width: 250px;
  aspect-ratio: 1;
`;

const DeviceListBlock = styled.View`
  flex: 1;
`;

const DeviceList = styled.View`
  background-color: ${props => props.theme.color.white};
  padding: 24px;
  border-radius: 12px;
  border: 1px solid ${props => props.theme.color.lightGray};
`;

const SearhchButton = styled(Button)`
  padding: 18px 0;
`;

// interface Device {
//   id?: string | null;
//   name?: string | null;
//   isConnectable?: boolean | null;
// }

const BluetoothConnectScreen = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParamList, 'BluetoothConnectScreen'>
    >();

  const {device, updateCage} = useCageConnectStore(state => state);

  const [isSearching, setIsSearching] = useState(false);
  const [isCompleteSearch, setIsCompleteSearch] = useState(false);
  const [disalbeButton, setDisableButton] = useState(true);
  const [displayText, setDisplayText] = useState('사육장을 등록해주세요!');
  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    const subscription = manager.onStateChange(state => {
      if (state === 'PoweredOn') {
        setDisableButton(false);
      } else {
        setDisableButton(true);
        Alert.alert('블루투스를 켜주세요!');
      }
    }, true);

    return () => subscription.remove();
  }, []);

  const cancelDeviceScan = () => {
    manager.stopDeviceScan();
    setIsSearching(false);
    setDisplayText('검색 완료');
  };

  const startDeviceScan = () => {
    setDevices([]);
    try {
      manager.startDeviceScan(
        null,
        {
          allowDuplicates: false,
        },
        async (error, device) => {
          setIsSearching(true);
          setDisplayText('검색중...');
          if (error) {
            console.error(error);
            manager.stopDeviceScan();
          }
          console.log(
            device?.localName,
            device?.name,
            device?.id,
            device?.isConnectable,
          );
          if (device && device.name) {
            setDevices(prevDevices => {
              const deviceIds = prevDevices.map(d => d.id);
              if (!deviceIds.includes(device.id)) {
                return [...prevDevices, device];
              }
              return prevDevices;
            });
          }

          setTimeout(() => {
            cancelDeviceScan();
          }, 10000);
        },
      );
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <SafeAreaView style={{backgroundColor: '#FFFBFB'}}>
      <Container>
        <TextBlock>
          <TextBlock>{displayText}</TextBlock>
        </TextBlock>
        <ImageBlock>
          <Image
            source={{uri: 'https://image.ckie.store/images/antena.png'}}
            resizeMode={'contain'}
          />
        </ImageBlock>
        {devices.length >= 1 && (
          <DeviceListBlock>
            <DeviceList>
              <ScrollView>
                {devices.map((device, index) => (
                  <DeviceItem key={index} device={device} />
                ))}
              </ScrollView>
            </DeviceList>
          </DeviceListBlock>
        )}
        {/* <Button onPress={write}>
          <Text>WRITE</Text>
        </Button>
        <Button onPress={() => navigation.push('CageInfoInputScreen')}>
          <Text>Nav</Text>
        </Button> */}
        <SearhchButton
          color={theme.color.secondary}
          onPress={isSearching ? cancelDeviceScan : startDeviceScan}
          disabled={disalbeButton}>
          <Body1 color={theme.color.white}>
            {isSearching ? '검색 취소' : '검색'}
          </Body1>
        </SearhchButton>
      </Container>
    </SafeAreaView>
  );
};

export default BluetoothConnectScreen;
