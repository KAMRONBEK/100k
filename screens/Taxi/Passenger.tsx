import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import {
  Image,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import { images } from "../../assets";
import PassangerItem from "../../components/PassangerItem";
import { useTaxiHook } from "./hooks";
import PassagerMyOrderItem from "../../components/PassagerMyOrderItem";
import { routes as Routes } from "../../navigation/routes";
import Question from "../../assets/icons/QuestionIcon";
import Filter from "../../assets/icons/FilterIcon";
import QuestionIcon from "../../assets/icons/QuestionIcon";
import FilterIcon from "../../assets/icons/FilterIcon";

const FirstRoute = () => {
  const { taxi, refreshTaxi } = useTaxiHook();
  const [refreshing, setRefreshing] = useState(false);
  let navigation = useNavigation();

  const onRefresh = React.useCallback(() => {
    refreshTaxi();
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {Object.values(taxi).map((item) => (
          <PassangerItem item={item} key={`${item.id}`} />
        ))}
      </ScrollView>
    </View>
  );
};
const SecondRoute = () => {
  const { taxi, myOrder, refreshTaxi } = useTaxiHook();
  const [refreshing, setRefreshing] = useState(false);
  let navigation = useNavigation();

  const onRefresh = React.useCallback(() => {
    refreshTaxi();
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {myOrder.map((item) => (
          <PassagerMyOrderItem item={item} key={`${item.id}`} />
        ))}
      </ScrollView>
    </View>
  );
};

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

const wait = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export interface PassengerViewProps {}

let titleIconMapper = {
  first: images.globe,
};

const Passenger = ({}: PassengerViewProps) => {
  const layout = useWindowDimensions();
  let navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "Barchasi" },
    { key: "second", title: "Mening buyurtmalarim" },
  ]);
  return (
    <View style={{ flex: 1 }}>
      <StatusBar style={styles.statusbar} />
      <View style={styles.top}>
        <View>
          <QuestionIcon />
        </View>
        <View>
          <Text style={styles.passengerbox}>Yo'lovchilar</Text>
        </View>
        <View>
          <Image
            source={images.filter}
            style={{ width: 20, height: 20, tintColor: "#000000" }}
          />
        </View>
      </View>
      <View style={styles.header}>
        <TouchableOpacity style={styles.btn}>
          <Image style={styles.btnimg} source={images.location} />
          <Text style={styles.btntext}>Viloyat,tuman</Text>
        </TouchableOpacity>
        <Image style={styles.strelkaimg} source={images.strelka} />
        <TouchableOpacity style={styles.btn}>
          <Image style={styles.btnimg} source={images.location} />
          <Text style={styles.btntext}>Viloyat,tuman</Text>
        </TouchableOpacity>
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={(props) => (
          <TabBar
            renderLabel={(e) => {
              return (
                <View style={styles.tabView}>
                  {titleIconMapper[e.route.key] && (
                    <Image
                      source={titleIconMapper[e.route.key]}
                      style={styles.tabimg}
                    />
                  )}
                  <Text style={{ fontSize: 12 }}>{e.route.title}</Text>
                </View>
              );
            }}
            style={{ backgroundColor: "#f3f3f5" }}
            {...props}
          />
        )}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate(Routes.ADD_PASSENGER)}
        style={styles.tchopacity}
      >
        <Image style={styles.plus2} source={images.plus2} />
      </TouchableOpacity>
    </View>
  );
};

export default Passenger;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f3f5",
  },
  scrollView: {
    paddingBottom: 70,
  },
  btn: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderWidth: 1,
    borderColor: "#dcdcdc",
    borderRadius: 8,
  },
  top: {
    flexDirection: "row",
    paddingHorizontal: 21,
    paddingVertical: 16,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  header: {
    marginVertical: 19,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },
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
  tchopacity: {
    borderColor: "#BF9100",
    borderWidth: 1,
    position: "absolute",
    right: 16,
    bottom: 87,
    alignItems: "center",
    justifyContent: "center",
    width: 65,
    height: 65,
    borderRadius: 65,
    backgroundColor: "#ffcd30",
  },
  plus2: {
    width: 26,
    height: 26,
  },
  statusbar: {
    backgroundColor: "#FFCE34",
  },
  stimage: {
    width: 24,
    height: 24,
  },
  passengerbox: {
    fontSize: 20,
    color: "#000",
  },
  psimage: {
    width: 20,
    height: 20,
    tintColor: "#000",
  },
  btnimg: {
    width: 15,
    height: 15,
    marginRight: 5,
  },
  btntext: {
    color: "#8a8a8a",
    fontSize: 13,
  },
  strelkaimg: {
    width: 24,
    height: 18,
    marginHorizontal: 6,
  },
  tabView: {
    flexDirection: "row",
    color: "#8a8a8a",
  },
  tabimg: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  filterIcon: {
    tintColor: "#000",
  },
});
