import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { images } from "../assets";

export default function MailItem({ item }) {
  console.log("item ", item);

  return (
    <View
      style={{
        backgroundColor: "#fff",
        paddingVertical: 21,
        paddingHorizontal: 16,
        borderWidth: 0.5,
        borderColor: "#ccc",
        marginBottom: 10,
        borderRadius: 10,
      }}
    >
      <View
        style={{
          paddingBottom: 15,
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
          }}
        >
          <Image source={images.coin} />
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 15,
              marginLeft: 12,
            }}
          >
            {item.cash_amount} sum
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#48bd92",
            paddingHorizontal: 10,
            borderRadius: 5,
            opacity: 0.4,
          }}
        >
          <Text>{item.status}</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            style={{
              width: 10,
              height: 10,
              marginRight: 12,
            }}
            source={images.ellipse}
          />
          <Text style={{ fontSize: 15, fontWeight: "normal" }}>
            {item.from_full_address}
          </Text>
        </View>
        <View>
          <Text style={{ color: "#8A8A8A", fontSize: 12 }}>#{item.id}</Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: -5.3,
        }}
      >
        <Image
          style={{ width: 10, height: 10, marginRight: 12 }}
          source={images.ellipse}
        />
        <Text
          style={{
            fontSize: 15,
            fontWeight: "normal",
            color: "#000",
          }}
        >
          {item.to_full_address}
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
        <Text
          style={{
            marginLeft: 10,
            color: "#8a8a8a",
            fontSize: 15,
          }}
        >
          Amal qilish muddati:
        </Text>
        <Text style={{ fontWeight: "bold", fontSize: 17 }}>
          {" "}
          {item.expired_at}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <Image source={images.security} />
        <Text
          style={{
            marginLeft: 10,
            color: "#8a8a8a",
            fontSize: 15,
          }}
        >
          Sug'urta summasi:
        </Text>
        <Text style={{ fontWeight: "bold", fontSize: 17 }}>
          {" "}
          {item.insurance_amount} sum
        </Text>
      </View>
      <View
        style={{
          marginTop: 22,
          flexDirection: "row-reverse",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            style={{
              width: 40,
              height: 40,
              borderRadius: 30,
              resizeMode: "contain",
            }}
            source={{
              uri: item.creator_avatar,
            }}
          />
          <View style={{ paddingLeft: 15 }}>
            <Text>{item.creator_name ? item.creator_name : "Anonim"}</Text>
            <Text>{item.created_at}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.btn1}>
          <Image style={{ width: 16.84, height: 16.84 }} source={images.plus} />
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
  );
}
const styles = StyleSheet.create({
  btn1: {
    borderWidth: 1,
    borderColor: "#bf9100",
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 8,
    backgroundColor: "#FFCD30",
    flexDirection: "row",
    alignItems: "center",
  },
});
