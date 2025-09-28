import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaWrapper } from "../../components/SafeAreaWrapper/SafeAreaWrapper";
import HeaderWithBackButton from "../../components/Button/HeaderWithBackButton";
import { goBack, navigate } from "../../utils/NavigationUtil";
import { AppText } from "../../constants/appText";
import DateFilterCard from "./components/DateFilterCard";
import MonthSelectionModal from "./components/MonthSelectionModal";
import RestClient from "../../api/restClient";
import { Card, FAB } from "react-native-paper";
import { AppColor } from "../../themes/AppColor";
import { screenNames } from "../../navigation/ScreenNames";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import ScrollViewWrapper from "../../components/ScrollViewWrapper/ScrollViewWrapper";
import { MileageResponse } from "../../api/apiInterface";
import { AppFonts } from "../../themes/AppFonts";
import CustomText from "../../components/CustomText/CustomText";
import { moderateScale } from "react-native-size-matters";
import { images } from "../../assets";
import ActivityLoader from "../../components/Loader/ActivityLoader";
import NotFoundText from "../../components/CustomText/NotFoundText";
import { DateFormat } from "../../utils/dateUtil";
import moment from "moment";

interface MileageScreenProps {}

const MileageScreen: React.FC<MileageScreenProps> = () => {
  const today = new Date();
  const [isMonthModalVisible, setIsMonthModalVisible] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState(
    `${today.getFullYear()}-${(today.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`
  );
  const [loading, setloading] = useState(false);
  const [MileageHistoryList, setMileageHistoryList] = useState<
    MileageResponse[]
  >([]);

  const navigation = useNavigation()
  const isFocused = useIsFocused();

  useEffect(() => {
    getMileageHistory(selectedDate, selectedDate);
  }, [selectedDate, isFocused]);



  const getMileageHistory = async (fromDate: string, toDate: string) => {
    try {
      setloading(true);
      const param = {
        filter: {
          startDate: `${fromDate}T00:00:00.000Z`,
          endDate: `${toDate}T23:59:00.000Z`,
        },
      };
      const restClient = new RestClient();
      const response = await restClient.getMileageHistory(param);
      if (response && typeof response !== "string") {
        const mileage = response.data;
        const sortedByDate = mileage.sort(
          (
            a: { date: string | number | Date },
            b: { date: string | number | Date }
          ) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          }
        );
        if (sortedByDate && sortedByDate.length > 0) {
          setMileageHistoryList(sortedByDate);
        } else {
          setMileageHistoryList([]);
        }
      }
    } catch (error) {
      setloading(false);
      console.log("Error : ", error);
    } finally {
      setloading(false);
    }
  };

  const renderMileageEntry = ({ item }: { item: MileageResponse }) => {
    return (
      <Card
        style={{
          backgroundColor: AppColor.WHITE,
          padding: moderateScale(10),
          marginVertical: 7,
          marginHorizontal: 1,
        }}
      >
        <View>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Image
              source={images.PIN}
              style={{ width: 20, height: 20, marginRight: 5 }}
            />

            <CustomText
              style={{ width: "22%" }}
              fontSize={moderateScale(15)}
              title={"From"}
            />
            <CustomText
              style={{ flexWrap: "wrap", width: "70%" }}
              title={"" + item.startLocation || "N/A"}
              fontSize={moderateScale(14)}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              marginVertical: 5,
            }}
          >
            <Image
              source={images.PIN}
              style={{ width: 20, height: 20, marginRight: 5 }}
            />

            <CustomText
              style={{ width: "22%" }}
              fontSize={moderateScale(14)}
              title={"To"}
            />

            <CustomText
              style={{ flexWrap: "wrap", width: "70%" }}
              title={"" + item.endLocation || "N/A"}
              fontSize={moderateScale(14)}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              source={images.TIME}
              style={{ width: 20, height: 20, marginRight: 5,tintColor:AppColor.PRIMARY }}
            />
            <CustomText
              style={{ width: "22%" }}
              fontSize={moderateScale(14)}
              title={"Duration"}
            />

            <CustomText
              title={"" + item.duration || "N/A"}
              fontSize={moderateScale(14)}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Image
              source={images.GPS}
              style={{ width: 20, height: 20, marginRight: 5,tintColor:AppColor.PRIMARY }}
            />

            <CustomText
              style={{ width: "22%" }}
              fontSize={moderateScale(14)}
              title={"Distance"}
            />
            <CustomText
              title={item.totalDistance + " Kms"}
              fontSize={moderateScale(14)}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Image
              source={images.MONEYBAG}
              style={{ width: 20, height: 20, marginRight: 5,tintColor:AppColor.PRIMARY }}
            />

            <CustomText
              style={{ width: "22%" }}
              fontSize={moderateScale(14)}
              title={"Amount"}
              fontFamily={AppFonts.Medium}
            />

            <CustomText
              title={"$" + item.amount || "N/A"}
              fontSize={moderateScale(16)}
              fontFamily={AppFonts.Medium}
              color={AppColor.APPROVE}
            />
          </View>
        </View>

        {/* <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 10
        }}>
          <View style={styles.infoBox}>
            <Ionicons name="speedometer" size={20} color={AppColor.BLACK} />
            <CustomText title={item.totalDistance+" Kms"} />
          </View>
          <View style={styles.infoBox}>
            <MaterialIcons name="attach-money" size={20} color={AppColor.APPROVE} />

             <CustomText title={"$"+item.amount} />
          </View>
        </View> */}
      </Card>
    );
  };

  return (
    <>
      <SafeAreaWrapper>
        <HeaderWithBackButton
          title={AppText.Mileage}
          onBackClick={() => {

                                   navigation.reset({
                                    index: 0,
                                    routes: [
                                      {
                                        name: screenNames.MainApp, // DrawerNavigator is registered as MainApp in your root stack
                                        state: {
                                          routes: [
                                            {
                                              name: screenNames.HomeTabs,
                                              state: {
                                                routes: [{ name: screenNames.InvoiceScreen }],
                                                index: 0,
                                              },
                                            },
                                          ],
                                        },
                                      },
                                    ],
                                  })

                                
          }}
          customStyle={undefined}
        />

        <DateFilterCard
          onPressMonth={() => setIsMonthModalVisible(true)}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          onPressDate={(date: string) => setSelectedDate(date)}
        />

        {isMonthModalVisible ? (
          <MonthSelectionModal
            onPressMonth={(month: string) => {
              setSelectedMonth(parseInt(month));
            }}
            isMonthModalVisible={isMonthModalVisible}
            setIsMonthModalVisible={setIsMonthModalVisible}
          />
        ) : null}
        <View style={{ height: 25 }} />
        <ScrollViewWrapper>

          {loading ? <ActivityLoader /> : null}
          {!loading && MileageHistoryList.length > 0 ? (
            <FlatList
              data={MileageHistoryList}
              keyExtractor={(item) => item?.id?.toString()}
              renderItem={renderMileageEntry}
            />
          ) : null}


          {
            !loading && !MileageHistoryList.length && (
              <NotFoundText message={"Mileage Not Found"} />
            )
          }
        </ScrollViewWrapper>
      </SafeAreaWrapper>

      {

       selectedDate >  moment().format(DateFormat.YYYY_MM_DD)  ? null :
         <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigate(screenNames.CreateMileageScreen,{selectedDate:selectedDate})}
        color={AppColor.WHITE}
      />
      }

    
    </>
  );
};

export default MileageScreen;

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
  infoBox: {
    alignItems: "center",
  },
});
