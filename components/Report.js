import React, {useState} from 'react'
import {View, StyleSheet, Text, SafeAreaView, ScrollView} from 'react-native'
import {Button,Title, Provider, Snackbar,RadioButton,TextInput,HelperText} from 'react-native-paper';
import firebase from 'firebase';
const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

export default function Report({route}) {
    const {key} = route.params
    const [snackBar, setSnackBar] = useState(false);
    const [visible, setVisible] = useState(false);
    const [snackMessage, setSnackMessage] = useState('')
    const [variant, setVariant] = useState('')
    const [checked, setChecked] = useState('first');
    const [summaryInput, setSummaryInput] = useState("");
    const [descriptionInput, setDescriptionInput] = useState("");
      const [value, setValue] = useState('1');

    const [summaryInputError, setSummaryInputError] = useState("");
    const [descriptionInputError, setDescriptionInputError] = useState("");

    const [summaryInputErrorState, setSummaryInputErrorState] = useState(false);
    const [descriptionInputErrorState, setDescriptionInputErrorState] = useState(false);

    const onDismissSnackBar = () => setVisible(false);

    function submitReport() {
        if (!summaryInput) {
            setSummaryInputError("Please enter summary")
            setSummaryInputErrorState(true)
        } else if (summaryInput.length < 8) {
            setSummaryInputError("Input atleast a phrase. Ideally 2-3 words")
            setSummaryInputErrorState(true)
         }
        else {
            setSummaryInputError("")
            setSummaryInputErrorState(false)
        } if (!descriptionInput) {
            setDescriptionInputError("Please enter summary")
            setDescriptionInputErrorState(true)
        }else if (descriptionInput.length < 8) {
            setDescriptionInputError("Please enter a full description about the bug")
            setDescriptionInputErrorState(true)
        } else {
            setDescriptionInputError("")
            setDescriptionInputErrorState(false)
        }
        if (summaryInput.length > 8 && descriptionInput.length > 8) {
            const dbRef = firebase.database().ref("reports");
            
            const reportContent = {
                urgency: value === 1? "This is preventing me from using The app. There is no workaround.": value=== "2"?"This is a major bug in the app, but there is a workaround.":"This is a minor bug." ,
                summary: summaryInput,
                description: descriptionInput
            }
            dbRef.push(reportContent).then(() => {
             
                        setSnackBar(true);
                        setVisible(!visible)
                        setSnackMessage("Hang in there chief, we'll get this sorted out.")
                        setVariant("success")
                setDescriptionInputError("")
                setDescriptionInputErrorState(false)
                setSummaryInputError("")
                setSummaryInputErrorState(false)
                setSummaryInput('')
                setDescriptionInput('')

            }
            )
            
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                    <Provider>
                    <View style={ styles.padXy}>
                        <Title style={{fontWeight:"bold", marginBottom: 10}}>Let us know your issues in the system</Title>
                        <Text style={{fontSize: 16, lineHeight: 25}}>Ofcourse, there's no perfect system. Here, we genuinely appreciate your feedbacks and reports and we will cater it as much as we can.</Text>
                    </View>
                    <View style={styles.padXy}>
                        <View>
                            <Text style={{fontWeight:"bold"}}>Urgency</Text>
                            <RadioButton.Group onValueChange={value => setValue(value)} value={value}>
                                <RadioButton.Item label="This is preventing me from using The app. There is no workaround." value="1" />
                                <RadioButton.Item label="This is a major bug in the app, but there is a workaround." value="2" />
                                <RadioButton.Item label="This is a minor bug." value="3" />
                            </RadioButton.Group>
                        </View>
                      
                    </View>
                    <View style={styles.padX}>
                        <TextInput
                            error={summaryInputErrorState}
                            style={styles.textInput}
                            label="Summary"
                            value={summaryInput}
                            onChangeText={report => setSummaryInput(report)}
                            mode = "outlined"
                        />
                        <HelperText type="error" visible={summaryInputErrorState} style={{marginLeft:15}}>
                            {summaryInputError}
                        </HelperText>
                        <TextInput
                            error={descriptionInputErrorState}
                            style={styles.textInput, {height: 150, backgroundColor:"#ffffff"}}
                            label="Description"
                            value={descriptionInput}
                            onChangeText={desc => setDescriptionInput(desc)}
                            mode = "outlined"
                        />
                        <HelperText type="error" visible={descriptionInputErrorState} style={{marginLeft:15}}>
                            {descriptionInputError}
                        </HelperText>
                        <View >
                            <Button style={{paddingVertical:7, backgroundColor: "#53369f" , paddingHorizontal:15, width: '100%'}} mode="contained" onPress={submitReport}>
                                Submit
                            </Button>
                        </View>
                    </View>
                    </Provider>
            </ScrollView>
                <View className={{justifyContent:"center" }}>
                    <Snackbar
                            duration = {2500}
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
        

    }
});