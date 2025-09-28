import {
  FlatList,
  Image,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { PhotoFilesScreenProps } from "../../types/navigation";
import {
  GetPhotoFileResponse,
  SchedulesResponse,
  UploadAttachmentResponse,
} from "../../api/apiInterface";
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
import { delay } from "../../utils/delay";
import useMultipleImageViewer from "../../components/Modal/MultipleImageViewerModal";
import { ImageType } from "../../types/ImageType";
import RestClient from "../../api/restClient";
import useToastHook from "../../hooks/toast";
import moment from "moment";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { moderateScale } from "react-native-size-matters";
import { DateFormat } from "../../utils/dateUtil";
import { Card } from "react-native-paper";
import { screenNames } from "../../navigation/ScreenNames";
import LoaderModal from "../../components/Loader/Loader";
import Share from "react-native-share";
import RNFS from "react-native-fs";
import NotFoundText from "../../components/CustomText/NotFoundText";
import { useConfirmationPopup } from "../../components/Popup/confirmationPopup";
import { useIsFocused } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import FastImage from 'react-native-fast-image';

export interface ImageItem {
  uri: string;
  _id: number;
  selected: boolean;
  time: string; // ISO 8601 format date string,
  description?: string;
}

export interface DateWithImages {
  date: string; // ISO 8601 format date string
  images: ImageItem[];
  selected: boolean;
}

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
  const { showToast } = useToastHook();
  const [PhotoList, setPhotoList] = useState<DateWithImages[]>([]);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const { showConfirmationPopup, ConfirmationPopup, popupVisible } =
    useConfirmationPopup();
  const isFocused = useIsFocused();
  const {UserLocation} = useSelector((state: RootState) => state.User);


  useEffect(() => {
    if (isFocused) {
      const { project } = route?.params || ProjectList;
      if (project) {
        setProjectList(project);
        getPhotoFiles(project.id);
      }
      setSelectedPhotos([]);
    }
  }, [isFocused]);



  const handlePickImage = async () => {
    try {
      setImagePickerModal(false);
      if (Platform.OS === "ios") {
        await delay(900);
      } else {
        await delay(500);
      }
      const result = await openImagePicker(true);
      console.log("Result : ", result);
      if (result) {
        const imageList: string[] = await showMultipleImageViewerPopup(
          result,
         UserLocation ? UserLocation.city : "Current Location",
        );
        if (imageList) {
          uploadAttachments(imageList);
        }
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
      } else {
        await delay(500);
      }
      const result = await openCamera();
      if (result) {
        const { height, width } = result;
        const tempUri = await showImageViewerPopup(
          result.path,
          UserLocation ? UserLocation.city : "Current Location",
          "OK",
          height,
          width
        );
        if (tempUri) {
          uploadAttachments([tempUri]);
        }
      }
    } catch (error) {
      console.log("Error --> ", error);
    }
  };

  const uploadAttachments = async (urls: string[]) => {
    try {
      setLoading(true);
      const formData = new FormData();
      urls.map((url) => {
        formData.append("file", {
          uri: url,
          name: "image.jpg",
          type: "image/jpeg",
        });
      });
      formData.append("type", ImageType.COMPANY);
      const restClient = new RestClient();
      const response = await restClient.uploadAttachments(formData);
      if (response && typeof response !== "string") {
        const output: UploadAttachmentResponse[] = response.data;
        let photoURL: { path: string }[] = [];
        output.map((item) => {
          const url = item?.fileUrl.replace(/^.*?\.net\//, "");
          photoURL.push({ path: url });
        });
        const param = {
          schedule_id: ProjectList?.id,
          imageurl: photoURL,
        };
        const responsePhotos = await restClient.uploadPhotoFiles(param);
        if (responsePhotos && typeof responsePhotos !== "string") {
          getPhotoFiles(ProjectList?.id || 0);
          showToast(
            responsePhotos?.message || "Photos uploaded successfully",
            "success"
          );
          return;
        } else {
          showToast(
            responsePhotos || "Something went wrong please try again",
            "danger"
          );
        }
      } else {
        showToast(
          response || "Something went wrong please try again",
          "danger"
        );
      }
    } catch (error) {
      console.log("Error : ", error);
      setLoading(false);
      showToast("Something went wrong please try again", "danger");
    } finally {
      setLoading(false);
    }
  };

  const renderPhotoGroup = ({
    item,
    index,
  }: {
    item: DateWithImages;
    index: number;
  }) => {
    return (
      <Card elevation={0} style={styles.photoSection} key={item?.date}>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            paddingHorizontal: 10,
            alignItems: "center",
            paddingVertical: 2,
          }}
        >
          <View
            style={{
              width: "90%",
            }}
          >
            <View style={styles.photoHeader}>
              <Text style={styles.photoDate}>
                {moment(item.date).format("DD-MM-YYYY")}
              </Text>
            </View>
          </View>

          {selectedPhotos.length > 0 && item?.selected && (
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deletePhotos()}
            >
              <Ionicons name="trash" size={20} color="red" />
            </TouchableOpacity>
          )}
        </View>

        <View
          style={{
            width: "100%",
            flexDirection: "row",
            flexWrap: "wrap",
            // justifyContent: "space-between",
          }}
        >
          {item.images.map((image, innerindex) => {
            if (innerindex > 5) {
              return;
            }
            if (innerindex == 5) {
              return (
                <TouchableOpacity
                  style={{
                    width: "30%",
                    height: 120,
                    marginTop: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#f3f4f6",
                    borderRadius: 10,
                    flexDirection: "row",
                  }}
                  key={innerindex}
                  onPress={() => {
                    navigate(screenNames.ViewAllPhotos, {
                      Photos: item.images,
                    });
                  }}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      color: AppColor.PRIMARY,
                      fontFamily: AppFonts.Bold,
                    }}
                  >
                    View All
                  </Text>
                  <MaterialCommunityIcons
                    name="arrow-right"
                    size={20}
                    color={AppColor.PRIMARY}
                  />
                </TouchableOpacity>
              );
            }
            return (
              <Card
                style={{
                  width: "30%",
                  height: 120,
                  marginTop: 10,
                  borderRadius: 6,
                  margin: "1.5%",
                  backgroundColor: AppColor.WHITE,
                }}
                key={innerindex + Math.random().toString()}
                onPress={() => {
                  if (selectedPhotos.length > 0) {
                    handleLongPress(item, index, innerindex);
                  } else {
                    selectHandleImage(item, innerindex);
                  }
                }}
                onLongPress={() => handleLongPress(item, index, innerindex)}
              >
                <View style={styles.imageContainer}>

                  <Image
                    style={styles.photo}
                    source={{
                      uri: image.uri,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                  />
             


                  <View
                    style={{
                      width: "100%",
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      flexDirection: "row",
                      backgroundColor: "#ffffff20",
                      justifyContent: "space-between",
                      paddingVertical: 2,
                      paddingHorizontal: 10,
                      alignItems: "center",
                    }}
                  >
                    <Text style={styles.photoTime}>
                      Time : {moment(image.time).format("hh:mm:ss A")}
                    </Text>
                  </View>

                  {image?.selected && (
                    <View
                      style={{
                        position: "absolute",
                        top: 5,
                        right: 5,
                      }}
                    >
                      <Ionicons
                        name="checkmark-circle"
                        size={24}
                        color={AppColor.PRIMARY}
                      />
                    </View>
                  )}
                </View>
              </Card>
            );
          })}
        </View>
      </Card>
    );
  };

  const getPhotoFiles = async (id: number) => {
    try {
      setLoading(true);
      const restClient = new RestClient();
      const response = await restClient.getPhotoFiles({
        filter: {
          schedule_id: id,
        },
      });
      if (response && typeof response !== "string") {
        const output: GetPhotoFileResponse[] = response.data;
        if (output && output.length > 0) {
          console.log("output : ", JSON.stringify(output));
          filterPhotoByDate(output);
        }else{
          setPhotoList([]);
        }
      }
    } catch (error) {
      console.log("Error :", error);
      showToast("Something went wrong please try again", "danger");
    } finally {
      setLoading(false);
    }
  };

  const filterPhotoByDate = (output: GetPhotoFileResponse[]) => {
    const map = new Map();
    output.map((item) => {
      const isTimeCheck = moment(item.created_at).format(DateFormat.DD_MM_YYYY);
      if (map.has(isTimeCheck)) {
        map.get(isTimeCheck).images.push({
          uri: item.file_url,
          _id: item.id,
          selected: false,
          time: item.created_at,
        });
      } else {
        map.set(isTimeCheck, {
          date: item.created_at,
          images: [
            {
              uri: item.file_url,
              _id: item.id,
              selected: false,
              time: item.created_at,
            },
          ],
          selected: false,
        });
      }
    });

    const sortedMap = new Map(
      [...map.entries()].sort((a, b) => {
        // Convert dates to Moment objects in DD-MM-YYYY format
        const dateA = moment(a[0], "DD-MM-YYYY");
        const dateB = moment(b[0], "DD-MM-YYYY");

        // Compare the dates
        return dateB - dateA;
      })
    );

    console.log(
      "Array.from(sortedMap.values()) : ",
      JSON.stringify(Array.from(sortedMap.values()))
    );

    const sortedGroups = Array.from(sortedMap.values()).map((item: any) => {
      item?.images?.sort((a: any, b: any) => {
        return moment(b.time).valueOf() - moment(a.time).valueOf();
      });
      return item;
    });
    setPhotoList(sortedGroups);
  };

  const handleLongPress = (
    item: DateWithImages,
    pindex: number,
    index: number
  ) => {
    const { images, ...restItem } = item;
    const mappedImage = {
      ...restItem,
      uri: images[index].uri,
      time: images[index].time,
      _id: images[index]._id,
      selected: true,
    };
    const indexOfMappedImage = selectedPhotos.findIndex(
      (image) => image.uri === mappedImage.uri
    );
    let selectPhotos = [];
    if (indexOfMappedImage != -1) {
      selectPhotos = selectedPhotos.filter(
        (item) => item.uri !== mappedImage.uri
      );
    } else {
      selectPhotos = [...selectedPhotos, mappedImage];
    }

    console.log("selectPhotos ", selectPhotos);
    setSelectedPhotos(selectPhotos);

    const _photos = [...PhotoList];

    _photos[pindex].images[index].selected =
      !PhotoList[pindex].images[index].selected;
    let _images = _photos[pindex].images;
    const isExist = _images.findIndex((image) => image.selected == true);
    if (isExist == -1) {
      _photos[pindex].selected = false;
    } else {
      _photos[pindex].selected = true;
    }
    setPhotoList(_photos);
  };

  const selectHandleImage = (item: DateWithImages, index: number) => {
    const { images, ...restItem } = item;
    const mappedImage = {
      ...restItem,
      uri: images[index].uri,
      time: images[index].time,
    };
    navigate(screenNames.ImageViewer, { image: mappedImage.uri });
  };

  const clickOnWhatsAppShare = async () => {
    try {
      if (!selectedPhotos.length) {
        showToast("No photos selected", "warning");
        return;
      }

      // Check if WhatsApp is installed
      // const isWhatsAppInstalled = await Linking.canOpenURL(
      //   "whatsapp://send?text=hello"
      // );
      // if (!isWhatsAppInstalled) {
      //   showToast("WhatsApp is not installed", "warning");
      //   return;
      // }

      // Download all images first
      const downloadPromises = selectedPhotos.map(async (item, index) => {
        try {
          const filePath = `${RNFS.DocumentDirectoryPath}/image${index}.jpg`;
          await RNFS.downloadFile({
            fromUrl: item.uri,
            toFile: filePath,
          }).promise;
          return `file://${filePath}`;
        } catch (error) {
          console.error(`Error downloading image ${index}:`, error);
          throw new Error(`Failed to download image ${index}`);
        }
      });

      // Wait for all downloads to complete
      const uris = await Promise.all(downloadPromises);

      // Filter out any failed downloads
      const validUris = uris.filter((uri) => uri !== null);
      if (!validUris.length) {
        showToast("Could not prepare images for sharing", "danger");
        return;
      }

      // Prepare share options
      const shareOptions = {
        title: "Share images via",
        urls: validUris,
        social: Share.Social.WHATSAPP,
        type: "image/jpeg",
        failOnCancel: false,
      };

      // Share on WhatsApp
      if(Platform.OS === "ios") {
      await Share.open(shareOptions);
      }else{
      await Share.shareSingle(shareOptions);
      }
    } catch (error) {
      console.error("Error in WhatsApp share:", error);
      showToast("Failed to share images. Please try again.", "danger");
    }
  };

  const deletePhotos = async () => {
    try {
      const status = await showConfirmationPopup(
        "Confirm Deletion",
        `Are you sure you want to delete ${
          selectedPhotos.length > 1 ? "these photos" : "this photo"
        } ?`,
        "Delete",
        "Cancel"
      );
      if (!status) {
        return;
      }
      const restClient = new RestClient();
      const ids:number[] = [];
      selectedPhotos.map((item) => {
        ids.push(item?._id);
      })
     
        const response = await restClient.deletePhotoFiles({ photoFileId: ids });
        if (response && typeof response != "string") {
          showToast("Photo deleted successfully", "success");
        setTimeout(() => {
          getPhotoFiles(ProjectList?.id);
        }, 1000);
        } else {
         showToast(response?.message || "Something went wrong" , "danger");
        }
     
    } catch (error) {
      showToast("Something went wrong", "warning");
      console.log("Error : ", error);
      return;
    }
  };

  return (
    <>
      <SafeAreaWrapper>
        <HeaderWithBackButton
          title={`Photo Files (${ProjectList?.project_name})`}
          onBackClick={() => goBack()}
          customStyle={undefined}
          showRightIcon={selectedPhotos.length > 0}
          onClickRightIcon={() => clickOnWhatsAppShare()}
        />
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
        <ScrollViewWrapper>
          {!loading && PhotoList?.length == 0 ? (
            <NotFoundText message={"No Photos Found"} />
          ) : null}

          {!loading && PhotoList.length > 0 ? (
            <FlatList
              data={PhotoList}
              keyExtractor={(item) =>
                item?.date + new Date().getTime().toString()
              }
              renderItem={renderPhotoGroup}
              style={styles.photoList}
              showsVerticalScrollIndicator={false}
            />
          ) : null}
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
        {popupVisible && <ConfirmationPopup />}
        {multipleImageViewerVisible && <MultipleImageViewerPopup />}
      </SafeAreaWrapper>

      {loading ? <LoaderModal visible={loading} /> : null}
    </>
  );
};

export default PhotoFilesScreen;

const styles = StyleSheet.create({
  photoList: {
    width: "100%",
    paddingBottom: 16,
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
  photoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  photoDate: {
    fontSize: moderateScale(14),
    fontFamily: AppFonts.Bold,
    color: AppColor.PRIMARY,
  },
  photoTime: {
    fontFamily: AppFonts.Regular,
    fontSize: moderateScale(8),
    marginVertical: 0,
    color: AppColor.BLACK_70,
  },

  photoSection: {
    marginBottom: 16,
    paddingVertical: 10,
    borderRadius: 6,
    backgroundColor: AppColor.WHITE,
    marginHorizontal: 3,
  },
  deleteButton: {
    height: 30,
    backgroundColor: AppColor.WHITE,
    borderRadius: 6,
    padding: 3,
    elevation: 5,
  },
});
