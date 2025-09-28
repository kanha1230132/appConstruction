import React, {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {allStackScreens} from './ScreenCollections';
import { RootStackParamList } from '../types/navigation';
import { screenNames } from './ScreenNames';
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
import { ForgotPasswordScreen, LoginScreen, RegisterScreen } from '../feature/auth';
import SplashScreen from '../feature/splash/SplashScreen';
import ReportPdfScreen from '../feature/reports/screens/pdfScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const RootNavigator: FC = () => (
  // <Stack.Navigator
  //   initialRouteName="SplashScreen"
  //   screenOptions={{ headerShown: false }}
  // >
  //   {allStackScreens.map(({ name, component }, index) => (
  //     <Stack.Screen key={index} name={name as keyof RootStackParamList} component={component} />
  //   ))}
  // </Stack.Navigator>
    <Stack.Navigator
      initialRouteName={screenNames.SplashScreen}
      screenOptions={{ headerShown: false }}
    >
      {/* Auth stack */}
      <Stack.Screen name={screenNames.LoginScreen} component={LoginScreen} />
      <Stack.Screen name={screenNames.RegisterScreen} component={RegisterScreen} />
      <Stack.Screen name={screenNames.SplashScreen} component={SplashScreen} />
      <Stack.Screen name={screenNames.ForgotPasswordScreen} component={ForgotPasswordScreen} />
      <Stack.Screen name={screenNames.VerifyOTPScreen} component={VerifyOtpScreen} />

      {/* Main App goes here (Drawer with Tabs inside) */}
      <Stack.Screen name={screenNames.MainApp} component={DrawerNavigator} />

      {/* All other screens that are detail-level (pushed on top of Drawer) */}
      <Stack.Screen name={screenNames.WebViewScreen} component={WebViewScreen} />
      <Stack.Screen name={screenNames.AddUserScreen} component={AddUserScreen} />
      <Stack.Screen name={screenNames.LogoScreen} component={LogoScreen} />
      <Stack.Screen name={screenNames.LogoUploadScreen} component={LogoUploadScreen} />
      <Stack.Screen name={screenNames.CreateScheduleScreen} component={CreateScheduleScreen} />
      <Stack.Screen name={screenNames.ScheduleScreen} component={ScheduleScreen} />
      <Stack.Screen name={screenNames.ResetPasswordScreen} component={ResetPasswordScreen} />
      <Stack.Screen name={screenNames.ScheduleListScreen} component={ScheduleListScreen} />
      <Stack.Screen name={screenNames.PhotoFilesScreen} component={PhotoFilesScreen} />
      <Stack.Screen name={screenNames.DailyEntryScreen} component={DailyEntryScreen} />
      <Stack.Screen name={screenNames.DailyDairyEntryScreen} component={DailyDairyEntryScreen} />
      <Stack.Screen name={screenNames.WeeklyEntryScreen} component={WeeklyEntryScreen} />
      <Stack.Screen name={screenNames.JobHazardScreen} component={JobHazardScreen} />
      <Stack.Screen name={screenNames.CreateJobHazard} component={CreateJobHazard} />
      <Stack.Screen name={screenNames.ImageViewer} component={ImageViewer} />
      <Stack.Screen name={screenNames.ViewAllPhotos} component={ViewAllPhotos} />
      <Stack.Screen name={screenNames.PreviewJobHazard} component={PreviewJobHazard} />
      <Stack.Screen name={screenNames.CreateMileageScreen} component={CreateMileageScreen} />
      <Stack.Screen name={screenNames.CreateExpenseScreen} component={CreateExpenseScreen} />
      <Stack.Screen name={screenNames.PreviewExpenseScreen} component={PreviewExpenseScreen} />
      <Stack.Screen name={screenNames.ExpenseDetailScreen} component={ExpenseDetailScreen} />
      <Stack.Screen name={screenNames.DailyPreviewScreen} component={DailyPreviewScreen} />
      <Stack.Screen name={screenNames.DailyDairyPreviewScreen} component={DailyDairyPreviewScreen} />
      <Stack.Screen name={screenNames.WeeklyPreviewScreen} component={WeeklyPreviewScreen} />
      <Stack.Screen name={screenNames.NotificationScreen} component={NotificationScreen} />
      <Stack.Screen name={screenNames.ImageSelectionScreen} component={ImageSelectionScreen} />
      <Stack.Screen name={screenNames.WeeklyDetailScreen} component={WeeklyDetailScreen} />
      <Stack.Screen name={screenNames.CreateInvoiceScreen} component={CreateInvoiceScreen} />
      <Stack.Screen name={screenNames.InvoicePreviewScreen} component={InvoicePreviewScreen} />
      <Stack.Screen name={screenNames.WorkFromEntryScreen} component={WorkFromEntryScreen} />
      <Stack.Screen name={screenNames.ReportPdfScreen} component={ReportPdfScreen} />
    </Stack.Navigator>
);

export default RootNavigator;
