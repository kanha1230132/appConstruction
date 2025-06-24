import { Text, TouchableOpacity, View } from "react-native";
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

const RegisterScreen: React.FC<RegisterScreenProps> = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [IsLoading, setIsLoading] = useState(false);
  const [IsSecure, setIsSecure] = useState(false);
  return (
    <>
      <SafeAreaWrapper>
        <View
          style={{
            marginTop: 50,
          }}
        >
          <Text style={styles.heading}>Hey,{" \n"}Register Now!</Text>

          <CustomTextInput
            onChangeTextValue={(text) => {
              // setEmail(text);
            }}
            textValue={""}
            label={"User Name"}
          />

          <CustomTextInput
            onChangeTextValue={(text) => {
              // setEmail(text);
            }}
            textValue={""}
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

          <View style={styles.buttonContainer}>
            <LoaderButton
              title="Register"
              onPress={() => {}}
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
          <TouchableOpacity onPress={() => navigate(screenNames.LoginScreen)}>
            <Text style={styles.signupLink}>Sign In</Text>
          </TouchableOpacity>
        </View>
        </View>
      </SafeAreaWrapper>

      <PoweredText />
    </>
  );
};

export default RegisterScreen;
