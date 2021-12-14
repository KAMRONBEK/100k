import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { images } from "../../assets";
import SeatSelector from "../../components/SeatSelector";
import { locationType } from "../../constants/values";
import { routes } from "../../navigation/routes";
import { selectOrderState, setOrderData } from "../../redux/slices/order/order";
import { useLogger } from "../../utils/hooks/useLogger";
import { ActivityIndicator, Checkbox } from "react-native-paper";
import { TextInputMask } from "react-native-masked-text";
import { useTaxiHook } from "./hooks";

const AddPassenger = ({ navigation }) => {
  //--------------------------------------------------------------
  const dispatch = useDispatch();

  const state = useSelector(selectOrderState);
  const [seatCount, setSeatCount] = useState(0);
  const [info, setInfo] = useState("");
  const [frontSeat, setFrontSeat] = useState(false);
  const [otherPerson, setOtherPerson] = useState(false);
  const [otherNumber, setOtherNumber] = useState("");
  const [otherName, setOtherName] = useState("");
  const [cost, setCost] = useState<number>();

  const { createPassanger, loading } = useTaxiHook();
  const onSubmitFrom = () => {
    createPassanger({
      from_region_id: state.fromRegionId,
      from_district_id: state.fromDistrictId,
      from_address: state.fromAddress,
      to_region_id: state.toRegionId,
      to_district_id: state.toDistrictId,
      to_address: state.toAddress,
      book_front_seat: frontSeat ? 1 : 0,
      seat_count: seatCount,
      note: info,
      cost: cost,
    });
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate(routes.TAB_STACK)}>
          <Image source={images.leftArrow} />
        </TouchableOpacity>
        <Text style={{ fontSize: 20 }}>Taksiga sorov kiritish</Text>
        <View></View>
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
          <Text style={{ fontSize: 16, marginBottom: 17 }}>Qayerdan?</Text>
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
                color: "#8a8a8a",
                fontSize: 14,
              }}
            >
              {!!state.fromRegionName ? state.fromRegionName : "Viloyat"} ,{" "}
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
          <Text style={{ fontSize: 16, marginBottom: 17 }}>Qayerga</Text>
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
                color: "#8a8a8a",
                fontSize: 14,
              }}
            >
              {!!state.toRegionName ? state.toRegionName : "Viloyat"} ,{" "}
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

        <SeatSelector value={seatCount} setValue={setSeatCount} />
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
            value={info!}
            onChangeText={setInfo}
            keyboardType="default"
            placeholder="Qo'shimcha ma'lumot kiriting"
          />
          <View style={{ flexDirection: "row", marginTop: 14 }}>
            <Text
              onPress={() => {
                setInfo("Oldi o’rindiq");
              }}
              style={styles.text}
            >
              Oldi o’rindiq
            </Text>
            <Text
              onPress={() => {
                setInfo("Benzin");
              }}
              style={styles.text}
            >
              Benzin
            </Text>
            <Text
              onPress={() => {
                setInfo("Muzlatgich");
              }}
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
              status={otherPerson ? "checked" : "unchecked"}
              onPress={() => setOtherPerson(!otherPerson)}
            />
            <TouchableOpacity onPress={() => setOtherPerson(!otherPerson)}>
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
          {otherPerson && (
            <>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <TextInputMask
                  type={"custom"}
                  options={{
                    mask: "+998 99 999 99 99",
                  }}
                  style={styles.input}
                  placeholder={"+998"}
                  value={otherNumber!}
                  onChangeText={setOtherNumber}
                  keyboardType="numeric"
                />
              </View>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <TextInput
                  style={styles.input}
                  placeholder={"Ismi"}
                  value={otherName!}
                  onChangeText={setOtherName}
                />
              </View>
            </>
          )}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Checkbox.Android
              color={"black"}
              uncheckedColor={"#ccc"}
              status={frontSeat ? "checked" : "unchecked"}
              onPress={() => setFrontSeat(!frontSeat)}
            />
            <TouchableOpacity onPress={() => setFrontSeat(!frontSeat)}>
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
            // type={"custom"}
            // options={{
            //     mask: "999 999 999 999",
            // }}
            value={cost?.toString()}
            onChangeText={setCost}
            keyboardType="numeric"
            style={styles.input}
          />
          <View style={{ flexDirection: "row", marginTop: 14 }}>
            <TouchableOpacity
              onPress={() => {
                setCost(20000);
              }}
            >
              <Text style={styles.text}>20 000</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setCost(30000);
              }}
            >
              <Text style={styles.text}>30 000</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setCost(40000);
              }}
            >
              <Text style={styles.text}>40 000</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setCost(50000);
              }}
            >
              <Text style={styles.text}>50 000</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setCost(60000);
              }}
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
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 20,
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
