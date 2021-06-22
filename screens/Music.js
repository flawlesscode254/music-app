import React from 'react'
import { StyleSheet, View, ScrollView, TextInput, SafeAreaView, TouchableOpacity, Image, Text, StatusBar } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import Stories from './Stories'
import { useNavigation } from '@react-navigation/native';

const Music = () => {
    return (
        <SafeAreaView>
            <StatusBar barStyle="light-content" backgroundColor="#0E2A47" />
            <View style={styles.container}>
                <View style={styles.search}>
                    <Ionicons name="musical-notes" color="#46C48A" size={24} />
                    <TextInput style={styles.input} placeholderTextColor = "#FFF" placeholder="Enter to search..." />
                    <Ionicons name="search" color="#F69237" size={24} />
                </View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
                    <View style={styles.stories}>
                        <Stories />
                        <Stories />
                        <Stories />
                        <Stories />
                    </View>
                </ScrollView>
            </View>
                <ScrollView>
                        <View style={styles.songs}>    
                            <Songs />
                            <Songs />
                            <Songs />
                            <Songs />
                            <Songs />
                            <Songs />
                            <Songs />
                            <Songs />
                        </View>
                </ScrollView>
        </SafeAreaView>
    )
}

const Songs = () => {
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
            <TouchableOpacity onPress={() => navigation.navigate("Play")}>
                <View style={{
                 marginRight: 10,
                 marginLeft: 10
                }}>
                    <Text style={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: 15
                    }}>All Into Nothing</Text>
                    <Text style={{
                        color: "gray"
                    }}>Adam Melchor, Lennon Stella</Text>
                </View>
            </TouchableOpacity>
            
            <Ionicons style={{
                 marginRight: 10,
                 marginLeft: 10
            }} name="heart-outline" color="#FFF" size={24} />
            <Ionicons style={{
                 marginRight: 10,
                marginLeft: 10
            }} name="download-outline" color="#FFF" size={24} />
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
