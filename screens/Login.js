import React, {useState} from 'react'
import {ImageBackground, View, StyleSheet, Text, SafeAreaView, Image} from 'react-native'
import {HelperText, TextInput,Button,Title  } from 'react-native-paper';
import firebase from '../Firebase/firebase';
import banner from '../Images/ui-oms.png'
export default function Login({navigation}) {
    const [emailInput, setEmailInput] = useState('');
    const [emailError, setEmailError] = useState('');
    const [emailErrorState, setEmailErrorState] = useState(false);
    const [error, setError] = useState('');
    
    const [passwordInput, setPasswordInput] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordErrorState, setPasswordErrorState] = useState(false);

    function login() {
        if (!emailInput) {
            setEmailError("Please enter your Email");
            setEmailErrorState(true);
        }  else {
            setError("");
            setEmailErrorState(false);
        }
        if (!passwordInput) {
            setPasswordError("Please enter your password");
            setPasswordErrorState(true);
        } else {
            setPasswordError("");
            setPasswordErrorState(false);
        }
    }
    function redirectToRegister() {
        navigation.navigate('Register')
    }
    function redirectToForgotPass() {
        navigation.navigate('ForgotPass')
    }
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <ImageBackground  style={styles.banner} source={banner} resizeMode="cover"/>
            </View>
            <View>
                <View style={styles.flexColumn}>
                    <View style={ styles.padXy}>
                        <Title style={{fontWeight:"bold"}}>Sign in your account</Title>
                    </View>
                    <TextInput
                        error={emailErrorState}
                        helperText={emailError}
                        style={styles.textInput}
                        label="Email"
                        value={emailInput}
                        onChangeText={email => setEmailInput(email)}
                        mode = "outlined"
                    />
                    <HelperText type="error" visible={emailErrorState} style={{marginLeft:15}}>
                        {emailError}
                    </HelperText>
                    <View style={styles.flexEnd}>
                        <Text onPress={redirectToForgotPass} style={styles.primaryColor}>Forgot password?</Text>
                    </View>
                    <TextInput
                        error={passwordErrorState}
                        style={styles.textInput}
                        label="Password"
                        value={passwordInput}
                        onChangeText={password => setPasswordInput(password)}
                        mode = "outlined"
                        secureTextEntry={true}
                    />
                    <HelperText type="error" visible={passwordErrorState} style={{marginLeft:15}}>
                        {passwordError}
                    </HelperText>
                </View>
                <View style={styles.flexColumn, styles.btnContained, styles.padXy}>
                    <Button style={{paddingVertical:7, backgroundColor: "#53369f" , paddingHorizontal:15, marginTop:10}} mode="contained" onPress={login}>
                        Login
                    </Button>
                </View>
            </View>
                    
                <View style={styles.flexRow}>
                        <View style={styles.flexRow}>
                            <Text style={ styles.textCenter, {fontSize: 18}}>Not a member yet? </Text>
                        <Text style={styles.textCenter, {color: "#53369f", fontWeight:"bold", fontSize: 18}} onPress={redirectToRegister}> Signup</Text>
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
        // justifyContent: 'space-evenly',
        paddingHorizontal: 15,
        marginVertical: 15
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