import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, ViewStyle } from 'react-native';

// import { Container } from './styles';


const GoogleButton = ({onPress}:{onPress: () => void}) => {
    return (
        <View style ={styles.bottomContent}>
            <TouchableOpacity style={styles.googleButton} onPress={onPress}>
                <Image
                style={styles.googleIcon}
                source={require('../assets/search.png')}
                />
                <Text style={styles.googleButtonText}>Sign in with Google</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    bottomContent: {
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
       },
    googleButton: {
     backgroundColor: "white",
     borderRadius: 4,
     paddingHorizontal: 34,
     paddingVertical: 16,
     flexDirection: 'row',
     justifyContent: 'center',
     alignItems: 'center'
    },
    googleButtonText: {
     marginLeft: 16,
     fontSize: 15,
     fontWeight: '600'
    },
    googleIcon: {
     height: 24,
     width: 24
    }
   });

export default GoogleButton;