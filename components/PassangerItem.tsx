import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { images } from "../assets";
import { CheckedIcon, PensolIcon, XIcon } from "../assets/icons/icons";
import { colors } from "../constants/color";
import user, { selectUser } from "../redux/slices/user/user";

interface IPassangerProp {
  item: any;
  editable?: boolean;
}

const PassangerItem = ({ item, editable }: IPassangerProp) => {
  let user = useSelector(selectUser);
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
              <Text style={styles.seatbuttontxt}>{item.seat_count_label}</Text>
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
            <View style={styles.avatarwrapper}>
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
                  {user.id == item.creator_id && " (siz)"}
                  {/* {user.id == item.creator_id ? "( siz)" : " (begona)"} */}
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
            {editable ? (
              <View
                style={{
                  marginHorizontal: 10,
                  marginLeft: 30,
                  flexDirection: "row",
                }}
              >
                <TouchableOpacity style={styles.iconsbutton}>
                  <XIcon size={15} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.pensolbutton}
                  onPress={() =>
                    navigation.navigate(routes.EDIT_LOAD, {
                      id: item.id,
                    })
                  }
                >
                  <PensolIcon size={15} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.checkedbutton}>
                  <CheckedIcon size={15} />
                </TouchableOpacity>
              </View>
            ) : (
              user.id !== item.creator_id && (
                <>
                  <View
                    style={{
                      marginTop: 20,
                    }}
                  >
                    <TouchableOpacity style={styles.btn1}>
                      <Image source={images.plus} />
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
                </>
              )
            )}
          </View>
        </View>
      </View>
    </>
  );
};

export default PassangerItem;

const styles = StyleSheet.create({
  btn1: {
    borderColor: colors.darkOrange,
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 10,
    backgroundColor: colors.lightOrange,
    flexDirection: "row",
    alignItems: "center",
  },
  borderBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  seatbutton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#dbfaec",
    padding: 5,
    borderRadius: 10,
    opacity: 1,
  },
  seatbuttontxt: {
    color: colors.darkGreen,
  },
  pensolbutton: {
    borderWidth: 1.5,
    borderRadius: 25,
    paddingHorizontal: 11,
    paddingVertical: 5,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 6,
    borderColor: colors.orange,
    backgroundColor: colors.orange,
  },
  checkedbutton: {
    marginLeft: 6,
    borderWidth: 1.5,
    borderRadius: 25,
    paddingVertical: 5,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 11,
    backgroundColor: colors.greenLigth,
    borderColor: colors.greenLigth,
  },
  iconsbutton: {
    marginLeft: 6,
    borderWidth: 1.5,
    borderRadius: 25,
    paddingVertical: 11,
    alignItems: "center",
    paddingHorizontal: 11,
    justifyContent: "center",
    borderColor: colors.lightCoral,
    backgroundColor: colors.lightCoral,
  },
  avatarwrapper: {
    flexDirection: "row",
  },
});
