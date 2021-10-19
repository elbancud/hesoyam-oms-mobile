import React, {useState, useEffect} from 'react'
import {View, StyleSheet, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import {Button,Title, Provider, Snackbar,TextInput,HelperText, Card, IconButton, Portal, Modal, Avatar} from 'react-native-paper';
import firebase from 'firebase';
import { NavigationHelpersContext } from '@react-navigation/core';
import {auth} from '../Firebase/firebase'

export default function Announcement({ route, navigation }) {
    const containerStyle = {backgroundColor: 'white', padding: 20, width: '90%',  alignSelf:'center', borderRadius: 10};
    const {key} = route.params
    const [snackBar, setSnackBar] = useState(false);
    const [visible, setVisible] = useState(false);
    const [snackMessage, setSnackMessage] = useState('')
    const [variant, setVariant] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')

    const [openUsernameModal, setOpenUsernameModal] = useState(false);
    const [openEmailModal, setOpenEmailModal] = useState(false);
    const [openPasswordModal, setOpenPasswordModal] = useState(false);
    const [showPasswordState, setShowPasswordState] = useState(false);
    const [usernameError, setUsernameError] = useState('');
    const [usernameErrorState, setUsernameErrorState] = useState(false);
    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');

    const [passwordCurrentInput, setPasswordCurrentInput] = useState('');
    const [passwordCurrentError, setPasswordCurrentError] = useState('');
    const [passwordCurrentErrorState, setPasswordCurrentErrorState] = useState(false);

    const [passwordError, setPasswordError] = useState('');
    const [passwordErrorState, setPasswordErrorState] = useState(false);

    const [passwordConfirmInput, setPasswordConfirmInput] = useState('');
    const [passwordConfirmError, setPasswordConfirmError] = useState('');
    const [passwordConfirmErrorState, setPasswordConfirmErrorState] = useState(false);

    const [emailInput, setEmailInput] = useState('');
    const [emailError, setEmailError] = useState('');
    const [emailErrorState, setEmailErrorState] = useState(false);

   

    const [activeKey, setActiveKey] = useState("");
    const [activePost, setActivePost] = useState("");
    const [activeDescription, setActiveDescription] = useState("");

    const onDismissSnackBar = () => setVisible(false);
    const hideModal = () => {
        setOpenEmailModal(false)
        setOpenPasswordModal(false)
        setOpenUsernameModal(false)

    };
    const openUsername = () => setOpenUsernameModal(true);
    const openEmail = () => setOpenEmailModal(true);
    const openPassword = () => setOpenPasswordModal(true);

    const [update, setUpdate] = useState(false);
    const [announcementArray, setAnnouncementArray] = useState();

    useEffect(() => {
        const dbRef = firebase.database().ref("account-details/" +key);
        dbRef.once("value")
            .then(function (snapshot) {
                setUsername(snapshot.val().username)
                setEmail(snapshot.val().email)
            });
    }, [update])
        function signOut() {
            firebase.auth().signOut().then(() => {
                navigation.navigate('Login')
            
            })
        }
        function handleChangeUsername() {
        const dbRef = firebase.database().ref("account-details");
        if (!usernameInput ) {
            setUsernameError("Please enter your Username");
            setUsernameErrorState(true);
        }else if (usernameInput.length < 8) {
            setUsernameError("Username must be minimum of 8 characters");
            setUsernameErrorState(true);
        }else {
            setUsernameError("");
            setUsernameErrorState(false);
        }
        if (!passwordInput) {
            setPasswordError("Please enter your Password");
            setPasswordErrorState(true);
        } else {
            setPasswordError("");
            setPasswordErrorState(false);
             auth.signInWithEmailAndPassword(email, passwordInput)
                 .then(user => {
                  dbRef.orderByChild('username').equalTo(usernameInput).once('value').then(snapshot => {
                    if (snapshot.exists()) {
                        setUsernameErrorState(true);
                        setUsernameError("Username already taken");
                    } else {
                        const dbRef = firebase.database().ref("account-details/" + key);
                            dbRef.update({ username: usernameInput });
                            setOpenUsernameModal(false);
                            setUsernameInput("");
                            setPasswordInput("");
                            setPasswordErrorState(false);
                        
                            setSnackBar(true);
                            setVisible(!visible)
                            setSnackMessage("Hey there chief! username updated.")
                            setVariant("success")
                           
                    }   
                });    
            }).catch(error => {
                setPasswordError("Invalid password");
                setPasswordErrorState(true);
            })
        }
        
      
    }
    function handleEmailReset(e) {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            
        if (!emailInput) {
            setEmailError("Please enter your Email");
            setEmailErrorState(true);

        } else if (reg.test(emailInput) === false) {
            setEmailError("Please enter a valid email");
            setEmailErrorState(true);
        } else if (emailInput === email) {
            setEmailError("Please choose a different email from your current one");
            setEmailErrorState(true);
        }
        if (!passwordInput) {
            setPasswordError("Please enter your password");
            setPasswordErrorState(true);
        } else {
            setPasswordError("");
            setPasswordErrorState(false);
            auth.signInWithEmailAndPassword(email, passwordInput)
            .then(user => {
                const dbRef = firebase.database().ref("account-details");
                dbRef.orderByChild('email').equalTo(emailInput).once('value').then(snapshot => {
                    if (snapshot.exists()) {
                        setEmailError("Email already exists");
                        setEmailErrorState(true);

                    } else {
                        firebase.auth().currentUser.updateEmail(emailInput).then(() => {
                            setEmailErrorState(false);

                            const dbRefSpecific = firebase.database().ref("account-details/" + key);
                            dbRefSpecific.update({ email: emailInput });

                            setOpenEmailModal(false);
                            setUsernameInput("");
                            setPasswordInput("");
                            setPasswordErrorState(false);
                            setAlertStatus(true)

                            setFeedbackVariant("success")
                            setAlertMessage("Great job chief! Email updated.")
                        }).catch(error => {
                                
                                            setSnackBar(true);
                                            setVisible(!visible)
                                            setSnackMessage(error)
                                            setVariant("error")
                            })
                    }
                })
                            setPasswordError("");
                            setPasswordErrorState(false);
            }).catch(error => {
                setPasswordError("Incorrect password");
                setPasswordErrorState(true);
                             setSnackBar(true);
                            setVisible(!visible)
                            setSnackMessage(error)
                            setVariant("error")
            })
      }
    }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Provider>
                    <View  style={{flex:1, justifyContent:'space-between'}}>
                            <View style={{marginVertical: 30}}>
                                {/* <View style={ styles.padXy}>
                                    <Title style={{fontWeight:"bold", marginBottom: 10}}>Account settings</Title>
                                    <Text style={{fontSize: 16, lineHeight: 25}}>Here you could edit, remove, and add events and announcements if you please.</Text>
                                </View> */}
                            <View style={{padding:15}}>
                                    <Text style={{fontSize: 12, lineHeight: 25, color:"gray"}}>Account details</Text>
                            </View>
                            <View style={styles.padX}>
                                <TouchableOpacity onPress={openUsername}>
                                    <View style={styles.spaceBetween } >
                                        <View style={styles.flexRow}>
                                            <Avatar.Icon icon="account" size={35} style={{marginRight:20, backgroundColor:"blue"}}/>
                                            <View>
                                                <Title style={styles.title}>Update username</Title>
                                                <Text style={styles.subtitle}>{username}</Text>
                                            </View>

                                        </View>
                                        {/* <View>
                                            <IconButton icon="forward" color="gray"/>
                                            
                                        </View> */}
                                    </View>

                                </TouchableOpacity>
                                <TouchableOpacity onPress={openEmail}>
                                    <View style={styles.spaceBetween }>
                                        <View style={styles.flexRow}>
                                            <Avatar.Icon icon="email"  size={35} style={{marginRight:20, backgroundColor:"red"}}/>

                                            <View>
                                                <Title style={styles.title}>Update email</Title>
                                                <Text style={styles.subtitle}>{email}</Text>
                                            </View>

                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={openPassword}>
                                
                                <View style={{paddingVertical:15}}>
                                    <Text style={{fontSize: 12, lineHeight: 25, color:"gray"}}>Security</Text>
                                </View>
                                <View style={ styles.spaceBetween}>
                                    <View style={styles.flexRow}>
                                        <Avatar.Icon icon="lock" size={35} style={{marginRight:20, backgroundColor:"green"}}/>
                                        <View>
                                            <Title style={styles.title}>Change password</Title>
                                        </View>

                                    </View>
                                </View>
                                </TouchableOpacity>
                                
                            </View>
                                
                    </View>
                    <View style={{paddingHorizontal: 15}}>
                            <Button icon = "forward" style={{paddingVertical:7, backgroundColor: "#960071" , paddingHorizontal:2, width: '100%'}} mode="contained" onPress={signOut}>
                                Logout
                            </Button>
                    </View>
                    </View>
                    
                </Provider>

            </ScrollView>
               <View className={{justifyContent:"center", marginBottom: 50 }}>
                            <Snackbar
                                    duration = {2500}
                                    style={variant === "success" ? styles.success: variant === "error" ?styles.error: styles.warning}
                                    visible={visible}
                                    onDismiss={onDismissSnackBar}
                                    >
                                {snackMessage}
                            </Snackbar>
                            
            </View>
            <Provider>
                <Portal>
                            <Modal visible={openUsernameModal} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                                <View style={{alignItems:'center', paddingVertical:15}}>
                                    <Text style={{fontSize: 20, fontWeight:'bold'}}>Update your username?</Text>
                                    <Text>Enter your desired username and current password</Text>
                                </View>

                                <View style={styles.padX}>
                                    <TextInput
                                        error={usernameErrorState}
                                        style={styles.textInput,{backgroundColor:"#ffffff"}}
                                        label="Username"
                                        value={usernameInput}
                                        onChangeText={user => setUsernameInput(user)}
                                        mode = "outlined"
                                    />
                                    <HelperText type="error" visible={usernameErrorState} style={{marginLeft:15}}>
                                        {usernameError}
                                    </HelperText>
                                    <TextInput
                                        error={passwordErrorState}
                                        style={styles.textInput}
                                        label="Password"
                                        value={passwordInput}
                                        onChangeText={pass => setPasswordInput(pass)}
                                        mode = "outlined"
                                    />
                                    <HelperText type="error" visible={passwordErrorState} style={{marginLeft:15}}>
                                        {passwordError}
                                    </HelperText>
                                    <View >
                                        <Button style={{paddingVertical:7, backgroundColor: "#53369f" , paddingHorizontal:2, width: '100%'}} mode="contained" onPress={handleChangeUsername}>
                                            save changes
                                        </Button>
                                    </View>
                                </View>
                            </Modal>
                        </Portal>
                        
            </Provider>
            <Provider>
                <Portal>
                            <Modal visible={openEmailModal} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                                <View style={{alignItems:'center', paddingVertical:15}}>
                                    <Text style={{fontSize: 20, fontWeight:'bold'}}>Update your email?</Text>
                                    <Text>Enter your desired email and current password</Text>
                                </View>

                                <View style={styles.padX}>
                                    <TextInput
                                        error={emailErrorState}
                                        style={styles.textInput,{backgroundColor:"#ffffff"}}
                                        label="New Email"
                                        value={emailInput}
                                        onChangeText={email => setEmailInput(email)}
                                        mode = "outlined"
                                    />
                                    <HelperText type="error" visible={emailErrorState} style={{marginLeft:15}}>
                                        {emailError}
                                    </HelperText>
                                    <TextInput
                                        error={passwordErrorState}
                                        style={styles.textInput}
                                        label="Password"
                                        value={passwordInput}
                                        onChangeText={pass => setPasswordInput(pass)}
                                        mode = "outlined"
                                    />
                                    <HelperText type="error" visible={passwordErrorState} style={{marginLeft:15}}>
                                        {passwordError}
                                    </HelperText>
                                    <View >
                                        <Button style={{paddingVertical:7, backgroundColor: "#53369f" , paddingHorizontal:2, width: '100%'}} mode="contained" onPress={handleEmailReset}>
                                            save changes
                                        </Button>
                                    </View>
                                </View>
                            </Modal>
                        </Portal>
                        
            </Provider>
           <Provider>
                <Portal>
                            <Modal visible={openPasswordModal} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                                <View style={{alignItems:'center', paddingVertical:15}}>
                                    <Text style={{fontSize: 20, fontWeight:'bold'}}>Change your password?</Text>
                                    <Text>Enter your desired password and current password</Text>
                                </View>

                                <View style={styles.padX}>
                                    <TextInput
                                        error={passwordCurrentErrorState}
                                        style={styles.textInput,{backgroundColor:"#ffffff"}}
                                        label="Current password"
                                        value={passwordCurrentInput}
                                        onChangeText={pass => setPasswordCurrentInput(pass)}
                                        mode = "outlined"
                                    />
                                    <HelperText type="error" visible={passwordCurrentErrorState} style={{marginLeft:15}}>
                                        {passwordCurrentError}
                                    </HelperText>
                                   
                                    <TextInput
                                        error={passwordErrorState}
                                        style={styles.textInput}
                                        label="Password"
                                        value={passwordInput}
                                        onChangeText={pass => setPasswordInput(pass)}
                                        mode = "outlined"
                                    />
                                    <HelperText type="error" visible={passwordErrorState} style={{marginLeft:15}}>
                                        {passwordError}
                                    </HelperText>
                                    
                                    <TextInput
                                        error={passwordConfirmErrorState}
                                        style={styles.textInput}
                                        label="Confirm Password"
                                        value={passwordConfirmInput}
                                        onChangeText={pass => setPasswordConfirmInput(pass)}
                                        mode = "outlined"
                                    />
                                    <HelperText type="error" visible={passwordConfirmErrorState} style={{marginLeft:15}}>
                                        {passwordConfirmError}
                            </HelperText>
                            
                                    <View >
                                        <Button style={{paddingVertical:7, backgroundColor: "#53369f" , paddingHorizontal:2, width: '100%'}} mode="contained" >
                                            save changes
                                        </Button>
                                    </View>
                                </View>
                            </Modal>
                        </Portal>
                        
            </Provider>
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
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    spaceBetweenCol: {
        flex: 1,
        justifyContent: 'space-evenly',
    },
    title: {
        fontSize: 16,
        color: "#1b1c1e",
    },
    subtitle: {
        fontSize: 12,
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
        flex: 1,
        flexDirection: "row",
        marginBottom: 25,
        alignItems:'center'
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