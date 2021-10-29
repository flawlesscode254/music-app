import React from 'react'
import { StyleSheet, View, Image } from 'react-native'

const Stories = ({ url }) => {
    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image 
                    style={{
                        width: 150,
                        height: 150,
                        borderRadius: 25,
                        marginLeft: 20
                    }} 
                    source={{
                        uri: url
                    }}
                />
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
