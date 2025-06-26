import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { AppColor } from "../../themes/AppColor";

interface ScrollViewWrapperProps {
  children: React.ReactNode;
}

const ScrollViewWrapper: React.FC<ScrollViewWrapperProps> = ({
  children,
}: ScrollViewWrapperProps) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      automaticallyAdjustKeyboardInsets
      automaticallyAdjustsScrollIndicatorInsets
      contentContainerStyle={{ flexGrow: 1 }}
      style={{
        flex: 1,
        backgroundColor: AppColor.WHITE,
      }}
    >
      {children}
    </ScrollView>
  );
};

export default ScrollViewWrapper;

const styles = StyleSheet.create({});
