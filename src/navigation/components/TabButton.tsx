import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Button, Drawer } from "react-native-paper";
import { AppColor } from "../../themes/AppColor";
import { AppFonts } from "../../themes/AppFonts";
import Ionicons from "react-native-vector-icons/MaterialIcons";

interface TabButtonProps {
  label: string;
  onPress: () => void;
  icon: string;
}

const TabButton: React.FC<TabButtonProps> = ({ label, onPress, icon }) => {
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          onPress();
        }}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: 10,
          paddingHorizontal: 10,
          borderRadius: 6,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 15,
          }}
        >
          <Ionicons name={icon} size={24} color={AppColor.PRIMARY} />
          <Text>{label}</Text>
        </View>
        <Ionicons name="chevron-right" size={24} color={AppColor.BLACK} />
      </TouchableOpacity>
    </>
  );
};

export default TabButton;

const styles = StyleSheet.create({});
