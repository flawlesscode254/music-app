import React from 'react'
import { StyleSheet, View, Image } from 'react-native'

const Stories = () => {
    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image style={{
                    width: 150,
                    height: 150,
                    borderRadius: 25,
                    marginLeft: 20
                }} source={require('../assets/one.jpg')} />
                    <Image style={{
                        width: 45,
                        height: 45,
                        borderRadius: 999,
                        position: "absolute",
                        top: 10,
                        bottom: 0,
                        left: 30,
                        borderWidth: 4,
                        borderColor: "blue"
                    }} source={require('../assets/photo.png')} />
            </View>
        </View>
    )
}

export default Stories

const styles = StyleSheet.create({
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    profile: {
        width: 150,
        borderRadius: 25,
        height: 200,
        marginRight: 30
    }
})
