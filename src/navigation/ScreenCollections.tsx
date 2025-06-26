import React, { Component } from "react";
import { ForgotPasswordScreen, LoginScreen, RegisterScreen } from "../feature/auth";
import SplashScreen from "../feature/splash/SplashScreen";
import { screenNames } from "./ScreenNames";
import HomeScreen from "../feature/home/HomeScreen";
import DrawerNavigator from "./DrawerNavigator";
import BottomTabNavigator from "./BottomTabNavigator";
import VerifyOtpScreen from "../feature/auth/screens/VerifyOtp/VerifyOtpScreen";
import WebViewScreen from "../feature/webview/WebViewScreen";
import AddUserScreen from "../feature/addUser/AddUserScreen";
import LogoScreen from "../feature/logo/LogoScreen";
import LogoUploadScreen from "../feature/logo/screens/logoUpload/LogoUploadScreen";

export const authStack = [
  {
    name: screenNames.LoginScreen,
    component: LoginScreen,
  },
  {
    name: screenNames.RegisterScreen,
    component: RegisterScreen,
  },
  {
    name: screenNames.SplashScreen,
    component: SplashScreen,
  },
  {
    name: screenNames.ForgotPasswordScreen,
    component: ForgotPasswordScreen,
  },
  {
    name: screenNames.MainApp,
    component: DrawerNavigator,
  },
  {
    name: screenNames.HomeScreen,
    component: HomeScreen,
  
  },
  {
    name:screenNames.HomeTabs,
    component:BottomTabNavigator
  },
  {
     name:screenNames.VerifyOTPScreen,
    component:VerifyOtpScreen
  },
  {
     name:screenNames.WebViewScreen,
    component:WebViewScreen
  },
  {
     name:screenNames.AddUserScreen,
    component:AddUserScreen
  },
  {
     name:screenNames.LogoScreen,
    component:LogoScreen
  },
  {
    name:screenNames.LogoUploadScreen,
    component:LogoUploadScreen
  }
  

];

export const dashboardStack = [
//   {
//     name: 'BottomTab',
//     component: BottomTab,
//   }
];

export const allStackScreens:{
  name: string;
  component: React.FC<any>;
}[] = [...dashboardStack, ...authStack];