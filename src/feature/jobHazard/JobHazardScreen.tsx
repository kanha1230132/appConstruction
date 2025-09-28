import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaWrapper } from "../../components/SafeAreaWrapper/SafeAreaWrapper";
import ScrollViewWrapper from "../../components/ScrollViewWrapper/ScrollViewWrapper";
import HeaderWithBackButton from "../../components/Button/HeaderWithBackButton";
import {  navigate, resetAndNavigate } from "../../utils/NavigationUtil";
import { AppText } from "../../constants/appText";
import { images } from "../../assets";
import { screenNames } from "../../navigation/ScreenNames";
import AddButton from "../../components/Button/AddButton";

interface JobHazardScreenProps {}

const JobHazardScreen: React.FC<JobHazardScreenProps> = () => {
  return (
    <>
      <SafeAreaWrapper>
        <HeaderWithBackButton
          title={AppText.JobHazardAnalysis}
          onBackClick={() =>resetAndNavigate(screenNames.MainApp)}
          customStyle={undefined}
        />
        <ScrollViewWrapper>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Display First Image */}
            <Image source={images.JHA_TRIANGLE} style={styles.image} />

            {/* Display Second Image */}
            <Image source={images.JHA_SQUARE} style={styles.image} />
          </View>
        </ScrollViewWrapper>
      </SafeAreaWrapper>

      <AddButton onPress={()=>{navigate(screenNames.CreateJobHazard)}} />
      
    </>
  );
};

export default JobHazardScreen;

const styles = StyleSheet.create({
  image: {
    width: "94%",
    height: 300,
    resizeMode: "contain",
  }
});
