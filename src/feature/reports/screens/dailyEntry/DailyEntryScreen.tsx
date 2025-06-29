import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { DailyEntryScreenProps } from '../../../../types/navigation';
import { SafeAreaWrapper } from '../../../../components/SafeAreaWrapper/SafeAreaWrapper'
import HeaderWithBackButton from '../../../../components/Button/HeaderWithBackButton'
import { goBack } from '../../../../utils/NavigationUtil'
import { AppText } from '../../../../constants/appText';

const DailyEntryScreen: React.FC<DailyEntryScreenProps> = () => {
  return (
    <>
      <SafeAreaWrapper>
        <HeaderWithBackButton
          title={AppText.DailyEntry}
          onBackClick={() => goBack()}
          customStyle={undefined}
        />
        </SafeAreaWrapper>
        </>
  );
};

export default DailyEntryScreen

const styles = StyleSheet.create({})