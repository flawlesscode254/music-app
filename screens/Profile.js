import React from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground, Dimensions, Image, SafeAreaView } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";

const h = Dimensions.get("window").height;
const Profile = () => {
    return (
        <SafeAreaView>
        <View
            style={{
                backgroundColor: "#241332",
            }}
        >
        <ImageBackground
        source={{ uri: "https://images.unsplash.com/photo-1600119692885-8b04faa7f329?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=749&q=80" }}
        style={{
          height: 0.30 * h,
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
          <TouchableOpacity style={{
              marginBottom: 20
          }}>
                <Ionicons name="add-circle-outline" size={60} color="#F69237" />
            </TouchableOpacity>
      </View>
      </View>
       <ScrollView style={{
          backgroundColor: "#FFF"
      }}>
          <View style={{
              marginBottom: 300
          }}>
            <Songs />
            <Songs />
            <Songs />
            <Songs />
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

const Songs = () => {
    return (
        <View style={styles.main}>
            <Image source={require('../assets/photo.png')} style={{
                width: 30,
                height: 30,
                borderRadius: 999,
                marginRight: 10,
                marginLeft: 10
            }} />
            <TouchableOpacity>
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
            }} name="checkmark" color="#46C48A" size={24} />
            <Ionicons style={{
                 marginRight: 10,
                marginLeft: 10
            }} name="trash-outline" color="red" size={24} />
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    main: {
        backgroundColor: "#241332",
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
