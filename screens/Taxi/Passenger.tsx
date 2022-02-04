import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import {
  FlatList,
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
import { useDispatch, useSelector } from "react-redux";
import {
  FilterIcon,
  GlobeIcon,
  PlusIcon,
  QuestionsIcon,
} from "../../assets/icons/icons";
import Filter from "../../components/Filter";
import FilterModal from "../../components/FilterModal";
import PassangerItem from "../../components/PassangerItem";
import { colors } from "../../constants/color";
import { routes as Routes } from "../../navigation/routes";
import { selectOrderState } from "../../redux/slices/order/order";
import { useTaxiHook } from "./hooks";

const FirstRoute = () => {
  const { commonTaxi, refreshTaxi } = useTaxiHook();
  const [refreshing, setRefreshing] = useState(false);
  let navigation = useNavigation();

  const onRefresh = React.useCallback(() => {
    refreshTaxi();
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
      <Filter route={Routes.PASSENGER} />
      <FlatList
        contentContainerStyle={{
          flex: 1,
        }}
        data={!!commonTaxi ? commonTaxi : []}
        renderItem={({ item }) => <PassangerItem item={item} />}
      />
    </ScrollView>
  );
};
const SecondRoute = () => {
  const { taxi, refreshLoad } = useTaxiHook();
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
        {!!taxi &&
          taxi.map((item) => (
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

  const { createPassanger, loading } = useTaxiHook();

  const onSubmitFrom = () => {
    createPassanger({
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
          onPress={() => navigation.navigate(Routes.QUESTIONPASSENGER)}
        >
          <QuestionsIcon size={22} />
        </TouchableOpacity>
        <View>
          <Text style={styles.taxiText}>Yo'lovchilar</Text>
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
                      color: e.focused ? colors.navyBlue : colors.darkGray,
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
              backgroundColor: colors.lightWhite,
              paddingLeft: 10,
            }}
            {...props}
          />
        )}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate(Routes.ADD_PASSENGER)}
        style={styles.touchopacity}
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
    backgroundColor: colors.lightOrange,
  },
  stimage: {
    width: 24,
    height: 24,
  },
  passengerBox: {
    fontSize: 18,
    color: colors.black,
    fontWeight: "bold",
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
    alignItems: "center",
  },
  tabimg: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  filterIcon: {
    tintColor: colors.black,
  },
  tabViewtxt: {
    fontSize: 13,
    color: colors.navyBlue,
  },
  modal: {
    justifyContent: "center",
    margin: 0,
  },
  taxiView: {
    marginHorizontal: 20,
    backgroundColor: colors.white,
  },
  taxiText: {
    fontSize: 18,
    color: colors.black,
    fontWeight: "bold",
  },
  paragraphText: {
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 26,
    paddingBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    color: colors.darkBlue,
  },
  imgView: {
    flexDirection: "row",
    marginVertical: 10,
    marginBottom: 30,
  },
  imgBack: {
    width: 50,
    height: 50,
    marginHorizontal: 10,
    marginLeft: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  imgText: {
    width: 245,
    fontSize: 12,
    lineHeight: 18,
  },
  userImgView: {
    flexDirection: "row",
    marginVertical: 10,
    marginBottom: 30,
  },
  userImgBack: {
    width: 50,
    height: 50,
    marginHorizontal: 10,
    marginLeft: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  userImgText: {
    width: 245,
    fontSize: 12,
    lineHeight: 18,
  },
  filterBtn: {
    padding: 5,
  },
  nothingText: {
    fontSize: 18,
    color: colors.darkGray,
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
  locationText: {
    marginLeft: 10,
    color: colors.darkGray,
    fontSize: 14,
  },
});
