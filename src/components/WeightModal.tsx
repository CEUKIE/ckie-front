import styled from '@emotion/native';
import React, {useState} from 'react';
import ModalView, {ModalViewProps} from './common/ModalView';
import {Body1, Body2, Headline5} from './common/TextGroup';
import Button from './common/Button';

interface WeightModalProps extends Omit<ModalViewProps, 'children'> {
  weightUnit: 'g' | 'kg';
  currentWeight: number;
}

const Container = styled.View`
  gap: 48px;
`;

const ContentBlock = styled.View`
  align-items: center;
  gap: 18px;
`;

const RecordBlock = styled.View`
  width: 100%;
`;

const Text = styled(Body2)`
  font-weight: 600;
`;

const ChangeWeight = styled(Body2)<{isIncreasing: boolean}>`
  font-weight: 600;
  color: ${({isIncreasing, theme}) =>
    isIncreasing ? theme.color.green : theme.color.red};
`;

const WeightInputBlock = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const WeightInput = styled.TextInput`
  color: black;
  padding: 12px;
  text-align: center;
  font-size: 24px;
  width: 80px;
  font-weight: 700;
`;

const WeightButtonBlock = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  width: 200px;
  justify-content: space-around;
`;

const WegithButton = styled(Button)`
  width: 40%;
  padding: 12px 14px;
  margin: 4px;
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

const WeightModal = ({
  isVisible,
  setIsVisible,
  weightUnit,
  currentWeight,
}: WeightModalProps) => {
  const weights = [-0.1, 0.1, -1, 1, -5, 5];
  const [weight, setWeight] = useState(currentWeight);

  return (
    <ModalView isVisible={isVisible} setIsVisible={setIsVisible}>
      <Container>
        <ContentBlock>
          <RecordBlock>
            <Text>마지막 측정: {`${currentWeight}${weightUnit}`}</Text>
            <Text>
              변화량:
              <ChangeWeight isIncreasing={weight - currentWeight > 0}>{` ${(
                weight - currentWeight
              ).toFixed(1)}`}</ChangeWeight>
            </Text>
          </RecordBlock>
          <WeightInputBlock>
            <WeightInput
              value={String(weight)}
              editable={false}
              onChangeText={text => setWeight(Number(text))}
              keyboardType={'numeric'}
              placeholder={'무게'}
              style={{borderBottomWidth: 1}}
            />
            <Headline5>G</Headline5>
          </WeightInputBlock>
          <WeightButtonBlock>
            {weights.map((w, i) => (
              <WegithButton
                key={i}
                varient={'outline'}
                onPress={() =>
                  setWeight(current => Number((current + w).toFixed(1)))
                }>
                <Body1>{w < 0 ? w : `+${w}`}</Body1>
              </WegithButton>
            ))}
          </WeightButtonBlock>
        </ContentBlock>
        <CloseButtonBlock>
          <CloseButton
            onPress={() => {
              setIsVisible(false);
              setWeight(currentWeight);
            }}>
            <Body1>닫기</Body1>
          </CloseButton>
          <CompleteButton>
            <Body1>완료</Body1>
          </CompleteButton>
        </CloseButtonBlock>
      </Container>
    </ModalView>
  );
};

export default WeightModal;
