import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native-paper'
import { AppColor } from '../../themes/AppColor'


interface ActivityLoaderProps {

}

const ActivityLoader: React.FC<ActivityLoaderProps> = () => {
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <ActivityIndicator color={AppColor.PRIMARY} />
    </View>
  )
}

export default ActivityLoader

const styles = StyleSheet.create({})