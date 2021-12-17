import React from "react";
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

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  three: ThirdRoute,
});

const Transport = ({ navigation }) => {
  // useFonts({
  //     Montserrat: require('../assets/fonts/Montserrat-Medium.ttf'),
  //     MontserratBold: require('../assets/fonts/Montserrat-Bold.ttf'),
  //     MontserratLight: require('../assets/fonts/Montserrat-Light.ttf'),
  // });
  const a = "avtomobillar";
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: a.toLowerCase() },
    { key: "second", title: "Yuk mashinalar" },
    { key: "three", title: "Texnikalar" },
  ]);
  return (
    <View horizontal={false} style={{ flexDirection: "column", flex: 1 }}>
      <View style={styles.top}>
        <View>
          <Image style={{ width: 24, height: 24 }} source={images.questions} />
        </View>
        <View>
          <Text
            style={{
              fontSize: 20,
              color: "#000",
              fontWeight: "400",
            }}
          >
            Transportlar (3)
          </Text>
        </View>
        <View>
          <Image style={{ width: 33, height: 33 }} source={images.userUser} />
        </View>
      </View>
      <View style={styles.header}>
        <TouchableOpacity style={styles.btn}>
          <Image
            style={{ width: 15, height: 15, marginRight: 5 }}
            source={images.location}
          />
          <Text style={{ color: "#8a8a8a", fontSize: 13 }}>Viloyat,tuman</Text>
        </TouchableOpacity>
        <Image
          style={{ width: 24, height: 18, marginHorizontal: 6 }}
          source={images.strelka}
        />
        <TouchableOpacity style={styles.btn}>
          <Image
            style={{ width: 15, height: 15, marginRight: 5 }}
            source={images.location}
          />
          <Text style={{ color: "#8a8a8a", fontSize: 13 }}>Viloyat,tuman</Text>
        </TouchableOpacity>
      </View>
      <TabView
        style={{ backgroundColor: "#f3f3f5", flex: 1 }}
        sceneContainerStyle={{ flex: 1 }}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={(p) => (
          <TabBar
            {...p}
            style={{
              backgroundColor: "#f3f3f5",
            }}
            indicatorStyle={{
              width: 40,
              left: 40,
            }}
            labelStyle={{
              textTransform: "capitalize",
              color: "black",
              padding: 0,
              margin: 0,
            }}
          />
        )}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate("AdTransport")}
        style={{
          width: 65,
          height: 65,
          borderRadius: 65,
          alignItems: "center",
          justifyContent: "center",
          borderColor: "#BF9100",
          borderWidth: 1,
          backgroundColor: "#ffcc33",
          bottom: 87,
          position: "absolute",
          right: 16,
        }}
      >
        <Image style={{ width: 26, height: 26 }} source={images.plus2} />
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
  header: {
    marginTop: 22,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },
  btn: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "#dcdcdc",
    borderRadius: 8,
  },
});
