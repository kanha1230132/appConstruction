import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaWrapper } from "../../components/SafeAreaWrapper/SafeAreaWrapper";
import ScrollViewWrapper from "../../components/ScrollViewWrapper/ScrollViewWrapper";
import { goBack, navigate } from "../../utils/NavigationUtil";
import HeaderWithBackButton from "../../components/Button/HeaderWithBackButton";
import { FAB } from "react-native-paper";
import { AppColor } from "../../themes/AppColor";
import { screenNames } from "../../navigation/ScreenNames";
import { useIsFocused } from "@react-navigation/native";
import RestClient from "../../api/restClient";
import useToastHook from "../../hooks/toast";
import { SchedulesResponse } from "../../api/apiInterface";
import ScheduleCard from "./components/ScheduleCard";
import ActivityLoader from "../../components/Loader/ActivityLoader";
import NotFoundText from "../../components/CustomText/NotFoundText";
import { useConfirmationPopup } from "../../components/Popup/confirmationPopup";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

interface ScheduleScreenProps {}

const ScheduleScreen: React.FC<ScheduleScreenProps> = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [scheduleList, setScheduleList] = useState<SchedulesResponse[]>([]);
  const isFocused = useIsFocused();
  const { showToast } = useToastHook();
  const { showConfirmationPopup, ConfirmationPopup, popupVisible } =
    useConfirmationPopup();
  const { IsBoss } = useSelector((state: RootState) => state.User);

  useEffect(() => {
    if (isFocused) {
      fetchSchedules();
    }
  }, [isFocused]);

  const fetchSchedules = async () => {
    try {
      const restClient = new RestClient();
      setIsLoading(true);
      const response = await restClient.getSchedules();
      if (response && typeof response != "string") {
        const list = response.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setScheduleList(list);
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

  const deleteSchedule = async (item: SchedulesResponse, index: number) => {
    try {
      const status = await showConfirmationPopup(
        "Confirm Deletion",
        "Are you sure you want to delete this schedule?",
        "Delete",
        "Cancel"
      );
      return;
      const restClient = new RestClient();
      setIsLoading(true);
      const response = "";
      if (response && typeof response != "string") {
        // fetchSchedules();
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

  const renderItem = ({
    item,
    index,
  }: {
    item: SchedulesResponse;
    index: number;
  }) => (
    <ScheduleCard
      item={item}
      deleteSchedule={() => {
        deleteSchedule(item, index);
      }}
    />
  );

  return (
    <>
      <SafeAreaWrapper>
        <HeaderWithBackButton
          title={"Baseline Schedules"}
          onBackClick={() => goBack()}
          customStyle={undefined}
        />
        <ScrollViewWrapper>
          {isLoading ? <ActivityLoader /> : null}

          {!isLoading && scheduleList.length == 0 && (
            <NotFoundText message={"No schedules found"} />
          )}

          {!isLoading && scheduleList.length > 0 && (
            <FlatList
              data={scheduleList}
              keyExtractor={(item, index) =>
                item?._id ? `${item._id}-${index}` : String(index)
              }
              renderItem={renderItem}
              contentContainerStyle={styles.listContainer}
              showsVerticalScrollIndicator={false}
              refreshing={isLoading}
              onRefresh={() => fetchSchedules()}
            />
          )}
          {popupVisible && <ConfirmationPopup />}
        </ScrollViewWrapper>
      </SafeAreaWrapper>

      {IsBoss ? (
        <FAB
          icon="plus"
          style={styles.fab}
          onPress={() => navigate(screenNames.CreateScheduleScreen)}
          color={AppColor.WHITE}
        />
      ) : null}
    </>
  );
};

export default ScheduleScreen;

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 20,
    right: 7,
    bottom: 7,
    backgroundColor: AppColor.PRIMARY,
    color: AppColor.WHITE,
    borderRadius: 100,
  },
  listContainer: {
    paddingBottom: 80,
  },
});
