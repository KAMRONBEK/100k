import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import Modal from "react-native-modal";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import { images } from "../../assets";
import {
  FilterIcon,
  GlobeIcon,
  LocationIcon,
  QuestionsIcon,
  ReverseArrowIcon,
  UpdateIcon,
  UserIcon,
} from "../../assets/icons/icons";
import LoadItem from "../../components/LoadItem";
import { colors } from "../../constants/color";
import { routes as Routes } from "../../navigation/routes";
import { useLoadHook } from "./hooks";

const FirstRoute = () => {
  const { load, refreshLoad } = useLoadHook();
  const [refreshing, setRefreshing] = useState(false);
  let navigation = useNavigation();

  const onRefresh = React.useCallback(() => {
    refreshLoad();
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
        {Object.values(load).map((item) => (
          <LoadItem item={item} key={`${item.id}`} />
        ))}
      </ScrollView>
    </View>
  );
};
const SecondRoute = () => {
  const { load, myOrder, refreshLoad } = useLoadHook();
  const [refreshing, setRefreshing] = useState(false);
  let navigation = useNavigation();

  const onRefresh = React.useCallback(() => {
    refreshLoad();
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
        {Object.values(load).map((item) => (
          <LoadItem item={item} key={`${item.id}`} />
        ))}
      </ScrollView>
    </View>
  );
};

const ThirdRoute = () => {
  const { load, myOrder, refreshLoad } = useLoadHook();
  const [refreshing, setRefreshing] = useState(false);
  let navigation = useNavigation();

  const onRefresh = React.useCallback(() => {
    refreshLoad();
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
          <LoadItem item={item} key={`${item.id}`} editable={true} />
        ))}
      </ScrollView>
    </View>
  );
};

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
});

const wait = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export interface PassengerViewProps {}

let titleIconMapper = {
  first: <GlobeIcon />,
};

const Load = ({ navigation }: PassengerViewProps) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "Barchasi" },
    { key: "second", title: "Ko'rilganlar" },
    { key: "third", title: "Mening e'lonlarim" },
  ]);

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style={styles.statusbar} />
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
              style={{ marginHorizontal: 20, backgroundColor: colors.white }}
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
                Yuk tashish
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "600",
                  lineHeight: 30,
                  paddingBottom: 20,
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  color: colors.darkBlue,
                }}
              >
                100k Kargo bo'limi yuk mashinalarni tez va arzon narxlarda
                topishda yordam beradi. Iliomani yuklab ilib manzil va yukingiz
                ma'lumot kiriting va shu zahotiyoq siz bilan yuk mashina
                haydovchilari bog'lanishadi.
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
                <Text style={{ width: 245, fontSize: 12, lineHeight: 18 }}>
                  Endi yuk mashinalar avtoturargohida borib yuk mashinalarni
                  izlash shart emas. 100k Kargo vaqtingizni tejaydi.
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
                <Text style={{ width: 245, fontSize: 12, lineHeight: 18 }}>
                  Narxni siz taklif qilasiz tizim esa sizning eloningizni eng
                  yaqin haydovchilarga ko'rsatib ularni siz bilan bog'lab
                  beradi.
                </Text>
              </View>
            </View>
          </Modal>
          <TouchableOpacity onPress={toggleModal}>
            <QuestionsIcon size={22} />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.passengerbox}>Yuklar</Text>
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
              backgroundColor: colors.navyBlue,
              left: 11,
              borderWidth: 0.5,
              borderColor: colors.navyBlue,
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
                      color={e.focused ? colors.navyBlue : colors.darkGray}
                      size={22}
                    />
                  )}
                  <Text
                    // numberOfLines={1}
                    style={{
                      fontSize: 13,
                      fontWeight: "bold",
                      color: e.focused ? colors.navyBlue : colors.darkGray,
                    }}
                  >
                    {e.route.title}
                  </Text>
                </View>
              );
            }}
            style={{ backgroundColor: colors.lightWhite, paddingLeft: 10 }}
            {...props}
          />
        )}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate(Routes.ADD_LOAD)}
        style={styles.tchopacity}
      >
        <Image style={styles.plus2} source={images.plus2} />
      </TouchableOpacity>
    </View>
  );
};

export default Load;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightWhite,
  },
  scrollView: {
    paddingBottom: 70,
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
  top: {
    flexDirection: "row",
    paddingHorizontal: 21,
    paddingVertical: 16,
    backgroundColor: colors.white,
    justifyContent: "space-between",
    alignItems: "center",
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
    borderColor: colors.darkOrange,
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 11,
    backgroundColor: colors.lightOrange,
    flexDirection: "row",
    alignItems: "center",
  },
  statusBar: {
    backgroundColor: "#FFCE34",
  },
  topImg: {
    width: 24,
    height: 24,
  },
  topText: {
    fontSize: 20,
    color: "#000",
  },
  filtericon: {
    width: 20,
    height: 20,
  },
  locationbox: {
    width: 15,
    height: 15,
    marginRight: 5,
  },
  locationtext: {
    color: "#8a8a8a",
    fontSize: 13,
    paddingHorizontal: 15,
  },
  tchopacity: {
    borderColor: colors.darkOrange,
    borderWidth: 1,
    position: "absolute",
    right: 16,
    bottom: 87,
    alignItems: "center",
    justifyContent: "center",
    width: 65,
    height: 65,
    borderRadius: 65,
    backgroundColor: colors.lightOrange,
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
    fontWeight: "bold",
    color: colors.black,
  },
  psimage: {
    width: 20,
    height: 20,
    tintColor: colors.black,
  },
  btnimg: {
    width: 15,
    height: 15,
    marginRight: 5,
    alignItems: "center",
  },
  btntext: {
    color: colors.darkGray,
    fontSize: 13,
  },
  strelkaimg: {
    width: 24,
    height: 18,
    marginHorizontal: 6,
  },
  tabView: {
    flexDirection: "row",
    color: colors.darkGray,
    fontWeight: "bold",
  },
  tabimg: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  globe: {
    fontSize: 16,
  },
});
