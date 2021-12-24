import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { TextInputMask } from "react-native-masked-text";
import { ActivityIndicator, Checkbox } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { images } from "../../assets";
import { LeftArrowIcon, LocationIcon } from "../../assets/icons/icons";
import SeatSelector from "../../components/SeatSelector";
import { locationType } from "../../constants/values";
import { routes } from "../../navigation/routes";
import { selectOrderState, setOrderData } from "../../redux/slices/order/order";
import { useTaxiHook } from "./hooks";

const AddPassenger = ({ navigation }) => {
  //--------------------------------------------------------------
  const dispatch = useDispatch();

  const state = useSelector(selectOrderState);

  const { createPassanger, loading } = useTaxiHook();
  const onSubmitFrom = () => {
    createPassanger({
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
    });
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate(routes.TAB_STACK)}>
          <LeftArrowIcon size={22} />
        </TouchableOpacity>
        <Text style={styles.questionsadd}>Taksiga sorov kiritish</Text>
      </View>
      <ScrollView>
        <View
          style={{
            paddingBottom: 19,
            paddingHorizontal: 16,
            backgroundColor: "#fff",
            marginTop: 20,
            paddingTop: 19,
          }}
        >
          <Text style={{ fontSize: 16, marginBottom: 17, fontWeight: "bold" }}>
            Qayerdan?
          </Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(routes.REGION, {
                type: locationType.from,
                route: routes.ADD_PASSENGER,
              })
            }
            style={styles.btnOne}
          >
            <LocationIcon />
            <Text
              style={{
                color: "#8a8a8a",
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
            backgroundColor: "#fff",
            marginTop: 20,
            paddingTop: 19,
          }}
        >
          <Text style={{ fontSize: 16, marginBottom: 17, fontWeight: "bold" }}>
            Qayerga?
          </Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(routes.REGION, {
                type: locationType.to,
                route: routes.ADD_PASSENGER,
              })
            }
            style={styles.btnOne}
          >
            <LocationIcon />
            <Text
              style={{
                color: "#8a8a8a",
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
            backgroundColor: "#fff",
            paddingHorizontal: 16,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
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
        <View style={{ backgroundColor: "#fff", paddingHorizontal: 16 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Checkbox.Android
              color={"black"}
              uncheckedColor={"#ccc"}
              status={state.otherPerson ? "checked" : "unchecked"}
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
          {state.otherPerson && (
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
          )}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Checkbox.Android
              color={"black"}
              uncheckedColor={"#ccc"}
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
            backgroundColor: "#fff",
          }}
        >
          <Text>Bitta orin uchun summa taklif qiling</Text>
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
                backgroundColor: "#FFC847",
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
              {loading ? <ActivityIndicator /> : "Yuborish"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default AddPassenger;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 20,
    elevation: 10,
  },
  questionsadd: {
    fontSize: 18,
    marginLeft: 25,
    fontWeight: "bold",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#dcdcdc",
    borderRadius: 10,
    padding: 14,
    marginTop: 10,
  },
  btnOne: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 10,
    borderColor: "#DCDCDC",
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  btn: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderColor: "#BF9100",
    borderRadius: 10,
    borderWidth: 1,
    marginRight: 18,
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
    marginRight: 20,
    color: "#8a8a8a",
  },
});
