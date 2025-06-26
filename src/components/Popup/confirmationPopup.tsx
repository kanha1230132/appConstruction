import React, { useRef, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import { Button, Dialog, Portal } from "react-native-paper";
import { AppColor } from "../../themes/AppColor";
import { AppFonts } from "../../themes/AppFonts";

export const useConfirmationPopup = () => {
  const [popupVisible, setPopupVisible] = React.useState(false);
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('Confirmation');
  const [ok, setOk] = useState('OK');
  const [cancel, setCancel] = useState('CANCEL');
  const promiseRef = useRef<any>(null);

 

  const showConfirmationPopup = ( title:string, message:string, ok:string = "OK", cancel:string = "CANCEL") => {
    setTitle(title);
    setMessage(message);
    setOk(ok);
    setCancel(cancel);
    setPopupVisible(true);
    return new Promise((resolve, reject) => {
      promiseRef.current = { resolve, reject };
    });
  };

    const handleConfirm = () => {
        setPopupVisible(false);
      promiseRef.current?.resolve(true);
  };

  const handleCancel = () => {
    setMessage('')
    setPopupVisible(false);
    promiseRef.current?.resolve(undefined);
  };


    const ConfirmationPopup = () => {
    return (
      <View style={{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }}>
      <Portal>
        <Dialog style={{backgroundColor:AppColor.WHITE,borderRadius:20}} visible={popupVisible} onDismiss={handleCancel}>
          <Dialog.Title>{title}</Dialog.Title>
          <Dialog.Content>
            <Text>{message ? message : "Submission Failed"}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleCancel} labelStyle={{color:AppColor.BLACK}} >{cancel}</Button>
            <Button onPress={handleConfirm} labelStyle={{color:AppColor.WHITE}} color="red" style={{backgroundColor:AppColor.PRIMARY,paddingHorizontal:10}}>{ok}</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
    );
  }


  

  return {
    showConfirmationPopup,
    ConfirmationPopup,
    popupVisible,

  }

};


