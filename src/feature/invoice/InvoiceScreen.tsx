import { FlatList, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaWrapper } from "../../components/SafeAreaWrapper/SafeAreaWrapper";
import SearchBarComponent from "../reports/components/SearchBarComponent";
import ActivityLoader from "../../components/Loader/ActivityLoader";
import NotFoundText from "../../components/CustomText/NotFoundText";
import RestClient from "../../api/restClient";
import { SchedulesResponse } from "../../api/apiInterface";
import useToastHook from "../../hooks/toast";
import ScheduleListCard from "../schedule/components/ScheduleListCard";
import { ScreenType } from "../../types/screenTypes";
import { AppFonts } from "../../themes/AppFonts";
import { AppColor } from "../../themes/AppColor";
import { moderateScale } from "react-native-size-matters";
import InvoiceHeaderView from "./components/InvoiceHeaderView";
import FilterModal from "./components/FilterModal";
import moment from "moment";
import { navigate } from "../../utils/NavigationUtil";
import { screenNames } from "../../navigation/ScreenNames";
import ExcelModal from "./components/ExcelModal";

interface InvoiceScreenProps {}

const InvoiceScreen: React.FC<InvoiceScreenProps> = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [scheduleList, setScheduleList] = useState<SchedulesResponse[]>([]);
  const [TotalList, setTotalList] = useState<SchedulesResponse[]>([]);
  const { showToast } = useToastHook();
  const [screenType, setScreenType] = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [ShowExcelModal, setShowExcelModal] = useState(false)

  useEffect(() => {
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

  const renderItem = ({ item }: { item: SchedulesResponse }) => {
    return (
      <ScheduleListCard
        isShowPhotoIcon={screenType == ScreenType.INVOICE}
        item={item}
        onPress={() => {
          navigate(screenNames.CreateInvoiceScreen, {
            project: item,
          });
        }}
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

  const filterProjects = (
    fromDate: string,
    toDate: string,
    projectId: string | number
  ) => {
    if (!fromDate && !toDate && !projectId) return;
    const startOfDay = moment(fromDate).startOf("day").toDate(); // 2025-08-06T00:00:00.000Z
    const endOfDay = moment(toDate).endOf("day").toDate();
    const filteredList: typeof TotalList = [];
    for (const item of TotalList) {
      const projectDate = new Date(item.created_at);
      const matchesProjectId = projectId
        ? item.id.toString() === projectId.toString()
        : true;
      const matchesDateRange =
        fromDate && toDate
          ? projectDate >= startOfDay && projectDate <= endOfDay
          : true;

      if (matchesProjectId && matchesDateRange) {
        filteredList.push(item);
      }
    }
    setScheduleList(filteredList);
  };

  return (
    <>
      <SafeAreaWrapper>
        <InvoiceHeaderView
          pressExcel={() => {
            setShowExcelModal(true)
          }}
          pressFilter={() => {
            setShowFilterModal(true);
          }}
        />

        <SearchBarComponent onSearch={handleSearch} />

        {isLoading ? <ActivityLoader /> : null}

        {!isLoading && scheduleList.length == 0 && (
          <NotFoundText message={"No Project found"} />
        )}
        <View>
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
        </View>
      </SafeAreaWrapper>

      {showFilterModal && (
        <FilterModal
          showFilterModal={showFilterModal}
          onClose={() => setShowFilterModal(false)}
          projects={TotalList}
          onApply={(fromDate, toDate, selectedProjectId) => {
            setShowFilterModal(false);
            filterProjects(fromDate, toDate, selectedProjectId);
          }}
        />
      )}
      {
        ShowExcelModal ?
        <ExcelModal onClose={()=>setShowExcelModal(false)} setShowExcelModal={()=>{
          setShowExcelModal(false)
        }} showExcelModal={ShowExcelModal} />


        : null
      }
    </>
  );
};

export default InvoiceScreen;

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 150,
  },
  headerLeftBlue: {
    fontSize: moderateScale(20),
    fontFamily: AppFonts.Bold,
    textAlign: "left",
    color: AppColor.PRIMARY,
    marginVertical: 10,
  },
});
