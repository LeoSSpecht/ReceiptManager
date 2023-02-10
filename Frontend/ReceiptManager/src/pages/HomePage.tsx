import React from 'react';
import { View } from 'react-native';
import ImageUploader from '../components/CameraViewModel/ImageUploader'
// import { Container } from './styles';
import CameraViewModel from '../components/CameraViewModel/CameraViewModel';

const HomePage: React.FC = () => {
  return (
  <View style={{width: '100%'}}>
    <CameraViewModel/>
  </View>
  );
}

export default HomePage;