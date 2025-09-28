import React, { Component } from "react";
import {
  ForgotPasswordScreen,
  LoginScreen,
  RegisterScreen,
} from "../feature/auth";
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
import ScheduleScreen from "../feature/schedule/ScheduleScreen";
import ResetPasswordScreen from "../feature/auth/screens/ResetPassword/ResetPasswordScreen";
import CreateScheduleScreen from "../feature/schedule/screens/createSchedule/CreateScheduleScreen";
import ScheduleListScreen from "../feature/schedule/screens/scheduleList/ScheduleListScreen";
import PhotoFilesScreen from "../feature/photoFiles/PhotoFilesScreen";
import DailyEntryScreen from "../feature/reports/screens/dailyEntry/DailyEntryScreen";
import DailyDairyEntryScreen from "../feature/reports/screens/dailyDairyEntry/DailyDairyEntryScreen";
import WeeklyEntryScreen from "../feature/reports/screens/weeklyEntry/WeeklyEntryScreen";
import JobHazardScreen from "../feature/jobHazard/JobHazardScreen";
import CreateJobHazard from "../feature/jobHazard/screens/createJobHazard/CreateJobHazard";
import ImageViewer from "../feature/imageViewer/ImageViewer";
import ViewAllPhotos from "../feature/photoFiles/screens/ViewAllPhotos";
import PreviewJobHazard from "../feature/jobHazard/screens/PreviewJobHazard/PreviewJobHazard";
import CreateMileageScreen from "../feature/mileage/screens/createMileage/CreateMileageScreen";
import CreateExpenseScreen from "../feature/expense/screen/CreateExpense/CreateExpense";
import PreviewExpenseScreen from "../feature/expense/screen/PreviewExpense/PreviewExpense";
import ExpenseDetailScreen from "../feature/expense/screen/ExpenseDetail/ExpenseDetailScreen";
import DailyPreviewScreen from "../feature/reports/screens/PreviewScreen/DailyPreview";
import DailyDairyPreviewScreen from "../feature/reports/screens/PreviewScreen/DailyDairyPreview";
import WeeklyPreviewScreen from "../feature/reports/screens/PreviewScreen/WeeklyPreview";
import NotificationScreen from "../feature/notification/NotificationScreen";
import ExpenseScreen from "../feature/expense/ExpenseScreen";
import ImageSelectionScreen from "../feature/reports/screens/ImageSelectionScreen/ImageSelectionScreen";
import WeeklyDetailScreen from "../feature/reports/screens/weeklyEntry/WeeklyDetailScreen";
import CreateInvoiceScreen from "../feature/invoice/screens/createInvoice/CreateInvoice";
import InvoicePreviewScreen from "../feature/invoice/screens/previewScreen/InvoicePreview";
import WorkFromEntryScreen from "../feature/invoice/screens/workFromEntryScreen";
import ReportPdfScreen from "../feature/reports/screens/pdfScreen";

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
  // {
  //   name: screenNames.HomeScreen,
  //   component: HomeScreen,
  // },
  {
    name: screenNames.HomeTabs,
    component: BottomTabNavigator,
  },
  {
    name: screenNames.VerifyOTPScreen,
    component: VerifyOtpScreen,
  },
  {
    name: screenNames.WebViewScreen,
    component: WebViewScreen,
  },
  {
    name: screenNames.AddUserScreen,
    component: AddUserScreen,
  },
  {
    name: screenNames.LogoScreen,
    component: LogoScreen,
  },
  {
    name: screenNames.LogoUploadScreen,
    component: LogoUploadScreen,
  },
  {
    name: screenNames.CreateScheduleScreen,
    component: CreateScheduleScreen,
  },

  {
    name: screenNames.ScheduleScreen,
    component: ScheduleScreen,
  },
  ,
  {
    name: screenNames.ResetPasswordScreen,
    component: ResetPasswordScreen,
  },
  {
    name: screenNames.ScheduleListScreen,
    component: ScheduleListScreen,
  },
  {
    name: screenNames.PhotoFilesScreen,
    component: PhotoFilesScreen,
  },
  {
    name: screenNames.DailyEntryScreen,
    component: DailyEntryScreen,
  },
  {
    name: screenNames.DailyDairyEntryScreen,
    component: DailyDairyEntryScreen,
  },
  {
    name: screenNames.WeeklyEntryScreen,
    component: WeeklyEntryScreen,
  },
  {
    name: screenNames.JobHazardScreen,
    component: JobHazardScreen,
  },
  {
    name: screenNames.CreateJobHazard,
    component: CreateJobHazard,
  },
  {
    name: screenNames.ImageViewer,
    component: ImageViewer,
  },{
    name: screenNames.ViewAllPhotos,
    component: ViewAllPhotos,
  },
  {
    name: screenNames.PreviewJobHazard,
    component: PreviewJobHazard,
  },
  {
    name: screenNames.CreateMileageScreen,
    component: CreateMileageScreen,
  },
  {
    name: screenNames.CreateExpenseScreen,
    component: CreateExpenseScreen,
  },
  {
    name: screenNames.PreviewExpenseScreen,
    component: PreviewExpenseScreen,
  },
  {
    name: screenNames.ExpenseDetailScreen,
    component: ExpenseDetailScreen,
  },
  {
    name: screenNames.DailyPreviewScreen,
    component: DailyPreviewScreen,
  },
  {
    name: screenNames.DailyDairyPreviewScreen,
    component: DailyDairyPreviewScreen,
  },
  {
    name: screenNames.WeeklyPreviewScreen,
    component: WeeklyPreviewScreen,
  },
  {
    name: screenNames.NotificationScreen,
    component: NotificationScreen,
  },
  {
    name: screenNames.ImageSelectionScreen,
    component: ImageSelectionScreen,
  },
  {
    name: screenNames.WeeklyDetailScreen,
    component: WeeklyDetailScreen,
  },
  {
    name: screenNames.CreateInvoiceScreen,
    component: CreateInvoiceScreen,
  },
  {
    name: screenNames.InvoicePreviewScreen,
    component: InvoicePreviewScreen,
  },
  {
    name: screenNames.WorkFromEntryScreen,
    component: WorkFromEntryScreen,
  },
  {
    name: screenNames.ReportPdfScreen,
    component: ReportPdfScreen,
  }


];

export const dashboardStack = [
  //   {
  //     name: 'BottomTab',
  //     component: BottomTab,
  //   }
];

export const allStackScreens = [...authStack];
