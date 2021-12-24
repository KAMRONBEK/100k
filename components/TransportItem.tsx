import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import Modal from "react-native-modal";
import { useDispatch, useSelector } from "react-redux";
import { images } from "../assets";
import {
  ArrowLeftIcon,
  CheckedIcon,
  PensolIcon,
  XIcon,
} from "../assets/icons/icons";
import { colors } from "../constants/color";
import { routes } from "../navigation/routes";
import { logoutUser, selectUser, update } from "../redux/slices/user/user";

interface ITransportProp {
  item: any;
  editable?: boolean;
}

const TransportItem = ({ item, editable }: ITransportProp) => {
  let user = useSelector(selectUser);
  let navigation = useNavigation();
  let dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const [isModalVisibleTwo, setModalVisibleTwo] = useState(false);

  const toggleModalTwo = () => {
    setModalVisibleTwo(!isModalVisibleTwo);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.lightWhite,
        marginBottom: 15,
        elevation: 4,
      }}
    >
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
              <Image
                style={{ width: 100, height: 79, resizeMode: "contain" }}
                source={{ uri: e }}
              />
            );
          })}
      </View>
      <View style={{ backgroundColor: colors.white }}>
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
                color: colors.darkGray,
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
                  color: colors.darkGray,
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
                  color: colors.darkGray,
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
                <Text style={{ fontSize: 15, color: colors.darkGray }}>
                  {item.cost_type}
                </Text>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                  {" "}
                  {item.cost}
                </Text>
              </View>
            </View>
            <View>
              <Image source={images.sec2} />
            </View>
          </View>
        </View>
        <View
          style={{ height: 2, backgroundColor: colors.greyTwo, marginTop: 8 }}
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
              marginHorizontal: 5,
              marginRight: 5,
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

              <View style={{ marginHorizontal: 5 }}>
                <Text
                  style={{
                    marginLeft: 10,
                    color: "gray",
                    fontWeight: "500",
                  }}
                >
                  {!!item.creator_name ? item.creator_name : "Anonim"}
                  {user.id == item.creator_id && " (siz)"}
                </Text>
                <View style={{ marginLeft: 10 }}>
                  <Text style={{ color: colors.darkGray, fontSize: 12 }}>
                    {item.created_at_label}
                  </Text>
                </View>
              </View>
            </View>
            {editable ? (
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <View>
                  <Modal
                    isVisible={isModalVisibleTwo}
                    testID={"modal"}
                    swipeDirection={["up", "left", "right", "down"]}
                    style={{ justifyContent: "center", margin: 0 }}
                  >
                    <View
                      style={{
                        backgroundColor: colors.white,
                        marginHorizontal: 30,
                        paddingVertical: 20,
                        paddingHorizontal: 20,
                        borderRadius: 10,
                      }}
                    >
                      <Text style={{ fontSize: 16 }}>Buyurtmangizni</Text>
                      <Text style={{ fontSize: 16 }}>o'chirmoqchimisiz?</Text>
                      <View
                        style={{
                          flexDirection: "row",
                          paddingVertical: 10,
                          marginLeft: 100,
                          marginHorizontal: 10,
                          marginTop: 10,
                          justifyContent: "space-evenly",
                        }}
                      >
                        <TouchableWithoutFeedback onPress={toggleModalTwo}>
                          <Text
                            style={{ color: colors.darkGray, paddingRight: 20 }}
                          >
                            BEKOR QILISH
                          </Text>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={toggleModalTwo}>
                          <Text
                            style={{ color: colors.orange, paddingLeft: 20 }}
                          >
                            O'CHIRISH
                          </Text>
                        </TouchableWithoutFeedback>
                      </View>
                    </View>
                  </Modal>
                  <TouchableOpacity
                    onPress={toggleModalTwo}
                    style={styles.iconsbutton}
                  >
                    <XIcon size={15} />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={styles.pensolbutton}
                  onPress={() =>
                    navigation.navigate(routes.ADD_TRANSPORT, {
                      id: item.id,
                    })
                  }
                >
                  <PensolIcon color={colors.white} size={15} />
                </TouchableOpacity>
                <View>
                  <Modal
                    isVisible={isModalVisible}
                    testID={"modal"}
                    swipeDirection={["up", "left", "right", "down"]}
                    style={{ justifyContent: "flex-end", margin: 0 }}
                  >
                    <View style={{ backgroundColor: colors.white }}>
                      <View
                        style={{
                          alignItems: "center",
                          flexDirection: "row",
                          marginHorizontal: 10,
                          borderBottomWidth: 1,
                          borderBottomColor: colors.gray,
                        }}
                      >
                        <TouchableOpacity
                          style={{
                            borderRadius: 30,
                          }}
                        >
                          <ArrowLeftIcon size={30} />
                        </TouchableOpacity>
                        <View
                          style={{
                            alignItems: "center",
                            justifyContent: "center",
                            marginHorizontal: 90,
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 18,
                              alignItems: "center",
                              justifyContent: "center",
                              textAlign: "center",
                              paddingVertical: 10,
                            }}
                          >
                            E'lonni yakunlash
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          marginHorizontal: 10,
                          marginVertical: 20,
                          marginBottom: 50,
                        }}
                      >
                        <Text
                          style={{
                            textAlign: "center",
                            fontSize: 16,
                          }}
                        >
                          Agar siz o'zingizga kerakli haydovchini topgan
                          bo'lsangiz quyidagi yakunlash tugmasiga bosing.
                          Yakunlangan e'lon qaytib haydovchilarga ko'rsatilmaydi
                        </Text>
                      </View>
                      <TouchableWithoutFeedback onPress={toggleModal}>
                        <View
                          style={{
                            backgroundColor: colors.lightOrange,
                            alignItems: "center",
                            justifyContent: "center",
                            marginHorizontal: 15,
                            paddingVertical: 12,
                            borderRadius: 10,
                            marginVertical: 30,
                          }}
                        >
                          <Text style={{ fontSize: 15, textAlign: "center" }}>
                            YAKUNLASH
                          </Text>
                        </View>
                      </TouchableWithoutFeedback>
                    </View>
                  </Modal>
                  <TouchableOpacity
                    onPress={toggleModal}
                    style={styles.checkedbutton}
                  >
                    <CheckedIcon size={15} />
                  </TouchableOpacity>
                </View>
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
    </View>
  );
};
export default TransportItem;

const styles = StyleSheet.create({
  btn1: {
    borderWidth: 1,
    borderColor: colors.darkOrange,
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 8,
    backgroundColor: colors.lightOrange,
    flexDirection: "row",
    alignItems: "center",
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
    borderWidth: 1.5,
    backgroundColor: colors.greenLigth,
    borderColor: colors.greenLigth,
    borderRadius: 25,
    paddingHorizontal: 11,
    paddingVertical: 11,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 6,
  },
  iconsbutton: {
    borderWidth: 1.5,
    backgroundColor: colors.lightCoral,
    borderColor: colors.lightCoral,
    borderRadius: 25,
    paddingHorizontal: 11,
    paddingVertical: 11,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 6,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 22,
    backgroundColor: "rgba(52, 52, 52, 0.5)",
  },
  modalView: {
    margin: 20,
    marginHorizontal: 40,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    marginRight: 30,
    marginLeft: 50,
  },

  buttonClose: {
    marginLeft: 10,
  },
  textStyle: {
    color: colors.gray,
    fontWeight: "600",
    textAlign: "center",
  },
  textStyles: {
    color: colors.orange,
    fontWeight: "600",
    textAlign: "center",
  },
  modalText: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 15,
    color: colors.black,
    paddingHorizontal: 5,
  },
});
