import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  ImageBackground,
} from "react-native";
import { PlusIcon } from "../../assets/icons/icons";

import { images } from "../../assets/index";

export function ImagePickerAvatar({ uri, onPress }) {
  return (
    <View style={styles.avatar}>
      <Image
        style={styles.avatarImage}
        source={uri ? { uri } : images.avatar}
      />
      <TouchableOpacity style={styles.addButton} onPress={onPress}>
        <PlusIcon size={25} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
  },
  avatar: {
    resizeMode: "contain",
    backgroundColor: "#f3f4f5",
  },
  avatarImage: {
    height: 80,
    width: 80,
    borderColor: "#8a8a8a",
    overflow: "hidden",
    borderWidth: 1,
    borderRadius: 260 / 2,
    backgroundColor: "#000",
  },
  addButton: {
    height: 30,
    width: 30,
    backgroundColor: "#fff",
    borderRadius: 50,
    top: 55,
    left: 50,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addButtonIcon: {
    height: 35,
    width: 35,
  },
});
