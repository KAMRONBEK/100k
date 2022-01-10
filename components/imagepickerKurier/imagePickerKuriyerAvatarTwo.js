import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    View,
    ImageBackground,
} from 'react-native';

import { images } from '../../assets/index';

export function ImagePickerKuriyerAvatarTwo({ uri, onPress }) {
    return (
        <View style={styles.avatar}>
            <Image
                style={styles.avatarImage}
                source={uri ? { uri: uri } : images.cameraImg}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
    },
    avatar: {
        resizeMode: 'contain',
    },
    avatarImage: {
        height: 80,
        width: 80,
        borderColor: '#8a8a8a',
        overflow: 'hidden',
    },
    addButton: {
        height: 30,
        width: 30,
        borderRadius: 50,
        top: 55,
        left: 50,
        position: 'absolute',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    addButtonIcon: {
        height: 35,
        width: 35,
    },
});
