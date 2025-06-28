import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native-paper'
import { AppColor } from '../../themes/AppColor'
import { TextStyle } from 'react-native'

interface LoadingTextProps {
    isLoading: boolean,
    text: string,
    style?:TextStyle
}

const LoadingText: React.FC<LoadingTextProps> = ({isLoading, text,style}) => {
  return (
    <>
        {
            isLoading ?
            <ActivityIndicator size={20} color={AppColor.PRIMARY} />
            :                <Text style={style}>{text}</Text>

        }

    </>
  )
}

export default LoadingText

const styles = StyleSheet.create({})