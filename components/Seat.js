import React, {useState, useEffect} from 'react'
import {ImageBackground, View, StyleSheet, Text, SafeAreaView, Image, ScrollView} from 'react-native'
import {Button,Title,Card,IconButton,Menu,Provider, Snackbar} from 'react-native-paper';

import firebase from '../Firebase/firebase';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

export default function Seat({route}) {

    
    const [visible, setVisible] = useState(false);
    const [snackMessage, setSnackMessage] = useState('')
    const [variant, setVariant] = useState('')
    const [seatColumn, setSeatColumn] = useState([])

    const [groupNumber, setGroupNumber] = useState(0);
    const [columnNumber, setColumnNumber] = useState(0);
    const [rowNumber, setRowNumber] = useState(0);
    const [update, setUpdate] = useState(false);
    const [seatArray, setSeatArray] = useState();

    const onDismissSnackBar = () => setVisible(false);

    function registerSeatAdd(getter, setter, variable) {
        setter(getter + 1);
        if (variable === "columnNumber") {
            seatColumn.push({ reserved: false });
        }
        setUpdate(!update)
    }
    function registerSeatMinus(getter, setter) {
        setUpdate(!update)
        if(getter > 0) {
                setter(getter - 1)
        }
        if (getter === rowNumber) {
            seatColumn.pop()
        }
        setUpdate(!update)

    }
    function handleOpenDeleteModal(id) {
        const dbGrp = firebase.database().ref("seat-arrangement/" + id)
        dbGrp.remove().then(() => {
                                setVisible(!visible)
                                setVariant("success")
                                setSnackMessage("Success! seat arrangement updated")
        })
        setUpdate(!update)

    }
    const saveServiceRequirement = (event) => {
        if (groupNumber === 0 || rowNumber === 0 || columnNumber === 0) {
                                setVisible(!visible)
                                setVariant("error")
                                setSnackMessage("Ooops! you forgot to input rows or columns or group numbers.")
               
        } else {
            let group = parseInt(groupNumber -1, 10);
            while (group >= 0) {
                const dbGrp = firebase.database().ref("seat-arrangement/")
              
                const pushedData = dbGrp.push()
                const key = pushedData.getKey()
                let rowNumberCounter = parseInt(rowNumber - 1, 10)
                while (rowNumberCounter >= 0) {
                    firebase.database().ref("seat-arrangement/" + key).push(seatColumn).then(() => {
                                setVisible(!visible)
                                setVariant("success")
                                setSnackMessage("Success! seat arrangement updated")
                    })
                    rowNumberCounter--
                }
                    group--
                }
                
            }
            
        setUpdate(!update)
        
                        
    }
      useEffect(() => {
        const dbGrp = firebase.database().ref("seat-arrangement")
        
        dbGrp.once('value').then((snapshot) => {
             const snap = snapshot.val();
            const seatArray = [];
            for (let id in snap) {
                seatArray.push({id, ...snap[id]})
            }
            setSeatArray(seatArray);

        })

    }, [update])
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                    <Provider>
                    <View style={ styles.padXy}>
                        <Title style={{fontWeight:"bold", marginBottom: 10}}>Customize Seat plan</Title>
                        <Text style={{fontSize: 16, lineHeight: 25}}>Shown here are rows and columns of your church. You can customize the column, rows, and groups of seat plan mirrored to the church's arrangements. </Text>
                           
                    </View>
                    <View style={ styles.padXy}>
                        <Text style={{fontSize: 16, lineHeight: 25}}>Press plus sign to increase groups, columns, and rows</Text>
                    </View>
                    <View style={styles.padXy}>
                        <Text style={{fontWeight:'bold'}}>Groups</Text>
                        <View style={styles.flexRow}>
                            <IconButton icon="plus" onPress={() => { registerSeatAdd(groupNumber, setGroupNumber, "groupNumber") }}/>
                                <Text>{groupNumber}</Text>
                            <IconButton icon="minus" onPress={() => { registerSeatMinus(groupNumber, setGroupNumber) }}/>
                            
                        </View>
                    </View>
                    <View style={styles.padXy}>
                        <Text style={{fontWeight:'bold'}}>Rows</Text>
                        <View style={styles.flexRow}>
                            <IconButton icon="plus" onPress={() => { registerSeatAdd(rowNumber, setRowNumber, "rowNumber") }}/>
                                <Text>{rowNumber}</Text>
                            <IconButton icon="minus" onPress={() => { registerSeatMinus(rowNumber, setRowNumber) }}/>
                            
                        </View>
                    </View>
                    <View style={styles.padXy}>
                        <Text style={{fontWeight:'bold'}}>Columns</Text>
                        <View style={styles.flexRow}>
                            <IconButton icon="plus" onPress={() => { registerSeatAdd(columnNumber, setColumnNumber, "columnNumber") }}/>
                                <Text>{columnNumber}</Text>
                            <IconButton icon="minus" onPress={() => { registerSeatMinus(columnNumber, setColumnNumber) }}/>
                            
                        </View>
                    </View>
                                    <View >
                                        <Button style={{paddingVertical:7, backgroundColor: "#53369f" , paddingHorizontal:2, width: '100%'}} mode="contained" onPress={saveServiceRequirement}>
                                            save changes
                                        </Button>
                                    </View>
                                    
                                    <View  style={styles.mY}>
                                        <Button style={{paddingVertical:7, backgroundColor: "#fff" , paddingHorizontal:2, width: '100%', borderStyle: 'dashed', borderWidth:1}} mode="outlined" disabled>
                                            ALTAR
                                        </Button>
                                    </View>
                                    <View style={styles.mY}>
                                        {seatArray ? seatArray.map((data) => {
                                    return(
                                        <View style={{marginVertical:15}} key={data.id}>
                                            {
                                                    Object.values(data).map(key => {
                                                        if (typeof (key) === "object") {
                                                            return (
                                                                <View style={{flex:1, flexDirection:"row", alignSelf:'center'}} >
                                                                    {Object.values(key).map((child, index) => {
                                                                            if (child.reserved === true) {
                                                                                return (
                                                                                    <View style={{padding:5}} key={child}>
                                                                                                
                                                                                                        <Button mode="contained" style={{backgroundColor:"#eeeeee", width:50}}  disableElevation>
                                                                                                            {index + 1}
                                                                                                        </Button>
                                                                                        </View> 
                                                                                )
                                                                            } else {
                                                                                    return (
                                                                                        <View style={{padding:5}}>
                                                                                                
                                                                                                        <Button mode="contained" style={{backgroundColor:"#26a69a",width:50}}>
                                                                                                            {index + 1}
                                                                                                        </Button>
                                                                                        </View> 
                                                                                    )
                                                                            }
                                                                            
                                                                        
                                                                        })
                                                                    }

                                                                </View>
                                                            )
                                                        } 
                                                        
                                                })
                                            }
                                            <View style={{alignSelf:'center'}}>
                                                <View >
                                                    <IconButton color='gray' onPress={() => { handleOpenDeleteModal(data.id)}} icon="delete"/>
                                                                    
                                                </View>
                                            </View>
                                        </View>
                                        
                                    )

                                    }) : <Text> No registered rows, groups , and columns yet</Text> }
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
        justifyContent: 'space-between',
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
       
    },   success: {
        backgroundColor: "#2e7d32"

    }, error:{
        backgroundColor: "#d32f2f"

        
    }, warning: {
        backgroundColor: "#ed6c02"
        

    }
});