import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SchedulesResponse } from '../../../api/apiInterface';
import { AppColor } from '../../../themes/AppColor';
import { AppFonts } from '../../../themes/AppFonts';
import { Card } from 'react-native-paper';
import { navigate } from '../../../utils/NavigationUtil';
import { screenNames } from '../../../navigation/ScreenNames';

interface ScheduleListCardProps {
  item: SchedulesResponse;
}

const ScheduleListCard: React.FC<ScheduleListCardProps> = ({ item }) => {
  return (
    <Card style={{
        marginVertical:7,
        paddingVertical:10,
        marginHorizontal:2,
        paddingHorizontal:10,
        backgroundColor:AppColor.GREY_F9
    }}>
  <TouchableOpacity
        style={styles.card}
        onPress={async () => {
          navigate(screenNames.PhotoFilesScreen, {project:item});
        }}
      >
        <View style={styles.cardContent}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.projectName}</Text>
            <Text style={styles.subtitle}>Project Number: {item.projectNumber}</Text>
            <Text style={styles.subtitle}>Owner: {item.owner}</Text>
          </View>
          <Ionicons name="arrow-forward" size={24} color={AppColor.PRIMARY} />
        </View>
      </TouchableOpacity>
      </Card>
  );
};

export default ScheduleListCard

const styles = StyleSheet.create({
      card: {
    borderRadius: 10,
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
    fontFamily:AppFonts.Bold,
    color: AppColor.BLACK,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,  // Keep it the same size as Project No
    fontFamily:AppFonts.Medium,  // Make it bold if needed
    color: '#666666',
    marginBottom: 5,
  },
})