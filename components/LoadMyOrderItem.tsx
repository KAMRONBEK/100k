import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { images } from "../assets";
import { useNavigation } from "@react-navigation/native";
import { routes } from "../navigation/routes";
import { CheckedIcon, PensolIcon, XIcon } from "../assets/icons/icons";
import { colors } from "../constants/color";

interface IPassangerProp {
    item: any;
}

const LoadMyOrderItem = ({ item }: IPassangerProp) => {
    let navigation = useNavigation();
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
                        <TouchableOpacity
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "#dbfaec",
                                padding: 5,
                                borderRadius: 10,
                                opacity: 0.7,
                            }}
                        >
                            <Text
                                style={{
                                    color: colors.darkGreen,
                                    opacity: 0.8,
                                }}
                            >
                                {item.weight}
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
                    style={{
                        height: 17,
                        marginLeft: 4,
                    }}
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
                        <Text>-{item.matter}</Text>
                    </Text>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <Text
                            style={{
                                marginTop: 5,
                                color: "gray",
                            }}
                        >
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
                        paddingVertical: 10,
                        alignItems: "center",
                    }}
                >
                    <View style={styles.borderBottom}>
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
                </View>
            </View>
        </>
    );
};

export default LoadMyOrderItem;

const styles = StyleSheet.create({
    borderBottom: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
});
