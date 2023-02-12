import React, { useState, useEffect, useContext } from 'react';
import { View, Modal } from 'react-native';
import ImageUploader, {SelectedImage} from './ImageUploader';
import {ManualInputData} from './ManualInputForms';
import AppLoginContext from '../LoginContext';

import { app, db, storage} from '../../firebase/config';
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
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
            setDoneLoading(true);
            setTimeout(() =>{
                setLoadingUpload(false);
                setDoneLoading(false);
            },1800)
            resetInputState();
          } catch (e) {
            console.error("Error adding document: ", e);
            setLoadingUpload(false);
          }
    }

    async function uploadReceipt(filePath:string ){
        if(LoginContext.state.uid == ""){
            filePath = "testFolder" + filePath;
        }
        const storageRef = ref(storage, filePath);
        const uri = selectedImage.imageUri!.replace('file://', '');

        const response = await fetch(uri);
        const blobFile = await response.blob();
        try{
            await uploadBytes(storageRef, blobFile)
            return getDownloadURL(storageRef);
        }
        catch(err){
            console.log(err)
            return null;
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
        //  foundTotal -> false
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
            let filePath = LoginContext.state.uid + "/" + selectedImage.imageName;
            let receiptReference = await uploadReceipt(filePath);
            if(receiptReference){
                let uploadData = {
                    date: new Date(),
                    'category': category,
                    isPicture: true,
                    amount: null,
                    isApproved: false,
                    correctValue: false,
                    userId: LoginContext.state.uid,
                    imageUrl: receiptReference,
                    'filePath': filePath
                }
                uploadRecord('transactions', uploadData)
            }
            
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