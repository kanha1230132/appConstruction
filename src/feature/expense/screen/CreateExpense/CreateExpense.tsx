import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaWrapper } from "../../../../components/SafeAreaWrapper/SafeAreaWrapper";
import HeaderWithBackButton from "../../../../components/Button/HeaderWithBackButton";
import { AppText } from "../../../../constants/appText";
import { goBack, navigate } from "../../../../utils/NavigationUtil";
import CircleTabs from "../../../reports/components/CircleTabs";
import ScrollViewWrapper from "../../../../components/ScrollViewWrapper/ScrollViewWrapper";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import CustomTextInput from "../../../../components/CustomTextInput/CustomTextInput";
import DateTimePicker from "react-native-modal-datetime-picker";
import { DateFormat, typeOfPicker } from "../../../../utils/dateUtil";
import IconTextInput from "../../../../components/CustomTextInput/CustomIconTextInput";
import NextPreviewButton from "../../../../components/Button/NextPreviewButton";
import GradientCard from "../../components/LinearGradientCard";
import moment from "moment";
import {
  ExpenseItemResponse,
  ExpenseReportRequest,
  ExpenseReportResponse,
  initalExpenseItem,
  MileageResponse,
  SchedulesResponse,
  UploadAttachmentResponse,
} from "../../../../api/apiInterface";
import ExpenseItemCard from "../../components/ExpenseItemCard";
import { AppColor } from "../../../../themes/AppColor";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AppFonts } from "../../../../themes/AppFonts";
import CustomText from "../../../../components/CustomText/CustomText";
import BottomButtonWrapper from "../../../../components/Button/BottomButtonWrapper";
import { useDispatch } from "react-redux";
import { updateExpenseData } from "../../../../store/slice/UserSlice";
import ImagePickerModal from "../../../../components/Modal/PhotoSelectorModal";
import { delay } from "../../../../utils/delay";
import { openCamera, openImagePicker } from "../../../../utils/util";
import useImageViewer from "../../../../components/Modal/ImageViewerModal";
import { ImageType } from "../../../../types/ImageType";
import RestClient from "../../../../api/restClient";
import useToastHook from "../../../../hooks/toast";
import { screenNames } from "../../../../navigation/ScreenNames";
import ScheduleModal from "../../components/ScheduleModal";
import LoaderModal from "../../../../components/Loader/Loader";

interface CreateExpenseProps {}

