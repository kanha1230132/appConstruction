import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Modal, Text, Button, useTheme, Portal } from "react-native-paper";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AppFonts } from "../../../themes/AppFonts";
import { DateFormat } from "../../../utils/dateUtil";
import Dropdown from "./Dropdown";
import { SchedulesResponse } from "../../../api/apiInterface";
import { AppColor } from "../../../themes/AppColor";

interface Project {
  _id: string;
  name: string;
}

interface FilterModalProps {
  showFilterModal: boolean;
  onClose: () => void;
  onApply: (fromDate: string, toDate: string, projectId: number) => void;
  projects: SchedulesResponse[];
}

const FilterModal: React.FC<FilterModalProps> = ({
  showFilterModal,
  onClose,
  onApply,
  projects,
}) => {
  const theme = useTheme();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(0);

  const handleFromDateChange = (date: Date) => {
    setFromDate(moment(date).format(DateFormat.YYYY_MM_DD));
    setShowFromPicker(false);
  };

  const handleToDateChange = (date: Date) => {
    setToDate(moment(date).format(DateFormat.YYYY_MM_DD));
    setShowToPicker(false);
  };

  const handleApply = () => {
    onApply(fromDate, toDate, selectedProjectId);
  };

  return (
    <Portal>
      <Modal
        visible={showFilterModal}
        onDismiss={onClose}
        contentContainerStyle={styles.modalContainer}
      >
        {/* Close Button */}
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <MaterialIcons name="cancel" size={28} color="red" />
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.title}>Filter by</Text>

        {/* Project Dropdown */}
        <Dropdown
          title="Project Name"
          options={projects}
          onSelect={(value: SchedulesResponse) =>
            setSelectedProjectId(value.id)
          }
          style={{ fontFamily: AppFonts.Medium }}
        />

        {/* Date Range */}
        <View style={styles.dateContainer}>
          <Text style={styles.label}>Date Range</Text>

          <TouchableOpacity
            style={styles.dropdownToggle}
            onPress={() => setDropdownOpen(!isDropdownOpen)}
          >
            <Text style={styles.dropdownText}>
              {fromDate || toDate ? `${fromDate} to ${toDate}` : "Select"}
            </Text>
            <Ionicons
              name={isDropdownOpen ? "chevron-up" : "chevron-down"}
              size={18}
              color="black"
            />
          </TouchableOpacity>

          {isDropdownOpen && (
            <View style={styles.datePickerContainer}>
              <TouchableOpacity
                style={styles.dateInput}
                onPress={() => setShowFromPicker(true)}
              >
                <Text style={styles.dateText}>{fromDate || "From Date"}</Text>
                <Ionicons name="calendar" size={22} color="#00000070" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.dateInput}
                onPress={() => setShowToPicker(true)}
              >
                <Text style={styles.dateText}>{toDate || "To Date"}</Text>
                <Ionicons name="calendar" size={22} color="#00000070" />
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Apply Button */}
        <Button
          mode="contained"
          onPress={handleApply}
          style={styles.applyButton}
          textColor={AppColor.WHITE}
        >
          Apply
        </Button>

        {/* Date Pickers */}
        <DateTimePicker
          isVisible={showFromPicker}
          mode="date"
          onConfirm={handleFromDateChange}
          onCancel={() => setShowFromPicker(false)}
          date={
            fromDate
              ? moment(fromDate, DateFormat.YYYY_MM_DD).toDate()
              : new Date()
          }
          isDarkModeEnabled={false}
        />
        <DateTimePicker
          isVisible={showToPicker}
          mode="date"
          onConfirm={handleToDateChange}
          onCancel={() => setShowToPicker(false)}
          date={
            toDate ? moment(toDate, DateFormat.YYYY_MM_DD).toDate() : new Date()
          }
          isDarkModeEnabled={false}
        />
      </Modal>
    </Portal>
  );
};

export default FilterModal;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "white",
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 10,
  },
  closeButton: {
    position: "absolute",
    right: 5,
    top: 5,
    zIndex: 2,
  },
  title: {
    fontSize: 18,
    fontFamily: AppFonts.Medium,
    marginBottom: 10,
    color: "black",
  },
  dateContainer: {
    marginTop: 10,
  },
  label: {
    fontSize: 14,
    fontFamily: AppFonts.Medium,
    marginBottom: 5,
    color:AppColor.BLACK
  },
  dropdownToggle: {
    backgroundColor: "#F5F5F5",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    alignItems: "center",
  },
  dropdownText: {
    fontSize: 16,
    fontFamily: AppFonts.Medium,
    color: "black",
  },
  datePickerContainer: {
    marginTop: 5,
    backgroundColor: "#00000010",
  },
  dateInput: {
    flexDirection: "row",
    alignItems: "center",
    height: 45,
    paddingHorizontal: 8,
    backgroundColor: "#fff",
    marginVertical: 4,
  },
  dateText: {
    flex: 1,
    fontSize: 16,
    color: "#000",
    fontFamily: AppFonts.Medium,
  },
  applyButton: {
    marginTop: 20,
    alignSelf: "center",
    width: "50%",
    borderRadius: 5,
    backgroundColor: AppColor.PRIMARY,
  },
});
