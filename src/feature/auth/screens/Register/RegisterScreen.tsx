import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaWrapper } from "../../../../components/SafeAreaWrapper/SafeAreaWrapper";
import { RegisterScreenProps } from "../../../../types/navigation";
import CustomTextInput from "../../../../components/CustomTextInput/CustomTextInput";
import IconTextInput from "../../../../components/CustomTextInput/CustomIconTextInput";
import LoaderButton from "../../../../components/Button/LoaderButton";
import PoweredText from "../../components/PoweredText";
import { styles } from "./Register.styles";
import { navigate } from "../../../../utils/NavigationUtil";
import { screenNames } from "../../../../navigation/ScreenNames";
import { Image } from "react-native";
import { images } from "../../../../assets";
import { AppText } from "../../../../constants/appText";
import { AppFonts } from "../../../../themes/AppFonts";
import { AppColor } from "../../../../themes/AppColor";
import { Checkbox } from "react-native-paper";
import ScrollViewWrapper from "../../../../components/ScrollViewWrapper/ScrollViewWrapper";
import useToastHook from "../../../../hooks/toast";
import RestClient from "../../../../api/restClient";

const RegisterScreen: React.FC<RegisterScreenProps> = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [IsLoading, setIsLoading] = useState(false);
  const [IsSecure, setIsSecure] = useState(false);
  const [checked, setChecked] = useState(false);
  const [UserName, setUserName] = useState("");
  const {showToast} = useToastHook()


  const validateValues = ()=>{
      // Input validation
    if (!UserName || !Email || !Password) {
      showToast("Please fill all fields!",'warning');
      return false;
    }

    // Regex for email validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!Email.match(emailPattern)) {
      showToast("Invalid email format!",'warning');
      return false;
    }

    // Password validation (at least 8 characters)
    if (Password.length < 8) {
      showToast("Password must be at least 8 characters long!",'warning');
      return false;
    }

    return true;
  }


  const callToRegister = async () => {
    if(validateValues()){
const params = {
      username: UserName,
      email: Email,
      password: Password,
    };

    const restClient = new RestClient();
    const response = await restClient.signup(params);
  }
  }
  return (
    <>
      <SafeAreaWrapper>
        <ScrollViewWrapper>
          <View style={styles.logoContainer}>
            <Image source={images.logo} style={styles.logo} />
            <Text style={styles.companyName}>{AppText.appName}</Text>
          </View>

          <ScrollView
            style={{
              flex: 1,
              backgroundColor: AppColor.WHITE,
              paddingBottom: 70,
            }}
          >
            <Text style={styles.heading}>Hey,{" \n"}Register Now!</Text>

            <CustomTextInput
              onChangeTextValue={(text) => {
                setUserName(text)
              }}
              textValue={UserName}
              label={"User Name"}
            />

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

            <View style={styles.checkboxContainer}>
              <Checkbox.Android
                status={checked ? "checked" : "unchecked"}
                onPress={() => setChecked(!checked)}
                color="#155db2"
              />

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: AppFonts.Regular,
                    color: AppColor.BLACK_70,
                  }}
                >
                  {" "}
                  I agree to the{" "}
                </Text>
                <TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 13,
                      fontFamily: AppFonts.Regular,
                      color: AppColor.PRIMARY,
                    }}
                  >
                    Privacy Policy
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <LoaderButton
                title="Register"
                onPress={() => callToRegister()}
                loading={IsLoading}
              />
            </View>

            <View style={styles.orContainer}>
              <View style={styles.divider} />
              <Text style={styles.orText}>OR</Text>
              <View style={styles.divider} />
            </View>

            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>Already have account?</Text>
              <TouchableOpacity
                onPress={() => navigate(screenNames.LoginScreen)}
              >
                <Text style={styles.signupLink}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </ScrollViewWrapper>
      </SafeAreaWrapper>

      <PoweredText />
    </>
  );
};

export default RegisterScreen;
