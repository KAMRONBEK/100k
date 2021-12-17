import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { images } from "../assets";

const TransportItem = ({ item }) => {
  console.log(item.images, "item");

  return (
    <View style={{ flex: 1, backgroundColor: "#f3f3f5" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 5,
        }}
      >
        {item.images &&
          item.images.map((e) => {
            return (
              <Image style={{ width: 100, height: 79 }} source={{ uri: e }} />
            );
          })}
      </View>
      <View style={{ backgroundColor: "#fff" }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 16,
            marginTop: 10,
          }}
        >
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              {item.from_full_address}
            </Text>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              {item.to_full_address}
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontWeight: "300",
                color: "#8a8a8a",
                fontSize: 10,
              }}
            >
              # {item.id}
            </Text>
          </View>
        </View>
        <View style={{ paddingHorizontal: 16, marginTop: 12 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image source={images.clock} />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "500",
                  color: "#8a8a8a",
                }}
              >
                Заказ активен до:
              </Text>
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                {item.created_at}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 11,
            }}
          >
            <Image source={images.security} />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "500",
                  color: "#8a8a8a",
                }}
              >
                Страховая сумма:
              </Text>
              <Text style={{ fontSize: 15, fontWeight: "bold" }}> 0 сум</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 16,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
              <Image style={{ width: 25, height: 25 }} source={images.coin} />
              <View style={{ flexDirection: "row", marginLeft: 10 }}>
                <Text style={{ fontSize: 15, color: "#8a8a8a" }}>
                  {item.cost_type}
                </Text>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                  {" "}
                  {item.cost}
                </Text>
              </View>
            </View>
            <View>
              <TouchableOpacity
                style={{
                  borderRadius: 8,
                  borderColor: "#BF9100",
                  borderWidth: 1,
                  backgroundColor: "#ffcc33",
                  flexDirection: "row",
                  paddingHorizontal: 22,
                  paddingVertical: 11,
                  alignItems: "center",
                }}
              >
                <Image
                  style={{
                    width: 16.84,
                    height: 16.84,
                    marginRight: 8,
                  }}
                  source={images.plus}
                />
                <Text>Qarash</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={{ height: 2, backgroundColor: "#d8d8d8", marginTop: 8 }}
        ></View>
        <View
          style={{
            paddingHorizontal: 16,
            marginTop: 12,
            marginBottom: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
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
                source={{ uri: item.creator_avatar }}
              />

              <View style={{ marginLeft: 7 }}>
                <Text style={{ color: "#8a8a8a", fontSize: 14 }}>
                  {item.creator_name ? item.creator_name : "Anonim"}
                </Text>
                <Text style={{ color: "#8a8a8a", fontSize: 12 }}>
                  {item.created_at_label}
                </Text>
              </View>
            </View>
            <View>
              <Image source={images.sec2} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TransportItem;
