/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import ImageUploader from './src/pages/ImageUploader';
import LoginPage from './src/pages/LoginPage';
import { useState } from 'react';



function App(): JSX.Element {
  const [loginState, setLoginState] = useState({state: false, uid: ""});

  const LogInData = (state: boolean, uid: string) => {
    setLoginState({'state': state, 'uid': uid})
  }

  return (
    <SafeAreaView>
      {/* <View style = {{padding: 10, backgroundColor: Colors.white, alignItems: 'center'}}>
        <ImageUploader/>
      </View> */}
      {
        loginState.state ? 
        <Text>Logged in</Text>:
        <LoginPage changeLoginState={LogInData}></LoginPage>  
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: 'row', 
    justifyContent: 'center'
  },
  sectionContainer: {
    marginTop: 32,
    marginHorizontal: 10,
    paddingHorizontal: 24,
    backgroundColor: '#999999',
    padding: 10, 
    borderRadius: 10
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
