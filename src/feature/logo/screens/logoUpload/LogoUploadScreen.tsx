import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Text, Card } from "react-native-paper";
import { SafeAreaWrapper } from "../../../../components/SafeAreaWrapper/SafeAreaWrapper";
import HeaderWithBackButton from "../../../../components/Button/HeaderWithBackButton";
import { goBack, navigate } from "../../../../utils/NavigationUtil";
import CustomTextInput from "../../../../components/CustomTextInput/CustomTextInput";
import ScrollViewWrapper from "../../../../components/ScrollViewWrapper/ScrollViewWrapper";
import { LogoUploadScreenProps } from "../../../../types/navigation";
import { AppColor } from "../../../../themes/AppColor";
import { AppFonts } from "../../../../themes/AppFonts";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import LoaderButton from "../../../../components/Button/LoaderButton";
import { openCamera, openImagePicker } from "../../../../utils/util";
import useToastHook from "../../../../hooks/toast";
import { useIsFocused } from "@react-navigation/native";
import { moderateScale } from "react-native-size-matters";
import { ImageType } from "../../../../types/ImageType";
import RestClient from "../../../../api/restClient";
import {
  CompanyLogoResponse,
  UploadAttachmentResponse,
} from "../../../../api/apiInterface";
import ActivityLoader from "../../../../components/Loader/ActivityLoader";

