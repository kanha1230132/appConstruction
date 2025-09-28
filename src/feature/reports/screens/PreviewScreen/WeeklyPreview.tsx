import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { use, useEffect } from "react";
import useWeeklyPreview from "../../hooks/WeeklyPreview.hook";
import { SafeAreaWrapper } from "../../../../components/SafeAreaWrapper/SafeAreaWrapper";
import HeaderWithBackButton from "../../../../components/Button/HeaderWithBackButton";
import { goBack, navigate } from "../../../../utils/NavigationUtil";
import ScrollViewWrapper from "../../../../components/ScrollViewWrapper/ScrollViewWrapper";
import { AppColor } from "../../../../themes/AppColor";
import FastImage from "react-native-fast-image";
import { images } from "../../../../assets";
import CustomText from "../../../../components/CustomText/CustomText";
import CustomButton from "../../../../components/Button/CustomButton";
import LoaderModal from "../../../../components/Loader/Loader";
import { AppStyles } from "../../../../themes/AppStyles";
import PhotoFileImport from "../../components/PhotoFileImport";
import { screenNames } from "../../../../navigation/ScreenNames";
import { Card, Divider } from "react-native-paper";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { moderateScale } from "react-native-size-matters";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AppFonts } from "../../../../themes/AppFonts";
import { reportTypeFrom } from "../../helper/reportsType";
import PreviewSectionTitle from "../../components/PreviewSectionTitle";
import TaskDescription from "../../../jobHazard/components/TaskDescription";
import SelectCard from "../../../../components/SelectCard";
import LogoSelectionModal from "../../components/LogoSelectionModal";
import { ScrollView } from "react-native-gesture-handler";
import moment from "moment";
import ImageCardWithIcon from "../../components/ImageCardWithIcon";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { updateWeeklyReports } from "../../../../store/slice/Reports";
import { DailyEntry, Equipment, FileItem, Labour2, LabourRole, Visitor } from "../../../../api/apiInterface";
import { WeeklyPreviewScreenProps } from "../../../../types/navigation";


