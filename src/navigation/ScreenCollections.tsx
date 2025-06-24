import React, { Component } from "react";
import { ForgotPasswordScreen, LoginScreen, RegisterScreen } from "../feature/auth";
import SplashScreen from "../feature/splash/SplashScreen";
import { screenNames } from "./ScreenNames";
import HomeScreen from "../feature/home/HomeScreen";
import DrawerNavigator from "./DrawerNavigator";
import BottomTabNavigator from "./BottomTabNavigator";

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