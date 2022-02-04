import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { images } from "../assets";
import { colors } from "../constants/color";
import { routes } from "../navigation/routes";

const LoginProfile = () => {
  let navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <Image source={images.bee} style={styles.bee} />
        <Text style={styles.h1}>100K Expressga xush kelibsiz</Text>
        <Text style={styles.headerParagraph}>
          Taksi chaqirish, pochta yuborish transport izlash xizmatlaridan
          foydalanish uchun tizimga kiring. Agar sizda profil yaratilmagan
          bo'lsa muommmo yo'q, profil yaratish uchun telefon raqamingizni
          kiritsangiz bas.
        </Text>
      </View>
      <View style={styles.signInBtnView}>
        <TouchableOpacity
          style={styles.signInBtn}
          activeOpacity={0.6}
          onPress={() => navigation.navigate(routes.LOGIN)}
        >
          <Text style={styles.signInText}>Kirish yoki profil ochish</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerView: {
    alignItems: "center",
    flexDirection: "column",
    marginVertical: 20,
  },
  bee: {
    width: 100,
    height: 100,
  },
  h1: {
    fontSize: 20,
    fontWeight: "bold",
    width: 220,
    textAlign: "center",
    marginTop: 20,
  },
  headerParagraph: {
    fontSize: 18,
    textAlign: "center",
    marginHorizontal: 50,
    marginTop: 20,
  },
  signInBtnView: {
    paddingHorizontal: 20,
    marginTop: 300,
  },
  signInBtn: {
    backgroundColor: colors.lightOrange,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: "center",
  },
  signInText: {
    fontSize: 17,
  },
});
