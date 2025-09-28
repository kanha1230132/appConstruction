import {
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { DailyEntryScreenProps } from "../../../../types/navigation";
import { SafeAreaWrapper } from "../../../../components/SafeAreaWrapper/SafeAreaWrapper";
import HeaderWithBackButton from "../../../../components/Button/HeaderWithBackButton";
import { goBack, navigate } from "../../../../utils/NavigationUtil";
import { AppText } from "../../../../constants/appText";
import CircleTabs from "../../components/CircleTabs";
import { AppColor } from "../../../../themes/AppColor";
import { AppFonts } from "../../../../themes/AppFonts";
import ScrollViewWrapper from "../../../../components/ScrollViewWrapper/ScrollViewWrapper";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import IconTextInput from "../../../../components/CustomTextInput/CustomIconTextInput";
import { typeOfPicker } from "../../../../utils/dateUtil";
import CustomTextInput from "../../../../components/CustomTextInput/CustomTextInput";
import NextPreviewButton from "../../../../components/Button/NextPreviewButton";
import DropDownButton from "../../components/DropDownButton";
import { moderateScale, s } from "react-native-size-matters";
import { CompanyLogoResponse } from "../../../../api/apiInterface";
import TemperatureSelectionModal from "../../components/TemperatureSelectionModal";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
import EquipmentDetails from "../../components/EquipmentDetails";
import LabourDetails from "../../components/LabourDetails";
import VisitorDetails, { Visitor } from "../../components/VisitorDetails";
import DailyFormReportScreen from "../../components/DailyFormDetails";
import CustomText from "../../../../components/CustomText/CustomText";
import { TextInput } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import FastImage from "react-native-fast-image";
import { images } from "../../../../assets";
import CustomRadioButton from "../../../../components/Button/CustomRadioButton";
import SignatureModal from "../../../../components/Modal/SignatureModal";
import VoiceRecordButton from "../../../../components/VoiceRecordButton/VoiceRecordButton";
import { Image } from "react-native";
import { DeclarationGroup, DeclerationFrom, Labour, updateDailyReports } from "../../../../store/slice/Reports";
import { useDispatch, useSelector } from "react-redux";
import { screenNames } from "../../../../navigation/ScreenNames";
import VoiceToTextInput from "../../../../components/VoiceRecordButton/VoiceRecordButton";
import { useIsFocused } from "@react-navigation/native";
import { RootState } from "../../../../store/store";
import { formLists } from "../../helper/util";
import useCreateInvoice from "../../../invoice/hooks/createInvoice.hook";
interface Equipment {
  id: number;
  equipment_name: string;
  quantity: string;
  hours: string;
  totalHours: string;
}

const DailyEntryScreen: React.FC<DailyEntryScreenProps> = ({ route }) => {
  const [ActiveTabTitle, setActiveTabTitle] = useState(
    AppText.EnterProjectDetails
  );
  const {UserName} = useSelector((state:RootState)=> state.User)
  const {calculateTotalHours,
     showConfirmationPopup,
    ConfirmationPopup,
    popupVisible,
  } = useCreateInvoice();

  const [ActiveTab, setActiveTabs] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [Location, setLocation] = useState("");
  const [onShore, setOnShore] = useState("");
  const [showPickerModal, setShowPickerModal] = useState(false);
  const [selectedPickerType, setSelectedPickerType] = useState(
    typeOfPicker.date
  );
  const [Weather, setWeather] = useState("");
  const [WorkingDay, setWorkingDay] = useState("");
  const [ProjectName, setProjectName] = useState("");
  const [ProjectNumber, setProjectNumber] = useState("");
  const [Owner, setOwner] = useState("");
  const [ReportNumber, setReportNumber] = useState("");
  const [ContractNumber, setContractNumber] = useState("");
  const [Contractor, setContractor] = useState("");
  const [OwnerContact, setOwnerContact] = useState("");
  const [OwnerProjectManager, setOwnerProjectManager] = useState("");
  const [timeIn, setTimeIn] = useState("");
  const [timeOut, setTimeOut] = useState("");
  const [SelectedTempType, setSelectedTempType] = useState(AppText.HighTemp);
  const [showTempModal, setShowTempModal] = useState(false);
  const [HighTemp, setHighTemp] = useState("");
  const [LowTemp, setLowTemp] = useState("");
  const [signature, setSignature] = useState("");
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [Description, setDescription] = useState("");
  const [Equipments, setEquipments] = useState<Equipment[]>([]);
  const [Labour, setLabour] = useState<Labour[]>([]);
  const [Visitors, setVisitors] = useState<Visitor[]>([]);
  const [DeclerationFrom, setDeclerationFrom] = useState<DeclerationFrom>();
  const [component, setComponent] = useState("");
  const [siteInspector, setSiteInspector] = useState(UserName);
  
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const {DailyReports} = useSelector((state:RootState)=> state.Reports)

  useEffect(()=>{
    if(isFocused){
      if(DailyReports){
        setWeather(DailyReports.Weather);
        setWorkingDay(DailyReports.WorkingDay);
        setVisitors(DailyReports.Visitors);
        setEquipments(DailyReports.Equipments);
        setLabour(DailyReports.Labour);
        setDeclerationFrom(DailyReports.DeclerationFrom);
        setComponent(DailyReports.component);
        setSiteInspector(DailyReports.siteInspector);
        setSelectedDate(DailyReports.selectedDate);
        setLocation(DailyReports.Location);
        setOnShore(DailyReports.onShore);
        setHighTemp(DailyReports.HighTemp);
        setLowTemp(DailyReports.LowTemp);
        setReportNumber(DailyReports.ReportNumber);
        setContractNumber(DailyReports.ContractNumber);
        setContractor(DailyReports.Contractor);
        setOwnerContact(DailyReports.OwnerContact);
        setOwnerProjectManager(DailyReports.OwnerProjectManager);
        setTimeIn(DailyReports.timeIn);
        setTimeOut(DailyReports.timeOut);
        setDescription(DailyReports.Description);

      }
    }
  },[isFocused])

  useEffect(() => {
    if (route.params) {
      const { project } = route.params;
      if (project) {
        setProjectName(project.project_name);
        setProjectNumber(project.project_number);
        setOwner(project.owner);
        if(!selectedDate){
          setSelectedDate(moment().format("YYYY-MM-DD"));
        }

      }
    }
  }, [route.params]);

  const clickOnPicker = (type: string) => {
    setSelectedPickerType(type);
    setShowPickerModal(true);
  };


  const clickOnTabs = (step: number) => {
    setActiveTabs(step);
    updateDetails();
    if (step === 1) {
      setActiveTabTitle(AppText.EnterProjectDetails);
    } else if (step === 2) {
      setActiveTabTitle(AppText.EnterEquipmentDetails);
    } else if (step === 3) {
      setActiveTabTitle(AppText.EnterLabourDetails);
    } else if (step === 4) {
      setActiveTabTitle(AppText.EnterVisitorDetails);
    } else if (step === 5) {
      setActiveTabTitle(AppText.FillDeclerationForm);
    } else if (step === 6) {
      setActiveTabTitle(AppText.EnterDescriptiondetails);
    }
  };

  const updateDetails = () => {
    Keyboard.dismiss();
    const data = {
      selectedDate,
      Location,
      onShore,
      Weather,
      WorkingDay,
      ProjectName,
      ProjectNumber,
      Owner,
      ReportNumber,
      ContractNumber,
      Contractor,
      OwnerContact,
      OwnerProjectManager,
      timeIn,
      timeOut,
      SelectedTempType,
      HighTemp,
      LowTemp,
      signature,
      Description,
      Equipments,
      Labour,
      Visitors,
      DeclerationFrom : DeclerationFrom ? DeclerationFrom: {declrationForm: formLists},
      component,
      siteInspector,
      schedule: route?.params?.project,
      Images:DailyReports && DailyReports?.Images,
      selectedLogo:DailyReports && DailyReports?.selectedLogo
    };
    
    dispatch(updateDailyReports(data));
  };

  const handleSignatureOK = (signatureBase64: string) => {
    setShowSignatureModal(false);
    if (signatureBase64) {
      setSignature(signatureBase64);
    }
  };

  const renderTabContent = () => {
    switch (ActiveTab) {
      case 1:
        return (
          <KeyboardAwareScrollView
            style={{
              flex: 1,
            }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <IconTextInput
              value={selectedDate}
              label={"Date"}
              editable={false}
              rightIconName={"calendar"}
              onClickIcon={() => clickOnPicker(typeOfPicker.date)}
            />

            <CustomTextInput
              onChangeTextValue={(text) => setLocation(text)}
              textValue={Location}
              label="Location"
              placeholder="Enter Location"
              returnKeyType="next"
            />

            <CustomTextInput
              onChangeTextValue={(text) => setOnShore(text)}
              textValue={onShore}
              label="Onshore/Offshore"
              placeholder="Enter Onshore/Offshore"
              returnKeyType="next"
            />

            <CustomTextInput
              onChangeTextValue={(text) => {
                setWeather(text);
              }}
              textValue={Weather}
              label="Weather Conditions"
            />

            <View
              style={{
                flex: 1,
                flexDirection: "row",
                gap: 10,
                justifyContent: "space-between",
              }}
            >
              <DropDownButton
                style={{ width: "48%" }}
                label={HighTemp}
                onPress={() => {
                  setSelectedTempType(AppText.HighTemp);
                  setShowTempModal(true);
                }}
                value={"Temp - High (°C)"}
              />
              <DropDownButton
                style={{ width: "48%" }}
                label={LowTemp}
                onPress={() => {
                  setSelectedTempType(AppText.LowTemp);
                  setShowTempModal(true);
                }}
                value={"Temp - Low (°C)"}
              />
            </View>

            <CustomTextInput
              onChangeTextValue={(text) => setWorkingDay(text)}
              textValue={WorkingDay}
              label="Working Day"
            />
            <CustomTextInput
              onChangeTextValue={(text) => setProjectName(text)}
              textValue={ProjectName}
              label="Project Name"
              editable={false}
            />
            <CustomTextInput
              onChangeTextValue={(text) => setProjectNumber(text)}
              textValue={ProjectNumber}
              label="Project No./Client PO"
              editable={false}
            />

            <CustomTextInput
              onChangeTextValue={(text) => setOwner(text)}
              textValue={Owner}
              label="Owner"
              editable={false}
            />
            <CustomTextInput
              onChangeTextValue={(text) => setReportNumber(text)}
              textValue={ReportNumber}
              label="Report Number"
            />
            <CustomTextInput
              onChangeTextValue={(text) => setSiteInspector(text)}
              textValue={siteInspector}
              label="Site Inspector"
              editable={false}

            />
            <View style={styles.formGroupRow}>
              {/* Inspector In Time */}
              <View style={styles.formGroupHalf}>
                <IconTextInput
                  rightIconName={"clock"}
                  onClickIcon={() => clickOnPicker(typeOfPicker.timeIn)}
                  value={timeIn}
                  label="Time In"
                  editable={false}
                  inputFontSize={moderateScale(15)}
                />
              </View>

              {/* Inspector Out Time */}
              <View style={styles.formGroupHalf}>
                <IconTextInput
                  rightIconName={"clock"}
                  onClickIcon={() => clickOnPicker(typeOfPicker.timeOut)}
                  value={timeOut}
                  label="Time Out"
                  editable={false}
                  inputFontSize={moderateScale(15)}
                />
              </View>
            </View>

            <CustomTextInput
              onChangeTextValue={(text) => setContractNumber(text)}
              textValue={ContractNumber}
              label="Contract Number"
              // keyboardType="numeric"
            />
            <CustomTextInput
              onChangeTextValue={(text) => setContractor(text)}
              textValue={Contractor}
              label="Contractor"
            />
            <CustomTextInput
              onChangeTextValue={(text) => setOwnerContact(text)}
              textValue={OwnerContact}
              label="Owner Contact"
              // keyboardType="numeric"
            />

            <CustomTextInput
              onChangeTextValue={(text) => setOwnerProjectManager(text)}
              textValue={OwnerProjectManager}
              label="Owner Project Manager"
            />

            <CustomTextInput
              onChangeTextValue={(text) => setComponent(text)}
              textValue={component}
              label="Component"
            />
          </KeyboardAwareScrollView>
        );

      case 2:
        return (
          <KeyboardAwareScrollView
            style={{
              flex: 1,
            }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <EquipmentDetails
              dailyEntry={{
                equipments: Equipments,
              }}
              setDailyEntry={(entry) => {
                setEquipments(entry);
              }}
            />
          </KeyboardAwareScrollView>
        );

      case 3:
        return (
          <KeyboardAwareScrollView
            style={{
              flex: 1,
            }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <LabourDetails
              dailyEntry={{
                labours: Labour,
              }}
              setDailyEntry={(labur) => {
                setLabour(labur);
              }}
            />
          </KeyboardAwareScrollView>
        );
      case 4:
        return (
          <KeyboardAwareScrollView
            style={{
              flex: 1,
            }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <VisitorDetails
              dailyEntry={{
                visitors: Visitors,
              }}
              setDailyEntry={(v) => {
                setVisitors(v);
              }}
            />
          </KeyboardAwareScrollView>
        );

      case 5:
        return (
          <KeyboardAwareScrollView
            style={{
              flex: 1,
            }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <DailyFormReportScreen
              dailyEntry={{
                declrationForm: DeclerationFrom?.declrationForm || [],
              }}
              setDailyEntry={(entry) => {
                setDeclerationFrom(entry);
              }}
            />
          </KeyboardAwareScrollView>
        );
      case 6:
        return (
          <>
            <CustomText title="Description" fontFamily={AppFonts.Medium} />
            <TextInput
              mode="outlined" // or 'flat' based on your design preference
              style={[styles.textArea]}
              label={"Add Project Description"}
              multiline={true}
              numberOfLines={6} // Set minimum number of lines
              value={Description}
              onChangeText={(text) => setDescription(text)}
              returnKeyType="done"
              activeOutlineColor={AppColor.PRIMARY}
              blurOnSubmit={false}
              onKeyPress={(e: any) => {
                console.log("e.nativeEvent.key: ", e.nativeEvent.key)
    if (e.nativeEvent.key == "Enter") {
      // Prevent default only if you don't want double newlines
      e.preventDefault?.();
      setDescription((prev) => prev + "\n");
    }
  }}
  contentStyle={{
    color: AppColor.BLACK
  }}
              onSubmitEditing={() => Keyboard.dismiss()}
            />

            <CustomText style={{
              marginVertical:10
            }} title="Signature" fontFamily={AppFonts.Medium} />

            <View
              style={{
                borderColor: "#ddd",
                borderWidth: 1,
                marginBottom: 20,
                backgroundColor: "white",
                borderRadius: 6,
                minHeight: 45,
              }}
            >
              <TouchableOpacity
                style={{
                  padding: 10,
                  borderRadius: 5,
                  alignItems: "center",
                  marginTop: 10,
                }}
                onPress={() => setShowSignatureModal(true)}
              >
                {signature ? (
                  <View>
                    <Image
                      resizeMode="contain"
                      source={{ uri: signature }}
                      style={{
                        width: 200,
                        borderWidth: 0.5,
                        borderColor: "#00000039",
                        height: 150,
                      }}
                    />

                    <TouchableOpacity
                      onPress={() => {
                        // setDairyEntry({ ...dairyEntry, signature: "" })
                        if (signature) {
                          setSignature("");
                        }
                      }}
                      style={{
                        position: "absolute",
                        top: 5,
                        right: 5,
                        zIndex: 6,
                      }}
                    >
                      <Ionicons name="close" size={24} color="red" />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View
                    style={{
                      gap: 20,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: -10,
                    }}
                  >
                    <FastImage
                      resizeMode="contain"
                      source={images.SIGNATURE}
                      style={{
                        width: 35,
                        height: 35,
                      }}
                    />
                    <Text
                      style={{
                        color: AppColor.PRIMARY,
                        fontSize: moderateScale(16),
                        marginLeft: 5,
                        fontFamily: AppFonts.Medium,
                        marginTop: 5,
                      }}
                    >
                      Add Signature
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>

            {showSignatureModal && (
              <SignatureModal
                handleSignatureOK={handleSignatureOK}
                showSignatureModal={showSignatureModal}
                onclose={() => {
                  setShowSignatureModal(false);
                }}
              />
            )}
          </>
        );

      default:
        return <></>;
        break;
    }
  };
  return (
    <>
      <SafeAreaWrapper>
        <HeaderWithBackButton
          title={AppText.DailyEntry}
          onBackClick={() => goBack()}
          customStyle={undefined}
        />

        <Text style={styles.sectionTitle}>{ActiveTabTitle}</Text>
        <CircleTabs
          ActiveTab={ActiveTab}
          Tabs={[1, 2, 3, 4, 5, 6]}
          lineWidth={9}
          onTabPress={(tab) => clickOnTabs(tab)}
        />

        <ScrollViewWrapper>{renderTabContent()}</ScrollViewWrapper>

        {showTempModal && (
          <TemperatureSelectionModal
            selectionStep={
              SelectedTempType == AppText.HighTemp ? "high" : "low"
            }
            visible={showTempModal}
            onDismiss={() => {
              setShowTempModal(false);
            }}
            onConfirm={(text) => {
              if (SelectedTempType == AppText.HighTemp) {
                setHighTemp(text);
              } else {
                setLowTemp(text);
              }
              setShowTempModal(false);
            }}
          />
        )}

        {showPickerModal ? (
          <DateTimePicker
            testID="dateTimePicker"
            isVisible={showPickerModal}
            date={ selectedPickerType == typeOfPicker.date ? (selectedDate ? new Date(selectedDate) : new Date()) :(selectedPickerType == typeOfPicker.timeIn ? (timeIn ? moment(timeIn,'HH:mm A').toDate() : new Date()) : (selectedPickerType == typeOfPicker.timeOut ? (timeOut ? moment(timeOut,'HH:mm A').toDate() : new Date()) : new Date()) )}
            mode={selectedPickerType == typeOfPicker.date ? "date" : "time"}
            onConfirm={(date) => {
              if (date) {
                const formattedDate = moment(date).format(
                  selectedPickerType == typeOfPicker.date
                    ? "YYYY-MM-DD"
                    : "hh:mm A"
                );
                if (selectedPickerType == typeOfPicker.date) {
                  setSelectedDate(formattedDate);
                }else if (selectedPickerType == typeOfPicker.timeIn) {
                  setTimeIn(formattedDate);
                }else if (selectedPickerType === typeOfPicker.timeOut) {
                  const totalHours = calculateTotalHours(timeIn,formattedDate);
                  if(totalHours){
                    console.log("totalHours: ", totalHours)
                  setTimeOut(formattedDate);
                  }
                }
              }
              setShowPickerModal(false);
            }}
            isDarkModeEnabled={false}
            onCancel={() => setShowPickerModal(false)}
            textColor="black" // Force text color (iOS 14+)
             themeVariant="light" // ✅ forces light mode on iOS
             is24Hour={false}
          />
        ) : null}

        {
          popupVisible ? (
            <ConfirmationPopup />
          ) : null
        }
      </SafeAreaWrapper>

      <NextPreviewButton
        ActiveTab={ActiveTab}
        clickOnPrevious={() => {
          if (ActiveTab > 1) {
            clickOnTabs(ActiveTab - 1);
          } else {
            goBack();
          }
        }}
        clickOnNext={() => {
          if (ActiveTab === 6) {
            updateDetails();
            navigate(screenNames.DailyPreviewScreen);
          } else {
            clickOnTabs(ActiveTab + 1);
          }
        }}
        size={6}
      />
    </>
  );
};

export default DailyEntryScreen;

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    color: AppColor.PRIMARY,
    fontFamily: AppFonts.Medium,
  },
  formGroupRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  formGroupHalf: {
    width: "48%",
  },
  textArea: {
    minHeight: 200, // Ensure enough space for multiline
    textAlignVertical: "top", // Align text to top (important for multiline)
    backgroundColor: "white",
    marginVertical: 8,
    color: AppColor.BLACK
  },
});
