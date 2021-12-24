import React, { useState } from "react";
import {
    View,
    TextInput,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet,
    ScrollView,
} from "react-native";
import { LeftArrowIcon } from "../assets/icons/icons";
import { colors } from "../constants/color";

const GetMoney = ({ navigation }) => {
    const [money, setMoney] = useState(money);
    const [color, setColor] = useState("#fff");
    const [colorOne, setColorOne] = useState("#fff");
    const confirmHandler = () => {
        if (color === "#fff") {
            setColor("#FFCE34");
            setColorOne("#fff");
        } else {
            setColor("#fff");
        }
    };
    const confirmHandlerOne = () => {
        if (colorOne === "#fff") {
            setColorOne("#FFCE34");
            setColor("#fff");
        } else {
            setColorOne("#fff");
        }
    };
    return (
        <View>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => navigation.navigate("My")}>
                    <LeftArrowIcon />
                </TouchableOpacity>
                <Text
                    style={{ fontSize: 18, marginLeft: 90, fontWeight: "bold" }}
                >
                    Hisobni to'ldirish
                </Text>
            </View>
            <View
                style={{
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 14,
                }}
            >
                <Image
                    style={{ width: 90, height: 90 }}
                    source={require("../assets/bee.png")}
                />
                <Text style={{ fontSize: 24, marginTop: 15 }}>
                    100k Expressga
                </Text>
                <Text
                    style={{
                        fontSize: 14,
                        marginTop: 4,
                        paddingHorizontal: 60,
                        textAlign: "center",
                        color: "#8a8a8a",
                    }}
                >
                    Hisobingizni toldirish uchun to’lov kartasini tanlang!
                </Text>
            </View>
            <View
                style={{
                    marginTop: 24,
                    flexDirection: "row",
                    paddingHorizontal: 16,
                    paddingLeft: 0,
                }}
            >
                <TouchableOpacity
                    onPress={confirmHandler}
                    style={[styles.btn, { backgroundColor: color }]}
                >
                    <Image
                        style={{ width: 115, height: 34 }}
                        source={require("../assets/payme.png")}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={confirmHandlerOne}
                    style={[styles.btn, { backgroundColor: colorOne }]}
                >
                    <Image
                        style={{ width: 116, height: 44 }}
                        source={require("../assets/click.png")}
                    />
                </TouchableOpacity>
            </View>
            <View style={{ paddingHorizontal: 16, marginTop: 25 }}>
                <Text style={{ fontSize: 14, color: colors.dimgrayTwo }}>
                    Summani kiriting
                </Text>
                <TextInput
                    style={styles.input}
                    value={money}
                    onChangeText={setMoney}
                    keyboardType="numeric"
                />
            </View>
            <View style={{ paddingHorizontal: 31 }}>
                <TouchableOpacity style={styles.btnOne}>
                    <Text style={{ textAlign: "center", fontSize: 18 }}>
                        To'lash
                    </Text>
                </TouchableOpacity>
            </View>
            <View
                style={{
                    marginTop: 60,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Text style={{ fontWeight: "500", fontSize: 14 }}>
                    Qo’llab quvatlash xizmati
                </Text>
                <Text
                    style={{
                        fontWeight: "500",
                        fontSize: 12,
                        color: colors.black,
                    }}
                >
                    +998 71 800 80 50
                </Text>
            </View>
        </View>
    );
};

export default GetMoney;
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 20,
        backgroundColor: colors.white,
    },
    btn: {
        backgroundColor: colors.white,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.darkGray,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 18,
        marginLeft: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: colors.darkGray,
        paddingVertical: 16,
        paddingHorizontal: 17,
        backgroundColor: colors.white,
        borderRadius: 10,
        fontWeight: "bold",
        marginTop: 13,
    },
    btnOne: {
        backgroundColor: colors.lightOrangeTwo,
        color: colors.black,
        fontWeight: "bold",
        borderRadius: 10,
        paddingVertical: 14,
        marginTop: 66,
    },
});
