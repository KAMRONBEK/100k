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
import {
  FilterIcon,
  GlobeIcon,
  LocationIcon,
  PlusIcon,
  QuestionsIcon,
  ReverseArrowIcon,
} from "../../assets/icons/icons";
import PassagerMyOrderItem from "../../components/PassagerMyOrderItem";
import PassangerItem from "../../components/PassangerItem";
import { routes as Routes } from "../../navigation/routes";
import { useTaxiHook } from "./hooks";

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
          <PassangerItem item={item} key={`${item.id}`} editable={true} />
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
  first: <GlobeIcon />,
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
          <TouchableOpacity style={{ padding: 5 }}>
            <QuestionsIcon size={22} />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.passengerbox}>Yo'lovchilar</Text>
        </View>
        <View>
          <TouchableOpacity style={{ padding: 5 }}>
            <FilterIcon size={22} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.header}>
        <TouchableOpacity style={styles.btn}>
          <LocationIcon size={22} color="#8a8a8a" />
          <Text style={styles.btntext}>Viloyat,tuman</Text>
        </TouchableOpacity>
        <ReverseArrowIcon size={25} color="#8a8a8a" />
        <TouchableOpacity style={styles.btn}>
          <LocationIcon size={22} color="#8a8a8a" />
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
            indicatorStyle={{
              backgroundColor: "#047DE8",
              left: 11,
              borderWidth: 0.5,
              borderColor: "#047DE8",
              marginLeft: -6,
            }}
            tabStyle={{
              width: "auto",
              paddingBottom: 2,
              marginRight: 10,
            }}
            renderLabel={(e) => {
              return (
                <View style={styles.tabView}>
                  {titleIconMapper[e.route.key] && (
                    <GlobeIcon
                      color={e.focused ? "#047de8" : "#8a8a8a"}
                      size={22}
                    />
                  )}
                  <Text
                    style={{
                      color: e.focused ? "#047de8" : "#8a8a8a",
                      fontWeight: "bold",
                      fontSize: 13,
                    }}
                  >
                    {e.route.title}
                  </Text>
                </View>
              );
            }}
            style={{
              backgroundColor: "#f3f3f5",
              paddingLeft: 10,
            }}
            {...props}
          />
        )}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate(Routes.ADD_PASSENGER)}
        style={styles.tchopacity}
      >
        <PlusIcon size={35} />
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
    marginVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
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
    position: "absolute",
    right: 26,
    bottom: 97,
    alignItems: "center",
    justifyContent: "center",
    width: 55,
    height: 55,
    borderRadius: 65,
    backgroundColor: "#ffcd30",
    elevation: 2,
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
    fontSize: 18,
    color: "#000",
    fontWeight: "bold",
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
    alignItems: "center",
  },
  tabimg: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  filterIcon: {
    tintColor: "#000",
  },
  tabViewtxt: {
    fontSize: 13,
    color: "#047DE8",
  },
});
