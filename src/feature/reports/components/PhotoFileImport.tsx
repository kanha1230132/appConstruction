import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CustomText from '../../../components/CustomText/CustomText';
import { AppColor } from '../../../themes/AppColor';
import { moderateScale } from 'react-native-size-matters';

interface PhotoFileImportProps {onPress: () => void}

const PhotoFileImport: React.FC<PhotoFileImportProps> = ({onPress}) => {
  return (
    <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginVertical: 10,
                width: "100%",
                alignSelf: "center",
              }}
            >
              <CustomText title="Images from Photo Files" />
              <TouchableOpacity
                style={{
                  width: 100,
                  backgroundColor: AppColor.PRIMARY,
                  paddingVertical: 4,
                  borderRadius: 5,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={onPress}
              >
                <CustomText
                  fontSize={moderateScale(12)}
                  title={"Import"}
                  color={AppColor.WHITE}
                />
              </TouchableOpacity>
            </View>
  )
}

export default PhotoFileImport

const styles = StyleSheet.create({})