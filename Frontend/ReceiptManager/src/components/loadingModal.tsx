import React, {ComponentType, useEffect, useRef} from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Animated} from 'react-native';
import { Icon } from 'react-native-elements';

// import { Container } from './styles';
const LoadingModal = ({done}:{done:boolean}) => {
    const sizeAnim = React.useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // if(done){
            Animated.spring(sizeAnim, {
                toValue: 1,
                // duration: 500,
                tension: 3,
                useNativeDriver: true,
              }).start();
        // }
        
      }, [sizeAnim]);

  return (
    <View style={styles.centeredView}>
        <View style={styles.modalView}>
            {
                done ? 
                <Animated.View style={{transform: [{scale: sizeAnim}]}}>
                    <Icon name='done' size={40} color={'green'}/>
                </Animated.View>
                // <AnimatedIcon name='done'/>
                
                : <ActivityIndicator size={'large'}/>
            }
            
        </View>
    </View>
  );
}
const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
      backgroundColor: '#F9FCFF88'
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
  });

export default LoadingModal;