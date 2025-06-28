import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppColor } from '../../themes/AppColor'
import { AppFonts } from '../../themes/AppFonts'

interface NotFoundTextProps {
    message: string
}

const NotFoundText: React.FC<NotFoundTextProps> = ({message}) => {
  return (
   <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Text style={{
        color:AppColor.BLACK,
        fontSize:16,
        fontFamily:AppFonts.Regular
      }}>{message}</Text>
    </View>
  )
}

export default NotFoundText

const styles = StyleSheet.create({})