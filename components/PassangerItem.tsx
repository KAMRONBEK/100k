import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { images } from "../assets";

interface IPassangerProp {
    item: any;
}

const PassangerItem = ({ item }: IPassangerProp) => {
    return (
        <>
            <View
                style={{
                    backgroundColor: "#fff",
                    paddingVertical: 21,
                    paddingHorizontal: 16,
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
                                tintColor: "#000",
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
                            {item.seat_count}
                        </Text>
                        <TouchableOpacity
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "#59dead",
                                padding: 5,
                                borderRadius: 10,
                                opacity: 1,
                            }}
                        >
                            <Text style={{ color: "green" }}>
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
                            {item.from_address}
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
                            color: "#000",
                        }}
                    >
                        {item.to_address}
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
                                    marginBottom: 5,
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
                        borderColor: "#d2d4d4",
                        opacity: 0.7,
                        flexDirection: "row-reverse",
                        justifyContent: "space-between",
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
                    <View style={{ marginTop: 20 }}>
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
                </View>
                {/* <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <Text
            style={{ marginLeft: 10, color: "#8a8a8a", fontSize: 15 }}
          ></Text>
        </View> */}
                {/* <View
          style={{
            marginTop: 22,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
            <Text
              style={{ fontWeight: "bold", fontSize: 15, marginLeft: 12 }}
            ></Text>
          </View>
        </View> */}
            </View>
        </>
    );
};

export default PassangerItem;

const styles = StyleSheet.create({
    btn1: {
        borderWidth: 1,
        borderColor: "#bf9100",
        borderRadius: 8,
        paddingHorizontal: 5,
        paddingVertical: 11,
        backgroundColor: "#FFCD30",
        flexDirection: "row",
        alignItems: "center",
    },
    borderBottom: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 25,
    },
});
