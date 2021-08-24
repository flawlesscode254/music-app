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

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;

const Profile = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [sound, setSound] = useState();
  const [duration, setDuration] = useState("0:00");
  const [current, setCurrent] = useState("0:00");
  const [bar, setBar] = useState(0);
  const [checker, setCheker] = useState(0);
  const [song, setSong] = useState(null);

  useEffect(() => {
    setSong(
      "https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/000/962/sanity-1623769237-KjJMmVoEli.mp3"
    );
  }, []);

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
      { shouldPlay: isPlaying },
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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            marginTop: 60,
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "gray",
              width: 35,
              height: 35,
              borderRadius: 999,
            }}
          >
            <Ionicons name="heart-outline" color="#FFF" size={24} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "gray",
              width: 35,
              height: 35,
              borderRadius: 999,
            }}
          >
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
          Sanity
        </Text>
        <Text
          style={{
            color: "gray",
          }}
        >
          MAGNUS, Whats Gud Today
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
          }}
        >
          <Text
            style={{
              color: "#FFF",
              marginRight: 200,
            }}
          >
            {current}
          </Text>
          <Text
            style={{
              color: "#FFF",
            }}
          >
            {duration}
          </Text>
        </View>

        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            marginTop: 10,
          }}
        >
          <TouchableOpacity
            style={{
              marginRight: 40,
            }}
          >
            <Ionicons name="volume-medium" size={20} color="#46C48A" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginRight: 40,
            }}
          >
            <Ionicons name="play-skip-back" size={20} color="#46C48A" />
          </TouchableOpacity>
          {!isPlaying ? (
            <TouchableOpacity
              style={{
                marginRight: 40,
              }}
              onPress={playSound}
            >
              <Ionicons name="play-circle-outline" color="#46C48A" size={50} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                marginRight: 40,
              }}
              onPress={pauseSound}
            >
              <Ionicons name="pause-circle-outline" color="#46C48A" size={50} />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={{
              marginRight: 40,
            }}
          >
            <Ionicons name="play-skip-forward" size={20} color="#46C48A" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="repeat" size={20} color="#46C48A" />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({});
