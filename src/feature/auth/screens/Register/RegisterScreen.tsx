import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaWrapper } from "../../../../components/SafeAreaWrapper/SafeAreaWrapper";
import { RegisterScreenProps } from "../../../../types/navigation";
import CustomTextInput from "../../../../components/CustomTextInput/CustomTextInput";
import IconTextInput from "../../../../components/CustomTextInput/CustomIconTextInput";
import LoaderButton from "../../../../components/Button/LoaderButton";
import PoweredText from "../../components/PoweredText";
import { styles } from "./Register.styles";
import { navigate, resetAndNavigate } from "../../../../utils/NavigationUtil";
import { screenNames } from "../../../../navigation/ScreenNames";
import { Image } from "react-native";
import { images } from "../../../../assets";
import { AppText } from "../../../../constants/appText";
import { AppColor } from "../../../../themes/AppColor";
import ScrollViewWrapper from "../../../../components/ScrollViewWrapper/ScrollViewWrapper";
import useToastHook from "../../../../hooks/toast";
import RestClient from "../../../../api/restClient";
import { delay } from "../../../../utils/delay";
import PrivacyPolicyView from "../../components/PrivacyPolicyView";
import PrivacyPolicyModal from "../../components/PrivacyPolicyModal";

const RegisterScreen: React.FC<RegisterScreenProps> = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [IsLoading, setIsLoading] = useState(false);
  const [IsSecure, setIsSecure] = useState(true);
  const [checked, setChecked] = useState(false);
  const [UserName, setUserName] = useState("");
  const { showToast } = useToastHook();
  const [policyVisible, setPolicyVisible] = useState(false);

  const validateValues = () => {
    if (!UserName || !Email || !Password) {
      showToast("Please fill all fields!", "warning");
      return false;
    }
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!Email.match(emailPattern)) {
      showToast("Invalid email format!", "warning");
      return false;
    }

    if (Password.length < 8) {
      showToast("Password must be at least 8 characters long!", "warning");
      return false;
    }

    if(!checked){
        showToast("Please accept our Privacy Policy to continue using the app.", "warning");
        return false;
      }

    return true;
  };

  const callToRegister = async () => {
    try {
      if (validateValues()) {
        const params = {
          username: UserName,
          email: Email,
          password: Password,
        };
        setIsLoading(true);
        const restClient = new RestClient();
        const response = await restClient.signup(params);
        if (response && typeof response != "string") {
          showToast(response.message || "Registration Successfully", "success");
          setIsLoading(false);
          await delay(1000);
          resetAndNavigate(screenNames.LoginScreen);
        } else {
          showToast(response || "Something went wrong", "danger");
        }
      }
    } catch (error) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };
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
                setUserName(text);
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

            <PrivacyPolicyView
              checked={checked}
              setChecked={() => setChecked(!checked)}
              onPressPolicy={() => setPolicyVisible(true)}
            />
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
        <PrivacyPolicyModal
          visible={policyVisible}
          setChecked={(v: boolean) => setChecked(v)}
          setPolicyVisible={(v: boolean) => setPolicyVisible(v)}
        />
      </SafeAreaWrapper>

      <PoweredText />
    </>
  );
};

export default RegisterScreen;
