import React, { useState, useEffect, useRef } from "react";
import {
  ImageBackground,
  Dimensions,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { Audio } from 'expo-av';


const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;

const Profile = ({ navigation }) => {

    const [isplaying, setIsPlaying] = useState(true)
    const [sound, setSound] = useState();
    const [duration, setDuration] = useState("0:00")
    const [current, setCurrent] = useState("0:00")
    const [position, setPosition] = useState(0)
    const [bar, setBar] = useState(0)
    const [checker, setCheker] = useState(0)

    useEffect(() => {
        return sound
          ? () => {
              console.log('Unloading Sound');
              sound.unloadAsync(); }
          : undefined;
      }, [sound]);

      useEffect(() => {
        (async () => {
          await Audio.setAudioModeAsync({
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
            shouldDuckAndroid: true,
            staysActiveInBackground: true
          })
          const song = await new Audio.Sound();
          await song.loadAsync({ uri: "https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/000/962/sanity-1623769237-KjJMmVoEli.mp3"});
          await setSound(song)
        })()
      }, [])

    const playSound = async () => {
        setIsPlaying(false)
        sound.getStatusAsync()
            .then((result) => {
                let a = result.durationMillis
                setCheker(a)
                var minutes = Math.floor(a / 60000);
                var seconds = ((a % 60000) / 1000).toFixed(0);
                setDuration(minutes + ":" + (seconds < 10 ? '0' : '') + seconds)
        })
        await sound.playFromPositionAsync(position)
        {isplaying ? (
            setInterval(() => {
            sound.getStatusAsync()
            .then((result) => {
                let a = result.positionMillis
                setBar(a)
                var minutes = Math.floor(a / 60000);
                var seconds = ((a % 60000) / 1000).toFixed(0);
                setCurrent(minutes + ":" + (seconds < 10 ? '0' : '') + seconds)
        }) 
        }, 1000)
        ) : (
            console.log(a)
        )}
    }

    const pauseSound = async () => {
        setIsPlaying(true)
        sound.pauseAsync()
        sound.getStatusAsync()
        .then(async (result) => {
            let a = result.positionMillis
            await setPosition(a)
            var minutes = Math.floor(a / 60000);
            var seconds = ((a % 60000) / 1000).toFixed(0);
            await setCurrent(minutes + ":" + (seconds < 10 ? '0' : '') + seconds)
        })
    }

  return (
    <ScrollView
      style={{
        backgroundColor: "#241332",
      }}
    >
      <ImageBackground
        source={{ uri: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80" }}
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
                <Ionicons name="heart-outline" color="#FFF" size={24} />
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
            <Ionicons name="download-outline" color="#FFF" size={24} />
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
                alignItems: "center",
                marginTop: 20
            }}>
                <Image source={{ uri: "https://images.unsplash.com/photo-1525362081669-2b476bb628c3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80" }} style={{
                    height: 200,
                    width: 200,
                    borderRadius: 999
                }} />
                    <Text style={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: 15,
                        marginTop: 20
                    }}>Sanity</Text>
                        <Text style={{
                            color: "gray"
                    }}>MAGNUS, Whats Gud</Text>
                    <View style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                         <Slider
                            style={{width: 300, height: 40}}
                            minimumValue={0}
                            maximumValue={checker}
                            value={bar}
                            minimumTrackTintColor="#FFFFFF"
                            maximumTrackTintColor="orange"
                        />
                    </View>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        display: "flex"
                    }}>
                        <Text style={{
                            color: "#FFF",
                            marginRight: 200
                        }}>{current}</Text>
                        <Text style={{
                            color: "#FFF"
                        }}>{duration}</Text>
                    </View>
                     
                    <View style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexDirection: "row",
                        marginTop: 10
                    }}>
                        {isplaying ? (
                            <TouchableOpacity onPress={playSound} >
                                <Ionicons name="play-circle-outline" color="#46C48A" size={50} />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={pauseSound} >
                                <Ionicons name="pause-circle-outline" color="#46C48A" size={50} />
                            </TouchableOpacity>
                        )}
                    </View>
            </View>

    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
 
});
