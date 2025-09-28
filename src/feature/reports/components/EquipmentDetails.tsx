import React, { useState, useEffect, useCallback } from "react";
import { View, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import {
  Text,
  TextInput,
  Button,
  Modal,
  Portal,
  IconButton,
  Card,
} from "react-native-paper";
import { moderateScale } from "react-native-size-matters";
import { AppColor } from "../../../themes/AppColor";
import CustomButton from "../../../components/Button/CustomButton";
import CustomTextInput from "../../../components/CustomTextInput/CustomTextInput";
import CustomText from "../../../components/CustomText/CustomText";
import { Constants } from "../../../constants/constants";

export interface Equipment {
  id: number;
  equipment_name: string;
  quantity: string;
  hours: string;
  totalHours: string;
}

interface EquipmentDetailsProps {
  dailyEntry: { equipments: Equipment[] };
  setDailyEntry: (entry: any) => void;
}

const EquipmentDetails: React.FC<EquipmentDetailsProps> = ({
  dailyEntry,
  setDailyEntry,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentPicker, setCurrentPicker] = useState<"quantity" | "hours" | "">(
    ""
  );
  const [currentEquipmentIndex, setCurrentEquipmentIndex] = useState<
    number | null
  >(null);
  const [equipments, setEquipments] = useState<Equipment[]>(
    dailyEntry.equipments?.length
      ? dailyEntry.equipments
      : [{ id: 1, equipment_name: "", quantity: "", hours: "", totalHours: "" }]
  );

  useEffect(() => {
    setDailyEntry(equipments);
  }, [equipments]);

  const calculateTotalHours = (quantity: string, hours: string) => {
    const q = parseFloat(quantity);
    const h = parseFloat(hours);
    return !isNaN(q) && !isNaN(h) ? (q * h).toString() : "";
  };

  const openPicker = (type: "quantity" | "hours", index: number) => {
    setCurrentPicker(type);
    setCurrentEquipmentIndex(index);
    setModalVisible(true);
  };

  const selectValue = useCallback(
    (value: string) => {
      if (currentEquipmentIndex !== null && currentPicker) {
        setEquipments((prev) =>
          prev.map((eq, i) =>
            i === currentEquipmentIndex
              ? {
                  ...eq,
                  [currentPicker]: value,
                  totalHours: calculateTotalHours(
                    currentPicker === "quantity" ? value : eq.quantity,
                    currentPicker === "hours" ? value : eq.hours
                  ),
                }
              : eq
          )
        );
      }
      setModalVisible(false);
    },
    [currentEquipmentIndex, currentPicker]
  );

  const addNewEquipment = () => {
    setEquipments((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        equipment_name: "",
        quantity: "",
        hours: "",
        totalHours: "",
      },
    ]);
  };

  const removeEquipment = (id: number) => {
    setEquipments((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <View style={{ marginBottom: 100 }}>
      {equipments.map((equipment, index) => (
        <Card key={equipment.id} style={styles.card} mode="outlined">
          <Card.Content>
            {index > 0 && (
              <IconButton
                icon="minus"
                onPress={() => removeEquipment(equipment.id)}
                style={styles.deleteIcon}
                iconColor={AppColor.WHITE}
                size={moderateScale(10)}
              />
            )}
            <CustomText title={"Equipment - " + (index + 1)} />
            <CustomTextInput
              label={"Equipment Name/Make/Model"}
              textValue={equipment.equipment_name}
              onChangeText={(text) =>
                setEquipments((prev) =>
                  prev.map((eq, i) =>
                    i === index ? { ...eq, equipment_name: text } : eq
                  )
                )
              }
            />

            <View style={styles.row}>
              <TouchableOpacity
                style={styles.touchableInput}
                onPress={() => openPicker("quantity", index)}
              >
                <CustomTextInput
                  label={"Quantity"}
                  textValue={equipment.quantity}
                  editable={false}
                  pointerEvents="none"

                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.touchableInput}
                onPress={() => openPicker("hours", index)}
              >
                <CustomTextInput
                  label={"Hours"}
                  textValue={equipment.hours}
                  editable={false}
                  pointerEvents="none"

                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.touchableInput} disabled>
                <CustomTextInput
                  label={"Total Hours"}
                  textValue={equipment.totalHours}
                  editable={false}
                />
              </TouchableOpacity>
            </View>
          </Card.Content>
        </Card>
      ))}

      <Button
        textColor={AppColor.WHITE}
        mode="outlined"
        icon="plus"
        onPress={addNewEquipment}
        style={{
          width: "40%",
          marginTop: 8,
          borderRadius: 6,
          backgroundColor: AppColor.PRIMARY,
          alignSelf: "flex-end",
        }}
      >
        Add More
      </Button>

      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={() => setModalVisible(false)}
          contentContainerStyle={styles.modal}
        >
          <FlatList
            data={Array.from({ length: 25 }, (_, i) => (i + 1).toString())}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => selectValue(item)}>
                <Text style={styles.modalItem}>{item}</Text>
              </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={false}
          />
          <Button labelStyle={{color:AppColor.WHITE,fontSize:moderateScale(14)}} style={{
                    marginTop: 10,
                    backgroundColor: AppColor.PRIMARY,
                    borderRadius: 6,
                    
                  }} onPress={() => setModalVisible(false)} mode="text">
                    Close
                  </Button>
        </Modal>
      </Portal>
    </View>
  );
};

export default EquipmentDetails;

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    position: "relative",
    backgroundColor: AppColor.WHITE,
    borderRadius: 6,
  },
  deleteIcon: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: AppColor.REJECT
  },
  input: {
    marginTop: 8,
    backgroundColor: "white",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  touchableInput: {
    flex: 1,
    marginRight: 6,
  },
  smallInput: {
    backgroundColor: "white",
    flex: 1,
  },
  modal: {
    backgroundColor: "white",
    padding: 20,
    marginHorizontal: 30,
    borderRadius: 10,
    height: Constants.ScreenHeight / 2,
  },
  modalItem: {
    fontSize: moderateScale(16),
    padding: 10,
    textAlign: "center",
    color: AppColor.BLACK
  },
});
