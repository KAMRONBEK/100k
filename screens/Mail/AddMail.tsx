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
  const [otherNumber, setOtherNumber] = useState("");
  const [otherPerson, setOtherPerson] = useState(false);
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
      note: state.info,
      cash_amount: state.cost,
      delivery_fee_amount: state.cost,
      recipient_phone: state.customerPhone,
      recipient_name: state.customerName,
      client_name: state.name,
      insurance_amount: state.insurance,
      matter: state.matter,
      vehicle_type: state.vehicleType,
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
          style={{
            fontWeight: "bold",
            fontSize: 15,
            paddingHorizontal: 3,
          }}
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
            <Text
              onPress={() =>
                dispatch(setOrderData({ vehicleType: "Yengil avtomobilda" }))
              }
            >
              Yengil avtomobilda
            </Text>
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
            <Text
              onPress={() =>
                dispatch(setOrderData({ vehicleType: "Yuk mashinasida" }))
              }
            >
              Yuk mashinasida
            </Text>
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
            <Text
              onPress={() => dispatch(setOrderData({ vehicleType: "Piyoda" }))}
            >
              Piyoda
            </Text>
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
        <Text
          style={{
            fontSize: 18,
            marginBottom: 10,
            fontWeight: "bold",
          }}
        >
          Qayerdan/olish
        </Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(routes.REGION, {
              type: locationType.from,
              route: routes.ADD_MAIL,
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
          value={state.name!}
          onChangeText={(e) => dispatch(setOrderData({ name: e }))}
          keyboardType="default"
          placeholder="Yuboruvchi Ismi"
        />
        <TextInput
          style={styles.input}
          placeholder={"+998"}
          value={state.otherNumber!}
          onChangeText={(e) => dispatch(setOrderData({ otherNumber: e }))}
          keyboardType="phone-pad"
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
        <Text
          style={{
            fontSize: 18,
            marginBottom: 10,
            fontWeight: "bold",
          }}
        >
          Qayerga/Qabul qiluvchi?
        </Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Region", {
              type: locationType.to,
              route: routes.ADD_MAIL,
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
          value={state.customerName!}
          onChangeText={(e) => dispatch(setOrderData({ customerName: e }))}
          keyboardType="default"
          placeholder="Mijoz"
        />
        <TextInput
          style={styles.input}
          placeholder={"+998"}
          value={state.customerPhone!}
          onChangeText={(e) => dispatch(setOrderData({ customerPhone: e }))}
          keyboardType="phone-pad"
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
          value={state.matter!}
          onChangeText={(e) => dispatch(setOrderData({ matter: e }))}
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
            onPress={() => dispatch(setOrderData({ matter: "Hujjat" }))}
            style={styles.text}
          >
            Hujjat
          </Text>
          <Text
            onPress={() => dispatch(setOrderData({ matter: "Sumka" }))}
            style={styles.text}
          >
            Sumka
          </Text>
          <Text
            onPress={() => dispatch(setOrderData({ matter: "Kalit" }))}
            style={styles.text}
          >
            Kalit
          </Text>
          <Text
            onPress={() => dispatch(setOrderData({ matter: "Mahsulot" }))}
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
              status={state.otherPerson ? "checked" : "unchecked"}
              onPress={() =>
                dispatch(setOrderData({ otherPerson: !state.otherPerson }))
              }
            />
            <TouchableOpacity
              onPress={() =>
                dispatch(setOrderData({ otherPerson: !state.otherPerson }))
              }
            >
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
          {state.otherPerson && (
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
                value={state.insurance!}
                onChangeText={(e) => dispatch(setOrderData({ insurance: e }))}
                keyboardType="numeric"
              />
              <Text
                style={{
                  fontSize: 14,
                  color: "#8a8a8a",
                  marginTop: 13,
                }}
              >
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
          value={state.cost?.toString()}
          onChangeText={(e) => dispatch(setOrderData({ cost: e }))}
          keyboardType="numeric"
          placeholder="summa"
          style={styles.input}
        />
        <View style={{ flexDirection: "row", marginTop: 14 }}>
          <TouchableOpacity
            onPress={() => dispatch(setOrderData({ cost: 20000 }))}
          >
            <Text style={styles.texts}>20 000</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => dispatch(setOrderData({ cost: 30000 }))}
          >
            <Text style={styles.texts}>30 000</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => dispatch(setOrderData({ cost: 40000 }))}
          >
            <Text style={styles.texts}>40 000</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => dispatch(setOrderData({ cost: 50000 }))}
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
