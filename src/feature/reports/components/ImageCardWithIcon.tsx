// components/ImageCardWithIcon.tsx

import React from "react";
import { View, StyleSheet, ImageStyle } from "react-native";
import { Card } from "react-native-paper";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FastImage from "react-native-fast-image"; // Or Image if not using FastImage
import { AppColor } from "../../../themes/AppColor";
import CustomText from "../../../components/CustomText/CustomText";
import { AppFonts } from "../../../themes/AppFonts";
import { moderateScale } from "react-native-size-matters";
import { Image } from "react-native";

interface Props {
  title: string;
  iconName: string;
  imageUrl?: string;
  imageSize?: number;
}

const ImageCardWithIcon: React.FC<Props> = ({
  title,
  iconName,
  imageUrl,
  imageSize = 100,
}) => {
  return (
    <Card style={styles.section}>
      <View style={styles.header}>
        <MaterialIcons name={iconName} size={24} color={AppColor.PRIMARY} />
        <CustomText
          color={AppColor.BLACK}
          fontSize={moderateScale(16)}
          fontFamily={AppFonts.Bold}
          title={title}
        />
      </View>

      <View style={styles.imageWrapper}>
        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            style={[
              styles.image,
              {
                width: imageSize,
                height: imageSize,
              },
            ]}
            resizeMode="contain"
          />
        ) : (
          <CustomText title="No signature available" />
        )}
      </View>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  imageWrapper: {
    padding: 10,
  },
  image: {
    borderWidth: 0.5,
    borderColor: AppColor.BLACK_40,
  } as ImageStyle,
});

export default ImageCardWithIcon;
