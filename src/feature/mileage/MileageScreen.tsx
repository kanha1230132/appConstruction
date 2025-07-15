import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaWrapper } from "../../components/SafeAreaWrapper/SafeAreaWrapper";
import HeaderWithBackButton from "../../components/Button/HeaderWithBackButton";
import { goBack } from "../../utils/NavigationUtil";
import { AppText } from "../../constants/appText";
import DateFilterCard from "./components/DateFilterCard";

interface MileageScreenProps {}

const MileageScreen: React.FC<MileageScreenProps> = () => {
  return (
    <>
      <SafeAreaWrapper>
        <HeaderWithBackButton
          title={AppText.Mileage}
          onBackClick={() => goBack()}
          customStyle={undefined}
        />
        {/* <DateFilterCard /> */}
      </SafeAreaWrapper>
    </>
  );
};

export default MileageScreen;

const styles = StyleSheet.create({});
