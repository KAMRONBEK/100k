import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { images } from "../../assets";
import { routes } from "../../navigation/routes";
import { selectOrderState, setOrderData } from "../../redux/slices/order/order";
import { useMailHook } from "./hooks";
import { ActivityIndicator, Checkbox } from "react-native-paper";
import { locationType } from "../../constants/values";
import { TextInputMask } from "react-native-masked-text";

const AdMail = ({ navigation }) => {
  const [type, setType] = useState("#fff");
  const [typeOne, setTypeOne] = useState("#fff");
  const [typeTwo, setTypeTwo] = useState("#fff");
  const Change = () => {
    if (type === "#fff") {
      setType("#FFCD30");
      setTypeOne("#fff");
      setTypeTwo("#fff");
    } else if (type === "#FFCD30") {
      setType("#fff");
    }
  };
  const ChangeOne = () => {
    if (typeOne === "#fff") {
      setTypeOne("#FFCD30");
      setType("#fff");
      setTypeTwo("#fff");
    } else if (typeOne === "#FFCD30") {
      setTypeOne("#fff");
    }
  };
  const ChangeTwo = () => {
    if (typeTwo === "#fff") {
      setTypeTwo("#FFCD30");
      setType("#fff");
      setTypeOne("#fff");
    } else if (typeTwo === "#FFCD30") {
      setTypeTwo("#fff");
    }
  };

  const state = useSelector(selectOrderState);

  const [cost, setCost] = useState<number>();
  const dispatch = useDispatch();
  const [info, setInfo] = useState("");
  const [frontSeat, setFrontSeat] = useState(false);
  const [otherNumber, setOtherNumber] = useState("");
  const [otherPerson, setOtherPerson] = useState(false);
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [name, setName] = useState("");
  const [insurance, setInsurance] = useState("");
  const [matter, setMatter] = useState(0);
  const [vehicleType, setVehicleType] = useState(1);

  const { createMail, loading } = useMailHook();
  const onSubmitFrom = () => {
    createMail({
      from_region_id: state.fromRegionId,
      from_district_id: state.fromDistrictId,
      from_address: state.fromAddress,
      to_region_id: state.toRegionId,
      to_district_id: state.toDistrictId,
      to_address: state.toAddress,
      book_front_seat: frontSeat ? 1 : 0,
      note: info,
      cash_amount: cost,
      delivery_fee_amount: cost,
      recipient_phone: customerPhone,
      recipient_name: customerName,
      client_name: name,
      insurance_amount: insurance,
      matter: matter,
      vehicle_type: vehicleType,
    });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate(routes.TAB_STACK)}>
          <Image source={images.leftArrow} />
        </TouchableOpacity>
        <Text style={{ fontSize: 20 }}>Pochta qo’shish</Text>
        <View></View>
      </View>
      {/* <View style={{ marginTop: 32, paddingHorizontal: 16 }}>
        <Text style={{ fontSize: 16, fontWeight: "500" }}>
          Qachon olish va yetkazib berish?
        </Text>
        <View style={{ marginTop: 18, flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => {
              Handle();
            }}
            style={[styles.btn, { backgroundColor: color }]}
          >
            <Text>Hoziroq</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              HandleOne();
            }}
            style={[styles.btn, { marginLeft: 20, backgroundColor: colorOne }]}
          >
            <Text>Vaqtincha belgilash</Text>
          </TouchableOpacity>
        </View>
      </View> */}
      <View style={{ marginTop: 20, paddingHorizontal: 16 }}>
        <Text
          style={{ fontWeight: "bold", fontSize: 15, paddingHorizontal: 3 }}
        >
          Nimadan yetqazish?
        </Text>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 10 }}
        >
          <TouchableOpacity
            onPress={() => {
              Change();
            }}
            style={[
              styles.btn,
              { paddingHorizontal: 15, backgroundColor: type },
            ]}
          >
            <Text>Yengil avtomobilda</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              ChangeOne();
            }}
            style={[
              styles.btn,
              {
                paddingHorizontal: 15,
                marginLeft: 10,
                backgroundColor: typeOne,
              },
            ]}
          >
            <Text>Yuk mashinasida</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              ChangeTwo();
            }}
            style={[
              styles.btn,
              {
                paddingHorizontal: 15,
                marginLeft: 10,
                backgroundColor: typeTwo,
              },
            ]}
          >
            <Text>Piyoda</Text>
          </TouchableOpacity>
        </ScrollView>
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
        <Text style={{ fontSize: 18, marginBottom: 10, fontWeight: "bold" }}>
          Qayerdan/olish
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
              color: "#8a8a8a",
              fontSize: 14,
            }}
          >
            {!!state.fromRegionName ? state.fromRegionName : "Viloyat"} ,
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
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          keyboardType="default"
          placeholder="Yuboruvchi Ismi"
        />
        <TextInput
          style={styles.input}
          placeholder={"+998"}
          value={otherNumber!}
          onChangeText={setOtherNumber}
          keyboardType="numbers-and-punctuation"
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
        <Text style={{ fontSize: 18, marginBottom: 10, fontWeight: "bold" }}>
          Qayerga/Qabul qiluvchi?
        </Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Region", {
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
        <TextInput
          style={styles.input}
          value={customerName!}
          onChangeText={setCustomerName}
          keyboardType="default"
          placeholder="Mijoz"
        />
        <TextInput
          style={styles.input}
          placeholder={"+998"}
          value={customerPhone!}
          onChangeText={setCustomerPhone}
          keyboardType="numbers-and-punctuation"
        />
      </View>
      <View
        style={{
          paddingVertical: 19,
          marginTop: 20,
          paddingHorizontal: 16,
          backgroundColor: "#fff",
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          Nma yetqazib berish kerak?
        </Text>
        <TextInput
          style={styles.input}
          keyboardType="default"
          value={info!}
          onChangeText={setInfo}
        />
        <View
          style={{
            flexDirection: "row",
            marginTop: 14,
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <Text
            onPress={() => {
              setInfo("Hujjat");
            }}
            style={styles.text}
          >
            Hujjat
          </Text>
          <Text
            onPress={() => {
              setInfo("Sumka");
            }}
            style={styles.text}
          >
            Sumka
          </Text>
          <Text
            onPress={() => {
              setInfo("Kalit");
            }}
            style={styles.text}
          >
            Kalit
          </Text>
          <Text
            onPress={() => {
              setInfo("Mahsulot");
            }}
            style={styles.text}
          >
            Mahsulot
          </Text>
        </View>
        <View style={{ marginTop: 14 }}>
          {/* <View style={{ flexDirection: "row", alignItems: "center" }}>
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
                Katta hajimdagi jo’natma
              </Text>
            </TouchableOpacity>
          </View> */}
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              Qo'shimcha ma'lumot
            </Text>
            <TextInput
              style={styles.inputInformation}
              keyboardType="default"
              placeholder="Masalan: tungi soat 8-gacha yetkazib berish kerak"
            />
          </View>
          <View
            style={{
              marginTop: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
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
                  fontWeight: "500",
                  marginLeft: 12,
                }}
              >
                Jo'natma sug'urtalash
              </Text>
            </TouchableOpacity>
          </View>
          {otherPerson && (
            <View
              style={{
                paddingVertical: 19,
                backgroundColor: "#fff",
                paddingHorizontal: 16,
              }}
            >
              <View
                style={{
                  borderWidth: 1,
                  borderColor: "#ccc",
                  marginBottom: 15,
                  opacity: 0.2,
                }}
              ></View>
              <Text style={{ fontSize: 16, fontWeight: "500" }}>
                Mahsulot / jo’natma qiymati?
              </Text>
              <TextInput
                style={styles.input}
                value={insurance!}
                onChangeText={setInsurance}
                keyboardType="numeric"
              />
              <Text style={{ fontSize: 14, color: "#8a8a8a", marginTop: 13 }}>
                Avtomatic kalkulyator sizning qoldirgan sug’urtangizdan 0,5%
                yechib oladi, shuning dek ushbu jo’natma faqat hamyonida
                yetarlicha mablag bo’lgan kuryerlarga ko’rsatiladi, mahsulotga
                yoki jonatmaga zarar yetqazilgan taqdirda reglament boyicha 3
                ish kunida ushbu summa tiklab beradi.
              </Text>
            </View>
          )}
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
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>
          Buyurtma summasini taklif qiling
        </Text>
        <TextInput
          value={cost?.toString()}
          onChangeText={setCost}
          keyboardType="numeric"
          placeholder="summa"
          style={styles.input}
        />
        <View style={{ flexDirection: "row", marginTop: 14 }}>
          <TouchableOpacity
            onPress={() => {
              setCost(20000);
            }}
          >
            <Text style={styles.texts}>20 000</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setCost(30000);
            }}
          >
            <Text style={styles.texts}>30 000</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setCost(40000);
            }}
          >
            <Text style={styles.texts}>40 000</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setCost(50000);
            }}
          >
            <Text style={styles.texts}>50 000</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[
            styles.btnOne,
            {
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
            }}
          >
            {loading ? <ActivityIndicator /> : "Yuborish"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AdMail;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  btn: {
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 10,
    borderColor: "#DCDCDC",
    borderWidth: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: "#dcdcdc",
    borderRadius: 10,
    padding: 14,
    marginTop: 10,
  },
  inputInformation: {
    height: 100,
    fontSize: 14,
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#dcdcdc",
    paddingHorizontal: 14,
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
  text: {
    fontSize: 15,
    fontWeight: "500",
    // marginRight: 20,
    color: "#8a8a8a",
  },
  texts: {
    fontSize: 15,
    fontWeight: "500",
    marginRight: 20,
    color: "#8a8a8a",
  },
});
