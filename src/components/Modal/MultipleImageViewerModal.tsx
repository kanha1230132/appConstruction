import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
} from "react-native";

import moment from "moment";
import ViewShot, { captureRef } from "react-native-view-shot";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { AppColor } from "../../themes/AppColor";
import { Portal } from "react-native-paper";
import { AppFonts } from "../../themes/AppFonts";
import { getImageDimensions } from "../../utils/util";
import {Image as ImageType} from 'react-native-image-crop-picker'
import { Constants } from "../../constants/constants";

const useMultipleImageViewer = () => {
  const [multipleImageViewerVisible, setMultipleImageViewerVisible] = React.useState(false);
  const [Uri, setUri] = useState("");
  const promiseRef = useRef<any>(null);
  const imageRef = useRef<any>(null);
  const viewShotRefs = useRef<any>([]);
  const [ImgWidth, setImgWidth] = useState(300);
  const [ImgHeight, setImgHeight] = useState(500);
  const [location, setLocation] = useState("");
  const [time, setTime] = useState("");
  const [ImageList, setImageList] = useState<ImageType[]>([])

  const showMultipleImageViewerPopup = (
    images: ImageType[],
    location = "",
  ) => {
    const imageMap: ImageType[]  = []
    images.map((image: ImageType) => {
        let tempImage= {
            ...image}
        const temp = getImageDimensions(image.width, image.height);
        tempImage.height = temp.height;
        tempImage.width = temp.width
        imageMap.push(tempImage)
    })
    setImageList(imageMap)
    setLocation(location);
    setMultipleImageViewerVisible(true);
    return new Promise((resolve, reject) => {
      promiseRef.current = { resolve, reject };
    });
  };

  const captureAllImages = async () => {
    try {
      const uris = await Promise.all(
        viewShotRefs.current.map(ref => ref?.capture?.())
      );
      console.log('All captured URIs:', uris);
    } catch (error) {
      console.error('Failed to capture images:', error);
    }
  };
  
  const handleCapture = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (!imageRef.current) {
      console.warn("View ref not available");
      return "";
    }
    console.log("imageRef.current ,", imageRef.current);

    // Delay capture to ensure render is complete.
    try {
      const uri = await captureRef(imageRef, {
        quality: 1,
        format: "png",
      });
      console.log("Captured image uri:", uri);
      return uri;
    } catch (error) {
      console.error("Error capturing view:", error);
      return "";
    }
  };

  const handleOK = async () => {
    const uri = await captureAllImages();
    setMultipleImageViewerVisible(false);
    promiseRef.current?.resolve(uri);
  };

  const handleCancel = () => {
    setUri("");
    setMultipleImageViewerVisible(false);
    promiseRef.current?.resolve(undefined);
  };

  const renderImageItem = ({ item,index }:{item:ImageType,index:number}) => {
 
    return (
      <ViewShot
                style={[

                  styles.iconContainer,
                  { width: item.width, height: item.height },
                  {position:'relative',backgroundColor:'red',marginHorizontal:10}
                ]}
                ref={ref => (viewShotRefs.current[index] = ref)}
                collapsable={false}
              >
                {item.path ? (
                  <Image
                    onLayout={(e) => {
                      e.preventDefault();
                    }}
                    resizeMode="contain"
                    source={{ uri: item.path }}
                    style={{
                      height: '100%',
                      width: '100%',
                      zIndex:1
                    }}
                  />
                ) : null}
                <View
                  style={{
                    width: item.width / 2.0,
                    position: "absolute",
                    top: 0,
                    right: 0,
                    alignSelf: "flex-end",
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    zIndex:5,
                    // backgroundColor: "rgba(0, 0, 0, 0.2)",
                  }}
                >
                  {time ? null : (
                    <Text
                      style={{
                        fontFamily: AppFonts.Bold,
                        fontSize: 12,
                        color: AppColor.WHITE,
                        textAlign:'right'

                      }}
                    >
                      {moment().format("MMM DD, YYYY")} at{" "}
                      {moment().format("hh:mm A")}
                    </Text>
                  )}

                  {location ? (
                    <Text
                      style={{
                        fontFamily: AppFonts.Bold,
                        fontSize: 12,
                        color: AppColor.WHITE,
                        textAlign:'right'
                      }}
                    >
                    {location}
                    </Text>
                  ) : null}
                </View>
              </ViewShot>

    );
  }
  const MultipleImageViewerPopup = () => {
    return (
      <Portal>
        <Modal
          transparent={true}
          visible={multipleImageViewerVisible}
          animationType="fade"
        >
          <View style={styles.overlay}>
            <View style={styles.popup}>

                <View style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
 <FlatList
                  data={ImageList}
                  renderItem={renderImageItem}
                  keyExtractor={(item) => item.path}
                  horizontal={true}
                 />
                </View>

               
             

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                  position: "absolute",
                  bottom: 20,
                }}
              >
                <TouchableOpacity style={styles.button} onPress={handleCancel}>
                  <MaterialIcons name="cancel" size={40} color="red" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleOK}>
                  <MaterialIcons
                    name="check"
                    size={40}
                    color={AppColor.PRIMARY}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </Portal>
    );
  };

  return {
    showMultipleImageViewerPopup,
    MultipleImageViewerPopup,
    multipleImageViewerVisible,
  };
};

export default useMultipleImageViewer;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderWidth: 1,
  },
  popup: {
    height: "100%",
    width: "100%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    borderRadius: 25,
    backgroundColor: "white",
  },
  icon: {
    fontSize: 24,
    color: "white",
  },
  message: {
    fontSize: 16,
    color: "black",
    marginBottom: 15,
  },
  button: {
    // backgroundColor: AppColor.PRIMARY,
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
