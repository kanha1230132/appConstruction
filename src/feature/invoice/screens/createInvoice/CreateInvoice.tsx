import { Keyboard, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaWrapper } from "../../../../components/SafeAreaWrapper/SafeAreaWrapper";
import HeaderWithBackButton from "../../../../components/Button/HeaderWithBackButton";
import { AppText } from "../../../../constants/appText";
import { goBack } from "../../../../utils/NavigationUtil";
import CircleTabs from "../../../reports/components/CircleTabs";
import useCreateInvoice from "../../hooks/createInvoice.hook";
import { AppColor } from "../../../../themes/AppColor";
import { AppFonts } from "../../../../themes/AppFonts";
import NextPreviewButton from "../../../../components/Button/NextPreviewButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import CustomTextInput from "../../../../components/CustomTextInput/CustomTextInput";
import { TextInput } from "react-native-paper";
import IconTextInput from "../../../../components/CustomTextInput/CustomIconTextInput";
import DateTimePicker from "react-native-modal-datetime-picker";
import { CreateInvoiceScreenProps } from "../../../../types/navigation";
import InvoiceInspectorDetails from "../../components/InvoiceInspectorDetails";


const CreateInvoiceScreen: React.FC<CreateInvoiceScreenProps> = ({route}) => {
  const {
    ActiveTabTitle,
    setActiveTabTitle,
    ActiveTab,
    setActiveTabs,
    clickOnTabs,
    projectName,
    setProjectName,
    owner,
    setOwner,
    consultantProjectManager,
    setConsultantProjectManager,
    projectNumber,
    setProjectNumber,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    description,
    setdescription,
     clickOnPicker,
    showPickerModal,
    setShowPickerModal,
    selectedPickerType,
    onDateChange,
    onActivityCreated,
    clickOnPreview,
    siteInspectors,
    selectedInspector,
    setSelectedInspector,
    Invoice,
    changeRate,
    changeBillableHours,
    calculateTotalHours,
     terms,
    setTerms,
    invoiceNo,
    setInvoiceNo,
    DueDate,
    setDueDate,
    SelectedDate,
    setSelectedDate,
    SelectedDateUsers,
    setSiteInspectors
  } = useCreateInvoice();


  useEffect(() => {
    const project = route.params?.project
    if(project){
      onActivityCreated(project)   

      // console.log("first : ", calculateTotalHours("04:30 PM","02:30 AM"));
    }
  }, [])

  useEffect(() => {
    // Keyboard.dismiss()

    console.log("SelectedDateUsers:", JSON.stringify(SelectedDateUsers))
  }, [SelectedDateUsers])

  
  return (
    <>
      <SafeAreaWrapper>
        <HeaderWithBackButton
          title={AppText.Invoice}
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

        {ActiveTab === 1 && (
          <KeyboardAwareScrollView
            style={{
              flex: 1,
            }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
             <IconTextInput
                  key={Math.random()}
                  onClickIcon={() => clickOnPicker("selectedDate")}
                  value={SelectedDate}
                  label="Start Date"
                  rightIconName="calendar-outline"
                  editable={false}
                />

                <IconTextInput
                  key={Math.random()}
                  onClickIcon={() => clickOnPicker('dueDate')}
                  value={DueDate}
                  label="Due Date"
                  rightIconName="calendar-outline"
                  editable={false}
                />

            <CustomTextInput
              onChangeTextValue={(text) => setOwner(text)}
              textValue={owner}
              label="Client"
              editable={false}
            />



            <View style={styles.rowContainer}>
              <View style={styles.halfInputContainer}>
                <IconTextInput
                  key={Math.random()}
                  onClickIcon={() => clickOnPicker("fromDate")}
                  value={startDate}
                  label="Start Date"
                  rightIconName="calendar-outline"
                  editable={false}
                />
              </View>

              <View style={styles.halfInputContainer}>
                <IconTextInput
                  key={Math.random()}
                  onClickIcon={() => clickOnPicker("toDate")}
                  value={endDate}
                  label="End Date"
                  rightIconName="calendar-outline"
                  editable={false}
                />
              </View>
            </View>

            <CustomTextInput
              onChangeTextValue={(text) => setProjectName(text)}
              textValue={projectName}
              label="Project Name"
              editable={false}
            />
            <CustomTextInput
              onChangeTextValue={(text) => setProjectNumber(text)}
              textValue={projectNumber}
              label="Project No./Client PO"
              editable={false}
            />

            <CustomTextInput
              onChangeTextValue={(text) => setConsultantProjectManager(text)}
              textValue={consultantProjectManager}
              label="Invoice To"
              editable={false}

            />

              <CustomTextInput
              onChangeTextValue={(text) => setInvoiceNo(text)}
              textValue={invoiceNo}
              label="Invoice No"
            />

            <CustomTextInput
              onChangeTextValue={(text) => setTerms(text)}
              textValue={terms}
              label="Terms"

            />

            <TextInput
              mode="outlined" // or 'flat' based on your design preference
              style={[styles.textArea]}
              label={"Description"}
              multiline={true}
              numberOfLines={6} // Set minimum number of lines
              value={description}
              onChangeText={(text) => setdescription(text)}
              returnKeyType="done"
              activeOutlineColor={AppColor.PRIMARY}
              textColor={AppColor.BLACK}
              onSubmitEditing={() => Keyboard.dismiss()}
              onBlur={() => Keyboard.dismiss()}

            />
           

<View style={{height:100}}/>

          </KeyboardAwareScrollView>
        )}


        {
          ActiveTab === 2 && (
            <KeyboardAwareScrollView
              style={{
                flex: 1,
              }}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >

              <InvoiceInspectorDetails setSiteInspectors={setSiteInspectors} setSelectedInspector={setSelectedInspector} changeBillableHours={changeBillableHours} Invoice = {Invoice} selectedInspector={selectedInspector}  siteInspectors = {siteInspectors} changeRate={changeRate}/>
            </KeyboardAwareScrollView>
          )
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
          if (ActiveTab === 2) {
            clickOnPreview()
          } else {
            clickOnTabs(ActiveTab + 1);
          }
        }}
        size={2}
      />

      {showPickerModal && (
        <DateTimePicker
          isVisible={showPickerModal}
          // value={
          //   selectedPickerType === "fromDate"
          //     ? (selectedPickerType === "toDate" ? new Date(endDate || new Date()) :selectedPickerType === "toDate")
          //     : new Date(endDate || new Date())
          // }
          onConfirm={(date: Date) => onDateChange(null, date)}
          onCancel={() => setShowPickerModal(false)}
          textColor="black"
          themeVariant="light"
          isDarkModeEnabled={false}
        />
      )}
    </>
  );
};

export default CreateInvoiceScreen;

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    color: AppColor.PRIMARY,
    fontFamily: AppFonts.Medium,
  },
    textArea: {
    minHeight: 200, // Ensure enough space for multiline
    textAlignVertical: "top", // Align text to top (important for multiline)
    backgroundColor: "white",
    marginVertical: 8,
    color:AppColor.BLACK
  },
    rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfInputContainer: {
    width: "48%",
  },
});
