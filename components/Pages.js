import React, {useState, useEffect} from 'react'
import {ImageBackground, View, StyleSheet, Text, SafeAreaView, Image, ScrollView,Linking} from 'react-native'
import {Button,Title,Card,IconButton,Menu,Provider, Snackbar} from 'react-native-paper';
import design1 from '../Images/design1.jpg';
import design2 from '../Images/design2.jpg';
import design3 from '../Images/design3.jpg';
import firebase from '../Firebase/firebase';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

export default function Login({route}) {
    const {key} = route.params
    const [visible1, setVisible1] = useState(false);
    const [currentPage, setCurrentPage] = useState("")
    const [visible, setVisible] = useState(false);

    function redirectToWeb() {
        Linking.openURL("https://www.hesoyam-ch.com/")
    }
     useEffect(() => {
        const dbRefWithKey = firebase.database().ref("account-details/" + key);
        dbRefWithKey.on('value', snapshot => {
            snapshot.forEach(snap => {
                if (snap.hasChild("designName")) {
                        setVisible(!visible)
                     
                        setCurrentPage(snap.val().designName)
                    return true
                } 
            })
        })
    }, [])
   
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                    <Provider>
                    <View style={ styles.padXy}>
                       <View style={ styles.padXy}>
                        <Title style={{fontWeight:"bold", marginBottom: 10}}>Activated Pages</Title>
                        <Text style={{fontSize: 16, lineHeight: 25}}>We assume that you already have activated page, if not please visit themes page. Considering that sizes are compromise, the activated page could be edited through clicking edit.</Text>
                       
                        </View>
                            <Card style={styles.mY}>
                                <Card.Cover source={currentPage === "design1" ? design1 : currentPage === "design2"? design2 : design3} />
                                <Card.Actions style={styles.flexRow}>
                                        <Text style={ styles.textCenter, {fontSize: 16, fontWeight: 'bold'}}>{currentPage === "design1" ? "Bold and Loud" : currentPage === "design2"? "Classic Blue" : "Dark Spectrum" }</Text>
                                        <Text style={styles.textCenter, {color: "#53369f", fontWeight:"bold", fontSize: 16}} onPress={redirectToWeb}> Edit</Text>
                                            
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