import React, {useState} from 'react'
import { View, StyleSheet, Text, SafeAreaView } from 'react-native'
import { TextInput,Button,Title  } from 'react-native-paper';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    function login() {
        alert("putanigna")
    }
    return (
        <SafeAreaView style={styles.container}>
                <View style={styles.flexColumn}>
                    <View style={ styles.padXy}>
                    <Title style={{fontWeight:"bold"}}>Sign in your account</Title>
                    </View>
                    <TextInput
                        style={styles.textInput}
                        label="Email"
                        value={email}
                        onChangeText={email => setEmail(email)}
                        mode = "outlined"
                    />
                    <View style={styles.flexEnd}>
                        <Text style={styles.primaryColor}>Forgot password?</Text>
                    </View>
                    <TextInput
                        style={styles.textInput}
                        label="Password"
                        value={password}
                        onChangeText={password => setPassword(password)}
                        mode = "outlined"
                    secureTextEntry={true}
                />
                </View>
                <View style={styles.flexColumn, styles.btnContained, styles.padXy}>
                    <Button style={{paddingVertical:7, backgroundColor: "#53369f" , paddingHorizontal:7, marginTop:10}} mode="contained" onPress={login}>
                        Login
                    </Button>
                </View>
                    
                <View style={styles.flexRow}>
                        <View style={styles.flexRow}>
                            <Text style={ styles.textCenter}>Not a member yet? </Text>
                        <Text style={styles.textCenter, {color: "#53369f", fontWeight:"bold"}}> Signup</Text>
                        </View>
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