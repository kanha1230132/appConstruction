import { StyleSheet } from "react-native";
import { AppColor } from "../../../../themes/AppColor";
import { AppFonts } from "../../../../themes/AppFonts";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColor.WHITE,
    paddingHorizontal: 15,
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
    color: '#486ECD',
    marginTop: 10,
  },
  greeting: {
    fontSize: 22,
    fontFamily: AppFonts.Bold,
    color: '#000',
    marginBottom: 5,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
  },
  forgotPasswordText: {
    color: '#486ECD',
    fontSize: 16,
    fontFamily: AppFonts.Bold,
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 20,
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
    width: '43%',
  },
  orText: {
    color: AppColor.BLACK,
    fontFamily: AppFonts.Medium,
    fontSize: 16,
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
  footerContainer: {
    width:'100%',
    position: 'absolute',
    bottom: 20,
    alignItems: 'center',
    marginHorizontal:'auto'
  },
  footerText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#707070',
    fontFamily: AppFonts.Medium,
  },
  companyLink: {
    textAlign: 'center',
    fontSize: 14,
    color: '#486ECD',
    textDecorationLine: 'underline',
    fontFamily: AppFonts.Medium,
  },
});

export default styles