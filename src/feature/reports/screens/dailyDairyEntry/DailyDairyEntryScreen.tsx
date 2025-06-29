import { Keyboard, Platform, StyleSheet, Text, View } from "react-native";
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
import { AppColor } from "../../../../themes/AppColor";
import { Constants } from "../../../../constants/constants";

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
  const [Date, setDate] = useState("");
  const [ProjectName, setProjectName] = useState("");
  const [ProjectNumber, setProjectNumber] = useState("");
  const [Owner, setOwner] = useState("");
  const [ReportNumber, setReportNumber] = useState("");
  const [ContractNumber, setContractNumber] = useState("");
  const [Contractor, setContractor] = useState("");
  const [OwnerContact, setOwnerContact] = useState("");
  const [OwnerProjectManager, setOwnerProjectManager] = useState("");
        const [ActiveTabTitle, setActiveTabTitle] = useState(AppText.EnterProjectDetails);


  useEffect(() => {
    if (route?.params?.project) {
      const schedule = route?.params?.project;
      setDate(Date);
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

   const clickOnTabs = (step:number) => {
                setActiveTabs(step)
                if (step === 1) {
                    setActiveTabTitle(AppText.EnterProjectDetails)
                }
                else if (step === 2) {
                    setActiveTabTitle(AppText.EnterDescriptiondetails)
                }
            }
  return (
    <>
      <SafeAreaWrapper>
        <HeaderWithBackButton
          title={AppText.DailyDairyEntry}
          onBackClick={() => goBack()}
          customStyle={undefined}
        />
        <CircleTabs
          ActiveTab={ActiveTab}
          Tabs={[1, 2]}
          lineWidth={78}
          onTabPress={(tab) => setActiveTabs(tab)}
        />

        
          {ActiveTab == 1 ? (
            
            <ScrollViewWrapper>
              <IconTextInput
                value={""}
                label={"Date"}
                onChangeText={(text) => {}}
                editable={false}
                rightIconName={"calendar"}
                onClickIcon={() => {
                  // setIsSecure(!IsSecure);
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
                onChangeTextValue={(text) => {}}
                textValue={Owner}
                label="Owner"
                editable={false}
                onSubmitEditing={() => reportNumberRef.current?.focus()}
                returnKeyLabel="next"
              />
              <CustomTextInput
                ref={reportNumberRef}
                onChangeTextValue={(text) => {}}
                textValue={""}
                label="Report Number"
                onSubmitEditing={() => contractNumberRef.current?.focus()}
                returnKeyLabel="next"
              />

              <CustomTextInput
                ref={contractNumberRef}
                onChangeTextValue={(text) => {}}
                textValue={""}
                label="Contract Number"
                onSubmitEditing={() => contractorRef.current?.focus()}
                returnKeyLabel="next"
              />
              <CustomTextInput
                ref={contractorRef}
                onChangeTextValue={(text) => {}}
                textValue={""}
                label="Contractor"
                onSubmitEditing={() => ownerContactRef.current?.focus()}
                returnKeyLabel="next"
              />
              <CustomTextInput
                ref={ownerContactRef}
                onChangeTextValue={(text) => {}}
                textValue={""}
                label="Owner Contact"
                onSubmitEditing={() => ownerProjectManagerRef.current?.focus()}
                returnKeyLabel="next"
              />
              <CustomTextInput
                onChangeTextValue={(text) => {}}
                textValue={""}
                label="Owner Project Manager"
                ref={ownerProjectManagerRef}
                onSubmitEditing={() => Keyboard.dismiss()}
                returnKeyLabel="done"
              />
           </ScrollViewWrapper>
          ) : null}
        
      </SafeAreaWrapper>

      <View style={[styles.buttonContainer, { gap: 10 }]}>
        {ActiveTab > 1 ? (
          <View style={{ flex: 1, height: 50 }}>
            <CustomButton
              title="Previous"
              onPress={() => {
                if (ActiveTab > 1) {
                  clickOnTabs(ActiveTab - 1);
                } else {
                  // navigation.goBack();
                }
              }}
            />
          </View>
        ) : null}

        <View style={{ flex: 1, height: 50 }}>
          <CustomButton
            title={ActiveTab == 2 ? "Preview" : "Next"}
            onPress={() => {
              if (ActiveTab == 2) {
                // callToPreview();
              } else {
                clickOnTabs(ActiveTab + 1);
              }
            }}
          />
        </View>
      </View>
    </>
  );
};

export default DailyDairyEntryScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    width: "95%",
    alignSelf: "center",
    position: "absolute",
    bottom: Platform.OS == "ios" ? 30 : 10,
    borderRadius: 8,
    justifyContent: "center",
    flexDirection: "row", 
    
    // alignItems: "center",
  },
});
