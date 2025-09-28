import React, { useState } from "react";
import { View, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { Modal, Portal, Text, Button } from "react-native-paper";
import { moderateScale } from "react-native-size-matters";
import { AppColor } from "../../../themes/AppColor";
import { AppFonts } from "../../../themes/AppFonts";

interface Props {
  visible: boolean;
  onDismiss: () => void;
  onConfirm: (temp: string) => void;
  initialLow?: string;
  initialHigh?: string;
  selectionStep?: "low" | "high";
  temp?: string;
}

const temperatures = Array.from({ length: 141 }, (_, i) => `${i - 70}°C`);

const TemperatureSelectionModal: React.FC<Props> = ({
  visible,
  onDismiss,
  onConfirm,
  initialLow,
  initialHigh,
  selectionStep,
}) => {
  const [low, setLow] = useState<string | undefined>(initialLow);
  const [high, setHigh] = useState<string | undefined>(initialHigh);

  const renderItem = ({ item }: { item: string }) => {
    const isSelected = item === low || item === high;
    const isLow = item === low;
    const isHigh = item === high;

    return (
      <TouchableOpacity
        onPress={() => onConfirm(item)}
        style={[
          styles.tempItem,
          isSelected && styles.tempItemSelected,
          isLow && { backgroundColor: AppColor.APPROVE },
          isHigh && { backgroundColor: AppColor.REJECT },
        ]}
      >
        <Text style={[styles.tempText, isSelected && styles.tempTextSelected]}>
          {item} {isLow ? "(Low)" : isHigh ? "(High)" : ""}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modal}
      >
        <Text style={styles.header}>Select {selectionStep} Temperature</Text>
        <View style={[{ maxHeight: 200 }]}>
          <FlatList
             data={temperatures}
            keyExtractor={(item) => item}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            snapToInterval={40}
            decelerationRate="fast"
            getItemLayout={(_, index) => ({
              length: 40, // ⬅️ Must match tempItem height
              offset: 40 * index,
              index,
            })}
            initialScrollIndex={70}
          />
        </View>
        <TouchableOpacity onPress={onDismiss} style={styles.modalCloseButton}>
          <Text style={styles.modalCloseButtonText}>Close</Text>
        </TouchableOpacity>
      </Modal>
    </Portal>
  );
};

export default TemperatureSelectionModal;

const styles = StyleSheet.create({
  modal: {
    backgroundColor: AppColor.WHITE,
    margin: 20,
    borderRadius: 12,
    padding: 16,
    // maxHeight: "55%",
  },
  header: {
    fontSize: moderateScale(18),
    fontFamily: AppFonts.Medium,
    color: AppColor.PRIMARY,
    textAlign: "center",
    marginBottom: 4,
  },
  subHeader: {
    textAlign: "center",
    marginBottom: 12,
    fontFamily: AppFonts.Regular,
    color: AppColor.GREY_F9,
  },
  tempItem: {
  height: 40, // ⬅️ Must match FlatList getItemLayout length
  justifyContent: "center",
  alignItems: "center",
  paddingHorizontal: 16,
  borderBottomWidth: 1,
  borderBottomColor: "#ddd",
  },
  tempItemSelected: {
    backgroundColor: AppColor.PRIMARY,
  },
  tempText: {
    fontSize: moderateScale(14),
    fontFamily: AppFonts.Regular,
    color: AppColor.BLACK,
  },
  tempTextSelected: {
    color: AppColor.WHITE,
    fontFamily: AppFonts.Medium,
  },
  confirmButton: {
    marginTop: 16,
  },
  cancelButton: {
    marginTop: 10,
  },
  modalCloseButton: {
    marginTop: 20,
    backgroundColor: AppColor.PRIMARY,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
  },
  modalCloseButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontFamily: "Roboto",
  },
});
