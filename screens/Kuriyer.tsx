import React, { useState } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput,
} from "react-native";
import { TextInputMask } from "react-native-masked-text";
import { Checkbox } from "react-native-paper";
import { images } from "../assets";
import ImagePicker from "../components/ImagePicker";
import { routes } from "../navigation/routes";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { ScrollView } from "react-native-gesture-handler";
import { colors } from "../constants/color";

const Kuriyer = ({ navigation }) => {
  const [name, setName] = useState(null);
  const [surname, setSurname] = useState(null);
  const [number, setNumber] = useState(null);
  const [useCar, setUseCar] = useState(false);
  const [autoData, setAutoData] = useState("");
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={images.leftArrow} />
        </TouchableOpacity>
        <Text style={{ fontSize: 20 }}>Kuryer bo'lish</Text>
        <View></View>
      </View>
      <ScrollView>
        <View style={{ paddingHorizontal: 16, marginTop: 28 }}>
          <Text style={{ color: colors.darkGray }}>Izmingizni kiriting *</Text>
          <TextInput
            value={name!}
            onChangeText={setName}
            style={[styles.input, { backgroundColor: colors.white }]}
          />
          <Text style={{ color: colors.darkGray, marginTop: 20 }}>
            Familiyangizni kiriting *
          </Text>
          <TextInput
            value={surname!}
            onChangeText={setSurname}
            style={[styles.input, { backgroundColor: colors.white }]}
          />
          <Text style={{ color: colors.darkGray, marginTop: 20 }}>
            Telefon raqamingizni kiriting *
          </Text>
          <TextInputMask
            type={"custom"}
            options={{
              mask: "+999 99 999 99 99",
            }}
            value={number!}
            onChangeText={setNumber}
            style={[styles.input, { backgroundColor: colors.white }]}
            keyboardType="phone-pad"
            placeholder="+998"
          />
          <Text
            style={{
              color: colors.darkGray,
              marginTop: 20,
              marginBottom: 13,
            }}
          >
            Pasport bilan rasm *
          </Text>
          <View
            style={{
              backgroundColor: colors.white,
              flexDirection: "row",
              paddingRight: 90,
              alignItems: "center",
              paddingTop: 14,
            }}
          >
            <Image style={{ marginRight: 14 }} source={images.selfie} />
            <View>
              <Text style={{ color: colors.darkGray }}>
                Pasportingiz qolingizga ushab rasimga tushing, orqa tomoningizda
                bir xil rangdagi rasm bolishi kerak
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              paddingVertical: 10,
            }}
          >
            <Checkbox.Android
              color={"black"}
              uncheckedColor={colors.gray}
              status={useCar ? "checked" : "unchecked"}
              onPress={() => setUseCar(!useCar)}
            />
            <TouchableOpacity>
              <Text>Avtomobilda hizmat korsatish</Text>
            </TouchableOpacity>
          </View>
          <Text style={{ color: colors.darkGray, marginTop: 20 }}>
            Avtomobil haqida ma'lumot *
          </Text>
          <TextInput
            value={autoData!}
            onChangeText={setAutoData}
            style={[styles.input, { backgroundColor: colors.white }]}
            placeholder="Qora, 01 AB 122 C"
          />
          <Text style={{ color: colors.darkGray, marginTop: 20 }}>
            Avtomobil haqida ma'lumot *
          </Text>
          <View
            style={{
              backgroundColor: colors.white,
              flexDirection: "row",
              paddingRight: 90,
              alignItems: "center",
              paddingTop: 14,
            }}
          >
            <View
              style={{
                width: 80,
                borderRightWidth: 1,
                borderRightColor: colors.gray,
                marginRight: 10,
                padding: 10,
              }}
            >
              <Image
                style={{
                  marginRight: 14,
                  height: 60,
                  width: 60,
                }}
                source={images.user}
              />
            </View>
            <View>
              <Text style={{ color: colors.darkGray }}>
                Pasportingiz qolingizga ushab rasimga tushing, orqa tomoningizda
                bir xil rangdagi rasm bolishi kerak
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default Kuriyer;
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  inputView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: colors.white,
    paddingHorizontal: 14,
    paddingVertical: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.lightgray,
    borderRadius: 7,
    justifyContent: "space-between",
  },
  input: {
    borderWidth: 1,
    borderColor: colors.lightgray,
    borderRadius: 10,
    padding: 14,
    marginTop: 10,
  },
  btnOne: {
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 10,
    borderColor: colors.lightgray,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  btn: {
    paddingHorizontal: 13,
    paddingVertical: 12,
    borderColor: colors.darkOrange,
    borderRadius: 7,
    borderWidth: 1,
    marginRight: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
    marginRight: 20,
    color: colors.darkGray,
  },
});