const WeeklyPreviewScreen: React.FC<WeeklyPreviewScreenProps> = ({route}) => {
  const {
    WeeklyReports,
    Logos,
    SelectedLogo,
    setSelectedLogo,
    IsSubmit,
    onActivityCreated,
    Loading,
    SelectedPhotos,
    setSelectedPhotos,
    ShowLogoSelectionModal,
    setShowLogoSelectionModal,
    handleRemoveLogo,
    createPdf,
    callToCreateWeekly,
    setIsSubmit,
    
  } = useWeeklyPreview();

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused()

  useEffect(() => {
    onActivityCreated();
  }, []);

  useEffect(()=>{
    if(isFocused){
      setIsSubmit(route.params?.isSubmit || false)
    }
  },[isFocused])

  useEffect(() => {
    if (WeeklyReports) {
      if (WeeklyReports?.Images) {
        setSelectedPhotos(WeeklyReports.Images);
      }
      if (WeeklyReports?.selectedLogo) {
        setSelectedLogo(WeeklyReports?.selectedLogo);
      }
    }
  }, [WeeklyReports]);

  const renderPhotoFiles = (photos: FileItem[]) => (
    <FlatList
      horizontal
      data={photos}
      keyExtractor={(item) => item?.path?.toString()}
      renderItem={({ item }) => (
        <Image
          style={{ width: 120, height: 100, marginRight: 10, borderRadius: 8 }}
          source={{
            uri: item.path,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
      )}
      contentContainerStyle={{ paddingVertical: 10 }}
    />
  );

  const renderLabourDetails = (labours: Labour2[]) =>
    labours?.map((labour, index) => (
      <Card key={index} style={AppStyles.section}>
        <CustomText
          title={`${labour.contractorName}`}
          fontSize={moderateScale(15)}
          fontFamily={AppFonts.Medium}
        />

        {labour.roles.map((role: LabourRole, idx: number) => (
          <CustomText
            key={idx}
            title={` ${role.roleName}: ${role.quantity} x ${role.hours} hrs = ${role.totalHours} hrs`}
            fontSize={moderateScale(13)}
          />
        ))}
      </Card>
    ));

  const renderEquipmentDetails = (equipments: Equipment[]) =>
    equipments?.map((eq, idx) => (
      <Text key={idx}>
        {eq.equipment_name}: {eq.quantity} x {eq.hours} hrs = {eq.totalHours}{" "}
        hrs
      </Text>
    ));

  const renderVisitorDetails = (visitors: Visitor[]) =>
    visitors?.map((visitor, idx) => (
      <Text key={idx}>
        {visitor.visitorName} ({visitor.company}): {visitor.quantity} x{" "}
        {visitor.hours} hrs = {visitor.totalHours} hrs
      </Text>
    ));

  const callToNavigateReportScreen = () => {
    dispatch(updateWeeklyReports(undefined));
    // navigation.reset({
    //   index: 0,
    //   routes: [
    //     {
    //       name: screenNames.MainApp,
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

  return (
    <>
      <SafeAreaWrapper>
        <HeaderWithBackButton
          title={"Weekly Entry Preview"}
          onBackClick={() =>
            (IsSubmit && !route.params?.isSubmit) ? callToNavigateReportScreen() : goBack()
          }
          customStyle={undefined}
        />
        <ScrollViewWrapper>
          <View style={styles.container}>
            {/* Photo files */}
            {
              !IsSubmit ?
 <PhotoFileImport
              onPress={() => {
                navigate(screenNames.ImageSelectionScreen, {
                  project: WeeklyReports?.schedule,
                  FromScreen: reportTypeFrom?.weekly,
                });
              }}
            />


              : null
            }
           

            {SelectedPhotos && SelectedPhotos?.length > 0 && (
              <Card style={AppStyles.section}>
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
                          // selectHandleImage(image);
                        }}
                      >
                        <View style={AppStyles.imageContainer}>
                          <FastImage
                            style={AppStyles.photo}
                            source={{
                              uri: image.uri,
                              priority: FastImage.priority.high,
                              cache: FastImage.cacheControl.immutable,
                            }}
                          />
                        </View>

                        {
                         !IsSubmit ?
  <TouchableOpacity
                          onPress={() => {
                            // deleteImage(innerindex);
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
            <Card style={AppStyles.section}>
              <PreviewSectionTitle
                title={"Project Details"}
                iconName="business"
              />
              {[
                { label: "Date", value: WeeklyReports?.reportDate },
                {
                  label: "Project No./Client PO",
                  value: WeeklyReports?.projectNumber,
                },
                { label: "Project Name", value: WeeklyReports?.projectName },
                { label: "Owner", value: WeeklyReports?.owner },
                {
                  label: "Contract Number",
                  value: WeeklyReports?.contractNumber,
                },
                {
                  label: "City Project Manager",
                  value: WeeklyReports?.cityProjectManager,
                },
                {
                  label: "Consultant Project Manager",
                  value: WeeklyReports?.consultantProjectManager,
                },
                {
                  label: "Site Inspector",
                  value: WeeklyReports?.siteInspector.join(","),
                },
                {
                  label: "Inspector Time In",
                  value: WeeklyReports?.inspectorTimeIn,
                },
                {
                  label: "Inspector Time Out",
                  value: WeeklyReports?.inspectorTimeOut,
                },
                {
                  label: "Contract Project Manager",
                  value: WeeklyReports?.contractProjectManager,
                },
                {
                  label: "Contractor Site Supervisor Onshore",
                  value: WeeklyReports?.contractorSiteSupervisorOnshore,
                },
                {
                  label: "Contractor Site Supervisor Offshore",
                  value: WeeklyReports?.contractorSiteSupervisorOffshore,
                },
                {
                  label: "Contract Administrator",
                  value: WeeklyReports?.contractAdministrator,
                },
                { label: "Support CA", value: WeeklyReports?.supportCA },
                { label: "Start Date", value: WeeklyReports?.startDate },
                { label: "End Date", value: WeeklyReports?.endDate },
              ].map((item, index) => (
                <View>
                  <Divider style={{ marginVertical: 6 }} />

                  <TaskDescription
                    firstWidth="45%"
                    secondWidth="55%"
                    text={item?.value || "N/A"}
                    label={item?.label}
                  />
                </View>
              ))}
            </Card>

            <View>
              <ScrollView style={{ padding: 10 }}>
                {WeeklyReports &&
                  Object.entries(WeeklyReports?.WeeklyAllList).map(
                    ([date, users]: any) => (
                      <View key={date}>
                        <View
                          style={{
                            backgroundColor: AppColor.PRIMARY_TRANSPARENT,
                            padding: 6,
                            marginTop: 10,
                          }}
                        >
                          <CustomText
                            title={`${moment(date, "YYYY-MM-DD").format(
                              "dddd, MMMM DD, YYYY"
                            )}`}
                            fontSize={moderateScale(15)}
                            color={AppColor.PRIMARY}
                            fontFamily={AppFonts.Medium}
                          />
                        </View>

                        {Object.entries(users).map(
                          ([userId, userData]: any) => (
                            <View key={userId}>
                              {userData?.diary?.map((diaryItem: any) => (
                                <Card
                                  key={diaryItem.id}
                                  style={AppStyles.section}
                                >
                                  <CustomText
                                    title={`Diary Report - ${diaryItem.reportNumber}`}
                                    fontSize={moderateScale(15)}
                                    fontFamily={AppFonts.Medium}
                                  />
                                  <CustomText
                                    title={`Project Manager: ${diaryItem.ownerProjectManager}`}
                                    fontSize={moderateScale(13)}
                                  />
                                  <CustomText
                                    title={`Contractor: ${diaryItem.contractor}`}
                                    fontSize={moderateScale(13)}
                                  />
                                  {diaryItem.description && (
                                    <CustomText
                                      title={`Description: ${diaryItem.description}`}
                                      fontSize={moderateScale(13)}
                                    />
                                  )}
                                </Card>
                              ))}

                              {userData?.entry?.map((entryItem: DailyEntry) => (
                                <Card
                                  key={entryItem.id}
                                  style={AppStyles.section}
                                >
                                  <CustomText
                                    title={`Daily Report - ${entryItem.report_number}`}
                                    fontSize={moderateScale(15)}
                                    fontFamily={AppFonts.Medium}
                                  />
                                  <CustomText
                                    title={`Location: ${entryItem.location}`}
                                    fontSize={moderateScale(13)}
                                  />
                                  <CustomText
                                    title={`Weather: ${entryItem.weather} (${entryItem.temp_low} - ${entryItem.temp_high})`}
                                    fontSize={moderateScale(13)}
                                  />
                                  <CustomText
                                    title={`Inspector: ${entryItem.site_inspector}`}
                                    fontSize={moderateScale(13)}
                                  />
                                  <CustomText
                                    title={`Time: ${entryItem.time_in} - ${entryItem.time_out}`}
                                    fontSize={moderateScale(13)}
                                  />
                                  {entryItem.description && (
                                    <CustomText
                                      title={`Description: ${entryItem.description}`}
                                      fontSize={moderateScale(13)}
                                    />
                                  )}

                                  <Divider style={{ marginVertical: 10 }} />
                                  <CustomText
                                    title={"Photo Files"}
                                    fontSize={moderateScale(15)}
                                    fontFamily={AppFonts.Medium}
                                  />
                                  {renderPhotoFiles(entryItem.photoFiles)}
                                  <CustomText
                                    title={"Equipments"}
                                    fontSize={moderateScale(15)}
                                    fontFamily={AppFonts.Medium}
                                  />
                                  {renderEquipmentDetails(
                                    entryItem.equipments
                                  )}
                                  <Divider style={{ marginVertical: 10 }} />
                                  <CustomText
                                    title={"Visitors"}
                                    fontSize={moderateScale(15)}
                                    fontFamily={AppFonts.Medium}
                                  />
                                  {renderVisitorDetails(
                                    entryItem.visitors
                                  )}
                                  <Divider style={{ marginVertical: 10 }} />
                                  <CustomText
                                    title={"Labours"}
                                    fontSize={moderateScale(15)}
                                    fontFamily={AppFonts.Medium}
                                  />
                                  {renderLabourDetails(entryItem.labours)}
                                </Card>
                              ))}
                            </View>
                          )
                        )}
                      </View>
                    )
                  )}
              </ScrollView>
            </View>

            {/* Company Logo */}
            <SelectCard
              title="Choose Logo"
              selectedLogo={SelectedLogo}
              onPress={() =>  !IsSubmit && setShowLogoSelectionModal(true)}
              onRemove={(item) => handleRemoveLogo(item)}
              isShowDeleteIcon={!IsSubmit}
            />

            {/* Signature */}
            {WeeklyReports?.signature ? (
              <ImageCardWithIcon
                title="Signature"
                iconName="draw"
                imageUrl={WeeklyReports?.signature}
              
              />
            ) : null}
            <LogoSelectionModal
              visible={ShowLogoSelectionModal}
              onDismiss={() => setShowLogoSelectionModal(false)}
              companies={Logos}
              onSelect={(text) => {
                setSelectedLogo(text);
                setShowLogoSelectionModal(false);
              } }
              preSelectedLogos={SelectedLogo} disable={false}            />
          </View>
        </ScrollViewWrapper>
      </SafeAreaWrapper>

      <View style={[AppStyles.buttonContainer, { gap: 10 }]}>
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
                  callToCreateWeekly();
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

export default WeeklyPreviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColor.WHITE,
  },
});
