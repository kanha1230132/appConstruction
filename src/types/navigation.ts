import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CompanyLogoResponse, ExpenseListResponse, ExpenseReportResponse, SchedulesResponse } from "../api/apiInterface";
import { ImageItem } from "../feature/photoFiles/PhotoFilesScreen";
import { IWorkFromEntry } from "../store/slice/Reports";

export type RootStackParamList = {
  SplashScreen: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  ForgotPasswordScreen: undefined;
  HomeScreen: undefined;
  WebViewScreen: {
    url: string,
    title: string,
    IsPdfViewer?: boolean
  };
  AddUserScreen: undefined;
  LogoScreen:undefined;
  LogoUploadScreen:{logo?: CompanyLogoResponse};
  ScheduleScreen:undefined;
  CreateScheduleScreen:{schedule?:SchedulesResponse,scheduleUpdate?:boolean};
  VerifyOTPScreen:{email:string};
  ResetPasswordScreen:{email:string,title:string};
  ScheduleListScreen :{type:string};
  PhotoFilesScreen: {project:SchedulesResponse};
  DailyEntryScreen:{project:SchedulesResponse};
  WeeklyEntryScreen:{project:SchedulesResponse};
  DailyDairyEntryScreen:{project:SchedulesResponse};
  JobHazardScreen:undefined;
  ImageViewer:{image:string}
  ViewAllPhotos:{Photos?:ImageItem[]}
  PreviewJobHazard:undefined
  CreateMileageScreen:{selectedDate:Date };
  CreateExpenseScreen:undefined;
  PreviewExpenseScreen: undefined;
ExpenseDetailScreen   : {item: ExpenseListResponse};
  DailyPreviewScreen: {isSubmit?:boolean};
  DailyDairyPreviewScreen: {isSubmit?:boolean};
  WeeklyPreviewScreen: {isSubmit?:boolean};
  NotificationScreen  : undefined;
  ImageSelectionScreen: {project:SchedulesResponse,FromScreen?:string};
  WeeklyDetailScreen: {type:string,list:any};
  CreateInvoiceScreen:{project:SchedulesResponse};
  InvoicePreviewScreen:undefined;
  WorkFromEntryScreen:{workFromEntry:IWorkFromEntry[]};
  ReportPdfScreen:{reportType:string,schedule:SchedulesResponse};
};




export type LoginScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'LoginScreen'
>;

export type RegisterScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'RegisterScreen'
>;

export type ForgotPasswordScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'ForgotPasswordScreen'
>;

export type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'HomeScreen'
>;
export type WebViewScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'WebViewScreen'
>;


export type AddUserScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'AddUserScreen'
>;

export type LogoScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'LogoScreen'
>;

export type LogoUploadScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'LogoUploadScreen'
>;

export type ScheduleScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'ScheduleScreen'
>;

export type CreateScheduleScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'CreateScheduleScreen'
>;

export type VerifyOTPScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'VerifyOTPScreen'
>;

export type ResetPasswordScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'ResetPasswordScreen'
>;

export type ScheduleListScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'ScheduleListScreen'
>;
export type PhotoFilesScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'PhotoFilesScreen'
>;

export type DailyEntryScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'DailyEntryScreen'
>;
export type WeeklyEntryScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'WeeklyEntryScreen'
>;
export type DailyDairyEntryScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'DailyDairyEntryScreen'
>;

export type JobHazardScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'JobHazardScreen'
>;

export type ImageViewerProps = NativeStackScreenProps<
  RootStackParamList,
  'ImageViewer'
>
export type ViewAllPhotosProps = NativeStackScreenProps<RootStackParamList,'ViewAllPhotos'>
export type PreviewJobHazardProps = NativeStackScreenProps<RootStackParamList,'PreviewJobHazard'>
export type CreateMileageScreenProps = NativeStackScreenProps<RootStackParamList,'CreateMileageScreen'>
export type CreateExpenseScreenProps = NativeStackScreenProps<RootStackParamList,'CreateExpenseScreen'>
export type PreviewExpenseScreenProps = NativeStackScreenProps<RootStackParamList,'PreviewExpenseScreen'>
export type ExpenseDetailScreenProps = NativeStackScreenProps<RootStackParamList,'ExpenseDetailScreen'>
export type DailyPreviewScreenProps = NativeStackScreenProps<RootStackParamList,'DailyPreviewScreen'>
export type DailyDairyPreviewScreenProps = NativeStackScreenProps<RootStackParamList,'DailyDairyPreviewScreen'>
export type WeeklyPreviewScreenProps = NativeStackScreenProps<RootStackParamList,'WeeklyPreviewScreen'>
export type NotificationScreenProps = NativeStackScreenProps<RootStackParamList,'NotificationScreen'>
export type ImageSelectionScreenProps = NativeStackScreenProps<RootStackParamList,'ImageSelectionScreen'>
export type WeeklyDetailScreenProps = NativeStackScreenProps<RootStackParamList,'WeeklyDetailScreen'>
export type CreateInvoiceScreenProps = NativeStackScreenProps<RootStackParamList,'CreateInvoiceScreen'>
export type InvoicePreviewScreenProps = NativeStackScreenProps<RootStackParamList,'InvoicePreviewScreen'>
export type WorkFromEntryScreenProps = NativeStackScreenProps<RootStackParamList,'WorkFromEntryScreen'>
export type ReportPdfScreenProps = NativeStackScreenProps<RootStackParamList,'ReportPdfScreen'>
