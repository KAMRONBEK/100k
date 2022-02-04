import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import { useDispatch, useSelector } from "react-redux";
import { images } from "../../assets";
import {
  FilterIcon,
  GlobeIcon,
  PlusIcon,
  QuestionsIcon,
} from "../../assets/icons/icons";
import Filter from "../../components/Filter";
import FilterModal from "../../components/FilterModal";
import TransportItem from "../../components/TransportItem";
import { colors } from "../../constants/color";
import { routes as Routes } from "../../navigation/routes";
import { selectOrderState } from "../../redux/slices/order/order";
import { useTransportHook } from "./hooks";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
const FirstRoute = ({}) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const { commonTransport, useRefresh } = useTransportHook();

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
      <Filter route={Routes.TRANSPORT} />
      <FlatList
        contentContainerStyle={{
          flex: 1,
        }}
        data={!!commonTransport ? commonTransport : []}
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
    ></ScrollView>
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
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {!!transport &&
          transport.map((item) => (
            <TransportItem item={item} key={`${item.id}`} editable={true} />
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
    { key: "second", title: "Ko'rilganlar" },
    { key: "third", title: "Mening buyurtmalarim" },
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

  const { createTransport, loading } = useTransportHook();

  const onSubmitFrom = () => {
    createTransport({
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
    <View horizontal={false} style={{ flexDirection: "column", flex: 1 }}>
      <View style={styles.top}>
        <TouchableOpacity
          onPress={() => navigation.navigate(Routes.QUESTIONTRANSPORT)}
        >
          <QuestionsIcon size={22} />
        </TouchableOpacity>
        <View>
          <Text style={styles.transportText}>Transportlar</Text>
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
  scrollView: {
    paddingBottom: 70,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "red",
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
});
