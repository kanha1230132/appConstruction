import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AppFonts } from '../../../themes/AppFonts';
import { moderateScale } from 'react-native-size-matters';
import { AppColor } from '../../../themes/AppColor';

interface InvoiceHeaderViewProps {
  pressExcel: () => void;
  pressFilter: () => void;
}

const InvoiceHeaderView: React.FC<InvoiceHeaderViewProps> = ({pressExcel,pressFilter}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Invoicing</Text>

      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.iconButton} onPress ={pressExcel}>
          <MaterialCommunityIcons name="microsoft-excel" size={25} color="#2E7D32" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton} onPress={pressFilter}>
          <MaterialCommunityIcons name="filter-variant" size={25} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default InvoiceHeaderView;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  title: {
    fontSize: moderateScale(20),
    fontFamily:AppFonts.Regular,
    color:AppColor.PRIMARY
  },
  iconContainer: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 16,
  },
});
