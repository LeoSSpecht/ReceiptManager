import React, { useState, useEffect, useContext } from 'react';
import { View, Modal } from 'react-native';
import ImageUploader, {SelectedImage} from './ImageUploader';
import {ManualInputData} from './ManualInputForms';
import AppLoginContext from '../LoginContext';

import { app, db} from '../../firebase/config';
import { collection, addDoc } from "firebase/firestore";
import LoadingModal from '../loadingModal';

// type imageRecord
const CameraViewModel: React.FC = () => {
    const LoginContext = useContext(AppLoginContext);
    const [selectedImage, setSelectedImage] = useState<SelectedImage>({});
    const [isImageSelected, setIsImageSelected] = useState(false);
    const [inputManually, setInputManually] = useState(false);
    const [manualInputData, setManualInputData] = useState<ManualInputData>({});
    const [category, setCategory] = useState<string>("General");
    const [loadingUpload, setLoadingUpload] = useState(false);
    const [doneLoading, setDoneLoading] = useState(false);

    useEffect(() => {
        if(selectedImage && selectedImage.imageUri){
            setIsImageSelected(true)
        }
    }, [selectedImage]);

    let isValid = Boolean(selectedImage.imageUri != undefined ||  (manualInputData?.name && manualInputData?.amount));

    const resetInputState = () =>{
        setInputManually(false);
        setIsImageSelected(false);
        setSelectedImage({});
        setManualInputData({});
    }

    const categories = [
        'General',
        'Restaurant',
        'Groceries',
        'House',
        'Transportation',
        'Utilities'
    ];

    async function uploadRecord(collection_:string, object_: any){
        try {
            const docRef = await addDoc(collection(db, collection_), object_);
            // console.log("Document written with ID: ", docRef.id);
            setDoneLoading(true);
            setTimeout(() =>{
                setLoadingUpload(false);
                setDoneLoading(false);
            },1800)
            
          } catch (e) {
            console.error("Error adding document: ", e);
            setLoadingUpload(false);
          }
    }

    async function sendInformation(){
        // Fields
        //  date -> Current date
        //  category -> String
        //  isPicture -> boolean | True = receipt | False = manual
        //  imageUrl -> string
        //  amount -> null or float
        //  amountPossibilities -> [array]
        //  name -> string
        //  isApproved -> boolean, true if manual input
        //  correctValue -> boolean, true if manual input
        
        setLoadingUpload(true)
        if(inputManually){
            //add information into database
            let uploadData = {
                date: new Date(),
                'category': category,
                isPicture: false,
                amount: manualInputData.amount,
                name: manualInputData.name,
                isApproved: true,
                correctValue: true,
                userId: LoginContext.state.uid
            }
            uploadRecord('transactions', uploadData)
        }
        else{
            //Upload image into storage, get the link
            //Create object, add it to firebase
            console.log(selectedImage)
            // setLoadingUpload(true)
            // setDoneLoading(true);
            // setTimeout(() =>{
            //     setLoadingUpload(false);
            //     setDoneLoading(false);
            // },1500)
        }
    }

  return (
    <View>
        <Modal
            animationType="none"
            transparent={true}
            visible={loadingUpload}
        >
            <LoadingModal done={doneLoading}/>
        </Modal>
        <ImageUploader
            selectedImage = {selectedImage}
            setSelectedImage = {setSelectedImage}
            isImageSelected = {isImageSelected}
            setIsImageSelected = {setIsImageSelected}
            inputManually = {inputManually}
            setInputManually = {setInputManually}
            manualInputData = {manualInputData}
            setManualInputData = {setManualInputData}
            category = {category}
            setCategory = {setCategory}
            isValid = {isValid}
            categories = {categories}
            sendInformation = {sendInformation}
        />
    </View>

  )
  
  
}

export default CameraViewModel;