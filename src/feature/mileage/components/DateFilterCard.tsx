import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AppFonts } from "../../../themes/AppFonts";
import { AppColor } from "../../../themes/AppColor";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Card } from "react-native-paper";
import moment from "moment";
import CustomText from "../../../components/CustomText/CustomText";

interface DateFilterCardProps {}
interface GetMonthDataProps {
  year: number;
  month: number;
}

const getMonthData = (year: number, month: number): string[] => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const dates: string[] = [];
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, month, i);
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
    dates.push(formattedDate);
  }
  return dates;
};

const DateFilterCard: React.FC<DateFilterCardProps> = () => {
  const today = new Date();
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState(
    `${today.getFullYear()}-${(today.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`
  );

  const [monthDates, setMonthDates] = useState(
    getMonthData(today.getFullYear(), today.getMonth())
  );

  interface GetDatesInMonthProps {
    year: number;
    month: number;
  }

  function getDatesInMonth(year: number, month: number): string[] {
    const startDate = moment([year, month]);
    const endDate = moment(startDate).endOf("month");

    const dates: string[] = [];
    let currentDate = startDate.clone();

    while (currentDate.isSameOrBefore(endDate, "day")) {
      dates.push(currentDate.format("YYYY-MM-DD"));
      currentDate.add(1, "day");
    }

    return dates;
  }

  useEffect(() => {
    const currentMonthDates = getDatesInMonth(today.getFullYear(), selectedMonth );
    console.log("currentMonthDates : ", currentMonthDates);
    if (currentMonthDates && currentMonthDates.length > 0) {
      setMonthDates(currentMonthDates);
      setSelectedDate(moment().format("YYYY-MM-DD"));
    }
  }, [selectedMonth]);

  return (
    <Card style={styles.calendarContainer}>
      <TouchableOpacity style={styles.monthSelector}>
        <CustomText title={moment().month(selectedMonth).format("MMMM")} />

        <Ionicons
          style={{ marginLeft: 10 }}
          name="caret-down"
          size={20}
          color={AppColor.PRIMARY}
        />
      </TouchableOpacity>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.dateContainer}>
          {monthDates.map((dayDate, index) => (
            <TouchableOpacity key={index} style={styles.dayContainer}>
              <Text
                style={[
                  styles.dateText,
                  selectedDate == dayDate && styles.selectedDateText,
                ]}
              >
                {dayDate.split("-")[2]}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </Card>
  );
};

export default DateFilterCard;

const styles = StyleSheet.create({
  calendarContainer: {
    backgroundColor: AppColor.BLACK_5,
    padding: 10,
    borderRadius: 6,
    elevation: 1,
  },
  monthSelector: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  picker: {
    height: 40,
    width: 200,
    color: AppColor.PRIMARY,
    fontSize: 18,
  },
  dateContainer: {
    flexDirection: "row",
  },
  dayContainer: {
    alignItems: "center",
    marginHorizontal: 5,
  },
  dateText: {
    fontSize: 15,
    fontFamily: AppFonts.Medium,
    padding: 5,
    backgroundColor: AppColor.WHITE,
    borderRadius: 5,
  },
  selectedDateText: {
    backgroundColor: AppColor.PRIMARY,
    color: AppColor.WHITE,
    elevation:5,
    width: 30,
    height: 30,
    justifyContent:'center',
    alignItems:'center'
  },
});
