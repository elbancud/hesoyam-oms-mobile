// import React, {useState} from 'react'
// import {ImageBackground, View, StyleSheet, Text, SafeAreaView, Image} from 'react-native'
import {IconButton, Avatar } from 'react-native-paper';
// import firebase from '../Firebase/firebase';
// import banner from '../Images/ui-oms.png';
// import {auth} from '../Firebase/firebase';
// import SideNav from '../components/SideNav';
import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Announcement from '../components/Announcement'
import Dashboard from '../components/Dashboard'
import Pages from '../components/Pages'
import Services from '../components/Services'
import Themes from '../components/Themes'
import CalendarTab from '../components/CalendarTab'
import Seat from '../components/Seat'
import Livestream from '../components/Livestream'
import Podcast from '../components/Podcast'
import Report from '../components/Report'
import Donation from '../components/Donation'



const Drawer = createDrawerNavigator();
export default function AdminUI({ route, navigation }) {
  const { key } = route.params
  const toUser = () => {
  navigation.navigate('AdminAccount', {
                                        key: key,
                                    });
  }
  return (
    <NavigationContainer independent={true} initialRouteName="Dashboard">
      <Drawer.Navigator screenOptions={{
            headerTitleStyle:{fontSize: 16}
          }} >
        <Drawer.Screen name="Dashboard" component={Dashboard} initialParams={{ key: key }}
          options={{
              headerRight: () => (
                <IconButton onPress={toUser} icon = "robot" color="#fff" style={{ marginRight: 20, backgroundColor:"#960071"}} />
              ),
            }}/>
            <Drawer.Screen name="Themes" component={Themes} initialParams={{key:key}} options={{
              headerRight: () => (
                <IconButton onPress={toUser} icon = "robot" color="#fff" style={{ marginRight: 20, backgroundColor:"#960071"}} />
              ),
            }}/> 
            <Drawer.Screen name="Pages" component={Pages} initialParams={{key:key}} options={{
              headerRight: () => (
                <IconButton onPress={toUser} icon = "robot" color="#fff" style={{ marginRight: 20, backgroundColor:"#960071"}} />
              ),
            }}/>
            <Drawer.Screen name="Services" component={Services} initialParams={{key:key}} options={{
              headerRight: () => (
                <IconButton onPress={toUser} icon = "robot" color="#fff" style={{ marginRight: 20, backgroundColor:"#960071"}} />
              ),
            }}/>
            <Drawer.Screen name="Calendar" component={CalendarTab} initialParams={{key:key}} options={{
              headerRight: () => (
                <IconButton onPress={toUser} icon = "robot" color="#fff" style={{ marginRight: 20, backgroundColor:"#960071"}} />
              ),
            }}/>
            <Drawer.Screen name="Seat Management" component={Seat} initialParams={{key:key}} options={{
              headerRight: () => (
                <IconButton onPress={toUser} icon = "robot" color="#fff" style={{ marginRight: 20, backgroundColor:"#960071"}} />
              ),
            }}/>
            <Drawer.Screen name="Announcement" component={Announcement} initialParams={{key:key}} options={{
              headerRight: () => (
                <IconButton onPress={toUser} icon = "robot" color="#fff" style={{ marginRight: 20, backgroundColor:"#960071"}} />
              ),
            }}/>
            <Drawer.Screen name="Livestream" component={Livestream} initialParams={{key:key}}options={{
              headerRight: () => (
                <IconButton onPress={toUser} icon = "robot" color="#fff" style={{ marginRight: 20, backgroundColor:"#960071"}} />
              ),
            }}/> 
            <Drawer.Screen name="Podcasts" component={Podcast} initialParams={{key:key}} options={{
              headerRight: () => (
                <IconButton onPress={toUser} icon = "robot" color="#fff" style={{ marginRight: 20, backgroundColor:"#960071"}} />
              ),
            }}/>
            <Drawer.Screen name="Report Bugs" component={Report} initialParams={{key:key}} options={{
              headerRight: () => (
                <IconButton onPress={toUser} icon = "robot" color="#fff" style={{ marginRight: 20, backgroundColor:"#960071"}} />
              ),
            }}/>
            <Drawer.Screen name="Donation" component={Donation} initialParams={{key:key}} options={{
              headerRight: () => (
                <IconButton onPress={toUser} icon = "robot" color="#fff" style={{ marginRight: 20, backgroundColor:"#960071"}} />
              ),
            }}/>
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