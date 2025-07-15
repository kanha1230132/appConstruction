import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Modal, Portal } from "react-native-paper";
import { Constants } from "../../constants/constants";
import { moderateScale } from "react-native-size-matters";
import { AppColor } from "../../themes/AppColor";
import { AppFonts } from "../../themes/AppFonts";

interface ListSelectionModalProps {
  modalVisible: boolean;
  setModalVisible: (v: boolean) => void;
  List: { label: string; value: string }[];
  handleSelect: (v: string) => void
}

const ListSelectionModal: React.FC<ListSelectionModalProps> = ({
  modalVisible,
  setModalVisible,
  List,
  handleSelect
}) => {
  return (
    <Portal>

    <Modal style={{
        flex:1,
          backgroundColor: "rgba(0,0,0,0.5)",

    }} visible={modalVisible} onDismiss={() => setModalVisible(false)}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "80%",
            maxHeight: Constants.ScreenHeight * 0.5,
            backgroundColor: AppColor.WHITE,
            borderRadius: 10,
            padding: 20,
          }}
        >
          <FlatList
            data={List}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  paddingVertical: 15,
                  borderBottomWidth: 1,
                  borderBottomColor: "#ccc",
                }}

                onPress={() => handleSelect(item.value)}
              >
                <Text
                  style={{
                    fontSize: moderateScale(16),
                    color: AppColor.BLACK,
                    fontFamily:AppFonts.Regular
                  }}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            )}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </View>
      </View>
    </Modal>
    </Portal>

  );
};

export default ListSelectionModal;

const styles = StyleSheet.create({});
