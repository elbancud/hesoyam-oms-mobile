import React, {useState, useEffect} from 'react'
import {View, StyleSheet, Text, SafeAreaView, ScrollView} from 'react-native'
import {Button,Title, Provider, Snackbar,TextInput,HelperText, Card, IconButton, Portal, Modal} from 'react-native-paper';
import firebase from 'firebase';

export default function Announcement({ route }) {
    const containerStyle = {backgroundColor: 'white', padding: 20, width: '90%',  alignSelf:'center', borderRadius: 10};
    const {key} = route.params
    const [snackBar, setSnackBar] = useState(false);
    const [visible, setVisible] = useState(false);
    const [snackMessage, setSnackMessage] = useState('')
    const [variant, setVariant] = useState('')

    
    const [titleErrorState, setTitleErrorState] = useState(false);
    const [titleError, seTitleError] = useState("");
    const [titleInput, setTitleInput] = useState("");
    
    const [descriptionInput, setDescriptionInput] = useState("");
    const [descriptionInputError, setDescriptionInputError] = useState("");
    const [descriptionInputErrorState, setDescriptionInputErrorState] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);

    const [editPostTitleTextFieldError, setEditPostTitleTextFieldError] = useState("")
    const [editPostTitleTextFieldInput, setEditPostTitleTextFieldInput] = useState("")
    const [editPostTitleTextFieldState, setEditPostTitleTextFieldState] = useState(false)

    const [editDescriptionTextFieldError, setEditDescriptionTextFieldError] = useState("")
    const [editDescriptionTextFieldState, setEditDescriptionTextFieldState] = useState(false)
    const [editDescriptionTextFieldInput, setEditDescriptionTextFieldInput] = useState("")

    const [activeKey, setActiveKey] = useState("");
    const [activePost, setActivePost] = useState("");
    const [activeDescription, setActiveDescription] = useState("");

    const onDismissSnackBar = () => setVisible(false);
    const hideModal = () => setOpenEditModal(false);
    function submit() {
        if (titleInput.length < 8) {
            setTitleErrorState(true)
            seTitleError("Please enter atleast 8 characters or 3 words above.")
                        setSnackBar(true);
                        setVisible(!visible)
                        setSnackMessage("Ooops! Seems like you are forgetting to fill all the entries with proper phrases.")
                        setVariant("warning")
          
        } else {
            setTitleErrorState(false)
            seTitleError("")
        }
        if (descriptionInput.length < 8) {
            setDescriptionInputErrorState(true);
            setDescriptionInputError("Please enter atleast 8 characters or 3 words above.")
           
                        setVisible(!visible)
                        setSnackMessage("Ooops! Seems like you are forgetting to fill all the entries with proper phrases.")
                        setVariant("warning")
        } else {
            setDescriptionInputErrorState(false);
            setDescriptionInputError("")
      
            if (titleErrorState === false && descriptionInputErrorState === false && titleInput.length >= 8 && descriptionInput.length >=8) {
                const dbRefPush = firebase.database().ref("announcements");
                dbRefPush.orderByChild('announcementTitle').equalTo(titleInput).once('value').then(snapshot => {
                    if (snapshot.exists()) {
                        setVisible(!visible)
                        setVariant("error")
                        setSnackMessage("Oopsies, title is already existing try another one")
                     
                    }
                    else {
                        setTitleInput('')
                        setDescriptionInput('')
                        const pushAnnouncement = {
                            announcementTitle: titleInput,
                            announcementDescription: descriptionInput
                        }
                        dbRefPush.push(pushAnnouncement).then(() => {
                            setVisible(!visible)
                            setVariant("success")
                            setSnackMessage("That's it right there, Event or announcement posted")
                        })
                        setUpdate(!update);
                    }
                            
                });
                //push
            }
        }
    }
    function handleOpenModalEdit( title, description, key) {
        setOpenEditModal(true);
        setEditPostTitleTextFieldInput(title);
        setEditDescriptionTextFieldInput(description);
        setActiveKey(key);
        setActivePost(title)
        setActiveDescription(description)
            setEditDescriptionTextFieldState(false)
            setEditDescriptionTextFieldError("")
            setEditPostTitleTextFieldState(false)
            setEditPostTitleTextFieldError("")
    }
    function handleOpenDeleteModal(title, key) {
        setOpenDeleteModal(true)
        setActivePost(title)
        setActiveKey(key);

    }
    function handleEdit() {
        if (editPostTitleTextFieldInput.length < 8) {
            setEditPostTitleTextFieldState(true)
            setEditPostTitleTextFieldError("Ooops! Seems like you are forgetting to fill all the entries with proper phrases.")
        } else {
              setEditPostTitleTextFieldState(false)
              setEditPostTitleTextFieldError("")
        }
        if (editDescriptionTextFieldInput.length < 8) {
            setEditDescriptionTextFieldState(true)
            setEditDescriptionTextFieldError("Ooops! Seems like you are forgetting to fill all the entries with proper phrases.")
        } else {
            setEditDescriptionTextFieldState(false)
            setEditDescriptionTextFieldError("")
            if (editPostTitleTextFieldInput === activePost && editDescriptionTextFieldInput === activeDescription) {
                        setVisible(!visible)
                        setVariant("error")
                        setSnackMessage("Oops you don't seem to change anything, kindly check it again. Thankyou")
        
                setEditDescriptionTextFieldState(true)
                setEditDescriptionTextFieldError("No changes found")
                setEditPostTitleTextFieldState(true)
                setEditPostTitleTextFieldError("No changes found")

            }
              if((editDescriptionTextFieldState === false && editDescriptionTextFieldState === false && editPostTitleTextFieldInput.length > 8 && editDescriptionTextFieldInput.length > 8 && editPostTitleTextFieldInput !== activePost) || (editDescriptionTextFieldInput !== activeDescription)){
                            setEditDescriptionTextFieldState(false)
                            setEditDescriptionTextFieldError("")
                            setEditPostTitleTextFieldState(false)
                            setEditPostTitleTextFieldError("")
                            
                            const dbRef = firebase.database().ref("announcements").child(activeKey);

                              const update = {
                            announcementTitle: editPostTitleTextFieldInput,
                            announcementDescription: editDescriptionTextFieldInput
                            }
                            dbRef.update(update).then(()=>{
                        
                                setVisible(!visible)
                                setVariant("success")
                                setSnackMessage("Success! " + activePost + " post updated")
                                setOpenEditModal(false)
                            })

            }
          
        }  
        setUpdate(!update);
       
       
    }
    function handleDelete(title) {
        const dbRef = firebase.database().ref("announcements").child(activeKey);
        dbRef.remove().then(() => {
         
                                setVisible(!visible)
                                setVariant("success")
                                setSnackMessage("Success! " + activePost + " post deleted")
            setUpdate(!update);
            setOpenDeleteModal(false)
        })
    }
    const [update, setUpdate] = useState(false);
    const [announcementArray, setAnnouncementArray] = useState();

    useEffect(() => {
        const dbRef = firebase.database().ref("announcements");
        dbRef.once("value")
            .then(function (snapshot) {
                const postSnap = snapshot.val();
                const announcementArray = [];
                for (let id in postSnap) {
                    announcementArray.push({id, ...postSnap[id]});
                }
                setAnnouncementArray(announcementArray)
            });
    }, [update])
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                
                <Provider>
                        <View style={ styles.padXy}>
                            <Title style={{fontWeight:"bold", marginBottom: 10}}>Announcement: Post, Edit, and Delete</Title>
                            <Text style={{fontSize: 16, lineHeight: 25}}>Here you could edit, remove, and add events and announcements if you please.</Text>
                        </View>
                    <View style={styles.padX}>
                
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
                            <Button style={{paddingVertical:7, backgroundColor: "#53369f" , paddingHorizontal:2, width: '100%'}} mode="contained" onPress={submit}>
                                Submit
                            </Button>
                        </View>
                    </View>
                    
                <View style={styles.mY}>
                    <View style={styles.padX}>
                        <Text style={{fontWeight:"bold", fontSize: 18, color: "#960071",}}>POSTS</Text>

                        {announcementArray ? announcementArray.map((data)=> {
                                if (data.announcementTitle) {
                                    return (
                                    <Card key={data.id} style={{ marginVertical:10,paddingVertical:20, paddingHorizontal:20, borderRadius:10, shadowColor: "#0f0",
                                            shadowOffset: {
                                                width: 0,
                                                height: 3,
                                            },
                                            shadowOpacity: 0.29,
                                            shadowRadius: 4.65,

                                            elevation: 6,}} elevation={2}>
                                            <View style={{flex:1, flexDirection:'row', justifyContent:'space-between'}}>
                                                    <View style={{ width:'70%'}}>
                                                        <View >
                                                            <Text style={{fontWeight:"bold", fontSize: 18}}>{data.announcementTitle}</Text>
                                                        </View>
                                                        <View style={{paddingVertical:3}}>
                                                            <Text>{data.announcementDescription}</Text>
                                                        </View>
                                                        
                                                    </View>
                                                    <Card.Actions >
                                                        <IconButton icon="pencil" size={25} color="gray" onPress={() => { handleOpenModalEdit(data.announcementTitle, data.announcementDescription, data.id) }}/>
                                                        <IconButton icon="delete" size={25} color="gray" onPress={() => { handleOpenDeleteModal(data.announcementTitle,data.id)}}/>
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
                            <Modal visible={openEditModal} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                                <View style={{alignItems:'center', paddingVertical:15}}>
                                    <Text style={{fontSize: 20, fontWeight:'bold'}}>Edit your Post</Text>
                                    <Text>Enter your changes in the text</Text>
                                </View>

                                <View style={styles.padX}>
                                    <TextInput
                                        error={editPostTitleTextFieldState}
                                        style={styles.textInput}
                                        label="Title"
                                        value={editPostTitleTextFieldInput}
                                        onChangeText={title => setEditPostTitleTextFieldInput(title)}
                                        mode = "outlined"
                                    />
                                    <HelperText type="error" visible={editPostTitleTextFieldState} style={{marginLeft:15}}>
                                        {editPostTitleTextFieldError}
                                    </HelperText>
                                     
                                    <TextInput
                                        error={editPostTitleTextFieldState}
                                        style={styles.textInput, {height: 150, backgroundColor:"#ffffff"}}
                                        label="Description"
                                        value={editDescriptionTextFieldInput}
                                        onChangeText={desc => setEditDescriptionTextFieldInput(desc)}
                                        mode = "outlined"
                                    />
                                    <HelperText type="error" visible={editPostTitleTextFieldState} style={{marginLeft:15}}>
                                        {editDescriptionTextFieldError}
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
                                    <Text>Are you sure you want to delete this post? </Text>
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