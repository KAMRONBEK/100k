import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import Modal from "react-native-modal";
import { useDispatch, useSelector } from "react-redux";
import { images } from "../assets";
import {
    CheckedIcon,
    LeftArrowIcon,
    PensolIcon,
    PlusIcon,
    XIcon,
} from "../assets/icons/icons";
import { colors } from "../constants/color";
import { routes } from "../navigation/routes";
import { selectUser } from "../redux/slices/user/user";

interface IMailProp {
    item: any;
    editable?: boolean;
}

const MailItem = ({ item, editable }: IMailProp) => {
    let navigation = useNavigation();
    let user = useSelector(selectUser);
    let dispatch = useDispatch();

    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const [isModalVisibleTwo, setModalVisibleTwo] = useState(false);

    const toggleModalTwo = () => {
        setModalVisibleTwo(!isModalVisibleTwo);
    };

    return (
        <View style={styles.container}>
            <View style={styles.boxOrders}>
                <View style={styles.moneyView}>
                    <Text style={styles.moneyText}>{item.cash_amount}</Text>
                    <Text style={styles.cashText}>so'm</Text>
                </View>
                <View style={styles.statusView}>
                    <Text style={styles.statusText}>{item.status_label}</Text>
                </View>
            </View>
            <View style={styles.addressView}>
                <View style={styles.imageView}>
                    <Text style={styles.addressText}>
                        - {item.from_full_address}
                    </Text>
                </View>
                <View>
                    <Text style={styles.idView}>#{item.id}</Text>
                </View>
            </View>
            <View style={styles.toAddressView}>
                <Text style={styles.toAddressText}>
                    - {item.to_full_address}
                </Text>
            </View>
            {/* <View style={styles.clockView}>
                <Text style={{ fontWeight: "bold", fontSize: 17 }}>
                    {item.expired_at}
                </Text>
            </View> */}
            {/* <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 10,
                    marginBottom: 5,
                }}
            >
                <Image source={images.security} />
                <Text
                    style={{
                        marginLeft: 10,
                        color: colors.darkGray,
                        fontSize: 15,
                        paddingLeft: 3,
                    }}
                >
                    Sug'urta summasi:
                </Text>
                <Text style={{ fontWeight: "bold", fontSize: 17 }}>
                    {item.insurance_amount} sum
                </Text>
            </View> */}
            <View style={styles.avatarView}>
                <View style={styles.borderBottom}>
                    <View style={styles.avatarwrapper}>
                        <Image
                            source={{ uri: item.creator_avatar }}
                            style={styles.avatarImgBox}
                        />
                        <View>
                            <Text style={styles.nameText}>
                                {!!item.creator_name
                                    ? item.creator_name
                                    : "Anonim"}
                                {user.id == item.creator_id && " (siz)"}
                            </Text>
                            <Text style={styles.creatorAtText}>
                                {item.created_at}
                            </Text>
                        </View>
                    </View>
                    {editable ? (
                        <View
                            style={{
                                marginHorizontal: 10,
                                marginLeft: 30,
                                flexDirection: "row",
                            }}
                        >
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
                                                onPress={toggleModal}
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
                                                onPress={toggleModal}
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
                                    onPress={toggleModal}
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
                                <PensolIcon size={15} />
                            </TouchableOpacity>
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
                                                borderColor: colors.gray,
                                            }}
                                        >
                                            <TouchableOpacity
                                                style={{
                                                    borderRadius: 30,
                                                }}
                                            >
                                                <LeftArrowIcon size={30} />
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
                                                    E'loni yakunlash
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
                                                quydagi yakunlash tugmasini
                                                bosing. Yakunlagan e'lon qaytib
                                                haydovchilarga ko'rsatilmaydi
                                            </Text>
                                        </View>
                                        <TouchableWithoutFeedback
                                            onPress={toggleModalTwo}
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
                                    style={styles.checkedbutton}
                                    onPress={toggleModalTwo}
                                >
                                    <CheckedIcon size={17} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ) : (
                        user.id !== item.creator_id && (
                            <>
                                <TouchableOpacity style={styles.btn1}>
                                    <View style={styles.plusView}>
                                        <PlusIcon size={16} />
                                    </View>
                                    <Text style={styles.receiveText}>
                                        QABUL QILISH
                                    </Text>
                                </TouchableOpacity>
                            </>
                        )
                    )}
                </View>
            </View>
        </View>
    );
};

export default MailItem;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        borderColor: colors.gray,
        paddingVertical: 20,
        paddingHorizontal: 16,
        marginBottom: 10,
        borderRadius: 10,
    },
    boxOrders: {
        marginBottom: 5,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
    },
    btn1: {
        borderColor: colors.darkOrange,
        borderRadius: 8,
        paddingHorizontal: 5,
        paddingVertical: 8,
        backgroundColor: colors.lightOrange,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 13,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    plusView: {
        borderRadius: 20,
        width: 15,
        height: 15,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
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
        // paddingTop: 10,
    },
    avatarwrapper: {
        flexDirection: "row",
        // borderWidth: 1,
        marginTop: 10,
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
    moneyView: {
        flexDirection: "row",
        alignItems: "flex-end",
    },
    moneyText: {
        fontWeight: "bold",
        fontSize: 18,
    },
    cashText: {
        marginLeft: 5,
        fontSize: 17,
        fontWeight: "bold",
        color: colors.darkGray,
    },
    statusView: {
        backgroundColor: "#dbfaec",
        paddingHorizontal: 10,
        padding: 5,
        borderRadius: 8,
        opacity: 1,
    },
    statusText: {
        color: colors.darkGreen,
    },
    addressView: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    imageView: {
        flexDirection: "row",
        alignItems: "center",
        paddingBottom: 5,
    },
    ellipseBox: {
        width: 10,
        height: 10,
        marginRight: 12,
    },
    addressText: {
        fontSize: 15,
        fontWeight: "normal",
    },
    idView: {
        color: colors.darkGray,
        fontSize: 12,
    },
    toAddressView: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: -5.3,
    },
    toAddressText: {
        fontSize: 15,
        fontWeight: "normal",
        color: colors.black,
    },
    clockView: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 21,
    },
    validityText: {
        marginLeft: 10,
        color: colors.darkGray,
        fontSize: 15,
    },
    avatarView: {
        borderTopWidth: 1,
        borderStyle: "solid",
        borderColor: colors.grey,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        // marginTop: 10,
    },
    avatarImgBox: {
        width: 35,
        height: 35,
        borderRadius: 25,
    },
    nameText: {
        marginLeft: 10,
        color: "gray",
        fontWeight: "500",
    },
    creatorAtText: {
        marginLeft: 10,
        color: "gray",
        fontWeight: "600",
    },
    receiveText: {
        marginLeft: 4,
        fontWeight: "bold",
        fontSize: 11,
    },
});
