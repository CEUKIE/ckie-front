import styled from '@emotion/native';
import Modal from 'react-native-modal';

interface ModalProps {
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
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

const ModalView = ({isVisible, setIsVisible, children}: ModalProps) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={() => setIsVisible(false)}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      backdropTransitionOutTiming={0}>
      <Container>
        <ContentBlock>{children}</ContentBlock>
      </Container>
    </Modal>
  );
};

export default ModalView;
