import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import moment from "moment";
import { images } from "../../../assets";
import { AppColor } from "../../../themes/AppColor";
import { AppFonts } from "../../../themes/AppFonts";
import { DateFormat } from "../../../utils/dateUtil";
import { SchedulesResponse } from "../../../api/apiInterface";
import { Card } from "react-native-paper";
import { navigate } from "../../../utils/NavigationUtil";
import { screenNames } from "../../../navigation/ScreenNames";
import { moderateScale } from "react-native-size-matters";

interface ScheduleCardProps {
  item: SchedulesResponse;
  deleteSchedule: () => void;
  isBoss?: boolean;
}

const ScheduleCard: React.FC<ScheduleCardProps> = ({
  item,
  deleteSchedule,
  isBoss = true,
}) => {
  const openPdf = () => {
    navigate(screenNames.WebViewScreen, {
      url: item?.pdfUrl,
      title: item.project_name,
      IsPdfViewer: true,
    });
  };
  return (
    <Card
      style={{
        marginBottom: 10,
        backgroundColor: AppColor.GREY_F9,
        marginHorizontal: 2,
        marginTop: 2,
      }}
    >
      <TouchableOpacity style={styles.card} activeOpacity={0.5} onPress={() => {
        if(isBoss){
           navigate(screenNames.CreateScheduleScreen,{
          schedule: item,scheduleUpdate: true})
        }
      }
        }
       
      >
        <View style={styles.cardContent}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.project_name}</Text>

            <Text style={styles.subtitle}>
              <Text style={styles.titleHeading} ellipsizeMode="tail">Project No./Client PO :</Text>
               {item.project_number}
            </Text>
            <View style={{
              flexDirection:"row",
              justifyContent:"space-between"
            }}>
            <Text style={styles.subtitle}><Text style={styles.titleHeading}>Client/Owner :</Text> {item.owner}</Text>

  <Text style={[styles.subtitle,{width:"40%"}]}>
            <Text style={styles.titleHeading}>Date :</Text>
              {moment(item?.created_at).format(DateFormat.DD_MM_YYYY)}
            </Text>
            </View>

             <View style={{
              flexDirection:"row",
              justifyContent:"space-between"
            }}>
            <Text style={[styles.subtitle,]}><Text style={styles.titleHeading}>Invoice to : </Text>{item.invoice_to}</Text>
           
           
         


            </View>

             {
              isBoss ?
               <Text style={styles.subtitle}><Text style={styles.titleHeading}>Rate :</Text> {item.rate}</Text> 
              : null
            }

            
            {
              isBoss ?
     <Text style={[styles.subtitle,{width:"90%"}]}  numberOfLines={1}
  ellipsizeMode="tail" ><Text style={styles.titleHeading}>Description :</Text>  {item.description}</Text> 

              : null
            }

       


            <TouchableOpacity
              style={{
                width: 30,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
                marginTop: -20,
                alignSelf: "flex-end",
              }}
              onPress={() => {
                openPdf();
              }}
            >
              <Image
                source={images.PDF_ICON}
                style={{ width: 25, height: 25 }}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.deleteContainer}>
            {
              isBoss ?
 <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => {
                deleteSchedule();
              }}
            >
              <Ionicons name="trash" size={24} color="red" />
            </TouchableOpacity>


              : null
            }
           
            {/* <TouchableOpacity style={styles.deleteButton} onPress={() => { deleteSchedule()}}>
                    <Ionicons name="trash" size={24} color="red" />
                </TouchableOpacity> */}
          </View>
        </View>
      </TouchableOpacity>
    </Card>
  );
};

export default ScheduleCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: AppColor.PRIMARY,
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
    fontFamily: AppFonts.Bold,
    color: AppColor.BLACK,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14, // Keep it the same size as Project No
    fontFamily: AppFonts.Medium,
    // Make it bold if needed
    color: "#666666",
    marginBottom: 5,
  },
  deleteButton: {
    backgroundColor: AppColor.WHITE,
    borderRadius: 6,
    padding: 3,
    elevation: 2,
    gap: 5,
  },
  deleteContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    gap: 5,
  },
  titleHeading:{
              color:AppColor.BLACK,
              fontFamily:AppFonts.Medium
            }
});
