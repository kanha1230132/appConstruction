import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import React from 'react'

import Icon from 'react-native-vector-icons/Ionicons';
import { AppFonts } from '../../themes/AppFonts';
import { AppColor } from '../../themes/AppColor';

interface HeaderWithBackButtonProps {
    title: string;
    onBackClick: () => void;
    customStyle?: ViewStyle;
    textFontSize?: number;
}

const HeaderWithBackButton = ({ title, onBackClick, customStyle, textFontSize = 18 }: HeaderWithBackButtonProps) => {
    return (
        <View style={[styles.headerRow, customStyle]}>
            <TouchableOpacity onPress={onBackClick}>
            <Icon name="arrow-back" size={24} color={AppColor.PRIMARY} />
            </TouchableOpacity>
            <Text style={[styles.header, { fontSize: textFontSize }]}>{title}</Text>
        </View>
    )
}

export default HeaderWithBackButton

const styles = StyleSheet.create({
    header: {
        fontFamily:AppFonts.Medium,
        color: AppColor.PRIMARY,
        marginLeft: 5,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
})