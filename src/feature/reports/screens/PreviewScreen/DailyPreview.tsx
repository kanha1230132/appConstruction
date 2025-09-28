import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { SafeAreaWrapper } from "../../../../components/SafeAreaWrapper/SafeAreaWrapper";
import HeaderWithBackButton from "../../../../components/Button/HeaderWithBackButton";
import ScrollViewWrapper from "../../../../components/ScrollViewWrapper/ScrollViewWrapper";
import { goBack, navigate, resetAndNavigate } from "../../../../utils/NavigationUtil";
import { AppColor } from "../../../../themes/AppColor";
import TaskDescription from "../../../jobHazard/components/TaskDescription";
import { Card, Divider, Icon } from "react-native-paper";
import CustomText from "../../../../components/CustomText/CustomText";
import { moderateScale } from "react-native-size-matters";
import { AppFonts } from "../../../../themes/AppFonts";
import moment from "moment";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import useGlobal from "../../../../hooks/global";
import LogoSelectionModal from "../../components/LogoSelectionModal";
import SelectCard from "../../../../components/SelectCard";
import ImageCardWithIcon from "../../components/ImageCardWithIcon";
import FastImage from "react-native-fast-image";
import { images } from "../../../../assets";
import CustomButton from "../../../../components/Button/CustomButton";
import RestClient from "../../../../api/restClient";
import useToastHook from "../../../../hooks/toast";
import LoaderModal from "../../../../components/Loader/Loader";
import { screenNames } from "../../../../navigation/ScreenNames";
import { ImageItem } from "../../../photoFiles/PhotoFilesScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  updateDailyImages,
  updateDailyReports,
} from "../../../../store/slice/Reports";
import { reportTypeFrom } from "../../helper/reportsType";
import { createDailyPdf } from "../../helper/util";
import PhotoFileImport from "../../components/PhotoFileImport";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { CompanyLogoResponse } from "../../../../api/apiInterface";
import { useConfirmationPopup } from "../../../../components/Popup/confirmationPopup";
import { logoutUser } from "../../../../store/slice/UserSlice";
import { Image } from "react-native";
import useCreateInvoice from "../../../invoice/hooks/createInvoice.hook";
import { DailyPreviewScreenProps } from "../../../../types/navigation";


