import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppColor } from '../../themes/AppColor'


const Divider: React.FC = () => {
  return (
    <View style={{
      width:'100%',
      height:1,
      backgroundColor:AppColor.LIGHT_GRAY,
      marginVertical:7
    }} />
      
  )
}

export default Divider

const styles = StyleSheet.create({})