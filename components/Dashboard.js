import React, {useState} from 'react'
import {ImageBackground, View, StyleSheet, Text, SafeAreaView, Image, ScrollView} from 'react-native'
import {Button,Title,Card,IconButton,Menu,Provider, Snackbar} from 'react-native-paper';
import design1 from '../Images/design1.jpg';
import design2 from '../Images/design2.jpg';
import design3 from '../Images/design3.jpg';
import firebase from '../Firebase/firebase';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

export default function Dashboard({route}) {
    const {key} = route.params
 
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                    <Provider>
                    <View style={ styles.padXy}>
                        <Title style={{color:"gray"}}>Build</Title>
                            <Card style={styles.mY, styles.card}>
                                <Card.Cover source={design1} />
                                <Card.Actions style={styles.flexRow}>
                                        <Text style={ styles.textCenter, {fontSize: 16, fontWeight: 'bold'}}>Bold and Loud</Text>
                                </Card.Actions>
                            </Card>
                   
                    </View>
                    
                    </Provider>
            </ScrollView>
              
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
        paddingHorizontal:20,
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    justifyCenter:{
        justifyContent: "center"  
    },
    card: {
        borderRadius: 10,
        shadowColor: "#0f0",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 4,
        marginVertical: 20
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