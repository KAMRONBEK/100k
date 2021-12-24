import React, { useState } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
  NativeModules,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { images } from "../../assets";
import TrantsportTypeSelector from "../../components/TrantsportTypeSelector";
import { locationType } from "../../constants/values";
import { routes } from "../../navigation/routes";
import { selectOrderState, setOrderData } from "../../redux/slices/order/order";
import { useTransportHook } from "./hooks";
import { Picker } from "@react-native-picker/picker";
import {
  launchImageLibrary,
  Callback,
  CameraOptions,
  ImageLibraryOptions,
  ImagePickerResponse,
} from "react-native-image-picker";
import { colors } from "../../constants/color";

const AddTransport = ({ navigation }) => {
  const [img, setImg] = useState<"none" | "flex">("none");
  const [imgs, setImgs] = useState<"none" | "flex">("flex");

  let [costTypes, setCostTypes] = useState([
    { label: "Kelishiladi", value: "bargain" },
    { label: "Kun bay", value: "per_day" },
    { label: "KM bay", value: "per_km" },
    { label: "Soat bay", value: "per_hour" },
  ]);

  const state = useSelector(selectOrderState);
  const dispatch = useDispatch();

  const { createTransport, loading } = useTransportHook();
  const onSubmitFrom = () => {
    createTransport({
      from_region_id: state.fromRegionId,
      from_district_id: state.fromDistrictId,
      to_region_id: state.toRegionId,
      to_district_id: state.toDistrictId,
      transport_type: state.transportType,
      cost: state.cost,
      cost_type: state.costType,
      note: state.note,
      weight: state.weight,
      images: state.images,
      otherName: state.otherName,
      otherNumber: state.otherNumber,
    });
  };

  let onPhotoPress = () => {
    launchImageLibrary(
      {
        mediaType: "photo",
        quality: 1,
        selectionLimit: 8,
      },
      ({ assets }) => {
        dispatch(setOrderData({ images: { ...state.images, ...assets } }));
      }
    );
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate(routes.TAB_STACK)}>
          <Image source={images.leftArrow} />
        </TouchableOpacity>
        <Text style={{ fontSize: 20 }}>Transport qo’shish</Text>
        <View></View>
      </View>
      <TrantsportTypeSelector
        value={state.transportType}
        setValue={(e) => dispatch(setOrderData({ transportType: e }))}
      />
      <View style={{ paddingHorizontal: 16, marginTop: 20 }}>
        <Text style={{ fontSize: 14, color: colors.darkGray }}>
          Texnika to'g'risida ma'lumot *
        </Text>
        <TextInput
          style={[styles.input, { backgroundColor: colors.white }]}
          value={state.note!}
          onChangeText={(e) => dispatch(setOrderData({ note: e }))}
          placeholder="Informatsiya"
          placeholderTextColor={colors.darkGray}
          multiline
          numberOfLines={2}
        />
      </View>
      <View
        style={{
          paddingBottom: 5,
          paddingHorizontal: 16,
          paddingTop: 15,
        }}
      >
        <Text
          style={{ fontSize: 16, marginBottom: 17, color: colors.darkGray }}
        >
          Hozirgi manzilingiz *
        </Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(routes.REGION, {
              type: locationType.from,
              route: routes.ADD_TRANSPORT,
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
            {!!state.fromRegionName ? state.fromRegionName : "Viloyat"} ,
            {!!state.fromDistrictName ? state.fromDistrictName : "tuman"}
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          // paddingBottom: 19,
          paddingHorizontal: 16,
          paddingTop: 10,
        }}
      >
        <Text
          style={{ color: colors.darkGray, fontSize: 16, marginBottom: 17 }}
        >
          Boradigan manzilingiz(kiritish majburiy emas)
        </Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(routes.REGION, {
              type: locationType.to,
              route: routes.ADD_TRANSPORT,
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
      </View>
      <View
        style={{
          paddingHorizontal: 16,
          paddingBottom: 40,
          position: "relative",
          paddingTop: 20,
        }}
      >
        <Text style={{ fontSize: 16, color: colors.darkGray }}>
          Narxingiz (qatnash uchun)*
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: colors.white,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: colors.lightgray,
            marginTop: 10,
          }}
        >
          <View style={[styles.inputView]}>
            <TextInput
              style={{ fontSize: 16 }}
              value={state.cost?.toString()}
              onChangeText={(e) => dispatch(setOrderData({ cost: e }))}
              placeholder="Narxni kiriting..."
              keyboardType="numeric"
            />
          </View>
          <View style={{ width: 150, backgroundColor: colors.white }}>
            <Picker
              selectedValue={state.costType}
              onValueChange={(itemValue, itemIndex) =>
                dispatch(setOrderData({ costType: itemValue }))
              }
            >
              {costTypes.map(({ label, value }) => {
                return <Picker.Item label={label} value={value} />;
              })}
            </Picker>
          </View>
        </View>
      </View>
      <View style={{ paddingHorizontal: 16 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => [setImg("flex"), setImgs("none")]}
            style={{ display: imgs }}
          >
            <Image source={images.rectangle} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setImg("none");
              setImgs("flex");
            }}
            style={{ display: img }}
          >
            <Image source={images.blackRectangle} />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 14,
              color: colors.darkGray,
              marginLeft: 16,
            }}
          >
            Boshqa odam uchun
          </Text>
        </View>
      </View>
      <View style={{ display: img, paddingHorizontal: 16, marginTop: 21 }}>
        <Text style={styles.text}>Ismingizni kiriting *</Text>
        <TextInput
          value={state.otherName!}
          onChangeText={(e) => dispatch(setOrderData({ otherName: e }))}
          style={[
            styles.input,
            { backgroundColor: colors.white, marginBottom: 21 },
          ]}
        />
        <Text style={styles.text}>Telefon raqamini kiriting * </Text>
        <TextInput
          value={state.otherNumber!}
          onChangeText={(e) => dispatch(setOrderData({ otherNumber: e }))}
          style={[
            styles.input,
            { backgroundColor: colors.white, marginBottom: 21 },
          ]}
          keyboardType="numeric"
        />
      </View>
      <View>
        <Text style={{ margin: 15, marginTop: 15, color: colors.darkGray }}>
          Transportingizni fotosurati*
        </Text>
        <ScrollView
          horizontal={true}
          style={{
            flexDirection: "row",
          }}
        >
          {!!state.images &&
            Object.values(state.images).map((image) => {
              return (
                <Image
                  source={{ uri: image.uri }}
                  style={{
                    width: 150,
                    height: 100,
                    margin: 10,
                    flexWrap: "nowrap",
                  }}
                />
              );
            })}
        </ScrollView>
        <TouchableOpacity onPress={onPhotoPress}>
          <View
            style={{
              width: 120,
              height: 70,
              borderWidth: 1,
              borderRadius: 1,
              borderColor: colors.darkGray,
              borderStyle: "dashed",
              marginHorizontal: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              style={{ resizeMode: "contain", width: 20, height: 20 }}
              source={images.plus}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ paddingHorizontal: 16, marginVertical: 40 }}>
        <TouchableOpacity
          style={[
            styles.btnOne,
            {
              flexDirection: "column",
              backgroundColor: colors.brightOrangeTwo,
            },
          ]}
          onPress={onSubmitFrom}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            {loading ? <ActivityIndicator /> : "Yuborish"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AddTransport;
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  inputView: {
    width: 200,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: colors.white,
    paddingHorizontal: 14,
    marginBottom: 10,
    justifyContent: "space-between",
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
});
