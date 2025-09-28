import { Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppColor } from '../../themes/AppColor'

interface BottomButtonWrapperProps {
  children: React.ReactNode;
}

const BottomButtonWrapper = ({ children }: BottomButtonWrapperProps) => (
  <View style={styles.button}>{children}</View>
);


export default BottomButtonWrapper

const styles = StyleSheet.create({
    button: {
        width: "100%",
        alignSelf: "center",
        position: "absolute",
        bottom: 0,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
         paddingHorizontal: Platform.OS === "ios" ? "4%" : "2%",
        backgroundColor: AppColor.WHITE,
        paddingBottom: Platform.OS === "ios" ? 35 : 15,
      },
})