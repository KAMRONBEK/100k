import { AxiosError } from "axios";
import React, { useCallback, useEffect, useState } from "react";
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { showMessage } from "react-native-flash-message";
import { ScrollView } from "react-native-gesture-handler";
import * as ImagePicker from "react-native-image-picker";
import { TextInputMask } from "react-native-masked-text";
import { Checkbox } from "react-native-paper";
import reactotron from "reactotron-react-native";
import { requests } from "../../api/requests";
import { LeftArrowIcon } from "../../assets/icons/icons";
import { ImagePickerKuriyerAvatar } from "../../components/imagepickerKurier/imagePickerKuriyerAvatar";
import { ImagePickerKuriyerAvatarTwo } from "../../components/imagepickerKurier/imagePickerKuriyerAvatarTwo";
import { colors } from "../../constants/color";
import { useKuriyerHook } from "./hooks";

const Kuriyer = ({ navigation }) => {
    const { becomeCourier, loading } = useKuriyerHook();
    const [name, setName] = useState(null);
    const [surname, setSurname] = useState(null);
    const [phone, setPhone] = useState(null);
    const [useCar, setUseCar] = useState(false);
    const [autoData, setAutoData] = useState("");
    const [passportId, setPassportId] = useState(null);
    const [pravaId, setPravatId] = useState(null);
    const onSubmitFrom = async () => {
        becomeCourier({
            name: name,
            surname: surname,
            phone: phone,
            passport: passportId,
            drivers_license: pravaId,
        });
    };

    // ImagePicker
    const [passportResponse, setPassportResponse] = useState<ImagePicker.Asset>(
        {}
    );
    const [pravaResponse, setPravaResponse] = useState<ImagePicker.Asset>({});

    const onImageLibraryPress = useCallback(() => {
        const options = {
            selectionLimit: 1,
            mediaType: "photo",
        };
        ImagePicker.launchImageLibrary(options, (e) => {
            setPassportResponse(e);
        });
    }, []);

    const onImageLibrary = useCallback(() => {
        const options = {
            selectionLimit: 1,
            mediaType: "photo",
        };
        ImagePicker.launchImageLibrary(options, (e) => {
            setPravaResponse(e);
        });
    }, []);

    let passport = passportResponse?.assets;
    let prava = pravaResponse?.assets;

    const passportForm = new FormData();
    const uploadImage = async (singlePhoto, setFunction) => {
        passportForm.append("file", {
            uri: singlePhoto.uri,
            type: singlePhoto.type,
            name: singlePhoto.fileName,
        });

        try {
            let res = await requests.uploads.uploadImage(passportForm);
            setFunction(res.data.data.id);
        } catch (error) {}
    };
    useEffect(() => {
        if (passportResponse.assets) {
            uploadImage(passportResponse.assets[0], setPassportId);
        }
    }, [passportResponse.assets]);

    useEffect(() => {
        if (pravaResponse.assets) {
            uploadImage(pravaResponse.assets[0], setPravatId);
        }
    }, [pravaResponse.assets]);

    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <LeftArrowIcon size={22} />
                </TouchableOpacity>
                <Text style={styles.kuriyer}>Kuryer bo'lish</Text>
            </View>
            <ScrollView>
                <View style={styles.addName}>
                    <Text style={styles.addNameText}>
                        Ismingizni kiriting *
                    </Text>
                    <TextInput
                        value={name!}
                        onChangeText={setName}
                        placeholder="Ismingiz"
                        style={[
                            styles.input,
                            { backgroundColor: colors.white },
                        ]}
                    />
                    <Text style={styles.addSurenameText}>
                        Familiyangizni kiriting *
                    </Text>
                    <TextInput
                        value={surname!}
                        onChangeText={setSurname}
                        placeholder="Familiyangiz"
                        style={[
                            styles.input,
                            { backgroundColor: colors.white },
                        ]}
                    />
                    <Text style={styles.addPhoneNumber}>
                        Telefon raqamingizni kiriting *
                    </Text>
                    <TextInputMask
                        type={"custom"}
                        options={{
                            mask: "+999 99 999 99 99",
                        }}
                        value={phone!}
                        onChangeText={setPhone}
                        style={[
                            styles.input,
                            { backgroundColor: colors.white },
                        ]}
                        keyboardType="phone-pad"
                        placeholder="+998"
                    />
                    <Text
                        style={{
                            color: colors.darkGray,
                            marginTop: 20,
                            marginBottom: 13,
                        }}
                    >
                        Pasport bilan rasm *
                    </Text>
                    <View
                        style={{
                            backgroundColor: colors.white,
                            flexDirection: "row",
                            alignItems: "center",
                            borderWidth: 1,
                            borderColor: colors.darkGray,
                            borderRadius: 12,
                        }}
                    >
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={onImageLibraryPress}
                            style={{ flexDirection: "row" }}
                        >
                            <View
                                style={{
                                    borderRightWidth: 1,
                                    paddingVertical: 10,
                                    borderColor: colors.darkGray,
                                    borderTopLeftRadius: 12,
                                    borderBottomLeftRadius: 12,
                                    alignItems: "center",
                                    paddingHorizontal: 5,
                                }}
                            >
                                <ImagePickerKuriyerAvatar
                                    uri={
                                        passport && passport[0].uri
                                            ? passport[0].uri
                                            : ""
                                    }
                                    onPress={onImageLibraryPress}
                                />
                            </View>
                            <View>
                                <Text
                                    style={{
                                        color: colors.darkGray,
                                        textAlign: "center",
                                        width: 200,
                                        marginLeft: 35,
                                        marginTop: 10,
                                    }}
                                >
                                    Pasportingiz qolingizga ushab rasimga
                                    tushing, orqa tomoningizda bir xil rangdagi
                                    rasm bolishi kerak
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            paddingVertical: 10,
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <Checkbox.Android
                                color={"black"}
                                uncheckedColor={colors.gray}
                                status={useCar ? "checked" : "unchecked"}
                                onPress={() => setUseCar(!useCar)}
                            />
                            <Text style={{ marginBottom: 4 }}>
                                Avtomobilda hizmat korsatish
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={{ color: colors.darkGray, marginTop: 20 }}>
                        Avtomobil haqida ma'lumot *
                    </Text>
                    <TextInput
                        value={autoData!}
                        onChangeText={setAutoData}
                        style={[
                            styles.input,
                            { backgroundColor: colors.white },
                        ]}
                        placeholder="Rangi, 01 A 001 AA"
                    />
                    <Text
                        style={{
                            color: colors.darkGray,
                            marginTop: 20,
                            marginBottom: 13,
                        }}
                    >
                        Avtomobil haqida ma'lumot *
                    </Text>

                    <View
                        style={{
                            backgroundColor: colors.white,
                            flexDirection: "row",
                            alignItems: "center",
                            borderWidth: 1,
                            borderColor: colors.darkGray,
                            borderRadius: 12,
                        }}
                    >
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={{ flexDirection: "row" }}
                            onPress={onImageLibrary}
                        >
                            <View
                                style={{
                                    borderRightWidth: 1,
                                    paddingVertical: 12,
                                    borderColor: colors.darkGray,
                                    borderTopLeftRadius: 12,
                                    borderBottomLeftRadius: 12,
                                    alignItems: "center",
                                    paddingHorizontal: 15,
                                }}
                            >
                                <ImagePickerKuriyerAvatarTwo
                                    uri={prava && prava.uri ? prava.uri : ""}
                                    onPress={onImageLibrary}
                                />
                            </View>
                            <View>
                                <Text
                                    style={{
                                        color: colors.darkGray,
                                        textAlign: "center",
                                        width: 200,
                                        marginLeft: 35,
                                        marginTop: 10,
                                    }}
                                >
                                    Tex-pasportingiz qolingizga ushab rasimga
                                    tushing, orqa tomoningizda bir xil rangdagi
                                    rasm bolishi kerak
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={{
                            backgroundColor: "#ffc847",
                            paddingVertical: 15,
                            borderRadius: 10,
                            marginTop: 25,
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 4,
                        }}
                        onPress={onSubmitFrom}
                    >
                        <Text
                            style={{ textAlign: "center", fontWeight: "bold" }}
                        >
                            {loading ? <ActivityIndicator /> : "Yuborish"}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginBottom: 98 }} />
            </ScrollView>
        </>
    );
};

export default Kuriyer;
const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingHorizontal: 16,
        paddingVertical: 15,
        shadowColor: "#000",
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    inputView: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
        backgroundColor: colors.white,
        paddingHorizontal: 14,
        paddingVertical: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: colors.lightgray,
        borderRadius: 7,
        justifyContent: "space-between",
    },
    input: {
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
        paddingHorizontal: 13,
        paddingVertical: 12,
        borderColor: colors.darkOrange,
        borderRadius: 7,
        borderWidth: 1,
        marginRight: 10,
    },
    text: {
        fontSize: 16,
        fontWeight: "500",
        marginRight: 20,
        color: colors.darkGray,
    },
    kuriyer: {
        fontSize: 18,
        marginLeft: 110,
        fontWeight: "bold",
    },
    addName: {
        paddingHorizontal: 16,
        marginTop: 15,
    },
    addNameText: {
        color: colors.darkGray,
    },
    addSurenameText: {
        color: colors.darkGray,
        marginTop: 20,
    },
    addPhoneNumber: {
        color: colors.darkGray,
        marginTop: 20,
    },
});
