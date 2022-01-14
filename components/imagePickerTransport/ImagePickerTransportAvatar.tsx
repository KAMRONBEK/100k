import React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    View,
    ImageBackground,
} from "react-native";

import { images } from "../../assets/index";
import { colors } from "../../constants/color";

export function ImagePickerTransportAvatar({ uri, onPress }) {
    console.log(uri);

    return (
        <View style={styles.avatar}>
            <View
                style={{
                    width: 120,
                    height: 70,
                    borderWidth: 1,
                    borderRadius: 1,
                    borderColor: colors.darkGray,
                    borderStyle: "dashed",
                    marginHorizontal: 20,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Image
                    style={{
                        resizeMode: "cover",
                        width: uri ? 80 : 20,
                        height: uri ? 70 : 20,
                    }}
                    source={uri ? { uri: uri } : images.plus}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
    },
    avatar: {
        resizeMode: "contain",
    },
});
