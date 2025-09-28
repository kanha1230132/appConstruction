import { Platform, StyleSheet } from "react-native";
import { AppColor } from "./AppColor";
import { moderateScale } from "react-native-size-matters";
import { AppFonts } from "./AppFonts";

export const AppStyles = StyleSheet.create({
   buttonContainer: {
       width: "100%",
       alignSelf: "center",
       position: "absolute",
       bottom: 0,
       borderRadius: 8,
       justifyContent: "center",
       flexDirection: "row",
   
       paddingHorizontal: Platform.OS === "ios" ? "4%" : "2%",
       backgroundColor: AppColor.WHITE,
       paddingBottom: Platform.OS === "ios" ? 35 : 15,
   
       paddingTop: 5,
     },
     imageContainer: {
    width: "100%",
    position: "relative",
    marginRight: 10,
    borderRadius: 6,
    height: 120,
  },
  photo: {
    width: "100%",
    height: 100,
  },
   section: {
      padding: 10,
      backgroundColor: AppColor.WHITE,
      borderRadius: 8,
      marginHorizontal: 1,
      marginBottom: 10,
    },
    sectionTitle: {
      fontSize: moderateScale(18),
      fontFamily: AppFonts.Bold,
      marginBottom: 5,
      color: AppColor.PRIMARY,
    },
});