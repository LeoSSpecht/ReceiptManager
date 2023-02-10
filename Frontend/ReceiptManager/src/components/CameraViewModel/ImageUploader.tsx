import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import CameraView from './CameraView';
import SelectDropdown from 'react-native-select-dropdown';
import CameraOptionButton from '../NButton';
import InputField from '../InputField';
import {ManualInputData} from './ManualInputForms';
import ManualInputForms from './ManualInputForms';

export type SelectedImage = {
    imageUri?: string;
    imageDataBase64?: string;
    imageName?: string;
    width?: number;
    height?: number;
    fileSize?: number;
}

export type ImageUploaderProps = {
    selectedImage: SelectedImage;
    setSelectedImage: (_: SelectedImage) => void;

    isImageSelected: boolean;
    setIsImageSelected: (_: boolean) => void;

    inputManually: boolean;
    setInputManually: (_: boolean) => void;

    manualInputData: ManualInputData;
    setManualInputData: (_: ManualInputData) => void;

    category: string;
    setCategory: (_: string) => void;

    isValid: boolean;
    categories: Array<string>;

    sendInformation: () => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = (
    {
        selectedImage,setSelectedImage,
        isImageSelected,setIsImageSelected,
        inputManually,setInputManually,
        manualInputData,setManualInputData,
        category,setCategory,
        isValid,
        categories,
        sendInformation
    }) => {

    const changeInputMode = () => {setInputManually(!inputManually)}

    const changeManualInput = (arg:string | number) => {
        if (typeof(arg) == 'number'){
            setManualInputData({amount: arg, name: manualInputData?.name})
        }
        else{
            setManualInputData({amount: manualInputData?.amount, name: arg})
        }
    }

    return (
        <View style = {{alignItems: 'center',height: '100%', width: '100%'}}>
            <View style={{
                flex: 0.95,
                backgroundColor: '#eeeeee',
                alignSelf: 'stretch',
                marginHorizontal: 15,
                borderRadius: 10,
                marginTop: 10
                }}>
                    {
                        inputManually ? 
                        <ManualInputForms changeInputMode={changeInputMode} handler={changeManualInput}/>:
                        <CameraView 
                            isImageSelected = {isImageSelected}
                            imageData = {selectedImage}
                            setImage = {setSelectedImage}
                            setInputManually = {changeInputMode}
                            />
                    }
                
            </View>
            <View style = {{marginVertical: 10, alignSelf: 'stretch', marginHorizontal: 15}}>
                <SelectDropdown
                    data={categories}
                    onSelect={setCategory}
                    buttonStyle={{borderRadius: 10, width: '100%'}}
                    buttonTextStyle={{fontSize: 14}}
                    defaultButtonText={`Category: ${category}`}
                    rowTextStyle = {{fontSize: 14}}
                    buttonTextAfterSelection = {(selected, index) => {return `Category: ${category}`}}
                />
                <CameraOptionButton
                    text='Confirm'
                    handler={sendInformation}
                    styleButton={{backgroundColor: '#1525a1', borderRadius: 10, marginVertical: 10, height: 50, opacity: isValid ? 1 : 0.5}}
                    styleText = {{color: 'white', fontSize: 18, fontFamily: 'System'}}
                />
            </View>
            

        </View>
        
        
        
    );
}

export default ImageUploader;