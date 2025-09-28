import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, Divider, List } from "react-native-paper";
import { AppColor } from "../../../../../themes/AppColor";
import { AppFonts } from "../../../../../themes/AppFonts";
import { EquipmentDetail } from "../../../../../utils/interface";
import { Equipment } from "../../../../../api/apiInterface";

interface EquipmentDetailsProps {
  equipmentList: Equipment[];
}

const EquipmentDetails = ({ equipmentList }: EquipmentDetailsProps) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {equipmentList.map((equipment) => (
        <View key={equipment.id}>
          <List.Accordion
            title={equipment.equipment_name}
            titleStyle={styles.equipmentName}
            style={styles.accordion}
            left={(props) => (
              <List.Icon {...props} color={AppColor.PRIMARY} icon="tools" />
            )}
          >
            <View style={styles.detailsContainer}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Quantity:</Text>
                <Text style={styles.detailValue}>{equipment.quantity}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Hours:</Text>
                <Text style={styles.detailValue}>{equipment.hours}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Total Hours:</Text>
                <Text style={[styles.detailValue, styles.totalHours]}>
                  {equipment.totalHours}
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

export default EquipmentDetails;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: AppColor.WHITE,
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
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: AppColor.BLACK_70,
  },
  detailValue: {
    fontSize: 14,
    fontFamily: AppFonts.Medium,
    color: "#212121",
  },
  totalHours: {
    color: AppColor.PRIMARY,
    fontFamily: AppFonts.Bold,
  },
  itemDivider: {
    backgroundColor: "#e0e0e0",
    height: 1,
  },
  accordion: {
    backgroundColor: "#f5f5f5",
    marginVertical: 4,
    borderRadius: 4,
  },
});
