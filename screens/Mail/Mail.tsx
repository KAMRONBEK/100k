import React, { useState } from "react";
import {
  Image,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  RefreshControl,
  FlatList,
  useWindowDimensions,
} from "react-native";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import { images } from "../../assets";
import MailItem from "../../components/MailItem";
import { useMailHook } from "./hooks";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const FirstRoute = ({}) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const { mail, useRefresh } = useMailHook();

  const onRefresh = React.useCallback(() => {
    useRefresh();
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  return (
    <ScrollView
      style={{ marginBottom: 80 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <FlatList
        contentContainerStyle={{
          flex: 1,
        }}
        data={Object.values(mail)}
        renderItem={({ item }) => <MailItem item={item} />}
        ListEmptyComponent={() => (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={images.openBox}
              style={{
                height: 140,

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

let status = [
  { text: "Yangi" },
  { text: "Kuryer topildi" },
  { text: "Yo'lda" },
  { text: "Bajarilgan" },
];
const SecondRoute = () => {
  let [activeIndex, setActiveIndex] = useState(0);
  return (
    <View style={{ flex: 1, backgroundColor: "#f3f3f5" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 20,
          marginVertical: 10,
        }}
      >
        {status.map((e, i) => {
          return (
            <TouchableOpacity onPress={() => setActiveIndex(i)}>
              <Text
                style={{
                  backgroundColor: activeIndex === i ? "#fff9d4" : "#f3f3f5",
                  color: activeIndex === i ? "#3d2200" : "#707070",
                  borderWidth: 0.6,
                  borderColor: activeIndex === i ? "#3d2200" : "#dcdcdc",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}
              >
                {e.text}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
const ThirdRoute = () => (
  <View
    style={{ flex: 1, backgroundColor: "#f3f3f5", justifyContent: "center" }}
  >
    <Text style={{ fontSize: 18, textAlign: "center", color: "#ccc" }}>
      Hech narsa topilmadi 😔
    </Text>
  </View>
);
const FourthRoute = () => (
  <View
    style={{ flex: 1, backgroundColor: "#f3f3f5", justifyContent: "center" }}
  >
    <Text style={{ fontSize: 18, textAlign: "center", color: "#ccc" }}>
      Hech narsa topilmadi 😔
    </Text>
  </View>
);
let titleIconMapper = {
  first: images.globe,
};
const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
  fourth: FourthRoute,
});

const Mail = ({ navigation }) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "Barchasi" },
    { key: "second", title: "Mening buyurtmalarim" },
    { key: "third", title: "Ro'yxat" },
    { key: "fourth", title: "Kirim" },
  ]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f3f3f5" }}>
      <StatusBar backgroundColor={"#FFCE34"} />
      <View
        style={{
          flex: 1,
        }}
      >
        <View style={styles.top}>
          <View>
            <Image
              style={{ width: 24, height: 24 }}
              source={require("../../assets/question.png")}
            />
          </View>
          <View>
            <Text
              style={{
                fontSize: 20,
                color: "#000",
                fontWeight: "400",
              }}
            >
              Express pochta(1)
            </Text>
          </View>
          <View>
            <Image
              style={{ width: 33, height: 33 }}
              source={require("../../assets/user.png")}
            />
          </View>
        </View>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Region")}
            style={styles.btn}
          >
            <Image
              style={{ width: 15, height: 15, marginRight: 5 }}
              source={images.location}
            />
            <Text style={{ color: "#8a8a8a", fontSize: 13 }}>
              Viloyat,tuman
            </Text>
          </TouchableOpacity>
          <Image
            style={{ width: 24, height: 18, marginHorizontal: 6 }}
            source={require("../../assets/strelka.png")}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate("Region")}
            style={styles.btn}
          >
            <Image
              style={{ width: 15, height: 15, marginRight: 5 }}
              source={images.location}
            />
            <Text style={{ color: "#8a8a8a", fontSize: 13 }}>
              Viloyat,tuman
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#fff",
              paddingVertical: 11,
              borderRadius: 8,
              paddingHorizontal: 11,
            }}
          >
            <Image source={require("../../assets/filter.png")} />
          </TouchableOpacity>
        </View>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={(props) => (
            <TabBar
              scrollEnabled={true}
              indicatorStyle={{
                backgroundColor: "#047DE8",
                left: 4,
                borderWidth: 0.4,
                borderColor: "#047de8",
              }}
              tabStyle={{
                width: "auto",
                paddingBottom: 2,
                marginLeft: 20,
                marginRight: -24,
                right: 30,
              }}
              activeColor={"#047de8"}
              inactiveColor={"#8a8a8a"}
              renderLabel={(e) => {
                return (
                  <View style={styles.tabView}>
                    {titleIconMapper[e.route.key] && (
                      <Image
                        source={titleIconMapper[e.route.key]}
                        style={styles.tabimg}
                      />
                    )}
                    <Text
                      numberOfLines={1}
                      style={{
                        fontSize: 13,
                        paddingHorizontal: 10,
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
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("AdMail")}
        style={{
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
        }}
      >
        <Image
          style={{ width: 26, height: 26 }}
          source={require("../../assets/plus2.png")}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "#dcdcdc",
    borderRadius: 8,
  },
  tabView: {
    flexDirection: "row",
    color: "#8a8a8a",
  },
  tabimg: {
    width: 20,
    height: 20,
    // marginRight: 5,
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
    marginVertical: 19,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },
});
export default Mail;
