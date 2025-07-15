import React, { forwardRef } from 'react';
import { KeyboardTypeOptions, StyleSheet, View, ViewStyle } from 'react-native';
import { TextInput, TextInputProps } from 'react-native-paper';
import { AppFonts } from '../../themes/AppFonts';
import { AppColor } from '../../themes/AppColor';

interface CustomTextInputProps extends TextInputProps {
  onChangeTextValue?: (text: string) => void;
  textValue: string;
  label: string;
  IsSecure?: boolean;
  wrapperStyle?:ViewStyle
}

const CustomTextInput = forwardRef<any, CustomTextInputProps>(({
  onChangeTextValue,
  textValue,
  label,
  IsSecure,
  editable = true,
  keyboardType,
  numberOfLines = 1,
  multiline = false,
  returnKeyType = 'done',
  wrapperStyle,
  ...props
}, ref) => {
  return (
    <View style={[styles.formGroup,wrapperStyle]}>
      <TextInput
        ref={ref}
        label={label}
        style={{
          width: '100%',
          backgroundColor: AppColor.WHITE,
          color: AppColor.BLACK,
        }}
        onChangeText={onChangeTextValue}
        value={textValue}
        placeholderTextColor={AppColor.BLACK_60}
        mode="outlined"
        activeOutlineColor={AppColor.PRIMARY}
        secureTextEntry={IsSecure}
        editable={editable}
        keyboardType={keyboardType}
        numberOfLines={numberOfLines}
        multiline={multiline}
        returnKeyType={returnKeyType}
        outlineColor={AppColor.BLACK_60}
         contentStyle={{
                color: AppColor.BLACK,
                fontFamily: AppFonts.Regular,
              }}
        {...props}
      />
    </View>
  );
});

export default CustomTextInput;

const styles = StyleSheet.create({
  formGroup: {
    width: '100%',
    marginBottom: 15,
  },
});
