// components/CustomDrawer.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Avatar, Card, Divider, Drawer } from "react-native-paper";
import { AppColor } from "../../themes/AppColor";
import { AppFonts } from "../../themes/AppFonts";
import { images } from "../../assets";
import { Image } from "react-native";
import TabButton from "../components/TabButton";

export interface CustomDrawerProps {
  navigation: any;
}

export default function CustomDrawer(props: CustomDrawerProps) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View style={styles.container}>
        {/* Close Icon */}
        <TouchableOpacity
          style={styles.closeIcon}
          onPress={() => props.navigation.closeDrawer()}
        >
          <Ionicons name="close" size={24} color="#000" />
        </TouchableOpacity>

        <View>
          <Image source={images.USER} style={{ height: 50, width: 50 }} />
        </View>
        <View
          style={{
            gap: 4,
            marginTop: 10,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontFamily: AppFonts.Bold,
              color: AppColor.BLACK,
            }}
          >
            Kanhaiya Lal
          </Text>

          <Text
            style={{
              fontSize: 15,
              fontFamily: AppFonts.Regular,
              color: AppColor.BLACK_70,
            }}
          >
            klv@kps.ca
          </Text>
        </View>

        <View
          style={{
            width: "100%",
            marginTop: 20,
            padding: 0,
            justifyContent: "space-around",
          }}
        >
          <TabButton
            label={"Change Password"}
            onPress={() => {}}
            icon={"password"}
          />
          <Divider
            style={{
              marginVertical: 10,
            }}
          />
          <TabButton
            label={"Terms & Conditions"}
            onPress={() => {}}
            icon={"description"}
          />
          <Divider
            style={{
              marginVertical: 10,
            }}
          />

          <TabButton
            label={"Privacy Policy"}
            onPress={() => {}}
            icon={"privacy-tip"}
          />
          <Divider
            style={{
              marginVertical: 10,
            }}
          />
        </View>
      </View>
      <TabButton label={"Logout"} onPress={() => {}} icon={"logout"} />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 30, alignItems: "center" },
  header: { fontSize: 20, marginBottom: 20, marginTop: 20 },
  link: { marginVertical: 10 },
  text: { fontSize: 16 },
  closeIcon: {
    alignSelf: "flex-start",
    padding: 8,
    marginBottom: 10,
    position: "absolute",
    top: -20,
  },
});
