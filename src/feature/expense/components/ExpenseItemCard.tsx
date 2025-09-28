import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Card } from "react-native-paper";
import { ExpenseItemResponse } from "../../../api/apiInterface";
import CustomText from "../../../components/CustomText/CustomText";
import CustomTextInput from "../../../components/CustomTextInput/CustomTextInput";
import { AppColor } from "../../../themes/AppColor";
import IconTextInput from "../../../components/CustomTextInput/CustomIconTextInput";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AppFonts } from "../../../themes/AppFonts";
import FastImage from "react-native-fast-image";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { navigate } from "../../../utils/NavigationUtil";
import { screenNames } from "../../../navigation/ScreenNames";

interface ExpenseItemCardProps {
  item: ExpenseItemResponse;
  index: number;
  removeExpense: (index: number) => void;
  setExpenseItems: (expenseItems: ExpenseItemResponse[]) => void;
  expenseItems: ExpenseItemResponse[];
  clickOnCamera: (index: number) => void;
  setTotal: (total: number) => void;
}

const ExpenseItemCard: React.FC<ExpenseItemCardProps> = ({
  item,
  index,
  removeExpense,
  setExpenseItems,
  expenseItems,
  clickOnCamera,
  setTotal

}) => {
  return (
    <Card
      style={{
        marginTop: 20,
        backgroundColor: AppColor.WHITE,
        marginHorizontal: 1,
        padding: 10,
        marginBottom: 10,
      }}
    >
      <CustomText
        fontFamily={AppFonts.Medium}
        title={item?.category || `Category ${index + 1}`}
      />

      <CustomTextInput
        label={"Expense Title"}
        textValue={item.title}
        placeholder="Ex: Transportation/Hotel/Meals/Misc"
        onChangeText={(text) => {
          const tempExpenseItems = [...expenseItems];
          const updatedItem = {
            ...tempExpenseItems[index], // shallow copy of the object
            title: text, // update title
          };
          tempExpenseItems[index] = updatedItem;
          setExpenseItems(tempExpenseItems);
        }}
      />

      <CustomTextInput
        label={"Expense Amount"}
        textValue={item.amount != "" ?"$"+item.amount.toString(): ""}
        placeholder="Ex: $0.00"
        keyboardType="numeric"
        onChangeText={(text) => {
          //       if(text.split('.').length > 1 && text.split('.')[text.split('.').length-1].length > 2){
          //         return;
          //       }
          // text =  text.replace(/[^0-9$.]/g, '')
          if (text.split(".").length > 2) {
            return; // more than one dot — invalid
          }

          if (
            text.includes(".") &&
            text.split(".")[text.split(".").length - 1].length > 2
          ) {
            return; // more than 2 decimal places — invalid
          }
          // Allow only digits, $, and ., remove everything else
          text = text.replace(/[^0-9$.]/g, "");

          const tempExpenseItems = [...expenseItems];
          const updatedItem = {
            ...tempExpenseItems[index],
            amount: text.replaceAll("$", ""),
          };

          tempExpenseItems[index] = updatedItem;
          setTotal(
            tempExpenseItems.reduce(
              (total, item) => total + Number(item.amount),
              0
            )
          );

          setExpenseItems(tempExpenseItems);
        }}
      />

      <TouchableOpacity
        style={styles.pictureBox}
        onPress={() => {
          clickOnCamera(index);
        }}
      >
        <Ionicons
          name="camera"
          size={24}
          color={AppColor.PRIMARY}
          style={styles.icon}
        />
        <CustomText
          color={AppColor.BLACK_60}
          title={
            item.images.length
              ? "Add more Picture"
              : "Click here to add a Picture"
          }
        />
      </TouchableOpacity>

 <View style={{ width: "100%" ,flexDirection:'row',flexWrap:'wrap',gap:10,marginTop:15}}>

{console.log("item.images: ", item.images)}
      {item.images.length > 0
        ? item?.images?.map((item, index) => {
            return (
                    <TouchableOpacity
                        style={{
                          borderRadius:8 ,
                          position: "relative",
                        }}
                          onPress={() => {
                            navigate(screenNames.ImageViewer, {
                              image: item.path,
                            });
                          }}
                        >
                          <Card style={{
                            borderRadius:8,
                            width: 100,
                            height: 100,
                            margin:2,
                            backgroundColor:AppColor.WHITE
                          }}>
 <FastImage
                            resizeMode='cover'
                            source={{ uri: item.path }}
                            style={{ width: 100, height: 100, borderRadius:8 }}
                          />
                           <TouchableOpacity
                  style={{ position: "absolute", right: -10, top: -10 }}
                  onPress={() => {
                    const tempExpenseItems = [...expenseItems];
                    const updatedItem = {
                      ...tempExpenseItems[index],
                      images: tempExpenseItems[index].images.filter(
                        (i) => i.path != item.path
                      ),
                    };
                    tempExpenseItems[index] = updatedItem;
                    setExpenseItems(tempExpenseItems);
                  }}
                >
                  <MaterialIcons name="cancel" size={28} color="red" />
                </TouchableOpacity>
                          </Card>
                          
                         
                        </TouchableOpacity>
            );
          })
        : null}
 </View>

      {index != 0 && (
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => removeExpense(index)}
        >
          <Ionicons name="remove-circle" size={24} color="red" />
        </TouchableOpacity>
      )}
    </Card>
  );
};

export default ExpenseItemCard;

const styles = StyleSheet.create({
  pictureBox: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 10,
    color: AppColor.BLACK_60,
    borderColor: AppColor.BLACK_60,
  },
  icon: {
    marginRight: 10,
  },
  removeButton: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 1,
  },
});
