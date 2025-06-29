import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { WeeklyEntryScreenProps } from '../../../../types/navigation'
import { SafeAreaWrapper } from '../../../../components/SafeAreaWrapper/SafeAreaWrapper'
import HeaderWithBackButton from '../../../../components/Button/HeaderWithBackButton'
import { goBack } from '../../../../utils/NavigationUtil'
import { AppText } from '../../../../constants/appText'

const WeeklyEntryScreen: React.FC<WeeklyEntryScreenProps> = () => {
  return (
      <>
      <SafeAreaWrapper>
        <HeaderWithBackButton
          title={AppText.WeeklyEntry}
          onBackClick={() => goBack()}
          customStyle={undefined}
        />
        </SafeAreaWrapper>
        </>
  )
}

export default WeeklyEntryScreen

const styles = StyleSheet.create({})