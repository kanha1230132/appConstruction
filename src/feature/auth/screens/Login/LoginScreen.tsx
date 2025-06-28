import { Image, Keyboard, Text, TouchableOpacity, View } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaWrapper } from "../../../../components/SafeAreaWrapper/SafeAreaWrapper";
import { images } from "../../../../assets";
import { AppText } from "../../../../constants/appText";
import LoaderButton from "../../../../components/Button/LoaderButton";
import styles from "./Login.styles";
import { LoginScreenProps } from "../../../../types/navigation";
import CustomTextInput from "../../../../components/CustomTextInput/CustomTextInput";
import IconTextInput from "../../../../components/CustomTextInput/CustomIconTextInput";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { navigate, resetAndNavigate } from "../../../../utils/NavigationUtil";
import { screenNames } from "../../../../navigation/ScreenNames";
import PoweredText from "../../components/PoweredText";
import { startSpeechToText } from "react-native-voice-to-text";
import useToastHook from "../../../../hooks/toast";
import RestClient from "../../../../api/restClient";
import { updateUserDetails } from "../../../../store/slice/UserSlice";
import { delay } from "../../../../utils/delay";
import { useIsFocused } from "@react-navigation/native";

const LoginScreen: React.FC<LoginScreenProps> = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [IsLoading, setIsLoading] = useState(false);
  const [IsSecure, setIsSecure] = useState(false);
  const { showToast } = useToastHook();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const { UserEmail } = useSelector((state: RootState) => state.User);

  useEffect(()=>{
    if(isFocused){
      if(UserEmail){
        setEmail(UserEmail);
      }
    }
  },[isFocused])

  const callToLogin = async () => {
    try {
      if(!Email || !Password){
        showToast("Please enter email and password", 'warning');
        return;
      }
      setIsLoading(true);
      const restClient = new RestClient();
      const response = await restClient.login(Email, Password);
      if (response && typeof response != "string") {
        dispatch(updateUserDetails({ ...response, email: Email }));
        showToast(response.message || "Login Successfully", "success");
      setIsLoading(false);
        await delay(1000);
        resetAndNavigate(screenNames.MainApp);
      } else {
        showToast(response || "Something went wrong", "danger");
      }
      setIsLoading(false);
    } catch (error) {
      showToast("Something went wrong", "danger");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SafeAreaWrapper>
        <View style={styles.logoContainer}>
          <Image source={images.logo} style={styles.logo} />
          <Text style={styles.companyName}>{AppText.appName}</Text>
        </View>

        <Text style={styles.greeting}>Hey,</Text>
        <Text style={styles.greeting}>Login Now!</Text>
        <View style={{ marginTop: 20 }}>
          <CustomTextInput
            onChangeTextValue={(text) => {
              setEmail(text);
            }}
            textValue={Email}
            label={"E-mail ID"}
          />
          <IconTextInput
            value={Password}
            label={"Password"}
            onChangeText={(text) => {
              setPassword(text);
            }}
            editable={true}
            isSecure={IsSecure}
            rightIconName={IsSecure ? "eye-off" : "eye"}
            onClickIcon={() => {
              setIsSecure(!IsSecure);
            }}
          />
        </View>

        <TouchableOpacity
          style={styles.forgotPassword}
          onPress={() => {
            navigate(screenNames.ForgotPasswordScreen);
            // showToast('Under Development', 'success');
          }}
        >
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        <View style={styles.buttonContainer}>
          <LoaderButton
            title="Login"
            onPress={async () => {
              Keyboard.dismiss();
              callToLogin();
              // navigate(screenNames.MainApp);
            }}
            loading={IsLoading}
          />
        </View>

        <View style={styles.orContainer}>
          <View style={styles.divider} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.divider} />
        </View>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account?</Text>
          <TouchableOpacity
            onPress={() => navigate(screenNames.RegisterScreen)}
          >
            <Text style={styles.signupLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaWrapper>
      <PoweredText />
    </>
  );
};

export default LoginScreen;
