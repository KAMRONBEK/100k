import { useRoute } from "@react-navigation/native";
import React, { useEffect } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { images } from "../../assets";
import { LeftArrowIcon } from "../../assets/icons/icons";
import LoadSelector from "../../components/LoadSelector";
import { colors } from "../../constants/color";
import { locationType } from "../../constants/values";
import { routes } from "../../navigation/routes";
import { selectLoad } from "../../redux/slices/load/load";
import { selectOrderState, setOrderData } from "../../redux/slices/order/order";
import { useLoadHook } from "./hooks";

const EditLoad = ({ navigation }) => {
    //--------------------------------------------------------------
    const dispatch = useDispatch();

    const state = useSelector(selectOrderState);
    const load = useSelector(selectLoad);

    const { editLoad, loading } = useLoadHook();
    const { id } = useRoute().params ? useRoute().params : { id: 0 };
    const onSubmitFrom = () => {
        editLoad(
            {
                from_region_id: state.fromRegionId,
                from_district_id: state.fromDistrictId,
                from_address: state.fromAddress,
                to_region_id: state.toRegionId,
                to_district_id: state.toDistrictId,
                to_address: state.toAddress,
                matter: state.info,
                cost: state.cost,
                weight: state.weight,
            },
            id
        );
    };

    let temp = {
        cost: 2000000,
        created_at: "2021-12-16 12:33:54",
        created_at_label: "1 сония аввал",
        creator_avatar:
            "https://www.gravatar.com/avatar/423bc8ebb88f4ead6b5fef84483cf3fc?s=100&d=mm",
        creator_id: 372334,
        creator_name: null,
        creator_phone: "+998998032226",
        driver_avatar: null,
        driver_id: null,
        driver_name: null,
        driver_phone: null,
        from_address: "Yangiqorgon",
        from_district_id: 207,
        from_full_address: "Toshkent shahri, Shayxontohur, Yangiqorgon",
        from_latitude: null,
        from_longitude: null,
        from_region_id: 13,
        id: 2,
        matter: "Tezroq",
        note: null,
        status: "active",
        to_address: "jomboy",
        to_district_id: 93,
        to_full_address: "Samarqand, Jomboy, jomboy",
        to_region_id: 5,
        weight: "8-16 tonna",
    };

    useEffect(() => {
        let currentOrder = Object.values(load).filter(
            (item) => item.id == id
        )[0];

        dispatch(
            setOrderData({
                fromRegionId: currentOrder.from_region_id,
                fromRegionName: currentOrder.from_full_address.split(",")[0],

                fromDistrictId: currentOrder.from_district_id,
                fromDistrictName: currentOrder.from_full_address.split(",")[1],

                fromAddress: currentOrder.from_address,
                fromNumber: "",

                toRegionId: currentOrder.to_region_id,
                toRegionName: currentOrder.to_full_address.split(",")[0],

                toDistrictId: currentOrder.to_district_id,
                toDistrictName: currentOrder.to_full_address.split(",")[1],

                toAddress: currentOrder.to_address,
                toNumber: "",

                cost: currentOrder.cost,

                info: currentOrder.matter,

                weight: currentOrder.weight,
            })
        );
    }, [id]);

    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => navigation.navigate(routes.TAB_STACK)}
                >
                    <LeftArrowIcon size={22} />
                </TouchableOpacity>
                <Text style={styles.editloadtxt}>Yukni o'zgartirish</Text>
            </View>
            <ScrollView>
                <View style={styles.fromWhere}>
                    <Text style={styles.fromwheretxt}>Qayerdan?</Text>
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate(routes.REGION, {
                                type: locationType.from,
                            })
                        }
                        style={styles.btnOne}
                    >
                        <Image source={images.location} />
                        <Text style={styles.locationicon}>
                            {!!state.fromRegionName
                                ? state.fromRegionName
                                : "Viloyat"}
                            ,
                            {!!state.fromDistrictName
                                ? state.fromDistrictName
                                : "tuman"}
                        </Text>
                    </TouchableOpacity>
                    <TextInput
                        style={styles.input}
                        value={state.fromAddress}
                        onChangeText={(e) =>
                            dispatch(setOrderData({ fromAddress: e }))
                        }
                        keyboardType="default"
                        placeholder="Kocha nomi, uy raqami, mo’jal"
                    />
                </View>
                <View style={styles.tocontainer}>
                    <Text style={styles.towhere}>Qayerga?</Text>
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate(routes.REGION, {
                                type: locationType.to,
                            })
                        }
                        style={styles.btnOne}
                    >
                        <Image source={images.location} />
                        <Text style={styles.tolocation}>
                            {!!state.toRegionName
                                ? state.toRegionName
                                : "Viloyat"}
                            ,
                            {!!state.toDistrictName
                                ? state.toDistrictName
                                : "tuman"}
                        </Text>
                    </TouchableOpacity>
                    <TextInput
                        style={styles.input}
                        value={state.toAddress}
                        onChangeText={(e) =>
                            dispatch(setOrderData({ toAddress: e }))
                        }
                        keyboardType="default"
                        placeholder="Kocha nomi, uy raqami, mo’jal"
                    />
                </View>

                <LoadSelector
                    value={state.weight}
                    setValue={(e) => dispatch(setOrderData({ weight: e }))}
                />
                <View
                    style={{
                        paddingVertical: 19,
                        backgroundColor: colors.white,
                        paddingHorizontal: 16,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: "bold",
                            marginBottom: 17,
                        }}
                    >
                        Qo’shimcha ma’lumot?
                    </Text>
                    <TextInput
                        style={styles.input}
                        value={state.info!}
                        onChangeText={(e) =>
                            dispatch(setOrderData({ info: e }))
                        }
                        keyboardType="default"
                        placeholder="Qo'shimcha ma'lumot kiriting"
                    />
                </View>
                <View
                    style={{
                        marginTop: 20,
                        paddingVertical: 19,
                        paddingHorizontal: 16,
                        backgroundColor: colors.white,
                    }}
                >
                    <Text style={{ fontWeight: "bold" }}>
                        Yukni yetkazib berish narxi
                    </Text>
                    <TextInput
                        value={state.cost?.toString()}
                        onChangeText={(e) =>
                            dispatch(setOrderData({ cost: e }))
                        }
                        keyboardType="numeric"
                        style={styles.input}
                    />
                    <View style={{ flexDirection: "row", marginTop: 14 }}>
                        <TouchableOpacity
                            onPress={() =>
                                dispatch(setOrderData({ cost: "500 000" }))
                            }
                        >
                            <Text style={styles.text}>500 000</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() =>
                                dispatch(setOrderData({ cost: "1 000 000" }))
                            }
                        >
                            <Text style={styles.text}>1 000 000</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() =>
                                dispatch(setOrderData({ cost: "2 000 000" }))
                            }
                        >
                            <Text style={styles.text}>2 000 000</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() =>
                                dispatch(setOrderData({ cost: "3 000 000" }))
                            }
                        >
                            <Text style={styles.text}>3 000 000</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={[
                            styles.btnOne,
                            {
                                marginBottom: 35,
                                flexDirection: "column",
                                marginTop: 23,
                                backgroundColor: colors.brightOrangeTwo,
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
                            {loading ? <ActivityIndicator /> : "Saqlash"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </>
    );
};

export default EditLoad;
const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingHorizontal: 16,
        paddingVertical: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: colors.lightgray,
        borderRadius: 10,
        padding: 14,
        marginTop: 10,
    },
    btnOne: {
        backgroundColor: colors.white,
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderRadius: 10,
        borderColor: colors.lightgray,
        borderWidth: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    btn: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderColor: colors.darkOrange,
        borderRadius: 10,
        borderWidth: 1,
        marginRight: 18,
    },
    text: {
        fontSize: 14,
        fontWeight: "500",
        marginRight: 20,
        color: colors.darkGray,
    },
    editloadtxt: {
        marginLeft: 25,
        fontSize: 18,
        fontWeight: "bold",
    },
    fromWhere: {
        paddingBottom: 19,
        paddingHorizontal: 16,
        backgroundColor: colors.white,
        marginTop: 20,
        paddingTop: 19,
    },
    fromwheretxt: {
        fontSize: 16,
        marginBottom: 17,
        fontWeight: "700",
    },
    locationicon: {
        marginLeft: 10,
        color: colors.darkGray,
        fontSize: 14,
    },
    tocontainer: {
        paddingBottom: 19,
        paddingHorizontal: 16,
        backgroundColor: colors.white,
        marginTop: 20,
        paddingTop: 19,
    },
    towhere: {
        fontSize: 16,
        marginBottom: 17,
        fontWeight: "700",
    },
    tolocation: {
        marginLeft: 10,
        color: colors.darkGray,
        fontSize: 14,
    },
});
