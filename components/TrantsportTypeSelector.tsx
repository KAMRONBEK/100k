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
// import { useSelector } from "react-redux";
// import { selectOrderState } from "../redux/slices/order/order";
// import { useTransportHook } from "../screens/transport/hooks";

// const state = useSelector(selectOrderState);

// const { createTransport, loading } = useTransportHook();
// const onSubmitFrom = () => {
//   createTransport({
//     transport_type: state.transportType,
//     cost_type: state.costType,
//   });
// };

const TrantsportTypeSelector = ({ value, setValue }) => {
  let dispatch = useDispatch();
  let [state, setState] = useState([
    {
      id: 0,
      name: "Engil Avtomobil",
      icon: images.carOne,
      selected: false,
      value: "car",
    },
    {
      id: 1,
      name: "Yuk avtomobil",
      icon: images.delivery,
      selected: false,
      value: "delivery",
    },
    {
      id: 2,
      name: "Transport",
      icon: images.frontalTruck,
      selected: false,
      value: "truck",
    },
  ]);
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
        if (item.value == value) {
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
                  tintColor: item.selected ? "#556080" : "#BFBFBF",
                }}
                source={item.icon}
              />
              <Text
                style={{
                  fontSize: 13,
                  color: item.selected ? "#556080" : "#BFBFBF",
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
                  backgroundColor: selected ? "#FFCD30" : undefined,
                  borderColor: selected ? "#FFCD30" : undefined,
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
    borderColor: "#BF9100",
    borderRadius: 7,
    borderWidth: 1,
    marginRight: 20,
  },
});
