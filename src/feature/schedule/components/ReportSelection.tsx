import React, { useState } from "react";
import { Button, Dialog, Portal, RadioButton, Text } from "react-native-paper";
import { AppColor } from "../../../themes/AppColor";
import { moderateScale } from "react-native-size-matters";
import { AppFonts } from "../../../themes/AppFonts";

interface ReportSelectionDialogProps {
  visible: boolean;
  onDismiss: () => void;
  handleConfirm: () => void;
  selectedReport: string;
  setSelectedReport: (value: string) => void;
}

const ReportSelectionDialog = ({
  visible,
  onDismiss,
  handleConfirm,
  selectedReport,
  setSelectedReport,
}: ReportSelectionDialogProps) => {
  return (
      <Portal>
        <Dialog style={{backgroundColor:AppColor.WHITE}} visible={visible} onDismiss={onDismiss}>
          <Dialog.Title style={{color:AppColor.PRIMARY,fontSize:moderateScale(20),fontFamily:AppFonts.Medium}} >Select Report Type</Dialog.Title>
          <Dialog.Content>
            <RadioButton.Group
              onValueChange={(value) => setSelectedReport(value)}
              value={selectedReport}
            >
              <RadioButton.Item mode="android"  color={AppColor.PRIMARY} labelStyle={{color:AppColor.BLACK}} label="Daily Entry Reports" value="daily" />
              <RadioButton.Item  mode="android"  color={AppColor.PRIMARY} labelStyle={{color:AppColor.BLACK}} label="Weekly Reports" value="weekly" />
              <RadioButton.Item mode="android"  color={AppColor.PRIMARY} labelStyle={{color:AppColor.BLACK}} label="Daily Diary Reports" value="dailyDiary" />
            </RadioButton.Group>
          </Dialog.Content>

          <Dialog.Actions>
            <Button textColor={AppColor.PRIMARY} onPress={onDismiss}>Cancel</Button>
            <Button textColor={AppColor.PRIMARY} onPress={handleConfirm} disabled={!selectedReport}>
              OK
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
  );
};

export default ReportSelectionDialog;
