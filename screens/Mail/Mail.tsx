import { useNavigation } from "@react-navigation/core";
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
  ImageBackground,
} from "react-native";
import Modal from "react-native-modal";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
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
import MailItem from "../../components/MailItem";
import { colors } from "../../constants/color";
import { useMailHook } from "./hooks";

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
  const { mail, myOrder, useRefresh } = useMailHook();
  const [refreshing, setRefreshing] = useState(false);
  let navigation = useNavigation();

  const onRefresh = React.useCallback(() => {
    useRefresh();
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: colors.lightWhite }}>
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
                  backgroundColor:
                    activeIndex === i ? colors.cornsilk : colors.lightWhite,
                  color: activeIndex === i ? colors.orange : colors.linghtGray,
                  borderWidth: 0.6,
                  borderRadius: 5,
                  borderColor:
                    activeIndex === i ? colors.orange : colors.linghtGray,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  fontWeight: "600",
                }}
              >
                {e.text}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {myOrder.map((item) => (
            <MailItem item={item} key={`${item.id}`} editable={true} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};
const ThirdRoute = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: colors.lightWhite,
      justifyContent: "center",
    }}
  >
    <Text style={{ fontSize: 18, textAlign: "center", color: colors.gray }}>
      Hech narsa topilmadi 😔
    </Text>
  </View>
);
const FourthRoute = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: colors.lightWhite,
      justifyContent: "center",
    }}
  >
    <Text style={{ fontSize: 18, textAlign: "center", color: colors.gray }}>
      Hech narsa topilmadi 😔
    </Text>
  </View>
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
  fourth: FourthRoute,
});

const wait = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export interface MailViewProps {}

let titleIconMapper = {
  first: <GlobeIcon />,
};

const Mail = ({}: MailViewProps) => {
  const layout = useWindowDimensions();
  let navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "Barchasi" },
    { key: "second", title: "Mening buyurtmalarim" },
    { key: "third", title: "Ro'yxat" },
    { key: "fourth", title: "Kirim" },
  ]);

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.lightWhite }}>
      <StatusBar backgroundColor={colors.lightOrange} />
      <View
        style={{
          flex: 1,
        }}
      >
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
                  Express pochta
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    lineHeight: 25,
                    paddingBottom: 20,
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    color: colors.darkBlue,
                  }}
                >
                  Express jo'natmalar bo'limida siz uyingizdan turib
                  jo'natmangizni boshqa viloyat yoki shaharga berib yuborishigiz
                  mumkin. Bazi hollarda qimmatbaho buyumlarni yuborish
                  zaruruyati tug'ulib qoladi va bunday holatlarda esa ishonchli
                  tanish haydovchi topa olmasangiz ko'nglingiz notinch bo'ladi.
                  Biz shu kabi muammolar yechimi tayyor buyurtma berish
                  formasini toldirish vaqtida qimmatbaho buyumingiz qiymatini
                  kirinig hotirjam ishlaringizni davom ettiring
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
                    Buyurtma berish formasini to'ldirganizda, tizim bir zumda
                    summasini hisoblab beradi.
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
                    Tahminan 10 daqiqa ishida sizga eng yaqin va yuqori
                    reytingli kuryer biriktiladi
                  </Text>
                </View>
              </View>
            </Modal>
            <TouchableOpacity onPress={toggleModal}>
              <QuestionsIcon size={22} />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.mailtext}>Express pochta</Text>
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
              scrollEnabled={true}
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
              activeColor={colors.navyBlue}
              inactiveColor={colors.darkGray}
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
                      numberOfLines={1}
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
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("AdMail")}
        style={styles.touchOpacity}
      >
        <PlusIcon size={35} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  scrollView: {
    paddingBottom: 120,
  },
  btntext: {
    color: colors.darkGray,
    fontSize: 13,
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
  mailtext: {
    fontSize: 18,
    color: colors.black,
    fontWeight: "bold",
  },
});
export default Mail;
