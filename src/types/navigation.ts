import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CompanyLogoResponse, SchedulesResponse } from "../api/apiInterface";
import { ImageItem } from "../feature/photoFiles/PhotoFilesScreen";

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
>;

export type ViewAllPhotosProps = NativeStackScreenProps<RootStackParamList,'ViewAllPhotos'>
export type PreviewJobHazardProps = NativeStackScreenProps<RootStackParamList,'PreviewJobHazard'>