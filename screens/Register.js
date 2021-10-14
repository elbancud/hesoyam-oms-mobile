import React, {useState} from 'react'
import { View, StyleSheet, Text, SafeAreaView } from 'react-native'
import { TextInput,Button,Title,HelperText } from 'react-native-paper';
import firebase from '../Firebase/firebase';
import {auth} from '../Firebase/firebase'
export default function Register({navigation}) {
  const [usernameInput, setUsernameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordConfirmInput, setPasswordConfirmInput] = useState('');
  
  const [usernameError, setUsernameError] = useState('');
  const [usernameErrorState, setUsernameErrorState] = useState(false);

  const [emailError, setEmailError] = useState('');
  const [emailErrorState, setEmailErrorState] = useState(false);
  
  const [passwordError, setPasswordError] = useState('');
  const [passwordErrorState, setPasswordErrorState] = useState(false);

  const [passwordConfirmError, setPasswordConfirmError] = useState('');
  const [passwordConfirmErrorState, setPasswordConfirmErrorState] = useState(false);

  const [error, setError] = useState(false);
    
  const [showVisibility, setShowVisibility] = useState(true)
  const [passIcon, setPassIcon] = useState("eye-off")

  function redirectToLogin() {
    navigation.navigate('Login')
  }
    function saveData() {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

        if (!usernameInput) {
            setUsernameError("Please enter your Username");
            setUsernameErrorState(true);
            setError(true)
        }else if (usernameInput.length < 8) {
            setUsernameError("Username must be minimum of 8 characters");
            setUsernameErrorState(true);
            setError("Please complete the fields");
            setError(true)
        } else {
                    setUsernameError("");
                    setUsernameErrorState(false);
                    setError(false);
            
           
        }
        if (!emailInput ) {
            setEmailError("Please enter your Email");
            setEmailErrorState(true);
            setError(true)
        }else if (reg.test(emailInput) === false) {
            setEmailError("Please enter a valid Email");
            setEmailErrorState(true);
            setError(true)
        }else {
            setEmailError("");
            setEmailErrorState(false);
                    setError(false);

        }if (passwordInput === "") {
            setPasswordError("Please enter your Password");
            setPasswordErrorState(true);
            setError(true)
        }else if (strongRegex.test(passwordInput) === false) {
            setPasswordError('Weak password: TRY Minimum of 8 characters, 1 Lowercase, 1 Uppercase, 1 Number, 1 Symbol')
            setPasswordErrorState(true);
            setError(true)
        }else {
            setPasswordError("");
            setPasswordErrorState(false);
                    setError(false);

        }
        if (!passwordConfirmInput) {
            setPasswordConfirmError("Please repeat your Password");
            setPasswordConfirmErrorState(true);
            setError(true)
            
        } else if (passwordInput !== passwordConfirmInput) {
            setPasswordConfirmError("Please repeat your Password");
            setPasswordConfirmErrorState(true);
            setError(true)
        } else {
            setPasswordConfirmError("");
            setPasswordConfirmErrorState(false);
            setError(false);
            const dbRef = firebase.database().ref("account-details");
            dbRef.orderByChild("username").equalTo(usernameInput).once('value').then(snapshot => {
                if (snapshot.exists()) {
                    setUsernameErrorState(true);
                    setUsernameError("Username already taken");
                    setError("Please enter a different username");
                    setError(true)
                } else {
                    auth.createUserWithEmailAndPassword(emailInput, passwordConfirmInput).then((user) => {
          
                          const usernameReferenceFromDb = firebase.database().ref("account-details");
                          const userDetails = {
                            username: usernameInput,
                            email: emailInput,
                          
                          }
                            usernameReferenceFromDb.push(userDetails);
                            navigation.navigate("Login")
                            setAlertStatus(true)
                            setFeedbackVariant("success")
                            setAlertMessage("Let's go! one step at a time. Now login.")
                        }).catch(error => {
                          setError(error.message);
                          if (error.code === "auth/email-already-in-use") {
                            setEmailError("Email already registered");
                            setEmailErrorState(true);
                            setError("Please enter another registered email");
          
                          }
          
                        });
                }
            })
        }
    
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
                <View style={styles.flexColumn}>

                    <View style={ styles.padXy}>
                        <Title style={{fontWeight:"bold"}}>Register your account</Title>
                    </View>
                    <TextInput
                        style={styles.textInput}
                        error={usernameErrorState}
                        onChangeText={usernameInput => setUsernameInput(usernameInput)}
                        value={usernameInput}
                        label="Username"
                        mode="outlined" />
                    <HelperText type="error" visible={usernameErrorState} style={{marginLeft:15}}>
                        {usernameError}
                    </HelperText>

                    <TextInput
                        style={styles.textInput}
                        error={emailErrorState}
                        onChangeText={emailInput => setEmailInput(emailInput)} 
                        value={emailInput} label="Email" mode="outlined" />
                    <HelperText type="error" visible={emailErrorState} style={{marginLeft:15}}>
                        {emailError}
                    </HelperText>

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
                    
                    <TextInput
                        style={styles.textInput}
                        error={passwordConfirmErrorState}
                        secureTextEntry 
                        onChangeText={passwordConfim => setPasswordConfirmInput(passwordConfim)}
                        value={passwordConfirmInput} 
                        label="Confirm password" mode="outlined" />
                    <HelperText type="error" visible={passwordConfirmErrorState} style={{marginLeft:15}}>
                        {passwordConfirmError}
                    </HelperText>
                    
                </View>
                <View style={styles.flexColumn, styles.btnContained, styles.padXy}>
                    <Button style={{ paddingVertical: 7, backgroundColor: "#960071", paddingHorizontal: 7, marginTop: 10 }}
                        mode="contained" onPress={saveData} >
                        Signup
                    </Button>
                </View>
          
        </View>
                <View style={styles.flexRow}>
                        <View style={styles.flexRow}>
                            <Text style={ styles.textCenter,  {fontSize: 18}}>Already have an account? </Text>
                        <Text 
                            style={styles.textCenter, { color: "#960071", fontWeight: "bold", fontSize: 18 }}
                            onPress={redirectToLogin}> Sign in</Text>
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
        paddingHorizontal: 15,
        marginVertical: 15,
        justifyContent: 'space-evenly',
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
        alignSelf: 'center',

    },
    btnContained: {
        width: '90%',
        alignSelf: 'center',
        backgroundColor: "#960071",
       
    }
});