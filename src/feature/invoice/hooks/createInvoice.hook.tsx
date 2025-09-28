import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { AppText } from "../../../constants/appText";
import moment from "moment";
import { DateFormat } from "../../../utils/dateUtil";
import { SchedulesResponse } from "../../../api/apiInterface";
import { useDispatch, useSelector } from "react-redux";
import { updateInvoiceDetails } from "../../../store/slice/Reports";
import { navigate } from "../../../utils/NavigationUtil";
import { screenNames } from "../../../navigation/ScreenNames";
import RestClient from "../../../api/restClient";
import { RootState } from "../../../store/store";
import { useConfirmationPopup } from "../../../components/Popup/confirmationPopup";

const useCreateInvoice = () => {
  const [ActiveTabTitle, setActiveTabTitle] = useState(
    AppText.EnterInvoiceDetails
  );
  const [ActiveTab, setActiveTabs] = useState(1);
  const [projectName, setProjectName] = useState<string>("");
  const [owner, setOwner] = useState<string>("");
  const [consultantProjectManager, setConsultantProjectManager] =
    useState<string>("");
  const [projectNumber, setProjectNumber] = useState<string>("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setdescription] = useState("");
  const [selectedPickerType, setSelectedPickerType] = useState<
    "fromDate" | "toDate" | "dueDate" | "selectedDate"
  >("fromDate");
  const [showPickerModal, setShowPickerModal] = useState(false);
  const [schedule, setSchedule] = useState<SchedulesResponse>();
  const dispatch = useDispatch();
  const [selectedInspector, setSelectedInspector] = useState();
  const [siteInspectors, setSiteInspectors] = useState([]);
  const [workFromEntry, setWorkFromEntry] = useState([]);
  const { Invoice } = useSelector((state: RootState) => state.Reports);
  const { showConfirmationPopup,
    ConfirmationPopup,
    popupVisible,} = useConfirmationPopup();
     const [IsSubmit, setIsSubmit] = useState(false);

     const [terms, setTerms] = useState("");
     const [invoiceNo, setInvoiceNo] = useState('');
     const [SelectedDate, setSelectedDate] = useState(moment().format(DateFormat.YYYY_MM_DD));
     const [DueDate, setDueDate] = useState(moment().format(DateFormat.YYYY_MM_DD));
     const [SelectedDateUsers, setSelectedDateUsers] = useState()

  const onActivityCreated = (project: SchedulesResponse) => {
    if (project) {
      setProjectName(project.project_name);
      setOwner(project.owner);
      setProjectNumber(project.project_number);
      setSchedule(project);
      setdescription(project?.invoiceDescription || project?.description);
      setConsultantProjectManager(project?.invoice_to);
    }
  };

  useEffect(() => {
    if (startDate && endDate) {
      getInvoiceDetails(startDate, endDate);

      const formattedStart = moment(startDate).format("MMMM D, YYYY");
      const formattedEnd = moment(endDate).format("MMMM D, YYYY");
      const baseDescription = description.replace(/ specifically from .* up to and including .*\.$/, "");

  setdescription(`${baseDescription} specifically from ${formattedStart} up to and including ${formattedEnd}.`);
    }
  }, [startDate, endDate]);

  const getInvoiceDetails = async (_startDate: string, _endDate: string) => {
    try {
      const restClient = new RestClient();
      const param = {
        filter: {
          startDate: _startDate +" 00:00:00.000",
          endDate: _endDate + " 23:59:00.000",
          schedule_id: schedule?.id,
        },
      };
      const response = await restClient.getWeeklyInvoiceReport(param);
      if (response && typeof response != "string") {
        console.log("response.data :", JSON.stringify(response.data));
        filterData(response.data);
      } else {
      }
    } catch (error) {
      console.log("Error getInvoiceDetails : ", error);
    }
  };

  const updateDetails = () => {
    const list = {
      projectName,
      owner,
      consultantProjectManager,
      projectNumber,
      startDate,
      endDate,
      description,
      schedule,
      siteInspectors,
      workFromEntry,
      selectedInspector,
      terms,
      invoiceNo,
      SelectedDate,
      DueDate

    };
    console.log("list: ", list);
    dispatch(updateInvoiceDetails(list));
  };

  const clickOnTabs = (step: number) => {
    setActiveTabs(step);
    updateDetails();
    if (step === 1) {
      setActiveTabTitle(AppText.EnterInvoiceDetails);
    } else if (step === 2) {
      setActiveTabTitle(AppText.InspectorNameTheirDetails);
    }
  };

  const clickOnPicker = (type: "fromDate" | "toDate" | "dueDate" | "selectedDate") => {
    setShowPickerModal(true);
    setSelectedPickerType(type);

  };

  const onDateChange = (_: any, date?: Date) => {
      if (date) {
      const formattedDate = moment(date).format(DateFormat.YYYY_MM_DD);
      console.log("selectedPickerType:",selectedPickerType)
      if (selectedPickerType === "fromDate") {
        setStartDate(formattedDate);
      }else if(selectedPickerType == "selectedDate") {
        setSelectedDate(formattedDate)
      } else if(selectedPickerType == 'dueDate'){
        setDueDate(formattedDate);
      } else {
        setEndDate(formattedDate);
      }

    setShowPickerModal(false);

    }
  }

  const clickOnPreview = () => {
    updateDetails();
    navigate(screenNames.InvoicePreviewScreen);
  };

  const filterData = (data: any) => {
    const inspectorMap = new Map();
    const wfMap = new Map();
    const dailySet = new Map();
    const dairySet = new Map();

    const wfhome = [];

    data?.forEach((list) => {
      const weeklyAllList = list.weeklyAllList;

      // Loop through each date key
      Object.keys(weeklyAllList).forEach((dateKey) => {
        const inspectorsObj = weeklyAllList[dateKey];

        // Loop through each inspector key ("4,Kanhaiya Lal")
        Object.keys(inspectorsObj).forEach((inspectorKey) => {
          const inspectorData = inspectorsObj[inspectorKey];
          console.log("inspectorData: ", inspectorData)

          // 1. Handle entries
          inspectorData.entry?.forEach((item) => {
            if (!dailySet.has(item.id)) {
              dailySet.set(item.id, item);
            }
          });

          // 2. Handle diary
          inspectorData.diary?.forEach((item) => {
            if (!dairySet.has(item.id)) {
              dairySet.set(item.id, item);
            }
          });
        });
      });
    });


    const list = [];

    // Map dairySet into wfMap
    Array.from(dairySet.values()).forEach((item) => {
      if (item.siteInspector && item.IsChargable) {
         const totalHours =
          item?.timeIn && item?.timeOut
            ? calculateTotalHours(item?.timeIn, item?.timeOut)
            : 0;
list.push({
            userId : item.userId,
            date : item.selectedDate,
          })
        if (inspectorMap.has(item.userId)) {
          const temp = inspectorMap.get(item.userId);
          temp.totalHours += Number(totalHours) || 0;
          temp.totalBillableHours += Number(totalHours) || 0;
          temp.subTotal += Number(totalHours) * (schedule?.rate || 0);
          temp.total += Number(totalHours) * (schedule?.rate || 0);
          inspectorMap.set(item.userId, temp);
        } else {
          
          inspectorMap.set(item.userId, {
            name: item.siteInspector,
            userId: item.userId,
            totalHours,
            totalBillableHours: totalHours,
            rate: schedule?.rate || 0,
            subTotal: totalHours * (schedule?.rate || 0),
            total: totalHours * (schedule?.rate || 0),
            description:schedule?.description
          });
        }
        item["projectName"] = schedule?.project_name;
        item["projectNumber"] = schedule?.project_number;

      }
      wfMap.set(item.selected_date, item);
wfhome.push(item);
    });

    // Process inspector data from dailySet
    Array.from(dailySet.values()).forEach((item) => {
      if (item?.site_inspector) {
        const totalHours =
          item?.time_in && item?.time_out
            ? calculateTotalHours(item?.time_in, item?.time_out)
            : 0;
list.push({
            userId : item.userId,
            date : item.selected_date,
          })
        if (inspectorMap.has(item.userId)) {
          const temp = inspectorMap.get(item.userId);
          temp.totalHours += Number(totalHours) || 0;
          temp.totalBillableHours += Number(totalHours) || 0;
          temp.subTotal += Number(totalHours) * (schedule?.rate || 0);
          temp.total += Number(totalHours) * (schedule?.rate || 0);
          inspectorMap.set(item.userId, temp);
        } else {
       
          inspectorMap.set(item.userId, {
            name: item.site_inspector,
            userId: item.userId,
            totalHours,
            totalBillableHours: totalHours,
            rate: schedule?.rate || 0,
            subTotal: totalHours * (schedule?.rate || 0),
            total: totalHours * (schedule?.rate || 0),
            description:schedule?.description
          });
        }
      }
    });

    // console.log("dailySet:",JSON.stringify(Array.from(dailySet.values())))
    const sorted = list.sort((a, b) => {
      if (a.userId !== b.userId) return a.userId - b.userId;
      return new Date(a.date) - new Date(b.date);
    });

    // 2. Group by userId
    const grouped = sorted.reduce((acc, { userId, date }) => {
      if (!acc[userId]) {
        acc[userId] = { userId, dates: [] };
      }
      acc[userId].dates.push(date);
      return acc;
    }, {});


    // Set states
    setWorkFromEntry(wfhome);
    const inspectors = Array.from(inspectorMap.values());
        const updatedUsers = inspectors.map(user => {
  const userDates = grouped[user.userId]?.dates;
  if (userDates && userDates.length > 0) {
    const firstDate = userDates[0];
    const lastDate = userDates[userDates.length - 1];
      const formattedStart = moment(firstDate).format("MMMM D, YYYY");
      const formattedEnd = moment(lastDate).format("MMMM D, YYYY");
    return {
      ...user,
      description: `${user.description} specifically from ${formattedStart} up to and including ${formattedEnd}.`,
    startDate: moment(firstDate).format("MMM D, YYYY"),
    endDate: moment(lastDate).format("MMM D, YYYY")
    };
  }
  return user;
});
    setSiteInspectors(updatedUsers);
    setSelectedInspector(updatedUsers[0] || null);
  };

  // const calculateTotalHours = (timeIn: string, timeOut: string) => {
  //   const convertTo24Hour = (time: string): string => {
  //     const [t, modifier] = time.split(" ");
  //     let [hours, minutes] = t.split(":");
  //     if (modifier === "PM" && hours !== "12")
  //       hours = (parseInt(hours, 10) + 12).toString();
  //     if (modifier === "AM" && hours === "12") hours = "00";
  //     return `${hours.padStart(2, "0")}:${minutes}`;
  //   };

  //   const format = (time: string): Date =>
  //     new Date(`1970-01-01T${convertTo24Hour(time)}:00`);

  //   const inTime = format(timeIn);
  //   const outTime = format(timeOut);
  //   const diffMs = Math.abs(outTime.getTime() - inTime.getTime());

  //   const diffHours = diffMs / (1000 * 60 * 60);
  //   return Number(diffHours.toFixed(1));
  // };
  const calculateTotalHours = (timeIn: string, timeOut: string) => {
  const to24 = (t: string) => {
    const [hhmm, ap] = t.trim().split(" ");
    let [h, m] = hhmm.split(":").map(Number);
    if (ap?.toUpperCase() === "PM" && h !== 12) h += 12;
    if (ap?.toUpperCase() === "AM" && h === 12) h = 0;
    return `${String(h).padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
  };

  const toDate = (t: string) => new Date(`1970-01-01T${to24(t)}:00`);

  const inTime = toDate(timeIn);
  const outTime = toDate(timeOut);

  // ❌ same-day only: timeOut must be strictly after timeIn
  if (outTime <= inTime) {
    // show your UI message here
    showConfirmationPopup(
      "Error",
      "Time Out cannot be earlier than Time In for the selected date.",
      "OK",
      ""
    )
    return null;
  }

  const diffHours = (outTime.getTime() - inTime.getTime()) / (1000 * 60 * 60);
  return Number(diffHours.toFixed(2));
};


  const changeRate = (value: string) => {
    let selectedInspectorCopy = { ...selectedInspector };
    selectedInspectorCopy.rate = value;
    selectedInspectorCopy.subTotal =
      parseFloat(value) * selectedInspectorCopy.totalHours;
    selectedInspectorCopy.total =
      parseFloat(value) * selectedInspectorCopy.totalBillableHours;
    setSelectedInspector(selectedInspectorCopy);

    let inspectorsCopy = [...siteInspectors];
    let index = inspectorsCopy.findIndex(
      (item) => item.userId === selectedInspectorCopy.userId
    );
    if (index !== -1) {
      inspectorsCopy[index] = { ...selectedInspectorCopy };
    }
    setSiteInspectors(inspectorsCopy);
  };

  const changeBillableHours = (value: string) => {
    let selectedInspectorCopy = { ...selectedInspector };
    selectedInspectorCopy.totalBillableHours = value;
    selectedInspectorCopy.total =
      parseFloat(value) * selectedInspectorCopy.rate;
    setSelectedInspector(selectedInspectorCopy);

    let inspectorsCopy = [...siteInspectors];
    let index = inspectorsCopy.findIndex(
      (item) => item.userId === selectedInspectorCopy.userId
    );
    if (index !== -1) {
      inspectorsCopy[index] = { ...selectedInspectorCopy };
    }
    setSiteInspectors(inspectorsCopy);
  };

  return {
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
     showConfirmationPopup,
    ConfirmationPopup,
    popupVisible,
    IsSubmit,

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
  };
};

export default useCreateInvoice;
