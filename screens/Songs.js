import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

const Songs = () => {
    return (
        <View style={styles.container}>
            <Image source={require('../assets/photo.png')} style={{
                width: 30,
                height: 30,
                borderRadius: 999,
                marginRight: 10,
                marginLeft: 10
            }} />
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
            <Ionicons style={{
                 marginRight: 10,
                 marginLeft: 10
            }} name="play" color="#FFF" size={24} />
            <Ionicons style={{
                 marginRight: 10,
                marginLeft: 10
            }} name="ellipsis-vertical" color="#FFF" size={24} />
        </View>
    )
}

export default Songs

const styles = StyleSheet.create({
    container: {
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
