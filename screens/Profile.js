import React, {useState} from 'react'
import { Text, View, TouchableOpacity, ImageBackground, Dimensions, ActivityIndicator } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";
import firebase from 'firebase';
import * as DocumentPicker from 'expo-document-picker';
import db, { store } from '../firebase'

const h = Dimensions.get("window").height;
const Profile = () => {
    const [one, setOne] = useState(null)
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("")
    

    const pickFile = async () => {
        await DocumentPicker.getDocumentAsync({ type: "audio/*" })
        .then(async (file) => {
            await setOne(file.uri)
            await setTitle(file.name)
        })
    }

    const upload = async () => {
        await setLoading(!loading)
        const uri = one;
        const refPath = `posts/${Math.random().toString(36)}`;
        const response = await fetch(uri);
        const blob = await response.blob();
    
        try {
            const storeRef = store.ref(refPath)
            await storeRef.put(blob)
            await storeRef.getDownloadURL().then(async (url) => {
                await db.collection("posts").add({
                    file: url,
                    title: title,
                    artist: "Duncan Kipkemoi",
                    time: firebase.firestore.FieldValue.serverTimestamp()
                })
            })
        } catch (error) {
            console.log(error);
        }
            await setOne(null)
            await setLoading(loading)
    }
    return (
            <View
                style={{
                    backgroundColor: "#241332",
                    flex: 1
                }}
            >
                <ImageBackground
                    source={{ uri: "https://images.unsplash.com/photo-1600119692885-8b04faa7f329?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=749&q=80" }}
                    style={{
                        height: 0.60 * h,
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            paddingHorizontal: 20,
                            marginTop: 60,
                            alignItems: "center",
                        }}
                    >
                        <TouchableOpacity style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "gray",
                            width: 35,
                            height: 35,
                            borderRadius: 999
                        }}>
                            <Ionicons name="arrow-back" color="#FFF" size={24} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "gray",
                            width: 35,
                            height: 35,
                            borderRadius: 999
                        }}>
                            <Ionicons name="log-out-outline" color="#FFF" size={24} />
                        </TouchableOpacity>
                    </View>
                    <LinearGradient
                        colors={["rgba(36,19,50,1)", "transparent"]}
                        style={{
                            transform: [{ rotate: "180deg" }],
                            position: "absolute",
                            left: 0,
                            right: 0,
                            bottom: 0,
                            zIndex: 1,
                            height: 0.16 * h,
                        }}
                    >
                    </LinearGradient>
                </ImageBackground>
                <View style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    {one ? (
                        <TouchableOpacity onPress={upload} style={{
                            paddingHorizontal: 50,
                            paddingVertical: 10,
                            backgroundColor: "yellow",
                            marginBottom: 20,
                            borderRadius: 45
                        }}>
                            {loading ? <ActivityIndicator color="black" size="small" /> : <Text style={{
                                fontWeight: "bold"
                            }}>Upload 🚀🚀🚀</Text>}
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={pickFile} style={{
                            marginBottom: 20
                        }}>
                            <Ionicons name="add-circle-outline" size={60} color="#F69237" />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
    )
}

export default Profile