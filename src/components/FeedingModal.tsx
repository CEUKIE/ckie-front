import styled from '@emotion/native';
import React, {useState} from 'react';
import Modal from 'react-native-modal';
import FoodButton from './FoodButton';
import {Body1, Headline6} from './common/TextGroup';

import CricketIcon from '../assets/icons/cricket-icon.svg';
import SuperfoodIcon from '../assets/icons/super-food-icon.svg';
import WormIcon from '../assets/icons/worm-icon.svg';
import GuitarIcon from '../assets/icons/guitar-icon.svg';
import FoodSizeButton from './FoodSizeButton';
import Button from './common/Button';

interface ModalProps {
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isVisible: boolean;
}

const Container = styled.View`
  background-color: ${({theme}) => theme.color.white};
  border-radius: 12px;
  padding: 24px;
  gap: 48px;
`;

const FoodBlock = styled.View`
  gap: 24px;
`;

const FoodButtonBlock = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const SizeBlock = styled.View`
  gap: 24px;
`;

const SizeButtonBlock = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const CloseButtonBlock = styled.View`
  flex-direction: row;
  justify-content: space-between;
  gap: 12px;
`;

const CloseButton = styled(Button)`
  background-color: #e8e8e8;
  padding: 16px 24px;
  flex: 1;
`;
const CompleteButton = styled(Button)`
  padding: 16px 24px;
  flex: 1;
`;

const FeedingModal = ({isVisible, setIsVisible}: ModalProps) => {
  const foods = [
    {name: '귀뚜라미', icon: <CricketIcon width={32} height={32} />},
    {name: '밀웜', icon: <WormIcon width={32} height={32} />},
    {name: '슈퍼푸드', icon: <SuperfoodIcon width={32} height={32} />},
    {name: '기타', icon: <GuitarIcon width={32} height={32} />},
  ];
  const sizeList = ['소', '중', '대'];
  const [food, setFood] = useState('');
  const [size, setSize] = useState('');

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={() => setIsVisible(false)}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      backdropTransitionOutTiming={0}>
      <Container>
        <FoodBlock>
          <Headline6>먹이 종류</Headline6>
          <FoodButtonBlock>
            {foods.map(f => (
              <FoodButton
                foodName={f.name}
                onPress={() => setFood(f.name)}
                clicked={f.name === food}
                icon={f.icon}
              />
            ))}
          </FoodButtonBlock>
        </FoodBlock>
        <SizeBlock>
          <Headline6>먹이 사이즈</Headline6>
          <SizeButtonBlock>
            {sizeList.map((s, i) => (
              <FoodSizeButton
                key={i}
                size={s}
                onPress={() => setSize(s)}
                clicked={size === s}
              />
            ))}
          </SizeButtonBlock>
        </SizeBlock>
        <CloseButtonBlock>
          <CloseButton onPress={() => setIsVisible(false)}>
            <Body1>닫기</Body1>
          </CloseButton>
          <CompleteButton>
            <Body1 color={'white'}>완료</Body1>
          </CompleteButton>
        </CloseButtonBlock>
      </Container>
    </Modal>
  );
};

export default FeedingModal;
