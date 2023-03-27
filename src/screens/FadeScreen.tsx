import { View, Animated , Button  } from 'react-native';
import React from 'react';
import useFadeInOut from '../hooks/useFadeInOut';

const FadeScreen = () => {

    const {opacity, fadeIn, fadeOut} = useFadeInOut();


  return (
    <View style={{
        backgroundColor: 'grey',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        }}
    >
     <Animated.View style={{
            backgroundColor: 'orange',
            width: 150,
            height: 150,
            borderWidth: 10,
            borderColor: 'white',
            marginBottom: 10,
            opacity,
     }}/>
     <Button title="FadeIn" onPress={()=> fadeIn()} />
     <Button title="FadeOut" onPress={()=>fadeOut()} />
    </View>
  );
};

export default FadeScreen;
