import React, {useState} from 'react';
import { View, StyleSheet, Text, SafeAreaView } from 'react-native';
import { TextInput, Button, Title,HelperText, Snackbar} from 'react-native-paper';
import firebase from '../Firebase/firebase';

export default function ForgotPass({navigation}) {
    const [emailInput, setEmailInput] = useState('');
    const [emailError, setEmailError] = useState('');
    const [emailErrorState, setEmailErrorState] = useState(false);
    const [snackBar, setSnackBar] = useState(false);
    const [visible, setVisible] = useState(false);
    const [snackMessage, setSnackMessage] = useState('')
    const [variant, setVariant] = useState('')

    const onDismissSnackBar = () => setVisible(false);
    function sendEmail() {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

          if (!emailInput) {
            setEmailError("Please enter your Email.");
            setEmailErrorState(true);
            } else if (reg.test(emailInput) === false) {
                setEmailError("Please enter valid Email.");
                setEmailErrorState(true);
            } else {
                    setEmailErrorState(false);
                    firebase.auth().sendPasswordResetEmail(emailInput)
                    .then(() => {
                        setSnackBar(true);
                        setVisible(!visible)
                        setSnackMessage("Success! reset link has been sent to your email.")
                        setVariant("success")
                        
                    })
                    .catch((error) => {
                        setSnackBar(true);
                        setVisible(!visible)
                        setSnackMessage(error.message)
                        setVariant("error")
                    });
            }
            
    }
    
    return (
        <SafeAreaView style={styles.container}>
                <View style= {{marginTop:50}}>
                    <View style={styles.flexColumn}>
                        <View style={ styles.padXy}>
                            <Title style={{fontWeight:"bold"}}>Enter your registered email</Title>
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
                    </View>
                    <View style={styles.flexColumn, styles.btnContained, styles.padXy}>
                    <Button onPress={sendEmail} style={{paddingVertical:7, backgroundColor: "#53369f" , paddingHorizontal:7 }} mode="contained" >
                            Send password link
                    </Button>
                    </View>
                    
                </View>
                <View className={{justifyContent:"center" }}>
                    <Snackbar
                            duration = {3000}
                            style={variant === "success" ? styles.success: variant === "error" ?styles.error: styles.warning}
                            visible={visible}
                            onDismiss={onDismissSnackBar}
                            >
                        {snackMessage}
                    </Snackbar>
                    
                </View>
           
        </SafeAreaView>
        
    )
    
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        justifyContent: 'space-around',
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
       
    },
    success: {
        backgroundColor: "#2e7d32"

    }, error:{
        backgroundColor: "#d32f2f"

        
    }, warning: {
        backgroundColor: "#ed6c02"
        

    }
});