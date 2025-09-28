import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from 'moment';
import { Modal, Portal } from 'react-native-paper';
import useToastHook from '../../../hooks/toast';
import { DateFormat } from '../../../utils/dateUtil';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AppFonts } from '../../../themes/AppFonts';
import { AppColor } from '../../../themes/AppColor';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LoaderModal from '../../../components/Loader/Loader';
import RestClient from '../../../api/restClient';
import { moderateScale } from 'react-native-size-matters';

interface ExcelModalProps {
  onClose: () => void;
  setShowExcelModal: (value: boolean) => void;
  showExcelModal: boolean;
}

const ExcelModal: React.FC<ExcelModalProps> = ({ onClose, setShowExcelModal, showExcelModal }) => {
  const datePickerTypes = {
    from: 'from',
    to: 'to'
  } as const;

  const [FromDate, setFromDate] = useState<string>('');
  const [ToDate, setToDate] = useState<string>('');
  const [DatePickerType, setDatePickerType] = useState<typeof datePickerTypes[keyof typeof datePickerTypes]>(datePickerTypes.from);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const {showToast} = useToastHook();

  const handleDateChange = (selectedDate: Date) => {
    const date = moment(selectedDate).format(DateFormat.YYYY_MM_DD);
    if (DatePickerType === datePickerTypes.from) {
      setFromDate(date);
    } else if (DatePickerType === datePickerTypes.to) {
      setToDate(date);
    }
    setShowDatePicker(false);
  };

  const onApply = async () => {
      if (!FromDate || !ToDate) {
        showToast('Please select a date.','warning');
        return;
      }

      const tempFromDate = moment(FromDate).format(DateFormat.YYYY_MM_DD);
      const tempToDate = moment(ToDate).format(DateFormat.YYYY_MM_DD);

      const payload = {
        startDate: tempFromDate,
        endDate: tempToDate
      };

      console.log("payload : ", payload)
      setLoading(true);
      const restClient = new RestClient();
      const response = await restClient.createExcel(payload);
      if(response && typeof response != "string") {
        showToast(response.message || 'Excel generated successfully','success');
        setLoading(false);
        setShowExcelModal(false);
      }else{
        showToast(response || 'Something went wrong','danger');
        setLoading(false);
        setShowExcelModal(false);
      }
    

  };

  return (
    <Portal>
      <Modal transparent={true} visible={showExcelModal} onDismiss={onClose}>
        <View style={styles.overlay}>
          <View style={styles.popup}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <MaterialIcons name="cancel" size={25} color="red" />
            </TouchableOpacity>

            <Text style={{
              fontFamily: AppFonts.Bold,
              color:AppColor.PRIMARY,
              fontSize: moderateScale(18),
              textAlign: 'center',
              marginVertical: 10
            }}>
              Generate Excel
            </Text>

            <Text style={styles.title}>From Date</Text>
            <TouchableOpacity
              style={styles.dateInputContainer}
              onPress={() => { setDatePickerType(datePickerTypes.from); setShowDatePicker(true); }}
            >
              <Text style={[styles.dateInputText,{color: FromDate ? AppColor.BLACK : AppColor.BORDER_COLOR}]}>
                {FromDate || 'Select Date'}
              </Text>
              <Ionicons name="calendar" size={24} color={AppColor.PRIMARY} style={styles.icon} />
            </TouchableOpacity>

            <Text style={styles.title}>To Date</Text>
            <TouchableOpacity
              style={styles.dateInputContainer}
              onPress={() => { setDatePickerType(datePickerTypes.to); setShowDatePicker(true); }}
            >
              <Text style={[styles.dateInputText,{color: ToDate ? AppColor.BLACK : AppColor.BORDER_COLOR}]}>
                {ToDate || 'Select Date'}
              </Text>
              <Ionicons name="calendar" size={24} color={AppColor.PRIMARY} style={styles.icon} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.applyButton} onPress={onApply}>
              <Ionicons name="download" size={24} color={AppColor.WHITE} style={styles.icon} />
              <Text style={styles.applyText}>Download</Text>
            </TouchableOpacity>
          </View>

          {loading && <LoaderModal visible={loading} />}
          {showDatePicker && (
            <DateTimePicker
              isVisible={showDatePicker}
              value={
                DatePickerType === datePickerTypes.from
                  ? (FromDate ? moment(FromDate, DateFormat.YYYY_MM_DD).toDate() : new Date())
                  : (ToDate ? moment(ToDate, DateFormat.YYYY_MM_DD).toDate() : new Date())
              }
              onConfirm={handleDateChange}
              onCancel={() => setShowDatePicker(false)}
              textColor="black"
              themeVariant="light"
              isDarkModeEnabled={false}
            />
          )}
        </View>
      </Modal>
    </Portal>
  );
};

export default ExcelModal;

const styles = StyleSheet.create({
  overlay: {
    width: '90%',
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 10
  },
  popup: {
    width: '90%',
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  closeButton: { position: "absolute", right: 5, top: 5, zIndex: 2 },
  title: { fontSize: moderateScale(16), fontFamily: AppFonts.Medium, marginTop: 10, color: "black" },
  applyButton: {
    width: '45%',
    backgroundColor: AppColor.PRIMARY,
    padding: 7,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
    alignSelf: 'center',
    flexDirection:'row',
    gap:3
  },
  applyText: { color: "white", fontSize: 16, fontFamily: AppFonts.Medium },
  dateInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 45,
    paddingHorizontal: 8,
    backgroundColor: "#fff",
    borderWidth: 0.5,
   borderColor:AppColor.BORDER_COLOR
  },
  dateInputText: {
    flex: 1,
    fontSize: 14,
    color:AppColor.BORDER_COLOR,
    fontFamily: AppFonts.Medium
  },
  icon: {
    marginLeft: 8,
  },
})
