import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

const ImagePicker = () => {
    return (
        <View>
            <ImageSelector />
        </View>
    );
};

export default ImagePicker;

const styles = StyleSheet.create({});
