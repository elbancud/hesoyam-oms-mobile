import React, {useState} from 'react'
import {ImageBackground, View, StyleSheet, Text, SafeAreaView, Image, ScrollView} from 'react-native'
import {Button,Title,Card,IconButton,Menu,Provider, Snackbar} from 'react-native-paper';
import design1 from '../Images/design1.jpg';
import design2 from '../Images/design2.jpg';
import design3 from '../Images/design3.jpg';
import firebase from '../Firebase/firebase';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

export default function Themes({route}) {
    const {key} = route.params
    const [visible1, setVisible1] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [visible3, setVisible3] = useState(false);

    const [designPage, setDesignPage] = useState("");
    const [snackBar, setSnackBar] = useState(false);
    const [visible, setVisible] = useState(false);
    const [snackMessage, setSnackMessage] = useState('')
    const [variant, setVariant] = useState('')
    const openMenu1 = (designName) => {
        setVisible1(true);
        setDesignPage(designName)
    }
    const openMenu2 = (designName) => {
        setVisible2(true);
        setDesignPage(designName)
    }
    const openMenu3 = (designName) => {
        setVisible3(true);
        setDesignPage(designName)
    }
    const closeMenu = () => {
        setVisible1(false)
        setVisible2(false) 
        setVisible3(false)
    };
    const onDismissSnackBar = () => setVisible(false);

    function registerTheme() {
        const dbRefWithKey = firebase.database().ref("account-details/" + key);
        dbRefWithKey.on('value', snapshot => {
            snapshot.forEach(snap => {
                if (snap.hasChild("designName")) {
                        setSnackBar(true);
                        setVisible(!visible)
                        setSnackMessage("Hold on! didn't you already have chosen a theme?, kindly visit the pages tab")
                        setVariant("warning")
                        
                    return true
                } else {
                    const pushThemeSelection = {
                        designName: designPage
                    }
                    dbRefWithKey.push(pushThemeSelection)
                        setSnackBar(true);
                        setVisible(!visible)
                        setSnackMessage("Good job so far!. Visit the page tab to start customizing them.")
                        setVariant("success")
                        return true
                }
            })
        })
    }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                    <Provider>
                    <View style={ styles.padXy}>
                        <Title style={{fontWeight:"bold", marginBottom: 10}}>Select a theme</Title>
                        <Text style={{fontSize: 16, lineHeight: 25}}>Select and activate your preferred themes here then customize them in the pages tab.</Text>
                            <Card style={styles.mY}>
                                <Card.Cover source={design1} />
                                <Card.Actions style={styles.flexRow}>
                                        <Text style={ styles.textCenter, {fontSize: 16, fontWeight: 'bold'}}>Bold and Loud</Text>
                                            <Menu
                                                visible={visible1}
                                                onDismiss={closeMenu}
                                                anchor={<IconButton icon="more" size={25} onPress={()=>{openMenu1("design1")}}/>}>
                                                <Menu.Item onPress={registerTheme} title="Activate" />
                                                <Menu.Item onPress={() => {}} title="Live demo" />
                                            </Menu>
                                </Card.Actions>
                            </Card>
                            <Card style={styles.mY}>
                                <Card.Cover source={design2} />
                                <Card.Actions style={styles.flexRow}>
                                        <Text style={ styles.textCenter, {fontSize: 16, fontWeight: 'bold'}}>Classic Blue</Text>
                                            <Menu
                                                visible={visible2}
                                                onDismiss={closeMenu}
                                                anchor={<IconButton icon="more" size={25} onPress={()=>{openMenu2("design2")}}/>}>
                                                <Menu.Item onPress={registerTheme} title="Item 1" />
                                                <Menu.Item onPress={() => {}} title="Item 2" />
                                            </Menu>
                                </Card.Actions>
                            </Card>
                            <Card style={styles.mY}>
                                <Card.Cover source={design3} />
                                <Card.Actions style={styles.flexRow}>
                                        <Text style={ styles.textCenter, {fontSize: 16, fontWeight: 'bold'}}>Dark Spectrum</Text>
                                            <Menu
                                                visible={visible3}
                                                onDismiss={closeMenu}
                                                anchor={<IconButton icon="more" size={25} onPress={()=>{openMenu3("design3")}}/>}>
                                                <Menu.Item onPress={registerTheme} title="Item 1" />
                                                <Menu.Item onPress={() => {}} title="Item 2" />
                                            </Menu>
                                </Card.Actions>
                            </Card>
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