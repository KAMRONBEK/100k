import React, { useCallback, useState } from "react";
import {
    View,
    TextInput,
    Text,
    Image,
    ScrollView,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
} from "react-native";
import { images } from "../assets";
import {
    BellIcon,
    ExitIcon,
    IDIcon,
    RetingIcon,
    WalletIcon,
} from "../assets/icons/icons";
import { ImagePickerAvatar } from "../components/imagepicker/image-picker-avatar (2)";
import { ImagePickerModal } from "../components/imagepicker/image-picker-modal (2)";
import { colors } from "../constants/color";
import { routes } from "../navigation/routes";
import { useProfileHook } from "./Profile/hooks";
import * as ImagePicker from "react-native-image-picker";

const MyCabinet = ({ navigation }) => {
    let { user, onLogout } = useProfileHook();
    const [pickerResponse, setPickerResponse] = useState<ImagePicker.Asset>({});
    const [visible, setVisible] = useState(false);

    const onImageLibraryPress = useCallback(() => {
        const options = {
            selectionLimit: 1,
            mediaType: "photo",
        };
        ImagePicker.launchImageLibrary(options, (e) => {
            setPickerResponse(e);
            setVisible(false);
        });
    }, []);

    const onCameraPress = React.useCallback(() => {
        const options = {
            saveToPhotos: true,
            mediaType: "photo",
        };
        ImagePicker.launchCamera(options, (e) => {
            setPickerResponse(e);
            setPickerResponse(false);
        });
    }, []);

    const uri = pickerResponse?.assets && pickerResponse.assets[0].uri;

    return (
        <>
            <View style={styles.shadowProp}>
                <View style={styles.viewBox}>
                    <TouchableOpacity
                        style={styles.logoutButton}
                        onPress={onLogout}
                    >
                        <ExitIcon size={22} />
                    </TouchableOpacity>
                    <Text style={styles.mycabinaet}>Mening kabinetim</Text>
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate(routes.NOTIFICATIONS)
                        }
                    >
                        <BellIcon size={22} />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView>
                <StatusBar style={styles.statusBar} />
                <View>
                    <View style={styles.screen}>
                        <ImagePickerAvatar
                            uri={uri}
                            onPress={() => setVisible(true)}
                        />
                        <ImagePickerModal
                            isVisible={visible}
                            onClose={() => setVisible(false)}
                            onImageLibraryPress={onImageLibraryPress}
                            onCameraPress={onCameraPress}
                        />
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                        marginTop: 75,
                        alignItems: "center",
                    }}
                >
                    <View
                        style={{
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <IDIcon size={40} color="#556080" />
                        <Text
                            style={{
                                fontWeight: "bold",
                                fontSize: 14,
                                // marginBottom: 4,
                            }}
                        >
                            {user?.about}
                        </Text>
                        <Text
                            style={{
                                fontWeight: "300",
                                color: "#8A8A8A",
                                fontSize: 14,
                            }}
                        >
                            id
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <WalletIcon size={40} color="#556080" />
                        <Text
                            style={{
                                fontWeight: "bold",
                                fontSize: 14,
                                marginBottom: 4,
                            }}
                        >
                            {user?.balance} so’m
                        </Text>
                        <Text
                            style={{
                                fontWeight: "300",
                                color: "#8A8A8A",
                                fontSize: 14,
                            }}
                        >
                            asosiy
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <WalletIcon size={40} color="#556080" />
                        <Text
                            style={{
                                fontWeight: "bold",
                                fontSize: 14,
                                marginBottom: 4,
                            }}
                        >
                            {user?.balance} so’m
                        </Text>
                        <Text
                            style={{
                                fontWeight: "300",
                                color: "#8A8A8A",
                                fontSize: 14,
                            }}
                        >
                            depozit
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <RetingIcon size={40} />
                        <Text
                            style={{
                                fontWeight: "bold",
                                fontSize: 14,
                                marginBottom: 4,
                            }}
                        >
                            +{user?.id}
                        </Text>
                        <Text
                            style={{
                                fontWeight: "300",
                                color: "#8A8A8A",
                                fontSize: 14,
                            }}
                        >
                            reyting
                        </Text>
                    </View>
                </View>
                <View
                    style={{
                        paddingHorizontal: 16,
                        paddingVertical: 15,
                        paddingLeft: 11,
                        marginTop: 10,
                        // marginBottom: 72,
                    }}
                >
                    <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                    >
                        <TouchableOpacity
                            onPress={() => navigation.navigate(routes.PRIVATE)}
                            style={styles.btn}
                        >
                            <Image
                                style={{ width: 45, height: 45 }}
                                source={images.courier}
                            />
                            <Text style={styles.btnText}>kuryer bolmoq</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate("OnboardingScreen")
                            }
                            style={styles.btn}
                        >
                            <Image
                                style={{ width: 45, height: 45 }}
                                source={require("../assets/use.png")}
                            />
                            <Text style={styles.btnText}>foydalanish</Text>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                    >
                        <TouchableOpacity
                            onPress={() => navigation.navigate(routes.PRIVATE)}
                            style={styles.btn}
                        >
                            <Image
                                style={{ width: 45, height: 45 }}
                                source={require("../assets/settings.png")}
                            />
                            <Text style={styles.btnText}>sozlamalar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Money")}
                            style={styles.btn}
                        >
                            <Image
                                style={{ width: 45, height: 45 }}
                                source={require("../assets/hisob.png")}
                            />
                            <Text style={styles.btnText}>
                                hisobni to'ldirish
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginTop: 17,
                        }}
                    >
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate(routes.MY_CABINET_STACK, {
                                    screen: routes.COURIER,
                                })
                            }
                            style={styles.btn}
                        >
                            <Image
                                style={{ width: 45, height: 45 }}
                                source={images.courier}
                            />
                            <Text style={styles.btnText}>kuryer bolmoq</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate(routes.ONBOARDING)
                            }
                            style={styles.btn}
                        >
                            <Image
                                style={{ width: 45, height: 45 }}
                                source={require("../assets/use.png")}
                            />
                            <Text style={styles.btnText}>foydalanish</Text>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginTop: 17,
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => navigation.navigate("About")}
                            style={styles.btn}
                        >
                            <Image
                                style={{ width: 45, height: 45 }}
                                source={require("../assets/info.png")}
                            />
                            <Text style={styles.btnText}>ilova tog’risida</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate(routes.SUPPORT)}
                            style={styles.btn}
                        >
                            <Image
                                style={{ width: 45, height: 45 }}
                                source={require("../assets/qollab.png")}
                            />
                            <Text style={styles.btnText}>
                                qo'llab-quvvatlash
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginTop: 17,
                            marginBottom: 100,
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => navigation.navigate("NoInternet")}
                            style={styles.btn}
                        >
                            <Image
                                style={{ width: 45, height: 45 }}
                                source={require("../assets/biznes.png")}
                            />
                            <Text style={styles.btnText}>biznes uchun</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("History")}
                            style={styles.btn}
                        >
                            <Image
                                style={{ width: 52.14, height: 45 }}
                                source={require("../assets/history.png")}
                            />
                            <Text style={styles.btnText}>to'lovlar tarixi</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </>
    );
};

export default MyCabinet;
const styles = StyleSheet.create({
    shadowProp: {
        shadowColor: colors.black,
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        backgroundColor: colors.white,
        paddingVertical: 21,
        paddingHorizontal: 16,
    },
    btn: {
        flexDirection: "column",
        alignItems: "center",
        borderWidth: 1,
        borderColor: colors.darkGray,
        borderRadius: 15,
        flex: 1,
        backgroundColor: colors.white,
        paddingHorizontal: 23,
        paddingVertical: 15,
        marginLeft: 5,
    },
    btnText: {
        color: colors.darkGray,
        fontSize: 14,
        fontWeight: "300",
        marginTop: 9,
    },
    image: {
        height: 80,
        width: 80,
    },
    logoutButton: {
        padding: 5,
    },
    mycabinaet: {
        fontSize: 18,
        fontWeight: "bold",
    },
    viewBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    statusBar: {
        backgroundColor: "#FFCE34",
    },
    screen: {
        // backgroundColor: "red",
        // padding: 45,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15,
    },
});
