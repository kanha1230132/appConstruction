// ScheduleModal.tsx
import React from 'react';
import { FlatList, Touchable, TouchableOpacity } from 'react-native';
import { Portal, Dialog, Button, Text, Divider } from 'react-native-paper';
import { SchedulesResponse } from '../../../api/apiInterface';
import CustomText from '../../../components/CustomText/CustomText';
import { AppColor } from '../../../themes/AppColor';
import { moderateScale } from 'react-native-size-matters';
import { AppFonts } from '../../../themes/AppFonts';


interface ScheduleModalProps {
  visible: boolean;
  onDismiss: () => void;
  schedule: SchedulesResponse[];
  onConfirm: (text: SchedulesResponse) => void;
}

const ScheduleModal: React.FC<ScheduleModalProps> = ({ visible, onDismiss, schedule,onConfirm }) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss} style={{ borderRadius: 12,backgroundColor:AppColor.WHITE ,height:'55%'}}>
        <Dialog.Title style={{color:AppColor.PRIMARY}}>Schedule</Dialog.Title>
        <Dialog.ScrollArea>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={schedule}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => <Divider />}
            renderItem={({ item }) => (
             <>
             <TouchableOpacity onPress={() => {onConfirm(item)}} style={{
               paddingVertical:6
             }}>
                <CustomText title={`${item.project_name}`} color={AppColor.BLACK} fontSize={moderateScale(16)} fontFamily={AppFonts.Medium} />
                <CustomText title={`${item.project_number}`} color={AppColor.BLACK_80} fontSize={moderateScale(14)} fontFamily={AppFonts.Light}  />
                </TouchableOpacity>
             </>
            )}
          />
        </Dialog.ScrollArea>
        <Dialog.Actions>
          <Button labelStyle={{color:AppColor.WHITE,fontSize:moderateScale(14), marginHorizontal:14}} textColor={AppColor.WHITE} style={{backgroundColor:AppColor.PRIMARY}} onPress={onDismiss}>Close</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default ScheduleModal;
