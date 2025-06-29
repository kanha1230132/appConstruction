import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

import moment from "moment";
import ViewShot, { captureRef } from "react-native-view-shot";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { AppColor } from "../../themes/AppColor";
import { Portal } from "react-native-paper";
import { AppFonts } from "../../themes/AppFonts";
import { getImageDimensions } from "../../utils/util";

const useImageViewer = () => {
  const [imageViewerVisible, setImageViewerVisible] = React.useState(false);
  const [Uri, setUri] = useState("");
  const promiseRef = useRef<any>(null);
  const imageRef = useRef<any>(null);
  const [ImgWidth, setImgWidth] = useState(300);
  const [ImgHeight, setImgHeight] = useState(500);
  const [location, setLocation] = useState("");
  const [time, setTime] = useState("");

  const showImageViewerPopup = (
    uri: string,
    location = "",
    _ok = "OK",
    height = 500,
    width = 300
  ) => {
    const image = getImageDimensions(width, height);
    setImgWidth(image.width);
    setImgHeight(image.height);
    setUri(uri);
    setLocation(location);
    setImageViewerVisible(true);
    return new Promise((resolve, reject) => {
      promiseRef.current = { resolve, reject };
    });
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
    const uri = await handleCapture();
    setImageViewerVisible(false);
    promiseRef.current?.resolve(uri);
  };

  const handleCancel = () => {
    setUri("");
    setImageViewerVisible(false);
    promiseRef.current?.resolve(undefined);
  };
  const ImageViewerPopup = () => {
    return (
      <Portal>
        <Modal
          transparent={true}
          visible={imageViewerVisible}
          animationType="fade"
        >
          <View style={styles.overlay}>
            <View style={styles.popup}>
              <View
                style={[
                  styles.iconContainer,
                  { width: ImgWidth, height: ImgHeight },
                ]}
                ref={imageRef}
                collapsable={false}
              >
                {Uri ? (
                  <Image
                    onLayout={(e) => {
                      e.preventDefault();
                    }}
                    resizeMode="contain"
                    source={{ uri: Uri }}
                    style={{
                      height: ImgHeight,
                      width: ImgWidth,
                    }}
                  />
                ) : null}
                <View
                  style={{
                    width: ImgWidth / 2,
                    position: "absolute",
                    top: 0,
                    right: 0,
                    alignSelf: "flex-end",
                    paddingHorizontal: 10,
                    paddingVertical: 10,
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
                      Location : {location}
                    </Text>
                  ) : null}
                </View>
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
    showImageViewerPopup,
    ImageViewerPopup,
    imageViewerVisible,
  };
};

export default useImageViewer;

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
