import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  Image,
  TouchableOpacity,
  RefreshControl,
  FlatList,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { images } from "../../assets";
import {
  FilterIcon,
  GlobeIcon,
  LocationIcon,
  PlusIcon,
  QuestionsIcon,
  ReverseArrowIcon,
} from "../../assets/icons/icons";
import TransportItem from "../../components/TransportItem";
import { useTransportHook } from "./hooks";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
const FirstRoute = ({}) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const { transport, useRefresh } = useTransportHook();
  console.log({ transport });

  const onRefresh = React.useCallback(() => {
    useRefresh();
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  return (
    <ScrollView
      style={{ flex: 1 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <FlatList
        contentContainerStyle={{
          flex: 1,
        }}
        data={Object.values(transport)}
        renderItem={({ item }) => <TransportItem item={item} />}
        ListEmptyComponent={() => (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={images.tarnsport}
              style={{
                height: 140,
                alignItems: "center",
                width: 140,
                marginBottom: 80,
              }}
            />
          </View>
        )}
      />
    </ScrollView>
  );
};

const SecondRoute = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const { transport, useRefresh } = useTransportHook();

  const onRefresh = React.useCallback(() => {
    useRefresh();
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  return (
    <ScrollView
      style={{ flex: 1 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <FlatList
        contentContainerStyle={{
          flex: 1,
        }}
        data={Object.values(transport)}
        renderItem={({ item }) => <TransportItem item={item} />}
        ListEmptyComponent={() => (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={images.tarnsport}
              style={{
                height: 140,
                alignItems: "center",
                width: 140,
                marginBottom: 80,
              }}
            />
          </View>
        )}
      />
    </ScrollView>
  );
};

const ThirdRoute = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const { transport, useRefresh } = useTransportHook();

  const onRefresh = React.useCallback(() => {
    useRefresh();
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  return (
    <ScrollView
      style={{ flex: 1 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <FlatList
        contentContainerStyle={{
          flex: 1,
        }}
        data={Object.values(transport)}
        renderItem={({ item }) => <TransportItem item={item} />}
        ListEmptyComponent={() => (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={images.tarnsport}
              style={{
                height: 140,
                alignItems: "center",
                width: 140,
                marginBottom: 80,
              }}
            />
          </View>
        )}
      />
    </ScrollView>
  );
};

let titleIconMapper = {
  first: <GlobeIcon />,
};

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
});

const Transport = ({ navigation }) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "Barchasi" },
    { key: "second", title: "Mening buyurtmalarim" },
    { key: "third", title: "Ro'yxat" },
  ]);
  return (
    <View horizontal={false} style={{ flexDirection: "column", flex: 1 }}>
      <View style={styles.top}>
        <View>
          <TouchableOpacity style={{ padding: 5 }}>
            <QuestionsIcon size={22} />
          </TouchableOpacity>
        </View>
        <View>
          <Text
            style={{
              fontSize: 18,
              color: "#000",
              fontWeight: "bold",
            }}
          >
            Transportlar
          </Text>
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
              left: 11,
              borderWidth: 0.5,
              borderColor: "#047de8",
              backgroundColor: "#047DE8",
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
                      size={22}
                      color={e.focused ? "#047DE8" : "#8a8a8a"}
                    />
                  )}
                  <Text
                    numberOfLines={1}
                    style={{
                      fontSize: 13,
                      fontWeight: "bold",
                      color: e.focused ? "#047DE8" : "#8a8a8a",
                    }}
                  >
                    {e.route.title}
                  </Text>
                </View>
              );
            }}
            style={{ backgroundColor: "#f3f3f5", paddingLeft: 10 }}
            {...props}
          />
        )}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate("AdTransport")}
        style={{
          width: 55,
          height: 55,
          borderRadius: 65,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ffcc33",
          bottom: 97,
          position: "absolute",
          right: 26,
          elevation: 2,
        }}
      >
        <PlusIcon size={35} />
      </TouchableOpacity>
    </View>
  );
};

export default Transport;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
  },
  top: {
    flexDirection: "row",
    paddingHorizontal: 21,
    paddingVertical: 16,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    alignItems: "center",
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
  tabView: {
    alignItems: "center",
    flexDirection: "row",
    color: "#8a8a8a",
  },
  tabimg: {
    width: 20,
    height: 20,
    // marginRight: 5,
  },
  header: {
    marginVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },
  btntext: {
    color: "#8a8a8a",
    fontSize: 13,
  },
});
