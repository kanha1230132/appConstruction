// components/CustomRadioButton.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { AppColor } from '../../themes/AppColor';

interface CustomRadioButtonProps {
  label: string;
  value: string;
  status: 'checked' | 'unchecked';
  onPress: () => void;
}

const CustomRadioButton = ({ label, value, status, onPress }: CustomRadioButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <RadioButton
        value={value}
        status={status}
        onPress={onPress}
        color={AppColor.PRIMARY}
        uncheckedColor="#ccc"
      />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

export default CustomRadioButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  label: {
    fontSize: 16,
  },
});
