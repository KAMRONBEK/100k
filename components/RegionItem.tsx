import { useNavigation } from "@react-navigation/core";
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { images } from "../assets";
import { colors } from "../constants/color";
import { locationType } from "../constants/values";
import { routes } from "../navigation/routes";
import { setFilterData } from "../redux/slices/filter/filter";
import { setOrderData } from "../redux/slices/order/order";
import { updateProfile } from "../redux/slices/user/user";

export interface IDistrict {
    id: number;
    country_id: number;
    is_enabled: number;
    name: string;
    code: string;
}

export interface RegionItemProps {
    district: [];
    id: number;
    name: string;
    type: locationType;
    route: typeof routes;
}

const RegionItem = ({ name, district, id, type, route }: RegionItemProps) => {
    let navigation = useNavigation();
    const dispatch = useDispatch();
    let onPress = () => {
        console.log(type);

        switch (type) {
            case locationType.user:
                dispatch(updateProfile({ region_name: name, region_id: id }));
                break;
            case locationType.filterFrom:
            case locationType.filterTo:
                dispatch(
                    setFilterData({
                        [`${type}RegionId`]: id,
                        [`${type}RegionName`]: name,
                    })
                );
            default:
                dispatch(
                    setOrderData({
                        [`${type}RegionId`]: id,
                        [`${type}RegionName`]: name,
                    })
                );
                break;
        }

        navigation.navigate(
            routes.DISTRICT as never,
            {
                district: district,
                type: type,
                route: route,
            } as never
        );
    };
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Text style={styles.text}> {name} </Text>
            <Image style={styles.image} source={images.next} />
        </TouchableOpacity>
    );
};

export default RegionItem;

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
