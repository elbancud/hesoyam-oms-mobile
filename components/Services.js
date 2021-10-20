import React, {useState,useEffect} from 'react'
import {View, StyleSheet, Text, SafeAreaView, ScrollView,Picker} from 'react-native'
import {Button,Title, Provider, Snackbar,TextInput,HelperText, Card, IconButton, Portal, Modal, Switch} from 'react-native-paper';

import firebase from '../Firebase/firebase';

import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function Services({route}) {
    const {key} = route.params
  
    const [snackBar, setSnackBar] = useState(false);
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
    const containerStyle = {backgroundColor: 'white', padding: 20, width: '90%',  alignSelf:'center', borderRadius: 10};


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
    const [sessionInterval, setSessionInterval] = useState('');
    const [sessionIntervalError, setSessionIntervalError] = useState("");
    const [switchSeat, setSwitchSeat] = useState(false);

    const [sessionIntervalErrorStateSelect, setSessionIntervalErrorStateSelect] = useState(false);
    const [sessionIntervalErrorSelect, setSessionIntervalErrorSelect] = useState("");

    const [selectedHours, setSelectedHours] = useState(0);
    const [selectedMinutes, setSelectedMinutes] = useState(0);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isDateTo, setIsdateTo] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
     const showDatePicker1 = () => {
        setIsdateTo(true);
        
     };
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
        setIsdateTo(false);
    };

    const handleConfirm = (date) => {
        const time = date.getHours() + ":"+ date.getMinutes()
        setTimeOpFrom(time)
        hideDatePicker();
    };
    const handleConfirm1 = (date) => {
        const time = date.getHours() + ":"+ date.getMinutes()
        setTimeOpto(time)
        hideDatePicker();
    };
    const hideDatePicker1 = () => {
        setIsdateTo(false);
    };

    function registerSeatAdd(getter, setter) {
        setter(getter + 1);
    
    }
    function registerSeatMinus(getter, setter) {
        if(getter > 0) {
                setter(getter - 1)
        }
    
    }
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
   
      const [visible, setVisible] = React.useState(false)
        const onDismiss = React.useCallback(() => {
            setVisible(false)
        }, [setVisible])

        const onConfirm = React.useCallback(
            ({ hours, minutes }) => {
            setVisible(false);
            console.log({ hours, minutes });
            },
            [setVisible]
    );
    const hideModal = () => {
        setUpdate(!update);
        setOpenEditModal(false);
    }
     const handleCloseModal = () => {
        setOpenEditModal(false)
        setUpdate(!update);

    }
    function handleOpenModalEdit(title, key) {
        setUpdate(!update);
        setOpenEditModal(true);
        setEditRequirementInput(title);
        setActivePost(title);
        setActiveKey(key);
    }
    function handleOpenDeleteModal(title, key) {
        setOpenDeleteModal(true);
        setActivePost(title);
        setActiveKey(key);

    }
    function handleCLoseDeleteModal() {
        setOpenDeleteModal(false)
    }
    function serviceConstraints() {
        if (service === "0") {
            setSelectErrorState(true)
            setSelectError("Select a church service");
                        setSnackBar(true);
                        setVisible(!visible)
                        setVariant("error")
                        setSnackMessage("Oopsies, please clear out the errors")
                        
        } else {
            setSelectErrorState(false)
            setSelectError("");
        }
         if (!maxCapacity) {
            setMaxErrorState(true)
            setMaxError("Please enter max capacity")
             setEnableConstraingtBtn(false)
             
        } else if (isNaN(parseInt(maxCapacity,10))) {
            setMaxErrorState(true)
            setMaxError("Please enter Numbers only")
            setEnableConstraingtBtn(false)
                        setSnackBar(true);
                        setVisible(!visible)
                        setVariant("error")
                        setSnackMessage("Oopsies, please clear out the errors")
                        
         } else if (parseInt(maxCapacity, 10) < 0) {
            setMaxErrorState(true)
            setMaxError("Please enter Positive numbers only")
            setEnableConstraingtBtn(false)
                        setSnackBar(true);
                        setVisible(!visible)
                        setVariant("error")
                        setSnackMessage("Oopsies, please clear out the errors")
                        
        }
        else {
            setMaxErrorState(false)
            setMaxError("")
            setEnableConstraingtBtn(true)
            
        }
        if (operationDaysFrom === "8") {
            setOperationDaysFromErrorState(true)
            setOperationDayFromError("Please select starting date")
            setEnableConstraingtBtn(false)
                        setSnackBar(true);
                        setVisible(!visible)
                        setVariant("error")
                        setSnackMessage("Oopsies, please clear out the errors")
                        

        } else {
            setOperationDaysFromErrorState(false)
            setOperationDayFromError("")
            setEnableConstraingtBtn(true)
        }
        if (operationDaysTo === "8") {
            setOperationDaysToErrorState(true)
            setOperationDayToError("Please select an ending date")
            setEnableConstraingtBtn(false)
                        setSnackBar(true);
                        setVisible(!visible)
                        setVariant("error")
                        setSnackMessage("Oopsies, please clear out the errors")
                        

        } else {
            setOperationDaysToErrorState(false)
            setOperationDayToError("")
            setEnableConstraingtBtn(true)

        }
        if (operationDaysFrom === "8") {
            setOperationDaysFromErrorState(true)
            setOperationDayFromError("Please select starting date")
                        setSnackBar(true);
                        setEnableConstraingtBtn(false)
                        setVisible(!visible)
                        setVariant("error")
                        setSnackMessage("Oopsies, please clear out the errors")
                        

        } else {
            setOperationDaysFromErrorState(false)
            setOperationDayFromError("")
            setEnableConstraingtBtn(true)

        }
        if (!timeOpFrom) {
            setTimeOpFromState(true)
            setTimeOpFromError("Select opening hours")
                        setSnackBar(true);
                        setEnableConstraingtBtn(false)
                        setVisible(!visible)
                        setVariant("error")
                        setSnackMessage("Oopsies, please clear out the errors")
                        

        } else {
            setTimeOpFromState(false)
            setTimeOpFromError("")
            setEnableConstraingtBtn(true)

        }
        if (!timeOpTo) {
            setTimeOpToState(true)
            setTimeOpToError("Please select closing hours")
            setEnableConstraingtBtn(false)
                        setSnackBar(true);
                        setVisible(!visible)
                        setVariant("error")
                        setSnackMessage("Oopsies, please clear out the errors")
                        

        } else {
            setTimeOpToState(false)
            setTimeOpToError("")
            setEnableConstraingtBtn(true)

        }
        if (isNaN(parseInt(daysBeforeAppoint, 10))) {
            setDaysBeforeAppointError("Please input numbers only")
            setDaysBeforeErrorAppointState(true)
        } else if (parseInt(daysBeforeAppoint, 10) < 0) {
            setDaysBeforeAppointError("Please input positive numbers only")
            setDaysBeforeErrorAppointState(true)
        } else {
            setDaysBeforeCancelError("")
            setDaysBeforeErrorAppointState(false)
        }
        if (isNaN(parseInt(daysBeforeCancel, 10))) {
            setDaysBeforeCancelError("Please input numbers only")
            setDaysBeforeCancelErrorState(true)
        } else if (parseInt(daysBeforeCancel, 10) < 0) {
            setDaysBeforeCancelError("Please input numbers only")
            setDaysBeforeCancelErrorState(true)
        } else {
            setDaysBeforeCancelError("")
            setDaysBeforeCancelErrorState(false)
  
        }
        if (session === 0) {
            setSessionIntervalErrorState(true)
            setSessionIntervalError("Please increase value")
                        setSnackBar(true);
                        setSnackBar(true);
                        setVisible(!visible)
                        setVariant("error")
                        setSnackMessage("Oopsies, please clear out the errors")
                        
        }else {
               setSessionIntervalErrorState(false)
               setSessionIntervalError("")
        }
        if (sessionInterval === "0") {
            setSessionIntervalErrorStateSelect(true)
            setSessionIntervalErrorSelect("Select session intervals")
                        setSnackBar(true);
                        setVisible(!visible)
                        setVariant("error")
                        setSnackMessage("Oopsies, please clear out the errors")
        } else {
               setSessionIntervalErrorStateSelect(false)
               setSessionIntervalErrorSelect("")
        }
        if ( operationDaysFrom !== "8" && service !== "0" && sessionInterval !== "0" && !isNaN(parseInt(daysBeforeAppoint, 10)) && !session !== 0 && service && maxCapacity &&  !isNaN(parseInt(daysBeforeCancel, 10))  && operationDaysFrom !== "8"  && timeOpFrom && operationDaysFrom && maxCapacity && !isNaN(parseInt(maxCapacity,10)))  {
            const dbRef = firebase.database().ref("services/" + service);
            const serviceConstraints = {
                maxCapacity: maxCapacity,
                operationDaysStart: operationDaysFrom,
                operationDaysEnd: operationDaysTo,
                timeOperationStart: timeOpFrom,
                timeOperationEnd: timeOpTo,
                daysBeforeAppointment: daysBeforeAppoint,
                daysBeforeCancel: daysBeforeCancel,
                sessionIntervalNum: session,
                sessionState: sessionInterval,
                seatArrangement: switchSeat
            }
            dbRef.update(serviceConstraints).then(() => {
                         setSnackBar(true);
                        setVisible(!visible)
                        setVariant("success")
                        setSnackMessage("Success! service constraints updated")
                
            })
            const event = firebase.database().ref("events")
            event.update({event:"event"})
        }
    }
        useEffect(() => {
        
            if (service) {
                const dbRef = firebase.database().ref("services/" + service);
                    dbRef.once("value").then(function (snapshot) {
                        const snap = snapshot.val();
                        const serviceArray = [];
                        for (let id in snap) {
                            serviceArray.push({ id, ...snap[id] });
                                    setMaxCapacity(snap.maxCapacity? snap.maxCapacity :"")
                                    setOperationDaysFrom(snap.operationDaysStart? snap.operationDaysStart: "")
                                    setOperationDaysTo(snap.operationDaysEnd? snap.operationDaysEnd: "")
                                    setTimeOpFrom(snap.timeOperationStart? snap.timeOperationStart: "")
                                    setTimeOpto(snap.timeOperationEnd? snap.timeOperationEnd: "")
                                    setDaysAppointBefore(snap.daysBeforeAppointment?snap.daysBeforeAppointment: "")
                                    setDaysBeforeCancel(snap.daysBeforeCancel?snap.daysBeforeCancel:"")
                                    setSwitchSeat(snap.seatArrangement ? snap.daysBeforeCancel : false)
                                    setSessions(snap.sessionIntervalNum?parseInt(snap.daysBeforeCancel,10):"0")
                                    setSessionInterval(snap.sessionState?snap.sessionState :"0")
                        }
                        setServiceArray(serviceArray)
                    })
            }
        }, [update])
        const pushState = () => {
            const dbRef = firebase.database().ref("services/" + service);
                                const requirementPush = {
                                    requirement: requirementInput.toLowerCase(),
                                }
                                dbRef.push(requirementPush).then(() => {
                                                    setSnackBar(true);
                                                    setVisible(!visible)
                                                    setVariant("success")
                                                    setSnackMessage("Great! New requirement in " + service + " added")
                                                    setRequirementInput('');
                                                })
        }                                                       
        const saveServiceRequirement = () => {

            if (requirementInput.length < 3) {
                setRequirementState(true)
                setRequirementError("Please input a phrase. 2 to 3 words")
            } else {
                setRequirementState(false)
                setRequirementError("")
            }
            if (!service) {
                setSelectErrorState(true)
                setSelectError("Select a church service");
            } else {
                setSelectErrorState(false)
                setSelectError("");
                if (requirementErrorState === false && selectErrorState === false && requirementInput.length > 3 && service !== "") {
                
                    //push if no errorrs
                        const dbAccountDetails = firebase.database().ref("services") 
                    
                        dbAccountDetails.orderByKey().equalTo(service).once('value').then(snapshot => { 
                            if (snapshot.exists()) {
                                const dbRef = firebase.database().ref("services/" + service);
                                
                                dbRef.orderByChild('requirement').equalTo(requirementInput.toLowerCase()).once('value').then(snapshot => {
                                    if (snapshot.exists()) {
                                                    setSnackBar(true);
                                                    setVisible(!visible)
                                                    setVariant("error")
                                                    setSnackMessage("Requirement already exist. Please enter a new one in the text field.")
                                                    setRequirementState(true)
                                                    setRequirementError("Requirement already exists. Try a new one.")
                                        return true
                                    } else {
                                        setUpdate(!update);
                                        
                                        pushState();
                                    }
                            
                                })
                            } else {
                                setUpdate(!update);
                                pushState();

                            }
                        });
                }
            }
      
    }
    function serviceChange(item) {
                setSelectErrorState(false)
                setSelectError("");
                setUpdate(!update);
                setMaxCapacity("")
                setOperationDaysFrom()
                setOperationDaysTo()
                setTimeOpFrom()
                setTimeOpto()
                setDaysAppointBefore()
                setDaysBeforeCancel()
                setService(item)
    }
        function handleEdit() {
            if (editRequirementInput.length < 3) {
                setSnackBar(true);
                setVisible(!visible)
                setVariant("error")
                setSnackMessage("Ooops! Seems like you are forgetting to fill all the entries with proper phrases.")             
                
                
                setEditRequirementState(true)
                setEditRequirementError("Please input a phrase. 2 to 3 words")
        } else {
                setEditRequirementState(false)
                setEditRequirementError("")
                if (editRequirementInput === activePost) {
                    setSnackBar(true);
                    setVisible(!visible)
                    setVariant("error")
                    setSnackMessage("Oops you don't seem to change anything, kindly check it again. Thankyou")             

                   
                    setEditRequirementState(true)
                    setEditRequirementError("No changes found")
                
            } else {
                    const dbAccountDetails = firebase.database().ref("services") 
                     dbAccountDetails.orderByKey().equalTo(service).once('value').then(snapshot => { 
                        if (snapshot.exists()) {
                            const dbRef = firebase.database().ref("services/" + service);
                            
                            dbRef.orderByChild('requirement').equalTo(editRequirementInput.toLowerCase()).once('value').then(snapshot => {
                                if (snapshot.exists()) {
                                        setEditRequirementState(true)
                                        setEditRequirementError("Please try a new one.")
                                        setSnackBar(true);
                                        setVisible(!visible)
                                        setVariant("error")
                                        setSnackMessage("Requirement already exist. Please enter a new one in the text field.") 
                                    return true

                                } else {
                                    // setUpdate(!update);
                                      const dbRef = firebase.database().ref("services/" + service + "/" +activeKey);
                                            
                                                dbRef.update({requirement:editRequirementInput}).then(()=>{
                                                    setSnackBar(true);
                                                    setVisible(!visible)
                                                    setVariant("success")
                                                    setSnackMessage("Success! " + activePost + " post updated") 
                                                    
                                                })
                                    setOpenEditModal(false)
                                    return setUpdate(!update);
                                }
                           
                             })
                        }
                     });
                
                       
                
            }
        }
       
    }
    function handleDelete(title) {
        const dbRef = firebase.database().ref("services/" + service).child(activeKey);
        dbRef.remove().then(() => {
            setSnackBar(true);
            setVisible(!visible)
            setVariant("success")
            setSnackMessage("Success! " + activePost + " post deleted") 
            setUpdate(!update);
            setOpenDeleteModal(false)
        })
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
                 
                        <Picker
                            selectedValue={service}
                            style={{ height: 50, width: '90%'}}
                            onValueChange={(itemValue, itemIndex) => { serviceChange(itemValue), setUpdate(!update)}}
                        >
                            <Picker.Item label="Select a Service" value="0" />
                            <Picker.Item label="Sunday Mass" value="Sunday Mass" />
                            <Picker.Item label="Baptism" value="Baptism" />
                            <Picker.Item label="Marriage" value="Marriage" />
                            <Picker.Item label="Compil" value="Compil" />
                            <Picker.Item label="House Blessing" value="House Blessing" />
                            <Picker.Item label="Car Blessing" value="Car Blessing" />
                            <Picker.Item label="Burial" value="Burial" />
                        </Picker>
                        <HelperText type="error" visible={selectErrorState} >
                            {selectError}
                        </HelperText>
                    </View>
                   
                    <View style={{paddingHorizontal: 15, marginBottom: 20}}>
                        <Text style={{fontWeight:"bold", marginBottom: 10}}>Max Capacity</Text>
                         <TextInput
                            error={maxErrorState}
                            style={styles.textInput}
                            label="Max Capacity"
                            value={maxCapacity}
                            onChangeText={max => setMaxCapacity(max)}
                            mode = "outlined"
                        />
                        <HelperText type="error" visible={maxErrorState}>
                            {maxError}
                        </HelperText>
                    </View>
                    <View style={styles.flexRow}>

                    {/* operation days */}
                    <View style={{marginBottom: 20, paddingHorizontal: 15}}>
                        <View>
                            <Text style={{fontWeight:"bold"}}>Operation days</Text>
                        </View>
                        <View style={styles.flexRow}>
                            <View>
                                <Picker
                                    selectedValue={operationDaysFrom}
                                    style={{ height: 50, width: 150}}
                                    onValueChange={(value, itemIndex) => setOperationDaysFrom(value)}
                                >
                                        <Picker.Item label="Select Day" value="8" />
                                        <Picker.Item label="Sunday" value="0" />
                                        <Picker.Item label="Monday" value="1" />
                                        <Picker.Item label="Tuesday" value="2" />
                                        <Picker.Item label="Wednesday" value="3" />
                                        <Picker.Item label="Thursday" value="4" />
                                        <Picker.Item label="Friday" value="5" />
                                        <Picker.Item label="Saturday" value="6" />
                                </Picker>
                                <HelperText type="error" visible={operationDaysFromErrorState} >
                                    {operationDayFromError}
                                </HelperText>
                                
                            </View>
                             <Text style={{marginBottom:22, paddingHorizontal:15}}>To</Text>
                            <View>
                                <Picker
                                    selectedValue={operationDaysTo}
                                    style={{ height: 50, width: 150}}
                                    onValueChange={(value, itemIndex) => setOperationDaysTo(value)}
                                >
                                        <Picker.Item label="Select Day" value="8" />
                                        <Picker.Item label="Sunday" value="0" />
                                        <Picker.Item label="Monday" value="1" />
                                        <Picker.Item label="Tuesday" value="2" />
                                        <Picker.Item label="Wednesday" value="3" />
                                        <Picker.Item label="Thursday" value="4" />
                                        <Picker.Item label="Friday" value="5" />
                                        <Picker.Item label="Saturday" value="6" />
                                </Picker>
                                <HelperText type="error" visible={operationDaysToErrorState} >
                                    {operationDayToError}
                                </HelperText>                                    
                            </View>

                        </View>

                    </View>

                    
                    </View>
                    {/* Time operations */}

                    <View style={{paddingVertical: 15, marginBottom: 20}}>
                        <View style={{paddingHorizontal:15}}>
                            <Text style={{fontWeight:"bold", marginBottom: 10}}>Time operations</Text>
                        </View>
                        <View style={styles.flexRow}> 
                            <View style={ styles.padX, styles.flexRow}>
                                <View style={styles.padX}>
                                    <View>
                                        <Button uppercase={false} icon="menu-down"  onPress={showDatePicker} color="black">{!timeOpFrom? "Select Time": timeOpFrom}</Button>
                                        <DateTimePickerModal
                                            isVisible={isDatePickerVisible}
                                            mode="time"
                                            onConfirm={handleConfirm}
                                            onCancel={hideDatePicker}
                                        />
                                    </View>
                                    
                                    <HelperText type="error" visible={timeOpFromState} >
                                        {timeOpFromError}
                                    </HelperText>
                                </View>
                                <Text style={{marginBottom:22, marginLeft: 20}}>To</Text>
                                <View style={ styles.padX}>
                                    <View>
                                        <Button uppercase={false} icon="menu-down"  onPress={showDatePicker1} color="black">{!timeOpTo? "Select Time": timeOpTo}</Button>

                                        <DateTimePickerModal
                                            isVisible={isDateTo}
                                            mode="time"
                                            onConfirm={handleConfirm1}
                                            onCancel={hideDatePicker1}
                                        />
                                    </View>
                                    
                                    <HelperText type="error" visible={timeOpToState} >
                                        {timeOpToError}
                                    </HelperText>
                                </View>
                                
                            </View>
                          
                        </View>
                    </View>
                   
                    {/* Session interval */}
                    <View style={{marginBottom: 20}}>
                        <View style={{paddingHorizontal:10, marginBottom: -15}}>
                            <Text style={{fontWeight:"bold"}}>Session Intervals</Text>
                        </View>
                        <View style={{paddingVertical:15}}>
                            <View style={styles.flexRow}> 
                                <View style={styles.padX}>
                                    <View style={styles.flexRow}>
                                        <IconButton icon="plus" onPress={() => { registerSeatAdd(session, setSessions) }}/>
                                            <Text style={{paddingHorizontal:15}}>{session}</Text>
                                        <IconButton icon="minus" onPress={() => { registerSeatMinus(session, setSessions) }}/>
                                        
                                    </View>
                                    <HelperText type="error" visible={sessionIntervalErrorState}>
                                            {sessionIntervalError}
                                        </HelperText>
                                </View>
                                <View >
                                    <View style={ styles.padX}>
                                        <Picker
                                            selectedValue={sessionInterval}
                                            style={{ height: 50, width: 150}}
                                            onValueChange={(value, itemIndex) => setSessionInterval(value)}
                                        >
                                                <Picker.Item label="Select state" value="0" />
                                                <Picker.Item label="Hours" value="hours" />
                                                <Picker.Item label="Minutes" value="minutes" />
                                            
                                        </Picker>
                                        <HelperText type="error" visible={sessionIntervalErrorStateSelect}>
                                            {sessionIntervalErrorSelect}
                                        </HelperText>
                                    </View>

                                </View>
                            </View>

                        </View>

                    </View>

                    {/* Appoinment period  */}
                    <View style={{marginBottom: 30, paddingHorizontal: 15}}>
                        <View style={styles.flexRow}>
                            <View>
                                <View >
                                    <Text style={{fontWeight:"bold",marginBottom: 10}}>Appointment Period(in days)</Text>
                                </View>
                                <View >
                                    <TextInput
                                        error={daysBeforeErrorAppointState}
                                        style={{width:150, backgroundColor:"#ffff"}}
                                        label="Enter value"
                                        value={daysBeforeAppoint}
                                        onChangeText={val => setDaysAppointBefore(val)}
                                        mode = "outlined"
                                    />
                    
                                    <HelperText type="error" visible={daysBeforeErrorAppointState} >
                                        {daysBeforeAppointError}
                                    </HelperText>
                                </View>

                            </View>

                        <View>
                            {/* cancellation periond */}
                            <View style={ styles.padX}>
                                <Text style={{fontWeight:"bold", marginBottom: 10}}>Cancellation Period(in days)</Text>
                            </View>
                            <View style={styles.flexRow}> 
                            
                                
                            <View style={ styles.padX}>
                                <View >
                            
                                    <TextInput
                                        error={daysBeforeCancelErrorState}
                                        style={{width:150, backgroundColor:"#ffff"}}
                                        label="Enter value"
                                        value={daysBeforeCancel}
                                        onChangeText={val => setDaysBeforeCancel(val)}
                                        mode = "outlined"
                                    />
                                </View>
                                <HelperText type="error" visible={daysBeforeCancelErrorState}>
                                    {daysBeforeCancelError}
                                </HelperText>
                            </View>
                
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
                            <HelperText type="error" visible={requirementErrorState} >
                                {requirementError}
                            </HelperText>
                        </View>
                        <View style={styles.padXy}>
                                <Button style={{paddingVertical:7, backgroundColor: "#960071" , paddingHorizontal:2, width: '100%'}} mode="contained" onPress={saveServiceRequirement}>
                                    Submit
                                </Button>
                        </View>
                        <View>
                    <View style={styles.padX}>
                        <Text style={{fontWeight:"bold", fontSize: 18, color: "#960071",}}>POSTS</Text>

                        {serviceArray ? serviceArray.map((data)=> {
                                if (data.requirement) {
                                    return (
                                    <Card key={data.id} style={{ marginVertical:10,paddingHorizontal:20, borderRadius:10, shadowColor: "#0f0",
                                            shadowOffset: {
                                                width: 0,
                                                height: 3,
                                            },
                                            shadowOpacity: 0.29,
                                            shadowRadius: 4.65,

                                            elevation: 2,}} elevation={2}>
                                            <View style={{flex:1, flexDirection:'row', justifyContent:'space-between'}}>
                                                    <View style={{ width:'70%'}}>
                                                        <View >
                                                            <Text style={{fontWeight:"bold", fontSize: 18}}>{data.announcementTitle}</Text>
                                                        </View>
                                                        <View style={{paddingVertical:3}}>
                                                            <Text>{data.requirement}</Text>
                                                        </View>
                                                        
                                                    </View>
                                                    <Card.Actions >
                                                        <IconButton icon="pencil" size={25} color="gray" onPress={() => { handleOpenModalEdit(data.requirement, data.id) }}/>
                                                        <IconButton icon="delete" size={25} color="gray" onPress={() => { handleOpenDeleteModal(data.requirement,data.id)}}/>
                                                    </Card.Actions>
                                    
                                            </View>
                                            {/* style={styles.flexEnd} */}
                                                    
                                    </Card>
                                    )
                                }
                                return null;
                                
                            }) : <Text>No anouncements yet</Text>}
                    </View>

                </View>
                    </View>
                    
                    
                
                </Provider>
            <Provider>
            <Portal>
                            <Modal visible={openEditModal} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                                <View style={{alignItems:'center', paddingVertical:15}}>
                                    <Text style={{fontSize: 20, fontWeight:'bold'}}>Edit your requirement</Text>
                                    <Text>Enter your changes in the text</Text>
                                </View>

                                <View style={styles.padX}>
                                    <TextInput
                                        error={editRequirementState}
                                        style={styles.textInput}
                                        label="Edit your requirement here"
                                        value={editRequirementInput}
                                        onChangeText={req => setEditRequirementInput(req)}
                                        mode = "outlined"
                                    />
                                    <HelperText type="error" visible={editRequirementState} style={{marginLeft:15}}>
                                        {editRequirementError}
                                    </HelperText>
                                    <View >
                                        <Button style={{paddingVertical:7, backgroundColor: "#53369f" , paddingHorizontal:2, width: '100%'}} mode="contained" onPress={handleEdit}>
                                            save changes
                                        </Button>
                                    </View>
                                </View>
                            </Modal>
                            
            </Portal>
                        
            </Provider>
            <Provider>
            <Portal>
                            <Modal visible={openDeleteModal} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                                <View style={{alignItems:'center', paddingVertical:15}}>
                                    <Text style={{fontSize: 20, fontWeight:'bold'}}>Delete " {activePost} " Post</Text>
                                    <Text>Are you sure you want to delete this requirement? </Text>
                                </View>

                                <View style={styles.padX}>
                                    
                                    <View >
                                        <Button style={{paddingVertical:7, backgroundColor: "#53369f" , paddingHorizontal:2, width: '100%'}} mode="contained" onPress={handleDelete}>
                                            Delete
                                        </Button>
                                    </View>
                                </View>
                            </Modal>
                        </Portal>
                        
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
        flex:1,
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