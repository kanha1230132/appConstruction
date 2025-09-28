import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { use, useEffect, useState } from "react";
import { SafeAreaWrapper } from "../../../../components/SafeAreaWrapper/SafeAreaWrapper";
import HeaderWithBackButton from "../../../../components/Button/HeaderWithBackButton";
import { goBack, resetAndNavigate } from "../../../../utils/NavigationUtil";
import ScrollViewWrapper from "../../../../components/ScrollViewWrapper/ScrollViewWrapper";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { Card } from "react-native-paper";
import { AppColor } from "../../../../themes/AppColor";
import { AppFonts } from "../../../../themes/AppFonts";
import { moderateScale } from "react-native-size-matters";
import TaskDescription from "../../../jobHazard/components/TaskDescription";
import CustomText from "../../../../components/CustomText/CustomText";
import RestClient from "../../../../api/restClient";
import useToastHook from "../../../../hooks/toast";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { CompanyLogoResponse } from "../../../../api/apiInterface";
import Ionicons from "react-native-vector-icons/Ionicons";
import LogoSelectionModal from "../../components/LogoSelectionModal";
import FastImage from "react-native-fast-image";
import { images } from "../../../../assets";
import CustomButton from "../../../../components/Button/CustomButton";
import { createDailyDairyPdf } from "../../helper/util";
import { screenNames } from "../../../../navigation/ScreenNames";
import LoaderModal from "../../../../components/Loader/Loader";
import { ImageItem } from "../../../photoFiles/PhotoFilesScreen";
import SelectCard from "../../../../components/SelectCard";
import { useConfirmationPopup } from "../../../../components/Popup/confirmationPopup";
import { logoutUser } from "../../../../store/slice/UserSlice";
import { updateDailyDairyReports } from "../../../../store/slice/Reports";
import ImageCardWithIcon from "../../components/ImageCardWithIcon";
import useCreateInvoice from "../../../invoice/hooks/createInvoice.hook";
import moment from "moment";
import { DailyDairyPreviewScreenProps } from "../../../../types/navigation";


