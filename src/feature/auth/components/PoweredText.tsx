import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AppFonts } from '../../../themes/AppFonts'

interface PoweredTextProps {

}

const PoweredText: React.FC<PoweredTextProps> = () => {
  return (
   <View style={styles.footerContainer}>
        <Text style={styles.footerText}>Powered by</Text>
        <TouchableOpacity>
          <Text style={styles.companyLink}>Kusiar Project Services Inc.</Text>
        </TouchableOpacity>
      </View>
  )
}

export default PoweredText

const styles = StyleSheet.create({
      footerContainer: {
        width:'100%',
        position: 'absolute',
        bottom: 20,
        alignItems: 'center',
        marginHorizontal:'auto'
      },
      footerText: {
        textAlign: 'center',
        fontSize: 14,
        color: '#707070',
        fontFamily: AppFonts.Medium,
      },
      companyLink: {
        textAlign: 'center',
        fontSize: 14,
        color: '#486ECD',
        textDecorationLine: 'underline',
        fontFamily: AppFonts.Medium,
      },
})