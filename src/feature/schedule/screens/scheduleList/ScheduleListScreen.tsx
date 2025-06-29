import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaWrapper } from "../../../../components/SafeAreaWrapper/SafeAreaWrapper";
import HeaderWithBackButton from "../../../../components/Button/HeaderWithBackButton";
import { goBack, navigate } from "../../../../utils/NavigationUtil";
import { ScheduleListScreenProps } from "../../../../types/navigation";
import { useIsFocused } from "@react-navigation/native";
import RestClient from "../../../../api/restClient";
import { SchedulesResponse } from "../../../../api/apiInterface";
import useToastHook from "../../../../hooks/toast";
import ScrollViewWrapper from "../../../../components/ScrollViewWrapper/ScrollViewWrapper";
import ScheduleListCard from "../../components/ScheduleListCard";
import ActivityLoader from "../../../../components/Loader/ActivityLoader";
import NotFoundText from "../../../../components/CustomText/NotFoundText";
import { screenNames } from "../../../../navigation/ScreenNames";
import { ScreenType } from "../../../../types/screenTypes";


const ScheduleListScreen: React.FC<ScheduleListScreenProps> = ({route}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [scheduleList, setScheduleList] = useState<SchedulesResponse[]>([]);
  const isFocused = useIsFocused();
  const { showToast } = useToastHook();
  const [screenType, setScreenType] = useState('')

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

  const callToNavigate = (item: SchedulesResponse) => {
    if (screenType == ScreenType.PHOTO_FILE) {
      navigate(screenNames.PhotoFilesScreen, { project: item });
    } else if (screenType == ScreenType.DAILY_ENTRY) {
      navigate(screenNames.DailyEntryScreen, { project: item });
    } else if (screenType == ScreenType.WEEKLY_ENTRY) {
      navigate(screenNames.WeeklyEntryScreen, { project: item });
    } else if (screenType == ScreenType.DAILY_DAIRY_ENTRY) {
      navigate(screenNames.DailyDairyEntryScreen, { project: item });
    }
  };

  const renderItem = ({ item }: { item: SchedulesResponse }) => {
    return (
     <ScheduleListCard item={item} onPress={()=>  callToNavigate(item)} />
    );
  };


  return (
    <>
      <SafeAreaWrapper>
        <HeaderWithBackButton
          title={"Project List"}
          onBackClick={() => goBack()}
          customStyle={undefined}
        />

        <ScrollViewWrapper>

             {isLoading ? <ActivityLoader /> : null}

          {!isLoading && scheduleList.length == 0 && (
            <NotFoundText message={"No Project found"} />
          )}

             {
        !isLoading && scheduleList.length > 0 && (
          <FlatList
            data={scheduleList}
            keyExtractor={(item) => item._id}
            renderItem={renderItem}
            refreshing={isLoading}
            onRefresh={fetchSchedules}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        )
      }
        </ScrollViewWrapper>

      </SafeAreaWrapper>
    </>
  );
};

export default ScheduleListScreen;

const styles = StyleSheet.create({
    listContainer: {
    paddingBottom: 30,
    paddingTop:20,
  },
});
