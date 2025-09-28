import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { AppFonts } from "../../../themes/AppFonts";
import { AppColor } from "../../../themes/AppColor";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SchedulesResponse } from "../../../api/apiInterface";


interface DropdownProps {
  title: string;
  options: SchedulesResponse[];
  onSelect: (selected: SchedulesResponse) => void;
  style?: object;
}

const Dropdown: React.FC<DropdownProps> = ({ title, options, onSelect, style }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleSelect = (option: SchedulesResponse) => {
    setSelectedOption(option.project_name);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <View style={styles.container}>
      {/* Label */}
      <Text style={[styles.label, style]}>{title}</Text>

      {/* Dropdown Button */}
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setIsOpen(!isOpen)}
      >
        <Text style={styles.dropdownText}>
          {selectedOption || "Select"}
        </Text>
        <Ionicons
          name={isOpen ? "chevron-up" : "chevron-down"}
          size={14}
          color="black"
        />
      </TouchableOpacity>

      {/* Dropdown Options */}
      {isOpen && (
        <ScrollView style={styles.dropdownMenu}>
          {options.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={styles.dropdownItem}
              onPress={() => handleSelect(option)}
            >
              <Text style={styles.dropdownItemText}>
                {option.project_name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    maxHeight: 300,
  },
  label: {
    fontSize: 14,
    fontFamily: AppFonts.Medium,
    marginBottom: 5,
  },
  dropdownButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    padding: 15,
  },
  dropdownText: {
    fontSize: 16,
    color: "black",
    fontFamily: AppFonts.Medium,
  },
  dropdownMenu: {
    backgroundColor: "#00000010",
    marginTop: 2,
    maxHeight: 230,
  },
  dropdownItem: {
    padding: 15,
  },
  dropdownItemText: {
    color: AppColor.BLACK,
    fontSize: 16,
    fontFamily: AppFonts.Medium,
  },
});
