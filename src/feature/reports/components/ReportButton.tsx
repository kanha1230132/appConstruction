import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AppColor } from '../../../themes/AppColor'
import Ionicons from 'react-native-vector-icons/MaterialIcons'
import { AppFonts } from '../../../themes/AppFonts'
import { moderateScale } from 'react-native-size-matters'

interface ReportButtonProps {
onPress:()=>void,
title:string
}

const ReportButton: React.FC<ReportButtonProps> = ({onPress,title}) => {
  return (
   	<TouchableOpacity
						style={styles.entryButtonModifiedLarge}
						onPress={onPress}
					>
						<Text style={styles.entryButtonTextModified}>{title}</Text>
						<Ionicons name="chevron-right" size={25} color={AppColor.PRIMARY} />
					</TouchableOpacity>
  )
}

export default ReportButton

const styles = StyleSheet.create({
    entryButtonModifiedLarge: {
        width:'100%',
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: AppColor.WHITE,
		paddingVertical: moderateScale(12),
		paddingHorizontal: 20,
		borderRadius: 10,
		marginBottom: 20,
		borderWidth: 0.4,
		borderColor: '#00000030',
		elevation:1,
	},
	entryButtonTextModified: {
		fontSize: moderateScale(16),
		fontFamily: AppFonts.Regular,
		color: AppColor.BLACK,
	},
})