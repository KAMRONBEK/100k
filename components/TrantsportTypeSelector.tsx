import { useState, useEffect } from "react";
import React from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { images } from "../assets";
import { useDispatch } from "react-redux";
import { setOrderData } from "../redux/slices/order/order";
import { colors } from "../constants/color";
import { transportType } from "../constants/values";

const TrantsportTypeSelector = ({ value, setValue, title }) => {
    let dispatch = useDispatch();
    let [state, setState] = useState(transportType);
    let [massVisible, setMassVisible] = useState(state[1].selected);

    let [massType, setMassType] = useState([
        { id: 0, name: "1-3-tonna", value: "1-3-tonna", selected: false },
        { id: 1, name: "3-8-tonna", value: "3-8-tonna", selected: false },
        { id: 2, name: "8-15-tonna", value: "8-15-tonna", selected: false },
        { id: 3, name: "15-25-tonna", value: "15-25-tonna", selected: false },
    ]);

    useEffect(() => {
        setMassVisible(state[1].selected);
    }, [state[1].selected]);

    useEffect(() => {
        setState(
            state.map((item) => {
                if (item.title == value) {
                    return {
                        ...item,
                        selected: true,
                    };
                } else {
                    return {
                        ...item,
                        selected: false,
                    };
                }
                // return item;
            })
        );
    }, [value]);

    const onPress = (id) => {
        setState((prev) => {
            let newState = prev.map((item) => {
                setValue(state[id].value);
                // if (item.id == id) {
                //   item.selected = true;
                // } else {
                //   item.selected = false;
                // }
                return item;
            });
            return newState;
        });
    };

    const onMassPress = (id, value) => {
        setMassType((prev) => {
            let newMassType = prev.map((item) => {
                dispatch(setOrderData({ weight: value }));
                if (item.id == id) {
                    item.selected = true;
                } else {
                    item.selected = false;
                }
                return item;
            });
            return newMassType;
        });
    };

    return (
        <View>
            <View
                style={{
                    marginTop: 22,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {state.map((item) => {
                    return (
                        <TouchableOpacity
                            onPress={() => onPress(item.id)}
                            style={{
                                flexDirection: "column",
                                alignItems: "center",
                                paddingHorizontal: 20,
                            }}
                        >
                            <Image
                                style={{
                                    width: 50,
                                    height: 50,
                                    tintColor: item.selected
                                        ? colors.dimgray
                                        : colors.blachSilver,
                                }}
                                source={item.icon}
                            />
                            <Text
                                style={{
                                    fontSize: 13,
                                    color: item.selected
                                        ? colors.dimgray
                                        : colors.blachSilver,
                                }}
                            >
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
            <ScrollView
                style={{
                    marginTop: 22,
                    paddingHorizontal: 16,
                    display: massVisible ? "flex" : "none",
                }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                {massType.map(({ id, name, selected, value }) => {
                    return (
                        <TouchableOpacity
                            style={[
                                styles.btn,
                                {
                                    backgroundColor: selected
                                        ? colors.lightOrange
                                        : undefined,
                                    borderColor: selected
                                        ? colors.lightOrange
                                        : undefined,
                                },
                            ]}
                            onPress={() => onMassPress(id, value)}
                        >
                            <Text>{name}</Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
};

export default TrantsportTypeSelector;

const styles = StyleSheet.create({
    btn: {
        paddingHorizontal: 13,
        paddingVertical: 12,
        borderColor: colors.darkOrange,
        borderRadius: 7,
        borderWidth: 1,
        marginRight: 20,
    },
});
