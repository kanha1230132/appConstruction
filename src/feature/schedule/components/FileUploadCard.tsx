
import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Text, useTheme, Card } from "react-native-paper";
import { images } from "../../../assets";
import { AppColor } from "../../../themes/AppColor";

interface FileUploadCardProps {
  file: any;
  setFile: (file: any) => void;
}

const FileUploadCard: React.FC<FileUploadCardProps> = ({ file, setFile }) => {
  const theme = useTheme();

  const clickToUpload = async () => {
    try {
      // const response = await openDocumentPicker();
    } catch (error) {
      console.log("Error : ", error);
    }
  };

  return (
    <Card elevation={0} style={{ borderRadius: 6, marginHorizontal: 2, borderWidth: 1, borderColor: AppColor.BLACK_30 }}>
      <View
        style={[
          styles.container,
          { backgroundColor: AppColor.WHITE, marginHorizontal: 2 },
        ]}
      >
        <Text style={styles.title}>Upload Schedule Pdf</Text>
        <Text style={styles.fileTypes}>Pdf</Text>

        <TouchableOpacity
          onPress={() => clickToUpload()}
          style={{
            width: "80%",
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            borderStyle: "dashed",
            borderColor: AppColor.BLACK_30,
            paddingVertical: 30,
            borderRadius: 20,
          }}
        >
          <Image
            source={images.PDF_ICON}
            style={{
              width: 100,
              height: 100,
            }}
          />
        </TouchableOpacity>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    alignSelf: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  fileTypes: {
    fontSize: 14,
    color: "#666",
    marginBottom: 15,
  },
});

export default FileUploadCard;



