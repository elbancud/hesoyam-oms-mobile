import React, {useState, useEffect} from 'react'
import {ImageBackground, View, StyleSheet, Text, SafeAreaView, Image, ScrollView,Linking} from 'react-native'
import {Button,Title, Provider, Snackbar,TextInput,HelperText, Card, IconButton, Portal, Modal} from 'react-native-paper';

import firebase from '../Firebase/firebase';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

export default function Livestream({route}) {
    
    const {key} = route.params

    const [url, setUrl] = useState('')
    const [urlError, setUrlError] = useState('')
    const [urlErrorState, setUrlErrorState] = useState(false)
    const onDismissSnackBar = () => setVisible(false);
    
    const [snackBar, setSnackBar] = useState(false);
    const [visible, setVisible] = useState(false);
    const [snackMessage, setSnackMessage] = useState('')
    const [variant, setVariant] = useState('')

    function redirectToWeb() {
        Linking.openURL("https://www.hesoyam-ch.com/")
    }

   

   function handleUrl() {
        if (!validator.isURL(url)) {
            setAlertStatus(true)
            setFeedbackVariant("error")
            setAlertMessage("Ooops! please input a valid url")
            
        } else {
            
        const db = firebase.database().ref("liveUrl")
        db.update({ liveUrl: url }).then(() => {
            
                                setVisible(!visible)
                                setVariant("success")
                                setSnackMessage("Success! You can now view the Live on generated website")
        })
        }
        
    }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                    <Provider>
                    <View style={ styles.padXy}>
                        <View style={ styles.padXy}>
                            <Title style={{fontWeight:"bold", marginBottom: 10}}>Livestream</Title>
                            <Text style={{fontSize: 16, lineHeight: 25}}>Follow this steps to embed the live video in your generated website.</Text>
                       
                        </View>
                        
                        <View style={ styles.padXy}>
                            <Title style={{fontWeight:"bold", marginBottom: 10}}>1. Navigate to your Video Post</Title>
                            <Text style={{fontSize: 16, lineHeight: 25}}>If you post a public video you can get the embed code directly from the video post itself.</Text>
                        </View>

                        <View style={ styles.padXy}>
                            <Title style={{fontWeight:"bold", marginBottom: 10}}>2. Get Video Post URL by opening the embed option on your live video.</Title>
                            <Text style={{fontSize: 16, lineHeight: 25}}>If you post a public video you can get the embed code directly from the video post itself.</Text>
                        </View>

                        <View style={ styles.padXy}>
                            <Title style={{fontWeight:"bold", marginBottom: 10}}>3. Select embed and Advance settings.</Title>
                            <Text style={{fontSize: 16, lineHeight: 25}}>Upon selecting the embed option you will be prompted with a dialog containing information. Here you want to click "Advanced Settings"</Text>
                        </View>

                        <View style={ styles.padXy}>
                            <Title style={{fontWeight:"bold", marginBottom: 10}}>4. Copy and Paste the video url here.</Title>
                            <Text style={{fontSize: 16, lineHeight: 25}}>Clicking the advance settings will redirect you to a page. Here you have a designated page for the url. Kindly copy the texts in the URL of Post box and paste it here.</Text>
                        </View>

                             <TextInput
                                error={urlErrorState}
                                style={styles.textInput}
                                label="Enter URL"
                                value={url}
                                onChangeText={url => setUrl(url)}
                                mode = "outlined"
                            />
                        <View style={ styles.padXy}>
                               
                            <HelperText type="error" visible={urlErrorState} style={{marginLeft:15}}>
                                {urlError}
                            </HelperText>       

                            <Button disabled={!url} style={{paddingVertical:7, backgroundColor: "#53369f" , paddingHorizontal:2, width: '100%'}} mode="contained" onPress={handleUrl}>
                                Submit
                            </Button>
                        </View>

                        
                    </View>
                    
                    </Provider>
            </ScrollView>
               <Snackbar
                                    duration = {2500}
                                    style={variant === "success" ? styles.success: variant === "error" ?styles.error: styles.warning}
                                    visible={visible}
                                    onDismiss={onDismissSnackBar}
                                    >
                                {snackMessage}
                            </Snackbar>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        paddingHorizontal: 15,
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
        paddingVertical: 15,
        paddingHorizontal:20,
        flexDirection: "row",
        justifyContent: 'space-between'
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
       
    },   success: {
        backgroundColor: "#2e7d32"

    }, error:{
        backgroundColor: "#d32f2f"

        
    }, warning: {
        backgroundColor: "#ed6c02"
        

    }
});