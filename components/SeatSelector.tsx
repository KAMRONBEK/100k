import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
} from "react-native";
import { colors } from "../constants/color";

interface ISeatSelector {
    value?: number;
    setValue: Dispatch<SetStateAction<number>>;
}

const SeatSelector = ({ value, setValue }: ISeatSelector) => {
    let [state, setState] = useState([
        { id: 0, name: "1", selected: false, value: 1 },
        { id: 1, name: "2", selected: false, value: 2 },
        { id: 2, name: "3", selected: false, value: 3 },
        { id: 3, name: "4", selected: false, value: 4 },
        { id: 4, name: "Hammasi", selected: false, value: 5 },
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
        <View
            style={{
                paddingHorizontal: 16,
                paddingVertical: 20,
            }}
        >
            <Text
                style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    marginBottom: 15,
                    marginLeft: 5,
                }}
            >
                O'rindiq sonini belgilang
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
                                borderColor: item.selected
                                    ? colors.lightOrange
                                    : undefined,
                                backgroundColor: item.selected
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

export default SeatSelector;

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
