import React, { useCallback, useState } from "react";
import {
  View,
  TextInput,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { images } from "../assets";
import {
  BellIcon,
  ExitIcon,
  IDIcon,
  RetingIcon,
  WalletIcon,
} from "../assets/icons/icons";
import { ImagePickerAvatar } from "../components/imagepicker/image-picker-avatar (2)";
import { ImagePickerModal } from "../components/imagepicker/image-picker-modal (2)";
import { colors } from "../constants/color";
import { routes } from "../navigation/routes";
import { useProfileHook } from "./Profile/hooks";
import * as ImagePicker from "react-native-image-picker";

const MyCabinet = ({ navigation }) => {
  let { user, onLogout } = useProfileHook();
  const [pickerResponse, setPickerResponse] = useState<ImagePicker.Asset>({});
  const [visible, setVisible] = useState(false);

  const onImageLibraryPress = useCallback(() => {
    const options = {
      selectionLimit: 1,
      mediaType: "photo",
    };
    ImagePicker.launchImageLibrary(options, (e) => {
      setPickerResponse(e);
      setVisible(false);
    });
  }, []);

  const onCameraPress = React.useCallback(() => {
    const options = {
      saveToPhotos: true,
      mediaType: "photo",
    };
    ImagePicker.launchCamera(options, (e) => {
      setPickerResponse(e);
      setPickerResponse(false);
    });
  }, []);

  const uri = pickerResponse?.assets && pickerResponse.assets[0].uri;

  return (
    <>
      <View style={styles.shadowProp}>
        <View style={styles.viewBox}>
          <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
            <ExitIcon size={22} />
          </TouchableOpacity>
          <Text style={styles.mycabinaet}>Mening kabinetim</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(routes.NOTIFICATIONS)}
          >
            <BellIcon size={22} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <StatusBar style={styles.statusBar} />
        <View>
          <View style={styles.screen}>
            <ImagePickerAvatar uri={uri} onPress={onImageLibraryPress} />
          </View>
        </View>
        <View style={styles.userNameBox}>
          <View style={styles.namesBox}>
            <Text style={styles.nameTxt}>{user.name}</Text>
            <Text style={styles.surname}>{user.surname}</Text>
          </View>
          <Text style={styles.username}>{user.username}</Text>
        </View>
        <View style={styles.aboutView}>
          <View style={styles.IDView}>
            <IDIcon size={40} color="#556080" />
            <Text style={styles.aboutText}>{user?.about}</Text>
            <Text style={styles.IDText}>id</Text>
          </View>
          <View style={styles.balanceView}>
            <WalletIcon size={40} color="#556080" />
            <Text style={styles.balanceText}>{user?.balance} so’m</Text>
            <Text style={styles.basicText}>asosiy</Text>
          </View>
          <View style={styles.balanceSecondView}>
            <WalletIcon size={40} color="#556080" />
            <Text style={styles.walletText}>{user?.balance} so’m</Text>
            <Text style={styles.depozitText}>depozit</Text>
          </View>
          <View style={styles.retingView}>
            <RetingIcon size={40} />
            <Text style={styles.retingText}>+{user?.id}</Text>
            <Text style={styles.idText}>reyting</Text>
          </View>
        </View>
        <View style={styles.privateView}>
          <View style={styles.touchopcPrivate}>
            <TouchableOpacity
              onPress={() => navigation.navigate(routes.PRIVATE)}
              style={styles.btn}
            >
              <Image style={styles.settingsBox} source={images.settingimg} />
              <Text style={styles.btnText}>Sozlamalar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate(routes.MONEY)}
              style={styles.btn}
            >
              <Image style={styles.billBox} source={images.billimg} />
              <Text style={styles.btnText}>Hisobni To'ldirish</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.courierView}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(routes.MY_CABINET_STACK, {
                  screen: routes.COURIER,
                })
              }
              style={styles.btn}
            >
              <Image style={styles.coureirImg} source={images.courier} />
              <Text style={styles.btnText}>Kuryer Bolmoq</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate(routes.ONBOARDING)}
              style={styles.btn}
            >
              <Image style={styles.useImg} source={images.useImg} />
              <Text style={styles.btnText}>Foydalanish</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.infoView}>
            <TouchableOpacity
              onPress={() => navigation.navigate(routes.ABOUT)}
              style={styles.btn}
            >
              <Image style={styles.infoImg} source={images.infoImg} />
              <Text style={styles.btnText}>Ilova Tog’risida</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate(routes.SUPPORT)}
              style={styles.btn}
            >
              <Image style={styles.supportImg} source={images.supportImg} />
              <Text style={styles.btnText}>Qo'llab-Quvvatlash</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.noInternet}>
            <TouchableOpacity
              onPress={() => navigation.navigate(routes.NO_INTERNET)}
              style={styles.btn}
            >
              <Image style={styles.biznesImgBox} source={images.biznesImg} />
              <Text style={styles.btnText}>biznes uchun</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate(routes.HISTORY)}
              style={styles.btn}
            >
              <Image style={styles.historyImgBox} source={images.historyImg} />
              <Text style={styles.btnText}>to'lovlar tarixi</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default MyCabinet;
