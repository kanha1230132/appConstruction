import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateWeeklyReports } from "../../../store/slice/Reports";
import {
  SchedulesResponse,
  WeeklyReportResponse,
} from "../../../api/apiInterface";
import moment from "moment";
import RestClient from "../../../api/restClient";
import { WeeklyDataStructure } from "../../../utils/interface";
import { RootState } from "../../../store/store";
import { navigate } from "../../../utils/NavigationUtil";
import { screenNames } from "../../../navigation/ScreenNames";
import { useToast } from "react-native-toast-notifications";
import useToastHook from "../../../hooks/toast";

const useWeeklyEntry = () => {
  const {UserName} = useSelector((state: RootState) => state.User);

  const [Schedule, setSchedule] = useState<SchedulesResponse>();
  const [ActiveTab, setActiveTabs] = useState(1);
  const [reportDate, setReportDate] = useState<string>("");
  const [projectName, setProjectName] = useState<string>("");
  const [owner, setOwner] = useState<string>("");
  const [consultantProjectManager, setConsultantProjectManager] =
    useState<string>("");
  const [projectNumber, setProjectNumber] = useState<string>("");
  const [contractNumber, setContractNumber] = useState<string>("");
  const [cityProjectManager, setCityProjectManager] = useState<string>("");
  const [contractProjectManager, setContractProjectManager] =
    useState<string>("");
  const [contractorSiteSupervisorOnshore, setContractorSiteSupervisorOnshore] =
    useState<string>("");
  const [
    contractorSiteSupervisorOffshore,
    setContractorSiteSupervisorOffshore,
  ] = useState<string>("");
  const [contractAdministrator, setContractAdministrator] =
    useState<string>("");
  const [supportCA, setSupportCA] = useState<string>("");
  const [siteInspector, setSiteInspector] = useState<string[]>([UserName]);
  const [inspectorTimeIn, setInspectorTimeIn] = useState<string>("");
  const [inspectorTimeOut, setInspectorTimeOut] = useState<string>("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [signature, setSignature] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [WeeklyAllList, setWeeklyAllList] = useState<WeeklyDataStructure>();
  const {WeeklyReports} = useSelector((state:RootState)=> state.Reports);
  const {showToast} = useToastHook();

  useEffect(() => {
    if (startDate && endDate) {
      fetchWeeklyData(startDate, endDate);
    }
  }, [startDate, endDate]);

  const onActivityCreated = (project: SchedulesResponse) => {
    setSchedule(project);
    setProjectName(project.project_name);
    setProjectNumber(project.project_number);
    setOwner(project.owner);
    if (!reportDate) {
      setReportDate(moment().format("YYYY-MM-DD"));
    }
  };

  const fetchWeeklyData = async (startDate: string, endDate: string) => {
    const param = {
      filter: {
        schedule_id: Schedule?.id,
        startDate: startDate,
        endDate: endDate,
      },
    };
    setLoading(true);
    try {
      const restClient = new RestClient();
      const response = await restClient.getWeeklyReport(param);
      console.log("response: ", JSON.stringify(response));
      if (response && typeof response != "string") {
        const groupedList = groupByDate(response.data);
        setWeeklyAllList(groupedList);
      } else {
      }
    } catch (error) {
      console.log("first error: ", error);
    }
  };

  function groupByDate(data: WeeklyReportResponse) {
    const { dailyDiary, dailyEntry } = data;
    const normalizeDate = (dateStr: string) =>
      new Date(dateStr).toISOString().split("T")[0];
    const groupedMap: any = {};
    // Process dailyDiary
    dailyDiary.forEach((item) => {
      const date = normalizeDate(item.selectedDate);
      if(item.IsChargable){
 if (!groupedMap[date]) groupedMap[date] = {};
      if (!groupedMap[date][item.userId+","+item.username]) {
        groupedMap[date][item.userId+","+item.username] = { diary: [], entry: [],username :item.username };
      }
      groupedMap[date][item.userId+","+item.username].diary.push(item);
      }
     
    });

    // Process dailyEntry
    dailyEntry.forEach((item) => {
      const date = normalizeDate(item.selected_date);
      if (!groupedMap[date]) groupedMap[date] = {};
      if (!groupedMap[date][item.userId+","+item.username]) {
        groupedMap[date][item.userId+","+item.username] = { diary: [], entry: [],username :item.username  };
      }
      groupedMap[date][item.userId+","+item.username].entry.push(item);
    });

    return groupedMap;
  }

  // Usage

  const updateDetails = () => {
    const reportDetails = {
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
      WeeklyAllList,
      schedule: Schedule,
      startDate,
      endDate,
      signature,
      selectedLogo: WeeklyReports && WeeklyReports?.selectedLogo,
      Images: WeeklyReports && WeeklyReports?.Images
    };
    dispatch(updateWeeklyReports(reportDetails));
  };

  const clickOnTabs = (step: number) => {
    setActiveTabs(step);
    updateDetails();
  };


  const callToPreview = ()=>{
      if(!cityProjectManager || !cityProjectManager || !contractProjectManager || !contractorSiteSupervisorOnshore || !contractorSiteSupervisorOffshore || !contractAdministrator || !supportCA || !siteInspector || !inspectorTimeIn || !inspectorTimeOut || !startDate || !endDate ){
        showToast("Needs to fill empty input fields", "warning");
        return;
      }

    updateDetails();
    navigate(screenNames.WeeklyPreviewScreen);
  }

  return {
    ActiveTab,
    setActiveTabs,
    updateDetails,
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
    loading,
    setLoading,
    projectName,
    projectNumber,
    owner,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    signature,
    setSignature,
    setSchedule,
    onActivityCreated,
    WeeklyAllList,
    setWeeklyAllList,
    callToPreview
  };
};

export default useWeeklyEntry;
