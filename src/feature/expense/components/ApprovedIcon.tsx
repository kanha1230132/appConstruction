import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { images } from "../../../assets";

interface ApprovedIconProps {}

const ApprovedIcon: React.FC<ApprovedIconProps> = () => {
  return (
    <Image
      source={images.APPROVED}
      style={{ width: 33, height: 33, marginRight: 15 }}
    />
  );
};

export default ApprovedIcon;

const styles = StyleSheet.create({});
