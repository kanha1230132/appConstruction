import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { SafeAreaWrapper } from "../../../../components/SafeAreaWrapper/SafeAreaWrapper";
import HeaderWithBackButton from "../../../../components/Button/HeaderWithBackButton";
import {
  goBack,
  navigate,
  resetAndNavigate,
} from "../../../../utils/NavigationUtil";
import { AppText } from "../../../../constants/appText";
import ScrollViewWrapper from "../../../../components/ScrollViewWrapper/ScrollViewWrapper";
import { Card, Divider } from "react-native-paper";
import CustomText from "../../../../components/CustomText/CustomText";
import { AppColor } from "../../../../themes/AppColor";
import { AppFonts } from "../../../../themes/AppFonts";
import { moderateScale } from "react-native-size-matters";
import CustomButton from "../../../../components/Button/CustomButton";
import { ExpenseReportRequest } from "../../../../api/apiInterface";
import RestClient from "../../../../api/restClient";
import LoaderModal from "../../../../components/Loader/Loader";
import useToastHook from "../../../../hooks/toast";
import { screenNames } from "../../../../navigation/ScreenNames";
import moment from "moment";
import LinearGradient from "react-native-linear-gradient";
import FastImage from "react-native-fast-image";
import { useNavigation } from "@react-navigation/native";

interface PreviewExpenseProps {
  title: string;
}

