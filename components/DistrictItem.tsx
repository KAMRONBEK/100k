import { useNavigation } from "@react-navigation/core";
import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { images } from "../assets";
import { colors } from "../constants/color";
import { locationType } from "../constants/values";
import { routes } from "../navigation/routes";
import { setFilterData } from "../redux/slices/filter/filter";
import { setOrderData } from "../redux/slices/order/order";
import { updateProfile } from "../redux/slices/user/user";

export interface DistrictItemProps {
    name: string;
    id: number;
    type: locationType;
    route: any;
}

const DistrictItem = ({ name, id, type, route }: DistrictItemProps) => {
    let navigation = useNavigation();
    const dispatch = useDispatch();

    let onPress = () => {
        switch (type) {
            case locationType.user:
                dispatch(
                    updateProfile({
                        district_name: name,
                        district_id: id,
                    })
                );
                break;
            case locationType.filterFrom:
            case locationType.filterTo:
                dispatch(
                    setFilterData({
                        [`${type}DistrictId`]: id,
                        [`${type}DistrictName`]: name,
                    })
                );
            default:
                dispatch(
                    setOrderData({
                        [`${type}DistrictId`]: id,
                        [`${type}DistrictName`]: name,
                    })
                );
                break;
        }

        // navigation.navigate(routes.ADD_MAIL);
        // navigation.popToTop();
        // navigation.pop().pop;
        navigation.navigate(route);
    };

    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Text style={styles.text}>{name}</Text>
            <Image source={images.next} style={styles.image} />
        </TouchableOpacity>
    );
};

export default DistrictItem;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 15,
        paddingHorizontal: 10,
        backgroundColor: colors.white,
        marginTop: 2,
    },
    text: {
        fontSize: 18,
        fontWeight: "500",
    },
    image: {
        marginRight: 5,
    },
});
