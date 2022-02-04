import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
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
import { TextInput } from "react-native-gesture-handler";
import Modal from "react-native-modal";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import { useDispatch, useSelector } from "react-redux";
import { images } from "../../assets";
import {
  FilterIcon,
  GlobeIcon,
  LeftArrowIcon,
  LocationIcon,
  PlusIcon,
  QuestionsIcon,
  ReverseArrowIcon,
  SearchIcon,
  UpdateIcon,
  UserIcon,
} from "../../assets/icons/icons";
import Filter from "../../components/Filter";
import FilterModal from "../../components/FilterModal";
import LoadItem from "../../components/LoadItem";
import MailSelector from "../../components/MailSelector";
import { colors } from "../../constants/color";
import { locationType } from "../../constants/values";
import { routes as Routes } from "../../navigation/routes";
import { selectOrderState, setOrderData } from "../../redux/slices/order/order";
import { useLoadHook } from "./hooks";

const FirstRoute = () => {
  const { commonLoad, refreshLoad } = useLoadHook();
  const [refreshing, setRefreshing] = useState(false);
  let navigation = useNavigation();

  const onRefresh = React.useCallback(() => {
    refreshLoad();
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.scrollView}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Filter route={Routes.LOAD} />
      <FlatList
        contentContainerStyle={{ flex: 1 }}
        data={!!commonLoad ? commonLoad : []}
        renderItem={({ item }) => <LoadItem item={item} />}
      />
    </ScrollView>
  );
};
const SecondRoute = () => {
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
        {/* {!!load &&
                    load.map((item) => (
                        <LoadItem item={item} key={`${item.id}`} />
                    ))} */}
      </ScrollView>
    </View>
  );
};

const ThirdRoute = () => {
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
        {!!load &&
          load.map((item) => (
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

  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const filterToggleModal = () => {
    setFilterModalVisible(!filterModalVisible);
  };

  const state = useSelector(selectOrderState);

  const dispatch = useDispatch();

  const { createLoad, loading } = useLoadHook();

  const onSubmitFrom = () => {
    createLoad({
      from_address: state.fromAddress,
      from_region_id: state.fromRegionId,
      from_district_id: state.fromDistrictId,
      to_region_id: state.toRegionId,
      to_district_id: state.toDistrictId,
      to_address: state.toAddress,
      note: state.note,
      cash_amount: state.cashAmount,
      delivery_fee_amount: state.deliveryFeeAmount,
      creator_phone: state.creatorPhone,
      recipient_name: state.recipientName,
      recipient_phone: state.recipientPhone,
      creator_name: state.creatorName,
      insurance_amount: state.insurance,
      matter: state.matter,
      vehicle_type: "on_car",
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style={styles.statusbar} />
      <View style={styles.top}>
        <TouchableOpacity
          onPress={() => navigation.navigate(Routes.QUESTIONLOAD)}
        >
          <QuestionsIcon size={22} />
        </TouchableOpacity>
        <View>
          <Text style={styles.loadText}>Yuklar</Text>
        </View>
        <View>
          <TouchableOpacity onPress={filterToggleModal}>
            <FilterIcon size={22} />
          </TouchableOpacity>
          <FilterModal
            value={filterModalVisible}
            setValue={setFilterModalVisible}
            toggleValue={filterToggleModal}
          />
        </View>
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
            style={{
              backgroundColor: colors.lightWhite,
              paddingLeft: 10,
            }}
            {...props}
          />
        )}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate(Routes.ADD_LOAD)}
        style={styles.touchopacity}
      >
        <PlusIcon size={35} />
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
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.white,
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
  touchopacity: {
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
  passengerBox: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.black,
    marginLeft: 55,
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
    alignItems: "center",
  },
  tabimg: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  globe: {
    fontSize: 16,
  },
  nothingText: {
    fontSize: 18,
    color: colors.darkGray,
  },
  goBackFilter: {
    backgroundColor: colors.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    paddingVertical: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    // marginTop: 20,
    paddingTop: 50,
  },
  filterText: {
    marginLeft: 130,
    fontSize: 18,
    fontWeight: "bold",
  },
  searchInputView: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: colors.gray,
    // paddingHorizontal: 45,
    marginTop: 25,
    marginHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  searchTextInput: {
    paddingHorizontal: 10,
  },
  btnOne: {
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    borderColor: colors.lightgray,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 15,
    marginTop: 5,
  },
  locationText: {
    marginLeft: 10,
    color: colors.darkGray,
    fontSize: 14,
  },
  searchTouchBtn: {
    marginHorizontal: 25,
    alignItems: "center",
    marginTop: 340,
    backgroundColor: colors.lightOrange,
    borderRadius: 10,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 5,
  },
  searchTouchText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  clearFilterText: {
    fontSize: 16,
    paddingHorizontal: 10,
    color: colors.lightOrange,
  },
  clearFilterView: {
    alignItems: "center",
    marginTop: 10,
  },
  loadText: {
    fontSize: 18,
    color: colors.black,
    fontWeight: "bold",
  },
});
