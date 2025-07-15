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
       keyboardShouldPersistTaps="handled"

      contentContainerStyle={{         
        flexGrow: 1,
        paddingBottom: 70,


       }}
      style={{
        flexGrow: 1,
        backgroundColor: AppColor.WHITE,

      }}
      
    >
      {children}
    </ScrollView>
  );
};

export default ScrollViewWrapper;

const styles = StyleSheet.create({});
