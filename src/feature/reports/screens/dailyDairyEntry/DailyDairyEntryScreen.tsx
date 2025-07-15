import {
  Image,
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { DailyDairyEntryScreenProps } from "../../../../types/navigation";
import { SafeAreaWrapper } from "../../../../components/SafeAreaWrapper/SafeAreaWrapper";
import HeaderWithBackButton from "../../../../components/Button/HeaderWithBackButton";
import { goBack } from "../../../../utils/NavigationUtil";
import { AppText } from "../../../../constants/appText";
import ScrollViewWrapper from "../../../../components/ScrollViewWrapper/ScrollViewWrapper";
import CircleTabs from "../../components/CircleTabs";
import IconTextInput from "../../../../components/CustomTextInput/CustomIconTextInput";
import CustomTextInput from "../../../../components/CustomTextInput/CustomTextInput";
import CustomButton from "../../../../components/Button/CustomButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { typeOfPicker } from "../../../../utils/dateUtil";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
import { useDispatch } from "react-redux";
import { updateDailyDairyReports } from "../../../../store/slice/Reports";
import { AppFonts } from "../../../../themes/AppFonts";
import { AppColor } from "../../../../themes/AppColor";
import { moderateScale } from "react-native-size-matters";
import { TextInput } from "react-native-paper";
import VoiceToTextButton from "../../../../components/VoiceRecordButton/VoiceRecordButton";
import SignatureModal from "../../../../components/Modal/SignatureModal";
import Ionicons from "react-native-vector-icons/Ionicons";
import { images } from "../../../../assets";
import CustomText from "../../../../components/CustomText/CustomText";
import CustomRadioButton from "../../../../components/Button/CustomRadioButton";
import NextPreviewButton from "../../../../components/Button/NextPreviewButton";

const DailyDairyEntryScreen: React.FC<DailyDairyEntryScreenProps> = ({
  route,
}) => {
  const [ActiveTab, setActiveTabs] = useState(1);
  const ownerRef = useRef<any>(null);
  const reportNumberRef = useRef<any>(null);
  const contractNumberRef = useRef<any>(null);
  const contractorRef = useRef<any>(null);
  const ownerContactRef = useRef<any>(null);
  const ownerProjectManagerRef = useRef<any>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [ProjectName, setProjectName] = useState("");
  const [ProjectNumber, setProjectNumber] = useState("");
  const [Owner, setOwner] = useState("");
  const [ReportNumber, setReportNumber] = useState("");
  const [ContractNumber, setContractNumber] = useState("");
  const [Contractor, setContractor] = useState("");
  const [OwnerContact, setOwnerContact] = useState("");
  const [OwnerProjectManager, setOwnerProjectManager] = useState("");
  const [ActiveTabTitle, setActiveTabTitle] = useState(
    AppText.EnterProjectDetails
  );
  const [ShowPickerModal, setShowPickerModal] = useState(false);
  const [selectedPickerType, setSelectedPickerType] = useState(
    typeOfPicker.date
  );
  const [signature, setSignature] = useState("");
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [selected, setSelected] = useState("option1");

  const [Description, setDescription] = useState("");
  const [IsChargable, setIsChargable] = useState(true);
  const dispatch = useDispatch();

  const clickOnPicker = (type: string) => {
    setSelectedPickerType(type);
    setShowPickerModal(true);
  };

  const onDateChange = (date: Date) => {
    if (date) {
      const formattedDate = moment(date).format("YYYY-MM-DD");
      if (selectedPickerType === typeOfPicker.date) {
        setSelectedDate(formattedDate);
      }
    }
    setShowPickerModal(false);
  };

  const handleSignatureOK = (signatureBase64: string) => {
    setShowSignatureModal(false);
    if (signatureBase64) {
      setSignature(signatureBase64);
    }
  };

  useEffect(() => {
    if (route?.params?.project) {
      const schedule = route?.params?.project;
      setSelectedDate(moment().format("YYYY-MM-DD"));
      setProjectName(schedule?.projectName);
      setProjectNumber(schedule?.projectNumber);
      setOwner(schedule?.owner);
      setReportNumber(ReportNumber);
      setContractNumber(ContractNumber);
      setContractor(Contractor);
      setOwnerContact(OwnerContact);
      setOwnerProjectManager(OwnerProjectManager);
    }
  }, []);

  const updateDetails = () => {
    Keyboard.dismiss();
    const data = {
      selectedDate,
      ProjectName,
      ProjectNumber,
      Owner,
      ReportNumber,
      ContractNumber,
      Contractor,
      OwnerContact,
      OwnerProjectManager,
    };
    dispatch(updateDailyDairyReports(data));
    console.log("updateDetails : ", data);
  };

  const clickOnTabs = (step: number) => {
    setActiveTabs(step);
    updateDetails();
    if (step === 1) {
      setActiveTabTitle(AppText.EnterProjectDetails);
    } else if (step === 2) {
      setActiveTabTitle(AppText.EnterDescriptiondetails);
    }
  };

  return (
    <>
      <SafeAreaWrapper>
        <HeaderWithBackButton
          title={AppText.DailyDairyEntry}
          onBackClick={() => goBack()}
          customStyle={undefined}
        />
        <Text style={styles.sectionTitle}>{ActiveTabTitle}</Text>
        <CircleTabs
          ActiveTab={ActiveTab}
          Tabs={[1, 2]}
          lineWidth={78}
          onTabPress={(tab) => clickOnTabs(tab)}
        />
        <ScrollViewWrapper>
          <KeyboardAwareScrollView
              style={styles.content}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
        {ActiveTab == 1 ? (
          <>
            
              <IconTextInput
                value={selectedDate}
                label={"Date"}
                onChangeText={(text) => {}}
                editable={false}
                rightIconName={"calendar"}
                onClickIcon={() => {
                  clickOnPicker(typeOfPicker.date);
                }}
              />

              <CustomTextInput
                onChangeTextValue={(text) => {}}
                textValue={ProjectName}
                label="Project Name"
                editable={false}
              />

              <CustomTextInput
                onChangeTextValue={(text) => {}}
                textValue={ProjectNumber}
                label="Project Number"
                editable={false}
              />

              <CustomTextInput
                ref={ownerRef}
                onChangeTextValue={(text) => {
                  setOwner(text);
                }}
                textValue={Owner}
                label="Owner"
                editable={false}
                onSubmitEditing={() => reportNumberRef.current?.focus()}
                returnKeyLabel="next"
              />

              <CustomTextInput
                ref={reportNumberRef}
                onChangeTextValue={(text) => {
                  setReportNumber(text);
                }}
                textValue={ReportNumber}
                label="Report Number"
                onSubmitEditing={() => contractNumberRef.current?.focus()}
                returnKeyLabel="next"
              />

              <CustomTextInput
                ref={contractNumberRef}
                onChangeTextValue={(text) => {
                  setContractNumber(text);
                }}
                textValue={ContractNumber}
                label="Contract Number"
                onSubmitEditing={() => contractorRef.current?.focus()}
                returnKeyLabel="next"
              />

              <CustomTextInput
                ref={contractorRef}
                onChangeTextValue={(text) => {
                  setContractor(text);
                }}
                textValue={Contractor}
                label="Contractor"
                onSubmitEditing={() => ownerContactRef.current?.focus()}
                returnKeyLabel="next"
              />

              <CustomTextInput
                ref={ownerContactRef}
                onChangeTextValue={(text) => {
                  setOwnerContact(text);
                }}
                textValue={OwnerContact}
                label="Owner Contact"
                onSubmitEditing={() => ownerProjectManagerRef.current?.focus()}
                returnKeyLabel="next"
              />

              <CustomTextInput
                onChangeTextValue={(text) => {
                  setOwnerProjectManager(text);
                }}
                textValue={OwnerProjectManager}
                label="Owner Project Manager"
                ref={ownerProjectManagerRef}
                onSubmitEditing={() => Keyboard.dismiss()}
                returnKeyLabel="done"
              />

            {ShowPickerModal ? (
              <DateTimePicker
                testID="dateTimePicker"
                isVisible={ShowPickerModal}
                date={selectedDate ? new Date(selectedDate) : new Date()}
                mode={selectedPickerType == typeOfPicker.date ? "date" : "time"}
                onConfirm={(date) => onDateChange(date)}
                onCancel={() => setShowPickerModal(false)}
                textColor="black" // Force text color (iOS 14+)
                themeVariant="light"
              />
            ) : null}
          </>
        ) : null}

        {ActiveTab == 2 ? (
          <>
            <CustomText title="Description" fontFamily={AppFonts.Medium} />
            <TextInput
              mode="outlined" // or 'flat' based on your design preference
              style={[styles.textArea]}
              label={"Add Project Description"}
              multiline={true}
              numberOfLines={6} // Set minimum number of lines
              value={""}
              onChangeText={(text) => {}}
              returnKeyType="done"
              activeOutlineColor={AppColor.PRIMARY}
              blurOnSubmit={true}
              onSubmitEditing={() => Keyboard.dismiss()}
            />

            <VoiceToTextButton setDescription={setDescription} />
            <CustomText title="Signature" fontFamily={AppFonts.Medium} />

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
                    <Image
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

            <CustomText title="Chargable" fontFamily={AppFonts.Medium} />

            <View style={styles.container}>
              <CustomRadioButton
                label="Yes"
                value="option1"
                status={IsChargable ? "checked" : "unchecked"}
                onPress={() => setIsChargable(true)}
              />
              <CustomRadioButton
                label="No"
                value="option2"
                status={!IsChargable ? "checked" : "unchecked"}
                onPress={() => setIsChargable(false)}
              />
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
        ) : null}
        </KeyboardAwareScrollView>
          </ScrollViewWrapper>

      </SafeAreaWrapper>

       <NextPreviewButton
        ActiveTab={ActiveTab}
        clickOnPrevious={() => {
          if (ActiveTab > 1) {
            clickOnTabs(ActiveTab - 1);
          } else {
            // navigation.goBack();
          }
        }}
        clickOnNext={() => {
          if (ActiveTab == 2) {
            // callToPreview();
          } else {
            clickOnTabs(ActiveTab + 1);
          }
        }}
        size={2}
      />
    </>
  );
};

export default DailyDairyEntryScreen;

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  label: {
    fontSize: moderateScale(16),
    color: AppColor.BLACK,
    marginBottom: 4,
    fontFamily: AppFonts.Bold,
  },
  textArea: {
    minHeight: 200, // Ensure enough space for multiline
    textAlignVertical: "top", // Align text to top (important for multiline)
    backgroundColor: "white",
    marginVertical: 8,
  },
  sectionTitle: {
    fontSize: 18,
    color: AppColor.PRIMARY,
    fontFamily: AppFonts.Medium,
  },
  container: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 20,
  },
});
