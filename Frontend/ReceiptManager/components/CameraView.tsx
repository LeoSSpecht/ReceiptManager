import React, { useEffect } from 'react';
import { Image, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { SelectedImage } from '../pages/ImageUploader';
import { MediaType, Asset } from 'react-native-image-picker';
// import { Container } from './styles';
import CameraOptionButton from './NButton';

type CameraViewProps = {
  isImageSelected: boolean;
  imageData?: SelectedImage;
  setImage: (arg0: SelectedImage) => void;
  setInputManually: () => void;
}

const CameraView: React.FC<CameraViewProps> = ({isImageSelected, imageData, setImage, setInputManually}) => {

    // useEffect(() => {
    //   launchCamera_()
    // }, []);

    const options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      mediaType: "photo" as MediaType,
      saveToPhotos: false
    }

    function fillImageAsset(asset: Asset): SelectedImage {
      let r: SelectedImage = {
        imageUri: asset.uri,
        imageDataBase64: asset.base64,
        imageName: asset.fileName,
        width: asset.width,
        height: asset.height,
        fileSize: asset.fileSize,
      }
      return r;
    }

    const launchCamera_ = () => {
        // console.log(launchCamera)
        launchCamera(options, (response) => {
          console.log('Response = ', response);
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.errorCode) {
            console.log('ImagePicker Error: ', response.errorCode);
          } else {
            console.log('response', response);
            if(response.assets && response.assets[0]){
              let asset: Asset = response.assets[0];
              setImage(fillImageAsset(asset));
              // setIsImageSelected(true);
            }
          }
      });
    }

    const launchImageLibrary_ = () => {
      launchImageLibrary(options, (response) => {
        console.log('Response = ', response);
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorCode);
        } else {
          console.log('response', response);
          if(response.assets && response.assets[0]){
            let asset: Asset = response.assets[0];
            setImage(fillImageAsset(asset));
            // setIsImageSelected(true);
          }
        }
      });
    }
        
    const showImage = () =>{
      return (
        <View>
          <View 
          style = {{paddingTop:10, paddingHorizontal:10}}
          >
            <Image 
              resizeMode="cover"
              style = {{
                height: '96%',
                width: '100%',
                borderRadius: 10,
              }}
              source={{uri: imageData!.imageUri}}/>
          </View>
          <View style = {styles.buttonRow}>
            <CameraOptionButton 
                text = 'Retake picture' 
                handler={launchCamera_}
                styleText = {{textDecorationLine: 'underline', color: '#dc143c'}}></CameraOptionButton>
            <CameraOptionButton 
              text = 'Select other receipt' 
              handler={launchImageLibrary_}
              styleText = {{textDecorationLine: 'underline'}}></CameraOptionButton>
          </View>
        </View>
        
      )
    }

    const NoSelectedView = () => {
      return(
        <View style = {{justifyContent: 'flex-end', alignContent: 'center', height: '98%'}}>
          <View style = {{flex: 1, justifyContent: 'center'}}>
            <Text style = {{textAlign: 'center'}}>No image selected yet!</Text>
          </View>
          <View style = {[styles.buttonRow, {marginBottom: 5}]}>
            <CameraOptionButton 
                text = 'Select from library' 
                handler={launchImageLibrary_}
                styleText = {{textDecorationLine: 'underline'}}></CameraOptionButton>
              <CameraOptionButton 
                  text = 'Take picture' 
                  handler={launchCamera_}
                  styleText = {{textDecorationLine: 'underline'}}></CameraOptionButton>
          </View>
          
          <Text style = {{textAlign: 'center'}}>or</Text>
          <CameraOptionButton 
                  text = 'Input information manually' 
                  styleButton={{marginTop: 5}}
                  handler={setInputManually}
                  styleText = {{textDecorationLine: 'underline'}}></CameraOptionButton>
        </View>
      )
    }

  return (
    <View>
        {
          isImageSelected ?
          showImage()
          :
          NoSelectedView()
        }
    </View>
  );
}

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: 'row', 
    justifyContent: 'space-evenly',
    alignContent: 'center',
    // height: '10%'
    // width: "100%"
  }
});

export default CameraView;