const DailyPreviewScreen: React.FC<DailyPreviewScreenProps> = ({route}) => {
  const { DailyReports } = useSelector((state: RootState) => state.Reports);
  const { UserName } = useSelector((state: RootState) => state.User);

  const {
    Logos,
    getLogos,
    SelectedLogo,
    setSelectedLogo,
    IsSubmit,
    setIsSubmit,
    ShowLogoSelectionModal,
    setShowLogoSelectionModal,
  } = useGlobal();
  const {calculateTotalHours} = useCreateInvoice()
  const [Loading, setLoading] = useState(false);
  const { showToast } = useToastHook();
  const [SelectedPhotos, setSelectedPhotos] = useState<ImageItem[]>([]);
  const dispatch = useDispatch();
  const navigation = useNavigation();

   const { showConfirmationPopup, ConfirmationPopup, popupVisible } =
      useConfirmationPopup();
      const isFocused = useIsFocused()
    useEffect(() => {
      getLogos();
    }, []);


  useEffect(() => {
    if (DailyReports) {
      if (DailyReports.Images) {
        setSelectedPhotos(DailyReports.Images);
      }
      if(DailyReports.selectedLogo){
        setSelectedLogo(DailyReports.selectedLogo)
      }
    }
    setIsSubmit(route?.params?.isSubmit || false )
  }, [DailyReports,isFocused]);

  useEffect(() => {
      dispatch(updateDailyReports({
        ...DailyReports,
        selectedLogo: SelectedLogo,
      }));
  },[SelectedLogo])

  const createPdf = async () => {
    try {
      setLoading(true);
      await createDailyPdf({ ...DailyReports, selectedLogo: SelectedLogo });
      setLoading(false);
      
    } catch (error) {
      setLoading(false);
      
    }finally{
      setLoading(false);

    }
    // callToNavigateReportScreen();
  };

  const callToNavigateReportScreen = () => {
    dispatch(updateDailyReports(undefined));
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

    const handleRemoveLogo = (item: CompanyLogoResponse) => {
      const filterLogo = SelectedLogo?.filter((logo) => logo.id !== item.id);
      setSelectedLogo(filterLogo);
     dispatch(updateDailyReports({
        ...DailyReports,
        selectedLogo: filterLogo,
      }));
    };

  const callToSubmitDaily = async () => {
    try {

      const images = [];
      // const imageWithComment = [];
      
      SelectedPhotos.map((item) => {
        // images.push(item._id);
        images.push({
          id: item._id,
          comment: item.description
        })
      });

      const selectedLogos:string[] = [];
      SelectedLogo?.map((item) => {
        selectedLogos.push(item.id);
      });
      const fileName = `${UserName.replaceAll(" ", "_")}_${moment(
              DailyReports?.selectedDate
            ).format("DD-MM-YYYY")}_Daily_Report`;



      let totalHours = calculateTotalHours(DailyReports?.timeIn, DailyReports?.timeOut)

      const body = {
        schedule_id: DailyReports?.schedule?.id || 0,
        ownerProjectManager: DailyReports?.OwnerProjectManager,
        ownerContact: DailyReports?.OwnerContact,
        selectedDate: DailyReports?.selectedDate,
        location: DailyReports?.Location,
        onShore: DailyReports?.onShore,
        tempHigh: DailyReports?.HighTemp,
        tempLow: DailyReports?.LowTemp,
        weather: DailyReports?.Weather,
        workingDay: DailyReports?.WorkingDay,
        reportNumber: DailyReports?.ReportNumber,
        contractNumber: DailyReports?.ContractNumber,
        contractor: DailyReports?.Contractor,
        siteInspector: DailyReports?.siteInspector,
        timeIn: DailyReports?.timeIn,
        timeOut: DailyReports?.timeOut,
        component: DailyReports?.component,
        equipments: DailyReports?.Equipments,
        labours: DailyReports?.Labour,
        visitors: DailyReports?.Visitors,
        description: DailyReports?.Description,
        photoFiles: images,
        "totalHours": totalHours,
        logo : selectedLogos,
        signature: DailyReports?.signature || '',
        pdfName: fileName,
        declerationFrom: DailyReports?.DeclerationFrom.declrationForm,

      };

            // ✅ Validation check
        const hasEmpty = Object.values(body).some(
          (val) =>
            val === null ||
            val === undefined ||
            (typeof val === "string" && val.trim() === "")
        );

        let isError = false;
        if(DailyReports?.Equipments && DailyReports?.Equipments.length > 0){
          DailyReports?.Equipments.map((item) => {
            if(!item.totalHours){
           isError = true;
              showToast("Total hours is required for equipment", "warning");

                return;
            }
          })
        }

        if(DailyReports?.Labour && DailyReports?.Labour.length > 0){
          DailyReports?.Labour.map((item) => {
            item.roles.map((role) => {
              if(!role.totalHours){
                isError = true;
              showToast("Total hours is required for labour", "warning");

                return;

              }
            })
          })
        }

        if(DailyReports?.Visitors && DailyReports?.Visitors.length > 0){
          DailyReports?.Visitors.map((item) => {
            if(!item.totalHours){
             isError = true

              showToast("Total hours is required for visitor", "warning");
                return;

            }
          })
        }

        if(isError){
          return;
        }



        if (hasEmpty) {
          showToast("Needs to fill empty input fields", "warning");
          return;
          // alert("Needs to fill empty input fields"); // or Snackbar/Toast
        } else {
          // proceed with API call
          console.log("All fields valid ✅", body);
        }
      setLoading(true);


      const restClient = new RestClient();
      const response = await restClient.createDailyReport(body);
       if(response == 401){
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
            }else if (response && typeof response != "string") {
        setIsSubmit(true);
        showToast(response.message || "Submitted Successfully", "success");
      } else {
        showToast(
          response || "Something went wrong please try again",
          "danger"
        );
      }
    } catch (error) {
      console.log("Error createDailyPdf : ", error);
      setIsSubmit(false);
      setLoading(false);
      showToast("Something went wrong please try again", "danger");
    } finally {
      setLoading(false);
    }
  };

  const selectHandleImage = (item: ImageItem) => {
    navigate(screenNames.ImageViewer, { image: item.uri });
  };

  const deleteImage = (index: number) => {
    const _photos = [...SelectedPhotos];
    _photos.splice(index, 1);
    setSelectedPhotos(_photos);
    dispatch(updateDailyImages(_photos));
  };

  return (
    <>
      <SafeAreaWrapper>
        <HeaderWithBackButton
          title={"Daily Entry Preview"}
          onBackClick={() => {
            (IsSubmit && !route?.params?.isSubmit) ? callToNavigateReportScreen() : goBack();
          }}
          customStyle={undefined}
        />
        <ScrollViewWrapper>
          <View style={styles.container}>
            {/* Photo files */}
            {
              !IsSubmit ? (
                <PhotoFileImport
              onPress={() => {
                navigate(screenNames.ImageSelectionScreen, {
                  project: DailyReports?.schedule,
                  FromScreen: reportTypeFrom.daily,
                });
              }}
            />
              ):null
            }
            

            {SelectedPhotos && SelectedPhotos.length > 0 && (
              <Card style={styles.section}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 10,
                  }}
                >
                  <MaterialIcons
                    name={"photo"}
                    size={24}
                    color={AppColor.PRIMARY}
                  />
                  <CustomText
                    color={AppColor.BLACK}
                    fontSize={moderateScale(16)}
                    fontFamily={AppFonts.Bold}
                    title={"Photo Files"}
                  />
                </View>
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    // justifyContent: "space-between",
                  }}
                >
                  {SelectedPhotos.map((image, innerindex) => {
                    return (
                      <Card
                        style={{
                          width: "30%",
                          height: 100,
                          marginTop: 10,
                          borderRadius: 6,
                          margin: "1.5%",
                          backgroundColor: AppColor.WHITE,
                        }}
                        key={innerindex + Math.random().toString()}
                        onPress={() => {
                          selectHandleImage(image);
                        }}
                      >
                        <View style={styles.imageContainer}>
                          <Image
                            style={styles.photo}
                            source={{
                              uri: image.uri,
                            }}
                          />
                        </View>

{
  !IsSubmit ?

   <TouchableOpacity
                          onPress={() => {
                            deleteImage(innerindex);
                          }}
                          style={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            zIndex: 1,
                          }}
                        >
                          <Ionicons
                            name="close"
                            size={25}
                            color={AppColor.REJECT}
                          />
                        </TouchableOpacity>

  : null
}
                     
                      </Card>
                    );
                  })}
                </View>
              </Card>
            )}

            {/* Project Details */}
            <Card style={styles.section}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 10,
                }}
              >
                <MaterialIcons
                  name={"business"}
                  size={24}
                  color={AppColor.PRIMARY}
                />
                <CustomText
                  color={AppColor.BLACK}
                  fontSize={moderateScale(16)}
                  fontFamily={AppFonts.Bold}
                  title={"Project Details"}
                />
              </View>

              {[
                {
                  label: "Date",
                  value:
                    moment(DailyReports?.selectedDate).format("YYYY-MM-DD") ||
                    "N/A",
                },
                { label: "Location", value: DailyReports?.Location || "N/A" },
                {
                  label: "OnShore/Off Shore",
                  value: DailyReports?.onShore || "N/A",
                },
                { label: "Temp High", value: DailyReports?.HighTemp || "N/A" },
                { label: "Temp Low", value: DailyReports?.LowTemp || "N/A" },
                {
                  label: "Weather Condition",
                  value: DailyReports?.Weather || "N/A",
                },
                {
                  label: "Working Day",
                  value: DailyReports?.WorkingDay || "N/A",
                },
                {
                  label: "Report Number",
                  value: DailyReports?.ReportNumber || "N/A",
                },
                {
                  label: "Project No./Client PO ",
                  value: DailyReports?.ProjectNumber || "N/A",
                },
                {
                  label: "Project Name",
                  value: DailyReports?.ProjectName || "N/A",
                },
                { label: "Owner", value: DailyReports?.Owner || "N/A" },
                {
                  label: "Contract Number",
                  value: DailyReports?.ContractNumber || "N/A",
                },
                {
                  label: "Contractor",
                  value: DailyReports?.Contractor || "N/A",
                },
                {
                  label: "Site Inspector",
                  value: DailyReports?.siteInspector || "N/A",
                },
                {
                  label: "Inspector Time In",
                  value: DailyReports?.timeIn || "N/A",
                },
                {
                  label: "Inspector Time Out",
                  value: DailyReports?.timeOut || "N/A",
                },
                {
                  label: "Owner Contact",
                  value: DailyReports?.OwnerContact || "N/A",
                },
                {
                  label: "Owner Project Manager",
                  value: DailyReports?.OwnerProjectManager || "N/A",
                },
                { label: "Component", value: DailyReports?.component || "N/A" },
              ].map((item, index) => (
                <View>
                  <Divider style={{ marginVertical: 6 }} />

                  <TaskDescription
                    firstWidth="45%"
                    secondWidth="55%"
                    text={item?.value}
                    label={item?.label}
                  />
                </View>
              ))}
            </Card>

            {/* Equipment Details */}
            <Card style={styles.section}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 10,
                }}
              >
                <MaterialIcons
                  name={"construction"}
                  size={24}
                  color={AppColor.PRIMARY}
                />
                <CustomText
                  color={AppColor.BLACK}
                  fontSize={moderateScale(16)}
                  fontFamily={AppFonts.Bold}
                  title={"Equipment Details"}
                />
              </View>

              {DailyReports?.Equipments?.map((item1, index) => (
                <View>
                  <Divider style={{ marginVertical: 6 }} />

                  <View style={{ marginVertical: 2 }} />

                  <TaskDescription
                    firstWidth="45%"
                    secondWidth="55%"
                    text={item1?.equipment_name || "N/A"}
                    label={"Equipment Name"}
                  />
                  <View style={{ marginVertical: 2 }} />

                  <TaskDescription
                    firstWidth="45%"
                    secondWidth="55%"
                    text={item1?.quantity.toString() || "0"}
                    label={"Quantity"}
                  />
                  <View style={{ marginVertical: 2 }} />

                  <TaskDescription
                    firstWidth="45%"
                    secondWidth="55%"
                    text={item1?.hours || "0"}
                    label={"Hours"}
                  />
                  <View style={{ marginVertical: 2 }} />

                  <TaskDescription
                    firstWidth="45%"
                    secondWidth="55%"
                    text={item1?.totalHours || "N/A"}
                    label={"Total Hours"}
                  />
                </View>
              ))}
            </Card>

            {/* Labour Details */}
            <Card style={styles.section}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 10,
                }}
              >
                <MaterialIcons
                  name={"groups"}
                  size={24}
                  color={AppColor.PRIMARY}
                />

                <CustomText
                  color={AppColor.BLACK}
                  fontSize={moderateScale(16)}
                  fontFamily={AppFonts.Bold}
                  title={"Labour Details"}
                />
              </View>

              {DailyReports?.Labour?.map((item1, index) => (
                <View>
                  <Divider style={{ marginVertical: 6 }} />

                  <View style={{ marginVertical: 2 }} />

                  <TaskDescription
                    firstWidth="45%"
                    secondWidth="55%"
                    text={item1?.contractorName || "N/A"}
                    label={"Name"}
                  />
                  <View style={{ marginVertical: 2 }} />

                  {item1?.roles?.map((item2, index) => (
                    <>
                      <TaskDescription
                        firstWidth="45%"
                        secondWidth="55%"
                        text={item2?.roleName.toString() || "N/A"}
                        label={"Role"}
                      />
                      <View style={{ marginVertical: 2 }} />

                      <TaskDescription
                        firstWidth="45%"
                        secondWidth="55%"
                        text={item2?.quantity || "0"}
                        label={"Quantity"}
                      />
                      <View style={{ marginVertical: 2 }} />

                      <TaskDescription
                        firstWidth="45%"
                        secondWidth="55%"
                        text={item2?.hours || "0"}
                        label={"Hours"}
                      />
                      <View style={{ marginVertical: 2 }} />

                      <TaskDescription
                        firstWidth="45%"
                        secondWidth="55%"
                        text={item2?.totalHours || "N/A"}
                        label={"Total Hours"}
                      />
                    </>
                  ))}
                </View>
              ))}
            </Card>

            {/* Visitor Details */}
            <Card style={styles.section}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 10,
                }}
              >
                <MaterialIcons
                  name={"people-alt"}
                  size={24}
                  color={AppColor.PRIMARY}
                />

                <CustomText
                  color={AppColor.BLACK}
                  fontSize={moderateScale(16)}
                  fontFamily={AppFonts.Bold}
                  title={"Visitor Details"}
                />
              </View>

              {DailyReports?.Visitors?.map((visitor, index) => (
                <>
                  <Divider style={{ marginVertical: 6 }} />

                  <TaskDescription
                    key={index}
                    firstWidth="45%"
                    secondWidth="55%"
                    text={visitor?.visitorName || "N/A"}
                    label={"Visitor Name"}
                  />
                  <View style={{ marginVertical: 2 }} />

                  <TaskDescription
                    key={index + 1}
                    firstWidth="45%"
                    secondWidth="55%"
                    text={visitor?.company || "N/A"}
                    label={"Company"}
                  />
                  <View style={{ marginVertical: 2 }} />

                  <TaskDescription
                    key={index + 2}
                    firstWidth="45%"
                    secondWidth="55%"
                    text={visitor?.quantity || "N/A"}
                    label={"Quantity"}
                  />
                  <View style={{ marginVertical: 2 }} />

                  <TaskDescription
                    key={index + 3}
                    firstWidth="45%"
                    secondWidth="55%"
                    text={visitor?.hours || "N/A"}
                    label={"Hours"}
                  />
                  <View style={{ marginVertical: 2 }} />

                  <TaskDescription
                    key={index + 4}
                    firstWidth="45%"
                    secondWidth="55%"
                    text={visitor?.totalHours || "N/A"}
                    label={"Total Hours"}
                  />
                </>
              ))}
            </Card>

            {/* Description */}
            <Card style={styles.section}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 10,
                }}
              >
                <MaterialIcons
                  name={"description"}
                  size={24}
                  color={AppColor.PRIMARY}
                />
                <CustomText
                  color={AppColor.BLACK}
                  fontSize={moderateScale(16)}
                  fontFamily={AppFonts.Bold}
                  title={"Description"}
                />
              </View>

              <CustomText
                title={DailyReports?.Description || "No description provided."}
              />
            </Card>

            {/* Signature */}
            {DailyReports?.signature ? (
              <ImageCardWithIcon
                title="Signature"
                iconName="draw"
                imageUrl={DailyReports?.signature}
              />
            ) : null}

            {/* Logo */}
            <SelectCard
              title="Choose Logo"
              onPress={() => !IsSubmit && setShowLogoSelectionModal(true)}
              selectedLogo={SelectedLogo}
              onRemove={(item) => handleRemoveLogo(item)}
              isShowDeleteIcon={!IsSubmit}
            />
            
            <LogoSelectionModal
              visible={ShowLogoSelectionModal}
              onDismiss={() => setShowLogoSelectionModal(false)}
              companies={Logos}
              onSelect={(text) => {
                setSelectedLogo(text);
                setShowLogoSelectionModal(false);
              } }
              preSelectedLogos={SelectedLogo}
               disable={false}            />
          </View>
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
                  createPdf();
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
                  callToSubmitDaily();
                  // createPdf();
                }}
              />
            </View>
          </>
        )}
      </View>
 {popupVisible && <ConfirmationPopup />}
      {Loading ? <LoaderModal visible={Loading} /> : null}
    </>
  );
};

export default DailyPreviewScreen;

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
  itemContainer: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
  },
  detailText: { fontSize: 16, color: "#555", marginBottom: 5 },
  boldText: { fontWeight: "bold" },
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

  imageContainer: {
    width: "100%",
    position: "relative",
    marginRight: 10,
    borderRadius: 6,
    height: 120,
  },
  photo: {
    width: "100%",
    height: 100,
  },
});
