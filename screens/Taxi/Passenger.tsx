import { useNavigation } from "@react-navigation/core";
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
    PlusIcon,
    QuestionsIcon,
    ReverseArrowIcon,
    UpdateIcon,
    UserIcon,
} from "../../assets/icons/icons";
import Filter from "../../components/Filter";
import PassagerMyOrderItem from "../../components/PassagerMyOrderItem";
import PassangerItem from "../../components/PassangerItem";
import { colors } from "../../constants/color";
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
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
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
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                {myOrder.map((item) => (
                    <PassangerItem
                        item={item}
                        key={`${item.id}`}
                        editable={true}
                    />
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
                                Taksi xizmati
                            </Text>
                            <Text
                                style={{
                                    fontSize: 15,
                                    fontWeight: "600",
                                    lineHeight: 26,
                                    paddingBottom: 20,
                                    paddingVertical: 10,
                                    paddingHorizontal: 20,
                                    color: colors.darkBlue,
                                }}
                            >
                                Ushbu bo'lim viloyatlar aro odam tashish
                                xizmatini avtomatlashtirish. Mijozlarga
                                qulayliklar yaratish uchun tashkil etilgan. Agar
                                siz tez-tez boshqa viloyatlardan safarda bo'lib
                                tursangiz sizga quyidagi holatlar tanish:
                                qolizdan yuklar bilan avto turargoh (petak)
                                gacha yetib olish, mijozlar kelishini kutib
                                turgan 10 lab haydovchilar bilan ketish narxini
                                kelishish, soatlab avtomobilda yolovchilar
                                to'lishini kutish va h.k. Bizning servisimiz
                                ushbu muammolarni barchasini uydan chiqmasdan
                                hal qilishingiz yordam beradi.
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
                                    Narxni va ketish vaqtini siz belgilaysiz
                                    haydovchiga maqul kelsa uyingizdan
                                    yuklaringizni bilan olib ketadi. Vaqtingiz
                                    tejaladi.
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
                                    Narxni va ketish vaqtini siz belgilaysiz
                                    haydovchiga maqul kelsa uyingizdan
                                    yuklaringiz bilan olib ketadi. Vaqtingiz
                                    tejaladi.
                                </Text>
                            </View>
                        </View>
                    </Modal>
                    <TouchableOpacity onPress={toggleModal}>
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
            <Filter route={Routes.PASSENGER} />
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
                                            color={
                                                e.focused
                                                    ? colors.navyBlue
                                                    : colors.darkGray
                                            }
                                            size={22}
                                        />
                                    )}
                                    <Text
                                        style={{
                                            color: e.focused
                                                ? colors.navyBlue
                                                : colors.darkGray,
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
    passengerbox: {
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
});
