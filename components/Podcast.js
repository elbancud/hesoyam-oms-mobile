import React, {useState, useEffect} from 'react'
import {View, StyleSheet, Text, SafeAreaView, ScrollView} from 'react-native'
import {Button,Title, Provider, Snackbar,TextInput,HelperText, Card, IconButton, Portal, Modal} from 'react-native-paper';
import firebase from 'firebase';
// import FilePickerManager from 'react-native-file-picker';
import DocumentPicker from 'react-native-document-picker'
import { WebView } from 'react-native-webview';

export default function Podcast({ route }) {

    return (
        <SafeAreaView style={styles.container}>
            <WebView
                    source={{ uri: 'https://www.hesoyam-ch.com/podcastMobileWebview' }}
                    style={{ marginTop: 20 }}
                />
        
        </SafeAreaView>
      
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // paddingHorizontal: 15,
    },
    spaceBetween: {
        flexDirection: "row",
        justifyContent: 'space-between',
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
        alignItems: 'center',
        justifyContent: 'center'
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
        paddingVertical: 15,
         marginVertical:8
    },
    mY: {
        marginVertical:20
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
    },
    textInput: {
        backgroundColor: '#fff',
        width: '100%',
        alignSelf:'center'

    },
    btnContained: {
        alignSelf: 'center',
        backgroundColor: "#53369f",
    },   success: {
        backgroundColor: "#2e7d32"

    }, error:{
        backgroundColor: "#d32f2f"

        
    }, warning: {
        backgroundColor: "#ed6c02"
        

    },
});