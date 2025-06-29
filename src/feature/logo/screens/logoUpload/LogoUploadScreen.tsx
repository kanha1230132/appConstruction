import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import {
  Text,
  Divider,
  Button,
  ProgressBar,
  Card,
  FAB,
} from "react-native-paper";
import { SafeAreaWrapper } from "../../../../components/SafeAreaWrapper/SafeAreaWrapper";
import HeaderWithBackButton from "../../../../components/Button/HeaderWithBackButton";
import { goBack, navigate } from "../../../../utils/NavigationUtil";
import CustomTextInput from "../../../../components/CustomTextInput/CustomTextInput";
import ScrollViewWrapper from "../../../../components/ScrollViewWrapper/ScrollViewWrapper";
import { LogoUploadScreenProps } from "../../../../types/navigation";
import { screenNames } from "../../../../navigation/ScreenNames";
import { images } from "../../../../assets";
import { AppColor } from "../../../../themes/AppColor";
import { AppFonts } from "../../../../themes/AppFonts";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import LoaderButton from "../../../../components/Button/LoaderButton";
import { openCamera, openImagePicker } from "../../../../utils/util";
import useToastHook from "../../../../hooks/toast";
import { useIsFocused } from "@react-navigation/native";

const LogoUploadScreen: React.FC<LogoUploadScreenProps> = ({ navigation,route }) => {
  const [isUploading, setIsUploading] = React.useState(false);
  const [companyName, setCompanyName] = useState("");
  const [IsLoading, setIsLoading] = useState(false);
  const [SelectedImage, setSelectedImage] = useState<{
    path: string;
    filename: string;
  }>();
  const [IsNew, setIsNew] = useState(true)
  const { showToast } = useToastHook(); 
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      if (route?.params?.logo) {
        const clickedLogo = route.params.logo;
        console.log("first : ", clickedLogo);
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

  const clickOnCamera = async () => {
    try {
      const response = await openCamera();
      if (response) {
        const { path, filename } = response;
        setSelectedImage({ path, filename: filename || "" });
      } else {
        showToast("Something went wrong", "danger");
      }
      console.log("first : ", response);
    } catch (error) {}
  };

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


  return (
    <>
      <SafeAreaWrapper>
        <HeaderWithBackButton
          title={IsNew ? "Upload Logo" : 'Logo'}
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
                label={"Company Name"}
                editable={IsNew}
                
              />
            </View>

            <View>
              <Card
                elevation={1}
                style={{
                  backgroundColor: AppColor.WHITE,
                  marginVertical: 5,
                  padding: 10,
                  alignItems: "center",
                  marginHorizontal: 2,
                  paddingVertical: 20,
                  borderRadius: 10,
                }}
              >
                {SelectedImage ? (
                  <>
                    <Image
                      resizeMode="contain"
                      source={{ uri: SelectedImage.path }}
                      style={{
                        width: 100,
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
                        width: 80,
                        height: 80,
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
                      <View
                        style={{
                          width: 70,
                          height: 70,
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
                      </View>
                    </View>
                    <Text
                      style={{
                        marginTop: 10,
                        color: AppColor.BLACK_80,
                        fontFamily: AppFonts.Medium,
                        fontSize: 20,
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
                        fontSize: 13,
                        textAlign: "center",
                        marginHorizontal: 20,
                      }}
                    >
                      You can upload a logo by importing or taking a photo to
                      submit from your phone.
                    </Text>
                  </>
                )}
              </Card>

                {
                  IsNew ?

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
                    width: "40%",
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
                    <Text>Gallery</Text>
                  </TouchableOpacity>
                </Card>

                <Card
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
                    <Text>Camera</Text>
                  </TouchableOpacity>
                </Card>
              </View> : null
                }
             
            </View>

           
          </View>
        </ScrollViewWrapper>
      </SafeAreaWrapper>
      {
        IsNew ?

   <View style={styles.button}>
        <LoaderButton
          title="Upload"
          onPress={() => navigate(screenNames.VerifyOTPScreen)}
          loading={IsLoading}
        />
      </View>

        : null
      }

   
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
    width: "95%",
    alignSelf: "center",
    position: "absolute",
    bottom: Platform.OS == "ios" ? 30 : 10,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LogoUploadScreen;
