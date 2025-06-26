import { StyleSheet } from "react-native";
import { AppFonts } from "../../../../themes/AppFonts";
import { AppColor } from "../../../../themes/AppColor";

export const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontFamily: AppFonts.Bold,
    textAlign: 'left',
    color: AppColor.BLACK, // Darker color for contrast
    marginBottom: 20, // Increased margin to separate from form fields
  },
  buttonContainer: {
    marginTop: 30,
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
    logoContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  logo: {
    width: 100,
    height: 100,
  },
  companyName: {
    fontSize: 20,
    fontFamily: AppFonts.Bold,
    color: AppColor.PRIMARY,
    marginTop: 10,
  },
   checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
});