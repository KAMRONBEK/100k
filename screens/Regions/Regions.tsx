import { useRoute } from "@react-navigation/core";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { images } from "../../assets";
import RegionItem from "../../components/RegionItem";
import { routes } from "../../navigation/routes";
import { useRegions } from "./hook";

const Regions = ({ navigation }) => {
  let { regions } = useRegions();
  let { type, route } = !!useRoute().params
    ? useRoute().params
    : { type: "", route: routes.MAIL };

  return (
    <>
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <View>
            <TouchableOpacity
              style={styles.touchableOpacityBox}
              onPress={() => navigation.goBack()}
            >
              <Image source={images.arrowback} />
            </TouchableOpacity>
          </View>
          <Text style={styles.textBox}>Viloyatni tanlang</Text>
        </View>
        <ScrollView>
          <View style={{ marginTop: 10, marginBottom: 50 }}>
            {regions.map((region) => (
              <RegionItem
                key={region.id}
                name={region.name}
                district={region.states}
                id={region.id}
                type={type}
                route={route}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default Regions;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  region: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    marginTop: 2,
  },
  touchableOpacityBox: {
    padding: 5,
  },
  textBox: {
    fontSize: 20,
    marginLeft: 10,
    fontWeight: "700",
  },
});
