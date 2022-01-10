import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import {
    ExitIcon,
    LocationIcon,
    ReverseArrowIcon,
} from "../assets/icons/icons";
import { colors } from "../constants/color";
import { locationType } from "../constants/values";
import { routes } from "../navigation/routes";
import { selectFilterState } from "../redux/slices/filter/filter";

const Filter = ({ route }) => {
    let navigation = useNavigation();
    const state = useSelector(selectFilterState);

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
        <View style={styles.header}>
            <View style={styles.btn}>
                <View style={styles.textBox}>
                    <LocationIcon size={22} color={colors.darkGray} />
                    <TouchableOpacity style={styles.bt} onPress={onPressFrom}>
                        <View>
                            <Text style={styles.btntext}>
                                {!!state.filterFromRegionName
                                    ? state.filterFromRegionName
                                    : "Viloyat"}
                            </Text>
                            <Text style={styles.btntext}>
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
                        <View>
                            <Text style={styles.btntext}>
                                {!!state.filterToRegionName
                                    ? state.filterToRegionName
                                    : "Viloyat"}
                            </Text>
                            <Text style={styles.btntext}>
                                {!!state.filterToDistrictName
                                    ? state.filterToDistrictName
                                    : "tuman"}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default Filter;

const styles = StyleSheet.create({
    btntext: {
        fontSize: 13,
        marginHorizontal: 8,
        color: colors.darkGray,
    },
    btn: {
        borderWidth: 1,
        borderRadius: 8,
        paddingVertical: 10,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 5,
        borderColor: colors.lightgray,
        backgroundColor: colors.white,
    },
    header: {
        marginTop: 15,
        paddingVertical: 5,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        justifyContent: "space-between",
    },
    bt: {
        flexDirection: "row",
        alignItems: "center",
    },
    textBox: {
        paddingHorizontal: 5,
        alignItems: "center",
        flexDirection: "row",
    },
});
