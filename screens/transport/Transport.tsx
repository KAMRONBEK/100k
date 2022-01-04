import { useNavigation } from "@react-navigation/native";
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
  ImageBackground,
} from "react-native";
import Modal from "react-native-modal";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { images } from "../../assets";
import {
  FilterIcon,
  GlobeIcon,
  LocationIcon,
  PlusIcon,
  QuestionsIcon,
  ReverseArrowIcon,
  UpdateIcon,
  UserIcon,
} from "../../assets/icons/icons";
import TransportItem from "../../components/TransportItem";
import { colors } from "../../constants/color";
import { useTransportHook } from "./hooks";
import { routes as Routes } from "../../navigation/routes";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
const FirstRoute = ({}) => {
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
      {Object.values(transport).map((item) => (
        <TransportItem item={item} key={`${item.id}`} />
      ))}
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
  let [activeIndex, setActiveIndex] = useState(0);
  const [refreshing, setRefreshing] = React.useState(false);
  const { transport, myOrder, useRefresh } = useTransportHook();

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
      {myOrder.map((item) => (
        <TransportItem item={item} key={`${item.id}`} editable={true} />
      ))}
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
  third: ThirdRoute,
});

export interface TransportViewProps {}

let titleIconMapper = {
  first: <GlobeIcon />,
};

const Transport = ({}: TransportViewProps) => {
  const layout = useWindowDimensions();
  let navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "Barchasi" },
    { key: "second", title: "Mening buyurtmalarim" },
    { key: "third", title: "Ro'yxat" },
  ]);

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <View horizontal={false} style={{ flexDirection: "column", flex: 1 }}>
      <View style={styles.top}>
        <View>
          <Modal
            isVisible={isModalVisible}
            testID={"modal"}
            onBackdropPress={() => setModalVisible(false)}
            swipeDirection={["up", "left", "right", "down"]}
            style={{ justifyContent: "center", margin: 0 }}
          >
            <View
              style={{
                marginHorizontal: 20,
                backgroundColor: colors.white,
              }}
            >
              <Text
                style={{
                  paddingVertical: 20,
                  paddingHorizontal: 20,
                  fontWeight: "bold",
                  fontSize: 24,
                  color: colors.darkBlue,
                }}
              >
                Maxsus transportlar
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "600",
                  lineHeight: 25,
                  paddingBottom: 20,
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  color: colors.darkBlue,
                }}
              >
                O'zbekiston mahsus texnika / transportlarga moslashgan
                platformalar bo'lmaganligi sababli. Ushbu bo'lim 100k express
                ilovasiga qo'shildi. Agar sizda elon qo'shib haydovchilardan
                qo'ng'iroq kutishga vaqtingiz bo'lmasa unda siz ushbu bo'lim
                100k express ilovasida haydovchi sifatida ro'yhatdan o'tgan
                yengil va yuk mashina haydovchilarini topishingiz mumkin.
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  marginVertical: 10,
                  marginBottom: 30,
                }}
              >
                <ImageBackground
                  source={images.angle}
                  resizeMode="contain"
                  style={{
                    width: 50,
                    height: 50,
                    marginHorizontal: 10,
                    marginLeft: 30,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <UpdateIcon />
                </ImageBackground>
                <Text
                  style={{
                    width: 245,
                    fontSize: 12,
                    lineHeight: 18,
                  }}
                >
                  Hech qanday formalarni to'ldirishingizni talab qilmaydi
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginVertical: 10,
                  marginBottom: 30,
                }}
              >
                <ImageBackground
                  source={images.angle}
                  resizeMode="contain"
                  style={{
                    width: 50,
                    height: 50,
                    marginHorizontal: 10,
                    marginLeft: 30,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <UserIcon />
                </ImageBackground>
                <Text
                  style={{
                    width: 245,
                    fontSize: 12,
                    lineHeight: 18,
                  }}
                >
                  Filtr orqali istalgan shahar yoki viloyatni tanlang va sizga
                  tizim tanlangan shaharda xizmat ko'rsatuvchi haydovchilar
                  ro'yhatini taqdim etadi
                </Text>
              </View>
            </View>
          </Modal>
          <TouchableOpacity onPress={toggleModal}>
            <QuestionsIcon size={22} />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.transportText}>Transportlar</Text>
        </View>
        <View>
          <TouchableOpacity style={{ padding: 5 }}>
            <FilterIcon size={22} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.header}>
        <TouchableOpacity style={styles.btn}>
          <LocationIcon size={22} color={colors.darkGray} />
          <Text style={styles.btntext}>Viloyat,tuman</Text>
        </TouchableOpacity>
        <ReverseArrowIcon size={25} color={colors.darkGray} />
        <TouchableOpacity style={styles.btn}>
          <LocationIcon size={22} color={colors.darkGray} />
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
              borderColor: colors.navyBlue,
              backgroundColor: colors.navyBlue,
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
                      color={e.focused ? colors.navyBlue : colors.darkGray}
                    />
                  )}
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 13,
                      color: e.focused ? colors.navyBlue : colors.darkGray,
                    }}
                  >
                    {e.route.title}
                  </Text>
                </View>
              );
            }}
            style={{
              backgroundColor: colors.lightWhite,
              paddingLeft: 10,
            }}
            {...props}
          />
        )}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate(Routes.ADD_TRANSPORT)}
        style={styles.touchOpacity}
      >
        <PlusIcon size={35} />
      </TouchableOpacity>
    </View>
  );
};

export default Transport;
const styles = StyleSheet.create({
  scrollView: {},
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
    backgroundColor: colors.white,
    justifyContent: "space-between",
    alignItems: "center",
  },
  btn: {
    backgroundColor: colors.white,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderWidth: 1,
    borderColor: colors.lightgray,
    borderRadius: 8,
  },
  tabView: {
    flexDirection: "row",
    color: colors.darkGray,
    alignItems: "center",
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
    color: colors.darkGray,
    fontSize: 13,
  },
  touchOpacity: {
    borderColor: colors.darkOrange,
    position: "absolute",
    right: 26,
    bottom: 97,
    alignItems: "center",
    justifyContent: "center",
    width: 55,
    height: 55,
    borderRadius: 65,
    backgroundColor: colors.lightOrange,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  transportText: {
    fontSize: 18,
    color: colors.black,
    fontWeight: "bold",
  },
});
