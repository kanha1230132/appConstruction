import { Image, Platform, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ResetPasswordScreenProps } from "../../../../types/navigation";
import { SafeAreaWrapper } from "../../../../components/SafeAreaWrapper/SafeAreaWrapper";
import HeaderWithBackButton from "../../../../components/Button/HeaderWithBackButton";
import { goBack, resetAndNavigate } from "../../../../utils/NavigationUtil";
import useToastHook from "../../../../hooks/toast";
import ScrollViewWrapper from "../../../../components/ScrollViewWrapper/ScrollViewWrapper";
import { AppColor } from "../../../../themes/AppColor";
import { AppFonts } from "../../../../themes/AppFonts";
import IconTextInput from "../../../../components/CustomTextInput/CustomIconTextInput";
import { images } from "../../../../assets";
import LoaderButton from "../../../../components/Button/LoaderButton";
import RestClient from "../../../../api/restClient";
import { delay } from "../../../../utils/delay";
import { AppText } from "../../../../constants/appText";
import { screenNames } from "../../../../navigation/ScreenNames";

const ResetPasswordScreen: React.FC<ResetPasswordScreenProps> = ({ route }) => {
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("")
  const { showToast } = useToastHook();
  const [IsSecure1, setIsSecure1] = useState(true);
  const [IsSecure2, setIsSecure2] = useState(true);
  const [IsSecure3, setIsSecure3] = useState(true);
  const [IsLoading, setIsLoading] = useState(false);
  const [IsChangePassword, setIsChangePassword] = useState(false);


  useEffect(() => {
    if (route.params) {
      const { email, title } = route.params;
      setEmail(email);
      setTitle(title);
      if(title == AppText.ChangePassword){
        setIsChangePassword(true);
      }

    }
  }, []);

  const validate = () => {
    if(IsChangePassword && !currentPassword){
      showToast("Please enter current password", 'warning');
      return false;
    }
    if(!newPassword || !confirmPassword){
      showToast("Please enter password", 'warning');
      return false;
    }
    if (newPassword !== confirmPassword) {
      showToast("Password doesn't match", 'warning');
      return false;
    }
     if (newPassword.length < 8) {
      showToast("Password must be at least 8 characters long!", "warning");
      return false;
    }
    return true;
  };

  const callToSubmit = async () => {
    try {
      if(validate()){
        setIsLoading(true);
        const restClient = new RestClient();
        const response = await restClient.resetPassword({email, newPassword});
        if(response && typeof response != "string"){
          showToast(response.message || "Password changed successfully", "success");
          setIsLoading(false);
          await delay(1000);
          resetAndNavigate(screenNames.LoginScreen);
        } else {
          showToast(response || "Something went wrong", "danger");
        }
      }
      
    } catch (error) {
      console.log("Error : ", error);
      setIsLoading(false);
      showToast("Something went wrong", "danger");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <SafeAreaWrapper>
        <HeaderWithBackButton
          title={title || "Reset Password"}
          onBackClick={() => goBack()}
          customStyle={undefined}
        />
        <ScrollViewWrapper>
          <Image
            source={images.RESET_PASSWORD}
            style={{
              width: 100,
              height: 100,
              alignSelf: "center",
              marginTop: 20,
            }}
          />
          <Text style={styles.subHeader}>
            The password must be different than before
          </Text>

          <View
            style={{
              marginTop: 20,
              gap: 20,
            }}
          >

            {
              IsChangePassword ?

<IconTextInput
              value={currentPassword}
              label={AppText.CurrentPassword}
              onChangeText={(text) => {
                setCurrentPassword(text);
              }}
              editable={true}
              isSecure={IsSecure3}
              rightIconName={IsSecure3 ? "eye-off" : "eye"}
              onClickIcon={() => {
                setIsSecure3(!IsSecure3);
              }}
            />

              : null
            }

            

            <IconTextInput
              value={newPassword}
              label={"New Password"}
              onChangeText={(text) => {
                setNewPassword(text);
              }}
              editable={true}
              isSecure={IsSecure1}
              rightIconName={IsSecure1 ? "eye-off" : "eye"}
              onClickIcon={() => {
                setIsSecure1(!IsSecure1);
              }}
            />

            <IconTextInput
              value={confirmPassword}
              label={"Confirm Password"}
              onChangeText={(text) => {
                setConfirmPassword(text);
              }}
              editable={true}
              isSecure={IsSecure2}
              rightIconName={IsSecure2 ? "eye-off" : "eye"}
              onClickIcon={() => {
                setIsSecure2(!IsSecure2);
              }}
            />


          </View>
        </ScrollViewWrapper>
      </SafeAreaWrapper>

      <View style={styles.button}>
        <LoaderButton title="Submit" onPress={() => callToSubmit()} loading={IsLoading} />
      </View>
    </>
  );
};

export default ResetPasswordScreen;

const styles = StyleSheet.create({
  subHeader: {
    fontSize: 16,
    color: AppColor.BLACK_70,
    fontFamily: AppFonts.Regular,
    textAlign: "left",
    width: "80%",
    marginTop: 40,
  },
  button: {
    width: "95%",
    alignSelf: "center",
    position: "absolute",
    bottom: Platform.OS == "ios" ? 30 : 10,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});
