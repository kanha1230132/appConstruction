import {
  Image,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import {
  ExpenseListResponse,
  ExpenseReportResponse,
} from "../../../api/apiInterface";
import { AppFonts } from "../../../themes/AppFonts";
import CustomText from "../../../components/CustomText/CustomText";
import { Card, Divider } from "react-native-paper";
import { AppColor } from "../../../themes/AppColor";
import { moderateScale } from "react-native-size-matters";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import moment from "moment";
import { DateFormat } from "../../../utils/dateUtil";
import CustomButton from "../../../components/Button/CustomButton";
import { images } from "../../../assets";
import { AppText } from "../../../constants/appText";
import { expenseType } from "../helper/util";
import ApprovedIcon from "./ApprovedIcon";
import RejectedIcon from "./RejectedIcon";

interface ExpenseListCardProps {
  item: ExpenseListResponse;
  onPress: () => void;
  callToApprove: (id:number,type:string) => void;
  callToReject: (id:number,type:string) => void;
}

const ExpenseListCard: React.FC<ExpenseListCardProps> = ({ item, onPress,callToApprove,callToReject }) => {
  const getColor = ()=>{
    if(item.mileageStatus==AppText.Approved && item.expenseStatus==AppText.Approved){
      return AppColor.APPROVE;
    }else if(item.mileageStatus==AppText.Rejected && item.expenseStatus==AppText.Rejected){
      return AppColor.REJECT;
    }else{
      return AppColor.PENDING;
    }
  }

  let isDone = false;
  if (item.mileageStatus == AppText.Approved && item.expenseStatus == AppText.Approved) {
    isDone = true;
  }

  console.log("item: ", item)
  return (
    <Card
      style={{
        backgroundColor: AppColor.WHITE,
        borderRadius: 6,
        marginHorizontal: 2,
        marginVertical: 5,
        padding: 10,
        borderLeftWidth: moderateScale(6),
        borderLeftColor:getColor(),
      }}
    >
      <TouchableOpacity onPress={onPress}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
         
          <View>
            <View>
              <CustomText
                fontFamily={AppFonts.Bold}
                title={item.employeeName}
                color={AppColor.PRIMARY}
                fontSize={moderateScale(16)}
              />
            </View>
            <CustomText
              fontFamily={AppFonts.Regular}
              title={
                "Submitted : " +
                moment.utc(item.createdAt).format(DateFormat.MMM_DD_YYYY)
              }
              fontSize={moderateScale(14)}
            />
            <CustomText
              fontFamily={AppFonts.Regular}
              title={
                "Date : " +
                (moment.utc(item.startDate).format(DateFormat.DD_MM_YYYY) +
                  " - " +
                  moment.utc(item.endDate).format(DateFormat.DD_MM_YYYY))
              }
              fontSize={moderateScale(14)}

            />

            <CustomText
              fontFamily={AppFonts.Regular}
              title={"Amount : $" + (item.expenseAmount + item.mileageAmount).toFixed(2)}
              fontSize={moderateScale(14)}

            />
          </View>
        </View>

        <Divider style={{ marginVertical: 5 }} />


      

          <>
            {
            item.mileage.length ?


  <View
          style={{
            width: "100%",
            flexDirection: "row",
            marginTop: 10,
            alignItems: "center",
          }}
        >
          <CustomText
            title="Mileage : "
            style={{ width: "23%" }}
            fontSize={moderateScale(14)}
          />
          {
            !isDone ?

<View
            style={{
              width: "74%",
              flexDirection: "row",
              justifyContent: "space-between",
              marginLeft: 10,
            }}
          >
            {item.mileageStatus == AppText.Pending ? (
              <>
             
                <CustomText title={AppText.Pending} color={AppColor.PENDING} fontFamily={AppFonts.Medium} />

              </>
            ) : null}
            {/* */}
            {item.mileageStatus == AppText.Rejected ? (
                         <CustomText title={AppText.Done} color={AppColor.PRIMARY} fontFamily={AppFonts.Medium} />

            ) : null}

            {item.mileageStatus == AppText.Approved ? (
             <CustomText title={AppText.Done} color={AppColor.PRIMARY} fontFamily={AppFonts.Medium} />
            ) : null}
          </View> : <CustomText title={AppText.Done} color={AppColor.PRIMARY} fontFamily={AppFonts.Medium} />
          }
          
        </View>


            : null
          }
      

        <View
          style={{
            width: "100%",
            flexDirection: "row",
            marginTop: 10,
            alignItems: "center",
          }}
        >
          <CustomText
            title="Expense : "
            style={{ width: "23%" }}
            fontSize={moderateScale(14)}
          />

          {
            !isDone ?
  <View
            style={{
              width: "74%",
              flexDirection: "row",
              justifyContent: "space-between",
              marginLeft: 10,
            }}
          >

            {
              item.expenseStatus == AppText.Pending ? (
                <CustomText title={AppText.Pending} color={AppColor.PENDING} fontFamily={AppFonts.Medium} />
             
              ) : null
            }
           


             {item.expenseStatus == AppText.Rejected ? (
            //  <RejectedIcon />
            <CustomText title={AppText.Done} color={AppColor.PRIMARY} fontFamily={AppFonts.Medium} />
            ) : null}

            {item.expenseStatus == AppText.Approved ? (
            <CustomText title={AppText.Done} color={AppColor.PRIMARY} fontFamily={AppFonts.Medium} />

            ) : null}
          </View>
            : <CustomText title={AppText.Done} color={AppColor.PRIMARY} fontFamily={AppFonts.Medium} />
          }
        
        </View>
          
          </>



         

        
      </TouchableOpacity>

       <View style={styles.iconContainer}>
            <Ionicons name="document" size={20} color={AppColor.PRIMARY} />
          </View>
    </Card>
  );
};

export default ExpenseListCard;

const styles = StyleSheet.create({
  iconContainer: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: "#E3F2FD",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    position: "absolute",
    right: 0,
    top: 0,
  },
});
