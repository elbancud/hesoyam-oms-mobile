import React,{useState, useEffect} from 'react'
import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import {Button,Title, Provider, Snackbar,TextInput,HelperText, Card, IconButton, Portal, Modal} from 'react-native-paper';
import firebase from 'firebase';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Calendar } from 'react-native-calendars';

;

const CalendarTab = () => {

    const [update, setUpdate] = useState("")
    const [events, setEvents] = useState("")
    const [postedEvents, setPostedEvents] = useState([])  
  
    const [titleErrorState, setTitleErrorState] = useState(false);
    const [titleError, seTitleError] = useState("");
    const [titleInput, setTitleInput] = useState("")
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    
    const [eventDate, setEventDate] = useState("");
    const [eventTime, setEventTime] = useState("");
    
    const [snackBar, setSnackBar] = useState(false);
    const [snackMessage, setSnackMessage] = useState('')
    const [variant, setVariant] = useState('')
    const [visible, setVisible] = useState("")
    const onDismissSnackBar = () => setVisible(false);

    const [calendarEventsRender, setCalendarEventsRender ] = useState()
    useEffect(() => {
      const eventsFromDb = [];
     const db = firebase.database().ref("events")
        db.once('value', snapshot => {
             const postSnap = snapshot.val();
                const events = [];
                const postedEvents = [];
                
        for (let id in postSnap) {
                    if (!postSnap.time) {
                      events.push(postSnap[id]);
                    }
                    if (typeof(postSnap[id].start) !== 'undefined') {
                      const snap = postSnap[id].start.replace(',', '-').replace(',','-').replace(' ','').replace(' ','') 
                      postedEvents.push(snap)
                      eventsFromDb.push(snap)
                    }
                  }
                  setPostedEvents(postedEvents)
                  setEvents(events)
        })
        const newDaysObject = {}
        postedEvents.forEach(data => {
                newDaysObject[data] = {
                    selected: true, marked: true, selectedColor: 'blue', disableTouchEvent: true
                }
            })
        setCalendarEventsRender(newDaysObject)
        setTimeout(() => {
            setUpdate(!update)
        }, 200);
    }, [update])
     const showDatePicker = () => {
       setDatePickerVisibility(true);
    };
    const showTimePicker = () => {
       setTimePickerVisibility(true);
    };
    const hideDatePicker = () => {
        setTimePickerVisibility(false)
        setDatePickerVisibility(false);
    };

    const handleConfirmTime = (date) => {
        const time = date.getHours() + ":"+ date.getMinutes()
        setEventTime(time)
        hideDatePicker();
    };
    const handleConfirmDate = (date) => {
      
      const fDate = date.getFullYear() + ", "+ (date.getMonth()+1) + ", " + date.getDate()
      setEventDate(fDate)
      hideDatePicker();
    };
    function handleAppoint() {
         if (eventDate === "" || eventTime === "" || titleInput === "" || titleInput.length <8 ) {
                        setTitleErrorState(true)
                        seTitleError("Please enter atleast 8 characters or 3 words above.")
                        setSnackBar(true);
                        setVisible(!visible)
                        setVariant("error")
                        setSnackMessage("Oopsies, please select time and date")
         } else {
                        setTitleErrorState(false)
                        seTitleError("")
                        const db = firebase.database().ref("events")
                         db.orderByChild('start').equalTo(eventDate).once('value').then(snapshot => {
                            if (snapshot.exists()) {
                                setSnackBar(true);
                                setVisible(!visible)
                                setVariant("error")
                                setSnackMessage("Oopsies, date is already booked")
                            
                            }
                            else {
                                
                               const adminEvent = {
                                title: titleInput,
                                  start: eventDate,
                                  end: eventDate,
                                  time:eventTime
                              }
                              db.push(adminEvent).then(() => {
                                  setSnackBar(true);
                                  setVisible(!visible)
                                  setVariant("success")
                                  setSnackMessage("Great, event posted")
                                  setTitleInput('')
                                  setEventTime('')
                                  setEventDate('')
                                })
                            }
                                    
                        });
                                  setUpdate(!update)
                    
      }
                                  setUpdate(!update)
      
     }
    return (
        <SafeAreaView style={styles.container}>
          <View style={ styles.padXy}>
                            <Title style={{fontWeight:"bold", marginBottom: 10}}>Event Calendar</Title>
                              <Text style={{fontSize: 16, lineHeight: 25}}>Here you could post an event. Also, you could view a date's appointment </Text>
                            </View>
            <TextInput
                              error={titleErrorState}
                              style={styles.textInput}
                              label="Title"
                              value={titleInput}
                              onChangeText={title => setTitleInput(title)}
                              mode = "outlined"
        />
        <HelperText type="error" visible={titleErrorState} style={{marginLeft:15}}>
                            {titleError}
                        </HelperText>
          <View style={styles.padXy, styles.flexRow}> 
                <Button uppercase={false} icon="clock" onPress={showTimePicker} color="black">{eventTime? eventTime: "Select time"}</Button>
                                          <DateTimePickerModal
                                              isVisible={isTimePickerVisible}
                                              mode="time"
                                              onConfirm={handleConfirmTime}
                                              onCancel={hideDatePicker}
                                          />
                <Button uppercase={false} icon="calendar" onPress={showDatePicker} color="black">{eventDate? eventDate: "Select date"}</Button>
                                          <DateTimePickerModal
                                              isVisible={isDatePickerVisible}
                                              mode="date"
                                              onConfirm={handleConfirmDate}
                                              onCancel={hideDatePicker}
                                          />
          </View>
                <View style={styles.padX}>
                        <Button style={{paddingVertical:7, backgroundColor: "#53369f" , paddingHorizontal:2, width: '100%'}} mode="contained" onPress={handleAppoint}>
                            post
                        </Button>
                </View>
          
          <Calendar
            current={new Date()}
            firstDay={1}
            onPressArrowLeft={subtractMonth => subtractMonth()}
            onPressArrowRight={addMonth => addMonth()}
            enableSwipeMonths={true}

            markedDates={calendarEventsRender}
            />
              <View style={{flex:1, justifyContent:'center',marginBottom:20}}>
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

export default CalendarTab


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
        paddingVertical: 20,
        paddingHorizontal:20,
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
        width: '90%',
        alignSelf:'center'

    },
    btnContained: {
        alignSelf: 'center',
    },   success: {
        backgroundColor: "#2e7d32",
        alignSelf: 'center',
        

    }, error:{
        backgroundColor: "#d32f2f",
        alignSelf: 'center',
        
    }, warning: {
      backgroundColor: "#ed6c02",
      alignSelf: 'center',
      
        

    },
});