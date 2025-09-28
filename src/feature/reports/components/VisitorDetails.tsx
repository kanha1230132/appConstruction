import React, { useState, useEffect, useCallback, memo } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  TextInput as RNTextInput,
} from "react-native";
import {
  Text,
  IconButton,
  Button,
  Card,
  Portal,
  Modal,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import CustomTextInput from "../../../components/CustomTextInput/CustomTextInput";
import { AppFonts } from "../../../themes/AppFonts";
import { AppColor } from "../../../themes/AppColor";
import CustomText from "../../../components/CustomText/CustomText";
import { moderateScale } from "react-native-size-matters";

export interface Visitor {
  visitorName: string;
  company: string;
  quantity: string;
  hours: string;
  totalHours: string;
}

interface VisitorDetailsProps {
  dailyEntry: any;
  setDailyEntry: React.Dispatch<React.SetStateAction<any>>;
}

const VisitorDetails: React.FC<VisitorDetailsProps> = ({
  dailyEntry,
  setDailyEntry,
}) => {
  const navigation = useNavigation();

  const [visitors, setVisitors] = useState<Visitor[]>(() =>
    dailyEntry.visitors?.length > 0
      ? dailyEntry.visitors
      : [
          {
            visitorName: "",
            company: "",
            quantity: "",
            hours: "",
            totalHours: "",
          },
        ]
  );

  const [modalVisible, setModalVisible] = useState(false);
  const [currentPicker, setCurrentPicker] = useState<{
    visitorIndex: number | null;
    field: keyof Visitor | null;
  }>({
    visitorIndex: null,
    field: null,
  });

  useEffect(() => {
    setDailyEntry(visitors);
  }, [visitors]);

  const updateVisitor = useCallback(
    (index: number, field: keyof Visitor, value: string) => {
      setVisitors((prev) => {
        const updated = [...prev];
        const visitor = { ...updated[index], [field]: value };

        if (field === "quantity" || field === "hours") {
          const qty = parseInt(visitor.quantity || "0", 10);
          const hrs = parseInt(visitor.hours || "0", 10);
          visitor.totalHours = (
            !isNaN(qty) && !isNaN(hrs) ? qty * hrs : ""
          ).toString();
        }

        updated[index] = visitor;
        return updated;
      });
    },
    []
  );

  const addVisitor = () => {
    setVisitors((prev) => [
      ...prev,
      { visitorName: "", company: "", quantity: "", hours: "", totalHours: "" },
    ]);
  };

  const removeVisitor = (index: number) => {
    setVisitors((prev) => prev.filter((_, i) => i !== index));
  };

  const openPicker = (visitorIndex: number, field: keyof Visitor) => {
    setCurrentPicker({ visitorIndex, field });
    setModalVisible(true);
  };

  const selectValue = (value: number) => {
    if (currentPicker.visitorIndex !== null && currentPicker.field) {
      updateVisitor(
        currentPicker.visitorIndex,
        currentPicker.field,
        value.toString()
      );
    }
    setModalVisible(false);
  };

  const renderVisitor = useCallback(
    ({ item, index }: { item: Visitor; index: number }) => (
      <Card key={index} style={styles.labourCard} mode="outlined">
        <Card.Content>
          <CustomText title={"Visitor - " + (index + 1)} />
          {index > 0 && (
            <IconButton
              icon="minus"
              size={moderateScale(10)}
              onPress={() => removeVisitor(index)}
              style={styles.deleteIcon}
              iconColor={AppColor.WHITE}
            />
          )}

          <CustomTextInput
            label="Visitor Name/Role"
            textValue={item.visitorName}
            onChangeTextValue={(text) =>
              updateVisitor(index, "visitorName", text)
            }
          />

          <CustomTextInput
            label="Visitor's Company"
            textValue={item.company}
            onChangeTextValue={(text) => updateVisitor(index, "company", text)}
          />

          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => openPicker(index, "quantity")}
              style={styles.touchableInput}
            >
              <CustomTextInput
                label={"Quantity"}
                textValue={item.quantity}
                editable={false}
                pointerEvents="none"
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => openPicker(index, "hours")}
              style={styles.touchableInput}
            >
              <CustomTextInput
                label={"Hours"}
                textValue={item.hours}
                editable={false}
                pointerEvents="none"

              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.touchableInput} disabled>
              <CustomTextInput
                label={"Total Hours"}
                textValue={item.totalHours}
                editable={false}
              />
            </TouchableOpacity>
          </View>
        </Card.Content>
      </Card>
    ),
    [updateVisitor]
  );

  return (
    <View style={{ marginBottom: 100 }}>
      <Text style={styles.sectionTitle}>Worked Visited By</Text>

      <FlatList
        data={visitors}
        renderItem={renderVisitor}
        keyExtractor={(_, i) => i.toString()}
        scrollEnabled={false}
      />

      <Button
        textColor={AppColor.WHITE}
        mode="outlined"
        icon="plus"
        onPress={addVisitor}
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
            data={Array.from({ length: 25 }, (_, i) => i + 1)}
            keyExtractor={(item) => item.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => selectValue(item)}
              >
                <Text style={styles.modalItemText}>{item}</Text>
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

export default VisitorDetails;

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Roboto",
    color: AppColor.PRIMARY,
    marginBottom: 15,
    fontWeight: "bold",
  },
  visitorBox: {
    borderWidth: 1,
    borderColor: "#d3d3d3",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    backgroundColor: AppColor.WHITE,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  visitorLabel: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
    fontWeight: "500",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  flexGrow: {
    flex: 1,
  },
  inputGroup: {
    flex: 1,
    marginHorizontal: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: AppColor.BLACK,
    borderRadius: 8,
    padding: 10,
    backgroundColor: AppColor.WHITE,
    color: AppColor.BLACK,
  },
  label: {
    fontSize: 14,
    fontFamily: AppFonts.Medium,
    color: "#333",
    marginBottom: 4,
  },
  addButtonContainerRight: {
    alignItems: "flex-end",
    marginTop: 10,
  },
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: AppColor.BLACK,
  },
  modal: {
    backgroundColor: "white",
    padding: 20,
    marginHorizontal: 30,
    borderRadius: 10,
    maxHeight: 300,
  },
  modalItem: {
    paddingVertical: 8,
  },
  modalItemText: {
    fontSize: 16,
    fontFamily: AppFonts.Medium,
    textAlign: "center",
    color: AppColor.BLACK
  },
  labourCard: {
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  touchableInput: {
    flex: 1,
    marginRight: 6,
  },
});
