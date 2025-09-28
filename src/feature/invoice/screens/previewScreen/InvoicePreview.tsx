import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import HeaderWithBackButton from "../../../../components/Button/HeaderWithBackButton";
import { SafeAreaWrapper } from "../../../../components/SafeAreaWrapper/SafeAreaWrapper";
import useInvoicePreview from "../../hooks/invoicePreview.hook";
import { Card, Divider } from "react-native-paper";
import { AppStyles } from "../../../../themes/AppStyles";
import PreviewSectionTitle from "../../../reports/components/PreviewSectionTitle";
import TaskDescription from "../../../jobHazard/components/TaskDescription";
import { goBack, navigate } from "../../../../utils/NavigationUtil";
import CustomButton from "../../../../components/Button/CustomButton";
import useCreateInvoice from "../../hooks/createInvoice.hook";
import { AppColor } from "../../../../themes/AppColor";
import { moderateScale } from "react-native-size-matters";
import { AppFonts } from "../../../../themes/AppFonts";
import ScrollViewWrapper from "../../../../components/ScrollViewWrapper/ScrollViewWrapper";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { screenNames } from "../../../../navigation/ScreenNames";
import LoaderModal from "../../../../components/Loader/Loader";
import FastImage from "react-native-fast-image";
import CustomText from "../../../../components/CustomText/CustomText";
import { images } from "../../../../assets";
import BottomButtonWrapper from "../../../../components/Button/BottomButtonWrapper";

interface InvoicePreviewScreenProps {}

const InvoicePreviewScreen: React.FC<InvoicePreviewScreenProps> = () => {
  const {
    Invoice,
    createInvoice,
    IsLoading,
    callToNavigateReportScreen,
    selectedInspector,
    setSelectedInspector,
    IsSubmit,
    createInvoicePdf
  } = useInvoicePreview();
  useEffect(() => {
    if (Invoice) {
      setSelectedInspector(Invoice?.siteInspectors[0]);
    }
  }, []);

  return (
    <>
      <SafeAreaWrapper>
        <HeaderWithBackButton
          title={"Invoice Preview"}
          onBackClick={() => {
            IsSubmit ? callToNavigateReportScreen() : goBack();
          }}
          customStyle={undefined}
        />
        <ScrollViewWrapper>
          {/* Project Details */}
          <Card style={AppStyles.section}>
            <PreviewSectionTitle
              title={"Invoice Details"}
              iconName="business"
            />
            {[
              { label: "Client", value: Invoice?.owner },
              {
                label: "Project No./Client PO",
                value: Invoice?.projectNumber,
              },
              { label: "Project Name", value: Invoice?.projectName },
              { label: "Start Date", value: Invoice?.startDate },
              { label: "End Date", value: Invoice?.endDate },
              {
                label: "Invoice To",
                value: Invoice?.consultantProjectManager,
              },
              { label: "Description", value: Invoice?.description },
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

          <Card style={AppStyles.section}>
            <PreviewSectionTitle
              title={"Inspector Name & Their Details"}
              iconName="supervised-user-circle"
            />

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.nameScroll}
            >
              {Invoice?.siteInspectors?.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setSelectedInspector(item);
                    // setSelectedInspector(item
                  }}
                  style={[
                    styles.nameContainer,
                    {
                      backgroundColor:
                        selectedInspector?.name === item.name
                          ? AppColor.PRIMARY
                          : AppColor.WHITE,

                      borderWidth: 1,
                      borderColor: AppColor.PRIMARY,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.nameText,
                      selectedInspector?.name === item.name &&
                        styles.activeNameText,
                    ]}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Divider style={{ marginVertical: 10 }} />

            <TaskDescription
              firstWidth="45%"
              secondWidth="55%"
              label={"Hours "}
              text={(selectedInspector?.totalHours ? Number(selectedInspector?.totalHours).toFixed(2) : 0 ) + " hrs"}
            />
            {/* <Divider style={{ marginVertical: 6 }} />
            <TaskDescription
              firstWidth="45%"
              secondWidth="55%"
              label={"Total Billable Hours"}
              text={selectedInspector?.totalBillableHours + " hrs"}
            /> */}
            <Divider style={{ marginVertical: 6 }} />

            <TaskDescription
              firstWidth="45%"
              secondWidth="55%"
              label={"Rate"}
              text={'$'+(selectedInspector?.rate ? Number(selectedInspector?.rate).toFixed(2) : "0.00")}
            />
            <Divider style={{ marginVertical: 6 }} />

            {/* <TaskDescription
              firstWidth="45%"
              secondWidth="55%"
              label={"Sub Total"}
              text={'$'+selectedInspector?.subTotal}
            />
            <Divider style={{ marginVertical: 6 }} /> */}

            <TaskDescription
              firstWidth="45%"
              secondWidth="55%"
              label={"Amount"}
              text={'$'+ (selectedInspector?.total ? Number(selectedInspector?.total).toFixed(2) :'0.00')}
            />
            <Divider style={{ marginVertical: 6 }} />

             <TaskDescription
              firstWidth="45%"
              secondWidth="55%"
              label={"Description"}
              text={selectedInspector?.description}
            />
          </Card>

          {Invoice?.workFromEntry && Invoice?.workFromEntry.length > 0 ? (
            <View style={styles.entryContainer}>
              <Text style={styles.entryText}>
                {Invoice?.workFromEntry.length} Daily Diary Entries
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigate(screenNames.WorkFromEntryScreen, {
                    workFromEntry: Invoice?.workFromEntry,
                  })
                }
              >
                <MaterialIcons name="arrow-forward" size={24} color="black" />
              </TouchableOpacity>
            </View>
          ) : null}

          {IsLoading ? <LoaderModal visible={IsLoading} /> : null}
        </ScrollViewWrapper>
      </SafeAreaWrapper>
              <View style={[AppStyles.buttonContainer, { gap: 10 }]}>

      {IsSubmit ?  <>
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
                  createInvoicePdf();
                }}
              >
                <FastImage
                  source={images.PDF_ICON}
                  style={{ width: 25, height: 25 }}
                />
                <CustomText title={"Share Pdf"} color={AppColor.WHITE} />
              </TouchableOpacity>
            </View>
          </> : (
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
                createInvoice();
              }}
            />
        </View>
        </>
      )}
               </View>

    </>
  );
};

export default InvoicePreviewScreen;

const styles = StyleSheet.create({
  nameScroll: {
    paddingHorizontal: 0,
  },
  nameContainer: {
    alignItems: "center",
    marginRight: 15,
    backgroundColor: AppColor.PRIMARY,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  nameText: {
    fontSize: moderateScale(12),
    color: AppColor.PRIMARY,
    fontFamily: AppFonts.Medium,
  },
  activeNameText: {
    color: AppColor.WHITE,
    fontFamily: AppFonts.Medium,
  },
  underline: {
    width: "100%",
    backgroundColor: "#D3D3D3", // Grey color for unselected
  },
  entryContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#FFD700",
    backgroundColor: "#FFF8E1",
    padding: 12,
    borderRadius: 8,
    marginVertical: 1,
    elevation: 3,
    marginBottom: 40,
  },
  entryText: {
    fontSize: 14,
    color: "#000",
    fontFamily: AppFonts.Medium,
  },
});
