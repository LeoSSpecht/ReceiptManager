import React, {useState, useEffect, useContext} from 'react';
import { View, StyleSheet, Text, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import AppLoginContext from '../components/LoginContext';
import CameraOptionButton from '../components/NButton';
import LoginPage from '../components/LoginPage';

type LoginProps = {
    register?:boolean;
    setRegisterState?: () => void;
}

const LoginFlux: React.FC<LoginProps> = () =>{
    const LoginContext = useContext(AppLoginContext);
    const changeLoginState = LoginContext.setLogin;
    const [registering, setIsRegistering] = useState(false);
    const login = () => {
        return (
            <View>
                <LoginPage/>
                <CameraOptionButton
                    text = 'Not registered? Register now'
                    handler={() => {setIsRegistering(true)}}
                    styleText = {{textDecorationLine: 'underline'}}
                    styleButton = {{marginTop: 30}}
                />
            </View>
        )
    }

    const register = () => {
        return (
            <View>
                <LoginPage
                register = {true}
                setRegisterState={() =>{setIsRegistering(false)}}/>
            </View>
        )
    }

    return (
        <View style = {styles.mainContainer}>
            {registering ? register() : login()} 
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        height: '90%',
        alignContent: 'flex-end',
        justifyContent: 'flex-end'
    }
})

export default LoginFlux;