const CreateExpenseScreen: React.FC<CreateExpenseProps> = () => {
  const [ActiveTab, setActiveTabs] = useState(1);
  const [ActiveTabTitle, setActiveTabTitle] = useState(
    AppText.EnterProjectDetails
  );
  const [ShowPickerModal, setShowPickerModal] = useState(false);
  const [selectedPickerType, setSelectedPickerType] = useState(
    typeOfPicker.startDate
  );
  const { showToast } = useToastHook();

  const [EmployeeName, setEmployeeName] = useState("");
  const [StartDate, setStartDate] = useState(
    moment().format(DateFormat.YYYY_MM_DD)
  );
  const [EndDate, setEndDate] = useState(
    moment().format(DateFormat.YYYY_MM_DD)
  );
  const [ExpenditureNAme, setExpenditureNAme] = useState("");
  const [ProjectNumber, setProjectNumber] = useState("");
  const [Category, setCategory] = useState("");
  const [CategoryTask, setCategoryTask] = useState("");
  const [total, setTotal] = useState(0);
  const [mileageAmount, setMileageAmount] = useState(0);
  const [imagePickerModal, setImagePickerModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [scheduleList, setScheduleList] = useState<SchedulesResponse[]>([]);
  const [ShowScheduleModal, setShowScheduleModal] = useState(false);
  const [SelectedSchedule, setSelectedSchedule] = useState<SchedulesResponse>();
  const [MileageIds, setMileageIds] = useState<number[]>([]);
  const [loading, setloading] = useState(false);

  const [ExpenseItems, setExpenseItems] = useState<ExpenseItemResponse[]>([
    {
      ...initalExpenseItem,
    },
  ]);
  const { showImageViewerPopup, ImageViewerPopup, imageViewerVisible } =
    useImageViewer();

  const dispatch = useDispatch();
  useEffect(() => {
    fetchSchedules();
  }, []);

  useEffect(() => {
    if (StartDate && EndDate) {
      getMileageHistory(StartDate, EndDate);
    }
  }, [StartDate, EndDate]);

  const getMileageHistory = async (fromDate: string, toDate: string) => {
    try {
      const param = {
        filter: {
          startDate: `${fromDate}T00:00:00.000Z`,
          endDate: `${toDate}T23:59:00.000Z`,
          type: "expense",
        },
      };
      const restClient = new RestClient();
      const response = await restClient.getMileageHistory(param);
      if (response && typeof response !== "string") {
        const mileage = response.data;
        const ids: number[] = [];
        const mileageTotal = mileage.reduce(
          (acc: number, trip: MileageResponse) => {
            ids.push(trip.id);
            const expenses = parseFloat(trip.amount) || 0; // Parse as float
            return acc + expenses;
          },
          0
        );
        setMileageAmount(typeof mileageTotal === "number" ? mileageTotal : 0);
        setMileageIds(ids);
      }
    } catch (error) {
      console.log("Error : ", error);
    }
  };

  const updateExpenseDetails = () => {
    const list: ExpenseReportRequest = {
      employeeName: EmployeeName,
      startDate: StartDate,
      endDate: EndDate,
      expenditure: ExpenditureNAme,
      schedule_id: SelectedSchedule?.id || 0,
      category: Category,
      task: CategoryTask,
      expenseType: ExpenseItems,
      mileageAmount: mileageAmount,
      expenseAmount: total,
      receipt: undefined,
      mileageStatus: undefined,
      expenseStatus: undefined,
      mileageIds: MileageIds,
      SelectedSchedule: SelectedSchedule,
    };
    dispatch(updateExpenseData(list));
  };

  const clickOnTabs = (step: number) => {
    if (ActiveTab == 1) {
      if (!EmployeeName) {
        showToast("Please enter employee name", "warning");
        return;
      }

      if (!ExpenditureNAme) {
        showToast("Please enter details of expenditure", "warning");
        return;
      }

      if (!SelectedSchedule) {
        showToast("Please select Project no./client PO", "warning");
        return;
      }
    }
    setActiveTabs(step);
    updateExpenseDetails();

    if (step === 1) {
      setActiveTabTitle(AppText.EnterProjectDetails);
    } else if (step === 2) {
      setActiveTabTitle(AppText.EnterDescriptiondetails);
    }
  };

  const addNewCategory = () => {
    setExpenseItems([...ExpenseItems, initalExpenseItem]);
  };

  const removeCategory = (index: number) => {
    ExpenseItems.splice(index, 1);
    setExpenseItems([...ExpenseItems]);
  };

  const onDateChange = (selectedDate: Date) => {
    const date = moment(selectedDate).format(DateFormat.YYYY_MM_DD);
    if (selectedPickerType === typeOfPicker.startDate) {
      setStartDate(date);
    }
    if (selectedPickerType === typeOfPicker.endDate) {
      setEndDate(date);
    }
    setShowPickerModal(false);
  };

  const clickOnCamera = (index: number) => {
    setSelectedIndex(index);
    setImagePickerModal(true);
  };

  const handlePickImage = async () => {
    try {
      setImagePickerModal(false);
      if (Platform.OS === "ios") {
        await delay(900);
      } else {
        await delay(500);
      }
      const result = await openImagePicker(false);
      if (result) {
        const { height, width } = result;
        console.log("result : ", result);
        const tempUri = await showImageViewerPopup(
          result.path,
          "",
          "OK",
          height,
          width
        );
        console.log("tempUri: ", tempUri);
        if (tempUri) {
          uploadAttachments([String(tempUri)]);
        }
      }
    } catch (error) {
      console.log("Error --> ", error);
    }
  };

  const handleTakePicture = async () => {
    try {
      setImagePickerModal(false);
      if (Platform.OS === "ios") {
        await delay(900);
      } else {
        await delay(500);
      }
      const result = await openCamera();
      if (result) {
        const { height, width } = result;
        const tempUri = await showImageViewerPopup(
          result.path,
          "",
          "OK",
          height,
          width
        );
        if (tempUri) {
          uploadAttachments([String(tempUri)]);
        }
      }
    } catch (error) {
      console.log("Error --> ", error);
    }
  };

  const uploadAttachments = async (urls: string[]) => {
    try {
      setloading(true);
      const formData = new FormData();
      urls.map((url) => {
        formData.append("file", {
          uri: url,
          name: "image.jpg",
          type: "image/jpeg",
        });
      });
      formData.append("type", ImageType.EXPENSE);
      const restClient = new RestClient();
      const response = await restClient.uploadAttachments(formData);
      if (response && typeof response !== "string") {
        const output: UploadAttachmentResponse[] = response.data;
        const url = output[0]?.fileUrl;
        const tempExpenseItems = ExpenseItems.map((item, index) => {
          if (index === selectedIndex) {
            return {
              ...item,
              images: [...(item.images || []), { path: url }],
            };
          }
          return item;
        });

        setExpenseItems(tempExpenseItems);
      } else {
        showToast(
          response || "Something went wrong please try again",
          "danger"
        );
      }
    } catch (error) {
      console.log("Error : ", error);
      setloading(false);
      showToast("Something went wrong please try again", "danger");
    } finally {
      setloading(false);
    }
  };

  const callToPreviewExpense = () => {
    if (total + mileageAmount <= 0) {
      showToast("Please enter Expense or Mileage amount", "warning");
      return;
    }

    const expenseItems = [...ExpenseItems];
  
    for (const item of expenseItems) {
      console.log(
        "item : ",
        item
      )
      if(!item.amount) {
        showToast("Please enter expense amount", "warning");
        return;
      }
      if(item.title == "") {
        showToast("Please enter expense title", "warning");
        return;
      }
    }

    updateExpenseDetails();
    navigate(screenNames.PreviewExpenseScreen);
  };

  const fetchSchedules = async () => {
    try {
      const restClient = new RestClient();
      const response = await restClient.getSchedules();
      if (response && typeof response != "string") {
        const list = response.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        setScheduleList(list);
      } else {
        showToast(response || "Something went wrong", "danger");
      }
    } catch (error) {
      showToast("Something went wrong", "danger");
    } finally {
    }
  };

  return (
    <>
      <SafeAreaWrapper>
        <HeaderWithBackButton
          title={AppText.CreateNewExpense}
          onBackClick={() => goBack()}
          customStyle={undefined}
        />
        <CircleTabs
          ActiveTab={ActiveTab}
          Tabs={[1, 2]}
          lineWidth={78}
          onTabPress={(tab) => clickOnTabs(tab)}
        />

        <ScrollViewWrapper>
          <KeyboardAwareScrollView
            style={{
              flex: 1,
            }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {ActiveTab == 1 ? (
              <>
                <CustomTextInput
                  onChangeTextValue={(text) => {
                    setEmployeeName(text);
                  }}
                  textValue={EmployeeName}
                  label="Employee Name"
                />

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: 10,
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <IconTextInput
                      value={StartDate} //StartDate}
                      label="Start Date"
                      editable={false}
                      rightIconName={"calendar"}
                      onClickIcon={() => {
                        setSelectedPickerType(typeOfPicker.startDate);
                        setShowPickerModal(true);
                      }}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <IconTextInput
                      value={EndDate}
                      label="End Date"
                      editable={false}
                      rightIconName={"calendar"}
                      onClickIcon={() => {
                        setSelectedPickerType(typeOfPicker.endDate);
                        setShowPickerModal(true);
                      }}
                    />
                  </View>
                </View>

                <CustomTextInput
                  onChangeTextValue={(text) => setExpenditureNAme(text)}
                  textValue={ExpenditureNAme}
                  label="Details of Expenditure"
                />

                <TouchableOpacity onPress={() => setShowScheduleModal(true)}>
                  <CustomTextInput
                    pointerEvents="none"
                    onChangeTextValue={(text) => setProjectNumber(text)}
                    textValue={ProjectNumber}
                    label="Project No./Client PO"
                    editable={false}
                  />
                </TouchableOpacity>

                <CustomTextInput
                  onChangeTextValue={(text) => setCategory(text)}
                  textValue={Category}
                  label="Category/SUBPRJ."
                />

                <CustomTextInput
                  onChangeTextValue={(text) => setCategoryTask(text)}
                  textValue={CategoryTask}
                  label="Category/Task"
                />

                {ShowPickerModal ? (
                  <DateTimePicker
                    testID="dateTimePicker"
                    isVisible={ShowPickerModal}
                    date={
                      selectedPickerType == typeOfPicker.startDate
                        ? new Date(StartDate)
                        : selectedPickerType == typeOfPicker.endDate
                        ? new Date(EndDate)
                        : new Date()
                    }
                    mode={"date"}
                    onConfirm={(date) => onDateChange(date)}
                    onCancel={() => setShowPickerModal(false)}
                    textColor="black" // Force text color (iOS 14+)
                    themeVariant="light"
                    isDarkModeEnabled={false}
                  />
                ) : null}
              </>
            ) : null}

            {ActiveTab == 2 ? (
              <>
                <GradientCard
                  title="Mileage Expenses"
                  subtitle={`${moment(StartDate).format(
                    "MMM DD, YYYY"
                  )} to ${moment(EndDate).format("MMM DD, YYYY")}`}
                  amount={mileageAmount}
                />

                <FlatList
                  data={ExpenseItems}
                  renderItem={({ item, index }) => (
                    <ExpenseItemCard
                      item={item}
                      index={index}
                      removeExpense={removeCategory}
                      setExpenseItems={setExpenseItems}
                      expenseItems={ExpenseItems}
                      clickOnCamera={(index) => clickOnCamera(index)}
                      setTotal={(value) => setTotal(value)}
                    />
                  )}
                  keyExtractor={(item, index) =>
                    item.category?.toString() ??
                    (index + Math.round(Math.random() * 1000)).toString()
                  }
                />

                <View
                  style={{
                    alignItems: "flex-end",
                    marginTop: 20,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      borderWidth: 1,
                      borderColor: AppColor.PRIMARY,
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                      borderRadius: 5,
                      backgroundColor: "#fff",
                      marginBottom: 80,
                    }}
                    onPress={() => {
                      addNewCategory();
                    }}
                  >
                    <Ionicons
                      name="add-circle-outline"
                      size={24}
                      color={AppColor.PRIMARY}
                    />
                    <Text
                      style={{
                        color: AppColor.PRIMARY,
                        fontSize: 16,
                        marginLeft: 5,
                        fontFamily: AppFonts.Medium,
                      }}
                    >
                      Add More
                    </Text>
                  </TouchableOpacity>
                </View>

                {imagePickerModal ? (
                  <ImagePickerModal
                    pickImageFromLibrary={() => {
                      handlePickImage();
                    }}
                    takePhoto={() => {
                      handleTakePicture();
                    }}
                    isVisible={imagePickerModal}
                    onClose={() => setImagePickerModal(false)}
                  />
                ) : null}
              </>
            ) : null}

            {imageViewerVisible && <ImageViewerPopup />}

            {ShowScheduleModal ? (
              <ScheduleModal
                visible={ShowScheduleModal}
                onDismiss={() => {
                  setShowScheduleModal(false);
                }}
                schedule={scheduleList}
                onConfirm={(item) => {
                  setSelectedSchedule(item);
                  setProjectNumber(item.project_number);
                  setShowScheduleModal(false);
                }}
              />
            ) : null}
          </KeyboardAwareScrollView>
        </ScrollViewWrapper>
      </SafeAreaWrapper>

      {ActiveTab == 2 ? (
        <BottomButtonWrapper>
          <View style={styles.totalSectionBox}>
            <View style={styles.totalSection}>
              <CustomText title="Total (Including Mileage): " />
              <CustomText
                title={
                  typeof total === "number" && typeof mileageAmount === "number"
                    ? "$" + (total + mileageAmount).toFixed(2)
                    : "$0.00"
                }
              />
            </View>
          </View>
        </BottomButtonWrapper>
      ) : null}

      <NextPreviewButton
        ActiveTab={ActiveTab}
        clickOnPrevious={() => {
          if (ActiveTab > 1) {
            clickOnTabs(ActiveTab - 1);
          } else {
            // navigation.goBack();
          }
        }}
        clickOnNext={() => {
          if (ActiveTab == 2) {
            callToPreviewExpense();
          } else {
            clickOnTabs(ActiveTab + 1);
          }
        }}
        size={2}
      />

      {loading && <LoaderModal visible={loading} />}
    </>
  );
};

export default CreateExpenseScreen;

const styles = StyleSheet.create({
  totalSectionBox: {
    width: "100%",
    backgroundColor: "#E5EDFB",
    padding: 15,
    borderRadius: 10,
    marginBottom: 60,
    marginTop: 10,
  },
  totalSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
