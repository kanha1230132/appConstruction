import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { RootState } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import useGlobal from "../../../hooks/global";
import { ImageItem } from "../../photoFiles/PhotoFilesScreen";
import { updateWeeklyReports } from "../../../store/slice/Reports";
import { CompanyLogoResponse } from "../../../api/apiInterface";
import { createWeeklyPdf } from "../helper/util";
import RestClient from "../../../api/restClient";
import useToastHook from "../../../hooks/toast";
import moment from "moment";

const useWeeklyPreview = () => {
  const { WeeklyReports } = useSelector((state: RootState) => state.Reports);
  const { UserName } = useSelector((state: RootState) => state.User);
      
  const [SelectedPhotos, setSelectedPhotos] = useState<ImageItem[]>([]);
  const dispatch = useDispatch();
  const { showToast } = useToastHook();
  const {
    Logos,
    getLogos,
    SelectedLogo,
    setSelectedLogo,
    IsSubmit,
    setIsSubmit,
    ShowLogoSelectionModal,
    setShowLogoSelectionModal,
    Loading,
    setLoading,
  } = useGlobal();

  useEffect(() => {
    if (WeeklyReports) {
      dispatch(
        updateWeeklyReports({
          ...WeeklyReports,
          selectedLogo: SelectedLogo,
        })
      );
    }
  }, [SelectedLogo]);

  const handleRemoveLogo = (item: CompanyLogoResponse) => {
    const filterLogo = SelectedLogo?.filter((logo) => logo.id !== item.id);
    setSelectedLogo(filterLogo);
    updateWeeklyReports({
      ...WeeklyReports,
      selectedLogo: filterLogo,
    });
  };

  const onActivityCreated = () => {
    getLogos();
  };

  const createPdf = async () => {
    try {
      setLoading(true);
      await createWeeklyPdf({ ...WeeklyReports, selectedLogo: SelectedLogo });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const callToCreateWeekly = async () => {
    try {
      if (!WeeklyReports) return;
      const {
        schedule,
        reportDate,
        consultantProjectManager,
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
        startDate,
        endDate,
        signature,
        Images,
      } = WeeklyReports;

      let listItems = [];
      Images?.map((item) => {
          const  items = {
          id: item?._id,
          comment: item?.description,
        };
        listItems.push(items);
      });
      setLoading(true);

      const selectedLogos:string[] = [];
      SelectedLogo?.map((item) => {
        selectedLogos.push(item.id);
      });

            const fileName = `${UserName.replaceAll(" ", "_")}_${moment(
              reportDate
            ).format("DD-MM-YYYY")}_Weekly_Report`;

      const body = {
        schedule_id: schedule?.id,
        reportDate: reportDate,
        consultantProjectManager: consultantProjectManager,
        contractNumber: contractNumber,
        cityProjectManager: cityProjectManager,
        contractProjectManager: contractProjectManager,
        contractorSiteSupervisorOnshore: contractorSiteSupervisorOnshore,
        contractorSiteSupervisorOffshore: contractorSiteSupervisorOffshore,
        contractAdministrator: contractAdministrator,
        supportCA: supportCA,
        photoFiles: listItems,
        siteInspector: siteInspector,
        inspectorTimeIn: inspectorTimeIn,
        inspectorTimeOut: inspectorTimeOut,
        weeklyAllList: WeeklyAllList,
        startDate: startDate,
        endDate: endDate,
          logo : selectedLogos,
        signature: signature || '',
        pdfName: fileName
      };
      const restClient = new RestClient();
      const response = await restClient.createWeeklyReport(body);

      if (response && typeof response != "string") {
        showToast(response.message, "success");
        setIsSubmit(true);
        return;
      } else {
        showToast(
          response || "Something went wrong please try again",
          "danger"
        );
      }
    } catch (error) {
      console.log("Error : ", error);
      setLoading(false);
      setIsSubmit(false);
    } finally {
      setLoading(false);
    }
  };

  return {
    WeeklyReports,
    Logos,
    getLogos,
    SelectedLogo,
    setSelectedLogo,
    IsSubmit,
    setIsSubmit,
    onActivityCreated,
    Loading,
    setLoading,
    SelectedPhotos,
    setSelectedPhotos,
    ShowLogoSelectionModal,
    setShowLogoSelectionModal,
    handleRemoveLogo,
    createPdf,
    callToCreateWeekly,
  };
};

export default useWeeklyPreview;

const styles = StyleSheet.create({});
