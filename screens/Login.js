import React, {useState} from 'react'
import {ImageBackground, View, StyleSheet, Text, SafeAreaView, Image} from 'react-native'
import {HelperText, TextInput,Button,Title  } from 'react-native-paper';
import firebase from '../Firebase/firebase';
import banner from '../Images/ui-oms.png'
import {auth} from '../Firebase/firebase'
export default function Login({navigation}) {
    const [emailInput, setEmailInput] = useState('');
    const [emailError, setEmailError] = useState('');
    const [emailErrorState, setEmailErrorState] = useState(false);
    
    const [passwordInput, setPasswordInput] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordErrorState, setPasswordErrorState] = useState(false);
    const [showVisibility, setShowVisibility] = useState(true)
    const [passIcon, setPassIcon] = useState("eye-off")

    async function login() {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailInput) {
            setEmailError("Please enter your Email.");
            setEmailErrorState(true);
        } else if (reg.test(emailInput) === false) {
             setEmailError("Please enter valid Email.");
             setEmailErrorState(true);
        } else {
            setEmailErrorState(false);
             setEmailError("");

        }
        if (!passwordInput) {
            setPasswordError("Please enter your password.");
            setPasswordErrorState(true);
        } else {
            setPasswordError("");
            setPasswordErrorState(false);
            try {
                await auth.signInWithEmailAndPassword(emailInput, passwordInput)
                const dbAccountDetails = firebase.database().ref("account-details")
                dbAccountDetails.orderByChild("email").equalTo(emailInput).once('value').then(snapshot => {
                    if (snapshot.exists()) {
                        setEmailInput("")
                        setPasswordInput("")
                        const dbRef = firebase.database().ref("account-details");
                        dbRef.on('value', snapshot => {
                            snapshot.forEach(snap => {
                                if (emailInput === snap.val().email) {
                                    navigation.navigate('AdminUI', {
                                        key: snap.key,
                                    });
                                }
                            });
                        })
                        
                    }
                    
                })
                
            }
            catch (error) {
                if ( error.code === "auth/wrong-password") {
                    setEmailError("Invalid email or password");
                    setEmailErrorState(true);
                    setPasswordError("Invalid email or password");
                    setPasswordErrorState(true);
                } else if (error.code === "auth/user-not-found") {
                    setEmailError("User not found, please anter a registered account");
                    setEmailErrorState(true);
                    setPasswordError("User not found, please anter a registered account");
                    setPasswordErrorState(true);
                }
            }
        }
    }
    function redirectToRegister() {
        navigation.navigate('Register')
    }
    function redirectToForgotPass() {
        navigation.navigate('ForgotPass')
    }
    function showPassword() {
        if (passIcon === "eye") {
            setPassIcon("eye-off")
        } else {
            setPassIcon("eye")
        }
        setShowVisibility(!showVisibility)
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
                        right={<TextInput.Icon name={passIcon}  onPress={showPassword}/> }
                        error={passwordErrorState}
                        style={styles.textInput}
                        label="Password"
                        value={passwordInput}
                        onChangeText={password => setPasswordInput(password)}
                        mode = "outlined"
                        secureTextEntry={showVisibility}
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