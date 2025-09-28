import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { PreviewJobHazardProps } from "../../../../types/navigation";
import { SafeAreaWrapper } from "../../../../components/SafeAreaWrapper/SafeAreaWrapper";
import HeaderWithBackButton from "../../../../components/Button/HeaderWithBackButton";
import {
  goBack,
  navigate,
  push,
  resetAndNavigate,
} from "../../../../utils/NavigationUtil";
import { AppColor } from "../../../../themes/AppColor";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { images } from "../../../../assets";
import TaskDescription from "../../components/TaskDescription";
import { AppFonts } from "../../../../themes/AppFonts";
import { JobHazardRequest } from "../../../../api/apiInterface";
import { Card } from "react-native-paper";
import { moderateScale, s } from "react-native-size-matters";
import ScrollViewWrapper from "../../../../components/ScrollViewWrapper/ScrollViewWrapper";
import CustomButton from "../../../../components/Button/CustomButton";
import LoaderModal from "../../../../components/Loader/Loader";
import { createJHAHarardPdf } from "../../helper/jobUtil";
import useToastHook from "../../../../hooks/toast";
import RestClient from "../../../../api/restClient";
import CustomText from "../../../../components/CustomText/CustomText";
import { screenNames } from "../../../../navigation/ScreenNames";

