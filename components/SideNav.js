// import React, {useState} from 'react'
// import {ImageBackground, View, StyleSheet, Text, SafeAreaView, Image} from 'react-native'
// import {HelperText, TextInput,Button,Title  } from 'react-native-paper';
// import firebase from '../Firebase/firebase';
// import banner from '../Images/ui-oms.png';
// import {auth} from '../Firebase/firebase';
// import SideNav from '../components/SideNav';
import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    </View>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function SideNav() {
  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator >
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         // alignItems: 'center',
//         justifyContent: 'space-evenly',
//         paddingHorizontal: 15,
//     },
//     banner: {
//         width: '100%',
//         height: 300,
//     },
//     flexColumn: {
//         flexDirection: "column",
//         backgroundColor: '#fff',
//     },
//     flexRow: {
//         flexDirection: "row",
//         alignSelf: 'center',
//         justifyContent: 'flex-end'
//     },
//     justifyCenter:{
//         justifyContent: "center"  
//     },
//     textCenter: {
//         textAlign:"center"
//     },
//     primaryBG:{
//         backgroundColor: "#53369f"
//     },
//     primaryColor:{
//         color: "#53369f",
//         fontWeight: "bold",
//         marginVertical: 15,
//         fontSize:18
//     },
//     padXy: {
//          paddingHorizontal: 15,
//          marginVertical: 15
//     },
//     mY: {
//         marginTop:20
//     },
//     padX: {
//          paddingHorizontal: 15,
//     },
//     padY: {
//          paddingHorizontal: 15,
//     },
//     flexEnd: {
//         display: 'flex',
//         alignSelf: 'flex-end',
//         paddingHorizontal: 15,
//     },
//     textInput: {
//         backgroundColor: '#fff',
//         width: '90%',
//         alignSelf:'center'

//     },
//     btnContained: {
//         alignSelf: 'center',
//         backgroundColor: "#53369f",
       
//     }
// });