// navigators/BottomTabNavigator.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../feature/home/HomeScreen";
import { screenNames } from "./ScreenNames";
import ReportScreen from "../feature/reports/ReportScreen";
import MileageScreen from "../feature/mileage/MileageScreen";
import InvoiceScreen from "../feature/invoice/InvoiceScreen";
import ExpenseScreen from "../feature/expense/ExpenseScreen";
import Icon from "react-native-vector-icons/MaterialIcons";
import { AppColor } from "../themes/AppColor";
import { Platform } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const Tab = createBottomTabNavigator();

export interface BottomTabNavigatorProps {}

const  BottomTabNavigator: React.FC<BottomTabNavigatorProps> = (props)=> {
  const {IsBoss} = useSelector((state: RootState) => state.User);
  return (
    <Tab.Navigator screenOptions={{ headerShown: false,tabBarStyle:Platform.OS == "android" ? { height:60}:{}}}>
      <Tab.Screen
        name={screenNames.HomeScreen}
        component={HomeScreen}
        options={{
          tabBarActiveTintColor: AppColor.PRIMARY,
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <Icon
              name="home"
              size={size}
              color={focused ? AppColor.PRIMARY : color}
            />
          ),
        }}
      />
      <Tab.Screen
        name={screenNames.MileageScreen}
        component={MileageScreen}
        options={{
          tabBarLabel: "Mileage",
          tabBarActiveTintColor: AppColor.PRIMARY,

          tabBarIcon: ({ color, size, focused }) => (
            <Icon
              name="directions-car"
              size={size}
              color={focused ? AppColor.PRIMARY : color}
            />
          ),
        }}
      />
      <Tab.Screen
        name={screenNames.ExpenseScreen}
        component={ExpenseScreen}
        options={{
          tabBarLabel: "Expenses",
          tabBarActiveTintColor: AppColor.PRIMARY,

          tabBarIcon: ({ color, size, focused }) => (
            <Icon
              name="attach-money"
              size={size}
              color={focused ? AppColor.PRIMARY : color}
            />
          ),
        }}
      />
      <Tab.Screen
        name={screenNames.ReportScreen}
        component={ReportScreen}
        options={{
          tabBarLabel: "Reports",
          tabBarActiveTintColor: AppColor.PRIMARY,

          tabBarIcon: ({ color, size, focused }) => (
            <Icon
              name="insert-chart"
              size={size}
              color={focused ? AppColor.PRIMARY : color}
            />
          ),
        }}
      />
      {
        IsBoss ?

<Tab.Screen
        name={screenNames.InvoiceScreen}
        component={InvoiceScreen}
        options={{
          tabBarLabel: "Invoicing",
          tabBarActiveTintColor: AppColor.PRIMARY,

          tabBarIcon: ({ color, size, focused }) => (
            <Icon
              name="description"
              size={size}
              color={focused ? AppColor.PRIMARY : color}
            />
          ),
        }}
      />
        : null
      }
      
    </Tab.Navigator>
  );
}

export default BottomTabNavigator
