import React, {useState} from 'react'
import {View, StyleSheet, Text, SafeAreaView, ScrollView,Picker} from 'react-native'
import {Button,Title, Provider, Snackbar, TextInput, HelperText, IconButton,Switch } from 'react-native-paper';
import firebase from '../Firebase/firebase';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

export default function Services({route}) {
    const {key} = route.params
  
    const [snackBar, setSnackBar] = useState(false);
    const [visible, setVisible] = useState(false);
    const [snackMessage, setSnackMessage] = useState('')
    const [variant, setVariant] = useState('')
    const [service, setService] = useState("")
    const onDismissSnackBar = () => setVisible(false);
    const [requirementErrorState, setRequirementState] = useState(false);
    const [requirementError, setRequirementError] = useState("");
    const [requirementInput, setRequirementInput] = useState("");

    const [selectError, setSelectError] = useState("");
    const [selectErrorState, setSelectErrorState] = useState(false);

    const [serviceArray, setServiceArray] = useState();

    const [alertStatus, setAlertStatus] = useState(false);
    const [feedbackVariant, setFeedbackVariant] = useState("");
    const [alertMessage, setAlertMessage] = useState("");

    const [update, setUpdate] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const [openEditModal, setOpenEditModal] = useState(false);
    const [activeKey, setActiveKey] = useState("");
    const [activePost, setActivePost] = useState("");

    const [editRequirementState, setEditRequirementState] = useState(false);
    const [editRequirementError, setEditRequirementError] = useState("");
    const [editRequirementInput, setEditRequirementInput] = useState("");

    const [maxErrorState, setMaxErrorState] = useState(false);
    const [maxError, setMaxError] = useState("");
    const [maxCapacity, setMaxCapacity] = useState("");
    
    const [daysBeforeErrorAppointState, setDaysBeforeErrorAppointState] = useState(false);
    const [daysBeforeAppointError, setDaysBeforeAppointError] = useState("");
    const [daysBeforeAppoint, setDaysAppointBefore] = useState("");

    const [daysBeforeCancelErrorState, setDaysBeforeCancelErrorState] = useState(false);
    const [daysBeforeCancelError, setDaysBeforeCancelError] = useState("");
    const [daysBeforeCancel, setDaysBeforeCancel] = useState("");

    const [operationDaysFromErrorState, setOperationDaysFromErrorState] = useState(false);
    const [operationDaysFrom, setOperationDaysFrom] = useState("");
    const [operationDayFromError, setOperationDayFromError] = useState("");
    
    const [operationDaysToErrorState, setOperationDaysToErrorState] = useState(false);
    const [operationDaysTo, setOperationDaysTo] = useState("");
    const [operationDayToError, setOperationDayToError] = useState("");

    const [timeOpFromState, setTimeOpFromState] = useState(false);
    const [timeOpFrom, setTimeOpFrom] = useState("");
    const [timeOpFromError, setTimeOpFromError] = useState("");

    const [timeOpToState, setTimeOpToState] = useState(false);
    const [timeOpTo, setTimeOpto] = useState("");
    const [timeOpToError, setTimeOpToError] = useState("");
    const [enableConstraintBtn,setEnableConstraingtBtn] = useState(true);
    const [session, setSessions] = useState(0);

    const [sessionIntervalErrorState, setSessionIntervalErrorState] = useState(false);
    const [sessionInterval, setSessionInterval] = useState(0);
    const [sessionIntervalError, setSessionIntervalError] = useState("");
    const [switchSeat, setSwitchSeat] = useState(false);

    function registerSeatAdd(getter, setter) {
        setter(getter + 1);
    
    }
    function registerSeatMinus(getter, setter) {
        setUpdate(!update)
        if(getter > 0) {
                setter(getter - 1)
        }
    
        setUpdate(!update)
    }
    function serviceConstraints() {
    }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                    <Provider>
                    <View style={ styles.padXy}>
                        <Title style={{fontWeight:"bold", marginBottom: 10}}>Register church constraints</Title>
                        <Text style={{fontSize: 16, lineHeight: 25}}>Here you will activate your church's activities and fill them out with requirements. This action will stack up on the generated page.</Text>
                    </View>
                    
                    <View style={styles.padXy}>
                        {/* <Picker
                            selectedValue={service}
                            onValueChange={value => setService(value)}>
                            <Picker.Item label="Baptism" value="Baptism"/>
                        </Picker> */}
                        <Picker
                            selectedValue={service}
                            style={{ height: 50, width: '90%'}}
                            onValueChange={(itemValue, itemIndex) => setService(itemValue)}
                        >
                            <Picker.Item label="Select a Service" value="0" />
                            <Picker.Item label="Sunday Mass" value="Sunday Mass" />
                            <Picker.Item label="Baptism" value="Baptism" />
                            <Picker.Item label="Marriage" value="Marriage" />
                            <Picker.Item label="Compil" value="Compil" />
                            <Picker.Item label="House Blessing" value="House Blessing" />
                            <Picker.Item label="Car Blessing" value="Car Blessing" />
                            <Picker.Item label="Buria;" value="Burial" />
                        </Picker>
                    </View>
                    <View style={ styles.padX}>
                        <Text style={{fontWeight:"bold", marginBottom: 10}}>Max Capacity</Text>
                         <TextInput
                            error={maxErrorState}
                            style={styles.textInput}
                            label="Max Capacity"
                            value={maxError}
                            onChangeText={max => setMaxCapacity(max)}
                            mode = "outlined"
                        />
                        <HelperText type="error" visible={maxErrorState} style={{marginLeft:15}}>
                            {maxError}
                        </HelperText>
                    </View>
                    <View style={styles.flexRow}>

                    <View>
                        <View style={ styles.padX}>
                            <Text style={{fontWeight:"bold", marginBottom: 10}}>Operation days</Text>
                        </View>
                        <View style={styles.flexRow}> 
                            <View style={ styles.padX}>
                                <Picker
                                    selectedValue={operationDaysFrom}
                                    style={{ height: 50, width: '90%'}}
                                    onValueChange={(itemValue, itemIndex) => setOperationDaysFrom(itemIndex)}
                                >
                                    <Picker.Item label="Select a Day" value="0" />
                                    <Picker.Item label="Sunday" value="Sunday" />
                                    <Picker.Item label="Monday" value="Monday" />
                                    <Picker.Item label="Tuesday" value="Tuesday" />
                                    <Picker.Item label="Wednesday" value="Wednesday" />
                                    <Picker.Item label="Thrusday" value="Thrusday" />
                                    <Picker.Item label="Friday" value="Friday" />
                                    <Picker.Item label="Saturday;" value="Saturday" />
                                </Picker>
                                <HelperText type="error" visible={setOperationDaysFromErrorState} style={{marginLeft:15}}>
                                    {operationDayFromError}
                                </HelperText>
                            </View>
                            <View style={ styles.padX}>
                                <Picker
                                    selectedValue={operationDaysFrom}
                                    style={{ height: 50, width: '90%'}}
                                    onValueChange={(itemValue, itemIndex) => setOperationDaysFrom(itemValue)}
                                >
                                    <Picker.Item label="Select a Day" value="0" />
                                    <Picker.Item label="Sunday" value="Sunday" />
                                    <Picker.Item label="Monday" value="Monday" />
                                    <Picker.Item label="Tuesday" value="Tuesday" />
                                    <Picker.Item label="Wednesday" value="Wednesday" />
                                    <Picker.Item label="Thrusday" value="Thrusday" />
                                    <Picker.Item label="Friday" value="Friday" />
                                    <Picker.Item label="Saturday;" value="Saturday" />
                                </Picker>
                                <HelperText type="error" visible={setOperationDaysFromErrorState} style={{marginLeft:15}}>
                                    {operationDayFromError}
                                </HelperText>
                            </View>

                        </View>

                    </View>

                    {/* Time operations */}
                    <View>
                        <View style={ styles.padX}>
                            <Text style={{fontWeight:"bold", marginBottom: 10}}>Time operations</Text>
                        </View>
                        <View style={styles.flexRow}> 
                            <View style={ styles.padX}>
                                <Picker
                                    style= {styles.box}
                                    selectedValue={operationDaysFrom}
                                    style={{ height: 50, width: '90%'}}
                                    onValueChange={(itemValue, itemIndex) => setOperationDaysFrom(itemIndex)}
                                >
                                    <Picker.Item label="Select state" value="0" />
                                    <Picker.Item label="Minutes" value="Sunday" />
                                    <Picker.Item label="Hours" value="Monday" />
                                
                                </Picker>
                                <HelperText type="error" visible={setOperationDaysFromErrorState} style={{marginLeft:15}}>
                                    {operationDayFromError}
                                </HelperText>
                            </View>
                            <View style={ styles.padX}>
                                <Picker
                                    selectedValue={operationDaysFrom}
                                    style={{ height: 50, width: '90%'}}
                                    onValueChange={(itemValue, itemIndex) => setOperationDaysFrom(itemValue)}
                                >
                                    <Picker.Item label="Select a Day" value="0" />
                                    <Picker.Item label="Sunday" value="Sunday" />
                                    <Picker.Item label="Monday" value="Monday" />
                                    <Picker.Item label="Tuesday" value="Tuesday" />
                                    <Picker.Item label="Wednesday" value="Wednesday" />
                                    <Picker.Item label="Thrusday" value="Thrusday" />
                                    <Picker.Item label="Friday" value="Friday" />
                                    <Picker.Item label="Saturday;" value="Saturday" />
                                </Picker>
                                <HelperText type="error" visible={setOperationDaysFromErrorState} style={{marginLeft:15}}>
                                    {operationDayFromError}
                                </HelperText>
                            </View>
                        </View>
                    </View>
                    </View>
                    
                   
                    {/* Time operations */}
                    <View style={ styles.padX}>
                        <Text style={{fontWeight:"bold", marginBottom: 10}}>Session Intervals</Text>
                    </View>
                    <View style={styles.flexRow}> 
                        <View style={styles.padX}>
                            <View style={styles.flexRow}>
                                <IconButton icon="plus" onPress={() => { registerSeatAdd(sessionInterval, setSessionInterval) }}/>
                                    <Text style={{paddingHorizontal:15}}>{sessionInterval}</Text>
                                <IconButton icon="minus" onPress={() => { registerSeatMinus(sessionInterval, setSessionInterval) }}/>
                                
                            </View>
                          
                        </View>
                        <View style={ styles.padX}>
                            <Picker
                                selectedValue={operationDaysFrom}
                                style={{ height: 50, width: '90%'}}
                                onValueChange={(itemValue, itemIndex) => setOperationDaysFrom(itemValue)}
                            >
                                <Picker.Item label="Select a Day" value="0" />
                                <Picker.Item label="Sunday" value="Sunday" />
                                <Picker.Item label="Monday" value="Monday" />
                                <Picker.Item label="Tuesday" value="Tuesday" />
                                <Picker.Item label="Wednesday" value="Wednesday" />
                                <Picker.Item label="Thrusday" value="Thrusday" />
                                <Picker.Item label="Friday" value="Friday" />
                                <Picker.Item label="Saturday;" value="Saturday" />
                            </Picker>
                            <HelperText type="error" visible={setOperationDaysFromErrorState} style={{marginLeft:15}}>
                                {operationDayFromError}
                            </HelperText>
                        </View>
                    </View>

                    {/* Appoinment period  */}
                    <View style={styles.flexRow}>
                        <View>
                            <View style={ styles.padX}>
                                <Text style={{fontWeight:"bold", marginBottom: 10}}>Appointment Period(in days)</Text>
                            </View>
                            <View style={styles.flexRow}> 
                                <View style={ styles.padX}>
                                    <View style={styles.flexRow}>
                                        <IconButton icon="plus" onPress={() => { registerSeatAdd(daysBeforeAppoint, setDaysBeforeCancel) }}/>
                                            <Text style={{paddingHorizontal:15}}>{sessionInterval}</Text>
                                        <IconButton icon="minus" onPress={() => { registerSeatMinus(daysBeforeAppoint, setDaysBeforeCancel) }}/>
                                        
                                    </View>
                                    <HelperText type="error" visible={setOperationDaysFromErrorState} style={{marginLeft:15}}>
                                        {operationDayFromError}
                                    </HelperText>
                                </View>
                           
                            </View>

                        </View>

                    <View>
                        {/* cancellation periond */}
                        <View style={ styles.padX}>
                            <Text style={{fontWeight:"bold", marginBottom: 10}}>Cancellation Period(in days)</Text>
                        </View>
                        <View style={styles.flexRow}> 
                        
                            
                        <View style={ styles.padX}>
                            <View style={styles.flexRow}>
                                <IconButton icon="plus" onPress={() => { registerSeatAdd(daysBeforeCancel, setDaysBeforeCancel) }}/>
                                    <Text style={{paddingHorizontal:15}}>{sessionInterval}</Text>
                                <IconButton icon="minus" onPress={() => { registerSeatMinus(daysBeforeCancel, setDaysBeforeCancel) }}/>
                                
                            </View>
                            <HelperText type="error" visible={setOperationDaysFromErrorState} style={{marginLeft:15}}>
                                {operationDayFromError}
                            </HelperText>
                        </View>
            
                        </View>
                    
                    </View>

                    </View>
                    {/* seat switch */}
                    <View style={styles.padX, styles.flexRow}>
                        <View style={ styles.padX}>
                            <Text style={{fontWeight:"bold", marginBottom: 10}}>Seat Arrangement</Text>
                        </View>
                        <Switch value={switchSeat} onValueChange={() => { setSwitchSeat(!switchSeat) }} />
                    </View>


                    {/* button */}

                        <View style={styles.padXy}>
                                <Button style={{paddingVertical:7, backgroundColor: "#53369f" , paddingHorizontal:2, width: '100%'}} mode="contained" onPress={serviceConstraints}>
                                    Save changes
                                </Button>
                        </View>

                    <View style={{marginTop: 20, marginBottom:50}}>
                        {/* requirement  */}
                        <View style={{paddingHorizontal: 15, marginTop: 15}}>
                            <Text style={{fontWeight:"bold", marginBottom: 10}}>Requirements</Text>
                            <TextInput
                                error={requirementErrorState}
                                style={styles.textInput}
                                label="Enter requirement"
                                value={requirementInput}
                                onChangeText={req => setRequirementInput(req)}
                                mode = "outlined"
                            />
                            <HelperText type="error" visible={requirementErrorState} style={{marginLeft:15}}>
                                {requirementError}
                            </HelperText>
                        </View>
                        <View style={styles.padXy}>
                                <Button style={{paddingVertical:7, backgroundColor: "#960071" , paddingHorizontal:2, width: '100%'}} mode="contained" onPress={serviceConstraints}>
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
        flexDirection: "row",
        alignItems: 'center'
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
    box: {
        borderColor: '#000000',
        borderStyle: 'dashed',
        borderWidth: 1
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