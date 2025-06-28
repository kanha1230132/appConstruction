import {
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaWrapper } from "../../../../components/SafeAreaWrapper/SafeAreaWrapper";
import ScrollViewWrapper from "../../../../components/ScrollViewWrapper/ScrollViewWrapper";
import HeaderWithBackButton from "../../../../components/Button/HeaderWithBackButton";
import { goBack } from "../../../../utils/NavigationUtil";
import CustomTextInput from "../../../../components/CustomTextInput/CustomTextInput";
import LoaderButton from "../../../../components/Button/LoaderButton";
import { AppFonts } from "../../../../themes/AppFonts";
import FileUploadCard from "../../components/FileUploadCard";
import useToastHook from "../../../../hooks/toast";
import { getUuid } from "../../../../utils/util";
import moment from "moment";
import RestClient from "../../../../api/restClient";

interface CreateScheduleScreenProps {}

const CreateScheduleScreen: React.FC<CreateScheduleScreenProps> = () => {
  const [projectName, setProjectName] = useState("");
  const [projectNumber, setProjectNumber] = useState("");
  const [owner, setOwner] = useState("");
  const [rate, setRate] = useState(0);
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(
    "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  );
  const [IsLoading, setIsLoading] = useState(false);
  const { showToast } = useToastHook();

  const projectNumberRef = useRef<any>(null);
  const ownerRef = useRef<any>(null);
  const rateRef = useRef<any>(null);
  const descriptionRef = useRef<any>(null);

  const callToUploadSchedule = async () => {
    try {
      if (!projectName.trim()) {
        showToast("Please provide the Project Name", "warning");
        return;
      }
      if (!projectNumber.trim()) {
        showToast("Please provide the Project Number", "warning");
      }

      if (!owner.trim()) {
        showToast("Please provide the Owner", "warning");
        return;
      }

      if (!description.trim()) {
        showToast("Please provide the description", "warning");
        return;
      }

      if (!file) {
        showToast("Please select a PDF file", "warning");
        return;
      }

      const body = {
        uid: getUuid(),
        projectName: projectName,
        projectNumber: projectNumber,
        owner: owner,
        pdfUrl: file,
        month: moment().format("MMMM"),
        projectId: getUuid(),
        rate: rate,
        description: description,
      };
      setIsLoading(true);
      console.log("body : ", body);
      const restClient = new RestClient();
      const response = await restClient.createSchedule(body);
      if (response && typeof response !== "string") {
        setIsLoading(false);
        showToast(response.message, "success");
        setTimeout(() => goBack(), 1000);
      } else {
        showToast(response || "Something went wrong", "danger");
      }
    } catch (error) {
      console.log("Error callToUploadSchedule : ", error);
      showToast("Something went wrong", "danger");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <SafeAreaWrapper>
        <HeaderWithBackButton
          title={"Upload Schedule"}
          onBackClick={() => goBack()}
          customStyle={undefined}
        />

        <ScrollViewWrapper>
          <CustomTextInput
            onChangeTextValue={(text) => setProjectName(text)}
            textValue={projectName}
            label="Project Name"
            returnKeyType="next"
            onSubmitEditing={() => projectNumberRef.current?.focus()}
          />

          <CustomTextInput
            ref={projectNumberRef}
            onChangeTextValue={(text) => setProjectNumber(text)}
            textValue={projectNumber}
            label="Project Number"
            returnKeyType="next"
            onSubmitEditing={() => ownerRef.current?.focus()}
          />

          <CustomTextInput
            ref={ownerRef}
            onChangeTextValue={(text) => setOwner(text)}
            textValue={owner}
            label="Owner"
            returnKeyType="next"
            onSubmitEditing={() => rateRef.current?.focus()}
          />

          <CustomTextInput
            ref={rateRef}
            onChangeTextValue={(text) => setRate(text ? Number(text) : 0)}
            textValue={rate ? rate.toString() : ""}
            label="Project Rate"
            keyboardType="numeric"
            returnKeyType="next"
            onSubmitEditing={() => descriptionRef.current?.focus()}
          />

          <CustomTextInput
            ref={descriptionRef}
            onChangeTextValue={(text) => setDescription(text)}
            textValue={description}
            label="Project Description"
            numberOfLines={5}
            multiline
            returnKeyType="done"
            returnKeyLabel="Done"
            onSubmitEditing={Keyboard.dismiss}
          />

          <FileUploadCard file={file} setFile={setFile} />
        </ScrollViewWrapper>
      </SafeAreaWrapper>

      <View style={styles.button}>
        <LoaderButton
          title="Upload"
          onPress={() => callToUploadSchedule()}
          loading={IsLoading}
        />
      </View>
    </>
  );
};

export default CreateScheduleScreen;

const styles = StyleSheet.create({
  button: {
    width: "95%",
    alignSelf: "center",
    position: "absolute",
    bottom: Platform.OS == "ios" ? 30 : 10,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    color: "#000",
    marginBottom: 5,
    fontFamily: AppFonts.Medium,
  },
});
