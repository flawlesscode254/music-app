import React, { useState, useEffect } from 'react'
import { FlatList, StyleSheet, View, ScrollView, TextInput, TouchableOpacity, Image, Text, StatusBar } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import Stories from './Stories'
import { useNavigation } from '@react-navigation/native';
import db from '../firebase';

const Music = () => {
    const [data, setData] = useState([])
    const [search, setSearch] = useState('')

    const navigation = useNavigation()

    navigation.addListener("blur", () => {
        setSearch("")
    })

    useEffect(() => {
        db.collection("posts").orderBy("time", 'desc').onSnapshot((snapshot) => {
            setData(snapshot.docs.map(doc => ({
                id: doc.id,
                artist: doc.data().artist,
                file: doc.data().file,
                title: doc.data().title
            })))
        })
    }, [])
    return (
        <View style={{
            flex: 1,
            justifyContent: "center",
            backgroundColor: "#FFFFFF"
        }}>
            <StatusBar barStyle="light-content" backgroundColor="#0E2A47" />
            <View style={styles.container}>
                <View style={styles.search}>
                    <Ionicons name="musical-notes" color="#ed1186" size={24} />
                    <TextInput
                        value={search}
                        onChangeText={text => setSearch(text)}
                        style={styles.input}
                        placeholderTextColor="#FFF"
                        placeholder="Search by song name..."
                    />
                    {search ? (
                        <TouchableOpacity onPress={() => {
                            setSearch("")
                        }}>
                            <Ionicons name="close-circle" color="#F69237" size={24} />
                        </TouchableOpacity>
                    ) : (
                        null
                    )}
                </View>
                {data.filter((val) => {
                    if (search === '') {
                    }
                    else if (val.title.toLowerCase().includes(search.toLowerCase())) {
                        let a = val.title
                        return a
                    }
                }).map((val) => (
                    <Songs
                        key={val.id}
                        file={val.file}
                        artist={val.artist}
                        title={val.title}
                    />
                ))}
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View style={styles.stories}>
                        <Stories
                            url="https://i1.sndcdn.com/artworks-000396680553-cgwcyk-t500x500.jpg"
                        />
                        <Stories
                            url="https://miro.medium.com/max/3150/2*OtcF2rdxLbrOiJjyV518Mw.png"
                        />
                        <Stories
                            url="https://static.displate.com/857x1200/displate/2019-03-13/31cca161872dc91eb707ec537e6e17cf_9fbebe29d5aa84fac748f0a5017ec693.jpg"
                        />
                        <Stories
                            url="https://yt3.ggpht.com/ytc/AKedOLR6jrecjR5XHhE-2_79GYEF9SSy2TQDWUdsaMHu=s900-c-k-c0x00ffffff-no-rj"
                        />
                        <Stories
                            url="https://image.winudf.com/v2/image/Y29tLmd5bXJhZGlvLnJhZGlvX2FwcF9pY29uXzE1MTE3MjQ4MjdfMDAx/icon.png?w=&fakeurl=1"
                        />
                    </View>
                </ScrollView>
            </View>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    return (
                        <Songs
                            file={item.file}
                            artist={item.artist}
                            title={item.title}
                        />
                    )
                }}
            />
        </View>
    )
}

const Songs = ({ file, title, artist }) => {
    const navigation = useNavigation();

    return (
        <View>
            <Image source={require('../assets/photo.png')} style={{
                width: 30,
                height: 30,
                borderRadius: 999,
                position: "absolute",
                left: 10,
                top: 45,
                zIndex: 100,
                borderWidth: 1.5,
                borderColor: "#FFFFFF"
            }} />
            <View style={styles.main}>
                <TouchableOpacity onPress={() => navigation.navigate("Play", {
                    url: file,
                    artist: artist,
                    title: title
                })}>
                    <View style={{
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Text 
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{
                            color: "white",
                            fontWeight: "bold",
                            fontSize: 15
                        }}>{title}</Text>
                        <Text style={{
                            color: "gray"
                        }}>{artist}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}


export default Music

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#6ea4f0",
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15
    },
    search: {
        backgroundColor: "#0E2A47",
        marginTop: 10,
        paddingVertical: 5,
        display: "flex",
        justifyContent: 'space-between',
        alignItems: "center",
        borderRadius: 45,
        flexDirection: "row",
        paddingHorizontal: 20,
        color: "white",
        marginLeft: 20,
        marginRight: 20
    },
    input: {
        height: 40,
        flex: 1,
        color: "grey",
        borderRadius: 30,
        paddingLeft: 10,
        color: "white"
    },
    stories: {
        marginTop: 20,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row"
    },
    songs: {
        marginTop: 20,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 110
    },
    main: {
        backgroundColor: "#0E2A47",
        marginTop: 10,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: "center",
        borderRadius: 12,
        flexDirection: "row",
        color: "white",
        marginHorizontal: 20,
        paddingVertical: 10,
        paddingHorizontal: 10
    }
})
