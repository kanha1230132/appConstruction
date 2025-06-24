import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaWrapper } from "../../components/SafeAreaWrapper/SafeAreaWrapper";
import Icon from "react-native-vector-icons/MaterialIcons";
import { AppColor } from "../../themes/AppColor";
import { HomeScreenProps } from "../../types/navigation";
import { DrawerActions } from "@react-navigation/native";

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <>
      <SafeAreaWrapper>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.dispatch(DrawerActions.toggleDrawer());
            }}
          >
            <Icon name="dehaze" size={24} color={AppColor.PRIMARY} />
          </TouchableOpacity>
        </View>
      </SafeAreaWrapper>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
