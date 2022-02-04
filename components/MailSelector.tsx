import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { colors } from "../constants/color";

interface IMailSelector {
  value?: number;
  setValue: Dispatch<SetStateAction<number>>;
}

const MailSelector = ({ value, setValue }: IMailSelector) => {
  let [state, setState] = useState([
    { id: 0, name: "Yengil avtomobilda", selected: false, value: 1 },
    { id: 1, name: "Yuk mashinasida", selected: false, value: 2 },
    { id: 2, name: "Piyoda", selected: false, value: 3 },
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
        paddingHorizontal: 8,
        paddingVertical: 18,
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
        Nimadan yetqazish?
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
                borderColor: item.selected ? colors.lightOrange : undefined,
                backgroundColor: item.selected ? colors.lightOrange : undefined,
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

export default MailSelector;

const styles = StyleSheet.create({
  btn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderColor: colors.darkOrange,
    borderRadius: 10,
    borderWidth: 1,
    marginRight: 18,
  },
});
