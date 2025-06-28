import React, { use, useState } from "react";
import { View, Text, TextInput, Image } from "react-native";
import { SafeAreaWrapper } from "../../../../components/SafeAreaWrapper/SafeAreaWrapper";
import HeaderWithBackButton from "../../../../components/Button/HeaderWithBackButton";
import { images } from "../../../../assets";
import { AppColor } from "../../../../themes/AppColor";
import Icon from "react-native-vector-icons/Ionicons";
import { ForgotPasswordScreenProps } from "../../../../types/navigation";
import {
  goBack,
  navigate,
  resetAndNavigate,
} from "../../../../utils/NavigationUtil";
import LoaderButton from "../../../../components/Button/LoaderButton";
import { styles } from "./ForgotPassword.styles";
import { screenNames } from "../../../../navigation/ScreenNames";
import RestClient from "../../../../api/restClient";
import useToastHook from "../../../../hooks/toast";
import { delay } from "../../../../utils/delay";
import IconTextInput from "../../../../components/CustomTextInput/CustomIconTextInput";

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({}) => {
  const [isFocus, setIsFocus] = useState(false);
  const [IsLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const { showToast } = useToastHook();

  const handleContinue = async () => {
    try {
      if (!email) {
        showToast("Please enter email", "warning");
        return;
      }
      const restClient = new RestClient();
      setIsLoading(true);
      const response = await restClient.sendPasswordOtp(email);
      console.log("response : ", response);
      if (response && typeof response != "string") {
        showToast(response.message || "Email sent successfully", "success");
        setIsLoading(false);
        await delay(1000);
        navigate(screenNames.VerifyOTPScreen, { email });
      } else {
        showToast(response || "Something went wrong", "danger");
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
        <HeaderWithBackButton
          title={"Forgot Password"}
          onBackClick={() => goBack()}
          customStyle={undefined}
        />

        <View style={styles.iconContainer}>
          <Image
            source={images.FORGOT_PASSWORD_PHOTO} // Path to the image in the assets folder
            style={styles.icon}
          />
        </View>

        <Text style={styles.subtitle}>
          Please enter your email account to reset your password
        </Text>

        <IconTextInput
          value={email}
          label={"Enter your email address"}
          onChangeText={(text) => {
            setEmail(text);
          }}
          editable={true}
          rightIconName={"email-outline"}
          onClickIcon={() => {}}
        />
      </SafeAreaWrapper>

      <View style={styles.button}>
        <LoaderButton
          title="Continue"
          onPress={() => handleContinue()}
          loading={IsLoading}
        />
      </View>
    </>
  );
};

export default ForgotPasswordScreen;
