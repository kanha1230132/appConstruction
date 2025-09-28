import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import CustomTextInput from "../../../components/CustomTextInput/CustomTextInput";
import IconTextInput from "../../../components/CustomTextInput/CustomIconTextInput";
import CustomText from "../../../components/CustomText/CustomText";
import { AppFonts } from "../../../themes/AppFonts";
import { AppColor } from "../../../themes/AppColor";
import { moderateScale } from "react-native-size-matters";
import { InvoiceDetails } from "../../../store/slice/Reports";
import { TextInput } from "react-native-paper";

interface InvoiceInspectorDetailsProps {
  siteInspectors: any;
  selectedInspector: any;
  setSelectedInspector : (item:any) => void
  Invoice: InvoiceDetails;
  changeRate: (value: string) => void;
  changeBillableHours: (value: string) => void;
  setSiteInspectors:any
}

const InvoiceInspectorDetails: React.FC<InvoiceInspectorDetailsProps> = ({
  siteInspectors,
  selectedInspector,
  Invoice,
  changeRate,
  changeBillableHours,
  setSelectedInspector,
  setSiteInspectors
}) => {

  const setDescriptions = (text: string) => {
  const inspectorsCopy = siteInspectors.map((item) =>
    item.userId === selectedInspector.userId
      ? { ...item, description: text } // create new object with updated field
      : item
  );

  setSelectedInspector({ ...selectedInspector, description: text });

  setSiteInspectors(inspectorsCopy);
};
  return (
    <View>
      <CustomText title="Inspector Name & Their Details" />
      {siteInspectors.length > 0 ? (
        <View
          style={{
            marginBottom: 10,
            marginVertical: 10,
          }}
        >
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.nameScroll}
          >
            {siteInspectors?.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setSelectedInspector(item);
                  // setSelectedInspector(item
                }}
                style={[styles.nameContainer,{
                  backgroundColor:
                    selectedInspector?.name === item.name
                      ? AppColor.PRIMARY
                      : AppColor.WHITE,

                      borderWidth:1,
                      borderColor:AppColor.PRIMARY
                }]}
              >
                <Text
                  style={[
                    styles.nameText,
                    selectedInspector?.name === item.name &&
                      styles.activeNameText,
                  ]}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      ) : null}
      
      <CustomTextInput
        textValue={selectedInspector?.totalHours ? Number(selectedInspector?.totalHours).toFixed(2) : selectedInspector?.totalHours?.toString()}
        label="Hours"
        editable={false}
        keyboardType="numeric"
      />

      {/* <IconTextInput
        value={selectedInspector?.totalBillableHours?.toString()}
        label="Total Billable Hours"
        rightIconName="pencil"
        onChangeText={changeBillableHours}
        keyboardType="numeric"
      /> */}

      <CustomTextInput
        textValue={
          selectedInspector?.rate
            ?Number(selectedInspector?.rate).toFixed(2)
            :Number( Invoice?.schedule?.rate).toFixed(2)
        }
        label="Rate"
        editable={false}
        onChangeText={changeRate}
        keyboardType="numeric"
        left={<TextInput.Affix text="$" />}


      />

      {/* <CustomTextInput
        textValue={selectedInspector?.subTotal?.toString()}
        label="Sub Total"
        editable={false}
        left={<TextInput.Affix text="$" />}
        keyboardType="numeric"
      /> */}

      <CustomTextInput
        textValue={selectedInspector?.total ? Number(selectedInspector?.total).toFixed(2) : ""}
        label="Amount"
        editable={false}
        left={<TextInput.Affix text="$" />}

        keyboardType="numeric"
      />

          <CustomTextInput
              onChangeTextValue={(text) => setDescriptions(text)}
              textValue={selectedInspector?.description}
              label="Description"
              multiline={true}
              numberOfLines={6}
            />
    </View>
  );
};

export default InvoiceInspectorDetails;

const styles = StyleSheet.create({
  nameScroll: {
    paddingHorizontal: 16,
  },
  nameContainer: {
    alignItems: "center",
    marginRight: 15,
    backgroundColor: AppColor.PRIMARY,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  nameText: {
    fontSize: moderateScale(12),
    color: AppColor.PRIMARY,
    fontFamily: AppFonts.Medium,
  },
  activeNameText: {
    color: AppColor.WHITE,
    fontFamily: AppFonts.Medium,
  },
  underline: {
    width: "100%",
    backgroundColor: "#D3D3D3", // Grey color for unselected
  },
  activeUnderline: {
    backgroundColor: "#486ECD", // Blue color for selected
  },
});
