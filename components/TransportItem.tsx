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

interface ITransportProp {
    item: any;
    editable?: boolean;
}

const TransportItem = ({ item, editable }: ITransportProp) => {
    let user = useSelector(selectUser);
    let navigation = useNavigation();
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
            <View style={styles.imagesView}>
                {item.images &&
                    item.images.map((e) => {
                        return (
                            <Image
                                style={styles.imageBox}
                                source={{ uri: e }}
                            />
                        );
                    })}
            </View>
            <View style={{ backgroundColor: colors.white }}>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "flex-end",
                    }}
                >
                    <View style={{ flexDirection: "row", marginLeft: 10 }}>
                        <Text
                            style={{
                                fontSize: 18,
                                color: colors.black,
                                fontWeight: "bold",
                            }}
                        >
                            {item.cost}
                        </Text>
                        <Text
                            style={{
                                fontSize: 15,
                                fontWeight: "bold",
                                paddingLeft: 10,
                                color: colors.darkGray,
                            }}
                        >
                            so'm/{item.cost_type}
                        </Text>
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingHorizontal: 16,
                        marginTop: 10,
                    }}
                >
                    <View>
                        <Text style={{ fontSize: 16 }}>
                            {item.from_full_address}
                        </Text>
                        <Text style={{ fontSize: 16 }}>
                            {item.to_full_address}
                        </Text>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.transportType}>
                            <Text
                                style={{
                                    fontWeight: "300",
                                    color: colors.white,
                                    fontSize: 15,
                                }}
                            >
                                {item.transport_type_label}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View
                    style={{
                        paddingHorizontal: 16,
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexDirection: "row",
                        marginTop: 5,
                    }}
                >
                    <View>
                        <Text style={styles.noteText}>{item.note}</Text>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <View style={styles.idView}>
                            <Image
                                source={images.eye}
                                style={{
                                    width: 18,
                                    height: 18,
                                    opacity: 0.7,
                                    marginTop: 1,
                                    marginRight: 2,
                                    tintColor: colors.darkGray,
                                }}
                            />
                            <Text
                                style={{
                                    marginRight: 8,
                                    color: colors.darkGray,
                                }}
                            >
                                0
                            </Text>
                            <Text style={styles.idText}>#{item.id}</Text>
                        </View>
                    </View>
                </View>
                <View
                    style={{
                        height: 2,
                        backgroundColor: colors.greyTwo,
                        marginTop: 8,
                    }}
                ></View>
                <View
                    style={{
                        paddingHorizontal: 16,
                        marginTop: 12,
                        marginBottom: 20,
                    }}
                >
                    <View
                        style={{
                            marginHorizontal: 5,
                            marginRight: 5,
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
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
                                    width: 40,
                                    height: 40,
                                    borderRadius: 40,
                                    resizeMode: "contain",
                                }}
                                source={{ uri: item.creator_avatar }}
                            />

                            <View style={{ marginHorizontal: 5 }}>
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
                                <View style={{ marginLeft: 10 }}>
                                    <Text
                                        style={{
                                            color: colors.darkGray,
                                            fontSize: 12,
                                        }}
                                    >
                                        {item.created_at}
                                    </Text>
                                </View>
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
                                                    justifyContent:
                                                        "space-evenly",
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
                                        navigation.navigate(
                                            routes.ADD_TRANSPORT,
                                            {
                                                id: item.id,
                                            }
                                        )
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
                                                        justifyContent:
                                                            "center",
                                                        marginHorizontal: 90,
                                                    }}
                                                >
                                                    <Text
                                                        style={{
                                                            fontSize: 18,
                                                            alignItems:
                                                                "center",
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
                                                    haydovchini topgan
                                                    bo'lsangiz quydagi yakunlash
                                                    tugmasini bosing. Yakunlagan
                                                    e'lon qaytib haydovchilarga
                                                    ko'rsatilmaydi
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
                                                        justifyContent:
                                                            "center",
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
                                    <View
                                        style={{
                                            marginTop: 20,
                                        }}
                                    >
                                        <TouchableOpacity style={styles.btn1}>
                                            <View
                                                style={{
                                                    borderRadius: 20,
                                                    width: 15,
                                                    height: 15,
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    borderWidth: 1,
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
                                </>
                            )
                        )}
                    </View>
                </View>
            </View>
        </View>
    );
};
export default TransportItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.lightWhite,
        marginBottom: 15,
        elevation: 4,
    },
    btn1: {
        borderWidth: 1,
        borderColor: colors.darkOrange,
        borderRadius: 8,
        paddingHorizontal: 5,
        paddingVertical: 8,
        backgroundColor: colors.lightOrange,
        flexDirection: "row",
        alignItems: "center",
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
    imagesView: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 5,
    },
    imageBox: {
        width: 100,
        height: 79,
        resizeMode: "contain",
    },
    idText: {
        color: colors.darkGray,
    },
    idView: {
        flexDirection: "row",
    },
    noteText: {
        color: colors.darkGray,
    },
    transportType: {
        backgroundColor: colors.navyBlue,
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 7,
    },
});
