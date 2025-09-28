import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { WeeklyEntryScreenProps } from "../../../../types/navigation";
import { SafeAreaWrapper } from "../../../../components/SafeAreaWrapper/SafeAreaWrapper";
import HeaderWithBackButton from "../../../../components/Button/HeaderWithBackButton";
import { goBack, navigate } from "../../../../utils/NavigationUtil";
import { AppText } from "../../../../constants/appText";
import WeeklyReportDetails from "../../components/WeeklyReportDetails";
import ScrollViewWrapper from "../../../../components/ScrollViewWrapper/ScrollViewWrapper";
import useWeeklyEntry from "../../hooks/WeeklyEntryScreen.hook";
import NextPreviewButton from "../../../../components/Button/NextPreviewButton";
import WeeklyReportTab2 from "../../components/WeeklyReportTab2";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

const WeeklyEntryScreen: React.FC<WeeklyEntryScreenProps> = ({ route }) => {
  const {
    ActiveTab,
    clickOnTabs,
    reportDate,
    setReportDate,
    consultantProjectManager,
    setConsultantProjectManager,
    contractNumber,
    setContractNumber,
    cityProjectManager,
    setCityProjectManager,
    contractProjectManager,
    setContractProjectManager,
    contractorSiteSupervisorOnshore,
    setContractorSiteSupervisorOnshore,
    contractorSiteSupervisorOffshore,
    setContractorSiteSupervisorOffshore,
    contractAdministrator,
    setContractAdministrator,
    supportCA,
    setSupportCA,
    siteInspector,
    setSiteInspector,
    inspectorTimeIn,
    setInspectorTimeIn,
    inspectorTimeOut,
    setInspectorTimeOut,
    projectName,
    projectNumber,
    owner,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    signature,
    setSignature,
    onActivityCreated,
    updateDetails,
    WeeklyAllList,
    setWeeklyAllList,
    callToPreview
    
  } = useWeeklyEntry();

  useEffect(() => {
    const project = route?.params?.project;
    if (project) {
      onActivityCreated(project);
    }
  }, []);

  return (
    <>
      <SafeAreaWrapper>
        <HeaderWithBackButton
          title={AppText.WeeklyEntry}
          onBackClick={() => goBack()}
          customStyle={undefined}
        />
        <ScrollViewWrapper>

          {ActiveTab == 1 ? (
            <KeyboardAwareScrollView
            style={{
              flex: 1,
            }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <WeeklyReportDetails
              setReportDate={setReportDate}
              setContractNumber={setContractNumber}
              setConsultantProjectManager={setConsultantProjectManager}
              setCityProjectManager={setCityProjectManager}
              setContractProjectManager={setContractProjectManager}
              setContractorSiteSupervisorOnshore={
                setContractorSiteSupervisorOnshore
              }
              setContractorSiteSupervisorOffshore={
                setContractorSiteSupervisorOffshore
              }
              setContractAdministrator={setContractAdministrator}
              setSupportCA={setSupportCA}
              setSiteInspector={setSiteInspector}
              setInspectorTimeIn={setInspectorTimeIn}
              setInspectorTimeOut={setInspectorTimeOut}
              reportDate={reportDate}
              contractNumber={contractNumber}
              consultantProjectManager={consultantProjectManager}
              cityProjectManager={cityProjectManager}
              contractProjectManager={contractProjectManager}
              contractorSiteSupervisorOnshore={contractorSiteSupervisorOnshore}
              contractorSiteSupervisorOffshore={
                contractorSiteSupervisorOffshore
              }
              contractAdministrator={contractAdministrator}
              supportCA={supportCA}
              siteInspector={siteInspector}
              inspectorTimeIn={inspectorTimeIn}
              inspectorTimeOut={inspectorTimeOut}
              owner={owner}
              projectName={projectName}
              projectNumber={projectNumber}
            />
            </KeyboardAwareScrollView>
          ) : null}

          {ActiveTab == 2 ? (
            <KeyboardAwareScrollView
            style={{
              flex: 1,
            }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          > 
            <WeeklyReportTab2
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              signature={signature}
              setSignature={setSignature}
              WeeklyAllList={WeeklyAllList}
              setWeeklyAllList={setWeeklyAllList}
            />
            </KeyboardAwareScrollView>
          ) : null}

        </ScrollViewWrapper>
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

           callToPreview()
          } else {
            clickOnTabs(ActiveTab + 1);
          }
        }}
        size={2}
      />
    </>
  );
};

export default WeeklyEntryScreen;