const PreviewExpenseScreen: React.FC<PreviewExpenseProps> = ({ title }) => {
  const { ExpenseData } = useSelector((state: RootState) => state.User);
  const [loading, setloading] = useState(false);
  const { showToast } = useToastHook();
  const [IsSubmit, setIsSubmit] = useState(false);
  const navigation = useNavigation();

  const previewData = [
    { label: "Employee Name", value: ExpenseData?.employeeName || "N/A" },
    { label: "Start Date", value: ExpenseData?.startDate || "N/A" },
    { label: "End Date", value: ExpenseData?.endDate || "N/A" },
    {
      label: "Details of Expenditure",
      value: ExpenseData?.expenditure || "N/A",
    },
    {
      label: "Project No./Client PO",
      value: ExpenseData?.SelectedSchedule?.project_number || "N/A",
    },
    { label: "Category/SUBPRJ.", value: ExpenseData?.category || "N/A" },
    { label: "Category/Task", value: ExpenseData?.task || "N/A" },
  ];

  const callToCreateExpense = async () => {
    try {
      setloading(true);

      let param: ExpenseReportRequest = {
        employeeName: ExpenseData?.employeeName,
        startDate: moment(ExpenseData?.startDate, "YYYY-MM-DD").format(
          "YYYY-MM-DD HH:mm:ss"
        ),
        endDate: ExpenseData?.endDate + " " + "23:59:59",
        expenditure: ExpenseData?.expenditure,
        schedule_id: ExpenseData?.schedule_id,
        category: ExpenseData?.category,
        task: ExpenseData?.task,
        expenseType: ExpenseData?.expenseType,
        receipt: ExpenseData?.receipt,
        mileageAmount: ExpenseData?.mileageAmount,
        expenseAmount: ExpenseData?.expenseAmount,
        mileageStatus: "Pending",
        expenseStatus: "Pending",
        mileageIds: ExpenseData?.mileageIds,
      };
      const IMAGE_PREFIX = "https://d1d9a9emgjh7u0.cloudfront.net/";

      const updatedData = {
        ...param,
        expenseType: param?.expenseType?.map((expense) => ({
          ...expense,
          images: expense.images.map((image) => ({
            ...image,
            path: image.path.replace(IMAGE_PREFIX, ""),
          })),
        })),
      };
      console.log("param : ", JSON.stringify(updatedData));
      const restClient = new RestClient();
      const response = await restClient.createExpense(updatedData);
      if (response && typeof response !== "string") {
        setloading(false);
        showToast(
          response?.message || "Expense Created Successfully",
          "success"
        );
        setIsSubmit(true);

        setTimeout(() => {
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
                        routes: [{ name: screenNames.ExpenseScreen }],
                        index: 0,
                      },
                    },
                  ],
                },
              },
            ],
          });
        }, 1000);
      } else {
        setloading(false);
        showToast(
          response || "Something went wrong please try again",
          "danger"
        );
      }
    } catch (error) {
      showToast("Something went wrong please try again", "danger");
      setloading(false);
      console.log("Error : ", error);
    } finally {
      setloading(false);
    }
  };

  return (
    <>
      <SafeAreaWrapper>
        <HeaderWithBackButton
          title={AppText.ExpensePreview}
          onBackClick={() => {
            IsSubmit
              ? navigation.reset({
                  index: 0,
                  routes: [
                    {
                      name: screenNames.MainApp, // DrawerNavigator is registered as MainApp in your root stack
                      state: {
                        routes: [
                          {
                            name: screenNames.HomeTabs,
                            state: {
                              routes: [{ name: screenNames.ExpenseScreen }],
                              index: 0,
                            },
                          },
                        ],
                      },
                    },
                  ],
                })
              : goBack();
          }}
          customStyle={undefined}
        />

        <ScrollViewWrapper>
          <Card
            style={{
              padding: 10,
              borderRadius: 6,
              backgroundColor: AppColor.WHITE,
              marginHorizontal: 2,
            }}
          >
            <CustomText
              fontSize={moderateScale(18)}
              fontFamily={AppFonts.Bold}
              color={AppColor.PRIMARY}
              title={"Expense Details"}
            />

            {previewData.map((item, index) => (
              <View
                key={index.toString()}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginVertical: 5,
                }}
              >
                <CustomText fontSize={moderateScale(14)} title={item.label} />
                <CustomText fontSize={moderateScale(14)} title={" : "} />
                <CustomText fontSize={moderateScale(14)} title={item.value} />
              </View>
            ))}
          </Card>

          <Card
            style={{
              padding: 10,
              borderRadius: 6,
              backgroundColor: AppColor.WHITE,
              marginHorizontal: 2,
              marginTop: 10,
            }}
          >
            <CustomText
              fontSize={moderateScale(18)}
              fontFamily={AppFonts.Bold}
              color={AppColor.PRIMARY}
              title={"Expense Types"}
            />

            {ExpenseData?.expenseType?.map((item, index) => (
              <>
                <View
                  key={index.toString()}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginVertical: 5,
                  }}
                >
                  <CustomText fontSize={moderateScale(14)} title={"Title"} />
                  <CustomText fontSize={moderateScale(14)} title={" : "} />
                  <CustomText fontSize={moderateScale(14)} title={item.title} />
                </View>

                <View
                  key={index.toString()}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginVertical: 5,
                  }}
                >
                  <CustomText fontSize={moderateScale(14)} title={"Amount"} />
                  <CustomText fontSize={moderateScale(14)} title={" : "} />
                  <CustomText
                    fontSize={moderateScale(14)}
                    title={"$" + item.amount.toString()}
                  />
                </View>

                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: 10,
                  }}
                >
                  {item.images.map((item) => {
                    return (
                      <TouchableOpacity
                        style={{
                          borderRadius: 8,
                        }}
                        onPress={() => {
                          navigate(screenNames.ImageViewer, {
                            image: item.path,
                          });
                        }}
                      >
                        <Card
                          style={{
                            borderRadius: 8,
                            width: 60,
                            height: 60,
                            margin: 2,
                            backgroundColor: AppColor.WHITE,
                          }}
                        >
                          <FastImage
                            resizeMode="cover"
                            source={{ uri: item.path }}
                            style={{ width: 60, height: 60, borderRadius: 8 }}
                          />
                        </Card>
                      </TouchableOpacity>
                    );
                  })}
                </View>
                <Divider style={{ marginVertical: 10 }} />
              </>
            ))}
          </Card>

          <LinearGradient
            colors={["#dceeff", "#f0f6ff"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ borderRadius: 6, marginTop: 20 }}
          >
            <Card
              elevation={0}
              style={{
                backgroundColor: "transparent",
                marginHorizontal: 2,
                padding: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginVertical: 5,
                }}
              >
                <CustomText
                  fontSize={moderateScale(14)}
                  title={"Mileage Amount"}
                />
                <CustomText fontSize={moderateScale(14)} title={" : "} />
                <CustomText
                  fontSize={moderateScale(14)}
                  title={"$" + ExpenseData?.mileageAmount?.toFixed(2) || ""}
                />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginVertical: 5,
                }}
              >
                <CustomText
                  fontSize={moderateScale(14)}
                  title={"Expense Amount"}
                />
                <CustomText fontSize={moderateScale(14)} title={" : "} />
                <CustomText
                  fontSize={moderateScale(14)}
                  title={"$" + ExpenseData?.expenseAmount?.toFixed(2) || ""}
                />
              </View>

              <Divider style={{ marginVertical: 5 }} />

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginVertical: 5,
                }}
              >
                <CustomText
                  fontSize={moderateScale(16)}
                  title={"Total Amount"}
                />
                <CustomText fontSize={moderateScale(16)} title={" : "} />
                <CustomText
                  style={{
                    textShadowColor: AppColor.PRIMARY,
                    textShadowOffset: { width: 1, height: 1 },
                  }}
                  fontSize={moderateScale(16)}
                  title={
                    "$" +
                      (
                        ExpenseData?.expenseAmount + ExpenseData?.mileageAmount
                      ).toFixed(2) || ""
                  }
                />
              </View>
            </Card>
          </LinearGradient>

          {loading && <LoaderModal visible={loading} />}
        </ScrollViewWrapper>
      </SafeAreaWrapper>

      <View style={[styles.buttonContainer, { gap: 10 }]}>
        {!IsSubmit ? (
          <>
            <View style={{ flex: 1, height: 50 }}>
              <CustomButton
                title="Previous"
                onPress={() => {
                  goBack();
                }}
              />
            </View>
            <View style={{ flex: 1, height: 50 }}>
              <CustomButton
                title={"submit"}
                onPress={() => {
                  callToCreateExpense();
                }}
              />
            </View>
          </>
        ) : null}
      </View>
    </>
  );
};

export default PreviewExpenseScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
    alignSelf: "center",
    position: "absolute",
    bottom: 0,
    borderRadius: 8,
    justifyContent: "center",
    flexDirection: "row",

    paddingHorizontal: Platform.OS === "ios" ? "4%" : "2%",
    backgroundColor: AppColor.WHITE,
    paddingBottom: Platform.OS === "ios" ? 35 : 15,

    paddingTop: 5,
  },
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
