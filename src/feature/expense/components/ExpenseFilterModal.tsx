import React, { useState } from 'react';
import { View, Text,TouchableOpacity, StyleSheet } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AppColor } from '../../../themes/AppColor';
import { AppFonts } from '../../../themes/AppFonts';
import { expenseFilterTypes } from '../ExpenseScreen';
import { Modal, Portal } from 'react-native-paper';
interface ExpenseFilterModalProps {
    onClose: () => void;
    onApply: (filterType: string) => void;
    projects: Array<any>;
    SelectedFilterType: string;
    show: boolean
}

const ExpenseFilterModal = ({
  show,
  onClose,
  onApply,
  projects,
  SelectedFilterType,
}: ExpenseFilterModalProps) => {
  return (
    <Portal>
      <Modal style={{
        justifyContent: "flex-start",

      }} visible={show}>
        <View style={styles.overlay}>
          <View style={styles.popup}>
            {/* Close Button */}
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <MaterialIcons name="cancel" size={28} color="red" />
            </TouchableOpacity>

            {/* Title */}
            <Text style={styles.title}>Filter by</Text>

            <TouchableOpacity
              onPress={() => onApply(expenseFilterTypes.All)}
              style={{
                backgroundColor:
                  SelectedFilterType == expenseFilterTypes.All
                    ? "#00000005"
                    : AppColor.WHITE,
                marginTop: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  color: AppColor.BLACK,
                  fontFamily: AppFonts.Regular,
                  borderRadius: 6,
                  paddingLeft: 10,
                  paddingVertical: 5,
                }}
              >
                All
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => onApply(expenseFilterTypes.Pending)}
              style={{
                backgroundColor:
                  SelectedFilterType == expenseFilterTypes.Pending
                    ? "#00000005"
                    : AppColor.WHITE,

                marginTop: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  color: AppColor.BLACK,
                  fontFamily: AppFonts.Regular,
                  borderRadius: 6,
                  paddingLeft: 10,
                  paddingVertical: 5,
                }}
              >
                Pending
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => onApply(expenseFilterTypes.Rejected)}
              style={{
                backgroundColor:
                  SelectedFilterType == expenseFilterTypes.Rejected
                    ? "#00000005"
                    : AppColor.WHITE,

                marginTop: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  color: AppColor.BLACK,
                  fontFamily: AppFonts.Regular,
                  borderRadius: 6,
                  paddingLeft: 10,
                  paddingVertical: 5,
                }}
              >
                Rejected
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => onApply(expenseFilterTypes.Approved)}
              style={{
                backgroundColor:
                  SelectedFilterType == expenseFilterTypes.Approved
                    ? "#00000005"
                    : AppColor.WHITE,

                marginTop: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  color: AppColor.BLACK,
                  fontFamily: AppFonts.Regular,
                  borderRadius: 6,
                  paddingLeft: 10,
                  paddingVertical: 5,
                }}
              >
                Approved
              </Text>
            </TouchableOpacity>

            {/* <TouchableOpacity
              onPress={() => onApply(expenseFilterTypes.DateFilter)}
              style={{
                backgroundColor:
                  SelectedFilterType == expenseFilterTypes.DateFilter
                    ? "#00000005"
                    : AppColor.WHITE,

                marginTop: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  color: AppColor.BLACK,
                  fontFamily: AppFonts.Regular,
                  borderRadius: 6,
                  paddingLeft: 10,
                  paddingVertical: 5,
                }}
              >
                By Date
              </Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

export default ExpenseFilterModal

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        position: "relative",

    },
    popup: {
        width: '50%',
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        position: 'absolute',
        top: 50,
        right: 15
        
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
    },
    closeButton: { position: "absolute", right: 5, top: 5,zIndex:2},
    closeText: { fontSize: 18, color: "black",fontFamily:AppFonts.Medium },
    title: { fontSize: 18, fontFamily:AppFonts.Medium, marginBottom: 10, color: "black", textAlign: 'left' },
    applyButton: { width: '45%', backgroundColor: AppColor.PRIMARY, padding: 7, borderRadius: 5, alignItems: "center", marginTop: 20, alignSelf: 'center' },
    applyText: { color: "white", fontSize: 16, fontFamily:AppFonts.Medium },
    container: { width: "100%" },
    label: { fontSize: 14, fontFamily:AppFonts.Medium, marginBottom: 5 },
    dropdownButton: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#F5F5F5",
        padding: 15,
    },
    dropdownText: { fontSize: 16, color: "black" ,fontFamily:AppFonts.Medium},
    dropdownMenu: { backgroundColor: '#00000010', marginTop: 2 },
    dropdownItem: { padding: 15 },
    dropdownItemText: { color: AppColor.BLACK, fontSize: 16,fontFamily:AppFonts.Medium },
    dateInputContainer: {
        flexDirection: "row",
        alignItems: "center",
        height: 45,
        paddingHorizontal: 8,
        backgroundColor: "#fff",
    },
    dateInputText: {
        flex: 1,
        fontSize: 16,
        color: '#000',
        fontFamily:AppFonts.Medium
    },
    icon: {
        marginLeft: 8,
    },

})