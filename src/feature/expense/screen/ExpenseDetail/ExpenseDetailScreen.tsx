import {
  Image,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaWrapper } from "../../../../components/SafeAreaWrapper/SafeAreaWrapper";
import HeaderWithBackButton from "../../../../components/Button/HeaderWithBackButton";
import { goBack, navigate } from "../../../../utils/NavigationUtil";
import { AppText } from "../../../../constants/appText";
import { ExpenseDetailScreenProps } from "../../../../types/navigation";
import ScrollViewWrapper from "../../../../components/ScrollViewWrapper/ScrollViewWrapper";
import { Button, Card, Divider } from "react-native-paper";
import CustomText from "../../../../components/CustomText/CustomText";
import { moderateScale } from "react-native-size-matters";
import { AppFonts } from "../../../../themes/AppFonts";
import { AppColor } from "../../../../themes/AppColor";
import FastImage from "react-native-fast-image";
import CustomButton from "../../../../components/Button/CustomButton";
import { images } from "../../../../assets";
import {
  ExpenseListResponse,
  Mileage,
  MileageResponse,
} from "../../../../api/apiInterface";
import { screenNames } from "../../../../navigation/ScreenNames";
import useToastHook from "../../../../hooks/toast";
import RestClient from "../../../../api/restClient";
import { expenseType } from "../../helper/util";
import LoaderModal from "../../../../components/Loader/Loader";
import RejectedIcon from "../../components/RejectedIcon";
import ApprovedIcon from "../../components/ApprovedIcon";
import moment from "moment";
import { DateFormat } from "../../../../utils/dateUtil";
import { useConfirmationPopup } from "../../../../components/Popup/confirmationPopup";
import LinearGradient from "react-native-linear-gradient";
import BottomButtonWrapper from "../../../../components/Button/BottomButtonWrapper";
import GradientWrapper from "../../../../components/Wrapper/GradientWrapper";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import Ionicons from "react-native-vector-icons/Ionicons";

