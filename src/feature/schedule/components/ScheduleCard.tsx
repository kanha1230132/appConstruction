import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import moment from 'moment'
import { images } from '../../../assets'
import { AppColor } from '../../../themes/AppColor'
import { AppFonts } from '../../../themes/AppFonts'
import { DateFormat } from '../../../utils/dateUtil'
import { SchedulesResponse } from '../../../api/apiInterface'
import { Card } from 'react-native-paper'

interface ScheduleCardProps {
    item: SchedulesResponse,
    deleteSchedule: () => void
}

const ScheduleCard: React.FC<ScheduleCardProps> = ({item,deleteSchedule}) => {
  return (
    <Card style={{
        marginBottom: 10,
       backgroundColor:AppColor.GREY_F9,
        marginHorizontal: 2,
        marginTop:2
    }}>
   <View style={styles.card}>
            <View style={styles.cardContent}>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{item.projectName}</Text>

                    {/* Project Number and Owner should have the same font size and style */}
                    <Text style={styles.subtitle}>Project Number: {item.projectNumber}</Text>
                    <Text style={styles.subtitle}>Owner: {item.owner}</Text>
                    <Text style={styles.subtitle}>Date: {moment(item?.projectId?.startDate).format(DateFormat.DD_MM_YYYY)}</Text>

                    {/* Button to open the uploaded PDF */}
                    <TouchableOpacity style={{width:30,flexDirection: "row", alignItems: "center",justifyContent:'flex-end',marginTop:-20,alignSelf:'flex-end' }} onPress={() =>{}}>
                        <Image source={images.PDF_ICON} style={{ width: 25, height: 25 }} />
                    </TouchableOpacity>
                </View>

                {/* Delete Icon */}
                <TouchableOpacity style={styles.deleteButton} onPress={() => { deleteSchedule()}}>
                    <Ionicons name="trash" size={24} color="red" />
                </TouchableOpacity>
            </View>
        </View>
        </Card>
  )
}

export default ScheduleCard

const styles = StyleSheet.create({
     card: {
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderColor: AppColor.PRIMARY,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: "100%"
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontFamily:AppFonts.Medium,

        color: AppColor.PRIMARY,
        marginBottom: 5,
        
    },
    subtitle: {
        fontSize: 14,  // Keep it the same size as Project No
        fontFamily:AppFonts.Medium,
        // Make it bold if needed
        color: '#666666',
        marginBottom: 5,
    },
    deleteButton: {
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 1,
        backgroundColor:AppColor.WHITE, 
        borderRadius: 6,
        padding: 3,
        elevation:2
     },
})