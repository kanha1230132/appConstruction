import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { use, useEffect, useState } from "react";
import { SafeAreaWrapper } from "../../../../components/SafeAreaWrapper/SafeAreaWrapper";
import HeaderWithBackButton from "../../../../components/Button/HeaderWithBackButton";
import { goBack, navigate } from "../../../../utils/NavigationUtil";
import { ScheduleListScreenProps } from "../../../../types/navigation";
import RestClient from "../../../../api/restClient";
import { SchedulesResponse } from "../../../../api/apiInterface";
import useToastHook from "../../../../hooks/toast";
import ScrollViewWrapper from "../../../../components/ScrollViewWrapper/ScrollViewWrapper";
import ScheduleListCard from "../../components/ScheduleListCard";
import ActivityLoader from "../../../../components/Loader/ActivityLoader";
import NotFoundText from "../../../../components/CustomText/NotFoundText";
import { screenNames } from "../../../../navigation/ScreenNames";
import { ScreenType } from "../../../../types/screenTypes";
import SearchBarComponent from "../../../reports/components/SearchBarComponent";
import { useDispatch } from "react-redux";
import {
  updateDailyDairyReports,
  updateDailyReports,
  updateWeeklyReports,
} from "../../../../store/slice/Reports";
import { useIsFocused } from "@react-navigation/native";
import ReportSelectionDialog from "../../components/ReportSelection";

const ScheduleListScreen: React.FC<ScheduleListScreenProps> = ({ route }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [scheduleList, setScheduleList] = useState<SchedulesResponse[]>([]);
  const [TotalList, setTotalList] = useState<SchedulesResponse[]>([]);
  const { showToast } = useToastHook();
  const [screenType, setScreenType] = useState("");
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [ReportSelectionVisible, setReportSelectionVisible] = useState(false);
  const [ReportSelectionType, setReportSelectionType] = useState('');
  const [SelectedSchedule, setSelectedSchedule] = useState<SchedulesResponse>()

  useEffect(() => {
    if (isFocused) {
      dispatch(updateDailyReports(undefined));
      dispatch(updateDailyDairyReports(undefined));
      dispatch(updateWeeklyReports(undefined));
    }
  }, [isFocused]);

  useEffect(() => {
    if (route?.params?.type) {
      setScreenType(route?.params?.type);
    }
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const restClient = new RestClient();
      setIsLoading(true);
      const response = await restClient.getSchedules();
      if (response && typeof response != "string") {
        const list = response.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        setScheduleList(list);
        setTotalList(list);
      } else {
        showToast(response || "Something went wrong", "danger");
      }
    } catch (error) {
      setIsLoading(false);
      showToast("Something went wrong", "danger");
    } finally {
      setIsLoading(false);
    }
  };

  const callToNavigate = (item: SchedulesResponse) => {
    if (screenType == ScreenType.PHOTO_FILE) {
      navigate(screenNames.PhotoFilesScreen, { project: item });
    } else if (screenType == ScreenType.DAILY_ENTRY) {
      navigate(screenNames.DailyEntryScreen, { project: item });
    } else if (screenType == ScreenType.WEEKLY_ENTRY) {
      navigate(screenNames.WeeklyEntryScreen, { project: item });
    } else if (screenType == ScreenType.DAILY_DAIRY_ENTRY) {
      navigate(screenNames.DailyDairyEntryScreen, { project: item });
    } else if(screenType == ScreenType.PDF){
      setSelectedSchedule(item)
      setReportSelectionVisible(true);
    }
  };

  const renderItem = ({ item }: { item: SchedulesResponse }) => {
    return (
      <ScheduleListCard
        isShowPhotoIcon={screenType == ScreenType.PHOTO_FILE}
        item={item}
        onPress={() => callToNavigate(item)}
      />
    );
  };

  const handleSearch = (query: string) => {
    if (!query) {
      setScheduleList(TotalList);
      return;
    }

    const results = TotalList.filter((item) =>
      item.project_name.toLowerCase().includes(query.toLowerCase())
    );
    setScheduleList(results);
  };

  return (
    <>
      <SafeAreaWrapper>
        <HeaderWithBackButton
          title={"Project List"}
          onBackClick={() => goBack()}
          customStyle={undefined}
        />

        <SearchBarComponent onSearch={handleSearch} />

        <ScrollViewWrapper>
          {isLoading ? <ActivityLoader /> : null}

          {!isLoading && scheduleList.length == 0 && (
            <NotFoundText message={"No Project found"} />
          )}

          {!isLoading && scheduleList.length > 0 && (
            <FlatList
              data={scheduleList}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderItem}
              refreshing={isLoading}
              onRefresh={fetchSchedules}
              contentContainerStyle={styles.listContainer}
              showsVerticalScrollIndicator={false}
            />
          )}
        </ScrollViewWrapper>

        {SelectedSchedule && ReportSelectionVisible ? (
          <ReportSelectionDialog
            visible={ReportSelectionVisible}
            onDismiss={() => {
              setReportSelectionVisible(false);
            }}
            handleConfirm={() => {
              setReportSelectionVisible(false);
              navigate(screenNames.ReportPdfScreen, { reportType: ReportSelectionType , schedule:SelectedSchedule});
            }}
            selectedReport={ReportSelectionType}
            setSelectedReport={setReportSelectionType}
          />
        ) : null}
      </SafeAreaWrapper>
    </>
  );
};

export default ScheduleListScreen;

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 30,
  },
});
