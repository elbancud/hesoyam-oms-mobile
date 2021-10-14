import React, {useState} from 'react'
import {ImageBackground, View, StyleSheet, Text, SafeAreaView, Image} from 'react-native'
import {HelperText, TextInput,Button,Title  } from 'react-native-paper';
import firebase from '../Firebase/firebase';
import banner from '../Images/ui-oms.png'
import {auth} from '../Firebase/firebase'
export default function AdminUI({navigation}) {
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <ImageBackground  style={styles.banner} source={banner} resizeMode="cover"/>
            </View>
        
            
        </SafeAreaView>
        
    )
    
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingHorizontal: 15,
    },
    banner: {
        width: '100%',
        height: 300,
    },
    flexColumn: {
        flexDirection: "column",
        backgroundColor: '#fff',
    },
    flexRow: {
        flexDirection: "row",
        alignSelf: 'center',
        justifyContent: 'flex-end'
    },
    justifyCenter:{
        justifyContent: "center"  
    },
    textCenter: {
        textAlign:"center"
    },
    primaryBG:{
        backgroundColor: "#53369f"
    },
    primaryColor:{
        color: "#53369f",
        fontWeight: "bold",
        marginVertical: 15,
        fontSize:18
    },
    padXy: {
         paddingHorizontal: 15,
         marginVertical: 15
    },
    mY: {
        marginTop:20
    },
    padX: {
         paddingHorizontal: 15,
    },
    padY: {
         paddingHorizontal: 15,
    },
    flexEnd: {
        display: 'flex',
        alignSelf: 'flex-end',
        paddingHorizontal: 15,
    },
    textInput: {
        backgroundColor: '#fff',
        width: '90%',
        alignSelf:'center'

    },
    btnContained: {
        alignSelf: 'center',
        backgroundColor: "#53369f",
       
    }
});