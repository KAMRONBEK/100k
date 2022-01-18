import { useRoute } from "@react-navigation/native";
import React, { useEffect, useReducer, useState } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { TextInputMask } from "react-native-masked-text";
import { ActivityIndicator, Checkbox } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { images } from "../../assets";
import { LeftArrowIcon } from "../../assets/icons/icons";
import MailSelector from "../../components/MailSelector";
import SeatSelector from "../../components/SeatSelector";
import { colors } from "../../constants/color";
import { locationType } from "../../constants/values";
import { routes } from "../../navigation/routes";
import { selectMail } from "../../redux/slices/mail/mail";
import { selectOrderState, setOrderData } from "../../redux/slices/order/order";
import { useMailHook } from "./hooks";

const EditMail = ({ navigation }) => {
    //--------------------------------------------------------------
    const dispatch = useDispatch();

    const state = useSelector(selectOrderState);
    const mail = useSelector(selectMail);

    const { editMail, loading } = useMailHook();
    const { id } = useRoute().params ? useRoute().params : { id: 0 };
    const onSubmitFrom = () => {
        editMail(
            {
                from_region_id: state.fromRegionId,
                from_district_id: state.fromDistrictId,
                to_region_id: state.toRegionId,
                to_district_id: state.toDistrictId,
                from_address: state.fromFullAddress,
                to_address: state.toAddress,
                note: state.note,
                cash_amount: state.cashAmount,
                delivery_fee_amount: state.deliveryFeeAmount,
                creator_phone: state.creatorPhone,
                recipient_name: state.recipientName,
                recipient_phone: state.recipientPhone,
                client_name: state.name,
                insurance_amount: state.insurance,
                matter: state.matter,
                vehicle_type: state.vehicleType,
            },
            id
        );
    };

    // let temp = {
    //     book_front_seat: 1,
    //     cost: 23000,
    //     created_at: "2021-12-08 16:49:30",
    //     created_at_label: "1 сония аввал",
    //     creator_avatar:
    //         "https://www.gravatar.com/avatar/423bc8ebb88f4ead6b5fef84483cf3fc?s=100&d=mm",
    //     creator_id: 372334,
    //     creator_name: null,
    //     creator_phone: "+998998032226",
    //     driver_avatar: null,
    //     driver_id: null,
    //     driver_name: null,
    //     driver_phone: null,
    //     from_address: "Yakkasaroy kochasi 15-uy777",
    //     from_district_id: 13,
    //     from_full_address: "Fargona, Rishton, Yakkasaroy kochasi 15-uy777",
    //     from_latitude: null,
    //     from_longitude: null,
    //     from_region_id: 1,
    //     id: 1,
    //     note: "Alohida olib keling",
    //     seat_count: 1,
    //     seat_count_label: "1 kishi",
    //     status: "active",
    //     to_address: "Guliston katta ko'cha 25-uy777",
    //     to_district_id: 62,
    //     to_full_address: "Sirdaryo, Guliston, Guliston katta ko'cha 25-uy777",
    //     to_region_id: 3,
    // };

    useEffect(() => {
        let currentOrder = Object.values(mail).filter(
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

                // cashAmount: currentOrder.cash_amount,
                delivery_fee_amount: currentOrder.delivery_fee_amount,

                otherPerson: false,

                otherNumber: "",

                otherName: "",

                insurance_amount: currentOrder.insurance_amount,
            })
        );
    }, [id]);

    console.log("state: ", JSON.stringify(state, null, 4));

    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => navigation.navigate(routes.TAB_STACK)}
                >
                    <LeftArrowIcon size={22} />
                </TouchableOpacity>
                <Text
                    style={{ fontSize: 18, fontWeight: "bold", marginLeft: 20 }}
                >
                    Pochta o'zgartirish
                </Text>
            </View>
            <ScrollView>
                <MailSelector
                    value={state.vehicleType}
                    setValue={(e) => dispatch(setOrderData({ vehicleType: e }))}
                />
                <View style={styles.whereGived}>
                    <Text style={styles.whereGivedText}>Qayerdan/olish</Text>
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate(routes.REGION, {
                                type: locationType.from,
                            })
                        }
                        style={styles.btnOne}
                    >
                        <Image source={images.location} />
                        <Text style={styles.locationText}>
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
                    <TextInput
                        style={styles.input}
                        value={state.name!}
                        onChangeText={(e) =>
                            dispatch(setOrderData({ name: e }))
                        }
                        keyboardType="default"
                        placeholder="Yuboruvchi Ismi"
                    />
                    <TextInputMask
                        type={"custom"}
                        options={{
                            mask: "+999 99 999 99 99",
                        }}
                        value={state.creatorPhone?.toString()}
                        onChangeText={(e) =>
                            dispatch(setOrderData({ creatorPhone: e }))
                        }
                        style={[
                            styles.input,
                            { backgroundColor: colors.white },
                        ]}
                        keyboardType="phone-pad"
                        placeholder="+998"
                    />
                </View>
                <View
                    style={{
                        paddingBottom: 19,
                        paddingHorizontal: 16,
                        backgroundColor: colors.white,
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
                            navigation.navigate(routes.REGION, {
                                type: locationType.to,
                            })
                        }
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
                    <TextInput
                        style={styles.input}
                        value={state.recipientName!}
                        onChangeText={(e) =>
                            dispatch(setOrderData({ recipientName: e }))
                        }
                        keyboardType="default"
                        placeholder="Mijoz"
                    />
                    <TextInputMask
                        type={"custom"}
                        options={{
                            mask: "+999 99 999 99 99",
                        }}
                        value={state.recipientPhone?.toString()}
                        onChangeText={(e) =>
                            dispatch(setOrderData({ recipientPhone: e }))
                        }
                        style={[
                            styles.input,
                            { backgroundColor: colors.white },
                        ]}
                        keyboardType="phone-pad"
                        placeholder="+998"
                    />
                    <View
                        style={{
                            marginTop: 10,
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <Checkbox.Android
                            color={"black"}
                            uncheckedColor={colors.gray}
                            status={state.cashAmount ? "checked" : "unchecked"}
                            onPress={() =>
                                dispatch(
                                    setOrderData({
                                        cashAmount: !state.cashAmount,
                                    })
                                )
                            }
                        />
                        <TouchableOpacity
                            onPress={() =>
                                dispatch(
                                    setOrderData({
                                        cashAmount: !state.cashAmount,
                                    })
                                )
                            }
                        >
                            <Text
                                style={{
                                    fontSize: 14,
                                    fontWeight: "500",
                                    marginLeft: 12,
                                }}
                            >
                                Qabul qiluvchi maxsulotni sotib oladi
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {!!state.cashAmount && (
                        <>
                            <TextInput
                                style={styles.input}
                                value={state.cashAmount?.toString()}
                                onChangeText={(e) =>
                                    dispatch(setOrderData({ cashAmount: e }))
                                }
                                keyboardType="numeric"
                                placeholder="Mijozdan olinadigan summa"
                            />
                        </>
                    )}
                </View>
                <View
                    style={{
                        paddingVertical: 19,
                        marginTop: 20,
                        paddingHorizontal: 16,
                        backgroundColor: colors.white,
                    }}
                >
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                        Nma yetqazib berish kerak?
                    </Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="default"
                        value={state.matter?.toString()}
                        onChangeText={(e) =>
                            dispatch(setOrderData({ matter: e }))
                        }
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
                            onPress={() =>
                                dispatch(setOrderData({ matter: "Hujjat" }))
                            }
                            style={styles.text}
                        >
                            Hujjat
                        </Text>
                        <Text
                            onPress={() =>
                                dispatch(setOrderData({ matter: "Sumka" }))
                            }
                            style={styles.text}
                        >
                            Sumka
                        </Text>
                        <Text
                            onPress={() =>
                                dispatch(setOrderData({ matter: "Kalit" }))
                            }
                            style={styles.text}
                        >
                            Kalit
                        </Text>
                        <Text
                            onPress={() =>
                                dispatch(setOrderData({ matter: "Mahsulot" }))
                            }
                            style={styles.text}
                        >
                            Mahsulot
                        </Text>
                    </View>
                    <View style={{ marginTop: 14 }}>
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
                                uncheckedColor={colors.gray}
                                status={
                                    state.otherPerson ? "checked" : "unchecked"
                                }
                                onPress={() =>
                                    dispatch(
                                        setOrderData({
                                            otherPerson: !state.otherPerson,
                                        })
                                    )
                                }
                            />
                            <TouchableOpacity
                                onPress={() =>
                                    dispatch(
                                        setOrderData({
                                            otherPerson: !state.otherPerson,
                                        })
                                    )
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
                        {!!state.otherPerson ? (
                            <View
                                style={{
                                    paddingVertical: 19,
                                    backgroundColor: colors.white,
                                    paddingHorizontal: 16,
                                }}
                            >
                                <View
                                    style={{
                                        borderWidth: 1,
                                        borderColor: colors.gray,
                                        marginBottom: 15,
                                        opacity: 0.2,
                                    }}
                                ></View>
                                <Text
                                    style={{ fontSize: 16, fontWeight: "500" }}
                                >
                                    Mahsulot / jo’natma qiymati?
                                </Text>
                                <TextInput
                                    style={styles.input}
                                    value={state.insurance?.toString()}
                                    onChangeText={(e) =>
                                        dispatch(setOrderData({ insurance: e }))
                                    }
                                    keyboardType="numeric"
                                    placeholder="Narxi"
                                />
                                <Text
                                    style={{
                                        fontSize: 14,
                                        color: colors.darkGray,
                                        marginTop: 13,
                                    }}
                                >
                                    Avtomatic kalkulyator sizning qoldirgan
                                    sug’urtangizdan 0,5% yechib oladi, shuning
                                    dek ushbu jo’natma faqat hamyonida
                                    yetarlicha mablag bo’lgan kuryerlarga
                                    ko’rsatiladi, mahsulotga yoki jonatmaga
                                    zarar yetqazilgan taqdirda reglament boyicha
                                    3 ish kunida ushbu summa tiklab beradi.
                                </Text>
                            </View>
                        ) : undefined}
                    </View>
                </View>
                <View
                    style={{
                        marginTop: 20,
                        paddingVertical: 19,
                        paddingHorizontal: 16,
                        backgroundColor: colors.white,
                    }}
                >
                    <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                        Yetkazib berish narxi *
                    </Text>
                    <TextInput
                        value={state.deliveryFeeAmount?.toString()}
                        onChangeText={(e) =>
                            dispatch(setOrderData({ deliveryFeeAmount: e }))
                        }
                        keyboardType="numeric"
                        placeholder="summa"
                        style={styles.input}
                    />
                    <View style={{ flexDirection: "row", marginTop: 14 }}>
                        <TouchableOpacity
                            onPress={() =>
                                dispatch(
                                    setOrderData({ deliveryFeeAmount: "20000" })
                                )
                            }
                        >
                            <Text style={styles.texts}>20 000</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() =>
                                dispatch(
                                    setOrderData({ deliveryFeeAmount: "30000" })
                                )
                            }
                        >
                            <Text style={styles.texts}>30 000</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() =>
                                dispatch(
                                    setOrderData({ deliveryFeeAmount: "40000" })
                                )
                            }
                        >
                            <Text style={styles.texts}>40 000</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() =>
                                dispatch(
                                    setOrderData({ deliveryFeeAmount: "50000" })
                                )
                            }
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
                                backgroundColor: colors.orange,
                                shadowColor: "#000",
                                shadowOffset: { width: 0, height: 1 },
                                shadowOpacity: 0.8,
                                shadowRadius: 2,
                                elevation: 5,
                            },
                        ]}
                        onPress={onSubmitFrom}
                    >
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: "500",
                                textAlign: "center",
                                textTransform: "uppercase",
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

export default EditMail;
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
    texts: {
        fontSize: 15,
        fontWeight: "500",
        marginRight: 20,
        color: colors.darkGray,
    },
    whereGived: {
        paddingBottom: 19,
        paddingHorizontal: 16,
        backgroundColor: colors.white,
        marginTop: 20,
        paddingTop: 19,
    },
    whereGivedText: {
        fontSize: 18,
        marginBottom: 10,
        fontWeight: "bold",
    },
    locationText: {
        marginLeft: 10,
        color: colors.darkGray,
        fontSize: 14,
    },
    inputInformation: {
        height: 100,
        fontSize: 14,
        marginTop: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: colors.lightgray,
        paddingHorizontal: 14,
    },
    mailText: {
        fontSize: 18,
        marginLeft: 20,
        fontWeight: "bold",
    },
});
