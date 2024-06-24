import React, {useState} from 'react';
import styled from '@emotion/native';

import ModalView from './common/ModalView';
import {Body1, Headline6} from './common/TextGroup';
import Button from './common/Button';
import theme from '../styles/theme';
import useCreateRecord from '../hooks/useCreateRecord';
import useModalStore from '../stores/useModalStore';
import useIndividualStore from '../stores/useIndividualStore';

interface MoltingModalProps {
  isVisible: boolean;
  selected: string;
}

const Container = styled.View`
  gap: 48px;
`;

const ContentBlock = styled.View`
  gap: 24px;
`;

const TextArea = styled.TextInput`
  padding: 12px;
  border: 1px solid lightgray;
  border-radius: 12px;
  font-size: 16px;
  width: 100%;
  height: 100px;
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

const MoltingModal = ({isVisible, selected}: MoltingModalProps) => {
  const {mutate} = useCreateRecord();
  const individualId = useIndividualStore(state => state.id);
  const setMoltingModalVisible = useModalStore(
    state => state.setMoltingModalVisible,
  );
  const [memo, setMemo] = useState('');

  const onComplete = () => {
    mutate({
      individualId,
      category: 'ECDYSIS',
      targetDate: selected,
      memo,
    });
    setMoltingModalVisible(false);
  };

  return (
    <ModalView isVisible={isVisible} setIsVisible={setMoltingModalVisible}>
      <Container>
        <ContentBlock>
          <Headline6>탈피 기록</Headline6>
          <TextArea
            value={memo}
            onChangeText={setMemo}
            placeholder={'예시) 발가락 부분 탈피 도와줌'}
            placeholderTextColor={theme.color.lightGray}
            textAlignVertical={'top'}
            multiline
            autoFocus
          />
        </ContentBlock>
        <CloseButtonBlock>
          <CloseButton onPress={() => setMoltingModalVisible(false)}>
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

export default MoltingModal;