const LogoUploadScreen: React.FC<LogoUploadScreenProps> = ({
  navigation,
  route,
}) => {
  const [companyName, setCompanyName] = useState("");
  const [IsLoading, setIsLoading] = useState(false);
  const [SelectedImage, setSelectedImage] = useState<{
    path: string;
    filename: string;
  }>();
  const [IsNew, setIsNew] = useState(true);
  const [SelectedLogo, setSelectedLogo] = useState<CompanyLogoResponse>();
  const { showToast } = useToastHook();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      if (route?.params?.logo) {
        const clickedLogo = route.params.logo;
        console.log("first : ", clickedLogo);
        setSelectedLogo(clickedLogo);
        setCompanyName(clickedLogo?.companyName);
        setIsNew(false);
        setSelectedImage({
          path: clickedLogo?.file_url,
          filename: clickedLogo.logoUrl,
        });
      } else {
        setSelectedImage(undefined);
        setCompanyName("");
        setIsNew(true);
      }
    }
  }, [isFocused]);

  const clickOnGallery = async () => {
    try {
      const response = await openImagePicker();
      if (response) {
        const { path, filename } = response;
        setSelectedImage({ path, filename: filename || "" });
      } else {
        showToast("Something went wrong", "danger");
      }
      console.log("first : ", response);
    } catch (error) {}
  };

  const callToUploadLogo = async () => {
    try {
      if (!companyName) {
        showToast("Please enter logo name", "warning");
        return;
      }
      if (!SelectedImage) {
        showToast("Please select logo", "warning");
        return;
      }
      setIsLoading(true);
      const formData = new FormData();
      formData.append("file", {
        uri: SelectedImage?.path,
        name: "image.jpg",
        type: "image/jpeg",
      });
      formData.append("type", ImageType.LOGO);
      const restClient = new RestClient();
      const response = await restClient.uploadAttachments(formData);
      if (response && typeof response !== "string") {
        const output: UploadAttachmentResponse[] = response.data;
        let url = "";
        url = output[0]?.fileUrl.replace(/^.*?\.net\//, "");
        const param = {
          companyName: companyName,
          fileUrl: url,
        };
        const responsePhotos = await restClient.addLogo(param);
        console.log("responsePhotos : ", responsePhotos);
        if (responsePhotos && typeof responsePhotos !== "string") {
          showToast("Logo uploaded successfully", "success");
          goBack();
        } else {
          showToast("Something went wrong please try again", "danger");
        }
      } else {
        showToast("Something went wrong please try again", "danger");
      }
    } catch (error) {
      console.log("Error : ", error);
      showToast("Something went wrong please try again", "danger");
    } finally {
      setIsLoading(false);
    }
  };

  const callToDeleteLogo = async () => {
    try {
      setIsLoading(true);
      const restClient = new RestClient();
      const resposne = await restClient.deleteLogo(SelectedLogo?.id || 0);
      if (resposne && typeof resposne !== "string") {
        showToast("Logo deleted successfully", "success");
        goBack();
      } else {
        showToast("Something went wrong please try again", "danger");
      }
    } catch (error) {
      console.log("Error : ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SafeAreaWrapper>
        <HeaderWithBackButton
          title={IsNew ? "Upload Logo" : "Logo"}
          onBackClick={() => goBack()}
          customStyle={undefined}
        />

        <ScrollViewWrapper>
          <View style={{ marginTop: 10 }}>
            <View style={{ marginVertical: 10 }}>
              <CustomTextInput
                onChangeTextValue={(text) => {
                  setCompanyName(text);
                }}
                textValue={companyName}
                label={"Logo Name"}
                editable={IsNew}
              />
            </View>

            <View>
              <Card
                elevation={1}
                style={{
                  width:'100%',
                  backgroundColor: AppColor.WHITE,
                  marginVertical: 5,
                  padding: 10,
                  // alignItems: "center",
                  marginHorizontal: '1%',
                  paddingVertical: 20,
                  borderRadius: 10,
                  position: "relative",
                }}
              >
                {SelectedImage ? (
                  <>
                    <Image
                      resizeMode="contain"
                      source={{ uri: SelectedImage.path }}
                      style={{
                        width: 200,
                        height: 200,
                        marginLeft: 15,
                        alignSelf: "center",
                      }}
                    />
                    <Text
                      style={{
                        marginTop: 10,
                        color: AppColor.BLACK_50,
                        fontFamily: AppFonts.Medium,
                        fontSize: 13,
                        textAlign: "center",
                        marginHorizontal: 20,
                      }}
                    >
                      {SelectedImage.filename}
                    </Text>
                  </>
                ) : (
                  <>
                    <View
                      style={{
                        width: moderateScale(70),
                        height: moderateScale(70),
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 100,
                        backgroundColor: AppColor.WHITE,
                        borderWidth: 2,
                        borderStyle: "dashed",
                        borderColor: AppColor.BLACK_40,
                        alignSelf: "center",
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          clickOnGallery();
                        }}
                        style={{
                          width: moderateScale(60),
                          height: moderateScale(60),
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: 100,
                          backgroundColor: AppColor.PRIMARY,
                        }}
                      >
                        <MaterialIcons
                          name="add"
                          size={30}
                          color={AppColor.WHITE}
                        />
                      </TouchableOpacity>
                    </View>
                    <Text
                      style={{
                        marginTop: 10,
                        color: AppColor.BLACK_80,
                        fontFamily: AppFonts.Medium,
                        fontSize: moderateScale(20),
                        textAlign: "center",
                      }}
                    >
                      Upload Logo
                    </Text>
                    <Text
                      style={{
                        marginTop: 10,
                        color: AppColor.BLACK_50,
                        fontFamily: AppFonts.Medium,
                        fontSize: moderateScale(14),
                        textAlign: "center",
                        marginHorizontal: 20,
                      }}
                    >
                    You can upload a logo by importing from your phone. 1024x1024 pixels.
                    </Text>
                  </>
                )}

              
                {SelectedImage && IsNew ? (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedImage(undefined);
                    }}
                    style={{
                      alignItems: "center",
                      width: 35,
                      height: 35,
                      position: "absolute",
                      top: 0,
                      right: 0,
                    }}
                  >
                    <MaterialIcons
                      name="cancel"
                      size={35}
                      color={AppColor.REJECT}
                    />
                  </TouchableOpacity>
                ) : null}
              </Card>

              {/* {IsNew ? (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 15,
                  }}
                >
                  <Card
                    style={{
                      backgroundColor: AppColor.WHITE,
                      borderRadius: 10,
                      width: "100%",
                      marginVertical: 10,
                      alignItems: "center",
                      paddingVertical: 8,
                      marginHorizontal: 2,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => clickOnGallery()}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <MaterialIcons
                        name="photo-library"
                        size={30}
                        color={AppColor.PRIMARY}
                      />
                      <Text
                        style={{
                          fontFamily: AppFonts.Medium,
                          color: AppColor.BLACK,
                        }}
                      >
                        Gallery
                      </Text>
                    </TouchableOpacity>
                  </Card>

                  {/* <Card
                  style={{
                    backgroundColor: AppColor.WHITE,
                    borderRadius: 10,
                    width: "40%",
                    marginVertical: 10,
                    alignItems: "center",
                    paddingVertical: 8,
                    marginHorizontal: 2,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => clickOnCamera()}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <MaterialIcons
                      name="photo-camera"
                      size={30}
                      color={AppColor.PRIMARY}
                    />
                    <Text style={{
                      fontFamily: AppFonts.Medium,
                      color:AppColor.BLACK
                    }}>Camera</Text>
                  </TouchableOpacity>
                </Card> */}
              {/* </View> */}
              {/* ) : null} */}
            </View>

          </View>
        </ScrollViewWrapper>
      </SafeAreaWrapper>

      {/* {IsNew ? ( */}
      <View style={styles.button}>
        <LoaderButton
          title={IsNew ? "Upload" : "Delete Logo"}
          onPress={() => (IsNew ? callToUploadLogo() : callToDeleteLogo())}
          loading={IsLoading}
        />
      </View>
      {/* ) : null} */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  title: {
    fontWeight: "bold",
    marginBottom: 8,
  },
  secondTitle: {
    marginTop: 24,
  },
  description: {
    color: "#666",
    marginBottom: 16,
  },
  divider: {
    marginVertical: 8,
  },
  uploadButton: {
    marginTop: 16,
    borderRadius: 4,
    backgroundColor: "#6200ee",
  },
  uploadButtonLabel: {
    color: "white",
    fontWeight: "bold",
    paddingVertical: 6,
  },
  fileTypes: {
    color: "#666",
    textAlign: "center",
    marginVertical: 16,
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  orDivider: {
    flex: 1,
    backgroundColor: "#ccc",
  },
  orText: {
    marginHorizontal: 8,
    color: "#666",
  },
  cameraButton: {
    marginTop: 8,
    borderRadius: 4,
    borderColor: "#6200ee",
  },
  cameraButtonLabel: {
    color: "#6200ee",
    paddingVertical: 6,
  },
  uploadingText: {
    marginTop: 16,
    color: "#666",
    textAlign: "center",
  },
  fileName: {
    marginTop: 8,
    textAlign: "center",
    fontWeight: "bold",
  },
  progressBar: {
    marginTop: 16,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#e0e0e0",
  },
  button: {
    width: "100%",
    alignSelf: "center",
    position: "absolute",
    bottom: 0,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: Platform.OS === "ios" ? "4%" : "2%",
    backgroundColor: AppColor.WHITE,
    paddingBottom: Platform.OS === "ios" ? 35 : 15,
  },
});

export default LogoUploadScreen;
