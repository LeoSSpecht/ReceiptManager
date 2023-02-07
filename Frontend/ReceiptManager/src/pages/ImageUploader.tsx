import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import CameraView from '../components/CameraView';
import SelectDropdown from 'react-native-select-dropdown';
import CameraOptionButton from '../components/NButton';
import InputField from '../components/InputField';

export type SelectedImage = {
    imageUri?: string;
    imageDataBase64?: string;
    imageName?: string;
    width?: number;
    height?: number;
    fileSize?: number;
}

type ManualInputData = {
    amount?: number;
    name?: string;
}

type FormProps = {
    changeInputMode: () => void;
    handler: (_: string | number) => void;
}

const ManualInputForms: React.FC<FormProps> = ({changeInputMode, handler}) => {
    return (
        <View style = {{justifyContent: 'flex-end', alignContent: 'center', height: '98%'}}>
            <View style = {{flex: 1, justifyContent: 'center'}}>
                <InputField placeholder='Expenditure name' money = {false} handler = {handler}/>
                <InputField placeholder='' money = {true} handler = {handler}/>
            </View>
            
            <CameraOptionButton
                text='Input using receipt'
                styleText = {{textDecorationLine: 'underline'}}
                styleButton = {{marginBottom: 10}}
                handler={changeInputMode}
            />   
        </View>
    )
}

const ImageUploader: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<SelectedImage>();
    const [isImageSelected, setIsImageSelected] = useState(false);
    const [inputManually, setInputManually] = useState(false);
    const [manualInputData, setManualInputData] = useState<ManualInputData>();
    const [category, setCategory] = useState<string>("General");

    useEffect(() => {
        if(selectedImage){
            setIsImageSelected(true)
        }
    }, [selectedImage])

    let isValid = selectedImage != undefined ||  (manualInputData?.name && manualInputData?.amount);

    const categories = [
        'General',
        'Restaurant',
        'Groceries',
        'House',
        'Transportation',
        'Utilities'
    ];

    const sendInformation = () => {
        console.log(selectedImage?.imageUri);
    }

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
        <View>
            <View style={{
            aspectRatio: 0.6,
            backgroundColor: '#eeeeee',
            width: '90%',
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
            <View style = {{marginVertical: 10, width: '100%'}}>
                <SelectDropdown
                    data={categories}
                    onSelect={setCategory}
                    buttonStyle={{borderRadius: 10, width: '90%'}}
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