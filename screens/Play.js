import React, { useState, useEffect } from "react";
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
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { Sound } from "expo-av/build/Audio/Sound";
import { useNavigation } from "@react-navigation/core";

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;

const Profile = ({ route }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [sound, setSound] = useState();
  const [duration, setDuration] = useState();
  const [current, setCurrent] = useState();
  const [bar, setBar] = useState(0);
  const [checker, setCheker] = useState(0);
  const [song, setSong] = useState(null);
  const [artist, setArtist] = useState(null)
  const [title, setTitle] = useState(null)

  const navigation = useNavigation()

  navigation.addListener("focus", () => {
    if (route.params) {
      const { url, artist, title } = route.params
      setSong(url);
      setArtist(artist)
      setTitle(title)
    }
  })

  const onPlaybackStatusUpdate = (status) => {
    let a = status.durationMillis;
    var minutes = Math.floor(a / 60000);
    var seconds = ((a % 60000) / 1000).toFixed(0);
    let time = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;

    let b = status.positionMillis;
    var minutes = Math.floor(b / 60000);
    var seconds = ((b % 60000) / 1000).toFixed(0);
    let curr = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;

    setIsPlaying(status.isPlaying);
    setDuration(time);
    setCurrent(curr);
    setCheker(status.durationMillis);
    setBar(status.positionMillis);
  };

  const playCurrentSong = async () => {
    if (sound) {
      await sound.unloadAsync();
    }

    const { sound: newSound } = await Sound.createAsync(
      { uri: song },
      {
        shouldPlay: isPlaying,
        isLooping: true
      },
      onPlaybackStatusUpdate
    );

    setSound(newSound);
  };

  useEffect(() => {
    if (song) {
      playCurrentSong();
    }
  }, [song]);

  const playSound = async () => {
    await setIsPlaying(false);
    if (!sound) {
      return;
    }
    await sound.playAsync();
  };

  const pauseSound = async () => {
    await setIsPlaying(true);
    await sound.pauseAsync();
  };

  return (
    <ScrollView
      style={{
        backgroundColor: "#241332",
      }}
    >
      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
        }}
        style={{
          height: 0.3 * h,
        }}
      >
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
        ></LinearGradient>
      </ImageBackground>

      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1525362081669-2b476bb628c3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
          }}
          style={{
            height: 200,
            width: 200,
            borderRadius: 999,
          }}
        />
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 15,
            marginTop: 20,
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            color: "gray",
          }}
        >
          {artist}
        </Text>
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Slider
            style={{ width: 300, height: 40 }}
            minimumValue={0}
            maximumValue={checker}
            value={bar}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="orange"
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            display: "flex",
            height: 30
          }}
        >
          {isPlaying && (
            <Text
              style={{
                color: "#FFF",
                marginRight: 200,
              }}
            >
              {current}
            </Text>
          )}
          {isPlaying && (
            <Text
              style={{
                color: "#FFF",
              }}
            >
              {duration}
            </Text>
          )}

        </View>
        <View style={{
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row"
        }}>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center"
            }}
            onPress={pauseSound}
          >
            <Ionicons name="repeat" color="#46C48A" size={25} />
          </TouchableOpacity>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginLeft: 50,
              marginRight: 50
            }}
          >
            {!isPlaying ? (
              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  alignItems: "center"
                }}
                onPress={playSound}
              >
                <Ionicons name="play-circle-outline" color="#46C48A" size={50} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  alignItems: "center"
                }}
                onPress={pauseSound}
              >
                <Ionicons name="pause-circle-outline" color="#46C48A" size={50} />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center"
            }}
            onPress={pauseSound}
          >
            <Ionicons name="volume-high" color="#46C48A" size={25} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({});