const DailyDairyPreviewScreen: React.FC<DailyDairyPreviewScreenProps> = ({route}) => {
  const { DailyDairyReports } = useSelector(
    (state: RootState) => state.Reports
  );
  const [Logos, setLogos] = useState<CompanyLogoResponse[]>([]);
  const [Loading, setLoading] = useState(false);
  const { showToast } = useToastHook();
  const isFocused = useIsFocused();
  const [SelectedLogo, setSelectedLogo] = useState<CompanyLogoResponse[]>([]);
  const [IsSubmit, setIsSubmit] = useState(route.params?.isSubmit || false);
  const [ShowLogoSelectionModal, setShowLogoSelectionModal] = useState(false);
  const { showConfirmationPopup, ConfirmationPopup, popupVisible } =
    useConfirmationPopup();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { calculateTotalHours } = useCreateInvoice();
  const { UserName } = useSelector((state: RootState) => state.User);
  
  useEffect(() => {
      getLogos();
  }, []);

useEffect(() => {
  if (
    DailyDairyReports?.selectedLogo &&
    JSON.stringify(DailyDairyReports.selectedLogo) !== JSON.stringify(SelectedLogo)
  ) {
    setSelectedLogo(DailyDairyReports.selectedLogo);
  }
}, [DailyDairyReports, isFocused]);

// Only dispatch when SelectedLogo changes due to a user action
const handleLogoChange = (newLogos: CompanyLogoResponse[]) => {
  setSelectedLogo(newLogos);
  dispatch(
    updateDailyDairyReports({
      ...DailyDairyReports,
      selectedLogo: newLogos,
    })
  );
};

  const getLogos = async () => {
    try {
      const restClient = new RestClient();
      const response = await restClient.getLogo();
      if (response && typeof response != "string") {
        setLogos(response);
      }
    } catch (error) {
      console.log("Error getLogos : ", error);
    }
  };

  const callToNavigateReportScreen = () => {
    dispatch(updateDailyDairyReports(undefined));
    // navigation.reset({
    //   index: 0,
    //   routes: [
    //     {
    //       name: screenNames.HomeTabs,
    //       state: {
    //         routes: [{ name: screenNames.ReportScreen }],
    //       },
    //     },
    //   ],
    // });
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
                      routes: [{ name: screenNames.ReportScreen }],
                      index: 0,
                    },
                  },
                ],
              },
            },
          ],
        });
  };
  const callToSubmitDailyDiary = async () => {
    try {
      let totalHours = calculateTotalHours(
        DailyDairyReports?.timeIn,
        DailyDairyReports?.timeOut
      );
        const selectedLogos:string[] = [];
      SelectedLogo?.map((item) => {
        selectedLogos.push(item.id);
      });
            const fileName = `${UserName.replaceAll(" ", "_")}_${moment(
                    DailyDairyReports?.selectedDate
                  ).format("DD-MM-YYYY")}_Daily_Diary_Report`;
      const body = {
        schedule_id: DailyDairyReports?.schedule.id.toString(),
        selectedDate: DailyDairyReports?.selectedDate,
        description: DailyDairyReports?.Description,
        // owner: DailyDairyReports?.Owner,
        contractor: DailyDairyReports?.Contractor,
        ownerContact: DailyDairyReports?.OwnerContact,
        contractNumber: DailyDairyReports?.ContractNumber,
        ownerProjectManager: DailyDairyReports?.OwnerProjectManager,
        reportNumber: DailyDairyReports?.ReportNumber,
        IsChargable: DailyDairyReports?.IsChargable,
        siteInspector: DailyDairyReports?.siteInspector,
        timeIn: DailyDairyReports?.timeIn,
        timeOut: DailyDairyReports?.timeOut,
        totalHours: totalHours,
        logo : selectedLogos,
        signature: DailyDairyReports?.signature || '',
          pdfName: fileName
      };

      // ✅ Validation check
const hasEmpty = Object.values(body).some(
  (val) =>
    val === null ||
    val === undefined ||
    (typeof val === "string" && val.trim() === "") 
);

if (hasEmpty) {
  showToast("Needs to fill empty input fields", "warning"); // or Snackbar/Toast
  return;
} 
      setLoading(true);


      const restClient = new RestClient();
      const response = await restClient.createDailyDairyReport(body);
      if (response == 401) {
        const result = await showConfirmationPopup(
          "Token Expired",
          "Please login again",
          "Ok",
          ""
        );
        if (!result) {
          return;
        }
        dispatch(logoutUser());
        resetAndNavigate(screenNames.LoginScreen);
      } else if (response && typeof response != "string") {
        setIsSubmit(true);
        showToast(response.message || "Submitted Successfully", "success");
      } else {
        showToast(response || "Something went wrong", "danger");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      showToast("Something went wrong", "danger");
    } finally {
      setLoading(false);
    }
  };

  const createDairyPdf = async () => {
    try {
      let reports = { ...DailyDairyReports };
      reports.selectedLogo = SelectedLogo;
      setLoading(true);
      const response = await createDailyDairyPdf(reports);
      setLoading(false);
    } catch (error) {
      console.log("Error : ", error);
      showToast("Something went wrong", "danger");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveLogo = (item: CompanyLogoResponse) => {
    const filterLogo = SelectedLogo?.filter((logo) => logo.id !== item.id);
    setSelectedLogo(filterLogo);
    dispatch(
      updateDailyDairyReports({
        ...DailyDairyReports,
        selectedLogo: filterLogo,
      })
    );
  };

  return (
    <>
      <SafeAreaWrapper>
        <HeaderWithBackButton
          title={"Daily Diary Preview"}
          onBackClick={() => {
           ( IsSubmit 
            && !route.params?.isSubmit) ? callToNavigateReportScreen() : goBack();
          }}
          customStyle={undefined}
        />
        <ScrollViewWrapper>
          <View style={styles.container}>
            {/* Project Details */}
            <Card style={styles.section}>
              <CustomText
                color={AppColor.BLACK}
                fontSize={moderateScale(16)}
                fontFamily={AppFonts.Bold}
                title={"Project Details"}
              />
              {[
                {
                  label: "Date",
                  value: DailyDairyReports?.selectedDate || "N/A",
                },
                {
                  label: "Project No./Client PO",
                  value: DailyDairyReports?.ProjectNumber || "N/A",
                },
                {
                  label: "Project Name",
                  value: DailyDairyReports?.ProjectName || "N/A",
                },
                { label: "Owner", value: DailyDairyReports?.Owner || "N/A" },
                {
                  label: "Contract Number",
                  value: DailyDairyReports?.ContractNumber || "N/A",
                },
                {
                  label: "Contractor",
                  value: DailyDairyReports?.Contractor || "N/A",
                },
                {
                  label: "Site Inspector",
                  value: DailyDairyReports?.siteInspector || "N/A",
                },
                {
                  label: "Inspector Time In",
                  value: DailyDairyReports?.timeIn || "N/A",
                },
                {
                  label: "Inspector Time Out",
                  value: DailyDairyReports?.timeOut || "N/A",
                },
                {
                  label: "Report Number",
                  value: DailyDairyReports?.ReportNumber || "N/A",
                },
                {
                  label: "Owner Contact",
                  value: DailyDairyReports?.OwnerContact || "N/A",
                },
                {
                  label: "Owner Project Manager",
                  value: DailyDairyReports?.OwnerProjectManager || "N/A",
                },
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

            {/* Logo */}
            <SelectCard
              title="Choose Logo"
              onPress={() => {!IsSubmit && setShowLogoSelectionModal(true)}}
              selectedLogo={SelectedLogo}
              onRemove={(item) => handleRemoveLogo(item)}
              isShowDeleteIcon={!IsSubmit}
            />

            <Card style={styles.section}>
              <CustomText
                color={AppColor.BLACK}
                fontSize={moderateScale(16)}
                fontFamily={AppFonts.Bold}
                title={"Description"}
              />
              <CustomText
                title={
                  DailyDairyReports?.Description || "No description provided."
                }
              />
            </Card>

            {/* Signature */}
            {DailyDairyReports?.signature ? (
              <ImageCardWithIcon
                title="Signature"
                iconName="draw"
                imageUrl={DailyDairyReports?.signature}
              />
            ) : null}
          </View>

          <LogoSelectionModal
            disable={route.params?.isSubmit || false}
            visible={ShowLogoSelectionModal}
            onDismiss={() => setShowLogoSelectionModal(false)}
            companies={Logos}
            onSelect={(text) => {
              handleLogoChange(text);
              setShowLogoSelectionModal(false);
            }}
            preSelectedLogos={SelectedLogo}
          />

          {popupVisible && <ConfirmationPopup />}
        </ScrollViewWrapper>
      </SafeAreaWrapper>

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
                onPress={() => {
                  createDairyPdf();
                }}
              >
                <FastImage
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
                  callToSubmitDailyDiary();
                }}
              />
            </View>
          </>
        )}
      </View>
      {Loading ? <LoaderModal visible={Loading} /> : null}
    </>
  );
};

export default DailyDairyPreviewScreen;

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
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: moderateScale(18),
    fontFamily: AppFonts.Bold,
    marginBottom: 5,
    color: AppColor.PRIMARY,
  },
  logo: {
    width: 40,
    height: 40,
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
