import styled from '@emotion/native';
import React from 'react';
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet';

import Button from './common/Button';
import {Headline6} from './common/TextGroup';
import theme from '../styles/theme';

interface IndividualMoreSeeActionSheetProps {
  actionSheetRef: React.RefObject<ActionSheetRef>;
  onPressEdit: () => void;
  onPressDelete: () => void;
}

const EditButtonBlock = styled.View`
  padding-bottom: 100px;
`;

const EditButtonOuter = styled.View`
  padding: 25px 0;
  border-bottom-width: 1px;
  border-bottom-color: ${props => props.theme.color.lightGray};
`;

const EditButton = styled(Button)``;

const IndividualMoreSeeActionSheet = ({
  actionSheetRef,
  onPressEdit,
  onPressDelete,
}: IndividualMoreSeeActionSheetProps) => {
  return (
    <ActionSheet ref={actionSheetRef} gestureEnabled>
      <EditButtonBlock>
        <EditButtonOuter>
          <EditButton varient={'text'} onPress={onPressEdit}>
            <Headline6>수정</Headline6>
          </EditButton>
        </EditButtonOuter>
        <EditButtonOuter>
          <EditButton varient={'text'} onPress={onPressDelete}>
            <Headline6 color={theme.color.red}>삭제</Headline6>
          </EditButton>
        </EditButtonOuter>
      </EditButtonBlock>
    </ActionSheet>
  );
};

export default IndividualMoreSeeActionSheet;
