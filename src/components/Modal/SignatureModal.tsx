import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  Image,
} from "react-native";
import SignatureCanvas from "react-native-signature-canvas";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AppColor } from "../../themes/AppColor";
import { AppFonts } from "../../themes/AppFonts";
const style = `.m-signature-pad--footer
  .button {
    background-color:${AppColor.PRIMARY};
    color: #FFF;
  }`;
interface SignatureModalProps {
  handleSignatureOK: (signature: string) => void;
  showSignatureModal: boolean;
  onclose: () => void;
}

const SignatureModal: React.FC<SignatureModalProps> = ({
  handleSignatureOK,
  showSignatureModal,
  onclose,
}: SignatureModalProps) => {
  const signatureRef = useRef(null);
  return (
    <Modal
      visible={showSignatureModal}
      transparent={true}
      animationType="slide"
      onDismiss={onclose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.signatureText}>Sign Here:</Text>

          <SignatureCanvas
            style={{ height: 600 }}
            ref={signatureRef}
            onOK={handleSignatureOK}
            descriptionText=""
            clearText="Clear"
            confirmText="Save"
            webStyle={style}
          />

          <TouchableOpacity
            onPress={onclose}
            style={{
              position: "absolute",
              top: 5,
              right: 5,
              zIndex: 6,
            }}
          >
            <Ionicons name="close" size={24} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SignatureModal;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: AppColor.WHITE },
  backButton: { flexDirection: "row", alignItems: "center" },
  button: {
    backgroundColor: AppColor.PRIMARY,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: AppColor.BLACK_50,
  },
  modalContent: {
    width: "90%",
    backgroundColor: AppColor.WHITE,
    padding: 20,
    borderRadius: 10,
    height: 450,
  },
  signatureText: {
    fontSize: 16,
    fontFamily: AppFonts.Regular,
    textAlign: "center",
    marginBottom: 10,
  },
});
