import React from 'react';
import { View } from 'react-native';
import ImageUploader from './ImageUploader'
// import { Container } from './styles';

const HomePage: React.FC = () => {
  return (
  <View style={{width: '100%'}}>
    <ImageUploader/>
  </View>
  );
}

export default HomePage;