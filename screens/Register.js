import React, {useState} from 'react'
import { View, StyleSheet, Text, SafeAreaView } from 'react-native'
import { TextInput,Button,Title  } from 'react-native-paper';

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

  const [error, setError] = useState('');
  const [showPasswordState, setShowPasswordState] = useState(false);
  
  function redirectToLogin() {
    navigation.navigate('Login')
  }

    return (
      <SafeAreaView style={styles.container}>
        <View>
                <View style={styles.flexColumn}>

                  <View style={ styles.padXy}>
                    <Title style={{fontWeight:"bold"}}>Register your account</Title>
                  </View>
                  <TextInput  style={styles.textInput} error={usernameErrorState} onChangeText={usernameInput => setUsernameInput(userNameInput)} value={usernameInput} label="Username" mode="outlined" />
                  <TextInput  style={styles.textInput} error={emailErrorState} onChangeText={emailInput => setEmailInput(emailInput)} value={emailInput} label="Email" mode="outlined" />
                  <TextInput style={styles.textInput} error={passwordErrorState} secureTextEntry  onChangeText={passwordError => setPasswordError(passwordError)} value={passwordError} label="Password" mode="outlined" right={<TextInput.Icon name="eye" />} />
                  <TextInput  style={styles.textInput} error={passwordConfirmErrorState} secureTextEntry onChangeText={passwordConfirmError => setPasswordConfirmError(passwordConfirmError)} value={passwordConfirmError} label="Confirm password" mode="outlined" right={<TextInput.Icon name="eye" />}/>
                </View>
                <View style={styles.flexColumn, styles.btnContained, styles.padXy}>
                    <Button style={{paddingVertical:7, backgroundColor: "#960071" , paddingHorizontal:7, marginTop:10}} mode="contained" >
                        Signup
                    </Button>
                </View>
          
          </View>
                <View style={styles.flexRow}>
                        <View style={styles.flexRow}>
                            <Text style={ styles.textCenter,  {fontSize: 18}}>Already have an account? </Text>
                        <Text style={styles.textCenter, {color: "#960071", fontWeight:"bold", fontSize: 18}} onPress={redirectToLogin}> Sign in</Text>
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
        marginVertical: 5

    },
    btnContained: {
        width: '90%',
        alignSelf: 'center',
        backgroundColor: "#960071",
       
    }
});