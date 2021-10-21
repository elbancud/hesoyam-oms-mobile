import React, {useState, useEffect} from 'react'
import {View, StyleSheet, Text, SafeAreaView, ScrollView, ImageBackground, Image} from 'react-native'
import {Title,IconButton, DataTable, Button, Snackbar} from 'react-native-paper';
import firebase from 'firebase';
import * as ImagePicker from 'expo-image-picker';

export default function Donation({ route }) {
    const {key} = route.params
    const [update, setUpdate] = useState(false);
    const [donationsArray, setDonationsArray] = useState();
    const [visible, setVisible] = useState(false);
    const [snackMessage, setSnackMessage] = useState('')
    const [variant, setVariant] = useState('')
    const [qrArray, setQrArray] = useState()
    const [image, setImage] = useState(null);

    const onDismissSnackBar = () => setVisible(false);

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
            const dbQR = firebase.database().ref('qr-e-wallet')
            dbQR.once("value")
                .then(function (snapshot) {
                    const snap = snapshot.val();
                    const qrArray = [];
                    for (let id in snap) {
                        qrArray.push({id, ...snap[id]});
                    }
                    setQrArray(qrArray)
            });
    }, [update])

         const pickImage = async () => {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                quality: 1,
            });
            const storage = firebase.storage().ref('qr-links').child('qr-e-wallet')
            setImage(result.uri);
            storage.put(image, {contentType:'image/jpg'}).then(() => {
                            storage.getDownloadURL().then(url => {
                                const db = firebase.database().ref('qr-e-wallet')
                                const imageData = {
                                    eWalletLink: url
                                }
                                db.update(imageData).then(() => {
                                    setUpdate(!update)
                                    setVisible(!visible)
                                    setVariant("success")
                                    setSnackMessage("That's it right there, image posted")
                                })
                            })
            })
  };
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>

                        <View style={ styles.padXy}>
                            <Title style={{fontWeight:"bold", marginBottom: 10}}>Donations Tab: Upload QR & View Donators</Title>
                            <Text style={{fontSize: 16, lineHeight: 25}}>Here you will be uploading your e-wallet's qr image, please take a good screenshot and make sure to cut out and keep just the qr code</Text>
                        </View>
                        <View style={ styles.padXy}>
                            <Button onPress={pickImage} icon="camera" style={{padding:5}} mode="outlined">Upload QR Image</Button>
                        </View>
                                       
                <View style={styles.mY}>

                    <View style={styles.padX}>

                   <DataTable>
                    <DataTable.Header>
                        <DataTable.Title>Name</DataTable.Title>
                        <DataTable.Title >Amount</DataTable.Title>
                    </DataTable.Header>
                            {donationsArray ? donationsArray.map(data => {
                                return (
                                    <DataTable.Row key={data.id}>
                                        <DataTable.Cell>{data.donator}</DataTable.Cell>
                                        <DataTable.Cell >{data.donationAmount}</DataTable.Cell>
                                    </DataTable.Row>
                                )
                            }): <Text>No donators yet</Text>
                                
                            }
                    </DataTable>
                    </View>
                </View>

                <View style={styles.mY}>
                        {qrArray ? qrArray.map(data => {
                                return (
                                    <Text>{data.eWalletLink}</Text>
                                )
                            }): <Text>No donators yet</Text>
                                
                        }
                    <Image source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/hesoyam-oms-867e4.appspot.com/o/qr-links%2Fqr-e-wallet?alt=media&token=86ec6788-12b3-444b-91ed-a38f095572a1' }}  style = {{ width: 200, height: 200 }}/>
                </View>
                
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
    },   success: {
        backgroundColor: "#2e7d32"

    }, error:{
        backgroundColor: "#d32f2f"

        
    }, warning: {
        backgroundColor: "#ed6c02"
        

    },
});