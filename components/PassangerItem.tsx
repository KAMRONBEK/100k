import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
    Alert,
    Image,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import Modal from "react-native-modal";
import { useSelector } from "react-redux";
import { images } from "../assets";
import {
    CheckedIcon,
    LeftArrowIcon,
    PensolIcon,
    PlusIcon,
    XIcon,
} from "../assets/icons/icons";
import { routes } from "../navigation/routes";
import { colors } from "../constants/color";
import user, { selectUser } from "../redux/slices/user/user";

interface IPassangerProp {
    item: any;
    editable?: boolean;
}

const PassangerItem = ({ item, editable }: IPassangerProp) => {
    let user = useSelector(selectUser);
    let navigation = useNavigation();
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const [isModalVisibleTwo, setIsModalVisibleTwo] = useState(false);

    const toggleModalTwo = () => {
        setIsModalVisibleTwo(!isModalVisibleTwo);
    };
    return (
        <>
            <View
                style={{
                    backgroundColor: colors.white,
                    paddingVertical: 20,
                    paddingHorizontal: 15,
                    marginBottom: 10,
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                            {item.cost}
                        </Text>
                        <Text
                            style={{
                                marginLeft: 5,
                                fontWeight: "bold",
                                color: "gray",
                                fontSize: 17,
                            }}
                        >
                            so'm
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                        }}
                    >
                        <Image
                            source={images.seat}
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: colors.black,
                                marginTop: 1,
                            }}
                        />
                        <Text
                            style={{
                                fontSize: 17,
                                fontWeight: "500",
                                marginRight: 15,
                                marginTop: 1,
                            }}
                        >
                            {item.seat_count_label}
                        </Text>
                        <TouchableOpacity style={styles.seatbutton}>
                            <Text style={styles.seatbuttontxt}>
                                {item.seat_count_label}
                            </Text>
                        </TouchableOpacity>
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
                        style={{ flexDirection: "row", alignItems: "center" }}
                    >
                        <Image
                            style={{ width: 10, height: 10, marginRight: 12 }}
                            source={images.ellipse}
                        />
                        <Text style={{ fontSize: 15, fontWeight: "normal" }}>
                            {item.from_full_address}
                        </Text>
                    </View>
                </View>
                <Image
                    style={{ height: 17, marginLeft: 4, marginTop: -5 }}
                    source={images.lines}
                ></Image>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: -5.3,
                    }}
                >
                    <Image
                        style={{ width: 10, height: 10, marginRight: 12 }}
                        source={images.lines}
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
                <View>
                    <Text
                        style={{
                            fontSize: 15,
                            marginTop: 12,
                            opacity: 0.7,
                            color: "gray",
                        }}
                    >
                        {item.note}
                    </Text>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <Text style={{ marginTop: 5, color: "gray" }}>
                            #{item.id}
                        </Text>
                        <View style={{ flexDirection: "row" }}>
                            <Image
                                source={images.eye}
                                style={{
                                    width: 18,
                                    height: 18,
                                    opacity: 0.7,
                                    marginTop: 2,
                                }}
                            />
                            <Text
                                style={{
                                    marginLeft: 5,
                                    marginBottom: 15,
                                    opacity: 0.7,
                                }}
                            >
                                0
                            </Text>
                        </View>
                    </View>
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
                        marginVertical: -10,
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
                                    {/* {user.id == item.creator_id ? "( siz)" : " (begona)"} */}
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
                                    marginHorizontal: 10,
                                    marginLeft: 30,
                                    flexDirection: "row",
                                }}
                            >
                                <View>
                                    <Modal
                                        isVisible={isModalVisible}
                                        testID={"modal"}
                                        swipeDirection={[
                                            "up",
                                            "left",
                                            "right",
                                            "down",
                                        ]}
                                        onBackdropPress={() =>
                                            setModalVisible(false)
                                        }
                                        style={{
                                            justifyContent: "center",
                                            margin: 0,
                                        }}
                                    >
                                        <View
                                            style={{
                                                backgroundColor: "#fff",
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
                                                            color: "#8a8a8a",
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
                                                            color: "#ffc100",
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
                                            routes.EDIT_PASSENGER,
                                            {
                                                id: item.id,
                                            }
                                        )
                                    }
                                >
                                    <PensolIcon size={15} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.checkedbutton}
                                    onPress={toggleModalTwo}
                                >
                                    <CheckedIcon size={15} />
                                </TouchableOpacity>
                                <View>
                                    <Modal
                                        isVisible={isModalVisibleTwo}
                                        testID={"modal"}
                                        swipeDirection={[
                                            "up",
                                            "left",
                                            "right",
                                            "down",
                                        ]}
                                        onBackdropPress={() =>
                                            setIsModalVisibleTwo(false)
                                        }
                                        style={{
                                            justifyContent: "flex-end",
                                            margin: 0,
                                        }}
                                    >
                                        <View
                                            style={{ backgroundColor: "#fff" }}
                                        >
                                            <View
                                                style={{
                                                    alignItems: "center",
                                                    flexDirection: "row",
                                                    marginHorizontal: 10,
                                                    borderBottomWidth: 1,
                                                    borderColor: "#ccc",
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
                                                            "#ffcd30",
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
                                </View>
                            </View>
                        ) : (
                            user.id !== item.creator_id && (
                                <>
                                    <View
                                        style={{
                                            marginTop: 20,
                                            marginLeft: 50,
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
        </>
    );
};

export default PassangerItem;

const styles = StyleSheet.create({
    btn1: {
        borderColor: colors.darkOrange,
        borderRadius: 8,
        paddingHorizontal: 5,
        paddingVertical: 10,
        backgroundColor: colors.lightOrange,
        flexDirection: "row",
        alignItems: "center",
        elevation: 3,
    },
    borderBottom: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        flex: 1,
        paddingTop: 10,
    },
    seatbutton: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#dbfaec",
        padding: 5,
        borderRadius: 10,
        opacity: 1,
    },
    seatbuttontxt: {
        color: colors.darkGreen,
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
        marginLeft: 6,
        borderWidth: 1.5,
        borderRadius: 25,
        paddingHorizontal: 11,
        paddingVertical: 11,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.greenLigth,
        borderColor: colors.greenLigth,
    },
    iconsbutton: {
        marginLeft: 6,
        borderWidth: 1.5,
        borderRadius: 25,
        paddingHorizontal: 11,
        paddingVertical: 11,
        alignItems: "center",
        justifyContent: "center",
        borderColor: colors.lightCoral,
        backgroundColor: colors.lightCoral,
    },
    avatarwrapper: {
        flexDirection: "row",
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(52, 52, 52, 0.5)",
    },
    modalView: {
        backgroundColor: "white",
        borderRadius: 20,
        paddingHorizontal: 25,
        paddingVertical: 15,
        alignItems: "center",
        shadowColor: "#000",
        elevation: 2,
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },
    button: {
        borderRadius: 20,
        padding: 10,
    },
    buttonClose: {
        backgroundColor: "#fff",
    },
    buttonOpen: {
        backgroundColor: "#fff",
    },
    modalinView: {
        padding: 5,
        flexDirection: "row",
    },
    texts: {
        fontSize: 17,
        fontWeight: "600",
    },
    closetext: {
        fontSize: 16,
        fontWeight: "300",
        marginRight: 10,
        textTransform: "uppercase",
        color: "gray",
    },
    delatetext: {
        fontSize: 16,
        fontWeight: "300",
        marginLeft: 10,
        textTransform: "uppercase",
        color: "#FFCD30",
    },
});
