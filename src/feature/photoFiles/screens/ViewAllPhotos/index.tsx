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
import { ViewAllPhotosProps } from "../../../../types/navigation";
import { ImageItem } from "../../PhotoFilesScreen";
import { SafeAreaWrapper } from "../../../../components/SafeAreaWrapper/SafeAreaWrapper";
import HeaderWithBackButton from "../../../../components/Button/HeaderWithBackButton";
import { goBack, navigate } from "../../../../utils/NavigationUtil";
import { useIsFocused } from "@react-navigation/native";
import ScrollViewWrapper from "../../../../components/ScrollViewWrapper/ScrollViewWrapper";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AppColor } from "../../../../themes/AppColor";
import useToastHook from "../../../../hooks/toast";
import Share from "react-native-share";
import RNFS from "react-native-fs";
import moment from "moment";
import { screenNames } from "../../../../navigation/ScreenNames";
import { Card } from "react-native-paper";
import { useConfirmationPopup } from "../../../../components/Popup/confirmationPopup";
import RestClient from "../../../../api/restClient";
import FastImage from "react-native-fast-image";

const ViewAllPhotos: React.FC<ViewAllPhotosProps> = ({ route }) => {
  const [Photos, setPhotos] = useState<ImageItem[]>([]);
  const isFocused = useIsFocused();
  const { showToast } = useToastHook();
  const [selectedPhotos, setSelectedPhotos] = useState<ImageItem[]>([]);
   const { showConfirmationPopup, ConfirmationPopup, popupVisible } = useConfirmationPopup();

  useEffect(() => {
    if (route?.params) {
      const sortedArray = route?.params?.Photos?.sort(
        (a, b) => moment(b.time).valueOf() - moment(a.time).valueOf()
      )?.map((photo) => ({
        ...photo,
        selected: false, // Add isSelected property with default false value
      }));
      setPhotos(sortedArray);
    }
  }, [route?.params, isFocused]);


  const clickOnWhatsAppShare = async () => {
    try {
      if (!selectedPhotos.length) {
        showToast("No photos selected", "warning");
        return;
      }

      // Check if WhatsApp is installed
      const isWhatsAppInstalled = await Linking.canOpenURL(
        "whatsapp://send?text=hello"
      );
      if (!isWhatsAppInstalled) {
        showToast("WhatsApp is not installed", "warning");
        return;
      }

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

  const handleLongPress = (item: ImageItem, index: number) => {
    let photos = [...Photos];
    photos[index].selected = !photos[index].selected;
    setPhotos(photos);

    if (photos[index].selected) {
      setSelectedPhotos((prevSelectedPhotos) => [...prevSelectedPhotos, item]);
    } else {
      setSelectedPhotos((prevSelectedPhotos) =>
        prevSelectedPhotos.filter((tempUri) => tempUri.uri != item.uri)
      );
    }
  };

   const deletePhotos = async () => {
    try {
      const status = await showConfirmationPopup(
        "Confirm Deletion",
        `Are you sure you want to delete ${selectedPhotos.length > 1 ? "these photos" : "this photo"} ?`,
        "Delete",
        "Cancel"
      );
      if (!status) {
        return;
      }
      const restClient = new RestClient();
      let tempList = [...Photos]
      const ids:number[] = [];
      selectedPhotos.map((item) => {
        ids.push(item?._id);
      })
        const response = await restClient.deletePhotoFiles({ photoFileId: ids });
        if (response && typeof response != "string") {
          showToast("Photo deleted successfully", "success");

        setTimeout(() => {
          selectedPhotos.map((item) => {
            const index = tempList.findIndex((photo) => photo._id === item._id);
            if (index !== -1) {
              tempList.splice(index, 1);
            } 
          })
          // tempList = tempList.filter((photo) => photo._id !== item._id);
            setPhotos(tempList);
        setSelectedPhotos([]);

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
          title={`Photo Files`}
          onBackClick={() => goBack()}
          customStyle={undefined}
          showRightIcon={selectedPhotos?.length > 0}
          onClickRightIcon={() => clickOnWhatsAppShare()}
          showRightIcon2={selectedPhotos?.length > 0}
          RightIcons={"trash"}
          onClickRightIcon2={() => deletePhotos()}
        />
        <ScrollViewWrapper>
          <View style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap:10,
            justifyContent:"space-evenly",
            marginTop:20,
           
          }}>
 {
            Photos.map((item,index)=>{
              return(
                <Card style={styles.imageWrapper}>
                  <TouchableOpacity
        onLongPress={() => handleLongPress(item, index)}
        onPress={() => {
          if (selectedPhotos.length > 0) {
            handleLongPress(item, index);
          } else {
            navigate(screenNames.ImageViewer, { image: item.uri });
          }
        }}
        key={index.toString()}
      >

        <FastImage
  style={styles.photo}
  source={{
    uri: item.uri,
    priority: FastImage.priority.high,
    cache: FastImage.cacheControl.immutable,
  }}
/>
        <View style={styles.photoOverlay}>
          <Text style={styles.photoTime}>{moment(item.time).format("hh:mm A")}</Text>
        </View>

        {item?.selected && (
          <View
            style={{
              position: "absolute",
              top: 5,
              right: 5,
            }}
          >
            <Ionicons name="checkmark-circle" size={24} color="green" />
          </View>
        )}
      </TouchableOpacity>
      </Card>
              )
            })
          }
          </View>
         
          {/* <FlatList
            data={Photos}
            keyExtractor={(item, index) => `${item._id}-${index}`}
            renderItem={renderImages}
            style={{
              paddingBottom: 10,
              marginBottom: 10,
            }}
            contentContainerStyle={styles.photoList}
            numColumns={2}
            showsVerticalScrollIndicator={false}
          /> */}
          {popupVisible && <ConfirmationPopup />}

        </ScrollViewWrapper>
      </SafeAreaWrapper>

    </>
  );
};

export default ViewAllPhotos;

const styles = StyleSheet.create({
  photo: {
    width: "100%",
    height: 110,
    borderRadius: 6,
  },
  photoOverlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#00000050",
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    borderRadius:0

  },
  photoTime: {
    color: "white",
    fontSize: 12,
  },
  imageWrapper: {
    width: "30%",
    borderColor: AppColor.DISABLED,
    borderRadius: 6,
  },
  photoList: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 10,
    paddingBottom: 20,
    marginTop: 10,
    height: "100%",
  },
});
