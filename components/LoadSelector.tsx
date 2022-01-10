import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import {
    StyleSheet,
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    FlatList,
} from "react-native";
import { colors } from "../constants/color";

interface ILoadSelector {
    value?: number;
    setValue: Dispatch<SetStateAction<number>>;
}

const LoadSelector = ({ value, setValue }: ILoadSelector) => {
    let [state, setState] = useState([
        { id: 0, name: "1 tonnagacha", selected: false, value: "1 tonnagacha" },
        { id: 1, name: "1-3 tonna", selected: false, value: "1-3 tonna" },
        { id: 2, name: "4-7 tonna", selected: false, value: "4-7 tonna" },
        { id: 3, name: "8-16 tonna", selected: false, value: "8-16 tonna" },
        { id: 4, name: "17-30 tonna", selected: false, value: "17-30 tonna" },
    ]);

    useEffect(() => {
        setState(
            state.map((item) => {
                if (item.value == value) {
                    return {
                        ...item,
                        selected: true,
                    };
                }
                return item;
            })
        );
    }, [value]);

    const onPress = (id: number) => {
        setState((prev) => {
            setValue(state[id].value);
            let newState = prev.map((item, index) => {
                item.selected = false;
                if (id == index) {
                    item.selected = !item.selected;
                    return item;
                }
                return item;
            });
            return newState;
        });
    };

    return (
        <View style={{ paddingHorizontal: 16, paddingVertical: 20 }}>
            <Text
                style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    marginBottom: 15,
                    marginLeft: 5,
                }}
            >
                Yuk og'irligi
            </Text>
            <FlatList
                data={state}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        key={item.id.toString()}
                        onPress={() => onPress(item.id)}
                        style={[
                            styles.btn,
                            {
                                backgroundColor: item.selected
                                    ? colors.lightOrange
                                    : undefined,
                                borderColor: item.selected
                                    ? colors.lightOrange
                                    : undefined,
                            },
                        ]}
                    >
                        <Text>{item.name}</Text>
                    </TouchableOpacity>
                )}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

export default LoadSelector;

const styles = StyleSheet.create({
    btn: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderColor: colors.darkOrange,
        borderRadius: 10,
        borderWidth: 1,
        marginRight: 18,
    },
});
