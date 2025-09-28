import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { Button, Card, Text, ActivityIndicator } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { ReportPdfScreenProps } from "../../../../types/navigation";
import { SafeAreaWrapper } from "../../../../components/SafeAreaWrapper/SafeAreaWrapper";
import HeaderWithBackButton from "../../../../components/Button/HeaderWithBackButton";
import { goBack } from "../../../../utils/NavigationUtil";
import { AppColor } from "../../../../themes/AppColor";
import useReportPdfScreen from "../../hooks/ReportPdfScreen.hook";
import moment from "moment";
import { DailyDiaryReport, DailyReport } from "../../helper/interface";
import { images } from "../../../../assets";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { AppFonts } from "../../../../themes/AppFonts";
import NotFoundText from "../../../../components/CustomText/NotFoundText";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { WeeklyReport } from "../../helper/weeklyInterface";
import UserFilterDropdown from "../../components/UserFilterDropDown";
import UserSelectionDialog from "../../components/UserFilterDropDown";

interface ReportItem {
  id: string;
  title: string;
  pdfUrl: string;
}

const ReportPdfScreen: React.FC<ReportPdfScreenProps> = ({
  navigation,
  route,
}) => {
  const {
    callToDailyPdfApi,
    callToWeeklyPdfApi,
    callToDailyDiaryPdfApi,
    DiaryReportList,
    callToPressOnDiaryPdf,
    setSchedule,
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
    UserList

  } = useReportPdfScreen();
  const { UserId, IsBoss } = useSelector((state: RootState) => state.User);

  const { reportType, schedule } = route.params;
  const [date, setDate] = useState<Date>(new Date());
  const [showPicker, setShowPicker] = useState(false);


  useEffect(() => {
    setPdfType(reportType)
    setSchedule(schedule);
    const param = {
      filter: {
        schedule_id: schedule?.id,
        selectedDate: moment(date).format("YYYY-MM-DD"),
        userId: IsBoss ? "" : UserId,
      },
    };
    reportType === "daily" && callToDailyPdfApi(param);
    reportType === "weekly" && callToWeeklyPdfApi(param);
    reportType === "dailyDiary" && callToDailyDiaryPdfApi(param);
  }, [date]);

  const renderDiaryItem = ({ item }: { item: DailyDiaryReport }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        callToPressOnDiaryPdf(item);
      }}
    >
      <View style={styles.cardContent}>
        <Image
          source={images.PDF_ICON}
          style={styles.thumbnail}
          resizeMode="contain"
        />
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.pdfName,
              { color: AppColor.PRIMARY, fontFamily: AppFonts.Medium },
            ]}
          >
            {item.pdfName}
          </Text>
          <Text style={styles.userName}>{item.username}</Text>
          <Text style={styles.date}>{item.selectedDate}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            callToPressOnDiaryPdf(item);
          }}
        >
          <MaterialIcons
            name="chevron-right"
            size={30}
            color={AppColor.PRIMARY}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
  const renderDailyItem = ({ item }: { item: DailyReport }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        callToPressOnDailyPdf(item);
      }}
    >
      <View style={styles.cardContent}>
        <Image
          source={images.PDF_ICON}
          style={styles.thumbnail}
          resizeMode="contain"
        />
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.pdfName,
              { color: AppColor.PRIMARY, fontFamily: AppFonts.Medium },
            ]}
          >
            {item.pdfName}
          </Text>
          <Text style={styles.userName}>{item.username}</Text>
          <Text style={styles.date}>{item.selected_date}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            callToPressOnDailyPdf(item);
          }}
        >
          <MaterialIcons
            name="chevron-right"
            size={30}
            color={AppColor.PRIMARY}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
  const renderWeeklyItem = ({ item }: { item: WeeklyReport }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        callToPressOnWeeklyPdf(item);
      }}
    >
      <View style={styles.cardContent}>
        <Image
          source={images.PDF_ICON}
          style={styles.thumbnail}
          resizeMode="contain"
        />
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.pdfName,
              { color: AppColor.PRIMARY, fontFamily: AppFonts.Medium },
            ]}
          >
            {item.pdfName}
          </Text>
          <Text style={styles.userName}>{item.username}</Text>
          <Text style={styles.date}>{item.reportDate}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            callToPressOnWeeklyPdf(item);
          }}
        >
          <MaterialIcons
            name="chevron-right"
            size={30}
            color={AppColor.PRIMARY}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaWrapper>
      <HeaderWithBackButton
        title={schedule?.project_name}
        onBackClick={() => goBack()}
        customStyle={undefined}
        RightIcon2={"checkmark"}
        RightIcon2Color={AppColor.PRIMARY}
      />
      {/* Date Picker */}

      <View style={{ flexDirection: "row", gap: 10 }}>
        <Button
          style={{
            width:IsBoss ? "50%" : '100%',
            borderRadius: 6,
            backgroundColor: AppColor.WHITE,
            borderColor: AppColor.PRIMARY,
          }}
          icon="calendar"
          mode="outlined"
          textColor={AppColor.PRIMARY}
          onPress={() => setShowPicker(true)}
        >
          {date.toDateString()}
        </Button>

          {
            IsBoss && (
               <Button
          style={{
            width: "48%",

            borderRadius: 6,
            backgroundColor: AppColor.WHITE,
            borderColor: AppColor.PRIMARY,
          }}
          icon="account"
          mode="outlined"
          textColor={AppColor.PRIMARY}
          onPress={() => {
            setShowUserSelection(true);
          }}
        >
          {selectedUser}
        </Button>
            )
          }
       
      </View>

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowPicker(false);
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}

      <UserSelectionDialog
        visible={ShowUserSelection}
        setVisible={()=> setShowUserSelection(false )}
        users={UserList}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        onConfirmSelection={() => callToConnfirmUserSelection()}
      />
      {!loading &&
      DiaryReportList.length == 0 &&
      DailyReportList.length == 0 &&
      WeeklyReportList.length == 0 ? (
        <NotFoundText message={"No Reports Found"} />
      ) : null}
      {/* Report Listing */}
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator style={{ marginTop: 20 }} />
        </View>
      ) : null}

      {!loading && DiaryReportList.length > 0 ? (
        <FlatList
          data={DiaryReportList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderDiaryItem}
        />
      ) : null}

      {!loading && DailyReportList.length > 0 ? (
        <FlatList
          data={DailyReportList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderDailyItem}
        />
      ) : null}

      {!loading && WeeklyReportList.length > 0 ? (
        <FlatList
          data={WeeklyReportList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderWeeklyItem}
        />
      ) : null}
    </SafeAreaWrapper>
  );
};

export default ReportPdfScreen;

const styles = StyleSheet.create({
  header: {
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  listContent: {
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginHorizontal: 1,
    marginTop: 10,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  thumbnail: {
    width: 50,
    height: 50,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  pdfName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  userName: {
    fontSize: 14,
    color: AppColor.BLACK,
    marginBottom: 2,
  },
  date: {
    fontSize: 12,
    color: AppColor.BLACK_80,
    marginTop: 5,
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  actionText: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 14,
  },
});
