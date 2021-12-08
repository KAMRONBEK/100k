import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { images } from "../assets";

interface IPassangerProp {
  item: any;
}

const PassangerItem = ({ item }: IPassangerProp) => {
  return (
    <View
      style={{
        backgroundColor: "#fff",
        paddingVertical: 21,
        paddingHorizontal: 16,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            style={{ width: 10, height: 10, marginRight: 12 }}
            source={images.ellipse}
          />
          <Text style={{ fontSize: 15, fontWeight: "normal" }}>
            Toshkent, Sergeli tumani
          </Text>
        </View>
        <View>
          <Text style={{ color: "#8A8A8A", fontSize: 12 }}>#12345678</Text>
        </View>
      </View>
      <Image
        style={{ height: 17, marginLeft: 4, marginTop: -5 }}
        source={images.lines}
      ></Image>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: -5.3,
        }}
      >
        <Image
          style={{ width: 10, height: 10, marginRight: 12 }}
          source={images.lines}
        />
        <Text style={{ fontSize: 15, fontWeight: "normal", color: "#000" }}>
          Toshkent, Yunusobod tumani
        </Text>
      </View>
      <View>
        <Text style={{ fontSize: 15, marginTop: 12 }}>
          - Siz viloyat filialiga etkazib berishingiz kerak.....
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 21,
        }}
      >
        <Image source={images.clock} />
        <Text style={{ marginLeft: 10, color: "#8a8a8a", fontSize: 15 }}>
          Amal qilish muddati:
        </Text>
        <Text style={{ fontWeight: "bold", fontSize: 17 }}> 30.02.23</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <Image source={images.security} />
        <Text style={{ marginLeft: 10, color: "#8a8a8a", fontSize: 15 }}>
          Sug'urta summasi:
        </Text>
        <Text style={{ fontWeight: "bold", fontSize: 17 }}>500 000 so'm</Text>
      </View>
      <View
        style={{
          marginTop: 22,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
          <Image source={images.coin} />
          <Text style={{ fontWeight: "bold", fontSize: 15, marginLeft: 12 }}>
            300 000
          </Text>
        </View>
        <View>
          <TouchableOpacity style={styles.btn1}>
            <Image
              style={{ width: 16.84, height: 16.84 }}
              source={images.plus}
            />
            <Text
              style={{
                marginLeft: 4,
                fontWeight: "normal",
                fontSize: 12,
              }}
            >
              QABUL QILISH
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PassangerItem;

const styles = StyleSheet.create({
  btn1: {
    borderWidth: 1,
    borderColor: "#bf9100",
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 11,
    backgroundColor: "#FFCD30",
    flexDirection: "row",
    alignItems: "center",
  },
});
