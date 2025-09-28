import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Divider, List } from 'react-native-paper';
import { AppColor } from '../../../../../themes/AppColor';
import { AppFonts } from '../../../../../themes/AppFonts';
import { Visitor } from '../../../../../api/apiInterface';



const VistorDetails = ({visitorList}: {visitorList: Visitor[]}) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {visitorList?.map((visitor, index) => (
         <View key={visitor.id}>
                 <List.Accordion
                   title={visitor.visitorName}
                   titleStyle={styles.equipmentName}
                   style={styles.accordion}
                   left={(props) => (
                     <List.Icon {...props} color={AppColor.PRIMARY} icon="tools" />
                   )}
                 >
                   <View style={styles.detailsContainer}>

                       <View style={styles.detailRow}>
                       <Text style={[styles.detailLabel,{fontFamily:AppFonts.Bold,color:AppColor.BLACK}]}>Company:</Text>
                       <Text style={styles.detailValue}>{visitor.company}</Text>
                     </View>
                     <View style={styles.detailRow}>
                       <Text style={styles.detailLabel}>Quantity:</Text>
                       <Text style={styles.detailValue}>{visitor.quantity}</Text>
                     </View>
                     <View style={styles.detailRow}>
                       <Text style={styles.detailLabel}>Hours:</Text>
                       <Text style={styles.detailValue}>{visitor.hours}</Text>
                     </View>
                     <View style={styles.detailRow}>
                       <Text style={styles.detailLabel}>Total Hours:</Text>
                       <Text style={[styles.detailValue, styles.totalHours]}>
                         {visitor.totalHours}
                       </Text>
                     </View>
                   </View>
                 </List.Accordion>
                 <Divider style={styles.itemDivider} />
               </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor:AppColor.WHITE,
  },
  header: {
    marginBottom: 8,
    color: '#3a3a3a',
    fontFamily:AppFonts.Medium
  },
  subHeader: {
    marginBottom: 16,
    color: '#3a3a3a',
   fontFamily:AppFonts.Medium
  },
  divider: {
    marginVertical: 8,
    backgroundColor: '#e0e0e0',
    height: 1,
  },
  accordion: {
    backgroundColor: AppColor.BLACK_10,
    marginVertical: 4,
    borderRadius: 4,
  },
  contractorName: {
    fontFamily:AppFonts.Bold,
    fontSize: 16,
    color:AppColor.BLACK
  },
  roleContainer: {
    padding: 16,
    backgroundColor: '#fafafa',
  },
  roleName: {
    fontSize: 15,
  fontFamily:AppFonts.Medium,
    color: AppColor.BLACK,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: AppColor.BLACK_70,
    fontFamily:AppFonts.Regular
  },
  detailValue: {
    fontSize: 14,
    fontFamily:AppFonts.Medium,
   color: AppColor.BLACK_70,
  },
  totalHours: {
    color: AppColor.PRIMARY,
    fontFamily:AppFonts.Bold,
  },
  roleDivider: {
    marginVertical: 12,
    backgroundColor: '#e0e0e0',
    height: 1,
  },
  contractorDivider: {
    backgroundColor: '#e0e0e0',
    height: 1,
  },
    equipmentName: {
    fontFamily: AppFonts.Bold,
    fontSize: 16,
    color: AppColor.BLACK,
  },
  detailsContainer: {
    padding: 16,
    backgroundColor: "#fafafa",
  },
    itemDivider: {
    backgroundColor: "#e0e0e0",
    height: 1,
  },
});

export default VistorDetails;