import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { images } from "../assets";
import { useNavigation } from "@react-navigation/native";
import { routes } from "../navigation/routes";
import { CheckedIcon, PensolIcon, XIcon } from "../assets/icons/icons";
import { colors } from "../constants/color";

interface IPassangerProp {
  item: any;
}

const PassagerMyOrderItem = ({ item }: IPassangerProp) => {
  let navigation = useNavigation();
  return (
    <>
      <View
        style={{
          backgroundColor: colors.white,
          paddingVertical: 20,
          paddingHorizontal: 15,
          marginBottom: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>
              {item.cost}
            </Text>
            <Text
              style={{
                marginLeft: 5,
                fontWeight: "bold",
                color: "gray",
                fontSize: 17,
              }}
            >
              so'm
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Image
              source={images.seat}
              style={{
                width: 25,
                height: 25,
                tintColor: colors.black,
                marginTop: 1,
              }}
            />
            <Text
              style={{
                fontSize: 17,
                fontWeight: "500",
                marginRight: 15,
                marginTop: 1,
              }}
            >
              {item.seat_count}
            </Text>
            <TouchableOpacity style={styles.seatbutton}>
              <Text style={{ color: colors.darkGreen, opacity: 0.8 }}>
                {item.seat_count_label}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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
              {item.from_full_address}
            </Text>
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
          <Text
            style={{
              fontSize: 15,
              fontWeight: "normal",
              color: colors.black,
            }}
          >
            {item.to_full_address}
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontSize: 15,
              marginTop: 12,
              opacity: 0.7,
              color: "gray",
            }}
          >
            {item.note}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ marginTop: 5, color: "gray" }}>#{item.id}</Text>
            <View style={{ flexDirection: "row" }}>
              <Image
                source={images.eye}
                style={{
                  width: 18,
                  height: 18,
                  opacity: 0.7,
                  marginTop: 2,
                }}
              />
              <Text
                style={{
                  marginLeft: 5,
                  marginBottom: 15,
                  opacity: 0.7,
                }}
              >
                0
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            borderTopWidth: 1,
            borderStyle: "solid",
            borderColor: colors.grey,
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 10,
            alignItems: "center",
            marginVertical: -10,
          }}
        >
          <View style={styles.borderBottom}>
            <Image
              source={{ uri: item.creator_avatar }}
              style={{
                width: 35,
                height: 35,
                borderRadius: 25,
              }}
            />
            <View>
              <Text
                style={{
                  marginLeft: 10,
                  color: "gray",
                  fontWeight: "500",
                }}
              >
                {!!item.creator_name ? item.creator_name : "Anonim"}
              </Text>
              <Text
                style={{
                  marginLeft: 10,
                  color: "gray",
                  fontWeight: "600",
                }}
              >
                {item.created_at}
              </Text>
            </View>
          </View>
          <View
            style={{
              marginTop: 20,
              flexDirection: "row",
            }}
          >
            <TouchableOpacity style={styles.btn1}>
              <XIcon />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.pensolbutton}
              onPress={() =>
                navigation.navigate(routes.EDIT_PASSENGER, {
                  id: item.id,
                })
              }
            >
              <PensolIcon />
            </TouchableOpacity>
            <TouchableOpacity style={styles.checkedbutton}>
              <CheckedIcon />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

export default PassagerMyOrderItem;

const styles = StyleSheet.create({
  btn1: {
    borderWidth: 1.5,
    borderColor: "red",
    borderRadius: 25,
    paddingHorizontal: 11,
    paddingVertical: 11,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 6,
  },
  borderBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
  },
  xicon: {
    width: 15,
    height: 15,
    tintColor: "red",
  },
  pensolbutton: {
    borderWidth: 1.5,
    borderColor: "orange",
    borderRadius: 25,
    paddingHorizontal: 11,
    paddingVertical: 5,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 6,
  },
  pensolicon: {
    width: 15,
    height: 15,
  },
  checkedicon: {
    width: 15,
    height: 15,
  },
  checkedbutton: {
    borderWidth: 1.5,
    borderColor: "green",
    borderRadius: 25,
    paddingHorizontal: 11,
    paddingVertical: 5,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 6,
  },
  seatbutton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#dbfaec",
    padding: 5,
    borderRadius: 10,
    opacity: 0.7,
  },
});
