import React, { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Modal, Portal, TextInput, Button, Text, Divider } from "react-native-paper";
import CustomTextInput from "../../../components/CustomTextInput/CustomTextInput";
import { ImageItem } from "../../photoFiles/PhotoFilesScreen";
import ScrollViewWrapper from "../../../components/ScrollViewWrapper/ScrollViewWrapper";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { AppColor } from "../../../themes/AppColor";

interface ImageDescriptionModalProps {
  selectedImage: ImageItem[];
  visible: boolean;
  onDismiss: () => void;
  onSubmit: () => void;
  onChangeDescription:(index:number,text:string)=>void
}

const ImageDescriptionModal: React.FC<ImageDescriptionModalProps> = ({
  selectedImage,
  visible,
  onDismiss,
  onSubmit,
  onChangeDescription
}) => {


  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modalContainer}
      >
        <KeyboardAwareScrollView
          style={{
            flex: 1,
            width: '100%',
            paddingHorizontal: 20,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <ScrollViewWrapper>
            {selectedImage &&
              selectedImage.map((item,index) => (
                <React.Fragment key={item._id}>
                  <Image source={{ uri: item.uri }} style={styles.modalImage} />
                  <CustomTextInput
                    label={"Enter comment"}
                    textValue={item.description || ""}
                    onChangeTextValue={(text)=>{
                        onChangeDescription(index,text);
                    }}
                    maxLength={30}
                  />
                  <Divider style={{ marginVertical: 10 }} />
                </React.Fragment>
              ))}
          </ScrollViewWrapper>
        </KeyboardAwareScrollView>

        <Button
          style={{
            backgroundColor: AppColor.PRIMARY,
            marginTop: 20,
            borderRadius: 5,
          }}
          mode="contained"
          onPress={onSubmit}
        >
          Submit
        </Button>
      </Modal>
    </Portal>
  );
};

export default ImageDescriptionModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 8,
  },
  modalContainer: {
    width:'90%',
    backgroundColor: "white",
    borderRadius: 10,
    paddingVertical:20,
    alignItems: "center",
    height: 550,
    alignSelf: "center",
  },
  modalImage: {
    width: 'auto',
    height:200,
    borderRadius: 6,
    marginBottom: 5,
  },
  input: {
    width: "100%",
    marginBottom: 15,
  },
});
