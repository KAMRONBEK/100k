import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Pressable,
    Button,
    TouchableWithoutFeedback,
} from "react-native";
import Modal from "react-native-modal";
import { useDispatch, useSelector } from "react-redux";
import { images } from "../assets";
import {
    ArrowLeftIcon,
    CheckedIcon,
    PensolIcon,
    PlusIcon,
    XIcon,
} from "../assets/icons/icons";
import { colors } from "../constants/color";
import { routes } from "../navigation/routes";
import { setOrderData } from "../redux/slices/order/order";
import { logoutUser, selectUser } from "../redux/slices/user/user";

interface IMailProp {
    item: any;
    editable?: boolean;
}

const MailItem = ({ item, editable }: IMailProp) => {
    let navigation = useNavigation();
    let user = useSelector(selectUser);
    let dispatch = useDispatch();

    // const [modalVisible, setModalVisible] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const [isModalVisibleTwo, setModalVisibleTwo] = useState(false);

    const toggleModalTwo = () => {
        setModalVisibleTwo(!isModalVisibleTwo);
    };
    return (
        <View
            style={{
                backgroundColor: colors.white,
                paddingVertical: 21,
                paddingHorizontal: 16,
                borderWidth: 0.5,
                borderColor: colors.gray,
                marginBottom: 10,
                borderRadius: 10,
            }}
        >
            <View
                style={{
                    paddingBottom: 15,
                    justifyContent: "space-between",
                    flexDirection: "row",
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "flex-end",
                    }}
                >
                    <Image source={images.coin} />
                    <Text
                        style={{
                            fontWeight: "bold",
                            fontSize: 15,
                            marginLeft: 12,
                        }}
                    >
                        {item.cash_amount} sum
                    </Text>
                </View>
                <View
                    style={{
                        backgroundColor: "#dbfaec",
                        paddingHorizontal: 10,
                        padding: 5,
                        borderRadius: 8,
                        opacity: 1,
                    }}
                >
                    <Text style={{ color: colors.darkGreen }}>
                        {item.status}
                    </Text>
                </View>
            </View>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <Image
                        style={{
                            width: 10,
                            height: 10,
                            marginRight: 12,
                        }}
                        source={images.ellipse}
                    />
                    <Text style={{ fontSize: 15, fontWeight: "normal" }}>
                        {item.from_full_address}
                    </Text>
                </View>
                <View>
                    <Text style={{ color: colors.darkGray, fontSize: 12 }}>
                        #{item.id}
                    </Text>
                </View>
            </View>

            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: -5.3,
                }}
            >
                <Image
                    style={{ width: 10, height: 10, marginRight: 12 }}
                    source={images.ellipse}
                />
                <Text
                    style={{
                        fontSize: 15,
                        fontWeight: "normal",
                        color: colors.black,
                    }}
                >
                    {item.to_full_address}
                </Text>
            </View>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 21,
                }}
            >
                <Image source={images.clock} />
                <Text
                    style={{
                        marginLeft: 10,
                        color: colors.darkGray,
                        fontSize: 15,
                    }}
                >
                    Amal qilish muddati:
                </Text>
                <Text style={{ fontWeight: "bold", fontSize: 17 }}>
                    {item.expired_at}
                </Text>
            </View>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 10,
                }}
            >
                <Image source={images.security} />
                <Text
                    style={{
                        marginLeft: 10,
                        color: colors.darkGray,
                        fontSize: 15,
                    }}
                >
                    Sug'urta summasi:
                </Text>
                <Text style={{ fontWeight: "bold", fontSize: 17 }}>
                    {item.insurance_amount} sum
                </Text>
            </View>
            <View
                style={{
                    borderTopWidth: 1,
                    borderStyle: "solid",
                    borderColor: colors.grey,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: 10,
                    alignItems: "center",
                }}
            >
                <View style={styles.borderBottom}>
                    <View style={styles.avatarwrapper}>
                        <Image
                            source={{ uri: item.creator_avatar }}
                            style={{
                                width: 35,
                                height: 35,
                                borderRadius: 25,
                            }}
                        />
                        <View>
                            <Text
                                style={{
                                    marginLeft: 10,
                                    color: "gray",
                                    fontWeight: "500",
                                }}
                            >
                                {!!item.creator_name
                                    ? item.creator_name
                                    : "Anonim"}
                                {user.id == item.creator_id && " (siz)"}
                            </Text>
                            <Text
                                style={{
                                    marginLeft: 10,
                                    color: "gray",
                                    fontWeight: "600",
                                }}
                            >
                                {item.created_at}
                            </Text>
                        </View>
                    </View>
                    {editable ? (
                        <View
                            style={{
                                flexDirection: "row",
                            }}
                        >
                            <View>
                                <Modal
                                    isVisible={isModalVisibleTwo}
                                    testID={"modal"}
                                    onBackdropPress={() =>
                                        setModalVisibleTwo(false)
                                    }
                                    swipeDirection={[
                                        "up",
                                        "left",
                                        "right",
                                        "down",
                                    ]}
                                    style={{
                                        justifyContent: "center",
                                        margin: 0,
                                    }}
                                >
                                    <View
                                        style={{
                                            backgroundColor: colors.white,
                                            marginHorizontal: 30,
                                            paddingVertical: 20,
                                            paddingHorizontal: 20,
                                            borderRadius: 10,
                                        }}
                                    >
                                        <Text style={{ fontSize: 16 }}>
                                            Buyurtmangizni
                                        </Text>
                                        <Text style={{ fontSize: 16 }}>
                                            o'chirmoqchimisiz?
                                        </Text>
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                paddingVertical: 10,
                                                marginLeft: 100,
                                                marginHorizontal: 10,
                                                marginTop: 10,
                                                justifyContent: "space-evenly",
                                            }}
                                        >
                                            <TouchableWithoutFeedback
                                                onPress={toggleModalTwo}
                                            >
                                                <Text
                                                    style={{
                                                        color: colors.darkGray,
                                                        paddingRight: 20,
                                                    }}
                                                >
                                                    BEKOR QILISH
                                                </Text>
                                            </TouchableWithoutFeedback>
                                            <TouchableWithoutFeedback
                                                onPress={toggleModalTwo}
                                            >
                                                <Text
                                                    style={{
                                                        color: colors.orange,
                                                        paddingLeft: 20,
                                                    }}
                                                >
                                                    O'CHIRISH
                                                </Text>
                                            </TouchableWithoutFeedback>
                                        </View>
                                    </View>
                                </Modal>
                                <TouchableOpacity
                                    onPress={toggleModalTwo}
                                    style={styles.iconsbutton}
                                >
                                    <XIcon size={15} />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity
                                style={styles.pensolbutton}
                                onPress={() =>
                                    navigation.navigate(routes.ADD_MAIL, {
                                        id: item.id,
                                    })
                                }
                            >
                                <PensolIcon color={colors.white} size={15} />
                            </TouchableOpacity>
                            <View>
                                <Modal
                                    isVisible={isModalVisible}
                                    testID={"modal"}
                                    onBackdropPress={() =>
                                        setModalVisible(false)
                                    }
                                    swipeDirection={[
                                        "up",
                                        "left",
                                        "right",
                                        "down",
                                    ]}
                                    style={{
                                        justifyContent: "flex-end",
                                        margin: 0,
                                    }}
                                >
                                    <View
                                        style={{
                                            backgroundColor: colors.white,
                                        }}
                                    >
                                        <View
                                            style={{
                                                alignItems: "center",
                                                flexDirection: "row",
                                                marginHorizontal: 10,
                                                borderBottomWidth: 1,
                                                borderBottomColor: colors.gray,
                                            }}
                                        >
                                            <TouchableOpacity
                                                style={{
                                                    borderRadius: 30,
                                                }}
                                            >
                                                <ArrowLeftIcon size={30} />
                                            </TouchableOpacity>
                                            <View
                                                style={{
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    marginHorizontal: 90,
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        fontSize: 18,
                                                        alignItems: "center",
                                                        justifyContent:
                                                            "center",
                                                        textAlign: "center",
                                                        paddingVertical: 10,
                                                    }}
                                                >
                                                    E'lonni yakunlash
                                                </Text>
                                            </View>
                                        </View>
                                        <View
                                            style={{
                                                marginHorizontal: 10,
                                                marginVertical: 20,
                                                marginBottom: 50,
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    textAlign: "center",
                                                    fontSize: 16,
                                                }}
                                            >
                                                Agar siz o'zingizga kerakli
                                                haydovchini topgan bo'lsangiz
                                                quyidagi yakunlash tugmasiga
                                                bosing. Yakunlangan e'lon qaytib
                                                haydovchilarga ko'rsatilmaydi
                                            </Text>
                                        </View>
                                        <TouchableWithoutFeedback
                                            onPress={toggleModal}
                                        >
                                            <View
                                                style={{
                                                    backgroundColor:
                                                        colors.lightOrange,
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    marginHorizontal: 15,
                                                    paddingVertical: 12,
                                                    borderRadius: 10,
                                                    marginVertical: 30,
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        fontSize: 15,
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    YAKUNLASH
                                                </Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    </View>
                                </Modal>
                                <TouchableOpacity
                                    onPress={toggleModal}
                                    style={styles.checkedbutton}
                                >
                                    <CheckedIcon size={15} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ) : (
                        user.id !== item.creator_id && (
                            <>
                                <View
                                    style={{
                                        marginTop: 20,
                                    }}
                                >
                                    <TouchableOpacity style={styles.btn1}>
                                        <Image source={images.plus} />
                                        <Text
                                            style={{
                                                marginLeft: 4,
                                                fontWeight: "normal",
                                                fontSize: 12,
                                            }}
                                        >
                                            QABUL QILISH
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        )
                    )}
                </View>
                <TouchableOpacity style={styles.btn1}>
                    <View
                        style={{
                            borderWidth: 1,
                            borderRadius: 20,
                            height: 15,
                            width: 15,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <PlusIcon size={16} />
                    </View>
                    <Text
                        style={{
                            marginLeft: 4,
                            fontWeight: "bold",
                            fontSize: 11,
                        }}
                    >
                        QABUL QILISH
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default MailItem;

const styles = StyleSheet.create({
    btn1: {
        borderWidth: 1,
        borderColor: colors.darkOrange,
        borderRadius: 8,
        paddingHorizontal: 5,
        paddingVertical: 8,
        backgroundColor: colors.lightOrange,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        elevation: 3,
    },
    pensolbutton: {
        borderWidth: 1.5,
        borderRadius: 25,
        paddingHorizontal: 11,
        paddingVertical: 5,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 6,
        borderColor: colors.orange,
        backgroundColor: colors.orange,
    },
    checkedbutton: {
        borderWidth: 1.5,
        backgroundColor: colors.greenLigth,
        borderColor: colors.greenLigth,
        borderRadius: 25,
        paddingHorizontal: 11,
        paddingVertical: 11,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 6,
    },
    iconsbutton: {
        borderWidth: 1.5,
        backgroundColor: colors.lightCoral,
        borderColor: colors.lightCoral,
        borderRadius: 25,
        paddingHorizontal: 11,
        paddingVertical: 11,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 6,
    },
    borderBottom: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        flex: 1,
        paddingTop: 10,
    },
    avatarwrapper: {
        flexDirection: "row",
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // marginTop: 22,
        backgroundColor: "rgba(52, 52, 52, 0.5)",
    },
    modalView: {
        margin: 20,
        marginHorizontal: 40,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 25,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        marginRight: 30,
        marginLeft: 50,
    },

    buttonClose: {
        marginLeft: 10,
    },
    textStyle: {
        color: colors.gray,
        fontWeight: "600",
        textAlign: "center",
    },
    textStyles: {
        color: colors.orange,
        fontWeight: "600",
        textAlign: "center",
    },
    modalText: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 15,
        color: colors.black,
        paddingHorizontal: 5,
    },
});
