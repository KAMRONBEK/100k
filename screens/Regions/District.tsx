import { useRoute } from "@react-navigation/core";
import React from "react";
import { Image, Text, TouchableOpacity, StyleSheet, View } from "react-native";
import { images } from "../../assets";
import DistrictItem from "../../components/DistrictItem";
import { colors } from "../../constants/color";
import { routes } from "../../navigation/routes";
import Regions from "./Regions";

const District = ({ navigation }) => {
  let { district, type, route } = useRoute().params;

  return (
    <View>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate(routes.REGION)}>
          <Image source={images.arrowback} style={styles.image} />
        </TouchableOpacity>
        <Text style={styles.text}>Tumanni tanlang</Text>
      </View>
      <View style={styles.dsview}>
        {district.map((district) => (
          <DistrictItem
            name={district.name}
            id={district.id}
            key={district.id}
            type={type}
            route={route}
          />
        ))}
      </View>
    </View>
  );
};

export default District;
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  region: {
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    marginTop: 2,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  dsview: {
    marginTop: 10,
    marginBottom: 50,
  },
  buttonback: {
    padding: 5,
  },
  image: {
    marginRight: 15,
  },
});
