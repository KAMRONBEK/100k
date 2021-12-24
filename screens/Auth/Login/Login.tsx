import React, { useState } from "react";
import { TextInputMask } from "react-native-masked-text";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import Api from "../../../Api";
import { useRequestPasswordHook } from "../hooks";
import { colors } from "../../../constants/color";

const Login = ({ navigation }) => {
  const [username, changeUsername, loading, onSubmit] =
    useRequestPasswordHook();
  return (
    <View style={styles.container}>
      <View>
        <Image source={require("../../../assets/bee.png")} />
      </View>
      <View style={{ marginTop: 50 }}>
        <Text style={{ color: colors.white, fontWeight: "bold", fontSize: 20 }}>
          Avtorizatsiya
        </Text>
      </View>
      <View style={styles.forms}>
        <Image
          style={{ width: 15, height: 15 }}
          source={require("../../../assets/phone-call.png")}
        />
        <TextInputMask
          type={"custom"}
          options={{
            mask: "+999 99 999 99 99",
          }}
          keyboardType={"phone-pad"}
          value={username.toString()}
          onChangeText={changeUsername}
          style={styles.input}
          placeholder="Telefon"
          placeholderTextColor={colors.white}
        />
        {/*<TextInput*/}
        {/*    style={styles.input}*/}
        {/*    onChangeText={changeUsername}*/}
        {/*    value={username}*/}
        {/*    placeholder="Telefon"*/}
        {/*    placeholderTextColor={'#fff'}*/}
        {/*    keyboardType="phone-pad"*/}
        {/*/>*/}
      </View>
      <View style={{ width: "80%", marginTop: 40 }}>
        <TouchableOpacity
          onPress={onSubmit}
          // onPress={() => navigation.navigate(routes.CODE)}
          style={{
            borderRadius: 8,
            width: "100%",
            backgroundColor: colors.brightOrange,
            paddingVertical: 15,
          }}
        >
          {loading ? (
            <ActivityIndicator size={"large"} color={"red"} />
          ) : (
            <Text style={{ textAlign: "center" }}>Kodni yuborish</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.yellowOrange,
  },
  input: {
    padding: 10,
    color: colors.white,
    flex: 1,
  },
  forms: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    backgroundColor: colors.darkGreyTwo,
    paddingHorizontal: 20,
    width: "80%",
    borderRadius: 10,
    borderColor: colors.darkGreyTwo,
    opacity: 0.8,
    marginTop: 60,
  },
});
