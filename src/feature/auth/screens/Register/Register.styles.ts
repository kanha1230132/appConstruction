import { StyleSheet } from "react-native";
import { AppFonts } from "../../../../themes/AppFonts";
import { AppColor } from "../../../../themes/AppColor";

export const styles = StyleSheet.create({
  heading: {
    fontSize: 30,
    fontFamily: AppFonts.Bold,
    textAlign: "center",
    color: AppColor.BLACK, // Darker color for contrast
    marginBottom: 40, // Increased margin to separate from form fields
  },
  buttonContainer: {
    marginTop: 50,
  },
   orContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: AppColor.DISABLED,
    width: '40%',
  },
  orText: {
    color: AppColor.BLACK,
    fontFamily: AppFonts.Medium,
    fontSize: 16,
    marginHorizontal:10
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signupText: {
    color: AppColor.BLACK,
    fontFamily: AppFonts.Medium,
    fontSize: 16,
  },
  signupLink: {
    color: AppColor.PRIMARY,
    fontFamily: AppFonts.Medium,
    fontSize: 16,
    marginLeft: 5,
  },
});