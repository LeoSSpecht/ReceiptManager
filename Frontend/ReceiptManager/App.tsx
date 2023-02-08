import React from 'react';
import {
  SafeAreaView,
  StyleSheet
} from 'react-native';

import { useState } from 'react';
import HomePage from './src/pages/HomePage';

import AppLoginContext from './src/components/LoginContext';
import LoginFlux from './src/pages/LoginFlux';


function App(): JSX.Element {
  const [loginState, setLoginState] = useState({state: false, uid: ""});
  const setLogInData = (state: boolean, uid: string) => {
    setLoginState({'state': state, 'uid': uid})
  }

  const LogInData = {
    state: loginState,
    setLogin: setLogInData
  }
  return (
    <AppLoginContext.Provider value={LogInData}>
        <SafeAreaView>
        {
          loginState.state ? 
          <HomePage/>:
          <LoginFlux/>
        }
      </SafeAreaView>
    </AppLoginContext.Provider>
    
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
