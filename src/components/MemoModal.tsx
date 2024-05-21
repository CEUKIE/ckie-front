import React, {useState} from 'react';
import styled from '@emotion/native';

import ModalView, {ModalViewProps} from './common/ModalView';
import {Body1, Headline6} from './common/TextGroup';
import Button from './common/Button';
import theme from '../styles/theme';

interface MemoModalProps extends Omit<ModalViewProps, 'children'> {}

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

const MemoModal = ({isVisible, setIsVisible}: MemoModalProps) => {
  const [memo, setMemo] = useState('');

  return (
    <ModalView isVisible={isVisible} setIsVisible={setIsVisible}>
      <Container>
        <ContentBlock>
          <Headline6>기타 기록</Headline6>
          <TextArea
            value={memo}
            onChangeText={setMemo}
            placeholder={'예시) 사육장 바닥재 갈아줌'}
            placeholderTextColor={theme.color.lightGray}
            textAlignVertical={'top'}
            multiline
            autoFocus
          />
        </ContentBlock>
        <CloseButtonBlock>
          <CloseButton onPress={() => setIsVisible(false)}>
            <Body1>닫기</Body1>
          </CloseButton>
          <CompleteButton>
            <Body1 color={theme.color.white}>완료</Body1>
          </CompleteButton>
        </CloseButtonBlock>
      </Container>
    </ModalView>
  );
};

export default MemoModal;
