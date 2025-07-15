import { Image, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import React from 'react'

import Icon from 'react-native-vector-icons/Ionicons';
import { AppFonts } from '../../themes/AppFonts';
import { AppColor } from '../../themes/AppColor';
import { images } from '../../assets';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface HeaderWithBackButtonProps {
    title: string;
    onBackClick: () => void;
    customStyle?: ViewStyle;
    textFontSize?: number;
    showRightIcon?: boolean;
    showRightIcon2?: boolean;
    onClickRightIcon ?:()=> void 
    RightIcon?:string
    onClickRightIcon2 ?:()=> void 
    RightIcon2?:string
}

const HeaderWithBackButton = ({ title, onBackClick, customStyle, textFontSize = 18,onClickRightIcon,showRightIcon ,RightIcon,onClickRightIcon2,RightIcon2,showRightIcon2}: HeaderWithBackButtonProps) => {
    return (
        <View style={[styles.headerRow, customStyle]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
 <TouchableOpacity onPress={onBackClick}>
            <Icon name="arrow-back" size={24} color={AppColor.PRIMARY} />
            </TouchableOpacity>
            <Text style={[styles.header, { fontSize: textFontSize }]}>{title}</Text>
            </View>

            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap:20
            
            }}>
 {
                showRightIcon || RightIcon ? 
  <TouchableOpacity onPress={onClickRightIcon}>
            <Image source={RightIcon ? RightIcon : images.WATSAPP_SHARE} style={{width:30,height:30}} />
            </TouchableOpacity>

                : null
            }

             {
               showRightIcon2 || RightIcon2 ? 
  <TouchableOpacity onPress={onClickRightIcon2}>
             <Ionicons name={RightIcon2 ? RightIcon2 : "trash"} size={30} color={AppColor.REJECT}/>
            </TouchableOpacity>

                : null
             }
            </View>
            
           
         
         
  
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
        justifyContent:'space-between'
    },
})