const PreviewJobHazard: React.FC<PreviewJobHazardProps> = () => {
  const { JobHazard } = useSelector((state: RootState) => state.User);
  const [JobHazardList, setJobHazardList] = useState<JobHazardRequest>();
  const [IsLoading, setIsLoading] = useState(false);
  const [IsSubmit, setIsSubmit] = useState(false);
  const [OtherText, setOtherText] = useState();

  const { showToast } = useToastHook();
  useEffect(() => {
    if (JobHazard) {
      setIsLoading(false);
      setJobHazardList(JobHazard);
      if (JobHazard?.OtherTextHazards?.length > 0) {
        const result = JobHazard?.OtherTextHazards?.reduce((acc, item) => {
          acc[`"${item.activityName}"`] = item.value;
          return acc;
        }, {});
        if (result) {
          setOtherText(result);
        }
      }
    }
  }, [JobHazard]);

  const createJobHazardPdf = async () => {
    try {
      setIsLoading(true);
      if (JobHazardList) {
        await createJHAHarardPdf(JobHazardList);
        resetAndNavigate(screenNames.MainApp);
      } 
    } catch (error) {
      console.log("Error : <LoaderModal visible={IsLoading} /> ", error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const callToUploadJobHazard = async () => {
    try {
      let tempJobHazard = { ...JobHazardList };
      const tempStaffActivity = tempJobHazard?.selectedActivities
        ?.map((item) => (item.activities.length > 0 ? item : null))
        .filter((item) => item !== null);
      tempJobHazard.selectedActivities = tempStaffActivity;
      setIsLoading(true);
      const restClient = new RestClient();
      const data = { ...tempJobHazard, signature: "", time: "11:20:00" };
      console.log("data : ", JSON.stringify(data));
      const response = await restClient.addJobHazard(data);
      if (response && typeof response != "string") {
        showToast("Job Hazard Added Successfully", "success");
        setIsSubmit(true);
      } else {
        showToast(response || "Something went wrong", "danger");
      }
    } catch (error) {
      console.log("Error callToUploadJobHazard : ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SafeAreaWrapper>
        <HeaderWithBackButton
          title={"Add JHA"}
          onBackClick={() => {
            if (IsSubmit) {
              navigate(screenNames.JobHazardScreen);
            } else {
              goBack();
            }
          }}
        />
        <ScrollViewWrapper>
          <View style={styles.container}>
            {/* Project Details */}
            <Card style={styles.section}>
              <Text style={styles.sectionTitle}>JHA Details</Text>
              {[
                { label: "Date", value: JobHazardList?.selectedDate || "N/A" },
                { label: "Time", value: JobHazardList?.time || "N/A" },
                {
                  label: "Project Location",
                  value: JobHazardList?.location || "N/A",
                },
                {
                  label: "Project Name",
                  value: JobHazardList?.projectName || "N/A",
                },
                {
                  label: "Have you completed site orientation?",
                  value: JobHazardList?.siteOrientationChecked,
                },
                {
                  label: "Have you completed tool box meeting?",
                  value: JobHazardList?.toolBoxMeetingChecked,
                },
                { label: "Worker Name ", value: JobHazardList?.WorkerName },
              ].map((item, index) => (
                <View
                  style={{
                    marginTop: 6,
                  }}
                >
                  <TaskDescription
                    firstWidth="45%"
                    secondWidth="55%"
                    text={item?.value}
                    label={item?.label}
                  />
                </View>
              ))}
            </Card>

            <View style={{ marginVertical: 10 }} />

            <Card style={styles.section}>
              <Text style={styles.sectionTitle}>Hazard Selection</Text>
              {JobHazardList?.selectedActivities?.map((item, index) => {
                if (item?.activities?.length == 0) {
                  return <></>;
                }

                return (
                  <View
                    style={{
                      marginTop: 6,
                    }}
                  >
                    <CustomText
                      title={`${item.activityName}`}
                      fontFamily={AppFonts.Medium}
                      fontSize={moderateScale(15)}
                    />
                    {item?.activities?.map((item1, index) =>
                      item1 == "Other" ? (
                        <CustomText
                          title={`- ${item1} : ${
                            OtherText?.[`"${item.activityName}"`]
                          }`}
                          fontFamily={AppFonts.Regular}
                          fontSize={moderateScale(14)}
                        />
                      ) : (
                        <CustomText
                          title={`- ${item1}`}
                          fontFamily={AppFonts.Regular}
                          fontSize={moderateScale(14)}
                        />
                      )
                    )}
                  </View>
                );
              })}
            </Card>

            <View style={{ marginVertical: 10 }} />

            {/* Task Details */}
            <Card style={styles.section}>
              <Text style={styles.sectionTitle}>Tasks</Text>
              {JobHazardList?.tasks?.map((item, index) => (
                <View
                  style={{
                    backgroundColor: AppColor.WHITE,
                    borderRadius: 5,
                  }}
                >
                  <Text
                    style={[
                      styles.boldText,
                      {
                        marginBottom: 5,
                        fontFamily: AppFonts.Bold,
                        fontSize: 16,
                      },
                    ]}
                  >
                    {item.task}
                  </Text>
                  <TaskDescription
                    text={item.severity || "N/A"}
                    label={"Severity"}
                  />
                  <TaskDescription
                    text={item.hazard || "N/A"}
                    label={"Hazard"}
                  />
                  <TaskDescription
                    text={item.controlPlan || "N/A"}
                    label={"ControlPlan"}
                  />
                </View>
              ))}
            </Card>

            <View style={{ marginVertical: 10 }} />

            <Card style={styles.section}>
              <Text style={styles.sectionTitle}>Description</Text>
              <Text style={styles.detailText}>
                {JobHazardList?.description || "No description provided."}
              </Text>
            </Card>

            <View style={{ marginVertical: 10 }} />

            {JobHazardList?.signature ? (
              <Card style={styles.section}>
                <Text style={styles.sectionTitle}>Signature</Text>
                <View style={{ padding: 10 }}>
                  <Image
                    source={{ uri: JobHazardList?.signature }}
                    style={{
                      width: 100,
                      height: 100,
                      borderWidth: 0.5,
                      borderColor: AppColor.BLACK_40,
                    }}
                  />
                </View>
              </Card>
            ) : null}
          </View>
          <View style={{ height: 50 }} />
        </ScrollViewWrapper>
      </SafeAreaWrapper>

      {IsLoading ? <LoaderModal visible={IsLoading} /> : null}

      <View style={[styles.buttonContainer, { gap: 10 }]}>
        {IsSubmit ? (
          <>
            <View style={{ flex: 1, height: 50 }}>
              <TouchableOpacity
                style={{
                  width: "100%",
                  height: 50,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 6,
                  flexDirection: "row",
                  gap: 10,
                  borderWidth: 1,
                  backgroundColor: AppColor.PRIMARY,
                  borderColor: AppColor.WHITE,
                }}
                onPress={() => createJobHazardPdf()}
              >
                <Image
                  source={images.PDF_ICON}
                  style={{ width: 25, height: 25 }}
                />
                <CustomText title={"Share Pdf"} color={AppColor.WHITE} />
              </TouchableOpacity>
            </View>
          </>
        ) : (
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
                  callToUploadJobHazard();
                }}
              />
            </View>
          </>
        )}
      </View>
    </>
  );
};

export default PreviewJobHazard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColor.WHITE,
  },
  section: {
    padding: 10,
    backgroundColor: AppColor.WHITE,
    borderRadius: 8,
    marginHorizontal: 1,
  },
  sectionTitle: {
    fontSize: moderateScale(18),
    fontFamily: AppFonts.Bold,
    marginBottom: 5,
    color: AppColor.PRIMARY,
  },
  boldText: { fontFamily: AppFonts.Medium },
  detailText: {
    fontSize: moderateScale(14),
    fontFamily: AppFonts.Regular,
    marginBottom: 5,
    color: AppColor.BLACK_80,
    lineHeight: 20,
  },
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
});
