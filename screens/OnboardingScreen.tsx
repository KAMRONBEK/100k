import React, { useState, useRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  StatusBar,
  FlatList,
  View,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { colors } from "../constants/color";
import { routes } from "../navigation/routes";
const { width, height } = Dimensions.get("window");
const slides = [
  {
    id: "1",
    title: "Pochta",
    text: "Uyingizdan chiqmasdan butun O’zbekiston bo’ylab pochta posilkalarini yuboring",
    image: require("../assets/rafiki.png"),
  },
  {
    id: "2",
    title: "Yo’lovchi",
    text: "Bizning platformamizda kuryer bo’ling va onlayn buyurtmalar qabul qiling yoki transportingizni platformaga joylashtiring va onlayn buyurtma qabul qiling",
    image: require("../assets/rafiki1.png"),
  },
  {
    id: "3",
    title: "Yuk",
    text: "Katta yuklarni tashuvchilarga buyurtma bering yoki yuk mashinangizni platformaga joylashtiring va onlayn buyurtma qabul qiling",
    image: require("../assets/rafiki2.png"),
  },
  {
    id: "4",
    title: "Transport va maxsus texnika",
    text: "100k Express platformasiga har qanday transport va maxsus transportlarni toping va buyurtmalarni onlayn qabul qiling",
    image: require("../assets/rafiki3.png"),
  },
];
const SlideOne = ({ item }) => {
  return (
    <View style={{ alignItems: "center" }}>
      <Text style={styles.title}>{item.title}</Text>
      <Image
        source={item.image}
        style={{
          marginBottom: 20,
          height: 250,
          width: "100%",
          resizeMode: "contain",
        }}
      />
      <Text
        style={{
          width,
          height: 120,
          color: colors.darkBlueGray,
          paddingHorizontal: 16,
          textAlign: "center",
          fontSize: 20,
        }}
      >
        {item.text}
      </Text>
    </View>
  );
};
const OnboardingScreen = ({ navigation }) => {
  const [currentSlideIndex, SetCurrentSlideIndex] = useState(0);
  const ref = useRef(null);
  const Footer = () => {
    return (
      <View
        style={{
          height: height * 0.25,
          justifyContent: "space-between",
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlideIndex == index && {
                  width: 32,
                  height: 13,
                  borderRadius: 10,
                },
              ]}
            />
          ))}
        </View>
        <View style={{ marginBottom: 20 }}>
          {currentSlideIndex == slides.length - 1 ? (
            <View style={{ height: 50 }}>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={[styles.btn, { backgroundColor: "transparent" }]}
                  onPress={skip}
                >
                  <Text
                    style={{
                      color: colors.darkBlueGray,
                      fontSize: 18,
                      fontWeight: "600",
                    }}
                  >
                    Orqaga
                  </Text>
                </TouchableOpacity>
                <View style={{ width: 15 }}></View>
                <TouchableOpacity
                  style={[styles.btn, { backgroundColor: "transparent" }]}
                  onPress={() => navigation.replace(routes.TAB_STACK)}
                >
                  <Text
                    style={{
                      color: colors.darkBlueGray,
                      fontSize: 18,
                      fontWeight: "600",
                    }}
                  >
                    Tushunarli
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View>
              {currentSlideIndex != 0 ? (
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    style={[styles.btn, { backgroundColor: "transparent" }]}
                    onPress={skip}
                  >
                    <Text
                      style={{
                        color: colors.darkBlueGray,
                        fontSize: 18,
                        fontWeight: "600",
                      }}
                    >
                      Orqaga
                    </Text>
                  </TouchableOpacity>
                  <View style={{ width: 15 }}></View>
                  <TouchableOpacity
                    style={[styles.btn, { backgroundColor: "transparent" }]}
                    onPress={goNextSlide}
                  >
                    <Text
                      style={{
                        color: colors.darkBlueGray,
                        fontSize: 18,
                        fontWeight: "600",
                      }}
                    >
                      Keyingi
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    style={[styles.btn, { backgroundColor: "transparent" }]}
                  >
                    <Text
                      style={{
                        color: colors.white,
                        fontSize: 18,
                        fontWeight: "600",
                      }}
                    >
                      Keyingi
                    </Text>
                  </TouchableOpacity>
                  <View style={{ width: 15 }}></View>
                  <TouchableOpacity
                    style={[styles.btn, { backgroundColor: "transparent" }]}
                    onPress={goNextSlide}
                  >
                    <Text
                      style={{
                        color: colors.darkBlueGray,
                        fontSize: 18,
                        fontWeight: "600",
                      }}
                    >
                      Keyingi
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
        </View>
      </View>
    );
  };
  const updateCurrentSlideIndex = (e) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    SetCurrentSlideIndex(currentIndex);
  };
  const goNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current?.scrollToOffset({ offset });
      SetCurrentSlideIndex(nextSlideIndex);
    }
  };
  const skip = () => {
    const lastSlideIndex = currentSlideIndex - 1;
    if (lastSlideIndex != -1) {
      const offset = lastSlideIndex * width;
      ref?.current?.scrollToOffset({ offset });
      SetCurrentSlideIndex(lastSlideIndex);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <StatusBar backgroundColor={colors.sunglow} />
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        pagingEnabled
        data={slides}
        contentContainerStyle={{ height: height }}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <SlideOne item={item} />}
      />
      <Footer />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  title: {
    color: colors.darkBlue,
    fontSize: 32,
    fontWeight: "600",
    textAlign: "center",
    width: 250,
    height: 80,
    marginTop: 43,
    marginBottom: 30,
  },
  indicator: {
    height: 13,
    width: 13,
    backgroundColor: colors.ultraRed,
    marginHorizontal: 8,
    borderRadius: 30,
  },
  btn: {
    flex: 1,
    height: 50,
    borderRadius: 5,
    backgroundColor: colors.ultraRed,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default OnboardingScreen;
