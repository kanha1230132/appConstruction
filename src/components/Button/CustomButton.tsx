import React from 'react';
import {
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { AppColor } from '../../themes/AppColor';
import { AppFonts } from '../../themes/AppFonts';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  buttonStyle = {},
  textStyle = {},
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, buttonStyle, (disabled || loading) && styles.disabled]}
      activeOpacity={0.7}
      disabled={disabled || loading}
      
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width:'100%',
    backgroundColor: AppColor.PRIMARY,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  text: {
    color: AppColor.WHITE,
    fontSize: 16,
    fontFamily:AppFonts.Regular
  },
  disabled: {
    opacity: 0.6,
  },
});

export default CustomButton;
