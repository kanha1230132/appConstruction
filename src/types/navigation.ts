import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  SplashScreen: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  ForgotPasswordScreen: undefined;
  HomeScreen: undefined;
  WebViewScreen: {
    url: string,
    title: string
  };
  AddUserScreen: undefined;
  LogoScreen:undefined;
  LogoUploadScreen:undefined
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