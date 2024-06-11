import styled from '@emotion/native';
import React, {useEffect} from 'react';
import {Device} from 'react-native-ble-plx';
import {ActivityIndicator, TouchableOpacity, View} from 'react-native';

import {Body2, Caption} from './common/TextGroup';
import {manager} from './bluetooth';
import useCageConnectStore from '../stores/useCageConnectStore';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigations/CageRegistrationStack';

interface DeviceItemProps {
  device: Device;
}

const Container = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${props => props.theme.color.lightGray};
`;

const ContentBlock = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 12px 6px;
`;

const NameBlock = styled.View`
  flex-direction: row;
  gap: 6px;
`;

const Image = styled.Image`
  width: 20px;
  height: 20px;
`;

const DeviceItem = ({device}: DeviceItemProps) => {
  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParamList, 'BluetoothConnectScreen'>
    >();
  const {
    device: connectedDevice,
    pairingStatus,
    updateCage,
  } = useCageConnectStore(state => state);

  useEffect(() => {
    console.log('device: ' + JSON.stringify(device, null, 2));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onConnectDevice = async () => {
    try {
      manager.stopDeviceScan();
      updateCage('device', device);
      updateCage('pairingStatus', 'START');
      console.log('초기 디바이스: ' + JSON.stringify(device, null, 2));
      const connectedDevice = await manager.connectToDevice(device.id, {
        timeout: 10000,
      });
      await connectedDevice.discoverAllServicesAndCharacteristics();
      const service = await connectedDevice.services();
      const chari = await service[0].characteristics();
      updateCage('device', connectedDevice);
      console.log(
        '서비스 검색 후 디바이스: ' + JSON.stringify(connectedDevice, null, 2),
      );
      console.log('service: ' + JSON.stringify(service, null, 2));
      console.log('char: ' + JSON.stringify(chari, null, 2));
      updateCage('pairingStatus', 'CONNECTED');
      navigation.push('CageInfoInputScreen');
    } catch (e) {
      updateCage('pairingStatus', 'FAIL');
      updateCage('device', null);
    } finally {
      console.log(pairingStatus);
    }
  };

  return (
    <Container>
      <TouchableOpacity onPress={onConnectDevice}>
        <ContentBlock>
          <NameBlock>
            <Image
              source={{uri: 'https://image.ckie.store/images/bluetooth.png'}}
            />
            <View style={{justifyContent: 'center'}}>
              <Body2>{device.name}</Body2>
            </View>
          </NameBlock>
          {pairingStatus === 'START' && connectedDevice?.id === device.id ? (
            <ActivityIndicator />
          ) : pairingStatus === 'CONNECTED' &&
            connectedDevice?.id === device.id ? (
            <Caption>연결 완료</Caption>
          ) : (
            pairingStatus === 'FAIL' &&
            connectedDevice?.id === device.id && <Caption>연결 실패</Caption>
          )}
        </ContentBlock>
      </TouchableOpacity>
    </Container>
  );
};

export default DeviceItem;
