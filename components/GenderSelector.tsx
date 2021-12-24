import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";

interface IGenderSelector {
  value?: number;
  setValue: Dispatch<SetStateAction<number>>;
}

const GenderSelector = ({ value, setValue }: IGenderSelector) => {
  let [state, setState] = useState([
    { id: 0, name: "ERKAK", selected: false, value: "male" },
    { id: 1, name: "AYOL", selected: false, value: "female" },
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
        paddingHorizontal: 20,
        paddingVertical: 20,
      }}
    >
      <FlatList
        data={state}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.id.toString()}
            onPress={() => onPress(item.id)}
            style={[
              styles.btn,
              {
                backgroundColor: item.selected ? "#FFCD30" : undefined,
                borderColor: item.selected ? "#FFCD30" : undefined,
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

export default GenderSelector;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderWidth: 1,
    borderColor: "#8a8a8a",
    alignItems: "center",
    marginRight: 25,
  },
});
