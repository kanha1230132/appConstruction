// components/SelectCard.tsx

import React from "react";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Card, Divider } from "react-native-paper";
import FastImage from "react-native-fast-image"; // Or Image if not using FastImage
import { moderateScale } from "react-native-size-matters";
import { AppColor } from "../themes/AppColor";
import CustomText from "./CustomText/CustomText";
import { AppFonts } from "../themes/AppFonts";
import Ionicons from "react-native-vector-icons/Ionicons";
import { CompanyLogoResponse } from "../api/apiInterface";

interface SelectCardProps {
  title: string;
  selectedLabel?: string;
  selectedImage?: string;
  onPress: () => void;
  placeholder?: string;
  showDropdownIcon?: boolean;
  selectedLogo?: CompanyLogoResponse[];
  onRemove?: (item: CompanyLogoResponse) => void
  isShowDeleteIcon?: boolean
}

const SelectCard: React.FC<SelectCardProps> = ({
  title,
  selectedLabel,
  selectedImage,
  onPress,
  placeholder = "Select",
  showDropdownIcon = true,
  selectedLogo,
  onRemove,
  isShowDeleteIcon
}) => {
  return (
    <Card style={styles.section}>
      <CustomText
        color={AppColor.BLACK}
        fontSize={moderateScale(16)}
        fontFamily={AppFonts.Bold}
        title={title}
      />
       {
          selectedLogo && selectedLogo.map((item)=>
<View style={{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // space between name+logo and close icon
    paddingVertical: 8,
  }}>
  <View style={{
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  }}>
    <FastImage
      source={{ uri: item.file_url }}
      style={styles.logo}
      resizeMode="contain"
    />
    <CustomText title={item.companyName || placeholder} />
  </View>

  {
    isShowDeleteIcon &&
      <TouchableOpacity onPress={() => {
    onRemove(item)
    }}>
    <Ionicons name="close" size={20} color={AppColor.REJECT} />
  </TouchableOpacity>
  }
  

</View>

          )
        }
      <TouchableOpacity style={styles.touchable} onPress={onPress}>
        <View style={styles.innerLeft}>
          <CustomText title={selectedLabel || placeholder} />
        </View>

        {showDropdownIcon && (
          <Ionicons
            style={{ marginLeft: 10 }}
            name="caret-down"
            size={20}
            color={AppColor.PRIMARY}
          />
        )}
      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: moderateScale(12),
    backgroundColor: AppColor.WHITE,
    borderRadius: moderateScale(8),
    padding: moderateScale(12),
    marginHorizontal:2
  },
  touchable: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    borderWidth: 0.5,
    padding: moderateScale(10),
    borderRadius: moderateScale(5),
    borderColor: AppColor.BORDER_COLOR,
  },
  innerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  logo: {
    width: 30,
    height: 30,
    borderRadius: 4,
  },
});

export default SelectCard;
