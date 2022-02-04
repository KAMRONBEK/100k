import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInputMask } from "react-native-masked-text";
import { images } from "../../../assets";
import { colors } from "../../../constants/color";
import { routes } from "../../../navigation/routes";
import { useRequestPasswordHook } from "../hooks";

const Login = () => {
  const [username, changeUsername, loading, onSubmit] =
    useRequestPasswordHook();
  let navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View>
        <Image source={images.bee} />
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
          activeOpacity={0.6}
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
