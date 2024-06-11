import React from 'react';
import {TouchableWithoutFeedback, View} from 'react-native';
import styled from '@emotion/native';
import SafeAreaView from './SafeAreaView';

import CloseIcon from '../../assets/icons/close-icon.svg';
import theme from '../../styles/theme';

interface FullScreenModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.JSX.Element;
}

const ModalContainer = styled.Modal``;

const ModalContent = styled.View`
  padding: 64px ${props => props.theme.margin.screen};
  align-items: center;
  flex: 1;
`;

const CloseButton = styled.View`
  position: absolute;
  top: 16px;
  right: 16px;
`;

const FullScreenModal = ({
  visible,
  onClose,
  children,
}: FullScreenModalProps) => {
  return (
    <View>
      <ModalContainer visible={visible} animationType={'fade'} transparent>
        <SafeAreaView>
          <ModalContent>
            <TouchableWithoutFeedback onPress={onClose}>
              <CloseButton>
                <CloseIcon width={32} height={32} fill={theme.color.gray} />
              </CloseButton>
            </TouchableWithoutFeedback>
            {children}
          </ModalContent>
        </SafeAreaView>
      </ModalContainer>
    </View>
  );
};

export default FullScreenModal;
