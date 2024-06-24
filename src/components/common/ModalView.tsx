import styled from '@emotion/native';
import Modal from 'react-native-modal';

export interface ModalViewProps {
  setIsVisible:
    | React.Dispatch<React.SetStateAction<boolean>>
    | ((visible: boolean) => void);
  isVisible: boolean;
  children: React.JSX.Element;
}

const Container = styled.View`
  background-color: ${({theme}) => theme.color.white};
  border-radius: 12px;
  padding: 24px;
  gap: 48px;
`;

const ContentBlock = styled.View``;

const ModalView = ({isVisible, setIsVisible, children}: ModalViewProps) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={() => setIsVisible(false)}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      animationInTiming={1}
      animationOutTiming={1}
      backdropTransitionOutTiming={0}>
      <Container>
        <ContentBlock>{children}</ContentBlock>
      </Container>
    </Modal>
  );
};

export default ModalView;
