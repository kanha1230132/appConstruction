import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { images } from "../../../assets";

interface RejectedIconProps {}

const RejectedIcon: React.FC<RejectedIconProps> = () => {
  return (
    <Image
      source={images.REJECTED}
      style={{ width: 33, height: 33, marginRight: 15 }}
    />
  );
};

export default RejectedIcon;

const styles = StyleSheet.create({});
