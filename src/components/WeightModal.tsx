import styled from '@emotion/native';
import React, {useEffect, useState} from 'react';

import ModalView from './common/ModalView';
import {Body1, Body2, Headline5} from './common/TextGroup';
import Button from './common/Button';
import theme from '../styles/theme';
import useCreateRecord from '../hooks/useCreateRecord';
import useModalStore from '../stores/useModalStore';
import useUpdateIndividual from '../hooks/useUpdateIndividual';
import useIndividualDetail from '../hooks/useIndividualDetail';
import useIndividualIdStore from '../stores/useIndividualIdStore';

interface WeightModalProps {
  isVisible: boolean;
  selected: string;
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
  color: ${props =>
    props.isIncreasing ? props.theme.color.green : props.theme.color.red};
`;

const WeightInputBlock = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 4px;
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

const WeightModal = ({isVisible, selected}: WeightModalProps) => {
  const weights = [-0.1, 0.1, -1, 1, -5, 5];
  const individualId = useIndividualIdStore(state => state.id);
  const {data: individual} = useIndividualDetail(individualId);
  const {mutate: mutateIndividual} = useUpdateIndividual();
  const {mutate: mutateWeightRecord} = useCreateRecord();
  const [newWeight, setNewWeight] = useState(individual.weight);
  const setWeightModalVisible = useModalStore(
    state => state.setWeightModalVisible,
  );

  const onComplete = async () => {
    mutateWeightRecord({
      individualId: individual.id,
      targetDate: selected,
      weight: newWeight,
      memo: `${individual.weight}`,
      category: 'WEIGHT',
    });
    mutateIndividual({
      id: individual.id,
      weight: newWeight,
    });
    setWeightModalVisible(false);
  };

  useEffect(() => {
    console.log('개체 다시: ' + individual.weight);
    setNewWeight(individual.weight);
  }, [individual]);

  return (
    <ModalView isVisible={isVisible} setIsVisible={setWeightModalVisible}>
      <Container>
        <ContentBlock>
          <RecordBlock>
            <Text>
              마지막 측정: {`${individual.weight}${individual.weightUnit}`}
            </Text>
            <Text>
              변화량:
              <ChangeWeight
                isIncreasing={newWeight - individual.weight > 0}>{` ${(
                newWeight - individual.weight
              ).toFixed(1)}`}</ChangeWeight>
            </Text>
          </RecordBlock>
          <WeightInputBlock>
            <WeightInput
              value={String(newWeight)}
              editable={false}
              onChangeText={text => setNewWeight(Number(text))}
              keyboardType={'numeric'}
              placeholder={'무게'}
              style={{borderBottomWidth: 1}}
            />
            <Headline5>{individual.weightUnit}</Headline5>
          </WeightInputBlock>
          <WeightButtonBlock>
            {weights.map((w, i) => (
              <WegithButton
                key={i}
                varient={'outline'}
                onPress={() =>
                  setNewWeight(current => Number((current + w).toFixed(1)))
                }>
                <Body1>{w < 0 ? w : `+${w}`}</Body1>
              </WegithButton>
            ))}
          </WeightButtonBlock>
        </ContentBlock>
        <CloseButtonBlock>
          <CloseButton
            onPress={() => {
              setWeightModalVisible(false);
              setNewWeight(individual.weight);
            }}>
            <Body1>닫기</Body1>
          </CloseButton>
          <CompleteButton onPress={onComplete} color={theme.color.secondary}>
            <Body1 color={theme.color.white}>완료</Body1>
          </CompleteButton>
        </CloseButtonBlock>
      </Container>
    </ModalView>
  );
};

export default WeightModal;
