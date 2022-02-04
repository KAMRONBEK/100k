import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { LeftArrowIcon, LocationIcon } from "../../assets/icons/icons";
import { locationType } from "../../constants/values";
import { routes } from "../../navigation/routes";
import { useSettingsHook } from "./hook";
import { updateProfile } from "../../redux/slices/user/user";
import GenderSelector from "../../components/GenderSelector";

const Private = ({ navigation }) => {
  const dispatch = useDispatch();
  const { saveSetting, loading, user } = useSettingsHook();
  const onSubmitFrom = async () => {
    saveSetting({
      country_id: user.coutry_id,
      region_name: user.region_name,
      region_id: user.region_id,
      state_id: user.state_id,
      district_name: user.district_name,
      name: user.name,
      surname: user.surname,
      address: user.address,
      gender: user.gender,
    });
  };

  return (
    <View>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <LeftArrowIcon size={22} />
        </TouchableOpacity>
        <Text style={styles.containerText}>Malumotlarni o'zgartirish</Text>
      </View>
      <ScrollView>
        <View style={styles.nameView}>
          <View>
            <Text style={styles.nameText}>Ismingizni kiriting *</Text>
            <TextInput
              style={styles.input}
              value={user.name}
              onChangeText={(e) => dispatch(updateProfile({ name: e }))}
              keyboardType="default"
              placeholder="Ism"
            />
          </View>
          <View>
            <Text style={styles.surnameText}>Familiyangizni kiriting *</Text>
            <TextInput
              style={styles.input}
              value={user.surname}
              onChangeText={(e) => dispatch(updateProfile({ surname: e }))}
              keyboardType="default"
              placeholder="Familiya"
            />
          </View>
          <Text style={styles.addressText}>Manzilingiz *</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(routes.REGION, {
                type: locationType.user,
                route: routes.PRIVATE,
              })
            }
          >
            <View style={styles.locationView}>
              <LocationIcon />
              <Text style={styles.fromlocation}>
                {!!user.region_name ? user.region_name : "Viloyat"},
                {!!user.district_name ? user.district_name : "tuman"}
              </Text>
            </View>
          </TouchableOpacity>
          <View>
            <Text style={styles.addressText}>Manzilingiz *</Text>
            <TextInput
              style={styles.input}
              value={user.address}
              onChangeText={(e) => dispatch(updateProfile({ address: e }))}
              keyboardType="default"
              placeholder="Kocha nomi, uy raqami, mo'ljal"
            />
          </View>
          <Text style={styles.maleText}>Jinsi *</Text>
          <View style={{ paddingHorizontal: 15 }}>
            <GenderSelector
              value={user.gender}
              setValue={(e) => dispatch(updateProfile({ gender: e }))}
            />
          </View>
          <View style={styles.saveView}>
            {!loading ? (
              <TouchableOpacity
                style={styles.saveTouchBtn}
                onPress={onSubmitFrom}
              >
                <Text style={styles.saveText}>{"Saqlash"}</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.activeIndctrView}>
                <ActivityIndicator size={"small"} color={"black"} />
              </View>
            )}
          </View>
          <View style={styles.phoneView}>
            <Text style={styles.phoneText}>Qo’llab quvatlash xizmati</Text>
            <Text style={styles.numbersText}>+998 71 800 80 50</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Private;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  containerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 20,
  },
  nameView: {
    paddingHorizontal: 16,
    marginTop: 22,
  },
  nameText: {
    fontSize: 14,
    color: "#8a8a8a",
  },
  surnameText: {
    fontSize: 14,
    color: "#8a8a8a",
    marginTop: 9,
  },
  addressText: {
    fontSize: 14,
    color: "#8a8a8a",
    marginTop: 9,
  },
  maleText: {
    fontSize: 14,
    color: "#8a8a8a",
    marginTop: 10,
  },
  locationView: {
    paddingVertical: 13,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#DCDCDC",
    flexDirection: "row",
    alignItems: "center",
  },
  saveView: {
    padding: 5,
    marginTop: 45,
  },
  saveTouchBtn: {
    backgroundColor: "#ffc847",
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 70,
  },
  saveText: {
    textAlign: "center",
    fontWeight: "bold",
  },
  activeIndctrView: {
    borderRadius: 40,
    padding: 20,
    backgroundColor: "#ffc847",
    flex: 1,
    height: 30,
    width: 30,
    marginBottom: 10,
    alignSelf: "center",
  },
  phoneView: {
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  phoneText: {
    fontWeight: "500",
    fontSize: 16,
  },
  numbersText: {
    fontWeight: "500",
    fontSize: 14,
    color: "#ffc847",
  },
  input: {
    borderWidth: 1,
    marginTop: 10,
    borderColor: "#DCDCDC",
    borderRadius: 10,
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 17,
    fontSize: 16,
    color: "#000",
  },
  fromlocation: {
    marginLeft: 10,
    color: "#8a8a8a",
    fontSize: 14,
  },
});
