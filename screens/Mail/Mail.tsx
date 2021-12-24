import React, { useEffect, useRef, useState } from "react";
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
    Animated,
} from "react-native";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import { images } from "../../assets";
import {
    FilterIcon,
    GlobeIcon,
    LocationIcon,
    PlusIcon,
    QuestionsIcon,
    ReverseArrowIcon,
} from "../../assets/icons/icons";
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
                                    backgroundColor:
                                        activeIndex === i
                                            ? "#fff9d4"
                                            : "#f3f3f5",
                                    color:
                                        activeIndex === i
                                            ? "#3d2200"
                                            : "#707070",
                                    borderWidth: 0.6,
                                    borderColor:
                                        activeIndex === i
                                            ? "#3d2200"
                                            : "#dcdcdc",
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
        style={{
            flex: 1,
            backgroundColor: "#f3f3f5",
            justifyContent: "center",
        }}
    >
        <Text style={{ fontSize: 18, textAlign: "center", color: "#ccc" }}>
            Hech narsa topilmadi 😔
        </Text>
    </View>
);
const FourthRoute = () => (
    <View
        style={{
            flex: 1,
            backgroundColor: "#f3f3f5",
            justifyContent: "center",
        }}
    >
        <Text style={{ fontSize: 18, textAlign: "center", color: "#ccc" }}>
            Hech narsa topilmadi 😔
        </Text>
    </View>
);
let titleIconMapper = {
    first: <GlobeIcon />,
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

    const [filterShown, setFilterShown] = useState(false);
    const scrolling = useRef(new Animated.Value(0)).current;
    const translation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(translation, {
            toValue: filterShown ? -100 : 0,
            duration: 250,
            useNativeDriver: true,
        }).start();
    }, [filterShown]);

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
                        <QuestionsIcon size={22} />
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
                        <FilterIcon size={22} />
                    </View>
                </View>
                <Animated.View
                    style={[
                        styles.header,
                        {
                            transform: [{ translateY: translation }],
                        },
                    ]}
                >
                    <TouchableOpacity style={styles.btn}>
                        <LocationIcon size={22} color="#8a8a8a" />
                        <Text style={styles.btntext}>Viloyat,tuman</Text>
                    </TouchableOpacity>
                    <ReverseArrowIcon size={25} color="#8a8a8a" />
                    <TouchableOpacity style={styles.btn}>
                        <LocationIcon size={22} color="#8a8a8a" />
                        <Text style={styles.btntext}>Viloyat,tuman</Text>
                    </TouchableOpacity>
                </Animated.View>
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
                                            <GlobeIcon
                                                color={
                                                    e.focused
                                                        ? "#047de8"
                                                        : "#8a8a8a"
                                                }
                                                size={22}
                                            />
                                        )}
                                        <Text
                                            numberOfLines={1}
                                            style={{
                                                fontSize: 13,
                                                paddingHorizontal: 10,
                                                color: e.focused
                                                    ? "#047DE8"
                                                    : "#8a8a8a",
                                            }}
                                        >
                                            {e.route.title}
                                        </Text>
                                    </View>
                                );
                            }}
                            style={{
                                backgroundColor: "#f3f3f5",
                                paddingLeft: 10,
                            }}
                            onScroll={Animated.event([
                                {
                                    nativeEvent: {
                                        contentOffset: {
                                            y: scrolling,
                                        },
                                    },
                                },
                            ])}
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
    btntext: {
        color: "#8a8a8a",
        fontSize: 13,
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
        marginVertical: 15,
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 5,
        paddingHorizontal: 16,
        justifyContent: "space-between",
    },
});
export default Mail;
