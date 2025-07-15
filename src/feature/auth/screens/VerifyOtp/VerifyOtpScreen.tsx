import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaWrapper } from "../../../../components/SafeAreaWrapper/SafeAreaWrapper";
import HeaderWithBackButton from "../../../../components/Button/HeaderWithBackButton";
import { goBack, navigate } from "../../../../utils/NavigationUtil";
import LoaderButton from "../../../../components/Button/LoaderButton";
import { screenNames } from "../../../../navigation/ScreenNames";
import { AppColor } from "../../../../themes/AppColor";
import { AppFonts } from "../../../../themes/AppFonts";
import { TouchableOpacity } from "react-native";
import { VerifyOTPScreenProps } from "../../../../types/navigation";
import { images } from "../../../../assets";
import useToastHook from "../../../../hooks/toast";
import RestClient from "../../../../api/restClient";
import { delay } from "../../../../utils/delay";
import LoadingText from "../../../../components/CustomText/LoadingText";

const VerifyOtpScreen: React.FC<VerifyOTPScreenProps> = ({ route }) => {
  const [IsLoading, setIsLoading] = useState(false);
  const { showToast } = useToastHook();
  const [email, setEmail] = useState("abc@gmail.com");
  const [code, setCode] = useState(["", "", "", ""]);
  const [loadingText, setLoadingText] = useState(false)
  const inputRefs = [
    useRef<any>(null),
    useRef<any>(null),
    useRef<any>(null),
    useRef<any>(null),
  ];

  useEffect(() => {
    if (route.params) {
      const { email } = route.params;
      setEmail(email);
    }
  }, []);

  const handleInputChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
    }
    if (value.length === 1 && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
    if (value.length === 0 && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const verifyOtp = async () => {
    try {

        // navigate(screenNames.ResetPasswordScreen, {
        //   email,
        //   title: "Reset your Password",
        // });
        // return;
      const enteredCode = code.join("");
      if (enteredCode.length < 4) {
        showToast("Please enter a valid code", "warning");
        return;
      }
      const restClient = new RestClient();
      setIsLoading(true);
      const response = await restClient.verifyOtp({ email, code: enteredCode });
      if (response && typeof response != "string") {
        showToast(response.message || "Email sent successfully", "success");
        setIsLoading(false);
        await delay(1000);
        navigate(screenNames.ResetPasswordScreen, {
          email,
          title: "Reset your Password",
        });
      } else {
        showToast(response || "Something went wrong", "danger");
      }
      setIsLoading(false);
    } catch (error) {
      showToast("Something went wrong", "danger");
      console.log("Error verifyOtp : ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const callToResendOtp = async () => {
    try {
      const restClient = new RestClient();
      setLoadingText(true);
      const response = await restClient.sendPasswordOtp(email);
      console.log("response : ", response);
      if (response && typeof response != "string") {
        showToast(response.message || "Email sent successfully", "success");
        setLoadingText(false);
      } else {
        showToast(response || "Something went wrong", "danger");
      }
    } catch (error) {
      setLoadingText(false);
    } finally {
      setLoadingText(false);
    }
  };

  return (
    <>
      <SafeAreaWrapper>
        <HeaderWithBackButton
          title={"Verify Email"}
          onBackClick={() => goBack()}
          customStyle={undefined}
        />

        <Image
          source={images.PIN_CODE}
          style={{
            width: 70,
            height: 70,
            alignSelf: "center",
            marginTop: 20,
          }}
        />

        <Text style={styles.header}>Enter Verification Code</Text>
        <Text style={styles.subHeader}>
          We have sent a code to{" "}
          <Text
            style={{
              color: AppColor.PRIMARY_700,
              fontFamily: AppFonts.Regular,
            }}
          >
            {email}
          </Text>
        </Text>

        <View style={styles.codeContainer}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              style={[
                styles.codeInput,
                { borderColor: digit ? AppColor.PRIMARY : AppColor.DISABLED },
              ]}
              keyboardType="numeric"
              maxLength={1}
              value={digit}
              onChangeText={(value) => handleInputChange(index, value)}
              ref={inputRefs[index]}
              returnKeyType="done"
            />
          ))}
        </View>
      </SafeAreaWrapper>

      <View style={styles.button}>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Text style={styles.resendText}>Didn't you receive any code? </Text>
          <TouchableOpacity onPress={() => callToResendOtp()}>
            <LoadingText style={styles.resendLink} isLoading={loadingText} text={"Resend Code"} />
          </TouchableOpacity>
        </View>

        <LoaderButton
          title="Verify Now"
          onPress={() => verifyOtp()}
          loading={IsLoading}
        />
      </View>
    </>
  );
};

export default VerifyOtpScreen;

const styles = StyleSheet.create({
  button: {
    width: "100%",
    alignSelf: "center",
    position: "absolute",
    bottom:0,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
     paddingHorizontal: Platform.OS === "ios" ? "4%" : "2%",
        backgroundColor: AppColor.WHITE,
        paddingBottom: Platform.OS === "ios" ? 35 : 15,
  },
  resendText: {
    textAlign: "center",
    fontSize: 14,
    color: AppColor.BLACK,
    marginBottom: 20,
    fontFamily: AppFonts.Regular,
  },
  resendLink: {
    color: AppColor.PRIMARY,
    fontFamily: AppFonts.Regular,
  },
  header: {
    fontSize: 24,
    fontFamily: AppFonts.Bold,
    textAlign: "center",
    marginTop: 10,
    color: AppColor.BLACK,
  },
  subHeader: {
    fontSize: 16,
    color: AppColor.BLACK_60,
    textAlign: "center",
    marginTop: 10,
    width: "80%",
    alignSelf: "center",
    fontFamily: AppFonts.Regular,
  },
  codeContainer: {
    width: "65%",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 30,
  },
  codeInput: {
    borderWidth: 1,
    borderRadius: 10,
    width: 50,
    height: 50,
    textAlign: "center",
    fontSize: 20,
  },
});
