import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { use, useCallback, useEffect, useState } from "react";
import { SafeAreaWrapper } from "../../components/SafeAreaWrapper/SafeAreaWrapper";
import HeaderWithBackButton from "../../components/Button/HeaderWithBackButton";
import { goBack, navigate } from "../../utils/NavigationUtil";
import { AppText } from "../../constants/appText";
import AddButton from "../../components/Button/AddButton";
import { screenNames } from "../../navigation/ScreenNames";
import ScrollViewWrapper from "../../components/ScrollViewWrapper/ScrollViewWrapper";
import { ExpenseListResponse } from "../../api/apiInterface";
import ExpenseListCard from "./components/ExpenseListCard";
import RestClient from "../../api/restClient";
import LoaderModal from "../../components/Loader/Loader";
import useToastHook from "../../hooks/toast";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import ActivityLoader from "../../components/Loader/ActivityLoader";
import NotFoundText from "../../components/CustomText/NotFoundText";
import { useConfirmationPopup } from "../../components/Popup/confirmationPopup";
import { AppColor } from "../../themes/AppColor";
import ExpenseFilterModal from "./components/ExpenseFilterModal";
import DateTimePicker from "react-native-modal-datetime-picker";
import { DateFormat } from "../../utils/dateUtil";
import moment from "moment";

interface ExpenseScreenProps {}

export const expenseFilterTypes ={
  All :'All',
  Pending : 'Pending',
  Approved : 'Approved',
  Rejected : 'Rejected',
  DateFilter : 'DateFilter'
}

