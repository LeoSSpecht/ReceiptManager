import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Text, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import InputField from '../components/InputField';
import CameraOptionButton from '../components/NButton';
import { Icon } from 'react-native-elements'

import { app } from '../firebase/config';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import GoogleButton from '../components/GoogleButton';
// import { Container } from './styles';

const auth = getAuth(app);

type LoginProps = {
    register?:boolean;
    changeLoginState: (state: boolean, uid: string) => void;
    setRegisterState?: () => void;
}

const LoginPage: React.FC<LoginProps> = ({register = false, changeLoginState, setRegisterState}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [wrongPassword, setWrongPassword] = useState(false);
    const [error, setError] = useState(false);

    const isValidLogin = !register && email != "" && password != "";
    const isValidRegister = register && email != "" && password != "" && password == confirmPassword;
    const arrow_color = isValidRegister ? '#13118a' : isValidLogin ? '#13118a' : '#888888'

    useEffect(() => {
        if(wrongPassword){
            setTimeout(() => {
                setWrongPassword(false)
            }, 3000)
        }
    }, [wrongPassword])

    const registerFunction = () => {
        setLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            changeLoginState(true, user.uid);
        })
        .catch((error) => {
            setLoading(false);
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            Alert.alert("Oops...",errorMessage);
        });
    }

    const loginUser = () => {
        setLoading(true);
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            setLoading(false);
            changeLoginState(true, user.uid);
        })
        .catch((error) => {
            setLoading(false);
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            if(errorCode == "auth/wrong-password"){
                setWrongPassword(true);
            }
            else{
                console.log(errorMessage);
                Alert.alert("Oops...",errorMessage);
            }
        });
    }

    const loginWithGoogle = async () => {
        setLoading(true);
        GoogleSignin.configure({
            webClientId: "803781307265-qhrv5pvctue94g0drg85h7d88n8h7355.apps.googleusercontent.com"
        });
        try{
            const { idToken } = await GoogleSignin.signIn();
            const googleCredential = GoogleAuthProvider.credential(idToken);
            
            signInWithCredential(auth, googleCredential)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                if(credential){
                    const token = credential.accessToken;
                    const user = result.user;
                    changeLoginState(true, user.uid);
                    setLoading(false);
                }
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                Alert.alert("Oops...", errorMessage);
                const email = error.customData.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
                setLoading(false);
            }); 
        }
        catch(err){
            console.log(err);
            setLoading(false);
        }
        
    }

    const wrongPasswordMessage = () => {
        return (
            wrongPassword ? 
            <View>
                <Text 
                    style = {{textAlign: 'center', color: 'red', margin:10}}
                >The entered password is invalid, please try again.</Text>
            </View>
            : null
        )
    }

    const proceedArrow = () => {
        return (
            loading ? 
                <ActivityIndicator style = {{marginRight: 25, marginLeft: 5}} />
            :
            <TouchableOpacity 
                onPress={register ? registerFunction : loginUser} 
                disabled={!(isValidLogin || isValidRegister)}>
                <Icon name='arrow-forward' size={40} color={arrow_color} style={{marginRight: 10}}/>
            </TouchableOpacity>
        )
    }

    const googleSignUpOption = () => {
        return (
            <View>
                <View style = {{flexDirection: 'row', alignItems:'center', marginHorizontal: 30, marginVertical: 10}}>
                    <View style = {{height: 1, flex:1, backgroundColor: 'gray'}}></View>
                    <Text style = {{fontWeight:'bold', marginHorizontal: 10}}>or</Text>
                    <View style = {{height: 1,flex:1, backgroundColor: 'gray'}}></View>
                </View>
                <GoogleButton onPress={loginWithGoogle}></GoogleButton>
            </View>
        )
    }

    const registerOption = () => {
        return (
            <View>
            <View style = {{flexDirection: 'row', alignItems: 'center'}}>
                <View style = {{flex: 1}}>
                    <InputField 
                    placeholder='Confirm your password' 
                    placeHolderColor='#57575D'
                    customStyle={{backgroundColor: '#D7D7DD'}}
                    password = {true} 
                    handler={setconfirmPassword}></InputField>
                    </View>
                {proceedArrow()}
            </View>
            <CameraOptionButton
                    text = 'Already have an account? Log In here!'
                    handler={() => {if(setRegisterState){setRegisterState()}}}
                    styleText = {{textDecorationLine: 'underline'}}
                    styleButton = {{marginTop: 30}}
                />
        </View>
        )
    }
  return (
    <View>
        {wrongPasswordMessage()}
        <InputField 
            placeholder='Email' 
            email = {true}
            placeHolderColor='#57575D'
            customStyle={{backgroundColor: '#D7D7DD'}} 
            handler={setEmail} ></InputField>
        
        <View style = {{flexDirection: 'row', alignItems: 'center'}}>
            <View style = {{flex: 1}}>
                <InputField 
                    placeholder='Password' 
                    placeHolderColor='#57575D'
                    customStyle={{backgroundColor: '#D7D7DD'}}
                    password = {true} 
                    handler={setPassword}></InputField>
            </View>
            {!register ? proceedArrow() : null}
            
        </View>

        {register ? 
            registerOption()
            : googleSignUpOption()
        }
        <View style={{alignItems: 'flex-start'}}>
        </View>
    </View>
  );
}

const LoginFlux: React.FC<LoginProps> = ({changeLoginState}) =>{
    const [registering, setIsRegistering] = useState(false);
    const login = () => {
        return (
            <View>
                <LoginPage 
                    changeLoginState={changeLoginState} 
                    />
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
                changeLoginState={changeLoginState}
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