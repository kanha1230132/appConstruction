import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { AppColor } from "../../themes/AppColor";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { startSpeechToText } from "react-native-voice-to-text";
import CustomText from "../CustomText/CustomText";

const VoiceRecordButton = ({
  setDescription,
}: {
  setDescription: (text: string) => void;
}) => {
  const [IsTranslating, setIsTranslating] = useState(false);

  const callToTansalate = () => {
    if (IsTranslating) {
      return;
    }
    setIsTranslating(true);

    startSpeechToText()
      .then((audioText) => {
        console.log("audioText:", audioText);
        setIsTranslating(false);
      })
      .catch((error) => {
        setIsTranslating(false);

        console.log("Error : ", error);
      });
  };
  return (
    <TouchableOpacity
      onPress={() => callToTansalate()}
      activeOpacity={0.5}
      style={{
        backgroundColor: AppColor.BLACK_10,
        borderRadius: 6,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        marginVertical: 10,
      }}
    >
      <CustomText title="Voice To Text" />
      <MaterialIcons
        name={IsTranslating ? "mic" : "mic-off"}
        size={40}
        color={AppColor.APPROVE}
      />
    </TouchableOpacity>
  );
};

export default VoiceRecordButton;

const styles = StyleSheet.create({});
