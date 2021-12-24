import React from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

const NoInternet = () => {
  return <WebView source={{ uri: "https://dev.100k.uz/" }} />;
};

export default NoInternet;
const styles = StyleSheet.create({});
