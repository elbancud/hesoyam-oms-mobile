import React, {useState, useEffect} from 'react'
import {View, StyleSheet, Text, SafeAreaView, ScrollView} from 'react-native'
import {Title,IconButton, DataTable} from 'react-native-paper';
import firebase from 'firebase';

export default function Donation({ route }) {
    const {key} = route.params
    
    const [update, setUpdate] = useState(false);
    const [donationsArray, setDonationsArray] = useState();

    useEffect(() => {
        const dbRef = firebase.database().ref("user-donations");
        dbRef.once("value")
            .then(function (snapshot) {
                const postSnap = snapshot.val();
                const donationsArray = [];
                for (let id in postSnap) {
                    donationsArray.push({id, ...postSnap[id]});
                }
                setDonationsArray(donationsArray)
            });
    }, [update])
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                
                        <View style={ styles.padXy}>
                            <Title style={{fontWeight:"bold", marginBottom: 10}}>Donations Tab: Upload QR & View Donators</Title>
                            <Text style={{fontSize: 16, lineHeight: 25}}>Here you will be uploading your e-wallet's qr image, please take a good screenshot and make sure to cut out and keep just the qr code</Text>
                        </View>
                                       
                <View style={styles.mY}>
                    <View style={styles.padX}>
                        <DataTable>
                            <DataTable.Header>
                                <DataTable.Title>Name</DataTable.Title>
                                <DataTable.Title >Amount</DataTable.Title>
                            </DataTable.Header>
                        {donationsArray ? donationsArray.map((data)=> {
                                    return (
                                    <DataTable.Row>
                                            <DataTable.Cell align>{data.donator}</DataTable.Cell>
                                            <DataTable.Cell>{data.donationAmount}</DataTable.Cell>
                                       
                                    </DataTable.Row>
                                    )
                                return null;
                            }) : <Text>No Donators yet</Text>}
                        </DataTable>

                    </View>

                </View>
                     

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