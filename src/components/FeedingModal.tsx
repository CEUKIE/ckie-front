import styled from '@emotion/native';
import React, {useState} from 'react';
import FoodButton from './FoodButton';
import {Body1, Headline6} from './common/TextGroup';

import CricketIcon from '../assets/icons/cricket-icon.svg';
import SuperfoodIcon from '../assets/icons/super-food-icon.svg';
import WormIcon from '../assets/icons/worm-icon.svg';
import GuitarIcon from '../assets/icons/guitar-icon.svg';
import FoodSizeButton from './FoodSizeButton';
import Button from './common/Button';
import useCreateRecord from '../hooks/useCreateRecord';
import useIndividualIdStore from '../stores/useIndividualIdStore';
import useModalStore from '../stores/useModalStore';
import FullScreenModal from './common/FullScreenModal';
import ModalView from './common/ModalView';
import theme from '../styles/theme';

interface FeedingModalProps {
  isVisible: boolean;
  selected: string;
}

const Container = styled.View`
  gap: 64px;
`;

const ContentBlock = styled.View`
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

const FeedingModal = ({isVisible, selected}: FeedingModalProps) => {
  const {mutate} = useCreateRecord();
  const individualId = useIndividualIdStore(state => state.id);
  const setFeedingModalVisible = useModalStore(
    state => state.setFeedingModalVisible,
  );

  const foods = [
    {name: '귀뚜라미', icon: <CricketIcon width={32} height={32} />},
    {name: '밀웜', icon: <WormIcon width={32} height={32} />},
    {name: '슈퍼푸드', icon: <SuperfoodIcon width={32} height={32} />},
    {name: '기타', icon: <GuitarIcon width={32} height={32} />},
  ];
  const sizeList = ['소', '중', '대'];
  const [food, setFood] = useState('');
  const [size, setSize] = useState('');

  const onComplete = () => {
    mutate(
      {
        individualId,
        targetDate: selected,
        memo: size ? `${food}/${size}` : food,
        category: 'FEEDING',
      },
      {
        onSuccess: () => {
          setFeedingModalVisible(false);
        },
      },
    );
  };

  return (
    <ModalView isVisible={isVisible} setIsVisible={setFeedingModalVisible}>
      <Container>
        <ContentBlock>
          <FoodBlock>
            <Headline6>먹이 종류</Headline6>
            <FoodButtonBlock>
              {foods.map((f, i) => (
                <FoodButton
                  key={i}
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
        </ContentBlock>
        <CloseButtonBlock>
          <CloseButton onPress={() => setFeedingModalVisible(false)}>
            <Body1>닫기</Body1>
          </CloseButton>
          <CompleteButton onPress={onComplete} color={theme.color.secondary}>
            <Body1 color={'white'}>완료</Body1>
          </CompleteButton>
        </CloseButtonBlock>
      </Container>
    </ModalView>
  );
};

export default FeedingModal;
