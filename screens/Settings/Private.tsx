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
import { useDispatch } from "react-redux";
import { LeftArrowIcon, LocationIcon } from "../../assets/icons/icons";
import { locationType } from "../../constants/values";
import { routes } from "../../navigation/routes";
import { useSettingsHook } from "./hook";
import { updateProfile } from "../../redux/slices/user/user";
import GenderSelector from "../../components/GenderSelector";

const Private = () => {
  let navigation = useNavigation();
  // -----------------------------------------------
  // const state = useSelector(selectOrderState);

  // const {create}
  let dispatch = useDispatch();
  const { saveSetting, loading, user } = useSettingsHook();
  const onSubmitFrom = () => {
    saveSetting({
      country_id: user.region_id,
      region_name: user.region_name,
      state_id: user.district_id,
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
          <LeftArrowIcon />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 50 }}>
          Malumotlarni o'zgartirish
        </Text>
      </View>
      <ScrollView>
        <View style={{ paddingHorizontal: 16, marginTop: 22 }}>
          <View>
            <Text style={{ fontSize: 14, color: "#8a8a8a" }}>
              Ismingizni kiriting *
            </Text>
            <TextInput
              style={styles.input}
              value={user.name}
              onChangeText={(e) => dispatch(updateProfile({ name: e }))}
              keyboardType="default"
              placeholder="Ism"
            />
          </View>

          <View>
            <Text style={{ fontSize: 14, color: "#8a8a8a", marginTop: 9 }}>
              Familiyangizni kiriting *
            </Text>
            <TextInput
              style={styles.input}
              value={user.surname}
              onChangeText={(e) => dispatch(updateProfile({ surname: e }))}
              keyboardType="default"
              placeholder="Familiya"
            />
          </View>
          <Text style={{ fontSize: 14, color: "#8a8a8a", marginTop: 9 }}>
            Manzilingiz *
          </Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(routes.REGION, {
                type: locationType.user,
                route: routes.PRIVATE,
              })
            }
          >
            <View
              style={{
                paddingVertical: 13,
                paddingHorizontal: 15,
                backgroundColor: "#fff",
                borderRadius: 10,
                marginTop: 10,
                borderWidth: 1,
                borderColor: "#DCDCDC",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <LocationIcon />
              <Text style={styles.fromlocation}>
                {!!user.region_name ? user.region_name : "Viloyat"},{" "}
                {!!user.district_name ? user.district_name : "tuman"}
              </Text>
            </View>
          </TouchableOpacity>

          <View>
            <Text style={{ fontSize: 14, color: "#8a8a8a", marginTop: 9 }}>
              Manzilingiz *
            </Text>
            <TextInput
              style={styles.input}
              value={user.address}
              onChangeText={(e) => dispatch(updateProfile({ address: e }))}
              keyboardType="default"
              placeholder="Kocha nomi, uy raqami, mo'ljal"
            />
          </View>
          <Text style={{ fontSize: 14, color: "#8a8a8a", marginTop: 10 }}>
            Jinsi *
          </Text>
          <View>
            <GenderSelector
              value={user.gender}
              setValue={(e) => dispatch(updateProfile({ gender: e }))}
            />
          </View>
          <View style={{ padding: 5, marginTop: 45 }}>
            {!loading ? (
              <TouchableOpacity
                style={{
                  backgroundColor: "#ffc847",
                  paddingVertical: 15,
                  borderRadius: 10,
                }}
                onPress={onSubmitFrom}
              >
                <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                  {"Saqlash"}
                </Text>
              </TouchableOpacity>
            ) : (
              <View
                style={{
                  borderRadius: 40,
                  padding: 20,
                  backgroundColor: "#ffc847",
                  flex: 1,
                  height: 30,
                  width: 30,
                  marginBottom: 10,
                  alignSelf: "center",
                }}
              >
                <ActivityIndicator size={"small"} color={"black"} />
              </View>
            )}
          </View>
          <View
            style={{
              marginTop: 30,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontWeight: "500", fontSize: 16 }}>
              Qo’llab quvatlash xizmati
            </Text>
            <Text style={{ fontWeight: "500", fontSize: 14, color: "#ffc847" }}>
              +998 71 800 80 50
            </Text>
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
