import React, { useState, useEffect } from 'react'
import { FlatList, StyleSheet, View, ScrollView, TextInput, SafeAreaView, TouchableOpacity, Image, Text, StatusBar } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import Stories from './Stories'
import { useNavigation } from '@react-navigation/native';
import db from '../firebase';

const Music = () => {
    const [data, setData] = useState([])
    const [search, setSearch] = useState('')

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
        <SafeAreaView>
            <StatusBar barStyle="light-content" backgroundColor="#0E2A47" />
            <View style={styles.container}>
                <View style={styles.search}>
                    <Ionicons name="musical-notes" color="#46C48A" size={24} />
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
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
                    <View style={styles.stories}>
                        <Stories />
                        <Stories />
                        <Stories />
                        <Stories />
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
        </SafeAreaView>
    )
}

const Songs = ({ file, title, artist }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.main}>
            <Image source={require('../assets/photo.png')} style={{
                width: 30,
                height: 30,
                borderRadius: 999,
                marginRight: 10,
                marginLeft: 10
            }} />
            <TouchableOpacity onPress={() => navigation.navigate("Play", {
                url: file,
                artist: artist,
                title: title
            })}>
                <View style={{
                    marginRight: 10,
                    marginLeft: 10
                }}>
                    <Text style={{
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
    )
}


export default Music

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF"
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
        paddingVertical: 5,
        display: "flex",
        justifyContent: 'space-evenly',
        alignItems: "center",
        borderRadius: 12,
        flexDirection: "row",
        color: "white",
        marginLeft: 20,
        marginRight: 20,
        paddingVertical: 10
    }
})
