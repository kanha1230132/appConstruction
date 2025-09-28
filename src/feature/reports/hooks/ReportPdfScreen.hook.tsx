import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import RestClient from "../../../api/restClient";
import { DailyDiaryReport, DailyReport } from "../helper/interface";
import { useDispatch } from "react-redux";
import {
  updateDailyDairyReports,
  updateDailyReports,
  updateWeeklyReports,
} from "../../../store/slice/Reports";
import { navigate } from "../../../utils/NavigationUtil";
import { screenNames } from "../../../navigation/ScreenNames";
import {
  CompanyLogoResponse,
  SchedulesResponse,
} from "../../../api/apiInterface";
import { formLists } from "../helper/util";
import { WeeklyReport } from "../helper/weeklyInterface";
const restClient = new RestClient();
const useReportPdfScreen = () => {
  const [DiaryReportList, setDiaryReportList] = useState<DailyDiaryReport[]>(
    []
  );
  const [DailyReportList, setDailyReportList] = useState<DailyReport[]>([]);
  const [WeeklyReportList, setWeeklyReportList] = useState<WeeklyReport[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<"All" | string>("All");
  const [ShowUserSelection, setShowUserSelection] = useState(false);
  const [Schedule, setSchedule] = useState<SchedulesResponse>();
  const dispatch = useDispatch();
  const [FullyDailyReport, setFullyDailyReport] = useState<DailyReport[]>([]);
  const [FullyDairyReport, setFullyDairyReport] = useState<DailyDiaryReport[]>(
    []
  );
  const [FullyWeeklyReport, setFullyWeeklyReport] = useState<WeeklyReport[]>(
    []
  );
  const [pdfType, setPdfType] = useState("daily");
  const [UserList, setUserList] = useState([]);

  const callToDailyPdfApi = async (param: any) => {
    try {
      setLoading(true);
      const response = await restClient.getPdfDailyReport(param);
      if (response && typeof response != "string") {
        getDailyUsers(response.data);
        console.log("Repsone : ", JSON.stringify(response.data));
        response.data && setDailyReportList(response.data),
          setFullyDailyReport(response.data);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const getDailyUsers = (report: any[]) => {
    const map = new Map();
    const list = [];
    report.forEach((item) => {
      if (map.has(item.userId)) {
        return;
      }
      list.push({ id: item.userId, username: item.username });
      map.set(item.userId, { id: item.userId, username: item.username });
    });
    setUserList(list);
  };

  const callToWeeklyPdfApi = async (param: any) => {
    try {
      setLoading(true);
      const response = await restClient.getPdfWeeklyReport(param);
      if (response && typeof response != "string") {
        console.log("Repsone : ", JSON.stringify(response.data));
        getDailyUsers(response.data);

        response.data && setWeeklyReportList(response.data),
          setFullyWeeklyReport(response.data);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const callToDailyDiaryPdfApi = async (param: any) => {
    try {
      setLoading(true);
      const response = await restClient.getPdfDiaryReport(param);
      console.log("Repsone : ", response);
      if (response && typeof response != "string") {
        getDailyUsers(response.data);

        response.data && setDiaryReportList(response.data),
          setFullyDairyReport(response.data);
      }
    } catch (error) {
      console.log("Error callToDailyDiaryPdfApi : ", error);
    } finally {
      setLoading(false);
    }
  };

  const callToPressOnDiaryPdf = (item: DailyDiaryReport) => {
    try {
        const companyLogos = [];
      let logoItems: CompanyLogoResponse = {
        id: "",
        companyName: "",
        folder_name: "",
        logoUrl: "",
        __v: 0,
        file_url: "",
      };
      item.logo.map((item) => {
        logoItems = {
          file_url: item.path,
          companyName: item.companyName,
        };
        companyLogos.push(logoItems);
      });
      const data = {
        selectedDate: item.selectedDate,
        ProjectName: Schedule?.project_name,
        ProjectNumber: Schedule?.project_number,
        Owner: Schedule?.owner,
        ReportNumber: item.reportNumber,
        ContractNumber: item.contractNumber,
        Contractor: item.contractor,
        OwnerContact: item.ownerContact,
        OwnerProjectManager: item.ownerProjectManager,
        Description: item.description,
        IsChargable: item.IsChargable,
        signature: item.signature,
        siteInspector: item.siteInspector,
        timeIn: item.timeIn,
        timeOut: item.timeOut,
        // schedule: route?.params?.project,
        selectedLogo: companyLogos,
      };
      dispatch(updateDailyDairyReports(data));
      navigate(screenNames.DailyDairyPreviewScreen, {
        isSubmit: true,
      });
    } catch (error) {}
  };

  const callToPressOnDailyPdf = (item: DailyReport) => {
    try {
      console.log("item:",JSON.stringify(item));
      const listItems = [];
      let items = {
        uri: "",
        description: "",
      };
      item.photoFiles.map((item) => {
        items = {
          uri: item.path,
          description: item.comment,
        };
        listItems.push(items);
      });

      const companyLogos = [];
      let logoItems: CompanyLogoResponse = {
        id: "",
        companyName: "",
        folder_name: "",
        logoUrl: "",
        __v: 0,
        file_url: "",
      };
      item.logo.map((item) => {
        logoItems = {
          file_url: item.path,
          companyName: item.companyName,
        };
        companyLogos.push(logoItems);
      });

      const data = {
        selectedDate: item.selected_date,
        Location: item.location,
        onShore: item.on_shore,
        Weather: item.weather,
        WorkingDay: item.working_day,
        ProjectName: item.project_name,
        ProjectNumber: item.project_number,
        Owner: item.owner,
        ReportNumber: item.report_number,
        ContractNumber: item.contract_number,
        Contractor: item.contractor,
        OwnerContact: item.owner_contact,
        OwnerProjectManager: item.owner_project_manager,
        timeIn: item.time_in,
        timeOut: item.time_out,
        HighTemp: item.temp_high,
        LowTemp: item.temp_low,
        signature: item.signature,
        Description: item.description,
        Equipments: item.equipments,
        Labour: item.labours,
        Visitors: item.visitors,
        DeclerationFrom: item.declerationFrom ? { declrationForm: JSON.parse(item.declerationFrom) } : { declrationForm: formLists },
        component: item.component,
        siteInspector: item.site_inspector,
        schedule: Schedule,
        Images: listItems,
        selectedLogo: companyLogos,
      };
      
      dispatch(updateDailyReports(data));
      navigate(screenNames.DailyPreviewScreen, {
        isSubmit: true,
      });
    } catch (error) {
      console.log("Erro :", error)
    }
  };

  const callToPressOnWeeklyPdf = (item: WeeklyReport) => {
    try {
      const listItems = [];
      let items = {
        uri: "",
        description: "",
      };
      item.photoFiles.map((item) => {
        items = {
          uri: item.path,
          description: item?.comment,
        };
        listItems.push(items);
      });

      const companyLogos = [];
      let logoItems: CompanyLogoResponse = {
        id: "",
        companyName: "",
        folder_name: "",
        logoUrl: "",
        __v: 0,
        file_url: "",
      };
      item.logo.map((item) => {
        logoItems = {
          file_url: item.path,
          companyName: item.companyName,
        };
        companyLogos.push(logoItems);
      });

      const data = {
        schedule: Schedule,
        reportDate: item.reportDate,
        consultantProjectManager: item.consultantProjectManager,
        contractNumber: item.contractNumber,
        cityProjectManager: item.cityProjectManager,
        contractProjectManager: item.contractProjectManager,
        contractorSiteSupervisorOnshore: item.contractorSiteSupervisorOnshore,
        contractorSiteSupervisorOffshore: item.contractorSiteSupervisorOffshore,
        contractAdministrator: item.contractAdministrator,
        supportCA: item.supportCA,
        siteInspector: item.siteInspector,
        inspectorTimeIn: item.inspectorTimeIn,
        inspectorTimeOut: item.inspectorTimeOut,
        WeeklyAllList: item.weeklyAllList,
        startDate: item.weekStartDate,
        endDate: item.weekEndDate,
        signature: item.signature,
        Images: listItems,
        selectedLogo: companyLogos,
      };
      dispatch(updateWeeklyReports(data));
      navigate(screenNames.WeeklyPreviewScreen, {
        isSubmit: true,
      });
    } catch (error) {}
  };

  const callToConnfirmUserSelection = () => {
    setSelectedUser(selectedUser);
    if (pdfType == "daily") {
      if (selectedUser == "All") {
        setDailyReportList(FullyDailyReport);
      } else {
        setDailyReportList(
          FullyDailyReport.filter(
            (item) => item.username + " (" + item.userId + ")" == selectedUser
          )
        );
      }
    } else if (pdfType == "weekly") {
      if (selectedUser == "All") {
        setWeeklyReportList(FullyWeeklyReport);
      } else {
        setWeeklyReportList(
          FullyWeeklyReport.filter(
            (item) => item.username + " (" + item.userId + ")" == selectedUser
          )
        );
      }
    } else if (pdfType == "diary") {
      if (selectedUser == "All") {
        setDiaryReportList(FullyDairyReport);
      } else {
        setDiaryReportList(
          FullyDairyReport.filter(
            (item) => item.username + " (" + item.userId + ")" == selectedUser
          )
        );
      }
    }

    setShowUserSelection(false);
  };
  return {
    callToDailyPdfApi,
    callToWeeklyPdfApi,
    callToDailyDiaryPdfApi,
    DiaryReportList,
    callToPressOnDiaryPdf,
    setSchedule,
    Schedule,
    DailyReportList,
    WeeklyReportList,
    loading,
    setLoading,
    callToPressOnDailyPdf,
    callToPressOnWeeklyPdf,
    callToConnfirmUserSelection,
    selectedUser,
    setSelectedUser,
    ShowUserSelection,
    setShowUserSelection,
    setPdfType,
    UserList,
  };
};

export default useReportPdfScreen;
