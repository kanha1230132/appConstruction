import { Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppColor } from '../../themes/AppColor';
import CustomButton from './CustomButton';

interface NextPreviewButtonProps {
    ActiveTab:number,
    clickOnPrevious:()=>void,
    clickOnNext:()=>void,
    size:number
}

const NextPreviewButton: React.FC<NextPreviewButtonProps> = ({ActiveTab,clickOnPrevious,clickOnNext,size}) => {
  return (
 <View style={[styles.buttonContainer, { gap: 10 }]}>
        {ActiveTab > 1 ? (
          <View style={{ flex: 1, height: 50 }}>
            <CustomButton
              title="Previous"
              onPress={clickOnPrevious}
            />
          </View>
        ) : null}

        <View style={{ flex: 1, height: 50 }}>
          <CustomButton
            title={ActiveTab == size ? "Preview" : "Next"}
            onPress={clickOnNext}
          />
        </View>
      </View>
  )
}

export default NextPreviewButton

const styles = StyleSheet.create({
     buttonContainer: {
        width: "100%",
        alignSelf: "center",
        position: "absolute",
        bottom: 0,
        borderRadius: 8,
        justifyContent: "center",
        flexDirection: "row",
        paddingTop: 5,
        paddingHorizontal: Platform.OS === "ios" ? "4%" : "2%",
        backgroundColor: AppColor.WHITE,
        paddingBottom: Platform.OS === "ios" ? 35 : 15,
      },
})