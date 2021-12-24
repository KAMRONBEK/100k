import React from "react";
import { StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

const About = () => {
  return <WebView source={{ uri: "https://dev.100k.uz/" }} />;
};

export default About;
const styles = StyleSheet.create({});