const styles = StyleSheet.create({
  shadowProp: {
    shadowColor: colors.black,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor: colors.white,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  btn: {
    flexDirection: "column",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.darkGray,
    borderRadius: 15,
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 23,
    paddingVertical: 15,
    marginLeft: 5,
  },
  btnText: {
    color: colors.darkGray,
    fontSize: 14,
    fontWeight: "300",
    marginTop: 9,
  },
  image: {
    height: 80,
    width: 80,
  },
  logoutButton: {
    padding: 5,
  },
  mycabinaet: {
    fontSize: 18,
    fontWeight: "bold",
  },
  viewBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statusBar: {
    backgroundColor: "#FFCE34",
  },
  screen: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  userNameBox: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginVertical: 10,
    alignItems: "center",
  },
  namesBox: {
    flexDirection: "row",
    marginLeft: 10,
  },
  nameTxt: {
    fontSize: 16,
    fontWeight: "600",
    marginRight: 10,
  },
  surname: {
    fontSize: 16,
    fontWeight: "600",
  },
  username: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.darkGray,
  },
  aboutView: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  IDView: {
    flexDirection: "column",
    alignItems: "center",
  },
  aboutText: {
    fontWeight: "bold",
    fontSize: 14,
  },
  IDText: {
    fontWeight: "300",
    color: "#8A8A8A",
    fontSize: 14,
  },
  balanceView: {
    flexDirection: "column",
    alignItems: "center",
  },
  balanceText: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 4,
  },
  basicText: {
    fontWeight: "300",
    color: "#8A8A8A",
    fontSize: 14,
  },
  balanceSecondView: {
    flexDirection: "column",
    alignItems: "center",
  },
  walletText: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 4,
  },
  depozitText: {
    fontWeight: "300",
    color: "#8A8A8A",
    fontSize: 14,
  },
  retingView: {
    flexDirection: "column",
    alignItems: "center",
  },
  retingText: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 4,
  },
  idText: {
    fontWeight: "300",
    color: "#8A8A8A",
    fontSize: 14,
  },
  privateView: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginTop: 10,
  },
  touchopcPrivate: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingsBox: {
    width: 45,
    height: 45,
  },
  billBox: {
    width: 45,
    height: 45,
  },
  courierView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 17,
  },
  coureirImg: {
    width: 45,
    height: 45,
  },
  useImg: {
    width: 45,
    height: 45,
  },
  infoView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 17,
  },
  infoImg: {
    width: 45,
    height: 45,
  },
  supportImg: {
    width: 45,
    height: 45,
  },
  noInternet: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 17,
    marginBottom: 100,
  },
  biznesImgBox: {
    width: 45,
    height: 45,
  },
  historyImgBox: {
    width: 52.14,
    height: 45,
  },
});
