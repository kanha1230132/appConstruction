import React, { useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput as RNTextInput, View, TouchableOpacity, Image } from 'react-native';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import IconTextInput from '../../../components/CustomTextInput/CustomIconTextInput';
import LoaderModal from '../../../components/Loader/Loader';
import { AppColor } from '../../../themes/AppColor';
import { AppFonts } from '../../../themes/AppFonts';
import CustomTextInput from '../../../components/CustomTextInput/CustomTextInput';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import useCreateInvoice from '../../invoice/hooks/createInvoice.hook';



type ReportDetailsProps = {
  reportDate: string;
  projectName: string;
  owner: string;
  consultantProjectManager: string;
  projectNumber: string;
  contractNumber: string;
  cityProjectManager: string;
  contractProjectManager: string;
  contractorSiteSupervisorOnshore: string;
  contractorSiteSupervisorOffshore: string;
  contractAdministrator: string;
  supportCA: string;
  siteInspector: string[];
  inspectorTimeIn: string;
  inspectorTimeOut: string;
  setReportDate: (reportDate: string) => void;
  setConsultantProjectManager: (consultantProjectManager: string) => void;
  setContractNumber: (contractNumber: string) => void;
  setCityProjectManager: (cityProjectManager: string) => void;
  setContractProjectManager: (contractProjectManager: string) => void;
  setContractorSiteSupervisorOnshore: (contractorSiteSupervisorOnshore: string) => void;
  setContractorSiteSupervisorOffshore: (contractorSiteSupervisorOffshore: string) => void;
  setContractAdministrator: (contractAdministrator: string) => void;
  setSupportCA: (supportCA: string) => void;
  setSiteInspector: (siteInspector: string[]) => void;
  setInspectorTimeIn: (inspectorTimeIn: string) => void;
  setInspectorTimeOut: (inspectorTimeOut: string) => void;
  };

const WeeklyReportDetails: React.FC<ReportDetailsProps> = ({
  reportDate,
  projectName,
  owner,    
  consultantProjectManager,
  projectNumber,
  contractNumber,
  cityProjectManager, 
  contractProjectManager,
  contractorSiteSupervisorOnshore,
  contractorSiteSupervisorOffshore,
  contractAdministrator,
  supportCA,
  siteInspector,
  inspectorTimeIn,
  inspectorTimeOut,  
  setReportDate,
  setConsultantProjectManager,  
  setContractNumber,
  setCityProjectManager,
  setContractProjectManager,
  setContractorSiteSupervisorOnshore,  
  setContractorSiteSupervisorOffshore,
  setContractAdministrator,
  setSupportCA,
  setSiteInspector,
  setInspectorTimeIn,
  setInspectorTimeOut,    
}) => {
  const [loading, setLoading] = useState(false);
  const [showPickerModal, setShowPickerModal] = useState(false);
  const [selectedPickerType, setSelectedPickerType] = useState<'date' | 'timeIn' | 'timeOut'>('date');

    const {calculateTotalHours,
     showConfirmationPopup,
    ConfirmationPopup,
    popupVisible,
  } = useCreateInvoice();
  const clickOnPicker = (type: 'date' | 'timeIn' | 'timeOut') => {
    setSelectedPickerType(type);
    setShowPickerModal(true);
  };

  const onDateChange = (_: any, date?: Date) => {
    if (date) {
      if (selectedPickerType === 'date') setReportDate(moment(date).format('YYYY-MM-DD'));
      else if (selectedPickerType === 'timeIn') setInspectorTimeIn(moment(date).format("hh:mm A"));
      else if (selectedPickerType === 'timeOut'){ 
         const totalHours = calculateTotalHours(inspectorTimeIn,moment(date).format("hh:mm A"));
                            if(totalHours){
                              console.log("totalHours: ", totalHours)
                           setInspectorTimeOut(moment(date).format("hh:mm A"))};
                            }
       
    }
    setShowPickerModal(false);
  };

  const updateInspector = (text: string, index: number) => {
    const updated = [...siteInspector];
    updated[index] = text;
    setSiteInspector(updated);
  };

  const addInspector = () => setSiteInspector((prev) => [...prev, '']);
  const removeInspector = (index: number) => {
    const filtered = siteInspector.filter((_, i) => i !== index);
    setSiteInspector(filtered);
  };



  return (
    <View style={styles.inputContainer}>
      <IconTextInput
        onClickIcon={() => clickOnPicker('date')}
        value={reportDate}
        label="Date"
        rightIconName={'calendar-outline'}
        editable={false}
      />

      <CustomTextInput label="Project Name" textValue={projectName}  editable={false} />
      <CustomTextInput label="Owner" textValue={owner} editable={false} />
      <CustomTextInput label="Consultant Project Manager" textValue={consultantProjectManager} onChangeTextValue={setConsultantProjectManager} />
      <CustomTextInput label="Project No./Client PO" textValue={projectNumber}  editable={false} />
      <CustomTextInput label="Contract Number" textValue={contractNumber} onChangeTextValue={setContractNumber} />
      <CustomTextInput label="City Project Manager" textValue={cityProjectManager} onChangeTextValue={setCityProjectManager} />
      <CustomTextInput label="Contract Project Manager" textValue={contractProjectManager} onChangeTextValue={setContractProjectManager} />
      <CustomTextInput label="Contractor Site Supervisor Onshore" textValue={contractorSiteSupervisorOnshore} onChangeTextValue={setContractorSiteSupervisorOnshore} />
      <CustomTextInput label="Contractor Site Supervisor Offshore" textValue={contractorSiteSupervisorOffshore} onChangeTextValue={setContractorSiteSupervisorOffshore} />
      <CustomTextInput label="Contract Administrator" textValue={contractAdministrator} onChangeTextValue={setContractAdministrator} />
      <CustomTextInput label="Support CA" textValue={supportCA} onChangeTextValue={setSupportCA} />

      {siteInspector.map((inspector, index) => (
        <View key={index} style={styles.inspectorRow}>
          <View style={{
            flex:1
          }}>
            <CustomTextInput 
            placeholder={`Site Inspector ${index + 1}`}
            value={inspector}
            onChangeText={(text) => updateInspector(text, index)} label={`Site Inspector ${index + 1}`} textValue={inspector}       
            editable={index == 0 ? false: true}
            />
            
            </View>
          
          {index === siteInspector.length - 1 && (
            <TouchableOpacity onPress={addInspector}>
              <Ionicons name="add-circle-outline" size={30} color={AppColor.PRIMARY} />
            </TouchableOpacity>
          )}
          {index > 0 && (
            <TouchableOpacity onPress={() => removeInspector(index)}>
              <Ionicons name="remove-circle" size={24} color="red" />
            </TouchableOpacity>
          )}
        </View>
      ))}

      <View style={styles.rowContainer}>
        <View style={styles.halfInputContainer}>
          <IconTextInput
            onClickIcon={() => clickOnPicker('timeIn')}
            value={inspectorTimeIn}
            label="Time In"
            rightIconName="clock-outline"
            editable={false}
          />
        </View>
        <View style={styles.halfInputContainer}>
          <IconTextInput
            onClickIcon={() => clickOnPicker('timeOut')}
            value={inspectorTimeOut}
            label="Time Out"
            rightIconName="clock-outline"
            editable={false}
          />
        </View>
      </View>

      {showPickerModal && (
        <DateTimePicker
          isVisible={showPickerModal}
          mode={selectedPickerType === 'date' ? 'date' : 'time'}
          onConfirm={(date) => onDateChange(null, date)}
          onCancel={() => setShowPickerModal(false)}
          isDarkModeEnabled={false}
          is24Hour={false}
        />
      )}

      {loading && <LoaderModal visible={loading} />}

      {
          popupVisible ? (
            <ConfirmationPopup />
          ) : null
        }
    </View>
  );
};