const ExpenseScreen: React.FC<ExpenseScreenProps> = () => {
  const [ExpenseList, setExpenseList] = useState<ExpenseListResponse[]>([]);
  const [loading, setloading] = useState(false);
  const [dataList, setDataList] = useState<ExpenseListResponse[]>([]);
  const [ListingLoading, setListingLoading] = useState(false);
  const { showToast } = useToastHook();
  const isFocused = useIsFocused();
  const { showConfirmationPopup, ConfirmationPopup, popupVisible } = useConfirmationPopup();
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [SelectedFilterType, setSelectedFilterType] = useState(
    expenseFilterTypes.All
  );
  const [ShowDatePickerModal, setShowDatePickerModal] = useState(false);
  const [SelectedDate, setSelectedDate] = useState(new Date());
  const navigation = useNavigation();

  useEffect(() => {
    if (isFocused) {
      getExpenses();
    }
  }, [isFocused]);

  const getExpenses = async () => {
    try {
        setDataList([]);
      setExpenseList([])
      setListingLoading(true);
    
      const restClient = new RestClient();
      const response = await restClient.getExpenses();
      if (response && typeof response !== "string") {
        const output = response.data;
        setExpenseList(output);
        setDataList(output);
      }
    } catch (error) {
      setListingLoading(false);
      console.log("first error : ", error);
    } finally{
      setListingLoading(false);
    }
  };

  const onRefreshCall = useCallback(() => {
    getExpenses();
  }, []);

  const callToApprove = async (id: number, type: string) => {
    try {
      setloading(true);
      const restClient = new RestClient();
      const param = {
        expense_id: id,
        item_id: "",
        mileage_id: "",
        status: AppText.Approved,
        type: type,
      };

      const response = await restClient.updateExpenseStatus(param);
      if (response && typeof response !== "string") {
        setExpenseList((prev) =>
          prev.map((item) =>
            item.id === id
              ? {
                  ...item,
                  ...(type === "mileage"
                    ? { mileageStatus: AppText.Approved }
                    : { expenseStatus: AppText.Approved }),
                }
              : item
          )
        );
        showToast(
          response?.message || `Approved ${type} Successfully`,
          "success"
        );
      } else {
        showToast("Something went wrong please try again", "danger");
      }
    } catch (error) {
      setloading(false);
      console.log("Error callToApprove : ", error);
    } finally {
      setloading(false);
    }
  };

  const callToReject = async (id: number, type: string) => {
    try {
      const status = await showConfirmationPopup(
        "Confirm Rejection",
        `Are you sure you want to reject these ${type} ?`,
        "Reject",
        "Cancel"
      );
      if(!status){
        return
      }
      setloading(true);
      const restClient = new RestClient();
      const param = {
        expense_id: id,
        item_id: "",
        mileage_id: "",
        status: AppText.Rejected,
        type: type,
      };

      const response = await restClient.updateExpenseStatus(param);
      if (response && typeof response !== "string") {
        setExpenseList((prev) =>
          prev.map((item) =>
            item.id === id
              ? {
                  ...item,
                  ...(type === "mileage"
                    ? { mileageStatus: AppText.Rejected }
                    : { expenseStatus: AppText.Rejected }),
                }
              : item
          )
        );
        showToast(
          response?.message || `Approved ${type} Successfully`,
          "success"
        );
      } else {
        showToast("Something went wrong please try again", "danger");
      }
    } catch (error) {
      setloading(false);
      console.log("Error callToApprove : ", error);
    } finally {
      setloading(false);
    }
  };

  const renderExpenseItem = ({
    item,
    index,
  }: {
    item: ExpenseListResponse;
    index: number;
  }) => {
    return (
      <ExpenseListCard
        key={index.toFixed()}
        item={item}
        onPress={() => navigate(screenNames.ExpenseDetailScreen, { item })}
        callToApprove={callToApprove}
        callToReject={callToReject}
      />
    );
  };

  const handleFilterApply = (type: React.SetStateAction<string>) => {
    if (type == expenseFilterTypes.All) {
      setExpenseList(dataList);
    } else if (type == expenseFilterTypes.Approved) {
      setExpenseList(
        dataList.filter((expense) => expense.expenseStatus == "Approved")
      );
    } else if (type == expenseFilterTypes.Rejected) {
      setExpenseList(
        dataList.filter((expense) => expense.expenseStatus == "Rejected")
      );
    } else if (type == expenseFilterTypes.Pending) {
      setExpenseList(
        dataList.filter((expense) => expense.expenseStatus == "Pending")
      );
    } else if (type == expenseFilterTypes.DateFilter) {
      setShowDatePickerModal(true);
    }
    setShowFilterModal(false);
    setSelectedFilterType(type);
  };

  const handleDateChange = (selectedDate: moment.MomentInput) => {
    const date = moment(selectedDate).format(DateFormat.YYYY_MM_DD);
    setShowFilterModal(false);
    setShowDatePickerModal(false);
    setExpenseList(
      dataList.filter(
        (expense) =>
          moment.utc(expense.createdAt).format(DateFormat.YYYY_MM_DD) == date
      )
    );
  };
  
  return (
    <>
      <SafeAreaWrapper>
        <HeaderWithBackButton
          title={AppText.Expense}
          onBackClick={() => {
            navigation.reset({
                      index: 0,
                      routes: [
                        {
                          name: screenNames.MainApp,
                          state: {
                            routes: [
                              { name: screenNames.HomeScreen },
                            ],
                          },
                        },
                      ],
                    });
          }}
          customStyle={undefined}
          RightIcon2="filter"
          RightIcon2Color={AppColor.PRIMARY}
          onClickRightIcon2={()=>{
            setShowFilterModal(true)
          }}
        />

        {/* <ScrollViewWrapper> */}
          {ListingLoading ? <ActivityLoader /> : null}

          {!ListingLoading && ExpenseList.length ? (
            <FlatList
              data={ExpenseList}
              keyExtractor={(item) => item.schedule_id.toString()}
              renderItem={renderExpenseItem}
              showsVerticalScrollIndicator={false}
                  refreshing={ListingLoading}
            onRefresh={onRefreshCall}
            />
          ) : null}

          {
            !ListingLoading && !ExpenseList.length && (
              <NotFoundText message={"Expense Not Found"} />
            )
          }
            {
          showFilterModal?
          <ExpenseFilterModal
            SelectedFilterType={SelectedFilterType}
            show={showFilterModal} onClose={() => setShowFilterModal(false)} onApply={(type) => handleFilterApply(type)} projects={[]} />
          : null
        }

                   


        
        {popupVisible && <ConfirmationPopup />}
        {/* </ScrollViewWrapper> */}
      </SafeAreaWrapper>

      <AddButton
        onPress={() => {
          navigate(screenNames.CreateExpenseScreen);
        }}
      />

     

        {
  ShowDatePickerModal?

                         <DateTimePicker
                                                        testID="dateTimePicker"
                                                        value={SelectedDate ? moment(SelectedDate, DateFormat.YYYY_MM_DD).toDate() : new Date()}
                                                        isVisible={ShowDatePickerModal}
                                                          mode={"date"}
                                                          onConfirm={(date)=>handleDateChange(date)}
                                                          onCancel={() => setShowDatePickerModal(false)}
                                                          textColor="black"
                                                          themeVariant="light" 
                                                          isDarkModeEnabled={false}
                                                        />
  : null
}

 
    </>
  );
};

export default ExpenseScreen;

const styles = StyleSheet.create({});
