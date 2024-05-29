import styled from '@emotion/native';
import React from 'react';
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet';
import ImagePicker from 'react-native-image-crop-picker';

import Button from './common/Button';
import {Body2, Headline6} from './common/TextGroup';
import theme from '../styles/theme';
import AlbumIcon from '../assets/icons/image-icon.svg';
import CameraIcon from '../assets/icons/camera-icon.svg';
import {Platform} from 'react-native';
import useUpload from '../hooks/useUpload';

interface ImagePickerActionSheetProps {
  actionSheetRef: React.RefObject<ActionSheetRef>;
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
  closeActionSheet: () => void;
}

const Title = styled(Headline6)`
  padding: 12px;
`;

const ButtonBlock = styled.View`
  padding: 24px 0;
  justify-content: center;
  gap: 36px;
  flex-direction: row;
  padding-bottom: 100px;
`;

const ButtomContentBlock = styled.View`
  padding: 8px 36px;
  align-items: center;
`;

const ImageSelectButton = styled(Button)``;

const ImagePickerActionSheet = ({
  actionSheetRef,
  setImageUrl,
  closeActionSheet,
}: ImagePickerActionSheetProps) => {
  const {mutateAsync} = useUpload();
  const onPressCamera = () => {
    ImagePicker.openCamera({
      widthL: 300,
      height: 400,
      cropping: true,
    }).then(async image => {
      const body = new FormData();
      body.append('image', {
        name: image.filename,
        type: image.mime,
        uri:
          Platform.OS === 'ios'
            ? image.path.replace('file://', '')
            : image.path,
      });

      const response = await mutateAsync(body);
      console.log(response);
      const imageUrl =
        response.result?.filePath ||
        'https://image.ckie.store/images/individual-profile.jpeg';
      console.log('image: ' + imageUrl);
      setImageUrl(imageUrl);
      closeActionSheet();
    });
  };

  const onPressAlbum = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    }).then(async image => {
      const body = new FormData();
      body.append('image', {
        name: image.filename,
        type: image.mime,
        uri:
          Platform.OS === 'ios'
            ? image.path.replace('file://', '')
            : image.path,
      });

      const response = await mutateAsync(body);
      console.log(response);
      const imageUrl =
        response.result?.filePath ||
        'https://image.ckie.store/images/individual-profile.jpeg';
      console.log('image: ' + imageUrl);
      setImageUrl(imageUrl);
      closeActionSheet();
    });
  };

  return (
    <ActionSheet ref={actionSheetRef} gestureEnabled>
      <Title>사진 선택</Title>
      <ButtonBlock>
        <ImageSelectButton varient={'outline'} onPress={onPressCamera}>
          <ButtomContentBlock>
            <CameraIcon width={48} height={48} fill={theme.color.black} />
            <Body2>카메라</Body2>
          </ButtomContentBlock>
        </ImageSelectButton>
        <ImageSelectButton varient={'outline'} onPress={onPressAlbum}>
          <ButtomContentBlock>
            <AlbumIcon width={48} height={48} fill={theme.color.black} />
            <Body2>앨범</Body2>
          </ButtomContentBlock>
        </ImageSelectButton>
      </ButtonBlock>
    </ActionSheet>
  );
};

export default ImagePickerActionSheet;