export default WeeklyReportDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColor.WHITE,
        paddingHorizontal: 16,
        marginBottom: 50
    },
    headerContainer: {
        paddingTop: 20,
        paddingBottom: 16,
        backgroundColor: AppColor.WHITE,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
    },
    headerText: {
        fontSize: 18,
        marginLeft: 8,
        fontWeight: "500",
    },
    title: {
        fontSize: 18,
        fontFamily: AppFonts.Medium,
        marginBottom: 16,
        color: AppColor.BLACK,
    },
    inputContainer: {
        marginBottom: 10,
    },
    label: {
        fontSize: 14,
        fontFamily: AppFonts.Medium,
        color: "#000",
        marginBottom: 4,
    },
    input: {
        height: 45,
        borderColor: "#000",
        borderWidth: 1,
        borderRadius: 8,
        fontSize: 16,
        paddingHorizontal: 8,
        // marginBottom: 12,
        backgroundColor: AppColor.WHITE,
        color: "black",
        fontFamily: AppFonts.Medium,

    },
    dateInputContainer: {
        flexDirection: "row",
        alignItems: "center",
        height: 45,
        borderColor: "#000",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginBottom: 12,
        backgroundColor:AppColor.WHITE,
    },
    dateInputText: {
        flex: 1,
        fontSize: 16,
    },
    icon: {
        marginLeft: 8,
    },
    rowContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 12,
        height: 50

    },
    halfInputContainer: {
        width: "48%",
        height: 50

    },
    nextButton: {
        backgroundColor: AppColor.PRIMARY,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
    },
    nextButtonText: {
        color:AppColor.WHITE,
        fontSize: 18,
        fontWeight: "600",
    },
    inspectorRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
        gap:10

    },
    inspectorInput: {
        flex: 1,
        marginRight: 8,
    },
    iconContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    iconButton: {
        marginLeft: 8,
        padding: 6,
    },
    addInspectorButton: {
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerUpload: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
    },
    uploadicon: {
        width: 30,
        height: 30,
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        color: '#444',
        marginBottom: 20,
    },
    ChooseFilebutton: {
        backgroundColor: AppColor.PRIMARY,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 6,
    },
    ChooseFilebuttonText: {
        color: AppColor.WHITE,
        fontFamily:  AppFonts.Medium,

    },
});
