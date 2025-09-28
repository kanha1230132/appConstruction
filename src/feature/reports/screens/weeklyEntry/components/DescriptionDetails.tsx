import {
  View,
  StyleSheet,
  Keyboard,
} from "react-native";
import { TextInput } from "react-native-paper";
import { AppColor } from "../../../../../themes/AppColor";

const DescriptionDetails = ({ description }: { description: string }) => {
  return (
    <View>
      <TextInput
        mode="outlined" // or 'flat' based on your design preference
        style={[styles.textArea]}
        label={"Add Project Description"}
        multiline={true}
        numberOfLines={6} // Set minimum number of lines
        value={description}
        // onChangeText={(text) => setDescription(text)}
        returnKeyType="done"
        activeOutlineColor={AppColor.PRIMARY}
        blurOnSubmit={true}
        onSubmitEditing={() => Keyboard.dismiss()}
      />
    </View>
  );
};

export default DescriptionDetails;

const styles = StyleSheet.create({
  textArea: {
    minHeight: 200, // Ensure enough space for multiline
    textAlignVertical: "top", // Align text to top (important for multiline)
    backgroundColor: "white",
    marginVertical: 8,
  },
});
