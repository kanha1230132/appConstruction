import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {AppFonts} from '../../themes/AppFonts';
import {TextInput, TextInputProps} from 'react-native-paper';
import { AppColor } from '../../themes/AppColor';

interface CustomTextInputProps {
  onChangeTextValue: (text: string) => void;
  textValue: string;
  label: string;
  [key: string]: any; // To allow for additional props
  IsSecure?: boolean;
  props?:TextInputProps
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  onChangeTextValue,
  textValue,
  label,
  IsSecure,
  ...props
}) => {
  return (
    <View style={styles.formGroup}>
      <TextInput
        label={label}
        style={{
            backgroundColor:AppColor.WHITE,
        }}
        onChangeText={onChangeTextValue}
        value={textValue}
        placeholderTextColor="#777"
        mode='outlined'
        activeOutlineColor={AppColor.PRIMARY}
        secureTextEntry = {IsSecure}
        outlineColor={AppColor.BLACK_30}
        {...props}
      />
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  formGroup: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#486ECD',
    marginBottom: 10,
    fontWeight: 'bold',
  },
});
