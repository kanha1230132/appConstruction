import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import React from "react";
import { moderateScale } from "react-native-size-matters";
import { AppColor } from "../../../themes/AppColor";
import CustomText from "../../../components/CustomText/CustomText";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomTextInput from "../../../components/CustomTextInput/CustomTextInput";

interface DropDownButtonProps {
  label: string;
  onPress: () => void;
  value: string;
  style?:ViewStyle
}

const DropDownButton: React.FC<DropDownButtonProps> = ({ label, onPress , value,style}) => {
  return (
    <View style={{
      width: "100%",
      ...style
    }}>

    <CustomText  title={value ? value : label ? label : "Select"} color={AppColor.BLACK_60} />
    
     <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 1,
        padding: moderateScale(10),
        borderRadius: moderateScale(5),
        borderColor: AppColor.BLACK_60,
        marginBottom: 15,
      }}
      onPress={onPress}
    >

        
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 14,
        }}
      >
        <CustomText title={label ? label : "Select"} color={AppColor.BLACK_60} />
      </View>

      <Ionicons
        style={{ marginLeft: 10 }}
        name="caret-down"
        size={20}
        color={AppColor.PRIMARY}
      />
    </TouchableOpacity>
    </View>
   
  );
};

export default DropDownButton;

const styles = StyleSheet.create({});

