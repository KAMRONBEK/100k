import { useRoute } from "@react-navigation/native";
import React, { useEffect, useReducer, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInputMask } from "react-native-masked-text";
import { ActivityIndicator, Checkbox } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { images } from "../../assets";
import SeatSelector from "../../components/SeatSelector";
import { colors } from "../../constants/color";
import { locationType } from "../../constants/values";
import { routes } from "../../navigation/routes";
import { selectOrderState, setOrderData } from "../../redux/slices/order/order";
import { selectTaxi } from "../../redux/slices/taxi/taxi";
import { useTaxiHook } from "./hooks";

const EditPassanger = ({ navigation }) => {
  //--------------------------------------------------------------
  const dispatch = useDispatch();

  const state = useSelector(selectOrderState);
  const taxi = useSelector(selectTaxi);

  const { editPassanger, loading } = useTaxiHook();
  const { id } = useRoute().params ? useRoute().params : { id: 0 };
  const onSubmitFrom = () => {
    editPassanger(
      {
        from_region_id: state.fromRegionId,
        from_district_id: state.fromDistrictId,
        from_address: state.fromAddress,
        to_region_id: state.toRegionId,
        to_district_id: state.toDistrictId,
        to_address: state.toAddress,
        book_front_seat: state.frontSeat ? 1 : 0,
        seat_count: state.seatCount,
        note: state.info,
        cost: state.cost,
      },
      id
    );
  };

  let temp = {
    book_front_seat: 1,
    cost: 23000,
    created_at: "2021-12-08 16:49:30",
    created_at_label: "1 сония аввал",
    creator_avatar:
      "https://www.gravatar.com/avatar/423bc8ebb88f4ead6b5fef84483cf3fc?s=100&d=mm",
    creator_id: 372334,
    creator_name: null,
    creator_phone: "+998998032226",
    driver_avatar: null,
    driver_id: null,
    driver_name: null,
    driver_phone: null,
    from_address: "Yakkasaroy kochasi 15-uy777",
    from_district_id: 13,
    from_full_address: "Fargona, Rishton, Yakkasaroy kochasi 15-uy777",
    from_latitude: null,
    from_longitude: null,
    from_region_id: 1,
    id: 1,
    note: "Alohida olib keling",
    seat_count: 1,
    seat_count_label: "1 kishi",
    status: "active",
    to_address: "Guliston katta ko'cha 25-uy777",
    to_district_id: 62,
    to_full_address: "Sirdaryo, Guliston, Guliston katta ko'cha 25-uy777",
    to_region_id: 3,
  };

  useEffect(() => {
    let currentOrder = Object.values(taxi).filter((item) => item.id == id)[0];
    dispatch(
      setOrderData({
        fromRegionId: currentOrder.from_region_id,
        fromRegionName: currentOrder.from_full_address.split(",")[0],

        fromDistrictId: currentOrder.from_district_id,
        fromDistrictName: currentOrder.from_full_address.split(",")[1],

        fromAddress: currentOrder.from_address,
        fromNumber: "",

        toRegionId: currentOrder.to_region_id,
        toRegionName: currentOrder.to_full_address.split(",")[0],

        toDistrictId: currentOrder.to_district_id,
        toDistrictName: currentOrder.to_full_address.split(",")[1],

        toAddress: currentOrder.to_address,
        toNumber: "",

        cost: currentOrder.cost,

        seatCount: currentOrder.seat_count,

        info: currentOrder.note,

        frontSeat: false,

        otherPerson: false,

        otherNumber: "",

        otherName: "",
      })
    );
  }, [id]);

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate(routes.TAB_STACK)}>
          <Image source={images.leftArrow} />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 25 }}>
          Buyurtmani o'zgartirish
        </Text>
      </View>
      <ScrollView>
        <View
          style={{
            paddingBottom: 19,
            paddingHorizontal: 16,
            backgroundColor: colors.white,
            marginTop: 20,
            paddingTop: 19,
          }}
        >
          <Text style={{ fontSize: 15, marginBottom: 17, fontWeight: "bold" }}>
            Qayerdan?
          </Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(routes.REGION, {
                type: locationType.from,
              })
            }
            style={styles.btnOne}
          >
            <Image source={images.location} />
            <Text
              style={{
                marginLeft: 10,
                color: colors.darkGray,
                fontSize: 14,
              }}
            >
              {!!state.fromRegionName ? state.fromRegionName : "Viloyat"},
              {!!state.fromDistrictName ? state.fromDistrictName : "tuman"}
            </Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            value={state.fromAddress}
            onChangeText={(e) => dispatch(setOrderData({ fromAddress: e }))}
            keyboardType="default"
            placeholder="Kocha nomi, uy raqami, mo’jal"
          />
        </View>
        <View
          style={{
            paddingBottom: 19,
            paddingHorizontal: 16,
            backgroundColor: colors.white,
            marginTop: 20,
            paddingTop: 19,
          }}
        >
          <Text style={{ fontSize: 15, marginBottom: 17, fontWeight: "bold" }}>
            Qayerga?
          </Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(routes.REGION, {
                type: locationType.to,
              })
            }
            style={styles.btnOne}
          >
            <Image source={images.location} />
            <Text
              style={{
                marginLeft: 10,
                color: colors.darkGray,
                fontSize: 14,
              }}
            >
              {!!state.toRegionName ? state.toRegionName : "Viloyat"} ,
              {!!state.toDistrictName ? state.toDistrictName : "tuman"}
            </Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            value={state.toAddress}
            onChangeText={(e) => dispatch(setOrderData({ toAddress: e }))}
            keyboardType="default"
            placeholder="Kocha nomi, uy raqami, mo’jal"
          />
        </View>

        <SeatSelector
          value={state.seatCount}
          setValue={(e) => dispatch(setOrderData({ seatCount: e }))}
        />
        <View
          style={{
            paddingVertical: 19,
            backgroundColor: colors.white,
            paddingHorizontal: 16,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              marginBottom: 17,
            }}
          >
            Qo’shimcha ma’lumot?
          </Text>
          <TextInput
            style={styles.input}
            value={state.info!}
            onChangeText={(e) => dispatch(setOrderData({ info: e }))}
            keyboardType="default"
            placeholder="Qo'shimcha ma'lumot kiriting"
          />
          <View style={{ flexDirection: "row", marginTop: 14 }}>
            <Text
              onPress={(e) => dispatch(setOrderData({ info: "Oldi o'rindiq" }))}
              style={styles.text}
            >
              Oldi o’rindiq
            </Text>
            <Text
              onPress={(e) => dispatch(setOrderData({ info: "Benzin" }))}
              style={styles.text}
            >
              Benzin
            </Text>
            <Text
              onPress={(e) => dispatch(setOrderData({ info: "Muzlatgich" }))}
              style={styles.text}
            >
              Muzlatgich
            </Text>
          </View>
        </View>
        <View style={{ backgroundColor: colors.white, paddingHorizontal: 16 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Checkbox.Android
              color={colors.black}
              uncheckedColor={colors.gray}
              status={!!state.otherPerson ? "checked" : "unchecked"}
              onPress={() =>
                dispatch(
                  setOrderData({
                    otherPerson: !state.otherPerson,
                  })
                )
              }
            />
            <TouchableOpacity
              onPress={() =>
                dispatch(
                  setOrderData({
                    otherPerson: !state.otherPerson,
                  })
                )
              }
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  marginLeft: 12,
                }}
              >
                Boshqa odamga bron qilish
              </Text>
            </TouchableOpacity>
          </View>
          {!!state.otherPerson ? (
            <>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <TextInputMask
                  type={"custom"}
                  options={{
                    mask: "+999 99 999 99 99",
                  }}
                  style={styles.input}
                  placeholder={"+998"}
                  value={state.otherNumber!}
                  onChangeText={(e) =>
                    dispatch(setOrderData({ otherNumber: e }))
                  }
                  keyboardType="numeric"
                />
              </View>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <TextInput
                  style={styles.input}
                  placeholder={"Ismi"}
                  value={state.otherName!}
                  onChangeText={(e) => dispatch(setOrderData({ otherName: e }))}
                />
              </View>
            </>
          ) : undefined}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Checkbox.Android
              color={"black"}
              uncheckedColor={colors.gray}
              status={state.frontSeat ? "checked" : "unchecked"}
              onPress={() =>
                dispatch(
                  setOrderData({
                    frontSeat: !state.frontSeat,
                  })
                )
              }
            />
            <TouchableOpacity
              onPress={() =>
                dispatch(
                  setOrderData({
                    frontSeat: !state.frontSeat,
                  })
                )
              }
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  marginLeft: 12,
                }}
              >
                Oldi orindiqni bron qilish
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            marginTop: 20,
            paddingVertical: 19,
            paddingHorizontal: 16,
            backgroundColor: colors.white,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>
            Bitta orin uchun summa taklif qiling
          </Text>
          <TextInput
            value={state.cost?.toString()}
            onChangeText={(e) => dispatch(setOrderData({ cost: e }))}
            keyboardType="numeric"
            style={styles.input}
          />
          <View style={{ flexDirection: "row", marginTop: 14 }}>
            <TouchableOpacity
              onPress={() => dispatch(setOrderData({ cost: "20000" }))}
            >
              <Text style={styles.text}>20 000</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => dispatch(setOrderData({ cost: "30000" }))}
            >
              <Text style={styles.text}>30 000</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => dispatch(setOrderData({ cost: "40000" }))}
            >
              <Text style={styles.text}>40 000</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => dispatch(setOrderData({ cost: "50000" }))}
            >
              <Text style={styles.text}>50 000</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => dispatch(setOrderData({ cost: "60000" }))}
            >
              <Text style={styles.text}>60 000</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[
              styles.btnOne,
              {
                marginBottom: 35,
                flexDirection: "column",
                marginTop: 23,
                backgroundColor: colors.brightOrangeTwo,
              },
            ]}
            onPress={onSubmitFrom}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "500",
                textAlign: "center",
                height: 20,
              }}
            >
              {loading ? <ActivityIndicator /> : "Saqlash"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default EditPassanger;
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  input: {
    flex: 1,
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderColor: colors.darkOrange,
    borderRadius: 10,
    borderWidth: 1,
    marginRight: 18,
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
    marginRight: 20,
    color: colors.darkGray,
  },
});
