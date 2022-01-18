import { useRoute } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Picker,
} from "react-native";
import { TextInputMask } from "react-native-masked-text";
import { ActivityIndicator } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { requests } from "../../api/requests";
import { images } from "../../assets";
import { LeftArrowIcon } from "../../assets/icons/icons";
import { ImagePickerTransportAvatar } from "../../components/imagePickerTransport/ImagePickerTransportAvatar";
import TrantsportTypeSelector from "../../components/TrantsportTypeSelector";
import { colors } from "../../constants/color";
import { locationType } from "../../constants/values";
import { routes } from "../../navigation/routes";
import { selectOrderState, setOrderData } from "../../redux/slices/order/order";
import { selectTransport } from "../../redux/slices/transport/transport";
import { useTransportHook } from "./hooks";
import * as ImagePicker from "react-native-image-picker";

const EditPassanger = ({ navigation }) => {
    //--------------------------------------------------------------
    const dispatch = useDispatch();

    const state = useSelector(selectOrderState);
    const transport = useSelector(selectTransport);

    const { editTransport, loading } = useTransportHook();
    const { id } = useRoute().params ? useRoute().params : { id: 0 };
    const onSubmitFrom = () => {
        editTransport(
            {
                from_region_id: state.fromRegionId,
                from_district_id: state.fromDistrictId,
                from_full_address: state.fromFullAddress,
                to_region_id: state.toRegionId,
                to_district_id: state.toDistrictId,
                transport_type: state.transportType,
                cost: state.cost,
                cost_type: state.costType,
                note: state.note,
                weight: state.weight,
                images: state.carImageId,
                otherName: state.otherName,
                otherNumber: state.otherNumber,
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
        let currentOrder = Object.values(transport).filter(
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

                otherPerson: false,

                otherNumber: "",

                otherName: "",

                transportType: currentOrder.transport_type,
            })
        );
    }, [id]);

    //-----------------------------------------------------------------------


    const [carImageResponse, setCarImageResponse] = useState<ImagePicker.Asset>(
        {}
    );

    const onImageLibraryPress = useCallback(() => {
        const options = {
            selectionLimit: 0,
            mediaType: "photo",
        };
        ImagePicker.launchImageLibrary(options, (e) => {
            setCarImageResponse(e);
        });
    }, []);

    let Images = carImageResponse?.assets;

    let carImageForm = new FormData();
    const uploadImage = async (singlePhoto, setFunction) => {
        carImageForm.append("file", {
            uri: singlePhoto.uri,
            type: singlePhoto.type,
            name: singlePhoto.fileName,
        });

        try {
            let res = await requests.uploads.uploadImage(carImageForm);
            setFunction(res.data.data.id);
        } catch (error) {}
    };

    useEffect(() => {
        if (carImageResponse.assets) {
            uploadImage(carImageResponse.assets[0], setCarImageId);
        }
    }, [carImageResponse.assets]);

    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => navigation.navigate(routes.TAB_STACK)}
                >
                    <LeftArrowIcon size={22} />
                </TouchableOpacity>
                <Text style={styles.addTransportText}>Transport qo’shish</Text>
            </View>
            <ScrollView>
                <TrantsportTypeSelector
                    value={state.transportType}
                    setValue={(e) =>
                        dispatch(setOrderData({ transportType: e }))
                    }
                />
                <View style={{ paddingHorizontal: 16, marginTop: 20 }}>
                    <Text style={{ fontSize: 14, color: colors.darkGray }}>
                        Texnika to'g'risida ma'lumot *
                    </Text>
                    <TextInput
                        style={[
                            styles.input,
                            { backgroundColor: colors.white },
                        ]}
                        value={state.note!}
                        onChangeText={(e) =>
                            dispatch(setOrderData({ note: e }))
                        }
                        placeholder="Informatsiya"
                        placeholderTextColor={colors.darkGray}
                        multiline
                        numberOfLines={2}
                    />
                </View>
                <View
                    style={{
                        paddingBottom: 5,
                        paddingHorizontal: 16,
                        paddingTop: 15,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 16,
                            marginBottom: 17,
                            color: colors.darkGray,
                        }}
                    >
                        Hozirgi manzilingiz *
                    </Text>
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate(routes.REGION, {
                                type: locationType.from,
                                route: routes.ADD_TRANSPORT,
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
                            {!!state.fromRegionName
                                ? state.fromRegionName
                                : "Viloyat"}
                            ,
                            {!!state.fromDistrictName
                                ? state.fromDistrictName
                                : "tuman"}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        paddingHorizontal: 16,
                        paddingTop: 10,
                    }}
                >
                    <Text
                        style={{
                            color: colors.darkGray,
                            fontSize: 16,
                            marginBottom: 17,
                        }}
                    >
                        Boradigan manzilingiz(kiritish majburiy emas)
                    </Text>
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate(routes.REGION, {
                                type: locationType.to,
                                route: routes.ADD_TRANSPORT,
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
                </View>
                <View
                    style={{
                        paddingHorizontal: 16,
                        paddingBottom: 40,
                        position: "relative",
                        paddingTop: 20,
                    }}
                >
                    <Text style={{ fontSize: 16, color: colors.darkGray }}>
                        Narxingiz (qatnash uchun)*
                    </Text>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            backgroundColor: colors.white,
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: colors.lightgray,
                            marginTop: 10,
                        }}
                    >
                        <View style={[styles.inputView]}>
                            <TextInput
                                style={{ fontSize: 16 }}
                                value={state.cost?.toString()}
                                onChangeText={(e) =>
                                    dispatch(setOrderData({ cost: e }))
                                }
                                placeholder="Narxni kiriting..."
                                keyboardType="numeric"
                            />
                        </View>
                        <View
                            style={{
                                width: 150,
                                backgroundColor: colors.white,
                            }}
                        >
                            <Picker
                                selectedValue={state.costType}
                                onValueChange={(itemValue, indexValue) =>
                                    dispatch(
                                        setOrderData({ costType: itemValue })
                                    )
                                }
                            >
                                {costTypes.map(({ title, value }) => {
                                    return (
                                        <Picker.Item
                                            label={title}
                                            value={value}
                                        />
                                    );
                                })}
                            </Picker>
                        </View>
                    </View>
                </View>
                <View style={{ paddingHorizontal: 16 }}>
                    <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                    >
                        <TouchableOpacity
                            onPress={() => [setImg("flex"), setImgs("none")]}
                            style={{ display: imgs }}
                        >
                            <Image source={images.rectangle} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setImg("none");
                                setImgs("flex");
                            }}
                            style={{ display: img }}
                        >
                            <Image source={images.blackRectangle} />
                        </TouchableOpacity>
                        <Text
                            style={{
                                fontSize: 14,
                                color: colors.darkGray,
                                marginLeft: 16,
                            }}
                        >
                            Boshqa odam uchun
                        </Text>
                    </View>
                </View>
                <View
                    style={{
                        display: img,
                        paddingHorizontal: 16,
                        marginTop: 21,
                    }}
                >
                    <Text style={styles.text}>Ismingizni kiriting *</Text>
                    <TextInput
                        value={state.otherName!}
                        onChangeText={(e) =>
                            dispatch(setOrderData({ otherName: e }))
                        }
                        style={[
                            styles.input,
                            { backgroundColor: colors.white, marginBottom: 21 },
                        ]}
                    />
                    <Text style={styles.text}>Telefon raqamini kiriting *</Text>
                    <TextInputMask
                        value={state.otherNumber!}
                        onChangeText={(e) =>
                            dispatch(setOrderData({ otherNumber: e }))
                        }
                        style={[
                            styles.input,
                            { backgroundColor: colors.white, marginBottom: 21 },
                        ]}
                        keyboardType="phone-pad"
                        type={"custom"}
                        options={{
                            mask: "+998 99 999 99 99 ",
                        }}
                    />
                </View>
                <View>
                    <Text
                        style={{
                            margin: 15,
                            marginTop: 15,
                            color: colors.darkGray,
                        }}
                    >
                        Transportingizni fotosurati*
                    </Text>
                    <ScrollView
                        horizontal={true}
                        style={{
                            flexDirection: "row",
                        }}
                    >
                        {!!state.images &&
                            Object.values(state.images).map((image) => {
                                return (
                                    <Image
                                        source={{ uri: image.uri }}
                                        style={{
                                            width: 150,
                                            height: 100,
                                            margin: 10,
                                            flexWrap: "nowrap",
                                        }}
                                    />
                                );
                            })}
                    </ScrollView>
                    <View style={{ flexDirection: "row" }}>
                        <ScrollView horizontal={true}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={onImageLibraryPress}
                            >
                                <ImagePickerTransportAvatar
                                    onPress={onImageLibraryPress}
                                />
                            </TouchableOpacity>
                            {!!Images &&
                                Images.map((image) => {
                                    return (
                                        <ImagePickerTransportAvatar
                                            uri={image.uri}
                                        />
                                    );
                                })}
                        </ScrollView>
                    </View>
                </View>
                <View style={{ paddingHorizontal: 16, marginVertical: 40 }}>
                    <TouchableOpacity
                        style={[
                            styles.btnOne,
                            {
                                flexDirection: "column",
                                backgroundColor: colors.brightOrangeTwo,
                            },
                        ]}
                        onPress={onSubmitFrom}
                    >
                        <Text
                            style={{
                                textAlign: "center",
                                fontSize: 16,
                                fontWeight: "bold",
                            }}
                        >
                            {loading ? <ActivityIndicator /> : "Yuborish"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </>
    );
};

export default EditPassanger;
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
    addTransportText: {
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 20,
    },
    inputView: {
        width: 200,
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
        backgroundColor: colors.white,
        paddingHorizontal: 14,
        marginBottom: 10,
        justifyContent: "space-between",
    },
});
