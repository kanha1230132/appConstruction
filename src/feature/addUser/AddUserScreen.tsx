import { Platform, StyleSheet, Text, View } from "react-native";
import React, { use, useState } from "react";
import { AddUserScreenProps } from "../../types/navigation";
import { SafeAreaWrapper } from "../../components/SafeAreaWrapper/SafeAreaWrapper";
import HeaderWithBackButton from "../../components/Button/HeaderWithBackButton";
import { goBack } from "../../utils/NavigationUtil";
import ScrollViewWrapper from "../../components/ScrollViewWrapper/ScrollViewWrapper";
import CustomTextInput from "../../components/CustomTextInput/CustomTextInput";
import { Switch } from "react-native-paper";
import { AppColor } from "../../themes/AppColor";
import { AppFonts } from "../../themes/AppFonts";
import LoaderButton from "../../components/Button/LoaderButton";
import RestClient from "../../api/restClient";
import useToastHook from "../../hooks/toast";
import { delay } from "../../utils/delay";

const AddUserScreen: React.FC<AddUserScreenProps> = () => {
  const [isBoss, setIsBoss] = useState(false);
  const [email, setEmail] = useState("");
  const [mileageRate, setMileageRate] = useState("");
  const [mileageDistance, setMileageDistance] = useState("");
  const [IsLoading, setIsLoading] = useState(false);
  const { showToast } = useToastHook();

  const resetState = () => {
    setIsBoss(false);
    setEmail("");
    setMileageRate("");
    setMileageDistance("");
  };

  const createCompanyEmail = async () => {
    try {
      if (!email) {
        showToast("Please enter Email", "warning");
        return;
      }
      if (!mileageRate) {
        showToast("Please enter Mileage Rate", "warning");
        return;
      }
      const params = {
        email: email,
        mileageRate: mileageRate,
        allowanceDistance: mileageDistance,
        isBoss: isBoss,
      };
      setIsLoading(true);
      const restClient = new RestClient();
      const response = await restClient.addUser(params);
      if (response && typeof response != "string") {
        showToast("User Added Successfully", "success");
        setIsLoading(false);
        resetState();
        await delay(1000);
        goBack();
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
          title={"Add User"}
          onBackClick={() => goBack()}
          customStyle={undefined}
        />

        <ScrollViewWrapper>
          <CustomTextInput
            onChangeTextValue={(text) => {
              setEmail(text);
            }}
            textValue={email}
            label={"E-mail ID"}
          />

          <CustomTextInput
            onChangeTextValue={(text) => {
              text = text.replaceAll("$", "")
              if(text.split('.').length > 1 && text.split('.')[text.split('.').length-1].length > 2){
                return;
              }
              if ([",", " "].includes(text) || isNaN(Number(text))) {
                return;
              }
              setMileageRate(text);
            }}
            textValue={mileageRate ? "$"+mileageRate.toString() : ""}
            label={"Mileage Rate"}
            keyboardType="numeric"
            placeholder="Ex: $0.00"

          />

          <CustomTextInput
            onChangeTextValue={(text) => {
              if(text.split('.').length > 1 && text.split('.')[text.split('.').length-1].length > 2){
                return;
              }
              if ([",", " "].includes(text) || isNaN(Number(text))) {
                return;
              }
              setMileageDistance(text);
            }}
            textValue={mileageDistance ? mileageDistance.toString() : ""}
            label={"Mileage Distance"}
            keyboardType="numeric"
            placeholder="Ex: 0.00 Kms"
          />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              borderWidth: 1,
              borderColor: AppColor.BLACK_30,
              padding: 15,
              borderRadius: 6,
            }}
          >
            <Text style={styles.label}>isBoss</Text>
            <Switch
              trackColor={{ false: AppColor.BLACK_30, true: AppColor.PRIMARY }}
              thumbColor={AppColor.BLACK_10}
              onValueChange={() => setIsBoss(!isBoss)}
              value={isBoss}
            />
          </View>
        </ScrollViewWrapper>
      </SafeAreaWrapper>

      <View style={styles.button}>
        <LoaderButton
          title="Add User"
          onPress={() => createCompanyEmail()}
          loading={IsLoading}
        />
      </View>
    </>
  );
};

export default AddUserScreen;

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontFamily: AppFonts.Medium,
    color: AppColor.BLACK,
    marginBottom: 4,
  },
  button: {
    width: "100%",
    alignSelf: "center",
    position: "absolute",
    bottom: 0,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: AppColor.WHITE,
      paddingHorizontal: Platform.OS === "ios" ? "4%" : "2%",
        paddingBottom: Platform.OS === "ios" ? 35 : 15,
  },
});
