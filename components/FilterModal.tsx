import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { LeftArrowIcon, SearchIcon } from "../assets/icons/icons";
import MailSelector from "./MailSelector";
import { setOrderData } from "../redux/slices/order/order";
import { routes as Routes } from "../navigation/routes";
import { locationType } from "../constants/values";
import { images } from "../assets";
import { useSelector } from "react-redux";
import { selectFilterState } from "../redux/slices/filter/filter";
import { colors } from "../constants/color";

const FilterModal = ({ value = false, setValue, toggleValue }) => {
  let navigation = useNavigation();
  let state = useSelector(selectFilterState);

  useEffect(() => {
    console.log(value);
  }, [value]);

  return (
    <View>
      <Modal
        isVisible={value}
        testID={"modal"}
        swipeDirection={["down"]}
        swipeThreshold={Dimensions.get("window").width / 2}
        onSwipeComplete={() => {
          setValue(false);
        }}
        style={{
          justifyContent: "center",
          margin: 0,
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: colors.white,
          }}
        >
          <View style={styles.goBackFilter}>
            <TouchableOpacity
              onPress={() => {
                //   setValue(false);
                toggleValue();
              }}
            >
              <LeftArrowIcon size={22} />
            </TouchableOpacity>
            <Text style={styles.filterText}>Filter</Text>
          </View>
          <View style={styles.searchInputView}>
            <SearchIcon size={18} />
            <TextInput
              keyboardType="default"
              placeholder="buyurtma raqamini kiriting"
              style={styles.searchTextInput}
            />
          </View>
          <MailSelector setValue={(e) => setOrderData({ vehicleType: e })} />
          <Text
            style={{
              marginLeft: 18,
              fontSize: 15,
              fontWeight: "bold",
              marginTop: 10,
            }}
          >
            Qayerdan viloyat, tuman *
          </Text>
          <TouchableOpacity
            onPress={() => {
              setValue(false);
              navigation.navigate(Routes.REGION, {
                type: locationType.filterFrom,
                route: Routes.MAIL,
              });
            }}
            style={styles.btnOne}
          >
            <Image source={images.location} />
            <Text style={styles.locationText}>
              {!!state.filterFromRegionName
                ? state.filterFromRegionName
                : "Viloyat"}
              ,{" "}
              {!!state.filterFromDistrictName
                ? state.filterFromDistrictName
                : "tuman"}
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              marginLeft: 18,
              fontSize: 15,
              fontWeight: "bold",
              marginTop: 30,
            }}
          >
            Qayerdan viloyat, tuman *
          </Text>
          <TouchableOpacity
            onPress={() => {
              setValue(false);
              navigation.navigate(Routes.REGION, {
                type: locationType.filterTo,
                route: Routes.MAIL,
              });
            }}
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
              {!!state.toRegionName ? state.toRegionName : "Viloyat"},
              {!!state.toDistrictName ? state.toDistrictName : "tuman"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={toggleValue}
            style={styles.searchTouchBtn}
            activeOpacity={0.6}
          >
            <Text style={styles.searchTouchText}>Qidish</Text>
          </TouchableOpacity>
          <View style={styles.clearFilterView}>
            <Text style={styles.clearFilterText}>filtrni tozalash</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default FilterModal;

const styles = StyleSheet.create({
  goBackFilter: {
    backgroundColor: colors.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    paddingVertical: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    // marginTop: 20,
    paddingTop: 50,
  },
  filterText: {
    marginLeft: 130,
    fontSize: 18,
    fontWeight: "bold",
  },
  searchInputView: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: colors.gray,
    // paddingHorizontal: 45,
    marginTop: 25,
    marginHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  searchTextInput: {
    paddingHorizontal: 10,
  },
  btnOne: {
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    borderColor: colors.lightgray,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 15,
    marginTop: 5,
  },
  locationText: {
    marginLeft: 10,
    color: colors.darkGray,
    fontSize: 14,
  },
  searchTouchBtn: {
    marginHorizontal: 25,
    alignItems: "center",
    marginTop: 340,
    backgroundColor: colors.lightOrange,
    borderRadius: 10,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 5,
  },
  searchTouchText: {
    fontSize: 18,
  },
  clearFilterText: {
    fontSize: 16,
    paddingHorizontal: 10,
    color: colors.lightOrange,
  },
  clearFilterView: {
    alignItems: "center",
    marginTop: 10,
  },
});
