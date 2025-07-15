import { StyleSheet } from "react-native";
import { AppColor } from "../../../../themes/AppColor";
import { AppFonts } from "../../../../themes/AppFonts";
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: AppColor.WHITE,
//     paddingHorizontal: 15,
//   },
//   logoContainer: {
//     alignItems: 'center',
//     marginVertical: 30,
//   },
//   logo: {
//     width: 100,
//     height: 100,
//   },
//   companyName: {
//     fontSize: 20,
//     fontFamily: AppFonts.Bold,
//     color: '#486ECD',
//     marginTop: 10,
//   },
//   greeting: {
//     fontSize: 22,
//     fontFamily: AppFonts.Bold,
//     color: '#000',
//     marginBottom: 5,
//   },
//   forgotPassword: {
//     alignSelf: 'flex-end',
//   },
//   forgotPasswordText: {
//     color: AppColor.PRIMARY,
//     fontSize: 16,
//     fontFamily: AppFonts.Bold,
//     marginTop: 10,
//   },
//   buttonContainer: {
//     marginTop: 20,
//   },
//   orContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop: 20,
//     alignItems: 'center',
//   },
//   divider: {
//     height: 1,
//     backgroundColor: AppColor.DISABLED,
//     width: '40%',
//   },
//   orText: {
//     color: AppColor.BLACK,
//     fontFamily: AppFonts.Medium,
//     fontSize: 16,
//     marginHorizontal:10
//   },
//   signupContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop: 20,
//   },
//   signupText: {
//     color: AppColor.BLACK,
//     fontFamily: AppFonts.Medium,
//     fontSize: 16,
//   },
//   signupLink: {
//     color: AppColor.PRIMARY,
//     fontFamily: AppFonts.Medium,
//     fontSize: 16,
//     marginLeft: 5,
//   },
//   footerContainer: {
//     width:'100%',
//     position: 'absolute',
//     bottom: 20,
//     alignItems: 'center',
//     marginHorizontal:'auto'
//   },
//   footerText: {
//     textAlign: 'center',
//     fontSize: 14,
//     color: '#707070',
//     fontFamily: AppFonts.Medium,
//   },
//   companyLink: {
//     textAlign: 'center',
//     fontSize: 14,
//     color: '#486ECD',
//     textDecorationLine: 'underline',
//     fontFamily: AppFonts.Medium,
//   },
// });


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColor.WHITE,
    paddingHorizontal: moderateScale(15),
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: verticalScale(30),
  },
  logo: {
    width: moderateScale(80),
    height: moderateScale(80),
  },
  companyName: {
    fontSize: moderateScale(20),
    fontFamily: AppFonts.Bold,
    color: AppColor.PRIMARY,
    marginTop: verticalScale(10),
  },
  greeting: {
    fontSize: moderateScale(18),
    fontFamily: AppFonts.Bold,
    color: AppColor.BLACK,
    marginBottom: verticalScale(5),
  },
  forgotPassword: {
    alignSelf: 'flex-end',
  },
  forgotPasswordText: {
    color: AppColor.PRIMARY,
    fontSize: moderateScale(16),
    fontFamily: AppFonts.Bold,
    marginTop: verticalScale(10),
  },
  buttonContainer: {
    marginTop: verticalScale(20),
  },
  orContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: verticalScale(20),
    alignItems: 'center',
  },
  divider: {
    height: verticalScale(1),
    backgroundColor: AppColor.DISABLED,
    width: '40%', // Percentage-based values don't need scaling
  },
  orText: {
    color: AppColor.BLACK,
    fontFamily: AppFonts.Medium,
    fontSize: moderateScale(16),
    marginHorizontal: moderateScale(10)
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: verticalScale(20),
  },
  signupText: {
    color: AppColor.BLACK,
    fontFamily: AppFonts.Medium,
    fontSize: moderateScale(16),
  },
  signupLink: {
    color: AppColor.PRIMARY,
    fontFamily: AppFonts.Medium,
    fontSize: moderateScale(16),
    marginLeft: moderateScale(5),
  },
  footerContainer: {
    width: '100%',
    position: 'absolute',
    bottom: verticalScale(20),
    alignItems: 'center',
    marginHorizontal: 'auto'
  },
  footerText: {
    textAlign: 'center',
    fontSize: moderateScale(14),
    color: '#707070',
    fontFamily: AppFonts.Medium,
  },
  companyLink: {
    textAlign: 'center',
    fontSize: moderateScale(14),
    color: AppColor.PRIMARY,
    textDecorationLine: 'underline',
    fontFamily: AppFonts.Medium,
  },
});

export default styles