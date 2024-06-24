import styled from '@emotion/native';
import React, {useEffect, useState} from 'react';

import SafeAreaView from '../components/common/SafeAreaView';
import {Body1, Headline6} from '../components/common/TextGroup';
import {Shadow} from 'react-native-shadow-2';
import {ScrollView} from 'react-native';
import {useSocket} from '../providers/SocketProvider';
import Button from '../components/common/Button';
import CameraIcon from '../assets/icons/camera-fill-icon.svg';
import theme from '../styles/theme';
import Indicator from '../components/Indicator';

const Container = styled.View`
  margin: ${props => props.theme.margin.screen};
  margin-top: 32px;
  flex: 1;
`;

const ContentBlock = styled.View`
  padding: 20px 24px 24px 24px;
  border-radius: 12px;
`;

const Title = styled(Headline6)`
  margin-bottom: 18px;
`;

const ImageBlock = styled.View`
  align-items: center;
`;

const ImageContainer = styled.View`
  align-items: center;
  margin-bottom: 20px;
`;

const Image = styled.Image`
  width: 60%;
  aspect-ratio: 1;
  border-radius: 12px;
  border-width: 2px;
  border-color: ${props => props.theme.color.lightGray};
`;

const IndicatorBlock = styled.View`
  width: 60%;
  aspect-ratio: 1;
  margin-bottom: 20px;
  justify-content: center;
  align-items: center;
`;

const CagePhotoScreen = () => {
  const cageId = 'c8487f39-b222-477a-955c-60e15be3ea6d';
  const {socket} = useSocket();
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(
    'https://image.ckie.store/images/individual-profile.jpeg',
  );

  const requestPhoto = () => {
    console.log('사진 내놔');
    setIsLoading(true);
    socket?.emit('request-photo', {cageId});
  };

  useEffect(() => {
    socket?.on('response-photo', (data: {url: string}) => {
      if (data.url) {
        setImage(data.url);
        setIsLoading(false);
      }
    });
  }, [socket]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isLoading) {
      timeout = setTimeout(() => {
        if (isLoading) {
          requestPhoto();
        }
      }, 5000); // 5초 후에 다시 요청
    }

    // Cleanup the timeout if the component unmounts or isLoading changes
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <SafeAreaView>
      <ScrollView>
        <Container>
          <Shadow
            startColor={'#f8f8f8'}
            distance={5}
            style={{width: '100%', borderRadius: 12}}>
            <ContentBlock>
              <Title>사육장</Title>
              <ImageBlock>
                {isLoading ? (
                  <IndicatorBlock>
                    <Indicator />
                  </IndicatorBlock>
                ) : (
                  <ImageContainer>
                    <Image
                      source={{
                        uri: image,
                      }}
                    />
                  </ImageContainer>
                )}
              </ImageBlock>

              <Button onPress={requestPhoto} color={theme.color.secondary}>
                <CameraIcon width={40} height={40} fill={theme.color.white} />
              </Button>
            </ContentBlock>
          </Shadow>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CagePhotoScreen;
