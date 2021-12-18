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
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { images } from "../../assets";
import {
    FilterIcon,
    LocationIcon,
    QuestionsIcon,
    ReverseArrowIcon,
} from "../../assets/icons/icons";
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

let titleIconMapper = {
    first: images.globe,
};

const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
});

const Transport = ({ navigation }) => {
    // useFonts({
    //     Montserrat: require('../assets/fonts/Montserrat-Medium.ttf'),
    //     MontserratBold: require('../assets/fonts/Montserrat-Bold.ttf'),
    //     MontserratLight: require('../assets/fonts/Montserrat-Light.ttf'),
    // });
    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: "first", title: "Barchasi" },
        { key: "second", title: "Mening buyurtmalarim" },
        { key: "third", title: "Ro'yxat" },
    ]);
    return (
        <View horizontal={false} style={{ flexDirection: "column", flex: 1 }}>
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
                        Transportlar (3)
                    </Text>
                </View>
                <View>
                    <FilterIcon size={22} />
                </View>
            </View>
            <View style={styles.header}>
                <TouchableOpacity style={styles.btn}>
                    <LocationIcon size={22} color="#8a8a8a" />
                    <Text style={styles.btntext}>Viloyat,tuman</Text>
                </TouchableOpacity>
                <ReverseArrowIcon size={25} color="#8a8a8a" />
                <TouchableOpacity style={styles.btn}>
                    <LocationIcon size={22} color="#8a8a8a" />
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
                            left: 12,
                            borderWidth: 0.5,
                            borderColor: "#047de8",
                            backgroundColor: "#047DE8",
                        }}
                        tabStyle={{
                            width: "auto",
                            paddingBottom: 2,
                        }}
                        renderLabel={(e) => {
                            return (
                                <View style={styles.tabView}>
                                    {titleIconMapper[e.route.key] && (
                                        <Image
                                            source={
                                                titleIconMapper[e.route.key]
                                            }
                                            style={styles.tabimg}
                                        />
                                    )}
                                    <Text
                                        numberOfLines={1}
                                        style={{
                                            fontSize: 13,
                                            paddingHorizontal: 10,

                                            color: "#047DE8",
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
                <Image
                    style={{ width: 26, height: 26 }}
                    source={images.plus2}
                />
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
    header: {
        marginVertical: 15,
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 5,
        paddingHorizontal: 16,
        justifyContent: "space-between",
    },
    btntext: {
        color: "#8a8a8a",
        fontSize: 13,
    },
});
