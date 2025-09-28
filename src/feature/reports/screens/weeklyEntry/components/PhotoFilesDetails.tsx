import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Card } from "react-native-paper";
import FastImage from "react-native-fast-image";
import moment from "moment";
import { AppColor } from "../../../../../themes/AppColor";
import { PhotoFile } from "../../../../../utils/interface";

const PhotoFilesDetails = ({ photoFiles }: { photoFiles: PhotoFile[] }) => {
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 20,
      }}
    >
      {photoFiles.map((item, index) => {
        return (
          <Card style={[styles.imageWrapper]}>
            <TouchableOpacity key={index.toString()}>
              <FastImage
                style={styles.photo}
                source={{
                  uri: item.file_url,
                  priority: FastImage.priority.high,
                  cache: FastImage.cacheControl.immutable,
                }}
              />
              <View style={styles.photoOverlay}>
                <Text style={styles.photoTime}>
                  {moment(item.created_at).format("DD-MM-YYYY hh:mm A")}
                </Text>
              </View>
            </TouchableOpacity>
          </Card>
        );
      })}
    </View>
  );
};

export default PhotoFilesDetails;

const styles = StyleSheet.create({
  photoTime: {
    color: "white",
    fontSize: 12,
  },
  imageWrapper: {
    width: "30%",
    borderColor: AppColor.DISABLED,
    borderRadius: 6,
    margin: "1.666%",
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
    borderRadius: 0,
  },
});
