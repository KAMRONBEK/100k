import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { images } from "../assets";
import CheckedIcon from "../assets/icons/CheckedIcon";
import Pensolicon from "../assets/icons/Pensolicon";
import Xicon from "../assets/icons/Xicon";
import { routes } from "../navigation/routes";
import { selectUser } from "../redux/slices/user/user";

interface ILoadProp {
  item: any;
  editable?: boolean;
}

const LoadItem = ({ item, editable }: ILoadProp) => {
  let user = useSelector(selectUser);
  let navigation = useNavigation();

  return (
    <>
      <View
        style={{
          backgroundColor: "#fff",
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
            <TouchableOpacity
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#dbfaec",
                opacity: 0.7,
                padding: 5,
                borderRadius: 10,
              }}
            >
              <Text style={{ color: "#2e8c60", opacity: 0.8 }}>
                {item.weight}
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
              color: "#000",
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
            <Text style={{ color: "gray" }}>-{item.matter}</Text>
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
            borderColor: "#d2d4d4",
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
                  // marginTop: 20,
                  flexDirection: "row",
                }}
              >
                <TouchableOpacity style={styles.iconsbutton}>
                  <Xicon />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.pensolbutton}
                  onPress={() =>
                    navigation.navigate(routes.EDIT_LOAD, {
                      id: item.id,
                    })
                  }
                >
                  <Pensolicon />
                </TouchableOpacity>
                <TouchableOpacity style={styles.checkedbutton}>
                  <CheckedIcon />
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

export default LoadItem;

const styles = StyleSheet.create({
  btn1: {
    borderColor: "#bf9100",
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 10,
    backgroundColor: "#FFCD30",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 60,
    marginBottom: 10,
  },
  borderBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    paddingTop: 10,
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
  iconsbutton: {
    borderWidth: 1.5,
    borderColor: "red",
    borderRadius: 25,
    paddingHorizontal: 11,
    paddingVertical: 11,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 6,
  },
  avatarwrapper: {
    flexDirection: "row",
  },
});
