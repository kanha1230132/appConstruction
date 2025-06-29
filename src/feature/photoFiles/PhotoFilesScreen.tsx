import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { PhotoFilesScreenProps } from "../../types/navigation";
import { SchedulesResponse } from "../../api/apiInterface";
import { SafeAreaWrapper } from "../../components/SafeAreaWrapper/SafeAreaWrapper";
import HeaderWithBackButton from "../../components/Button/HeaderWithBackButton";
import { goBack, navigate } from "../../utils/NavigationUtil";
import ScrollViewWrapper from "../../components/ScrollViewWrapper/ScrollViewWrapper";
import { AppFonts } from "../../themes/AppFonts";
import { AppColor } from "../../themes/AppColor";
import { images } from "../../assets";
import ImagePickerModal from "../../components/Modal/PhotoSelectorModal";
import { openCamera, openImagePicker } from "../../utils/util";
import useImageViewer from "../../components/Modal/ImageViewerModal";
import { getLocation } from "../../utils/Location";
import { delay } from "../../utils/delay";
import useMultipleImageViewer from "../../components/Modal/MultipleImageViewerModal";

const PhotoFilesScreen: React.FC<PhotoFilesScreenProps> = ({ route }) => {
  const [ProjectList, setProjectList] = useState<SchedulesResponse>();
  const [imagePickerModal, setImagePickerModal] = useState(false);
  const { showImageViewerPopup, ImageViewerPopup, imageViewerVisible } =
    useImageViewer();
  const {
    showMultipleImageViewerPopup,
    MultipleImageViewerPopup,
    multipleImageViewerVisible,
  } = useMultipleImageViewer();
  


  useEffect(() => {
    if (route.params) {
      const { project } = route.params;
      if (project) {
        setProjectList(project);
      }
      console.log(project);
      getLocation(true);
    }
  }, []);

  const handlePickImage = async () => {
    try {
      setImagePickerModal(false);
      if (Platform.OS === "ios") {
        await delay(900);
      }
      const result = await openImagePicker(true);
      if (result) {
        const imageList = await showMultipleImageViewerPopup(
          result,
          "Partap Nagar , Ellenabad, Sirsa"
        );
        console.log("imageList : ", imageList);
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
      }
      const result = await openCamera();
      if (result) {
        const { height, width } = result;
        const tempUri = await showImageViewerPopup(
          result.path,
          "Partap Nagar , Ellenabad, Sirsa",
          "OK",
          height,
          width
        );
      }
    } catch (error) {
      console.log("Error --> ", error);
    }
  };





  return (
    <>
      <SafeAreaWrapper>
        <HeaderWithBackButton
          title={`Photo Files (${ProjectList?.projectName})`}
          onBackClick={() => goBack()}
          customStyle={undefined}
        />
        <ScrollViewWrapper>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingVertical: 10,
              backgroundColor: AppColor.GREY_F9,
              paddingHorizontal: 10,
              borderRadius: 6,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontFamily: AppFonts.Medium,
              }}
            >
              Photos
            </Text>
            <TouchableOpacity
              onPress={() => {
                setImagePickerModal(true);
              }}
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderWidth: 1,
                borderColor: AppColor.PRIMARY,
                paddingVertical: 2,
                paddingHorizontal: 10,
                borderRadius: 5,
              }}
            >
              <Image
                source={images.ADD_IMAGE_ICON}
                style={{ width: 27, height: 27 }}
              />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "regular",
                }}
              >
                Take Pictures
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollViewWrapper>

        {imagePickerModal ? (
          <ImagePickerModal
            pickImageFromLibrary={() => handlePickImage()}
            takePhoto={() => handleTakePicture()}
            isVisible={imagePickerModal}
            onClose={() => setImagePickerModal(false)}
          />
        ) : null}

        {imageViewerVisible && <ImageViewerPopup />}

        {multipleImageViewerVisible && <MultipleImageViewerPopup />}
      </SafeAreaWrapper>
    </>
  );
};

export default PhotoFilesScreen;

const styles = StyleSheet.create({});
