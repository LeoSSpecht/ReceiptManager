import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import InputField from '../InputField';
import CameraOptionButton from '../NButton';

export type ManualInputData = {
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

export default ManualInputForms;