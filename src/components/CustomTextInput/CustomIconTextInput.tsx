import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { TextInput, TextInputAffixProps, TextInputIconProps } from 'react-native-paper'
import { AppFonts } from '../../themes/AppFonts';
import { AppColor } from '../../themes/AppColor';
// import Icon from 'react-native-vector-icons/FontAwesome';


interface IconTextInputInterface {
  value: string;
  label: string;
  onChangeText: (text: string) => void;
  editable?: boolean;
  onClickIcon?: () => void;
  isSecure?: boolean;
  inputFontSize?: number;
  rightIconName: string;
}
const IconTextInput = ({
  value,
  label,
  onChangeText,
  editable = true,
  onClickIcon,
  isSecure = false,
  inputFontSize = 14,
  rightIconName,
  ...props
}: IconTextInputInterface) => {
  return (
    <TextInput
      style={{ color: AppColor.BLACK, fontSize: inputFontSize,backgroundColor:AppColor.WHITE,
    marginBottom: 15,

       }}
      value={value}
      editable={editable}
      onChangeText={onChangeText}
      label={label}
      secureTextEntry={isSecure}
      returnKeyType="done"
      contentStyle={{
        color: AppColor.BLACK
        ,
                        fontFamily: AppFonts.Regular,
        
      }}
     right={ <TextInput.Icon
              icon={rightIconName}
              onPress={onClickIcon}
            />}
      mode="outlined"
      
      activeOutlineColor={AppColor.PRIMARY}
      {...props}
    />
  );
};

export default IconTextInput

const styles = StyleSheet.create({
 
})