const ExpenseDetailScreen: React.FC<ExpenseDetailScreenProps> = ({ route }) => {
  const { item } = route.params;
  const [loading, setloading] = useState(false);
  const { showToast } = useToastHook();
  const [ExpenseDetail, setExpenseDetail] = useState<ExpenseListResponse>();
  const { showConfirmationPopup, ConfirmationPopup, popupVisible } =
    useConfirmationPopup();
  const [ApprovedAmount, setApprovedAmount] = useState(0.0);
  const [MileageAmount, setMileageAmount] = useState(0.0);
  const [ExpenseAmount, setExpenseAmount] = useState(0.0);
  const [MileageList, setMileageList] = useState<Mileage[]>([]);
  const { IsBoss } = useSelector((state: RootState) => state.User);

  useEffect(() => {
    let approvedAmount = 0;
    let mileageAmount = 0;
    let expenseAmount = 0;
    if (ExpenseDetail) {
      ExpenseDetail.expenseType.map((item) => {
        if (item.status == AppText.Approved) {
          approvedAmount += item.amount;
        }
        expenseAmount += item.amount;
      });

      console.log("item: ", item);
    }

    MileageList?.map((item) => {
      if (item.status == AppText.Approved) {
        approvedAmount += item.amount;
      }
      mileageAmount += item.amount;
    });

    setMileageAmount(mileageAmount);
    setExpenseAmount(expenseAmount);
    setApprovedAmount(approvedAmount);

    console.log("E -id : ", ExpenseDetail?.id);
  }, [ExpenseDetail, MileageList]);

  const previewData = [
    { label: "Employee Name", value: item?.employeeName || "N/A" },
    {
      label: "Start Date",
      value: moment.utc(item?.startDate).format(DateFormat.DD_MM_YYYY) || "N/A",
    },
    {
      label: "End Date",
      value: moment.utc(item?.endDate).format(DateFormat.DD_MM_YYYY) || "N/A",
    },
    { label: "Details of Expenditure", value: item?.expenditure || "N/A" },
    {
      label: "Project No./Client PO",
      value: item?.project_number || "N/A",
    },
    { label: "Category/SUBPRJ.", value: item?.category || "N/A" },
    { label: "Category/Task", value: item?.task || "N/A" },
  ];

  const updateExpenseStatusLocally = (id: number, status: string) => {
    setExpenseDetail((prev) => {
      if (!prev) return prev;
      const updatedExpenseTypes = prev.expenseType.map((exp) =>
        exp.id === id ? { ...exp, status } : exp
      );
      return { ...prev, expenseType: updatedExpenseTypes };
    });
  };

  const updateMileageStatusLocally = (id: number, status: string) => {
    const updatedMileage = MileageList.map((mile) =>
      mile.id === id ? { ...mile, status } : mile
    );
    setMileageList(updatedMileage);
  };

  useEffect(() => {
    if (item) {
      setExpenseDetail(item);
    }
    if (item.mileage) {
      setMileageList(item.mileage);
    }
  }, [item]);

  const callToApprove = async (id: number, type: string) => {
    try {
      if (type === expenseType.expense) {
        updateExpenseStatusLocally(id, AppText.Approved);
      } else {
        updateMileageStatusLocally(id, AppText.Approved);
      }
      showToast(`Approved ${type} Successfully`, "success");
      return;
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
        `Are you sure you want to reject ?`,
        "Reject",
        "Cancel"
      );
      if (!status) {
        return;
      }

      if (type === expenseType.expense) {
        updateExpenseStatusLocally(id, AppText.Rejected);
      } else {
        updateMileageStatusLocally(id, AppText.Rejected);
      }
      showToast(`Rejected ${type} Successfully`, "success");
      return;
    } catch (error) {
      setloading(false);
      console.log("Error callToApprove : ", error);
    } finally {
      setloading(false);
    }
  };

  const callToAllApprove = async (id: number, type: string) => {
    try {
      let isExist = false;
      if (type == expenseType.expense) {
        if (ExpenseDetail) {
          ExpenseDetail.expenseType.map((item) => {
            if (item.status == AppText.Pending) {
              showToast(
                "Please approve or reject the expense first",
                "warning"
              );
              isExist = true;
              return;
            }
          });
        }
      } else {
        if (MileageList) {
          MileageList.map((item) => {
            if (item.status == AppText.Pending) {
              showToast(
                "Please approve or reject the mileage first",
                "warning"
              );
              isExist = true;
              return;
            }
          });
        }
      }
      if (isExist) {
        return;
      }

      const ids: any[] = [];
      if (type == expenseType.expense) {
        ExpenseDetail?.expenseType.map((item) => {
          ids.push({
            id: item.id,
            status: item.status,
          });
        });
      } else {
        MileageList.map((item) => {
          ids.push({
            id: item.id,
            status: item.status,
          });
        });
      }
      setloading(true);

      const restClient = new RestClient();
      const param = {
        expense_id: id,
        items: expenseType.expense == type ? ids : [],
        mileage: expenseType.mileage == type ? ids : [],
        status: AppText.Approved,
        type: type,
      };
      const response = await restClient.updateExpenseStatus(param);
      if (response && typeof response !== "string") {
        showToast(response?.message || "Approved Successfully", "success");
        if (!ExpenseDetail) {
          return;
        }
        let expenseDetail = { ...ExpenseDetail };

        if (expenseType.expense == type) {
          expenseDetail.expenseStatus = AppText.Approved;
        } else {
          expenseDetail.mileageStatus = AppText.Approved;
        }
        setExpenseDetail(expenseDetail);
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

  const callToAllReject = async (id: number, type: string) => {
    try {
      const status = await showConfirmationPopup(
        "Confirm Rejection",
        `Are you sure you want to reject ?`,
        "Reject",
        "Cancel"
      );
      if (!status) {
        return;
      }
      const ids: any[] = [];
      if (type == expenseType.expense) {
        ExpenseDetail?.expenseType.map((item) => {
          ids.push({
            id: item.id,
            status: AppText.Rejected,
          });
        });
      } else {
        MileageList.map((item) => {
          ids.push({
            id: item.id,
            status: AppText.Rejected,
          });
        });
      }

      setloading(true);
      const restClient = new RestClient();
      const body = {
        expense_id: id,
        items: expenseType.expense == type ? ids : [],
        mileage: expenseType.mileage == type ? ids : [],
        status: AppText.Rejected,
        type: type,
      };
      console.log("body :", body);
      const response = await restClient.updateExpenseStatus(body);
      if (response && typeof response !== "string") {
        if (expenseType.expense == type) {
          if (ExpenseDetail) {
            let expenseDetail = { ...ExpenseDetail };
            expenseDetail.expenseType = expenseDetail.expenseType.map(
              (exp) => ({ ...exp, status: AppText.Rejected })
            );
            expenseDetail.expenseStatus = AppText.Rejected;
            setExpenseDetail(expenseDetail);
          }
        } else {
          setMileageList((prev) =>
            prev.map((mile) => ({ ...mile, status: AppText.Rejected }))
          );
          if (ExpenseDetail) {
            let expenseDetail = { ...ExpenseDetail };
            expenseDetail.mileageStatus = AppText.Rejected;
            setExpenseDetail(expenseDetail);
          }
        }
        showToast(response?.message || "Rejected Successfully", "success");
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

  const shouldShowApproveButton = (list) => {
    if(!list) return false
    if (list?.length === 1 && list[0].amount === 0) return false;
    const allApproved = list.every((item) => item.status === AppText.Approved);
    if (allApproved) return true;
    const allRejected = list.every((item) => item.status === AppText.Rejected);
    if (allRejected) return false;
    return true; // mixed case
  };

  const shouldShowRejectButton = (list) => {
    if(!list) return false
    if (list?.length === 1 && list[0].amount === 0) return true;
    const allRejected = list.every((item) => item.status === AppText.Rejected);
    if (allRejected) return true;
    const allApproved = list.every((item) => item.status === AppText.Approved);
    if (allApproved) return false;
    return true; // mixed case
  };

  const shouldShowExpenseApproveButton = (list) => {
    if(!list) return false
    if (list?.length === 1 && list[0].amount === 0) return false;
    const allApproved = list.every((item) => item.status === AppText.Approved);
    if (allApproved) return true;
    const allRejected = list.every((item) => item.status === AppText.Rejected);
    if (allRejected) return false;
    return true; // mixed
  };

  const shouldShowExpenseRejectButton = (list) => {
    if(!list) return false
    if (list?.length === 1 && list[0].amount === 0) return true;
    const allRejected = list.every((item) => item.status === AppText.Rejected);
    if (allRejected) return true;
    const allApproved = list.every((item) => item.status === AppText.Approved);
    if (allApproved) return false;
    return true; // mixed
  };

  const showApprove = shouldShowApproveButton(MileageList);
  const showReject = shouldShowRejectButton(MileageList);
  const showExpenseApprove = shouldShowExpenseApproveButton(
    ExpenseDetail?.expenseType
  );
  const showExpenseReject = shouldShowExpenseRejectButton(
    ExpenseDetail?.expenseType
  );

  const StatusButton = ({
    status,
    color,
  }: {
    status: string;
    color: string;
  }) => {
    return (
      <View
        style={{
          alignItems: "center",
          marginTop: 5,
          flexDirection: "row",
          backgroundColor: color,
          padding: 2,
          width: 60,
          justifyContent: "center",
          borderRadius: 5,
          position: "absolute",
          top: -5,
          right: 0,
        }}
      >
        <CustomText
          fontSize={moderateScale(10)}
          title={status}
          color={AppColor.WHITE}
        />
      </View>
    );
  };

  return (
    <>
      <SafeAreaWrapper>
        <HeaderWithBackButton
          title={AppText.ExpenseDetails}
          onBackClick={() => goBack()}
          customStyle={undefined}
        />
        <ScrollViewWrapper>
          <Card
            style={{
              padding: 10,
              backgroundColor: AppColor.WHITE,
              marginHorizontal: 1,
              marginTop: 10,
              borderRadius: 6,
            }}
          >
            {previewData.map((item, index) => (
              <>
                <View
                  key={index.toString()}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginVertical: 5,
                  }}
                >
                  <CustomText
                    fontSize={moderateScale(15)}
                    color={AppColor.BLACK}
                    fontFamily={AppFonts.Medium}
                    title={item.label}
                  />
                  <CustomText fontSize={moderateScale(15)} title={" : "} />
                  <CustomText
                    fontSize={moderateScale(14)}
                    title={item.value.toString()}
                  />
                </View>
                <Divider
                  style={{
                    marginVertical: 5,
                  }}
                />
              </>
            ))}
          </Card>

          <Card
            style={{
              borderRadius: 6,
              backgroundColor: AppColor.WHITE,
              marginHorizontal: 2,
              marginTop: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 5,
              }}
            >
              <CustomText
                fontSize={moderateScale(16)}
                fontFamily={AppFonts.Regular}
                title="Mileage Amount : "
              />
              <CustomText
                style={{
                  textShadowColor: AppColor.APPROVE,
                  textShadowRadius: 1,
                  textShadowOffset: { width: 0.5, height: 0.5 },
                  letterSpacing: 1,
                }}
                fontSize={moderateScale(18)}
                fontFamily={AppFonts.Regular}
                color={AppColor.BLACK}
                title={"$" + MileageAmount.toFixed(2)}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 5,
              }}
            >
              <CustomText
                fontSize={moderateScale(16)}
                fontFamily={AppFonts.Regular}
                title="Expense Amount : "
              />
              <CustomText
                style={{
                  textShadowColor: AppColor.APPROVE,
                  textShadowRadius: 1,
                  textShadowOffset: { width: 0.5, height: 0.5 },
                  letterSpacing: 1,
                }}
                fontSize={moderateScale(18)}
                fontFamily={AppFonts.Regular}
                color={AppColor.BLACK}
                title={"$" + ExpenseAmount.toFixed(2)}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 5,
              }}
            >
              <CustomText
                fontSize={moderateScale(16)}
                fontFamily={AppFonts.Regular}
                title="Approved Amount : "
              />
              <CustomText
                style={{
                  textShadowColor: AppColor.APPROVE,
                  textShadowRadius: 1,
                  textShadowOffset: { width: 0.5, height: 0.5 },
                  letterSpacing: 1,
                }}
                fontSize={moderateScale(18)}
                fontFamily={AppFonts.Regular}
                color={AppColor.BLACK}
                title={"$" + ApprovedAmount.toFixed(2)}
              />
            </View>
          </Card>

          <Card
            elevation={0}
            style={{
              borderRadius: 6,
              backgroundColor: AppColor.WHITE,
              marginHorizontal: 2,
              marginTop: 30,
            }}
          >
            <CustomText
              fontSize={moderateScale(18)}
              fontFamily={AppFonts.Bold}
              color={AppColor.PRIMARY}
              title={"Expense Types"}
            />

            {ExpenseDetail?.expenseType?.map((item, index) => (
              <Card
                style={{
                  padding: 10,
                  borderRadius: 6,
                  backgroundColor: AppColor.WHITE,
                  marginHorizontal: 2,
                  marginTop: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ width: "60%" }}>
                    <View
                      key={index.toString()}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginVertical: 5,
                      }}
                    >
                      <CustomText
                        fontSize={moderateScale(14)}
                        title={"Title"}
                      />
                      <CustomText fontSize={moderateScale(14)} title={" : "} />
                      <CustomText
                        fontSize={moderateScale(14)}
                        title={item.title}
                      />
                    </View>

                    <View
                      key={index.toString()}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginVertical: 5,
                      }}
                    >
                      <CustomText
                        fontSize={moderateScale(14)}
                        title={"Amount"}
                      />
                      <CustomText fontSize={moderateScale(14)} title={" : "} />
                      <CustomText
                        fontSize={moderateScale(18)}
                        fontFamily={AppFonts.Medium}
                        color={AppColor.PRIMARY}
                        title={"$" + item.amount.toString()}
                        style={{
                          textShadowColor: AppColor.APPROVE,
                          textShadowOffset: { width: 0.5, height: 0.5 },
                          textShadowRadius: 1,
                        }}
                      />
                    </View>
                  </View>
                </View>

                {item.status == AppText.Pending && (
                  <>
                    <StatusButton
                      status={AppText.Pending}
                      color={AppColor.PENDING}
                    />
                  </>
                )}

                {item.status == AppText.Approved && (
                  <StatusButton
                    status={AppText.Approved}
                    color={AppColor.APPROVE}
                  />
                )}

                {item.status == AppText.Rejected && (
                  <StatusButton
                    status={AppText.Rejected}
                    color={AppColor.REJECT_50}
                  />
                )}

                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    flexWrap: "wrap",
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
                            image: item.file_url,
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
                            source={{ uri: item.file_url }}
                            style={{ width: 60, height: 60, borderRadius: 8 }}
                          />
                        </Card>
                      </TouchableOpacity>
                    );
                  })}
                </View>

                {item.status == AppText.Pending && IsBoss && (
                  <>
                    <Divider style={{ marginTop: 10 }} />
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 10,
                      }}
                    >
                      {item.amount > 0 ? (
                        <View style={{ width: "48%" }}>
                          <CustomButton
                            textStyle={{
                              fontSize: moderateScale(11),
                              color: AppColor.APPROVE,
                            }}
                            title={"Approve"}
                            buttonStyle={{
                              backgroundColor: AppColor.WHITE,
                              paddingVertical: 7,
                              borderColor: AppColor.APPROVE,
                              borderWidth: 1,
                            }}
                            onPress={() => {
                              callToApprove(item.id, expenseType.expense);
                            }}
                          />
                        </View>
                      ) : null}

                      <View style={{ width: item.amount > 0 ? "48%" : "99%" }}>
                        <CustomButton
                          textStyle={{
                            fontSize: moderateScale(11),
                            color: AppColor.REJECT,
                          }}
                          title={"Reject"}
                          buttonStyle={{
                            backgroundColor: AppColor.WHITE,
                            paddingVertical: 7,
                            borderColor: AppColor.REJECT,
                            borderWidth: 1,
                          }}
                          onPress={() => {
                            callToReject(item.id, expenseType.expense);
                          }}
                        />
                      </View>
                    </View>
                  </>
                )}
              </Card>
            ))}
          </Card>

          {MileageList?.length > 0 && (
            <Card
              elevation={0}
              style={{
                borderRadius: 6,
                backgroundColor: AppColor.WHITE,
                marginHorizontal: 2,
                marginTop: 30,
              }}
            >
              <CustomText
                fontSize={moderateScale(18)}
                fontFamily={AppFonts.Bold}
                color={AppColor.PRIMARY}
                title={"Mileage"}
              />

              {MileageList?.map((item, index) => (
                <Card
                  style={{
                    borderRadius: 6,
                    backgroundColor: AppColor.WHITE,
                    marginHorizontal: 2,
                    marginTop: 10,
                    padding: 10,
                  }}
                >
               
                  <View>
                    <View
                      style={{
                        flexDirection: "row",
                        marginTop: 25,
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
                        fontSize={moderateScale(15)}
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
                        fontSize={moderateScale(15)}
                        title={"To"}
                      />

                      <CustomText
                        style={{ flexWrap: "wrap", width: "70%" }}
                        title={"" + item.endLocation || "N/A"}
                        fontSize={moderateScale(15)}
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
                        style={{
                          width: 20,
                          height: 20,
                          marginRight: 5,
                          tintColor: AppColor.PRIMARY,
                        }}
                      />

                      <CustomText
                        style={{ width: "22%" }}
                        fontSize={moderateScale(15)}
                        title={"Distance"}
                      />
                      <CustomText
                        title={item.totalDistance + " Kms"}
                        fontSize={moderateScale(15)}
                      />
                    </View>

                       <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 10,
                    }}
                  >
                    

                      <Ionicons
                                style={{ marginRight: 10 }}
                                name="calendar-outline"
                                size={20}
                                color={AppColor.PRIMARY}
                              />
                    <CustomText
                      style={{ width: "22%" }}
                      fontSize={moderateScale(15)}
                      title={"Date"}
                    />

                    <CustomText
                      title={
                        "" + item?.date
                          ? moment(item?.date).format(DateFormat.DD_MM_YYYY)
                          : "N/A"
                      }
                      fontSize={moderateScale(15)}
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
                        style={{
                          width: 20,
                          height: 20,
                          marginRight: 5,
                          tintColor: AppColor.PRIMARY,
                        }}
                      />

                      <CustomText
                        style={{ width: "22%" }}
                        fontSize={moderateScale(15)}
                        title={"Amount"}
                        fontFamily={AppFonts.Medium}
                      />

                      <CustomText
                        title={"$" + item.amount || "N/A"}
                        fontSize={moderateScale(18)}
                        fontFamily={AppFonts.Medium}
                        color={AppColor.PRIMARY}
                      />
                    </View>
                  </View>

                  {item.status == AppText.Pending && (
                    <StatusButton
                      status={AppText.Pending}
                      color={AppColor.PENDING}
                    />
                  )}

                  {item.status == AppText.Approved && (
                    <StatusButton
                      status={AppText.Approved}
                      color={AppColor.APPROVE}
                    />
                  )}

                  {item.status == AppText.Rejected && (
                    <StatusButton
                      status={AppText.Rejected}
                      color={AppColor.REJECT_50}
                    />
                  )}

                  {item.status == AppText.Pending && IsBoss && (
                    <>
                      <Divider style={{ marginTop: 10 }} />
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginTop: 10,
                        }}
                      >
                        {item.amount > 0 ? (
                          <View style={{ width: "48%" }}>
                            <CustomButton
                              textStyle={{
                                fontSize: moderateScale(11),
                                color: AppColor.APPROVE,
                              }}
                              title={"Approve"}
                              buttonStyle={{
                                backgroundColor: AppColor.WHITE,
                                paddingVertical: 7,
                                borderColor: AppColor.APPROVE,
                                borderWidth: 1,
                              }}
                              onPress={() => {
                                callToApprove(item.id, expenseType.mileage);
                              }}
                            />
                          </View>
                        ) : null}

                        <View
                          style={{ width: item.amount > 0 ? "48%" : "99%" }}
                        >
                          <CustomButton
                            textStyle={{
                              fontSize: moderateScale(11),
                              color: AppColor.REJECT,
                            }}
                            title={"Reject"}
                            buttonStyle={{
                              backgroundColor: AppColor.WHITE,
                              paddingVertical: 7,
                              borderColor: AppColor.REJECT,
                              borderWidth: 1,
                            }}
                            onPress={() => {
                              callToReject(item.id, expenseType.mileage);
                            }}
                          />
                        </View>
                      </View>
                    </>
                  )}
                </Card>
              ))}
            </Card>
          )}

          <Card
            style={{
              marginTop: 50,
              backgroundColor: AppColor.WHITE,
              padding: 10,
              marginHorizontal: 1,
            }}
          >
            {MileageList?.length > 0 ? (
              <>
                <View style={{}}>
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 10,
                      gap: 15,
                    }}
                  >
                    <CustomText
                      title={"Action On Mileage : "}
                      fontSize={moderateScale(15)}
                      fontFamily={AppFonts.Medium}
                      color={AppColor.PRIMARY}
                    />

                    {ExpenseDetail?.mileageStatus !== AppText.Pending ? (
                      <CustomText
                        title={ExpenseDetail?.mileageStatus}
                        fontSize={moderateScale(15)}
                        fontFamily={AppFonts.Medium}
                        color={
                          ExpenseDetail?.mileageStatus == AppText.Approved
                            ? AppColor.APPROVE
                            : ExpenseDetail?.mileageStatus == AppText.Rejected
                            ? AppColor.REJECT
                            : AppColor.PENDING
                        }
                      />
                    ) : null}
                  </View>

                  {ExpenseDetail?.mileageStatus == AppText.Pending &&
                    IsBoss && (
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginTop: 10,
                          width: "100%",
                        }}
                      >
                        {showApprove && (
                          <View style={{ width: showReject ? "45%" : "99%" }}>
                            <CustomButton
                              textStyle={{ fontSize: moderateScale(11) }}
                              title={"Approve"}
                              buttonStyle={{
                                backgroundColor: AppColor.APPROVE,
                                paddingVertical: 7,
                              }}
                              onPress={() => {
                                callToAllApprove(
                                  ExpenseDetail.id,
                                  expenseType.mileage
                                );
                              }}
                            />
                          </View>
                        )}

                        {showReject && (
                          <View style={{ width: showApprove ? "45%" : "99%" }}>
                            <CustomButton
                              textStyle={{ fontSize: moderateScale(11) }}
                              title={"Reject"}
                              buttonStyle={{
                                backgroundColor: AppColor.REJECT_50,
                                paddingVertical: 7,
                              }}
                              onPress={() => {
                                callToAllReject(
                                  ExpenseDetail.id,
                                  expenseType.mileage
                                );
                              }}
                            />
                          </View>
                        )}
                      </View>
                    )}
                </View>

                <Divider style={{ marginTop: 10 }} />
              </>
            ) : null}

            <View>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 10,
                  gap: 15,
                }}
              >
                <CustomText
                  title={"Action on Expense : "}
                  fontSize={moderateScale(15)}
                  fontFamily={AppFonts.Medium}
                  color={AppColor.PRIMARY}
                />

                {ExpenseDetail?.expenseStatus !== AppText.Pending ? (
                  <CustomText
                    title={ExpenseDetail?.expenseStatus}
                    fontSize={moderateScale(15)}
                    fontFamily={AppFonts.Medium}
                    color={
                      ExpenseDetail?.expenseStatus == AppText.Approved
                        ? AppColor.APPROVE
                        : ExpenseDetail?.expenseStatus == AppText.Rejected
                        ? AppColor.REJECT
                        : AppColor.PENDING
                    }
                  />
                ) : null}
              </View>
              {ExpenseDetail?.expenseStatus === AppText.Pending && IsBoss && (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 10,
                    width: "100%",
                  }}
                >
                  {showExpenseApprove && (
                    <View style={{ width: showExpenseReject ? "45%" : "99%" }}>
                      <CustomButton
                        textStyle={{ fontSize: moderateScale(11) }}
                        title={"Approve"}
                        buttonStyle={{
                          backgroundColor: AppColor.APPROVE,
                          paddingVertical: 7,
                        }}
                        onPress={() => {
                          callToAllApprove(
                            ExpenseDetail.id,
                            expenseType.expense
                          );
                        }}
                      />
                    </View>
                  )}

                  {showExpenseReject && (
                    <View style={{ width: showExpenseApprove ? "45%" : "99%" }}>
                      <CustomButton
                        textStyle={{ fontSize: moderateScale(11) }}
                        title={"Reject"}
                        buttonStyle={{
                          backgroundColor: AppColor.REJECT_50,
                          paddingVertical: 7,
                        }}
                        onPress={() => {
                          callToAllReject(
                            ExpenseDetail.id,
                            expenseType.expense
                          );
                        }}
                      />
                    </View>
                  )}
                </View>
              )}
            </View>
          </Card>

          {popupVisible && <ConfirmationPopup />}
        </ScrollViewWrapper>
      </SafeAreaWrapper>
      {loading && <LoaderModal visible={loading} />}
    </>
  );
};

export default ExpenseDetailScreen;

const styles = StyleSheet.create({});
