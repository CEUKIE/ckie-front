import styled from '@emotion/native';
import React from 'react';
import {Body2, Caption} from './common/TextGroup';
import {TouchableOpacity, View} from 'react-native';

interface DeviceItemProps {
  name: string;
  isConnectable: boolean;
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

const DeviceItem = ({name, isConnectable}: DeviceItemProps) => {
  return (
    <Container>
      <TouchableOpacity>
        <ContentBlock>
          <NameBlock>
            <Image
              source={{uri: 'https://image.ckie.store/images/bluetooth.png'}}
            />
            <View style={{justifyContent: 'center'}}>
              <Body2>{name}</Body2>
            </View>
          </NameBlock>
          <Caption>{isConnectable ? '연결 가능' : '연결 불가'}</Caption>
        </ContentBlock>
      </TouchableOpacity>
    </Container>
  );
};

export default DeviceItem;
