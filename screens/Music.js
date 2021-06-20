import React from 'react'
import { StyleSheet, View, ScrollView, TextInput, Text, SafeAreaView } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import Stories from './Stories'
import Songs from './Songs'

const Music = () => {
    return (
        <SafeAreaView>
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
                            <Songs />
                        </View>
                </ScrollView>
        </SafeAreaView>
    )
}

export default Music

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF"
    },
    search: {
        backgroundColor: "#0E2A47",
        marginTop: 50,
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
        marginBottom: 80
    }
})
