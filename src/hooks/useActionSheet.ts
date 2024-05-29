import {useRef} from 'react';
import {ActionSheetRef} from 'react-native-actions-sheet';

const useActionSheet = () => {
  const actionSheetRef = useRef<ActionSheetRef>(null);

  const openActionSheet = () => actionSheetRef.current?.show();
  const closeActionSheet = () => actionSheetRef.current?.hide();

  return {actionSheetRef, openActionSheet, closeActionSheet};
};

export default useActionSheet;
