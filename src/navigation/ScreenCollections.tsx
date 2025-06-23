import React from "react";
import { ForgotPasswordScreen, LoginScreen, RegisterScreen } from "../feature/auth";
import SplashScreen from "../feature/splash/SplashScreen";
import { screenNames } from "./ScreenNames";
import HomeScreen from "../feature/home/HomeScreen";

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
    name: screenNames.HomeScreen,
    component: HomeScreen,
  
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