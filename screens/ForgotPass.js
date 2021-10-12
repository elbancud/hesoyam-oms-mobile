import React, {useState} from 'react'
import { View, StyleSheet, Text, SafeAreaView } from 'react-native'
import { TextInput,Button,Title  } from 'react-native-paper';
export default function Login({navigation}) {
    const [email, setEmail] = useState('');
    function login() {
        alert("putanigna")
    }
      function redirectToRegister() {
        navigation.navigate('Register')
    }
    return (
        <SafeAreaView style={styles.container}>
                <View style={styles.flexColumn}>
                    <View style={ styles.padXy}>
                        <Title style={{fontWeight:"bold"}}>Enter your registered email</Title>
                    </View>
                    <TextInput
                        style={styles.textInput}
                        label="Email"
                        value={email}
                        onChangeText={email => setEmail(email)}
                        mode = "outlined"
                    />
                </View>
                <View style={styles.flexColumn, styles.btnContained, styles.padXy}>
                    <Button style={{paddingVertical:7, backgroundColor: "#53369f" , paddingHorizontal:7, marginTop:10}} mode="contained" >
                        Send password link
                    </Button>
                </View>
        </SafeAreaView>
        
    )
    
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15,
        marginVertical: 15
    },
   
    flexColumn: {
        flexDirection: "column",
        backgroundColor: '#fff',
       
    },
    flexRow: {
        flexDirection: "row",
        alignSelf:'center'
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
        marginVertical: 15
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
        width: '90%',
        alignSelf: 'center',
        backgroundColor: "#53369f",
       
    }
});