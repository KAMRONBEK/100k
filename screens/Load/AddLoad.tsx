import React, { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { images } from "../../assets";
import LoadSelector from "../../components/LoadSelector";
import { colors } from "../../constants/color";
import { locationType } from "../../constants/values";
import { routes } from "../../navigation/routes";
import { selectOrderState, setOrderData } from "../../redux/slices/order/order";
import { useLoadHook } from "./hooks";

const AddLoad = ({ navigation }) => {
  //---------------------------------------------------
  const dispatch = useDispatch();

  const state = useSelector(selectOrderState);
  const { createLoad, loading } = useLoadHook();
  const onSubmitFrom = () => {
    createLoad({
      from_region_id: state.fromRegionId,
      from_district_id: state.fromDistrictId,
      from_address: state.fromAddress,
      to_region_id: state.toRegionId,
      to_district_id: state.toDistrictId,
      to_address: state.toAddress,
      cost: parseInt(state.cost!),
      weight: state.weight,
      matter: state.matter,
    });
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate(routes.TAB_STACK)}>
          <Image source={images.leftArrow} />
        </TouchableOpacity>
        <Text style={styles.editLoad}>Yuk qo’shish</Text>
      </View>
      <ScrollView>
        <View style={styles.fromWhere}>
          <Text style={styles.fromWheretxt}>Qayerdan?</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(routes.REGION, {
                type: locationType.from,
                route: routes.ADD_LOAD,
              })
            }
            style={styles.btnOne}
          >
            <Image source={images.location} />
            <Text style={styles.fromlocation}>
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
        <View style={styles.towhere}>
          <Text style={styles.towheretxt}>Qayerga?</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(routes.REGION, {
                type: locationType.to,
                route: routes.ADD_LOAD,
              })
            }
            style={styles.btnOne}
          >
            <Image source={images.location} />
            <Text style={styles.distaktor}>
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
        <LoadSelector
          value={state.weight}
          setValue={(e) => dispatch(setOrderData({ weight: e }))}
        />
        <View
          style={{
            backgroundColor: colors.white,
            paddingHorizontal: 16,
            paddingVertical: 20,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Qo'shimcha ma'lumot?</Text>
          <TextInput
            style={styles.input}
            value={state.matter}
            onChangeText={(e) => dispatch(setOrderData({ matter: e }))}
            placeholder="Qo'shimcha ma'lumot kiriting"
            keyboardType="default"
          />
        </View>
        <View
          style={{
            marginTop: 20,
            backgroundColor: colors.white,
            paddingHorizontal: 16,
            paddingVertical: 20,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Yetkazib berish narxi</Text>
          <TextInput
            style={styles.input}
            value={state.cost}
            onChangeText={(e) => dispatch(setOrderData({ cost: parseInt(e) }))}
            placeholder="300 000"
          />
          <View
            style={{
              flexDirection: "row",
              paddingTop: 20,
              paddingLeft: 16,
            }}
          >
            <TouchableOpacity
              onPress={() => dispatch(setOrderData({ cost: "300000" }))}
            >
              <Text style={styles.text}>300 000</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => dispatch(setOrderData({ cost: "500000" }))}
            >
              <Text style={styles.text}>500 000</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => dispatch(setOrderData({ cost: "1000000" }))}
            >
              <Text style={styles.text}>1 000 000</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => dispatch(setOrderData({ cost: "5000000" }))}
            >
              <Text style={styles.text}>5 000 000</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            backgroundColor: colors.white,
            paddingHorizontal: 16,
            paddingVertical: 20,
          }}
        >
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
                fontSize: 16,
                fontWeight: "bold",
                textAlign: "center",
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

export default AddLoad;
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
  editLoad: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 15,
  },
  fromWhere: {
    paddingBottom: 19,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
    marginTop: 20,
    paddingTop: 19,
  },
  fromWheretxt: {
    fontSize: 15,
    marginBottom: 17,
    fontWeight: "bold",
  },
  fromlocation: {
    marginLeft: 10,
    color: colors.darkGray,
    fontSize: 14,
  },
  towhere: {
    paddingBottom: 19,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
    marginTop: 20,
    paddingTop: 19,
  },
  towheretxt: {
    fontSize: 15,
    marginBottom: 17,
    fontWeight: "bold",
  },
  distaktor: {
    marginLeft: 10,
    color: colors.darkGray,
    fontSize: 14,
  },
});
