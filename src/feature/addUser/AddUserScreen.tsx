import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AddUserScreenProps } from '../../types/navigation'
import { SafeAreaWrapper } from '../../components/SafeAreaWrapper/SafeAreaWrapper'
import HeaderWithBackButton from '../../components/Button/HeaderWithBackButton'
import { goBack } from '../../utils/NavigationUtil'

const AddUserScreen: React.FC<AddUserScreenProps> = () => {
  return (
      <>
          <SafeAreaWrapper>

             <HeaderWithBackButton
          title={'Add User'}
          onBackClick={() => goBack()}
          customStyle={undefined}
        />

            </SafeAreaWrapper>
      </>
  )
}

export default AddUserScreen

const styles = StyleSheet.create({})