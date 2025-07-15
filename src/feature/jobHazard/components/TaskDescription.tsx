import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AppFonts } from "../../../themes/AppFonts";
import { moderateScale } from "react-native-size-matters";
import { AppColor } from "../../../themes/AppColor";

interface TaskDescriptionProps {
  text: string;
  label: string;
  firstWidth?: string;
  secondWidth?: string;
}

const TaskDescription = ({
  text,
  label,
  firstWidth = "30%",
  secondWidth = "70%",
}: TaskDescriptionProps) => {
  return (
    <View
      key={Math.random().toString()}
      style={[styles.container, { width: "100%" }]}
    >
      <Text style={[styles.label, { width: firstWidth }]}>
        {label}
      </Text>
      <Text style={[styles.text, { width: secondWidth }]}>
        : {"" + text}{" "}
      </Text>
    </View>
  );
};

export default TaskDescription;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  label: {
    fontFamily: AppFonts.Medium,
    fontSize: moderateScale(14) ,
    color:AppColor.BLACK
  },
  text: {
    fontFamily: AppFonts.Regular,
    fontSize: moderateScale(14),
    color:AppColor.BLACK_80

  },
});

