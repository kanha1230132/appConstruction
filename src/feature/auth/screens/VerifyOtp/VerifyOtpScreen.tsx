import { Platform, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaWrapper } from "../../../../components/SafeAreaWrapper/SafeAreaWrapper";
import HeaderWithBackButton from "../../../../components/Button/HeaderWithBackButton";
import { goBack, navigate } from "../../../../utils/NavigationUtil";
import LoaderButton from "../../../../components/Button/LoaderButton";
import { screenNames } from "../../../../navigation/ScreenNames";
import { AppColor } from "../../../../themes/AppColor";
import { AppFonts } from "../../../../themes/AppFonts";
import { TouchableOpacity } from "react-native";

interface VerifyOtpScreenProps {}

const VerifyOtpScreen: React.FC<VerifyOtpScreenProps> = () => {
  const [IsLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("abc@gmail.com");
  const [code, setCode] = useState(["", "", "", ""]);
  const inputRefs = [
    useRef<any>(null),
    useRef<any>(null),
    useRef<any>(null),
    useRef<any>(null),
  ];

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

  return (
    <>
      <SafeAreaWrapper>
        <HeaderWithBackButton
          title={"Verify Email"}
          onBackClick={() => goBack()}
          customStyle={undefined}
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
          <TouchableOpacity>
            <Text style={styles.resendLink}>Resend Code</Text>
          </TouchableOpacity>
        </View>

        <LoaderButton
          title="Verify Now"
          onPress={() => navigate(screenNames.VerifyOTPScreen)}
          loading={IsLoading}
        />
      </View>
    </>
  );
};

export default VerifyOtpScreen;

const styles = StyleSheet.create({
  button: {
    width: "95%",
    alignSelf: "center",
    position: "absolute",
    bottom: Platform.OS == "ios" ? 30 : 10,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
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
