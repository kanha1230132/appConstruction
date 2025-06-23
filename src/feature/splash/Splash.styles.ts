import { StyleSheet } from "react-native";
import { AppColor } from "../../themes/AppColor";
import { AppFonts } from "../../themes/AppFonts";


export const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255,255, 255, 0.75)', // Light blue overlay with 89% transparent/opacity
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent:'center'
  },
  textContainer: {
    marginLeft: 15,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  companyText: {
    fontSize: 30,
    color: AppColor.PRIMARY,
    fontFamily:AppFonts.Bold,
  },
});