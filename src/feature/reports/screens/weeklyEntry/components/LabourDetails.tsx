import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Divider, List } from 'react-native-paper';
import { AppColor } from '../../../../../themes/AppColor';
import { AppFonts } from '../../../../../themes/AppFonts';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { LabourDetail } from '../../../../../utils/interface';
import { Labour2 } from '../../../../../api/apiInterface';

interface LabourDetailsProps {
  labourList: Labour2[];
}

const LabourDetails = ({labourList}: LabourDetailsProps) => {
  console.log("labourList: ", labourList)
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {labourList?.map((contractor, index) => (
        <View key={index}>
          <List.Accordion
            title={contractor.contractorName}
            titleStyle={styles.contractorName}
            style={styles.accordion}
            left={props => <MaterialIcons {...props} size={25} color={AppColor.PRIMARY} name="engineering" />}
          >
            {contractor?.roles?.map((role, roleIndex) => (
              <View key={roleIndex} style={styles.roleContainer}>
                <Text style={styles.roleName}>{role.roleName}</Text>
                
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Quantity:</Text>
                  <Text style={styles.detailValue}>{role.quantity}</Text>
                </View>
                
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Number of Hours:</Text>
                  <Text style={styles.detailValue}>{role.hours}</Text>
                </View>
                
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Total Hours:</Text>
                  <Text style={[styles.detailValue, styles.totalHours]}>
                    {role.totalHours}
                  </Text>
                </View>
                
                {roleIndex < contractor.roles.length - 1 && (
                  <Divider style={styles.roleDivider} />
                )}
              </View>
            ))}
          </List.Accordion>
          <Divider style={styles.contractorDivider} />
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
});

export default LabourDetails;