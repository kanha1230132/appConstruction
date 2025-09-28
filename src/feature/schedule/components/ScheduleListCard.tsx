import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SchedulesResponse } from "../../../api/apiInterface";
import { AppColor } from "../../../themes/AppColor";
import { AppFonts } from "../../../themes/AppFonts";
import { Card } from "react-native-paper";
import moment from "moment";
import { DateFormat } from "../../../utils/dateUtil";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Image } from "react-native";
import { images } from "../../../assets";
import { moderateScale } from "react-native-size-matters";

interface ScheduleListCardProps {
  item: SchedulesResponse;
  onPress: () => void;
  isShowPhotoIcon?: boolean;
}

const ScheduleListCard: React.FC<ScheduleListCardProps> = ({
  item,
  onPress,
  isShowPhotoIcon
}) => {
  return (
    
    <Card
      style={{
        marginVertical: 7,
        paddingVertical: 10,
        marginHorizontal: 2,
        paddingHorizontal: 10,
        backgroundColor: AppColor.WHITE,
      }}
    >
      <TouchableOpacity
        style={styles.card}
        onPress={async () => {
          onPress();
        }}
      >
        <View style={styles.cardContent}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.project_name}</Text>

            <Text style={styles.subtitle}>
              <Text style={styles.titleHeading}>Project No./Client PO :</Text>
              {item.project_number}
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.subtitle}>
                <Text style={styles.titleHeading}>Client/Owner :</Text> {item.owner}
              </Text>
              {/* <Text style={[styles.subtitle, , { width: "40%" }]}>
                <Text style={styles.titleHeading}>Invoice to : </Text>
                {item.invoice_to}
              </Text> */}
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              {/* <Text style={styles.subtitle}>
                <Text style={styles.titleHeading}>Rate :</Text> {item.rate}
              </Text> */}
              <Text style={[styles.subtitle, { width: "50%" }]}>
                <Text style={styles.titleHeading}>Date :</Text>
                {moment(item?.created_at).format(DateFormat.DD_MM_YYYY)}
              </Text>
            </View>

            {/* <Text
              style={[styles.subtitle, { width: "90%" }]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              <Text style={styles.titleHeading}>Description :</Text>{" "}
              {item.description}
            </Text> */}
          </View>

          <MaterialIcons name="chevron-right" size={24} color={AppColor.PRIMARY} />
        </View>
      </TouchableOpacity>
{
  isShowPhotoIcon? 
      <Image source={images.PHOTO_FILES} style={{width:20,height:20,position:'absolute',right:0,tintColor:AppColor.PRIMARY}}  />

  : null
}
    </Card>
  );
};

export default ScheduleListCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: moderateScale(16),
    fontFamily: AppFonts.Medium,
    color: AppColor.BLACK,
    marginBottom: 5,
  },
  subtitle: {
    fontSize:moderateScale(14), // Keep it the same size as Project No
    fontFamily: AppFonts.Regular, // Make it bold if needed
    color: AppColor.BLACK_80,
    marginBottom: 5,
  },
  titleHeading: {
    color: AppColor.BLACK,
    fontFamily: AppFonts.Medium,
    fontSize: moderateScale(13),
  },
});
