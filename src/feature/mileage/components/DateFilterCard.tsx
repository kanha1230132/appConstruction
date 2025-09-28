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
import { moderateScale } from "react-native-size-matters";
import GradientWrapper from "../../../components/Wrapper/GradientWrapper";

interface DateFilterCardProps {
  onPressMonth: () => void,
  selectedMonth: number
  setSelectedMonth?: (month: number) => void,
  selectedDate?: string
  setSelectedDate: (date: string) => void
  onPressDate:(date: string) => void

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

const DateFilterCard: React.FC<DateFilterCardProps> = ({onPressMonth,selectedMonth,selectedDate,setSelectedDate,onPressDate}) => {
  const today = new Date();
  const [monthDates, setMonthDates] = useState(
    getMonthData(today.getFullYear(), today.getMonth())
  );


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
    if (currentMonthDates && currentMonthDates.length > 0) {
      setMonthDates(currentMonthDates);
      setSelectedDate(moment().format("YYYY-MM-DD"));
    }
  }, [selectedMonth]);

  return (
    <Card style={styles.calendarContainer}>

      <TouchableOpacity style={styles.monthSelector} onPress={() => {onPressMonth()}}>
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
            <TouchableOpacity onPress={() => {
              onPressDate(dayDate)
              
              }} key={index} style={[styles.dayContainer,selectedDate == dayDate && styles.selectedDateText]}>
              <Text
                style={[
                  styles.dateText,
                  selectedDate == dayDate &&{color:AppColor.WHITE, textShadowColor:AppColor.WHITE, textShadowOffset:{width: 0.5, height: 0.5}, textShadowRadius:2}
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
    backgroundColor: AppColor.PRIMARY_100,
    borderRadius: 6,
    marginTop:10,
    padding:10
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
    marginHorizontal: 5,
    borderRadius:100,
    width:35,
    height:35,
    backgroundColor:AppColor.WHITE,
    justifyContent:'center',
    alignItems:'center'
  },
  dateText: {
    fontSize: moderateScale(15),
    fontFamily: AppFonts.Medium,
    borderRadius: 100,
    color: AppColor.BLACK
  },
  selectedDateText: {
    backgroundColor: AppColor.PRIMARY,
    color: AppColor.WHITE,
    elevation:5
  },
});
