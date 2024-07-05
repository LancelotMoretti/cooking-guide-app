import React from "react"
import { Image, StyleSheet,  View} from "react-native"


function Welcome(){
    console.log();
    return (
        <>
            <View style = {styles.container}>
                <View><Image source={require('../assets/images/logo.png')}/></View>
            </View>

        </>
        
    );
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#129575', 
        justifyContent: 'center',
        alignItems: 'center',
    },
})
export default Welcome;