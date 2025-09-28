import React, { useState } from "react";
import { View } from "react-native";
import {
  Button,
  Dialog,
  Portal,
  Text,
  RadioButton,
  Divider,
} from "react-native-paper";
import { AppColor } from "../../../themes/AppColor";
import { AppFonts } from "../../../themes/AppFonts";


export interface UserSelectionDialogProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  users: Array<{ id: number; username: string }>;
  selectedUser: string;
  setSelectedUser: (userId: string) => void;
  onConfirmSelection: () => void;
}

export default function UserSelectionDialog({
  visible,
  setVisible,
  users,
  selectedUser,
  setSelectedUser,
  onConfirmSelection
}: UserSelectionDialogProps) {

  const closeDialog = () => setVisible(false);

  return (
      <Portal>
        <Dialog style={{
            backgroundColor:AppColor.WHITE
        }} visible={visible} onDismiss={closeDialog}>
          <Dialog.Title style={{color:AppColor.PRIMARY}}>Select User</Dialog.Title>
          <Dialog.Content>
            <RadioButton.Group
              onValueChange={(value) => setSelectedUser(value)}
              value={selectedUser}
            >
              {/* All Option */}
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <RadioButton color={AppColor.PRIMARY} value="All" />
                <Text  style={{color:AppColor.BLACK,fontFamily:AppFonts.Regular}}>All Users</Text>
              </View>
              <Divider />

              {/* User List */}
              {users?.map((user) => (
                <View
                  key={user.id}
                  style={{ flexDirection: "row", alignItems: "center" }}
                >
                  <RadioButton color={AppColor.PRIMARY} value={user.username+" ("+user.id+")"} />
                  <Text  style={{color:AppColor.BLACK,fontFamily:AppFonts.Regular}}>{`${user.username} (${user.id})`}</Text>
                </View>
              ))}
            </RadioButton.Group>
          </Dialog.Content>

          <Dialog.Actions>
            <Button textColor={AppColor.PRIMARY} onPress={closeDialog}>Cancel</Button>
            <Button
            textColor={AppColor.PRIMARY}
              onPress={() => {
                onConfirmSelection();
              }}
            >
              Select
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
  );
}

