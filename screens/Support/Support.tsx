import axios from "axios";
import React from "react";
import {
  Alert,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { url } from "../../api/requests";
import { CallIcon, MailIcon, TelegramIcon } from "../../assets/icons/icons";
import { colors } from "../../constants/color";

const SupportView = () => {
  const handleCallPress = async () => {
    await Linking.openURL("tel:+998 55 500 55 11");
  };

  const handleEmailPress = async () => {
    await Linking.openURL("mailto:info@100k.uz?");
  };

  const handleTelegramPress = async () => {
    await Linking.openURL("https://t.me/yuzka");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.call}>Aloqa uchun</Text>
      <View style={styles.box}>
        <View style={styles.callBox}>
          <CallIcon size={30} />
          <Text style={styles.callnumber}>Call center:</Text>
          <TouchableOpacity onPress={handleCallPress}>
            <Text style={styles.number}>{"+998 55 500 55 11"}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.callBoxs}>
          <MailIcon size={30} />
          <Text style={styles.callnumber}>Elektron pochta:</Text>
          <TouchableOpacity onPress={handleEmailPress}>
            <Text style={styles.number}>info@100k.uz</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.callBoxs}>
          <TelegramIcon size={30} />
          <Text style={styles.callnumber}>Telegram</Text>
          <TouchableOpacity onPress={handleTelegramPress}>
            <Text style={styles.number}>@yuzka</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SupportView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  call: {
    fontSize: 30,
    textAlign: "center",
    marginVertical: 20,
  },
  box: {
    width: 350,
    height: 500,
    elevation: 4,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30,
    backgroundColor: colors.white,
    borderRadius: 10,
  },
  callBox: {
    marginVertical: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  callnumber: {
    fontSize: 16,
    paddingTop: 20,
    paddingVertical: 10,
  },
  number: {
    fontSize: 16,
    paddingTop: 5,
    color: colors.darkBlue,
  },
  callBoxs: {
    alignItems: "center",
    marginTop: 20,
  },
});
