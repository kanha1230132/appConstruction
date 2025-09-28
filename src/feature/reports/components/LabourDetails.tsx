import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Text,  Modal, Portal, Button, IconButton, Card } from "react-native-paper";
import CustomTextInput from "../../../components/CustomTextInput/CustomTextInput";
import { AppColor } from "../../../themes/AppColor";
import CustomText from "../../../components/CustomText/CustomText";
import { moderateScale } from "react-native-size-matters";
import { Constants } from "../../../constants/constants";

interface Role {
  roleName: string;
  quantity: string;
  hours: string;
  totalHours: string;
}

export interface Labour {
  contractorName: string;
  roles: Role[];
}

interface Props {
  dailyEntry: {
    labours?: Labour[];
    [key: string]: any;
  };
  setDailyEntry: React.Dispatch<React.SetStateAction<any>>;
}

const LabourDetails: React.FC<Props> = ({ dailyEntry, setDailyEntry }) => {
  const [labours, setLabours] = useState<Labour[]>(() =>
    dailyEntry.labours?.length
      ? dailyEntry.labours
      : [{ contractorName: "", roles: [{ roleName: "", quantity: "", hours: "", totalHours: "" }] }]
  );

  const [modalVisible, setModalVisible] = useState(false);
  const [currentPicker, setCurrentPicker] = useState<{
    labourIndex: number | null;
    roleIndex: number | null;
    field: "quantity" | "hours" | null;
  }>({ labourIndex: null, roleIndex: null, field: null });

  useEffect(() => {
    setDailyEntry(labours);
  }, [labours]);

  const calculateTotalHours = (quantity: string, hours: string) => {
    const q = parseFloat(quantity);
    const h = parseFloat(hours);
    return !isNaN(q) && !isNaN(h) ? (q * h).toString() : "";
  };

  const updateLabour = useCallback(
    (labourIndex: number, roleIndex: number, field: keyof Role, value: string) => {

      setLabours((prev) =>
        prev.map((labour, i) =>
          i === labourIndex
            ? {
                ...labour,
                roles: labour.roles.map((role, j) =>
                  j === roleIndex
                    ? {
                        ...role,
                        [field]: value,
                        totalHours:
                          field === "quantity" || field === "hours"
                            ? calculateTotalHours(
                                field === "quantity" ? value : role.quantity,
                                field === "hours" ? value : role.hours
                              )
                            : role.totalHours,
                      }
                    : role
                ),
              }
            : labour
        )
      );
    },
    []
  );

  const updateContractorName = (index: number, value: string) => {
    setLabours((prev) =>
      prev.map((labour, i) => (i === index ? { ...labour, contractorName: value } : labour))
    );
  };

  const addNewLabour = () =>
    setLabours((prev) => [...prev, { contractorName: "", roles: [{ roleName: "", quantity: "", hours: "", totalHours: "" }] }]);

  const removeLabour = (index: number) =>
    setLabours((prev) => prev.filter((_, i) => i !== index));

  const addNewRole = (labourIndex: number) =>
    setLabours((prev) =>
      prev.map((labour, i) =>
        i === labourIndex
          ? {
              ...labour,
              roles: [...labour.roles, { roleName: "", quantity: "", hours: "", totalHours: "" }],
            }
          : labour
      )
    );

  const removeRole = (labourIndex: number, roleIndex: number) =>
    setLabours((prev) =>
      prev.map((labour, i) =>
        i === labourIndex
          ? {
              ...labour,
              roles: labour.roles.filter((_, j) => j !== roleIndex),
            }
          : labour
      )
    );

  const openPicker = (labourIndex: number, roleIndex: number, field: "quantity" | "hours") => {
    setCurrentPicker({ labourIndex, roleIndex, field });
    setModalVisible(true);
  };

  const selectValue = (value: number) => {
    const { labourIndex, roleIndex, field } = currentPicker;
    if (labourIndex !== null && roleIndex !== null && field) {
      updateLabour(labourIndex, roleIndex, field, value.toString());
    }
    setModalVisible(false);
  };

  const renderModal = () => (
    <Portal>
      <Modal visible={modalVisible} onDismiss={() => setModalVisible(false)} contentContainerStyle={styles.modal}>
        <FlatList
          data={Array.from({ length: 25 }, (_, i) => i + 1)}
          keyExtractor={(item) => item.toString()}
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
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
        {labours.map((labour, labourIndex) => (
          <Card key={labourIndex} style={styles.labourCard}  mode="outlined">
            <Card.Content>
                <CustomText title={"Labour - "+(labourIndex + 1)} />
   {labourIndex > 0 && (

                 <IconButton
                                icon="minus"
                               size={moderateScale(10)}
                                onPress={() => removeLabour(labourIndex)}
                                style={styles.deleteIcon}
                                iconColor={AppColor.WHITE}
                              />
              )}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ flex: 1 }}>
                <CustomTextInput
                  label="Contractor Name"
                  textValue={labour.contractorName}
                  onChangeTextValue={(text) => updateContractorName(labourIndex, text)}
                />
              </View>
           
            </View>

            {labour.roles.map((role, roleIndex) => (
              <View key={roleIndex} style={{}}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View style={{width:roleIndex == 0 ? "90%" : "80%"}}>
                      <CustomTextInput
                        label="Role/Name"
                        textValue={role.roleName}
                        onChangeText={(text) => updateLabour(labourIndex, roleIndex, "roleName", text)}
                      />
                    </View>
                    <View style={{ flex: 1 }}>
                           <IconButton
                                icon="plus"
                                size={14}
                                onPress={() => addNewRole(labourIndex)}
                                style={[
                                  {
    backgroundColor: AppColor.PRIMARY,

                                  }
                                ]}
                                iconColor={AppColor.WHITE}
                              />
                    </View>
                    {
                      roleIndex != 0 && (
                        <View style={{ flex: 1 }}>
                           <IconButton
                                icon="minus"
                                size={15}
                                onPress={() => removeRole(labourIndex,roleIndex)}
                                style={[
                                  {
                                    backgroundColor: AppColor.REJECT,
                                  }
                                ]}
                                iconColor={AppColor.WHITE}
                              />
                    </View>
                      )
                    }

                     
                  </View>
                
            

                <View style={styles.row}>
                  <TouchableOpacity onPress={() => openPicker(labourIndex, roleIndex, "quantity")} style={styles.touchableInput}>
                     <CustomTextInput
                  label={"Quantity"}
                  textValue={role.quantity}
                  editable={false}
                  pointerEvents="none"
                />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => openPicker(labourIndex, roleIndex, "hours")} style={styles.touchableInput}>
                       <CustomTextInput
                  label={"Hours"}
                  textValue={role.hours}
                  editable={false}
                  pointerEvents="none"
                />
                  </TouchableOpacity>
                    <TouchableOpacity style={styles.touchableInput} disabled>
                <CustomTextInput
                  label={"Total Hours"}
                  textValue={role.totalHours}
                  editable={false}
                />
              </TouchableOpacity>

                
                </View>
               
              </View>
            ))}
            </Card.Content>

          </Card>
        ))}

    
        <Button
                textColor={AppColor.WHITE}
                mode="outlined"
                icon="plus"
                onPress={addNewLabour}
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

      {renderModal()}
    </KeyboardAvoidingView>
  );
};

export default LabourDetails;

const styles = StyleSheet.create({
  labourCard: {
   marginBottom: 16,
    position: "relative",
    backgroundColor: AppColor.WHITE,
    borderRadius: 6,
    
  },
  textInput: {
    marginVertical: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    flex: 1,
    marginRight: 8,
  },
  modal: {
    backgroundColor: "white",
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
    height: Constants.ScreenHeight / 2,
    

  },
  modalItem: {
    fontSize: 18,
    paddingVertical: 8,
    textAlign: "center",
    color: AppColor.BLACK
  },
    touchableInput: {
    flex: 1,
    marginRight: 6,
  },
    deleteIcon: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: AppColor.REJECT,
  },
});
