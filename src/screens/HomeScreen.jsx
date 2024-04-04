import React from 'react';
import {Button} from 'react-native';
import {SafeAreaView, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const HomeScreen = () => {
  return (
    <SafeAreaView>
      <Text>스네일</Text>
      <Icon name="home-outline" size={24} color="#000000" />
      <Button title="Test" onPress={() => console.log('test')} />
    </SafeAreaView>
  );
};

export default HomeScreen;
