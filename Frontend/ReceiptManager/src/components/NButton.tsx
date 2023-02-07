import React from 'react';
import { Pressable, View, StyleSheet, Text, StatusBar, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';

// import { Container } from './styles';
type Props = {
    text: string;
    handler: () => void;
    styleButton?: ViewStyle;
    styleText?: TextStyle;
}

const CameraOptionButton: React.FC<Props> = ({text, handler, styleButton, styleText}) => {
  return (
    <TouchableOpacity style = {[styles.button, styleButton]} onPress = {handler}>
        <Text numberOfLines={2} style = {[styles.buttonText, styleText]}>{text}</Text>
    </TouchableOpacity>
    
  );
}

const styles = StyleSheet.create({
    button:{
        // backgroundColor: '#1525a1',
        // marginVertical: 0,
        // marginHorizontal:10,
        // borderRadius: 15,
        // paddingVertical: 10,
        paddingHorizontal: 10,
        // width: '50%',
        // flex: 0.5,
        // maxWidth: 220,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText:{
        fontWeight: 'bold',
        color: "black",
        textAlign: 'center',
        fontSize: 12
    }
  });
export default CameraOptionButton;