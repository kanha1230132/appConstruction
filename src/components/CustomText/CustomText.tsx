import {StyleSheet, Text, TextStyle, View} from 'react-native';
import React from 'react';
import {AppColor} from '../../themes/AppColor';
import {AppFonts} from '../../themes/AppFonts';

interface CustomTextProps {
  title: string;
  color?: string;
  fontSize?: number;
  fontFamily?: string;
  style?: TextStyle;
}

const CustomText: React.FC<CustomTextProps> = ({
  title,
  color = AppColor.BLACK,
  fontSize = 16,
  fontFamily = AppFonts.Regular,
  style,
}) => {
  return (
    <Text style={[{ color, fontSize, fontFamily }, style]}>{title}</Text>
  );
};

export default CustomText;

