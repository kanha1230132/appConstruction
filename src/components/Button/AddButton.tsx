import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FAB } from 'react-native-paper'
import { AppColor } from '../../themes/AppColor'

interface AddButtonProps {
onPress: () => void
}

const AddButton: React.FC<AddButtonProps> = ({onPress}) => {
  return (
    <FAB
          icon="plus"
          style={styles.fab}
          onPress={() => onPress()}
          color={AppColor.WHITE}
        />
  )
}

export default AddButton

const styles = StyleSheet.create({
     fab: {
    position: "absolute",
    margin: 20,
    right: 7,
    bottom: 7,
    backgroundColor: AppColor.PRIMARY,
    color: AppColor.WHITE,
    borderRadius: 100,
  },
})