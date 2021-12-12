import React from "react";
import {
    Image,
    ScrollView,
    SafeAreaView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    ActivityIndicator,
    RefreshControl,
    FlatList,
} from "react-native";
import { images } from "../../assets";
import MailItem from "../../components/MailItem";
import { useMailHook } from "./hooks";

const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Mail = ({ navigation }) => {
    const [refreshing, setRefreshing] = React.useState(false);
    const { mail, useRefresh } = useMailHook();

    const onRefresh = React.useCallback(() => {
        useRefresh();
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    console.log(mail, "mails");
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
                <FlatList
                    contentContainerStyle={{
                        flex: 1,
                    }}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
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
