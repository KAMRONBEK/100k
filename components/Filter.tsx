import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { LocationIcon, ReverseArrowIcon, XIcon } from "../assets/icons/icons";
import { colors } from "../constants/color";
import { locationType } from "../constants/values";
import { routes } from "../navigation/routes";
import { selectFilterState } from "../redux/slices/filter/filter";

interface IFilterProp {
  item: any;
  editable?: boolean;
}

const Filter = ({ route, item, editable }: IFilterProp) => {
  let navigation = useNavigation();
  const state = useSelector(selectFilterState);
  const filter = useSelector(selectFilterState);

  const onPressFrom = () => {
    navigation.navigate(routes.REGION, {
      type: locationType.filterFrom,
      route: route,
    });
  };

  const onPressTo = () => {
    navigation.navigate(routes.REGION, {
      type: locationType.filterTo,
      route: route,
    });
  };

  return (
    <>
      <View style={styles.header}>
        <View style={styles.btn}>
          <View style={styles.textBox}>
            <LocationIcon size={22} color={colors.darkGray} />
            <TouchableOpacity style={styles.bt} onPress={onPressFrom}>
              {!!item.filterFromRegionName ? (
                item.filterFromRegionName
              ) : (
                <XIcon />
              )}
              <View style={styles.addressTexts}>
                <Text style={styles.btnText}>
                  {!!state.filterFromRegionName
                    ? state.filterFromRegionName
                    : "Viloyat"}
                </Text>
                <Text style={styles.btnText}>
                  {!!state.filterFromDistrictName
                    ? state.filterFromDistrictName
                    : "tuman"}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <ReverseArrowIcon size={25} color={colors.darkGray} />
        </View>
        <View style={styles.btn}>
          <View style={styles.textBox}>
            <LocationIcon size={22} color={colors.darkGray} />
            <TouchableOpacity style={styles.bt} onPress={onPressTo}>
              {/* <View style={styles.addressTexts}>
                <Text style={styles.btnText}>
                  {!!state.filterToRegionName
                    ? state.filterToRegionName
                    : "Viloyat"}
                </Text>
                <Text style={styles.btnText}>
                  {!!state.filterToDistrictName
                    ? state.filterToDistrictName
                    : "tuman"}
                </Text>
              </View> */}
            </TouchableOpacity>
          </View>
        </View>
        {editable ? (
          <View></View>
        ) : (
          filter.id !== item.filterFromRegionId && (
            <>
              <TouchableOpacity style={{ padding: 5, borderRadius: 10 }}>
                <XIcon size={18} />
              </TouchableOpacity>
            </>
          )
        )}
      </View>
    </>
  );
};

export default Filter;

const styles = StyleSheet.create({
  btnText: {
    fontSize: 13,
    color: colors.darkGray,
    marginLeft: 5,
  },
  btn: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    borderColor: colors.lightgray,
    backgroundColor: colors.white,
  },
  header: {
    marginTop: 15,
    paddingVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    justifyContent: "space-between",
  },
  bt: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  textBox: {
    paddingHorizontal: 5,
    alignItems: "center",
    flexDirection: "row",
  },
  addressTexts: {
    alignItems: "center",
    flexDirection: "column",
  },
});
