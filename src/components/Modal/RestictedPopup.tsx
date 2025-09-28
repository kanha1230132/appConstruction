import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Modal, Portal, Text, Button, Provider, Card } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { navigate, resetAndNavigate } from "../../utils/NavigationUtil";
import { screenNames } from "../../navigation/ScreenNames";
import { AppColor } from "../../themes/AppColor";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const RestrictedScreen = () => {
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    // Show the modal immediately on mount
    setVisible(true);
  }, []);

  const handleOk = () => {
    setVisible(false);
    resetAndNavigate(screenNames.MainApp, { screen: screenNames.MainApp }) // Replace "Home" with your desired screen
  };

  return (
      <Portal>
        <Modal
          visible={visible}
          onDismiss={() => {}}
          contentContainerStyle={{
            margin: 20,
            backgroundColor: "white",
            borderRadius: 12,
            padding: 10,

          }}
        >
          <Card elevation={0} style={{ backgroundColor: AppColor.WHITE }}>
             <MaterialCommunityIcons
                name="alert-circle-outline"
                size={48}
                color="#ff9800"
                style={{ alignSelf: "center" }}
              />
            <Card.Title title="Restricted Page" />
            <Card.Content>
              <Text>This page is restricted. You will be redirected.</Text>
            </Card.Content>
            <Card.Actions>
              <Button mode="contained" style={{ backgroundColor: AppColor.PRIMARY}} onPress={handleOk}>OK</Button>
            </Card.Actions>
          </Card>
        </Modal>
      </Portal>

  );
};

export default RestrictedScreen;
