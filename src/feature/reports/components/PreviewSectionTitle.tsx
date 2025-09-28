import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { AppColor } from '../../../themes/AppColor'
import { AppFonts } from '../../../themes/AppFonts'
import { moderateScale } from 'react-native-size-matters'
import CustomText from '../../../components/CustomText/CustomText'

interface PreviewSectionTitleProps {
  title: string
  iconName?: string
}

const PreviewSectionTitle = ({ title ,iconName}: PreviewSectionTitleProps) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginBottom: 10,
      }}
    >
      <MaterialIcons
        name={iconName ? iconName : "description"}
        size={24}
        color={AppColor.PRIMARY}
      />
      <CustomText
        color={AppColor.BLACK}
        fontSize={moderateScale(16)}
        fontFamily={AppFonts.Bold}
        title={title}
      />
    </View>
  )
}

export default PreviewSectionTitle

const styles = StyleSheet.create({})