import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Checkbox } from 'react-native-paper'
import { AppFonts } from '../../../themes/AppFonts'
import { AppColor } from '../../../themes/AppColor'

interface PrivacyPolicyViewProps {
    checked:boolean,
    setChecked:(v:boolean)=>void,
    onPressPolicy:()=>void
}

const PrivacyPolicyView: React.FC<PrivacyPolicyViewProps> = ({checked,setChecked,onPressPolicy}) => {
  return (
        <View style={styles.checkboxContainer}>
              <Checkbox.Android
                status={checked ? "checked" : "unchecked"}
                onPress={() => setChecked(!checked)}
                color={AppColor.PRIMARY}
              />

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: AppFonts.Regular,
                    color: AppColor.BLACK_70,
                  }}
                >
                  {" "}
                  I agree to the{" "}
                </Text>
                <TouchableOpacity onPress={() => {onPressPolicy()}}>
                  <Text
                    style={{
                      fontSize: 13,
                      fontFamily: AppFonts.Regular,
                      color: AppColor.PRIMARY,
                    }}
                  >
                    Privacy Policy
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
  )
}

export default PrivacyPolicyView

const styles = StyleSheet.create({
     checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
})